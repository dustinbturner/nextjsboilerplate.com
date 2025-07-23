/**
 * @file (docs)/layout.tsx
 * @purpose Layout wrapper for documentation pages
 * @why Provides consistent sidebar navigation and styling for docs
 * @how Uses shadcn/ui components for responsive layout with sidebar
 * @security No special security considerations - public documentation
 * @related /src/components/docs/ - Documentation-specific components
 */

import { DocsSidebar } from '@/components/docs/docs-sidebar'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-neutral-100">
      <DocsSidebar />
      <main className="flex-1 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  )
}