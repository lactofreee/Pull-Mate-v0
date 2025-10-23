import { PrismaClient } from '@prisma/client'

// PrismaClient를 전역 객체에 저장할 타입을 정의합니다.
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// 전역 객체에 prisma 인스턴스가 없거나, 프로덕션 환경이 아닐 때만 새 인스턴스를 생성합니다.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'], // 디버깅을 위해 로그 레벨 추가
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma