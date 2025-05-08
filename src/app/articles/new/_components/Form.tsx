"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateArticleForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify({ title, content, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);
    if (res.ok) {
      router.push("/articles");
    } else {
      alert("Failed to create article");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Title</label>
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1">Content</label>
        <textarea
          className="w-full border p-2 rounded"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Posting..." : "Create Article"}
      </button>
    </form>
  );
}
