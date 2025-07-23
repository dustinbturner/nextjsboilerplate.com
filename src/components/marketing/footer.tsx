/**
 * @file marketing/footer.tsx
 * @purpose Marketing site footer with links and branding
 * @why Provides consistent footer across marketing pages with important links
 * @how Uses shadcn/ui components for consistent styling
 * @related Used in marketing layout and landing page
 */

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  GitBranch,
  Star,
  BookOpen,
  Users,
  Lock,
  Heart
} from "lucide-react"
import Link from "next/link"

interface MarketingFooterProps {
  className?: string
}

export function MarketingFooter({ className }: MarketingFooterProps) {
  return (
    <footer className={`border-t border-border bg-card ${className || ''}`}>
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link 
              href="/" 
              className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity"
              aria-label="NextJS Boilerplate - Go to homepage"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm" aria-hidden="true">NB</span>
              </div>
              <span className="text-foreground font-semibold text-lg">NextJS Boilerplate</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              Built for vibe coders who want to ship secure, scalable apps with best practices baked in.
            </p>
            <div className="flex gap-3">
              <Button 
                size="sm"
                aria-label="Clone this repository and start building"
              >
                <GitBranch className="w-4 h-4 mr-2" />
                Clone & Start Building
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                aria-label="Star this project on GitHub"
              >
                <Star className="w-4 h-4 mr-2" />
                Star on GitHub
              </Button>
            </div>
          </div>

          {/* Documentation Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Documentation</h4>
            <nav className="flex flex-col gap-3" aria-label="Documentation links">
              <Link href="/docs/quick-start" className="text-muted-foreground hover:text-foreground transition-colors">
                Quick Start
              </Link>
              <Link href="/docs/security" className="text-muted-foreground hover:text-foreground transition-colors">
                Security Guide
              </Link>
              <Link href="/docs/app-router" className="text-muted-foreground hover:text-foreground transition-colors">
                App Router
              </Link>
              <Link href="/docs/supabase" className="text-muted-foreground hover:text-foreground transition-colors">
                Supabase Integration
              </Link>
              <Link href="/docs/ai-tools" className="text-muted-foreground hover:text-foreground transition-colors">
                AI Development
              </Link>
            </nav>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Community</h4>
            <nav className="flex flex-col gap-3" aria-label="Community links">
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/examples" className="text-muted-foreground hover:text-foreground transition-colors">
                Examples
              </Link>
              <Link href="/showcase" className="text-muted-foreground hover:text-foreground transition-colors">
                Showcase
              </Link>
              <Link href="/contributing" className="text-muted-foreground hover:text-foreground transition-colors">
                Contributing
              </Link>
              <Link href="/issues" className="text-muted-foreground hover:text-foreground transition-colors">
                Issues & Support
              </Link>
              <Link href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">
                Changelog
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>MIT License</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Security First</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Well Documented</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-destructive" />
            <span>by vibe coders</span>
          </div>
        </div>
      </div>
    </footer>
  )
}