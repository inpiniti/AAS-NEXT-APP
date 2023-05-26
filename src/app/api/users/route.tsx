import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const allUsers = await find()
  .then(async (allUsers) => {
    await prisma.$disconnect()
    return allUsers;
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })

  return NextResponse.json({ allUsers });
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