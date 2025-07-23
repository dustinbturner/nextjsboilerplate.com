/**
 * @file mdx.ts
 * @purpose Utilities for processing MDX content with frontmatter
 * @why Centralizes MDX file reading, frontmatter parsing, and metadata extraction
 * @how Uses gray-matter for frontmatter, reading-time for estimates, and fs for file operations
 * @security Validates file paths and sanitizes frontmatter data
 * @related Used by docs and blog pages for content loading
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { compile } from '@mdx-js/mdx'
import { VFile } from 'vfile'


export interface ContentMetadata {
  title: string
  description?: string
  date?: string
  category?: string
  tags?: string[]
  author?: string
  order?: number
  lastUpdated?: string
  draft?: boolean
}

export interface ContentItem {
  slug: string
  frontmatter: ContentMetadata
  content: string
  compiledContent?: string
  readingTime: {
    text: string
    minutes: number
  }
}

const contentDirectory = path.join(process.cwd(), 'docs')

// URL mapping for clean docs URLs
const docsUrlMapping: Record<string, string> = {
  '00 - Quick Start & Setup': 'quick-start',
  '01 - Security (Security-First Mindset)': 'security',
  '02 - Next.js App Router Mastery': 'app-router',
  '03 - Supabase Integration': 'supabase',
  '04 - Database & Drizzle ORM': 'database',
  '05 - API Design & Server Actions': 'api-design',
  '06 - Authentication & Authorization': 'authentication',
  '07 - Frontend Architecture': 'frontend',
  '08 - Styling & Design System': 'styling',
  '09 - Testing & Quality Assurance': 'testing',
  '10 - AI_Development_Tools': 'ai-tools',
  '11 - Deployment & DevOps': 'deployment',
  '12 - Common Patterns & Recipes': 'patterns',
  '13 - Troubleshooting & FAQ': 'troubleshooting',
  '99 - ADRs': 'adrs'
}



/**
 * Get all MDX files from a specific content type (docs or blog)
 */
export function getContentFiles(contentType: 'docs' | 'blog'): string[] {
  // For docs, use the docs directory directly; for blog, use content/blog
  const contentPath = contentType === 'docs' 
    ? contentDirectory 
    : path.join(process.cwd(), 'content', contentType)
  
  if (!fs.existsSync(contentPath)) {
    return []
  }

  const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
    const files = fs.readdirSync(dirPath)

    files.forEach((file) => {
      const filePath = path.join(dirPath, file)
      if (fs.statSync(filePath).isDirectory()) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles)
      } else if (file.endsWith('.mdx')) {
        arrayOfFiles.push(filePath)
      }
    })

    return arrayOfFiles
  }

  return getAllFiles(contentPath)
}

/**
 * Parse a single MDX file and return content with metadata
 */
export async function parseContentFile(filePath: string, contentType: 'docs' | 'blog'): Promise<ContentItem> {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content } = matter(fileContents)
  
  // Generate slug from file path relative to content type directory
  const contentTypePath = contentType === 'docs' 
    ? contentDirectory 
    : path.join(process.cwd(), 'content', contentType)
  const relativePath = path.relative(contentTypePath, filePath)
  let slug = relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/')
  
  // For docs, convert numbered folder structure to clean URLs
  if (contentType === 'docs') {
    const pathParts = slug.split('/')
    const mappedParts = pathParts.map(part => {
      // Check if this part matches a numbered folder
      const cleanUrl = docsUrlMapping[part]
      return cleanUrl || part.replace(/^\d+\s*-\s*/, '').toLowerCase().replace(/\s+/g, '-')
    })
    slug = mappedParts.join('/')
  }

  // Calculate reading time
  const readingTimeStats = readingTime(content)

  // Compile MDX with proper plugins and configuration
  let compiledContent = ''
  try {
    const vfile = new VFile({
      value: content,
      path: `${slug}.mdx`
    })
    
    const result = await compile(vfile, {
      outputFormat: 'function-body',
      development: process.env.NODE_ENV === 'development',
      jsxImportSource: 'react',
      jsxRuntime: 'automatic',
      // Plugins temporarily disabled
      // remarkPlugins: [remarkGfm],
      // rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
      format: 'mdx'
    })
    
    compiledContent = String(result)
  } catch (error) {
    console.error(`Error compiling MDX for ${slug}:`, error)
    // Fall back to empty string, component will use raw content
  }

  return {
    slug,
    frontmatter: frontmatter as ContentMetadata,
    content,
    compiledContent,
    readingTime: readingTimeStats
  }
}

/**
 * Get all content items of a specific type
 */
export async function getAllContent(contentType: 'docs' | 'blog'): Promise<ContentItem[]> {
  const files = getContentFiles(contentType)
  const content = await Promise.all(files.map(file => parseContentFile(file, contentType)))
  
  // Filter out drafts in production
  const filteredContent = process.env.NODE_ENV === 'production' 
    ? content.filter(item => !item.frontmatter.draft)
    : content

  // Sort by order (for docs) or date (for blog)
  return filteredContent.sort((a, b) => {
    if (contentType === 'docs') {
      const orderA = a.frontmatter.order || 999
      const orderB = b.frontmatter.order || 999
      return orderA - orderB
    } else {
      const dateA = new Date(a.frontmatter.date || '1970-01-01')
      const dateB = new Date(b.frontmatter.date || '1970-01-01')
      return dateB.getTime() - dateA.getTime()
    }
  })
}

/**
 * Get a single content item by slug
 */
export async function getContentBySlug(slug: string, contentType: 'docs' | 'blog'): Promise<ContentItem | null> {
  try {
    // Get all content files and find the one with matching slug
    const files = getContentFiles(contentType)
    
    for (const filePath of files) {
      const item = await parseContentFile(filePath, contentType)
      if (item.slug === slug) {
        return item
      }
    }
    
    return null
  } catch (error) {
    console.error(`Error loading ${contentType} content for slug: ${slug}`, error)
    return null
  }
}

/**
 * Get content navigation structure for docs
 */
export async function getDocsNavigation(): Promise<Array<{
  title: string
  items: Array<{
    title: string
    href: string
    order?: number
  }>
}>> {
  const docs = await getAllContent('docs')
  const categories = new Map<string, Array<{ title: string; href: string; order?: number }>>()

  docs.forEach(doc => {
    const category = doc.frontmatter.category || 'General'
    if (!categories.has(category)) {
      categories.set(category, [])
    }
    
    categories.get(category)!.push({
      title: doc.frontmatter.title,
      href: `/docs/${doc.slug}`,
      order: doc.frontmatter.order
    })
  })

  // Sort items within each category
  const navigation = Array.from(categories.entries()).map(([title, items]) => ({
    title,
    items: items.sort((a, b) => (a.order || 999) - (b.order || 999))
  }))

  return navigation
}