import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("admin123", 12);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password,
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      name: "User",
      email: "user@example.com",
      password: await hash("user123", 12),
      role: "USER",
    },
  });
}

main().finally(() => prisma.$disconnect());
