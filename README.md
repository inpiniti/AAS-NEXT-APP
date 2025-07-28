# AAS-NEXT-APP

이 프로젝트는 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)으로 부트스트랩된 [Next.js](https://nextjs.org/) 기반의 웹 애플리케이션입니다.  
주요 도메인은 자산관리(AAS, Asset Administration Shell) 및 금융/주식 데이터의 수집·가공·분석입니다.

---

## 📝 프로젝트 개요 및 주요 기능

- **Next.js 기반 SPA**: 빠른 렌더링과 개발 편의성 제공
- **주요 기능**
  - **AAS(Asset Administration Shell) 관리**: 자산의 생성/조회/수정 등 API 제공
  - **금융 데이터 수집 및 가공**
    - 국내(한국) 상장주식의 재무제표 및 주가 데이터 수집
    - 재무제표 및 주가 데이터 기반의 지표(기울기, 변화율 등) 계산
    - 데이터 가공 후 DB에 저장
  - **주요 API**
    | 한글 기능명                | 영어 번역                                       | url                          | 외부 url                                                   |
    |--------------------------|------------------------------------------------|------------------------------|------------------------------------------------------------|
    | 재무제표 데이터 가져오기    | Import financial statements                    | /getFinancial                | https://finance.daum.net/api/quote/:symbolCode/financials  |
    | 재무제표로 기울기 구하기    | Calculating the Slope from Financial Statements| /calculateSlopeWithFinancial |                                                            |
    | 주식 데이터 가져오기        | Get stock data                                 | /getStock                    |                                                            |
    | 주식 데이터로 기울기 구하기 | Calculating Slope with Stock Data              | /calculateSlopeWithStock     |                                                            |

---

## 📁 전체 파일/폴더 트리 요약

- `src/app/`  
  - **api/**: 서버 API 라우트 (예: `/api/financial`, `/api/aas`)
  - **catenax/**: 자산/선박 등 도메인 페이지
    - `asset/` 자산 상세 및 관리
    - `vessel/` 선박 관련(SeagoingVessel, Coaster, RiverBoat 등)
- `next.config.js`: Next.js 설정
- `README.md`: 프로젝트 설명 파일

*상세 트리는 [GitHub 리포](https://github.com/inpiniti/AAS-NEXT-APP)에서 확인하세요.*

---

## 🔀 데이터 흐름

1. **금융/주식 데이터 수집**
   - 외부 API(예: 다음금융, KRX 등)에서 재무제표 및 주가 데이터 fetch
   - `src/app/api/financial/route.tsx`에서 비동기 함수로 데이터 요청 후 가공
2. **지표 계산 및 가공**
   - 변화율(rateChange), 기울기(atan2 등) 계산
   - 계산된 데이터는 DB(Prisma 사용)에 저장
3. **AAS 관리**
   - `/api/aas/route.tsx`에서 자산 등록/수정/조회 수행
   - 프론트엔드(페이지)는 React Query, useMutation 등 사용해 API와 연동
4. **유저 및 인증**
   - `src/app/api/users/route.tsx`에서 사용자 등록 및 토큰 관리

---

## ▶️ 실행 방법

1. **의존성 설치**
   ```bash
   npm install
   # 또는
   yarn
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   # 또는
   yarn dev
   # 또는
   pnpm dev
   ```
   브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

3. **DB 준비**
   - Prisma 사용. `.env`에 데이터베이스 연결정보 입력 후 migration
   ```bash
   npx prisma migrate dev
   ```

4. **코드/페이지 수정**
   - `src/app/page.tsx` 등에서 수정 시, HMR(Hot Module Replacement)로 자동 반영

---

## 💡 기타 참고

- **주요 계산 예시**
  - 기울기(degree): `Math.atan2(y, x) * 180 / Math.PI;`  
    (예시는 README 내 코드 블록 참고)
  - 변화율(%): 이전과 현재 값의 차이를 백분율로 계산
- **배포**: [Vercel](https://vercel.com/) 지원

---

## 📚 추가 학습 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Next.js GitHub](https://github.com/vercel/next.js/)
