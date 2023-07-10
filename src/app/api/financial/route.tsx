import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  let symbolCode = 'A004450';
  let 재무재표_url = `https://finance.daum.net/api/quote/${symbolCode}/financials`;
  let headers = {
    Referer: 'https://finance.daum.net/domestic/sectors',
  };
  const response = await fetch(재무재표_url, { headers });
  const jsonData = await response.json();
  const result = rateChange(jsonData);

  return NextResponse.json(
    // netIncome_rate 데이터 중 0으로 나눈 값 제거
    result.filter(quarter => quarter.netIncome_rate != Infinity),
  );
}

// 데이터
// "date": "2021-12-01", // 분기
// "sales": 57120394550.0, // 매출액 (원)
// "operatingProfit": 5858358360.0, // 영업이익 (원)
// "netIncome": 10245844200.0, // 당그순이익 (원)
// "eps": 512, // eps (원)
// "roe": 0.133, // roe (%)
// "debtRatio": 236.53, // 부채비율 (%)
// "dividendPerShare": 50 // 주당배당금 (원)

// 분기데이터 변화율구하기
const rateChange = (financial: any) => {
  const quarters = financial.data.QUARTER;
  const quarters_sort: Array<{
    date: string;
    sales: number;
    netIncome: number;
  }> = sort(quarters);

  let before_netIncome = 0;
  let current_netIncom = 0;

  const quarters_output = quarters_sort.map(quarter => {
    current_netIncom = before_netIncome;
    before_netIncome = quarter.netIncome;
    return {
      date: quarter.date,
      netIncome: quarter.netIncome,
      //before_netIncome: current_netIncom,
      netIncome_rate: Math.round((quarter.netIncome / current_netIncom) * 100),
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
