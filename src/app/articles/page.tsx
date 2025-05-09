import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; 

export default async function ArticlesPage() {
  const session = await getSession();

if (!session?.user || !(session.user.role === "ADMIN" || session.user.role === "USER")) {
  redirect("/login");
}

  const articles = await prisma.article.findMany({
    where: session.user.role === "ADMIN" ? {} : { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <main className="p-4 max-w-3xl mx-auto min-h-[88.5vh]">
      <div className="mb-4 flex flex-col items-center gap-5">
        <h1 className="text-3xl font-bold text-zinc-200">Articles</h1>
        <Link
          href="/articles/new"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + New Article
        </Link>
      </div>

      <ul className="space-y-4">
                    {articles.map( (article: { id: string; title: string; content: string; author: { name: string | null }; }) => (
                  <li key={article.id} className="p-4 rounded bg-zinc-200">
                    <h2 className="text-xl font-semibold">{article.title}</h2>
                    <p className="text-gray-700 mt-2">{article.content}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      by {article.author?.name || "Unknown"}
                    </p>
                  </li>
                )
              )}
      </ul>
    </main>
  );
}
