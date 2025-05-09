import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { title, content, userId } = await req.json();

    const article = await prisma.article.create({
      data: {
        title,
        content,
        userId,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (err) {
    console.error("Article creation failed:", err);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();

  if (!session?.user || !["ADMIN", "USER"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const articles = await prisma.article.findMany({
    where: session.user.role === "ADMIN" ? {} : { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return NextResponse.json(articles);
}