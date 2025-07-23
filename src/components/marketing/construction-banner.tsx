'use client'

import { useState } from 'react'
import { X, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ConstructionBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-red-50 border-b border-red-200">
      <div className="max-w-7xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center">
            <span className="flex p-1">
              <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden="true" />
            </span>
            <p className="ml-2 text-xs text-neutral-700 font-normal">
              <span className="hidden md:inline">
                This Next.js boilerplate is actively being developed — documentation and features are being updated regularly during the build process.
              </span>
              <span className="inline md:hidden">
                Boilerplate under active development.
              </span>
            </p>
          </div>
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 focus:outline-none"
              onClick={() => setIsVisible(false)}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}