/**
 * @file marketing/features.tsx
 * @purpose Features section showcasing key benefits and capabilities
 * @why Highlights the main value propositions and technical features
 * @how Uses shadcn/ui components for consistent styling and layout
 * @related Used in the main landing page
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Zap, 
  Brain, 
  Code2, 
  Database, 
  BookOpen,
  Sparkles
} from "lucide-react"

interface MarketingFeaturesProps {
  className?: string
}

export function MarketingFeatures({ className }: MarketingFeaturesProps) {
  const features = [
    {
      icon: Shield,
      title: "Security-First Architecture",
      description: "Row Level Security, input validation, and security headers configured from day one.",
      badge: "Secure"
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "Server components, edge functions, and optimized bundle sizes for lightning-fast apps.",
      badge: "Fast"
    },
    {
      icon: Brain,
      title: "AI-Ready Workflows",
      description: "Cursor, Windsurf, and Claude integration patterns for AI-assisted development.",
      badge: "AI-Powered"
    },
    {
      icon: Code2,
      title: "Modern Stack",
      description: "Next.js 15.4.3, TypeScript, Tailwind v4, shadcn/ui, and Supabase integration.",
      badge: "Latest"
    },
    {
      icon: Database,
      title: "Database Excellence",
      description: "Drizzle ORM, type-safe queries, and migration strategies that scale.",
      badge: "Scalable"
    },
    {
      icon: BookOpen,
      title: "Teaching Documentation",
      description: "Every file explains the 'why' behind decisions with inline docs and examples.",
      badge: "Educational"
    }
  ]

  const techStack = [
    { name: "Next.js", version: "15.4.3", color: "bg-black text-white" },
    { name: "TypeScript", version: "5.x", color: "bg-blue-600 text-white" },
    { name: "Tailwind CSS", version: "v4", color: "bg-cyan-500 text-white" },
    { name: "Supabase", version: "Latest", color: "bg-green-600 text-white" },
    { name: "Drizzle ORM", version: "Latest", color: "bg-orange-500 text-white" },
    { name: "shadcn/ui", version: "Latest", color: "bg-slate-800 text-white" }
  ]



  return (
    <div className={`py-24 ${className || ''}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Features Grid */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Ship Fast
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Security, performance, and developer experience built in from the start
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:bg-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="w-8 h-8 text-primary" />
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Modern Tech Stack
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Built with the latest and greatest tools for modern web development
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <Badge key={tech.name} variant="outline" className="px-3 py-1">
                {tech.name} {tech.version}
              </Badge>
            ))}
          </div>
        </div>


      </div>
    </div>
  )
}
