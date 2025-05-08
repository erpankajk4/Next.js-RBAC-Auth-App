import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import CreateArticleForm from "./_components/Form";

export const runtime = "nodejs";

export default async function NewArticlePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
      <CreateArticleForm userId={session.user.id} />
    </main>
  );
}
