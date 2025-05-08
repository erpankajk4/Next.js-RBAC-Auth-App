import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/generated/prisma';
import { neon } from '@neondatabase/serverless';

const prismaClientSingleton = () => {
  const adapter = new PrismaNeon({ connectionString: process.env.POSTGRES_PRISMA_URL! });

  return new PrismaClient({ adapter }) as any;
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
