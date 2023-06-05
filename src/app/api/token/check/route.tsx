import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    // 프론트로 부터 토큰을 전달 받자
    const { access_token } = await request.json();
    let state = 'err'
    // DB에 해당 토큰이 있는지 확인
    await find(access_token)
      .then(async (users) => {
        console.log('users',users)
        console.log('length',users.length)
        if(users.length != 0)
          state = 'ok'
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
      })

    return NextResponse.json({ state: state });
}

// token 체크
async function find(access_token: string) {
  const users = await prisma.user.findMany({
    where: {
      access_token: access_token,
    },
  })
  return users
}
