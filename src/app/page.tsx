"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Optional: auto-redirect to profile if logged in
    if (status === "authenticated") {
      router.prefetch("/profile");
    }
  }, [status]);

  return (
    <main className="flex flex-col items-center justify-center  min-h-[88.5vh] px-5">
      <div className="bg- shadow rounded-lg px-6 border border-zinc-200 p-5 text-center max-w-lg w-full">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-200">Welcome to the RBAC Auth App</h1>
        <p className="text-zinc-200 mb-6">
          This is a secure full-stack app with role-based access control.
        </p>

        {status === "authenticated" ? (
          <>
            <p className="mb-2 text-green-600 font-medium">
              Logged in as {session.user?.name} ({session.user?.role})
            </p>
            <button
              className="w-full mb-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => router.push("/profile")}
            >
              Go to Profile
            </button>
            {session.user?.role === "ADMIN" && (
              <button
                className="w-full mb-3 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                onClick={() => router.push("/admin")}
              >
                Go to Admin Dashboard
              </button>
            )}
          </>
        ) : (
          <button
            className="w-full bg-[#b8ebee] text-black py-2 rounded hover:bg-[#193b65] transition-all duration-300 hover:text-zinc-200 border-2 hover:border-zinc-200 border-transparent"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
      </div>
    </main>
  );
}
