import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import UserTable from "./_components/UserTable";
import { getSession } from "@/lib/getSession";

export const runtime = "nodejs"; // required because Prisma uses Node

export default async function AdminPage() {
  const session = await getSession();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <main className="p-4 max-w-4xl mx-auto min-h-[88.5vh]">
      <h1 className="text-3xl font-bold mb-6 text-center text-zinc-200">Admin Dashboard</h1>
      <UserTable users={users} />
    </main>
  );
}
