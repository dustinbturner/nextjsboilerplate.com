/**
 * @file app/page.tsx
 * @purpose Main landing page for the Next.js boilerplate
 * @why Showcases the boilerplate features and provides entry point for users
 * @how Uses modular marketing components for clean separation of concerns
 * @related Marketing components in src/components/marketing/
 */

import { MarketingHeader } from "@/components/marketing/header"
import { MarketingHero } from "@/components/marketing/hero"
import { MarketingFeatures } from "@/components/marketing/features"
import { MarketingFooter } from "@/components/marketing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <MarketingHeader />
      <MarketingHero />
      <MarketingFeatures />
      <MarketingFooter />
    </div>
  )
}