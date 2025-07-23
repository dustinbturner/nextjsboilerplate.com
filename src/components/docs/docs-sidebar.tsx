/**
 * @file docs-sidebar.tsx
 * @purpose Navigation sidebar for documentation pages
 * @why Provides hierarchical navigation through docs content
 * @how Uses shadcn/ui components with collapsible sections and active states
 * @security No special security considerations - public navigation
 * @related /src/lib/mdx.ts - Gets navigation structure from content
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight, FileText, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

// Navigation structure matching the complete planned structure from structure.md
const navigation = [
  {
    title: 'Quick Start & Setup',
    items: [
      { title: 'How to Setup Project', href: '/docs/quick-start/how-to-setup-project', order: 1 },
      { title: 'Connect Supabase', href: '/docs/quick-start/how-to-connect-supabase', order: 2 },
      { title: 'Environment Variables', href: '/docs/quick-start/environment-variables-explained', order: 3 },
      { title: 'File Structure', href: '/docs/quick-start/understanding-the-file-structure', order: 4 },
      { title: 'Your First Feature', href: '/docs/quick-start/your-first-feature', order: 5 },
      { title: 'Troubleshooting Setup', href: '/docs/quick-start/troubleshooting-setup', order: 6 },
    ]
  },
  {
    title: 'Security (Security-First Mindset)',
    items: [
      { title: 'Security Overview', href: '/docs/security/readme', order: 1 },
      { title: 'Row Level Security', href: '/docs/security/row-level-security-explained', order: 2 },
      { title: 'Environment Security', href: '/docs/security/environment-variables-security', order: 3 },
      { title: 'Authentication Security', href: '/docs/security/authentication-security', order: 4 },
      { title: 'API Security Checklist', href: '/docs/security/api-security-checklist', order: 5 },
      { title: 'Deployment Security', href: '/docs/security/deployment-security', order: 6 },
      { title: 'Common Security Mistakes', href: '/docs/security/common-security-mistakes', order: 7 },
    ]
  },
  {
    title: 'Next.js App Router Mastery',
    items: [
      { title: 'App Router Overview', href: '/docs/app-router/readme', order: 1 },
      { title: 'Server vs Client Components', href: '/docs/app-router/server-vs-client-components', order: 2 },
      { title: 'When to Use "use client"', href: '/docs/app-router/when-to-use-use-client', order: 3 },
      { title: 'Data Fetching Patterns', href: '/docs/app-router/data-fetching-patterns', order: 4 },
      { title: 'Routing and Layouts', href: '/docs/app-router/routing-and-layouts', order: 5 },
      { title: 'Server Actions Explained', href: '/docs/app-router/server-actions-explained', order: 6 },
      { title: 'Caching & Revalidation', href: '/docs/app-router/caching-and-revalidation', order: 7 },
      { title: 'Common Mistakes', href: '/docs/app-router/common-app-router-mistakes', order: 8 },
      { title: 'Migration from Pages Router', href: '/docs/app-router/migration-from-pages-router', order: 9 },
    ]
  },
  {
    title: 'Supabase Integration',
    items: [
      { title: 'Supabase Overview', href: '/docs/supabase/readme', order: 1 },
      { title: 'Auth Flow', href: '/docs/supabase/supabase-auth-flow', order: 2 },
      { title: 'Row Level Security Guide', href: '/docs/supabase/row-level-security-step-by-step', order: 3 },
      { title: 'Database Schema Design', href: '/docs/supabase/database-schema-design', order: 4 },
      { title: 'Client Setup', href: '/docs/supabase/supabase-client-setup', order: 5 },
      { title: 'Storage & File Uploads', href: '/docs/supabase/storage-and-file-uploads', order: 6 },
      { title: 'Real-time Subscriptions', href: '/docs/supabase/real-time-subscriptions', order: 7 },
      { title: 'Edge Functions', href: '/docs/supabase/supabase-edge-functions', order: 8 },
      { title: 'Troubleshooting', href: '/docs/supabase/troubleshooting-supabase', order: 9 },
    ]
  },
  {
    title: 'Database & Drizzle ORM',
    items: [
      { title: 'Database Overview', href: '/docs/database/readme', order: 1 },
      { title: 'Schema Design Principles', href: '/docs/database/schema-design-principles', order: 2 },
      { title: 'Migrations & Schema Changes', href: '/docs/database/migrations-and-schema-changes', order: 3 },
      { title: 'Writing Good Queries', href: '/docs/database/writing-good-queries', order: 4 },
      { title: 'Relationships & Joins', href: '/docs/database/relationships-and-joins', order: 5 },
      { title: 'Indexing & Performance', href: '/docs/database/indexing-and-performance', order: 6 },
      { title: 'Seed Data & Testing', href: '/docs/database/seed-data-and-testing', order: 7 },
    ]
  },
  {
    title: 'API Design & Server Actions',
    items: [
      { title: 'API Design Overview', href: '/docs/api-design/readme', order: 1 },
      { title: 'Server Actions vs Route Handlers', href: '/docs/api-design/server-actions-vs-route-handlers', order: 2 },
      { title: 'Input Validation with Zod', href: '/docs/api-design/input-validation-with-zod', order: 3 },
      { title: 'Error Handling Patterns', href: '/docs/api-design/error-handling-patterns', order: 4 },
      { title: 'API Versioning Strategy', href: '/docs/api-design/api-versioning-strategy', order: 5 },
      { title: 'Webhooks & External APIs', href: '/docs/api-design/webhooks-and-external-apis', order: 6 },
      { title: 'Testing APIs', href: '/docs/api-design/testing-apis', order: 7 },
    ]
  },
  {
    title: 'Authentication & Authorization',
    items: [
      { title: 'Auth Strategy Overview', href: '/docs/authentication/readme', order: 1 },
      { title: 'Supabase Auth Deep Dive', href: '/docs/authentication/supabase-auth-deep-dive', order: 2 },
      { title: 'Session Management', href: '/docs/authentication/session-management', order: 3 },
      { title: 'Role-Based Access Control', href: '/docs/authentication/role-based-access-control', order: 4 },
      { title: 'Middleware & Route Protection', href: '/docs/authentication/middleware-and-route-protection', order: 5 },
      { title: 'Social Auth Setup', href: '/docs/authentication/social-auth-setup', order: 6 },
      { title: 'Auth Troubleshooting', href: '/docs/authentication/auth-troubleshooting', order: 7 },
    ]
  },
  {
    title: 'Frontend Architecture',
    items: [
      { title: 'Frontend Overview', href: '/docs/frontend/readme', order: 1 },
      { title: 'Component Organization', href: '/docs/frontend/component-organization', order: 2 },
      { title: 'State Management Patterns', href: '/docs/frontend/state-management-patterns', order: 3 },
      { title: 'Form Handling Best Practices', href: '/docs/frontend/form-handling-best-practices', order: 4 },
      { title: 'Error Boundaries & Handling', href: '/docs/frontend/error-boundaries-and-error-handling', order: 5 },
      { title: 'Performance Optimization', href: '/docs/frontend/performance-optimization', order: 6 },
      { title: 'Accessibility Guidelines', href: '/docs/frontend/accessibility-guidelines', order: 7 },
    ]
  },
  {
    title: 'Styling & Design System',
    items: [
      { title: 'Design System Overview', href: '/docs/styling/readme', order: 1 },
      { title: 'Tailwind v4 Setup', href: '/docs/styling/tailwind-v4-setup', order: 2 },
      { title: 'shadcn/ui Customization', href: '/docs/styling/shadcn-ui-customization', order: 3 },
      { title: 'Design Tokens & Theming', href: '/docs/styling/design-tokens-and-theming', order: 4 },
      { title: 'Responsive Design Patterns', href: '/docs/styling/responsive-design-patterns', order: 5 },
      { title: 'Dark Mode Implementation', href: '/docs/styling/dark-mode-implementation', order: 6 },
      { title: 'Component Styling Patterns', href: '/docs/styling/component-styling-patterns', order: 7 },
    ]
  },
  {
    title: 'Testing & Quality Assurance',
    items: [
      { title: 'Testing Strategy Overview', href: '/docs/testing/readme', order: 1 },
      { title: 'Unit Testing with Vitest', href: '/docs/testing/unit-testing-with-vitest', order: 2 },
      { title: 'Integration Testing', href: '/docs/testing/integration-testing', order: 3 },
      { title: 'E2E Testing Setup', href: '/docs/testing/e2e-testing-setup', order: 4 },
      { title: 'Linting & Code Quality', href: '/docs/testing/linting-and-code-quality', order: 5 },
      { title: 'Pre-commit Hooks', href: '/docs/testing/pre-commit-hooks', order: 6 },
      { title: 'Continuous Integration', href: '/docs/testing/continuous-integration', order: 7 },
    ]
  },
  {
    title: 'AI Development Tools',
    items: [
      { title: 'AI Development Overview', href: '/docs/ai-tools/readme', order: 1 },
      { title: 'Cursor Setup & Configuration', href: '/docs/ai-tools/cursor-setup-and-configuration', order: 2 },
      { title: 'Windsurf Setup & Configuration', href: '/docs/ai-tools/windsurf-setup-and-configuration', order: 3 },
      { title: 'Claude Projects for Development', href: '/docs/ai-tools/claude-projects-for-development', order: 4 },
      { title: 'Effective Prompt Engineering', href: '/docs/ai-tools/effective-prompt-engineering', order: 5 },
      { title: 'AI Rules Files Explained', href: '/docs/ai-tools/ai-rules-files-explained', order: 6 },
      { title: 'Context Management Strategies', href: '/docs/ai-tools/context-management-strategies', order: 7 },
      { title: 'AI-Assisted Debugging', href: '/docs/ai-tools/ai-assisted-debugging', order: 8 },
      { title: 'AI Code Review Practices', href: '/docs/ai-tools/ai-code-review-practices', order: 9 },
    ]
  },
  {
    title: 'Deployment & DevOps',
    items: [
      { title: 'Deployment Strategy', href: '/docs/deployment/readme', order: 1 },
      { title: 'Vercel Deployment Guide', href: '/docs/deployment/vercel-deployment-guide', order: 2 },
      { title: 'Environment Variables in Production', href: '/docs/deployment/environment-variables-in-production', order: 3 },
      { title: 'Database Migrations in Production', href: '/docs/deployment/database-migrations-in-production', order: 4 },
      { title: 'Monitoring & Logging', href: '/docs/deployment/monitoring-and-logging', order: 5 },
      { title: 'Backup & Disaster Recovery', href: '/docs/deployment/backup-and-disaster-recovery', order: 6 },
      { title: 'Performance Monitoring', href: '/docs/deployment/performance-monitoring', order: 7 },
    ]
  },
  {
    title: 'Common Patterns & Recipes',
    items: [
      { title: 'Pattern Library Overview', href: '/docs/patterns/readme', order: 1 },
      { title: 'Authentication Patterns', href: '/docs/patterns/authentication-patterns', order: 2 },
      { title: 'Data Loading Patterns', href: '/docs/patterns/data-loading-patterns', order: 3 },
      { title: 'Form Patterns', href: '/docs/patterns/form-patterns', order: 4 },
      { title: 'File Upload Patterns', href: '/docs/patterns/file-upload-patterns', order: 5 },
      { title: 'Search & Filtering', href: '/docs/patterns/search-and-filtering', order: 6 },
      { title: 'Pagination Patterns', href: '/docs/patterns/pagination-patterns', order: 7 },
      { title: 'Real-time Features', href: '/docs/patterns/real-time-features', order: 8 },
    ]
  },
  {
    title: 'Troubleshooting & FAQ',
    items: [
      { title: 'Troubleshooting Overview', href: '/docs/troubleshooting/readme', order: 1 },
      { title: 'Next.js Common Errors', href: '/docs/troubleshooting/next-js-common-errors', order: 2 },
      { title: 'Supabase Common Errors', href: '/docs/troubleshooting/supabase-common-errors', order: 3 },
      { title: 'Database Common Errors', href: '/docs/troubleshooting/database-common-errors', order: 4 },
      { title: 'Authentication Issues', href: '/docs/troubleshooting/authentication-issues', order: 5 },
      { title: 'Deployment Issues', href: '/docs/troubleshooting/deployment-issues', order: 6 },
      { title: 'Performance Issues', href: '/docs/troubleshooting/performance-issues', order: 7 },
      { title: 'Frequently Asked Questions', href: '/docs/troubleshooting/frequently-asked-questions', order: 8 },
    ]
  },
  {
    title: 'Architecture Decision Records (ADRs)',
    items: [
      { title: 'What are ADRs?', href: '/docs/adrs/readme', order: 1 },
      { title: 'Why Next.js App Router', href: '/docs/adrs/why-nextjs-app-router', order: 2 },
      { title: 'Why Supabase over Alternatives', href: '/docs/adrs/why-supabase-over-alternatives', order: 3 },
      { title: 'Why Drizzle over Prisma', href: '/docs/adrs/why-drizzle-over-prisma', order: 4 },
      { title: 'Why Tailwind v4', href: '/docs/adrs/why-tailwind-v4', order: 5 },
      { title: 'Authentication Architecture', href: '/docs/adrs/authentication-architecture', order: 6 },
      { title: 'Testing Strategy', href: '/docs/adrs/testing-strategy', order: 7 },
      { title: 'Deployment Strategy', href: '/docs/adrs/deployment-strategy', order: 8 },
    ]
  }
]

interface SidebarContentProps {
  onLinkClick?: () => void
}

function SidebarContent({ onLinkClick }: SidebarContentProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['Quick Start & Setup'])
  )

  const toggleSection = (sectionTitle: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionTitle)) {
      newExpanded.delete(sectionTitle)
    } else {
      newExpanded.add(sectionTitle)
    }
    setExpandedSections(newExpanded)
  }

  return (
    <nav className="space-y-2">
      {navigation.map((section) => {
        const isExpanded = expandedSections.has(section.title)
        
        return (
          <div key={section.title}>
            <Button
              variant="ghost"
              className="w-full justify-between px-2 py-1 h-auto font-normal text-xs"
              onClick={() => toggleSection(section.title)}
            >
              <span>{section.title}</span>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            
            {isExpanded && (
              <div className="ml-4 mt-1 space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-2 px-2 py-1.5 text-xs rounded-md transition-colors',
                        isActive
                          ? 'bg-secondary text-secondary-foreground font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      )}
                    >
                      <FileText className="h-3 w-3" />
                      {item.title}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export function DocsSidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-background/95 lg:backdrop-blur">
        <div className="flex h-16 items-center px-6 border-b">
          <h2 className="text-lg font-semibold">Documentation</h2>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b px-6 py-4">
              <SheetTitle>Documentation</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-auto p-4">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}