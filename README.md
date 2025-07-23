# 🚧 NextJS Boilerplate (for Vibe Coders) - Under Construction

> **⚠️ WORK IN PROGRESS**: This boilerplate is actively being developed and refined. Some features may be incomplete or subject to change. Check the todo list below for current status.

An opinionated, **teachable** starter kit for building secure, scalable **Next.js 15.4.3** (App Router) apps with **TypeScript**, **Tailwind CSS v4 (stable)**, **shadcn/ui**, **Supabase** (Auth + Postgres), and **Drizzle ORM**.  

Every important file starts with a short header block explaining **what it does, why it exists, and how to extend it**. The `/docs` folder walks you through best practices: security, schema design, API patterns, testing, and more.

## 📋 Project Status & Todo List

### ✅ Completed Features
- [x] Next.js 15.4.3 with App Router setup
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS v4 (stable) integration
- [x] shadcn/ui component system
- [x] Supabase authentication setup
- [x] Drizzle ORM configuration
- [x] Basic project structure and organization
- [x] Documentation system with 120+ pages
- [x] Security headers and middleware
- [x] Environment variable management
- [x] Build system optimization

### 🚧 In Progress
- [ ] **MDX Documentation System**: Resolving runtime compilation issues
- [ ] **Database Schema**: Finalizing user and content tables
- [ ] **Authentication Flow**: Testing all auth routes and edge cases
- [ ] **Dashboard Components**: Building user dashboard interface

### 📅 Planned Features
- [ ] **Stripe Integration**: Billing and subscription management
- [ ] **Email System**: Transactional email templates
- [ ] **Testing Suite**: Unit and integration tests with Vitest
- [ ] **E2E Testing**: Playwright test setup
- [ ] **Background Jobs**: Inngest/QStash integration
- [ ] **Monitoring**: Sentry error tracking and analytics
- [ ] **CI/CD Pipeline**: GitHub Actions workflow
- [ ] **Performance**: Bundle analysis and optimization
- [ ] **SEO**: Sitemap, robots.txt, and meta tag optimization
- [ ] **Accessibility**: WCAG compliance audit and fixes

### 🐛 Known Issues
- MDX compilation errors in documentation pages (workaround implemented)
- Some TypeScript warnings in middleware (non-blocking)
- Rate limiting implementation is stubbed

### 🎯 Next Milestones
1. **v0.1.0**: Complete core authentication and basic dashboard
2. **v0.2.0**: Add billing integration and user management
3. **v0.3.0**: Implement background jobs and email system
4. **v1.0.0**: Production-ready with full test coverage

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
├─ CLAUDE.md                       # AI development notes and context
├─ components.json                 # shadcn/ui configuration
├─ content/                        # MDX content files
│  └─ blog/                        # Blog posts
│     ├─ building-secure-nextjs-apps.mdx
│     ├─ mastering-tailwind-design-systems.mdx
│     └─ welcome-to-nextjs-boilerplate.mdx
├─ docs/                           # Comprehensive documentation (120+ pages)
│  ├─ README.md
│  ├─ adrs/                        # Architecture Decision Records
│  ├─ ai-tools/                    # AI development guides
│  ├─ api-design/                  # API patterns and best practices
│  ├─ app-router/                  # Next.js App Router guides
│  ├─ authentication/              # Auth implementation guides
│  ├─ database/                    # Database design and queries
│  ├─ deployment/                  # Production deployment guides
│  ├─ frontend/                    # Frontend architecture patterns
│  ├─ patterns/                    # Common development patterns
│  ├─ quick-start/                 # Getting started guides
│  ├─ security/                    # Security best practices
│  ├─ styling/                     # Tailwind and design system
│  ├─ supabase/                    # Supabase integration guides
│  ├─ testing/                     # Testing strategies and setup
│  └─ troubleshooting/             # Common issues and solutions
├─ public/                         # Static assets
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ src/
│  ├─ app/                         # Next.js App Router
│  │  ├─ (auth)/auth/              # Authentication routes
│  │  │  ├─ confirm/               # Email confirmation
│  │  │  ├─ error/                 # Auth error handling
│  │  │  ├─ forgot-password/       # Password reset
│  │  │  ├─ login/                 # Sign in page
│  │  │  ├─ sign-up/               # Registration page
│  │  │  ├─ sign-up-success/       # Post-registration
│  │  │  └─ update-password/       # Password update
│  │  ├─ (blog)/blog/              # Blog system
│  │  │  ├─ [...slug]/             # Dynamic blog routes
│  │  │  └─ page.tsx               # Blog listing
│  │  ├─ (dashboard)/dashboard/    # Protected dashboard
│  │  │  ├─ data.json              # Demo dashboard data
│  │  │  └─ page.tsx               # Dashboard home
│  │  ├─ (docs)/docs/              # Documentation system
│  │  │  ├─ [...slug]/             # Dynamic doc routes
│  │  │  └─ page.tsx               # Docs home
│  │  ├─ (marketing)/              # Public marketing pages
│  │  ├─ favicon.ico
│  │  ├─ globals.css               # Global styles
│  │  ├─ layout.tsx                # Root layout
│  │  └─ page.tsx                  # Home page
│  ├─ components/
│  │  ├─ auth/                     # Authentication components
│  │  │  ├─ forgot-password-form.tsx
│  │  │  ├─ login-form.tsx
│  │  │  ├─ logout-button.tsx
│  │  │  ├─ sign-up-form.tsx
│  │  │  └─ update-password-form.tsx
│  │  ├─ dashboard/                # Dashboard components
│  │  │  ├─ app-sidebar.tsx
│  │  │  ├─ chart-area-interactive.tsx
│  │  │  ├─ data-table.tsx
│  │  │  ├─ nav-*.tsx              # Navigation components
│  │  │  ├─ section-cards.tsx
│  │  │  └─ site-header.tsx
│  │  ├─ docs/                     # Documentation components
│  │  │  └─ docs-sidebar.tsx
│  │  ├─ marketing/                # Marketing page components
│  │  │  ├─ construction-banner.tsx
│  │  │  ├─ features.tsx
│  │  │  ├─ footer.tsx
│  │  │  ├─ header.tsx
│  │  │  └─ hero.tsx
│  │  ├─ mdx/                      # MDX rendering components
│  │  │  └─ mdx-content.tsx
│  │  └─ ui/                       # shadcn/ui primitives
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     ├─ chart.tsx
│  │     ├─ input.tsx
│  │     ├─ table.tsx
│  │     └─ ... (20+ UI components)
│  ├─ hooks/
│  │  └─ use-mobile.ts             # Responsive design hook
│  ├─ lib/
│  │  ├─ mdx.ts                    # MDX processing utilities
│  │  ├─ supabase/                 # Supabase client configuration
│  │  │  ├─ client.ts              # Browser client
│  │  │  ├─ middleware.ts          # Auth middleware
│  │  │  └─ server.ts              # Server client
│  │  └─ utils.ts                  # Utility functions
│  └─ middleware.ts                # Route protection & headers
├─ tailwind.config.ts              # Tailwind CSS v4 configuration
├─ tsconfig.json                   # TypeScript configuration
├─ next.config.ts                  # Next.js configuration
├─ package.json                    # Dependencies and scripts
└─ .env.example                    # Environment variables template
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
