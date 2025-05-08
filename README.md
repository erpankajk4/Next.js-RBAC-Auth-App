# 🔐 Next.js RBAC Auth App

A full-stack authentication and RBAC (Role-Based Access Control) app built with **Next.js 14 App Router**, **NextAuth.js v5 (Auth.js)**, **Prisma**, and **PostgreSQL**. Supports `ADMIN` and `USER` roles, protected routes, and secure credential-based authentication with `bcryptjs`.

## 🚀 Features

- ✅ Credential authentication with **NextAuth.js v5**
- 🔐 JWT-based sessions with role inclusion (`ADMIN`, `USER`)
- 🔒 Route protection via **middleware.ts**
- 🧠 Prisma ORM for type-safe database access
- 🛡️ RBAC (Role-Based Access Control)
- 📄 Article CRUD (Users see own, Admin sees all)
- ⚙️ Secure password hashing via `bcryptjs`
- 🎨 Custom login page & conditional UI rendering
- 🌐 PostgreSQL + Prisma migrations + seed data

## 🧩 Tech Stack

- [Next.js 14 App Router](https://nextjs.org/docs/app)
- [NextAuth.js v5 (Auth.js)](https://authjs.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- TypeScript

# Bun Commands used - 
bun add @auth/prisma-adapter@2.7.4 @prisma/client next-auth@beta clsx tailwind-merge tailwindcss-animate zod bcryptjs
bun i -D @tailwindcss/typography @types/react-color prettier prettier-plugin-tailwindcss eslint-config-prettier --legacy-peer-deps


## 📁 Project Structure

```
src
 ┣ app
 ┃ ┣ admin
 ┃ ┃ ┣ _components
 ┃ ┃ ┃ ┗ UserTable.tsx             → Table for user role management
 ┃ ┃ ┣ actions.ts                  → Role update actions
 ┃ ┃ ┗ page.tsx                    → Admin dashboard
 ┃ ┣ api
 ┃ ┃ ┣ articles
 ┃ ┃ ┃ ┗ route.ts                  → GET/POST articles API
 ┃ ┃ ┣ auth
 ┃ ┃ ┃ ┗ [...nextauth]
 ┃ ┃ ┃   ┗ route.ts                → NextAuth configuration
 ┃ ┃ ┗ signup
 ┃ ┃ ┃ ┗ route.ts                  → Signup API
 ┃ ┣ articles
 ┃ ┃ ┣ new
 ┃ ┃ ┃ ┣ _components
 ┃ ┃ ┃ ┃ ┗ Form.tsx                → New article form
 ┃ ┃ ┃ ┗ page.tsx                  → New article page
 ┃ ┃ ┗ page.tsx                    → User's article list
 ┃ ┣ login
 ┃ ┃ ┣ action.ts                   → Login form action
 ┃ ┃ ┗ page.tsx                    → Login form UI
 ┃ ┣ profile
 ┃ ┃ ┗ page.tsx                    → Profile page with session info
 ┃ ┣ unauthorized
 ┃ ┃ ┗ page.tsx                    → Unauthorized access fallback
 ┃ ┣ favicon.ico
 ┃ ┣ globals.css
 ┃ ┣ layout.tsx                    → Root layout file
 ┃ ┗ page.tsx                      → Home page
 ┣ generated
 ┃ ┗ prisma                        → Prisma client & runtime
 ┃   ┗ schema.prisma              → Prisma schema
 ┣ lib
 ┃ ┣ getSession.ts                → Server-side session handler
 ┃ ┣ prisma.ts                    → Prisma client instance
 ┃ ┗ utils.ts                     → Utility functions
 ┣ ui
 ┃ ┣ input.tsx                    → Reusable input component
 ┃ ┗ label.tsx                    → Reusable label component
 ┣ utils
 ┃ ┗ auth.ts                      → Auth helper (e.g., RBAC check)
 ┗ middleware.ts                  → Route-level auth + RBAC middleware
```

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/erpankajk4/Next.js-RBAC-Auth-App.git
cd next-auth-rbac-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

.env - commit file intentially


> Replace `USER`, `PASSWORD`, and `yourdb` accordingly.

### 4. Prisma Setup

```bash
npx prisma migrate dev --name init
npx prisma generate
npx tsx prisma/seed.ts
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🧪 Default Users

| Role   | Email               | Password  |
|--------|---------------------|-----------|
| Admin  | admin@example.com   | admin123  |
| User   | user@example.com    | user123   |

## 🛡️ RBAC Enforcement

- `/admin/**` → **ADMIN** only
- `/articles/**` → **Authenticated users**
- `/profile` → **Logged-in users**
- `/login` → Redirects logged-in users to `/profile`
