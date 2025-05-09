"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, TextareaAutoGrowing } from "@/ui/input";

export default function CreateArticleForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ title: "", content: "" });

  const router = useRouter();

  const wordCount = (text: string) =>
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const TITLE_LIMIT = 10;
  const CONTENT_LIMIT = 300;

  const validate = () => {
    const errors = {
      title:
        wordCount(title) > TITLE_LIMIT
          ? `Title must not exceed ${TITLE_LIMIT} words.`
          : "",
      content:
        wordCount(content) > CONTENT_LIMIT
          ? `Content must not exceed ${CONTENT_LIMIT} words.`
          : "",
    };

    setError(errors);

    return !errors.title && !errors.content;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

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
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-zinc-200 p-5 rounded-2xl"
    >
      <div>
        <Input
          label="Title"
          placeholder=" "
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
        />
        <div className="flex justify-between text-sm mt-1">
          <span className={wordCount(title) > TITLE_LIMIT ? "text-red-600" : ""}>
            {wordCount(title)} / {TITLE_LIMIT} words
          </span>
        </div>
        {error.title && <p className="text-red-600 text-sm">{error.title}</p>}
      </div>

      <div>
        <TextareaAutoGrowing
          label="Content"
          placeholder=" "
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="flex justify-between text-sm mt-1">
          <span className={wordCount(content) > CONTENT_LIMIT ? "text-red-600" : ""}>
            {wordCount(content)} / {CONTENT_LIMIT} words
          </span>
        </div>
        {error.content && (
          <p className="text-red-600 text-sm">{error.content}</p>
        )}
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
