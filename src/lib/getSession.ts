import { auth } from "@/utils/auth";
import { cache } from "react";

export const getSession = cache(async () => {
    const session = await auth();
    return session;
  });
