import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

// Create a singleton PrismaClient with Neon adapter
const prismaClientSingleton = () => {
  const adapter = new PrismaNeon({ connectionString: process.env.POSTGRES_PRISMA_URL });
  return new PrismaClient({ adapter });
};

declare global {
  // Prevent multiple Prisma instances in development
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Assign singleton to globalThis for reuse in dev
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
