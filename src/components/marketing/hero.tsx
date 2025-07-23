/**
 * @file marketing/hero.tsx
 * @purpose Main hero section for the landing page
 * @why Captures attention and communicates the main value proposition
 * @how Uses shadcn/ui components for consistent styling and interactive elements
 * @related Used in the main landing page
 */

'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { 
  GitBranch, 
  BookOpen, 
  Copy,
  Check,
  Sparkles
} from "lucide-react"
import { useState } from "react"

interface MarketingHeroProps {
  className?: string
}

export function MarketingHero({ className }: MarketingHeroProps) {
  const [copied, setCopied] = useState(false)
  
  const copyCommand = async () => {
    await navigator.clipboard.writeText("gh repo clone dustinbturner/nextjsboilerplate.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const projectStructure = {
    docs: [
      "00 - Quick Start & Setup",
      "01 - Security (Security-First Mindset)", 
      "02 - Next.js App Router Mastery",
      "03 - Supabase Integration",
      "..."
    ],
    src: [
      "app/",
      "├── (auth)/",
      "├── (dashboard)/",
      "├── layout.tsx",
      "├── page.tsx",
      "components/",
      "├── ui/",
      "├── auth/",
      "├── marketing/",
      "lib/",
      "├── supabase/" 
    ]
  }

  return (
    <div className={`relative isolate overflow-hidden ${className || ''}`}>
      {/* Enhanced Background Pattern */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-border/50 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="hero-pattern"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-muted/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#hero-pattern)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-4 sm:pb-32 lg:flex lg:px-8 lg:py-24">
        {/* Left Column - Content */}
        <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-16">
          {/* Badge */}
          <div className="mt-0">
            <Badge variant="secondary" className="inline-flex items-center space-x-2">
              <Sparkles className="w-3 h-3" />
              <span>Next.js 15.4.3 • Supabase • AI-Ready</span>
            </Badge>
          </div>
          
          {/* Main Headline */}
          <h1 className="mt-10 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            The Next.js Boilerplate for{' '}
            <span className="text-primary">Vibe Coders</span>
          </h1>
          
          {/* Subtitle */}
          <p className="mt-8 text-pretty text-md font-normal text-muted-foreground sm:text-lg">
            Ship secure, scalable Next.js apps with <strong className="text-foreground">best practices baked in</strong>. 
            Every file teaches you something new with inline docs, security-first patterns, and AI-friendly workflows.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex items-center gap-x-6">
            <Button size="lg" className="font-semibold px-8">
              <GitBranch className="w-4 h-4 mr-2" />
              Get started
            </Button>
            <Button size="lg" variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Read the docs
            </Button>
          </div>
          
          {/* Terminal Command */}
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 border border-border/50">
              <div className="flex items-center gap-2 text-chart-2 font-mono text-xs">
                <span className="text-muted-foreground">$</span>
                <span>gh repo clone dustinbturner/nextjsboilerplate.com</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyCommand}
                className="h-6 w-6 p-0"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right Column - Project Structure Preview */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="w-[76rem] max-w-none">
              <Card className="bg-card/50 backdrop-blur border-border/50 shadow-2xl ring-1 ring-border/10 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="text-foreground font-semibold text-lg">Complete Project Structure</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Documentation Structure */}
                  <div>
                    <div className="text-sm text-muted-foreground mb-3 font-mono">📁 docs/</div>
                    <div className="space-y-1 text-sm">
                      {projectStructure.docs.map((folder) => (
                        <div 
                          key={folder} 
                          className="text-foreground pl-3 border-l border-border hover:border-primary/50 transition-colors py-0.5 hover:bg-accent/20 rounded-r text-xs font-mono"
                        >
                          {folder === '...' ? (
                            <span className="text-muted-foreground italic">+ 11 more sections</span>
                          ) : (
                            <>📂 {folder}</>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Source Code Structure */}
                  <div>
                    <div className="text-sm text-muted-foreground mb-3 font-mono">📁 src/</div>
                    <div className="space-y-1 text-sm">
                      {projectStructure.src.map((item) => (
                        <div 
                          key={item} 
                          className="text-foreground pl-3 border-l border-border hover:border-primary/50 transition-colors py-0.5 hover:bg-accent/20 rounded-r text-xs font-mono"
                        >
                          {item.includes('/') ? (
                            <span className="text-chart-1">{item.startsWith('├') || item.startsWith('│') ? item : `📂 ${item}`}</span>
                          ) : (
                            <span className="text-chart-3">📄 {item}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-foreground">Complete boilerplate</strong> with teaching-focused documentation, 
                    organized codebase, and security-first patterns. Ready to clone and customize.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}