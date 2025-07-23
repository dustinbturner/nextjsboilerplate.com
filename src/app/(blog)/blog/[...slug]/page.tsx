/**
 * @file blog/[...slug]/page.tsx
 * @purpose Dynamic routing for blog pages
 * @why Handles all /blog/* routes with MDX content rendering
 * @how Uses dynamic imports to load MDX files from content/blog directory
 * @security Validates slug parameters and sanitizes content paths
 * @related /src/lib/mdx.ts - Content loading utilities
 */

import { notFound } from 'next/navigation'
import { getAllContent, getContentBySlug } from '@/lib/mdx'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'

interface BlogPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateStaticParams() {
  const posts = await getAllContent('blog')
  
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }))
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const slugString = slug.join('/')
  const post = await getContentBySlug(slugString, 'blog')

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    authors: post.frontmatter.author ? [{ name: post.frontmatter.author }] : undefined,
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const slugString = slug.join('/')
  const post = await getContentBySlug(slugString, 'blog')

  if (!post) {
    notFound()
  }

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <header className="mb-8">
        <h1 className="mb-2">{post.frontmatter.title}</h1>
        {post.frontmatter.description && (
          <p className="text-lg text-muted-foreground">{post.frontmatter.description}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
          {post.frontmatter.author && <span>By {post.frontmatter.author}</span>}
          {post.frontmatter.date && (
            <span>{new Date(post.frontmatter.date).toLocaleDateString()}</span>
          )}
          <span>Reading time: {post.readingTime.text}</span>
        </div>
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="flex gap-2 mt-4">
            {post.frontmatter.tags.map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
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
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}