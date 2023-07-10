This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## api

아래는 생각한 한글 기능명과 그걸 번역기로 돌리 내용과 실제 url 을 기록한 부분입니다.

| 한글 기능명                 | 영어 번역                                       | url                          | 외부 url                                                  |
| --------------------------- | ----------------------------------------------- | ---------------------------- | --------------------------------------------------------- |
| 재무재표 데이터 가져오기    | Import financial statements                     | /getFinancial                | https://finance.daum.net/api/quote/:symbolCode/financials |
| 재무재표로 기울기 구하기    | Calculating the Slope from Financial Statements | /calculateSlopeWithFinancial |                                                           |
| 주식 데이터 가져오기        | Get stock data                                  | /getStock                    |                                                           |
| 주식 데이터로 기울기 구하기 | Calculating Slope with Stock Data               | /calculateSlopeWithStock     |                                                           |

## javascript 로 기울기 구하기

`Math.atan2()` 라는 함수로 기울기를 구할수 있고, 아래는 예시 입니다.

```
function calcAngleDegrees(x, y) {
  return Math.atan2(y, x) * 180 / Math.PI;
}

console.log(calcAngleDegrees(5, 5));
// Expected output: 45

console.log(calcAngleDegrees(10, 10));
// Expected output: 45

console.log(calcAngleDegrees(0, 10));
// Expected output: 90
```

## 기울기보다는 변화량(%)으로 해야 될 것 같습니다.

기울기는 x 축과 y 축이 있어야 하는데, x 축은 시간이고, y 축은 가격일텐데,
