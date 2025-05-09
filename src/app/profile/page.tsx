"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
      router.refresh(); 

    }
  }, [status]);

if (status === "loading") {
  return <Loading />; 
}

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <main className="flex flex-col items-center justify-center min-h-[88.5vh]">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <h1 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name}</h1>
        <p><strong>Email:</strong> {session?.user?.email}</p>
        <p><strong>Role:</strong> {session?.user?.role}</p>

        {isAdmin && (
          <button
            onClick={() => router.push("/admin")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Go to Admin Dashboard
          </button>
        )}

       {(session?.user?.role === "USER" || isAdmin) && <button
          onClick={() => router.push("/articles")}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          View My Articles
        </button>}

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
