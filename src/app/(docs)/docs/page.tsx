/**
 * @file docs/page.tsx
 * @purpose Root documentation page and overview
 * @why Provides landing page for /docs route with navigation to all docs
 * @how Shows documentation overview and links to major sections
 * @security No special security considerations - public documentation
 * @related /src/lib/mdx.ts - Gets docs navigation structure
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Rocket, 
  Shield, 
  Route, 
  Database, 
  Server, 
  Key, 
  Palette, 
  TestTube, 
  Bot, 
  Cloud, 
  Puzzle, 
  HelpCircle, 
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react'

// Documentation sections with descriptions and icons
const documentationSections = [
  {
    title: 'Quick Start & Setup',
    description: 'Get up and running quickly with step-by-step setup guides, Supabase connection, and your first feature.',
    icon: Rocket,
    href: '/docs/quick-start/how-to-setup-project',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    articles: 6,
    featured: true
  },
  {
    title: 'Security (Security-First Mindset)',
    description: 'Learn security best practices, Row Level Security, environment protection, and common security mistakes.',
    icon: Shield,
    href: '/docs/security/readme',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    articles: 7
  },
  {
    title: 'Next.js App Router Mastery',
    description: 'Master the App Router with server vs client components, data fetching patterns, and caching strategies.',
    icon: Route,
    href: '/docs/app-router/readme',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    articles: 9
  },
  {
    title: 'Supabase Integration',
    description: 'Complete Supabase integration guide covering auth flow, RLS, schema design, and real-time features.',
    icon: Database,
    href: '/docs/supabase/readme',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    articles: 9
  },
  {
    title: 'Database & Drizzle ORM',
    description: 'Database design principles, migrations, query optimization, and performance best practices.',
    icon: Database,
    href: '/docs/database/readme',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    articles: 7
  },
  {
    title: 'API Design & Server Actions',
    description: 'API design patterns, server actions vs route handlers, validation with Zod, and error handling.',
    icon: Server,
    href: '/docs/api-design/readme',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    articles: 7
  },
  {
    title: 'Authentication & Authorization',
    description: 'Complete auth strategy with Supabase, session management, RBAC, and middleware protection.',
    icon: Key,
    href: '/docs/authentication/readme',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    articles: 7
  },
  {
    title: 'Frontend Architecture',
    description: 'Component organization, state management patterns, form handling, and performance optimization.',
    icon: Puzzle,
    href: '/docs/frontend/readme',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    articles: 7
  },
  {
    title: 'Styling & Design System',
    description: 'Tailwind v4 setup, shadcn/ui customization, design tokens, theming, and responsive patterns.',
    icon: Palette,
    href: '/docs/styling/readme',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    articles: 7
  },
  {
    title: 'Testing & Quality Assurance',
    description: 'Testing strategies with Vitest, integration testing, E2E setup, linting, and CI/CD workflows.',
    icon: TestTube,
    href: '/docs/testing/readme',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    articles: 7
  },
  {
    title: 'AI Development Tools',
    description: 'AI-assisted development with Cursor, Windsurf, Claude projects, prompt engineering, and best practices.',
    icon: Bot,
    href: '/docs/ai-tools/readme',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    articles: 9
  },
  {
    title: 'Deployment & DevOps',
    description: 'Production deployment with Vercel, environment management, monitoring, logging, and disaster recovery.',
    icon: Cloud,
    href: '/docs/deployment/readme',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    articles: 7
  },
  {
    title: 'Common Patterns & Recipes',
    description: 'Reusable patterns for authentication, data loading, forms, file uploads, search, and real-time features.',
    icon: Puzzle,
    href: '/docs/patterns/readme',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    articles: 8
  },
  {
    title: 'Troubleshooting & FAQ',
    description: 'Common issues and solutions for Next.js, Supabase, database, authentication, and deployment problems.',
    icon: HelpCircle,
    href: '/docs/troubleshooting/readme',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    articles: 8
  },
  {
    title: 'Architecture Decision Records (ADRs)',
    description: 'Understand the "why" behind technology choices: Next.js, Supabase, Drizzle, Tailwind, and more.',
    icon: FileText,
    href: '/docs/adrs/readme',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    articles: 8
  }
]

export default function DocsPage() {
  const featuredSection = documentationSections.find(section => section.featured)
  const otherSections = documentationSections.filter(section => !section.featured)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Welcome to your Next.js boilerplate documentation. Learn how to build secure, 
          scalable applications with our comprehensive guides and best practices.
        </p>
      </div>

      {/* Featured "Start Here" Card */}
      {featuredSection && (
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <featuredSection.icon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  Start Here
                </CardTitle>
                <CardDescription className="text-base">
                  {featuredSection.title}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {featuredSection.description}
            </p>
            <div className="flex items-center gap-4">
              <Button asChild size="lg">
                <Link href={featuredSection.href}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <span className="text-sm text-muted-foreground">
                {featuredSection.articles} comprehensive guides
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documentation Sections Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Documentation Sections</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {otherSections.map((section) => {
            const IconComponent = section.icon
            return (
              <Card key={section.title} className="group hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${section.bgColor}`}>
                      <IconComponent className={`h-5 w-5 ${section.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base leading-tight">
                        {section.title}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {section.articles} articles
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                    {section.description}
                  </p>
                  <Button variant="ghost" size="sm" asChild className="w-full justify-start p-0 h-auto">
                    <Link href={section.href} className="group-hover:text-primary transition-colors">
                      Explore Section
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
        <Button asChild size="lg">
          <Link href="/docs/quick-start/how-to-setup-project">
            <Rocket className="mr-2 h-4 w-4" />
            Start Building
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/blog">
            <FileText className="mr-2 h-4 w-4" />
            Read Blog
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/docs/troubleshooting/frequently-asked-questions">
            <HelpCircle className="mr-2 h-4 w-4" />
            FAQ
          </Link>
        </Button>
      </div>
    </div>
  )
}