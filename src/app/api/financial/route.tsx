/** 
 * 재무재표 변화량에 따라 실제 데이터는 어떻게 변했었는지 알기 위해서 작성한 코드로
 * 당기순 이익(change_financial_rate)의 변화량에 따라
 * 다음해의 change_stock_price_tate 를 디비에 쌓는다.
 * 
 * 재무재표 데이터는 아래와 같다
 * "sales": 매출액
 * "operatingProfit": 영업이익
 * "netIncome": 당기순이익 << 현재는 이것만 계산하고 있다.
 * "eps": 592,
 * "roe": 0.0466,
 * "debtRatio": 부채비율
 * "dividendPerShare": 주당배당금
 * 
 * 아래 순으로 동작하며,
 * for 라고 적어둔것은 여러번 돈다는 뜻이다.
 * 
 * 내부 로직 처리는 1초미만으로 보고, 외부 처리는 아래와 같은데, 특히나 시세데이터가 굉장히 오래걸린다.
 * {업종리스트} * {업종별 종목 리스트} * {재무재표(종목코드) + 시세데이터(표준종목코드) + 디비조회 + 디비등록}
 * 
 * 한번 조회한 건 chach로 들고 있는것 같은데, next 에서 자동 인거 같은데 해제할 필요가 있을것 같음
 * 
 * 업종 리스트 : getIndustries > for
 * 업종별 종목 리스트 : getStockCodes > for
 * 
 * 재무재표 api : getFinancialStatements
 * 변화율 계산 : rateChange > netIncome 데이터만 계산하는데, eps, roe, sales, operatingProfit 도 고려하면 좋을듯
 * 시세데이터 api : getMonthlyQuotes
 * 
 * 시세데이터추가(변화량도 계산함) : addStockQuote
 * 
 * 디비 조회 : find
 * 디비 등록 : create
 */

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    // 업종 리스트 가져오기
    const industriesCodes: Array<string> = await getIndustries();
    
    // 업종별 종목 리스트
    for (const industriesCode of industriesCodes) {
      const stockCodes: Array<{
        code: string,
        symbolCode: string,
      }> = await getStockCodes(industriesCode);

      for (const stockCode of stockCodes) {
        await calculateRateOfChangeAndDbInsert(stockCode)
      }
    }
    
    return NextResponse.json(
      false
    );
  } catch (error) {
    return NextResponse.json(
      true
    );
  }
}

// 재무재표 비즈니스 로직
const calculateRateOfChangeAndDbInsert = async (stockCode: {
  code: string,
  symbolCode: string,
}) => {
  const {code: standardItemCode, symbolCode} = stockCode;
  // 재무제표 가져오기
  const financialStatements = await getFinancialStatements(symbolCode);

  // 변화율 계산
  const financialStatementsRate = rateChange(financialStatements);

  // 표준종목코드로 시세 가져오기 (MMEND_CLSPRC)
  // 5년간 데이터
  const year5 = yyyymmdd(-5)
  const strtYymm = year5.year + year5.month.padStart(2, '0')

  const today = yyyymmdd()
  const endYymm = today.year + today.month.padStart(2, '0')

  const monthlyQuotes = await getMonthlyQuotes(standardItemCode, strtYymm, endYymm)

  // change_financial_rate 데이터 중 0으로 나눈 값 제거
  const financialStatementsRateWithInfinityRemoved = financialStatementsRate.filter(quarter => {
    return (quarter.change_financial_rate != Infinity) 
      && (quarter.change_financial_rate != undefined) 
      && (quarter.change_financial_rate != null)
      && (!Number.isNaN(quarter.change_financial_rate))
  });

  // 시세추가
  const financialStatementsRateWithInfinityRemovedAddStockQuote = addStockQuote(financialStatementsRateWithInfinityRemoved, monthlyQuotes);

  const result = financialStatementsRateWithInfinityRemovedAddStockQuote
  .filter(financial => {
    return (financial.change_stock_price_rate != Infinity) 
      && (financial.change_stock_price_rate != undefined) 
      && (financial.change_stock_price_rate != null)
      && (!Number.isNaN(financial.change_stock_price_rate))
  })
  .map(financial => {
    return {
      symbolCode: symbolCode,
      date: financial.date,
      change_financial_rate: financial.change_financial_rate,
      change_stock_price_rate: financial.change_stock_price_rate,
    }
  })

  // 디비 등록
  result.forEach(async (financial) => {
    const found_financial = await find(financial);
    if(found_financial.length == 0) {
      await create(financial);
    }
  })
}

// 재무재표 데이터 가져오기
// https://finance.daum.net/api/quote/${symbolCode}/financials
// "date": "2021-12-01", // 분기
// "sales": 57120394550.0, // 매출액 (원)
// "operatingProfit": 5858358360.0, // 영업이익 (원)
// "netIncome": 10245844200.0, // 당그순이익 (원)
// "eps": 512, // eps (원)
// "roe": 0.133, // roe (%)
// "debtRatio": 236.53, // 부채비율 (%)
// "dividendPerShare": 50 // 주당배당금 (원)
const getFinancialStatements = async (symbolCode: string) => {
  let url = `https://finance.daum.net/api/quote/${symbolCode}/financials`;
  let headers = {
    Referer: 'https://finance.daum.net/domestic/sectors',
  };
  const response = await fetch(url, { headers });
  const jsonData = await response.json();
  return jsonData
}


// 연간 데이터 변화율구하기
const rateChange = (financial: any) => {
  const quarters = financial.data.YEAR;
  const quarters_sort: Array<{
    date: string;
    sales: number;
    netIncome: number;
  }> = sort(quarters);

  let before_netIncome = 0;
  let current_netIncom = 0;

  let before_date = '';
  let current_date = '';

  const quarters_output = quarters_sort.map(quarter => {
    current_netIncom = before_netIncome;
    before_netIncome = quarter.netIncome;

    current_date = before_date;
    before_date = quarter.date;

    const 최종 = quarter.netIncome
    const 이전 = current_netIncom
    const 결과 = Math.round((최종 - 이전) / 이전 * 100)

    return {
      date: quarter.date,
      before_date: current_date,
      netIncome: quarter.netIncome,
      before_netIncome: current_netIncom,
      change_financial_rate: 결과,
    };
  });
  return quarters_output;
};

// 분기 데이터 소팅
const sort = (quarters: any) => {
  quarters.sort(function (a: any, b: any) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });
  return quarters;
};

// 표준종목코드로 월별 시세 가져오기
const getMonthlyQuotes = async (isuCd: string, strtYymm: string, endYymm: string) => {
  let url = `http://data.krx.co.kr/comm/bldAttendant/getJsonData.cmd?bld=dbms/MDC/STAT/standard/MDCSTAT01802&isuCd=${isuCd}&strtYymm=${strtYymm}&endYymm=${endYymm}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData.OutBlock_1;
}

// 오늘 날짜와 5년뒤 날짜 구하기
const yyyymmdd = (yyyy = 0, mm = 0, dd = 0) => {
  let today = new Date();   
  let year = String(today.getFullYear() + yyyy); // 년도
  let month = String(today.getMonth() + 1 + mm);  // 월
  let date = String(today.getDate() + dd);  // 날짜
  return {
    year,
    month,
    date,
  }
}

// 1년 후
const threeMonthsLater = (date: string) => {
  let now = new Date(date);
  let today = new Date(now.setFullYear(now.getFullYear() + 1))
  let year = String(today.getFullYear()); // 년도
  let month = String(today.getMonth() + 1).padStart(2, '0');  // 월
  let day = String(today.getDate()).padStart(2, '0');  // 날짜
  return {
    year,
    month,
    day
  }
}

// 주식 시세 추가
const addStockQuote = (stocks: Array<{
  date: string
  before_date: string
  netIncome: number
  change_financial_rate: number
}>, monthlyQuotes: Array<{
  TRD_DD: string
  ISU_ABBRV: string
  ISU_SRT_CD: string
  MKT_NM: string
  MMEND_CLSPRC: string
  HGST_CLSPRC: string
  LWST_CLSPRC: string
  ISU_STD: string
  ISU_KURT: string
  COSKEW: string
  ISU_BETA: string
  ISU_AMIBUD: string
  ISU_AMIVEST: string
  ISU_ZEROS: string
  MM_ACC_TRDVOL: string
  AVG_ACC_TRDVOL: string
  MM_ACC_TRDVAL: string
  AVG_ACC_TRDVAL: string
}>) => {
  return stocks.map(stock => {
    const monthlyQuotesCopy = monthlyQuotes
      .filter(monthlyQuote => 
        monthlyQuote.TRD_DD >= stock.date.replaceAll('-','/').substring(0, 7) &&
        monthlyQuote.TRD_DD <= threeMonthsLater(stock.date).year+'/'+threeMonthsLater(stock.date).month
      ).map(monthlyQuote => {
        return {
          TRD_DD: monthlyQuote.TRD_DD,
          MMEND_CLSPRC: monthlyQuote.MMEND_CLSPRC
        }
      })

    const 최종 = Number(monthlyQuotesCopy.at(-1)?.MMEND_CLSPRC.replaceAll(',',''))
    const 이전 = Number(monthlyQuotesCopy.at(0)?.MMEND_CLSPRC.replaceAll(',',''))
    const 결과 = Math.round((최종 - 이전) / 이전 * 100)

    return {
      ...stock,
      monthlyQuotesCopy: monthlyQuotesCopy,
      change_stock_price_rate: 결과,
    }
  })
}

// 자산 등록
async function create(data: any) {
  await prisma.financials.create({
    data: data,
  })
  .finally(async ()=> await prisma.$disconnect())
}

// db 조회
async function find({symbolCode = '', date = ''}) {
  const users = await prisma.financials.findMany({
    where: {
      symbolCode,
      date,
    },
  })
  return users
}

// 업종 리스트 가져오기
const getIndustries = async () => {
  let url = `https://finance.daum.net/api/sectors/?includedStockLimit=2&page=1&perPage=40&fieldName=changeRate&order=desc&market=KOSPI&change=RISE&includeStocks=true&pagination=true`;
  let headers = {
    Referer: 'https://finance.daum.net/domestic/sectors',
  };
  const response = await fetch(url, { headers });
  const jsonData = await response.json();
  return jsonData.data.map((d: any) => d.symbolCode)
}

// 종목 리스트 가져오기
const getStockCodes = async (symbolCode: string) => {
  let url = `https://finance.daum.net/api/sectors/${symbolCode}/includedStocks?symbolCode=KRD020020180&page=1&perPage=30&fieldName=changeRate&order=desc&pagination=true`;
  let headers = {
    Referer: 'https://finance.daum.net/domestic/sectors',
  };
  const response = await fetch(url, { headers });
  const jsonData = await response.json();
  return jsonData.includedStocks.map((included: any) => {
    const {code, symbolCode} = included
    return {
      code,
      symbolCode,
    }
  })
}
