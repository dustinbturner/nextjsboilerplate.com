# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev               # Run dev server with Turbopack
npm run build             # Production build
npm run start             # Start production server
npm run lint              # ESLint with Next.js config
```

Note: This project currently doesn't have the following commands configured, so ask the user before running:
- Type checking (`npm run typecheck` or similar)
- Testing (`npm run test` or similar) 
- Database migrations (`npm run drizzle:generate`, `npm run drizzle:push`)
- Database seeding (`npm run db:seed`)

## Architecture Overview

This is a Next.js 15.4.3 App Router boilerplate with TypeScript, designed for rapid development with security-first principles. Key architectural decisions:

### Project Structure
- **Route Groups**: Uses App Router with route groups `(auth)`, `(dashboard)`, `(marketing)` for logical organization
- **Feature-First Organization**: Components are organized by domain (auth, dashboard, marketing) rather than by type
- **shadcn/ui Components**: Extensive use of Radix UI primitives with Tailwind CSS v4
- **Supabase Integration**: Currently in "open mode" - authentication is disabled for development

### Key Directories
- `src/app/` - Next.js App Router with route groups
- `src/components/` - Feature-based component organization (auth/, dashboard/, marketing/, ui/)
- `src/lib/supabase/` - Supabase client configurations (browser, server, middleware)
- `src/hooks/` - Custom React hooks
- `docs/` - Comprehensive documentation organized by topic (00-13 numbered sections)

### Authentication State
**IMPORTANT**: The project is currently in "open mode" with authentication disabled in `src/middleware.ts`. The middleware file contains detailed instructions for enabling Supabase authentication when needed. When auth is enabled, `/dashboard/*` routes will be protected.

### Styling & UI
- **Tailwind CSS v4** (stable version) with custom configuration
- **shadcn/ui** components extensively used throughout
- **Geist fonts** (Sans and Mono) configured in root layout
- Component library includes: Avatar, Badge, Button, Card, Chart, Checkbox, Dropdown, Input, Select, Sidebar, Table, Tabs, and more

### Development Philosophy
- **Server-first**: Uses React Server Components and Server Actions by default
- **Type Safety**: TypeScript in strict mode with proper path aliases (`@/*`)
- **Security-First**: Designed with RLS (Row Level Security) and input validation in mind
- **Documentation-Heavy**: Every major file includes header blocks explaining purpose and usage

### Dependencies
- **Core**: Next.js 15.4.3, React 19.1.0, TypeScript 5
- **UI**: Radix UI components, Tailwind CSS v4, Lucide React icons, Tabler icons
- **Auth & Data**: Supabase (auth + database), Zod for validation
- **Additional**: React Table, Recharts, Sonner (toasts), next-themes

## File Header Convention

Many files in this codebase include header blocks with:
- `@file` - File name and purpose
- `@why` - Reason for existence
- `@how` - Implementation approach
- `@security` - Security considerations
- `@related` - Related files or dependencies

Follow this pattern when creating new files.

## Current Status

The project appears to be in active development with some auth-related files recently deleted (as seen in git status). The authentication system exists but is currently disabled for easier development and UI work.