/**
 * @file mdx-content.tsx
 * @purpose Client component for rendering compiled MDX content
 * @why MDX requires client-side rendering due to React Context usage
 * @how Uses compiled MDX function body in a safe client component wrapper
 * @security Validates compiled content before rendering
 * @related Used by docs and blog pages for content rendering
 */

'use client'

import React, { useEffect, useState } from 'react'
import { run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

interface MDXContentProps {
  compiledContent?: string
  rawContent?: string
}

export function MDXContent({ compiledContent, rawContent }: MDXContentProps) {
  const [MDXComponent, setMDXComponent] = useState<React.ComponentType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (compiledContent && compiledContent.trim()) {
      setIsLoading(true)
      setError(null)
      
      // Use the proper MDX run utility to execute compiled function body
      run(compiledContent, {
        ...runtime,
        baseUrl: import.meta.url
      })
        .then(({ default: Component }) => {
          setMDXComponent(() => Component)
          setIsLoading(false)
        })
        .catch((err) => {
          console.error('Error rendering compiled MDX:', err)
          setError(err.message)
          setIsLoading(false)
        })
    }
  }, [compiledContent])

  // Show loading state
  if (isLoading) {
    return <div className="animate-pulse">Loading content...</div>
  }

  // Show compiled MDX content if available
  if (MDXComponent && !error) {
    return <MDXComponent />
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4 border border-red-200 rounded-md bg-red-50">
        <p className="text-red-800">Error rendering content: {error}</p>
      </div>
    )
  }

  // Fallback to raw markdown content with better styling
  if (rawContent) {
    return (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-4 rounded-md border text-sm overflow-x-auto">
          {rawContent}
        </pre>
      </div>
    )
  }

  // No content available
  return <div>Content not available</div>
}

MDXContent.displayName = 'MDXContent'