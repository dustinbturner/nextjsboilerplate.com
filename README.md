# NextJS Boilerplate (for Vibe Coders)

An opinionated, **teachable** starter kit for building secure, scalable **Next.js 15.4.3** (App Router) apps with **TypeScript**, **Tailwind CSS v4 (stable)**, **shadcn/ui**, **Supabase** (Auth + Postgres), and **Drizzle ORM**.  

Every important file starts with a short header block explaining **what it does, why it exists, and how to extend it**. The `/docs` folder walks you through best practices: security, schema design, API patterns, testing, and more.

---

## Why This Exists

Most starters show *how to get something working*. This repo shows:

- **How to do it right** (security, RLS, validation, CI).
- **Why decisions were made** (ADRs + inline headers).
- **Where things live** (feature-based structure, no mega `lib/` dump).
- **How to extend without breaking stuff** (checklists + patterns in docs).

Perfect for “vibe coders” who want to ship quickly **and** learn solid patterns.

---

## Tech Stack

- **Framework:** Next.js 15.4.3 (App Router, RSC, Server Actions)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (stable) + shadcn/ui components
- **Auth & DB:** Supabase (RLS-enabled Postgres, Auth, Storage)
- **ORM & Migrations:** Drizzle ORM + drizzle-kit
- **Validation:** Zod
- **Testing:** Vitest (unit). Playwright for e2e is optional.
- **Tooling:** **npm** (default), ESLint, Prettier, Husky/lint-staged (optional)

---

## Quickstart

```bash
# 1. Install deps
npm install

# 2. Set up environment
cp .env.example .env
# Fill in SUPABASE_* keys, DB URL, etc.

# 3. Generate & push DB schema
npm run drizzle:generate
npm run drizzle:push

# 4. Seed demo data (optional)
npm run db:seed

# 5. Run dev server
npm run dev
````

Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```txt
.
├─ README.md
├─ SECURITY.md                     # How we think about & report security issues
├─ CONTRIBUTING.md                 # (Optional) external contributions
├─ drizzle/                        # Generated SQL migrations
├─ public/                         # Static assets (favicons, OG images)
├─ scripts/                        # Seeders, code mods, checks
├─ src/
│  ├─ app/                         # Next.js App Router
│  │  ├─ (marketing)/              # Public pages
│  │  ├─ (auth)/                   # Auth flows (login, sign-up, reset, etc.)
│  │  ├─ (dashboard)/              # Protected area (requires auth)
│  │  ├─ api/                      # Route handlers (REST/webhooks/etc.)
│  │  ├─ sitemap.ts / robots.txt   # SEO
│  │  └─ layout.tsx / page.tsx
│  ├─ components/
│  │  ├─ ui/                       # shadcn/ui primitives
│  │  ├─ forms/                    # Form wrappers, inputs, zod resolvers
│  │  └─ layout/                   # Header, Sidebar, etc.
│  ├─ features/                    # Vertical slices (user, billing, content, ...)
│  │  └─ user/
│  │     ├─ components/
│  │     ├─ server/                # Server actions, loaders
│  │     ├─ hooks/
│  │     ├─ schema.ts
│  │     └─ README.md
│  ├─ db/
│  │  ├─ schema/                   # Drizzle table defs
│  │  ├─ queries/                  # Complex query builders
│  │  └─ index.ts                  # Drizzle client (server-only)
│  ├─ lib/
│  │  ├─ auth/                     # Supabase clients (server/client)
│  │  ├─ env.ts                    # Typed env loader (zod)
│  │  ├─ rate-limit.ts             # (Stub) rate limiting helper
│  │  ├─ validators.ts             # Shared zod schemas
│  │  └─ utils.ts
│  ├─ styles/                      # Tailwind + global CSS
│  ├─ middleware.ts                # Route protection, headers
│  ├─ types/                       # Global TS types
│  └─ test/                        # Unit/integration tests
└─ docs/                           # Long-form documentation
   ├─ 00 - Project Setup/
   ├─ 01 - Security/
   ├─ 02 - Design_System_UI/
   ├─ 03 - Content_Management/
   ├─ 04 - Database/
   ├─ 05 - API_and_Server_Actions/
   ├─ 06 - Authentication/
   ├─ 07 - Frontend_Architecture/
   ├─ 08 - Testing_CI_CD/
   ├─ 09 - Observability_Ops/
   └─ 99 - ADRs/
```

> Each non-trivial folder has its own `README.md` to explain scope, conventions, and anti-patterns.

---

## Conventions & Philosophy

* **Feature-first organization:** group UI, server actions, hooks, schemas by domain.
* **Server by default:** use RSC/server actions for data fetching/mutations; opt into `use client` only when needed.
* **Strict types & validation:** validate all inputs with zod before touching the DB.
* **RLS everywhere:** Postgres enforces data ownership; code doesn’t assume trust.
* **Document decisions:** use ADRs (`/docs/99 - ADRs`) to log why we picked a tool or pattern.
* **Inline headers:** every API route, server action, and hook gets a header block (`@file`, `@why`, `@how`, `@security`, `@related`).

---

## Environment Variables

See `.env.example`. Load & validate with `src/lib/env.ts` (zod).

| Variable                    | Required | Purpose                                     |
| --------------------------- | -------- | ------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | ✅        | Base URL for links, auth redirects          |
| `SUPABASE_URL`              | ✅        | Supabase project URL                        |
| `SUPABASE_ANON_KEY`         | ✅        | Public anon key (safe for client)           |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅        | Server-only key for migrations/seed scripts |
| `SUPABASE_DB_URL`           | ✅        | Direct Postgres connection for Drizzle      |

---

## Security Checklist (Pre-Prod)

* [ ] **CSP** & security headers enabled & tested (report-only → enforce).
* [ ] **Row Level Security** on all tables (deny by default).
* [ ] **Input validation** on every mutation/server action.
* [ ] **Rate limiting** for auth & write-heavy endpoints.
* [ ] **Webhook signature verification** (Stripe, etc).
* [ ] Dependency scanning (npm audit/Snyk/Renovate).

See `/docs/01 - Security/` for details.

---

## Scripts

```bash
npm run dev               # Run dev server
npm run build             # Prod build
npm run start             # Start prod server
npm run drizzle:generate  # Generate migrations from schema
npm run drizzle:push      # Apply migrations
npm run db:seed           # Seed demo data
npm run test              # Vitest
npm run typecheck         # tsc --noEmit
```

---

## Roadmap / “Nice to Haves”

* Stripe billing flow (checkout, webhooks, portal)
* Inngest/QStash for background jobs
* Playwright e2e tests template
* Sentry + OpenTelemetry setup
* Automated lint for file header blocks
* Docs site (Nextra/Docusaurus) rendering `/docs`

---

## FAQ

**Can I use pnpm or bun instead of npm?**
Sure—switch the lockfile and scripts, but **npm is the default here** for maximum compatibility.

**Can I swap Supabase?**
Yes. Patterns remain: RLS → Prisma/Drizzle w/ Neon or self-hosted PG. Update `db/` & `lib/auth/`.

**Why Tailwind v4?**
It’s stable now, removes config bloat, and plays well with design tokens. Docs show how to theme it.

---

## License

MIT (or whatever you choose). See `LICENSE`.

---

## Credits

Built by/for people who like to build in flow—fast but not sloppy.
Contributions, issues, and PRs are welcome.
