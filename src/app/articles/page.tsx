import { auth } from "@/utils/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export const runtime = "nodejs";

export default async function ArticlesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const articles = await prisma.article.findMany({
    where: session.user.role === "ADMIN" ? {} : { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link
          href="/articles/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + New Article
        </Link>
      </div>

      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-700 mt-2">{article.content}</p>
            <p className="text-sm text-gray-500 mt-1">by {article.author?.name || "Unknown"}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
