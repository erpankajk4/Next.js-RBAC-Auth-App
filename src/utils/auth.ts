import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { CredentialsSignin } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { User as PrismaUser } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // trustHost: true,
  theme: {
    logo: "/logo.png",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
      
        if (!email || !password) {
          throw new CredentialsSignin("Email and password are required");
        }
      
        const user = await prisma.user.findUnique({
          where: { email },
        });
      
        if (!user || !user.password) {
          throw new Error("No user found or password not set");
        }
      
        const isValid = await compare(password, user.password);
      
        if (!isValid) {
          throw new Error("Invalid credentials");
        }
      
        // Return only safe fields
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
      
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt", 
  },
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      const userRole = auth?.user?.role ?? "USER";
    
      // ✅ Prevent logged-in users from accessing /login again
      if (pathname === "/login" && isLoggedIn) {
        return Response.redirect(new URL("/profile", nextUrl));
      }
    
      // ✅ Block unauthorized users from accessing /admin
      if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
        return Response.redirect(new URL("/", nextUrl));
      }
    
      // ✅ Require authentication for protected routes
      const protectedPaths = ["/profile", "/articles", "/admin"];
      const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
    
      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
      }
    
      return true; // allow access
    },    
  async session({ session, token }) {
    // Read data from token
    if (token) {
      session.user.id = token.id as string;
      session.user.role = token.role as "USER" | "ADMIN";
    }
    return session;
  },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as PrismaUser).role;
      }
      return token;
    },
  },
});