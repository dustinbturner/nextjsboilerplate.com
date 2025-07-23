/**
 * @file (blog)/layout.tsx
 * @purpose Layout wrapper for blog pages
 * @why Provides consistent styling and navigation for blog content
 * @how Simple centered layout with proper typography constraints
 * @security No special security considerations - public blog content
 * @related /src/components/blog/ - Blog-specific components (if needed)
 */

import { MarketingHeader } from "@/components/marketing/header"
import { MarketingFooter } from "@/components/marketing/footer"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-100">
      <MarketingHeader />
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-24">
        {children}
      </div>
      <MarketingFooter />
    </div>
  )
}