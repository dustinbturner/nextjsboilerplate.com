/**
 * @file marketing/header.tsx
 * @purpose Marketing site header with navigation and branding
 * @why Provides consistent navigation and branding across marketing pages
 * @how Uses shadcn/ui components for consistent styling and behavior
 * @related Used in marketing layout and landing page
 */

'use client'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  GitBranch, 
  Menu,
  X,
  Star,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface MarketingHeaderProps {
  className?: string
}

export function MarketingHeader({ className }: MarketingHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={`relative z-50 border-b border-border bg-card ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-6 ">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            aria-label="NextJS Boilerplate - Go to homepage"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm" aria-hidden="true">NB</span>
            </div>
            <div>
              <span className="text-foreground font-semibold text-lg">NextJS Boilerplate</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/examples" className="text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                asChild
                aria-label="Star this project on GitHub"
              >
                <a href="https://github.com/dustinbturner/nextjsboilerplate.com" target="_blank" rel="noopener noreferrer">
                  <Star className="w-4 h-4 mr-2" />
                  Star
                </a>
              </Button>
              <Button 
                size="sm"
                asChild
                aria-label="View repository on GitHub"
              >
                <a href="https://github.com/dustinbturner/nextjsboilerplate.com" target="_blank" rel="noopener noreferrer">
                  <GitBranch className="w-4 h-4 mr-2" />
                  View Repo
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden mt-6 pt-6 border-t border-border"
          >
            <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
              <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/examples" className="text-muted-foreground hover:text-foreground transition-colors">
                Examples
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Separator />
              <div className="flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  asChild
                  aria-label="Star this project on GitHub"
                >
                  <a href="https://github.com/dustinbturner/nextjsboilerplate.com" target="_blank" rel="noopener noreferrer">
                    <Star className="w-4 h-4 mr-2" />
                    Star on GitHub
                  </a>
                </Button>
                <Button 
                  size="sm" 
                  className="w-full"
                  asChild
                  aria-label="View repository on GitHub"
                >
                  <a href="https://github.com/dustinbturner/nextjsboilerplate.com" target="_blank" rel="noopener noreferrer">
                    <GitBranch className="w-4 h-4 mr-2" />
                    View Repository
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}