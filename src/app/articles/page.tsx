"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "../loading";

export default function ArticlesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("hasRefreshed")) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, []);
  

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (status === "authenticated") {
      fetch("/api/articles")
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => {
          setArticles(data);
          setLoading(false);
        })
        .catch(() => {
          router.push("/login");
        });
    }
  }, [status]);

  if (status === "loading" || loading) return <Loading />;

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
        {articles.map((article) => (
          <li key={article.id} className="p-4 rounded bg-zinc-200">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-700 mt-2">{article.content}</p>
            <p className="text-sm text-gray-500 mt-1">
              by {article.author?.name || "Unknown"}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
