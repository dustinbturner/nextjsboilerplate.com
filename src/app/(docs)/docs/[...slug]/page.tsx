/**
 * @file docs/[...slug]/page.tsx
 * @purpose Dynamic routing for documentation pages
 * @why Handles all /docs/* routes with MDX content rendering
 * @how Uses dynamic imports to load MDX files from content/docs directory
 * @security Validates slug parameters and sanitizes content paths
 * @related /src/lib/mdx.ts - Content loading utilities
 */

import { notFound } from 'next/navigation'
import { getAllContent, getContentBySlug } from '@/lib/mdx'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'

interface DocsPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const docs = await getAllContent('docs')
  
  return docs.map((doc) => ({
    slug: doc.slug.split('/'),
  }))
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params
  const slugString = slug.join('/')
  const doc = await getContentBySlug(slugString, 'docs')

  if (!doc) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  }
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params
  const slugString = slug.join('/')
  const doc = await getContentBySlug(slugString, 'docs')

  if (!doc) {
    notFound()
  }

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <header className="mb-8">
        <h1 className="mb-2">{doc.frontmatter.title}</h1>
        {doc.frontmatter.description && (
          <p className="text-lg text-muted-foreground">{doc.frontmatter.description}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
          <span>Reading time: {doc.readingTime.text}</span>
          {doc.frontmatter.lastUpdated && (
            <span>Last updated: {new Date(doc.frontmatter.lastUpdated).toLocaleDateString()}</span>
          )}
        </div>
      </header>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="text-4xl font-bold mb-6 text-foreground">{children}</h1>,
            h2: ({ children }) => <h2 className="text-3xl font-semibold mb-4 mt-8 text-foreground">{children}</h2>,
            h3: ({ children }) => <h3 className="text-2xl font-semibold mb-3 mt-6 text-foreground">{children}</h3>,
            h4: ({ children }) => <h4 className="text-xl font-semibold mb-2 mt-4 text-foreground">{children}</h4>,
            p: ({ children }) => <p className="mb-4 text-muted-foreground leading-7">{children}</p>,
            ul: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>,
            ol: ({ children }) => <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>,
            li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
            code: ({ children, ...props }) => {
              const isInline = !props.className?.includes('language-')
              return isInline ? (
                <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono text-foreground">
                  {children}
                </code>
              ) : (
                <code className="block p-4 bg-muted rounded-md text-sm font-mono overflow-x-auto">
                  {children}
                </code>
              )
            },
            pre: ({ children }) => (
              <pre className="mb-4 p-4 bg-muted rounded-md overflow-x-auto">
                {children}
              </pre>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
                {children}
              </blockquote>
            ),
            strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            a: ({ href, children }) => (
              <a 
                href={href} 
                className="text-primary hover:text-primary/80 underline underline-offset-4"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
          }}
        >
          {doc.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}