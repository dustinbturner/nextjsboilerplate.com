/**
 * @file blog/page.tsx
 * @purpose Blog index page listing all blog posts
 * @why Provides a central hub for discovering blog content
 * @how Fetches all blog posts and displays them in a grid with metadata
 * @security No special security considerations - public blog content
 * @related /content/blog/ - Blog post content files
 */

import Link from 'next/link'
import { getAllContent } from '@/lib/mdx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest articles and insights from our team',
}

export default async function BlogIndex() {
  const posts = await getAllContent('blog')
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || '1970-01-01')
    const dateB = new Date(b.frontmatter.date || '1970-01-01')
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Latest articles and insights from our team
        </p>
      </header>

      <div className="grid gap-8 md:gap-12">
        {sortedPosts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="space-y-3">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  {post.frontmatter.description && (
                    <p className="text-muted-foreground">
                      {post.frontmatter.description}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {post.frontmatter.author && (
                    <span>By {post.frontmatter.author}</span>
                  )}
                  {post.frontmatter.date && (
                    <span>
                      {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                  <span>{post.readingTime.text}</span>
                </div>

                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <div className="flex gap-2">
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
              </div>
            </Link>
          </article>
        ))}
      </div>

      {sortedPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      )}
    </div>
  )
}
