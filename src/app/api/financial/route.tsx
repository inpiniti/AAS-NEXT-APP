import { NextResponse } from 'next/server';

//표준종목코드
let standardItemCodes: Array<{
  full_code: string;
  short_code: string;
  codeName: string;
  marketCode: string;
  marketName: string;
  marketEngName: string;
  ord1: string;
  ord2: string;
}> = [];

export async function GET(request: Request) {
  let symbolCode = 'A017550';
  // 재무제표 가져오기
  const financialStatements = await getFinancialStatements(symbolCode);

  // 변화율 계산
  const financialStatementsRate = rateChange(financialStatements);

  // 표준종목코드 가져오기
  if(standardItemCodes.length == 0) { // 비엇을 때만 실행
    standardItemCodes = (await getStandardItemCode()).block1;
  }

  // symbolCode 코드로 표중종목코드 구하기
  const standardItemCode = findStandardItemCode(symbolCode.substring(1));

  const year5 = yyyymmdd(-5)
  const strtYymm = year5.year + year5.month.padStart(2, '0')

  const today = yyyymmdd()
  const endYymm = today.year + today.month.padStart(2, '0')

  // 표준종목코드로 시세 가져오기 (MMEND_CLSPRC)
  // 5년간 데이터
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

  const result = financialStatementsRateWithInfinityRemovedAddStockQuote.filter(financial => {
    return (financial.change_stock_price_rate != Infinity) 
      && (financial.change_stock_price_rate != undefined) 
      && (financial.change_stock_price_rate != null)
      && (!Number.isNaN(financial.change_stock_price_rate))
  })

  return NextResponse.json(
    result
    // result.map(financial => {
    //   return {
    //     symbolCode: symbolCode,
    //     date: financial.date,
    //     change_financial_rate: financial.change_financial_rate,
    //     change_stock_price_rate: financial.change_stock_price_rate,
    //   }
    // })
  );
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

// 표준종목코드 가져오기
const getStandardItemCode = async () => {
  let url = `http://data.krx.co.kr/comm/bldAttendant/getJsonData.cmd?locale=ko_KR&mktsel=ALL&typeNo=0&bld=dbms/comm/finder/finder_stkisu`;
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData;
}

// 표준종목코드 찾아내기
const findStandardItemCode = (short_code: string) => {
  const standardItem: any = standardItemCodes.filter(standardItem => standardItem.short_code == short_code).at(0);
  return standardItem.full_code;
}

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