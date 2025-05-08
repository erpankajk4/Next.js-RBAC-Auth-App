import prisma from "@/lib/prisma";
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
