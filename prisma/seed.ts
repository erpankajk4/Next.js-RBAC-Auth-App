import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  // Disable referential integrity temporarily (only needed for SQLite/MySQL)
  await prisma.$transaction([
    prisma.article.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  // Add other models here

  console.log('✅ All data deleted successfully.');

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
 console.log('✅ Database has been seeded. 🌱');

main().finally(() => prisma.$disconnect());
