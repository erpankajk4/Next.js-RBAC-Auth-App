"use server";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (res?.error) {
    throw new Error(res.error); // or use redirect("/login?error=Invalid")
  }

  redirect("/profile");
}
