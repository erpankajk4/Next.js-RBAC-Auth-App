"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, role: "ADMIN" | "USER") {
  await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  revalidatePath("/admin");
}
