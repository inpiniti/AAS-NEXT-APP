import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const allAass = await find();
  return NextResponse.json({ allAass });
}

export async function POST(request: Request) {
    const { idShort, catalogue, id, data } = await request.json();
    
    let state = false;

    // DB에 등록된 계정정보가 있는지 확인 후 가입
    await find()
      .then(async (allAass) => {
        // 자산이 있는지 확인
        if(!checkAas(allAass, id)) {
          // 자산 등록
          await create(idShort, catalogue, id, data)
          .then(async () => {
            state = true
          })
        } else {
          // 자산 업데이트
          await update(idShort, catalogue, id, data)
          .then(async () => {
            state = true
          })
        }
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
      })

    return NextResponse.json({ state: state });
}

// 자산 조회
async function find() {
  const allAass = await prisma.aas.findMany()
  .finally(async ()=> await prisma.$disconnect())
  return allAass
}

// 자산 등록
async function create(idShort: string, catalogue: string, id: string, data: string) {
  await prisma.aas.create({
    data: {
      idShort: idShort,
      catalogue: catalogue,
      id: id,
      data: data,
    },
  })
  .finally(async ()=> await prisma.$disconnect())

  const allAass = await prisma.aas.findMany()
}

// 자산 업데이트
async function update(idShort: string, catalogue: string, id: string, data: string) {
  await prisma.aas.updateMany({
    where: {
      id: {
        contains: id,
      },
    },
    data: {
      idShort: idShort,
      catalogue: catalogue,
      data: data,
    },
  })
  .finally(async ()=> await prisma.$disconnect())

  const allAass = await prisma.aas.findMany()
}

// 자산 확인 함수
function checkAas(arr: any, id: string): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return true;
    }
  }
  return false;
}