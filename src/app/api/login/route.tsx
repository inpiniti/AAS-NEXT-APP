import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  /* const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  });
  const data = await res.json(); */
 
  return null//NextResponse.json({ data });
}

export async function POST(request: Request) {
    // 프론트로 부터 토큰을 전달 받자
    const { access_token } = await request.json();
    
    // 토큰으로 카카오 계정정보 가져오기
    // node 에서 /v2/user/me 카카오 가져오기
    const res = await fetch('https://kapi.kakao.com/v2/user/me', {
        headers: {
        Authorization: `Bearer ${access_token}`,
        },
    });
    const data = await res.json();

    let state = false;

    // DB에 등록된 계정정보가 있는지 확인 후 가입
    await find()
      .then(async (allUsers) => {
        await prisma.$disconnect()

        // 가입 되어 있는지 확인
        if(!checkForName(allUsers, data.kakao_account.email)) {
          // 가입
          await create(data.kakao_account.email, access_token)
          .then(async () => {
            await prisma.$disconnect()
            state = true
          })
          .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
          })
        } else {
          // token 업데이트
          await update(data.kakao_account.email, access_token)
          .then(async () => {
            await prisma.$disconnect()
            state = true
          })
          .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
          })
        }
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
      })

    return NextResponse.json({
      ...data.kakao_account.profile,
      access_token: access_token,
      email: data.kakao_account.email,
    });
}

// 회원 조회
async function find() {
  const allUsers = await prisma.user.findMany()
  return allUsers
}

// 회원 등록
async function create(email: string, access_token: string) {
  await prisma.user.create({
    data: {
      email: email,
      access_token: access_token,
    },
  })

  const allUsers = await prisma.user.findMany()
}

// token 업데이트
async function update(email: string, access_token: string) {
  const updateUsers = await prisma.user.updateMany({
    where: {
      email: {
        contains: email,
      },
    },
    data: {
      access_token: access_token,
    },
  })
}

// 회원 확인 함수
function checkForName(arr: any, email: string): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].email === email) {
      return true;
    }
  }
  return false;
}