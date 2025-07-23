/**
 * @file middleware.ts
 * @purpose Next.js middleware for handling authentication and route protection
 * @why This middleware runs before every request to handle session management and route protection
 * @how Currently configured to allow all routes (open mode). Enable authentication by following instructions below.
 * @security When auth is enabled, this enforces route protection at the edge before pages load
 * @related /src/lib/supabase/middleware.ts - Supabase-specific middleware logic
 */

// Import for when authentication is enabled
// import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest } from 'next/server'

/**
 * CURRENT MODE: OPEN ACCESS (No Authentication Required)
 * 
 * This middleware is currently configured to allow access to all routes without authentication.
 * This is perfect for:
 * - Design and development work
 * - Building UI components
 * - Testing layouts and functionality
 * - Demo purposes
 * 
 * TO ENABLE AUTHENTICATION:
 * 
 * 1. Ensure your .env file has valid Supabase credentials:
 *    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
 * 
 * 2. Replace the middleware function below with:
 *    export async function middleware(request: NextRequest) {
 *      return await updateSession(request)
 *    }
 * 
 * 3. The updateSession function in /src/lib/supabase/middleware.ts handles:
 *    - Session refresh
 *    - Route protection
 *    - Redirects to login for protected routes
 * 
 * 4. Protected routes (when auth is enabled):
 *    - /dashboard/* - Requires authentication
 *    - All other routes remain public
 * 
 * 5. Public routes (always accessible):
 *    - / (home)
 *    - /auth/* (login, signup, etc.)
 *    - /about, /contact, /faq, etc.
 */

export async function middleware(_request: NextRequest) {
  // OPEN MODE: Allow all routes without authentication
  // This passes through all requests without any auth checks
  
  // 🔒 TO ENABLE AUTHENTICATION:
  // 1. Uncomment the import above: import { updateSession } from '@/lib/supabase/middleware'
  // 2. Replace this function with:
  //    export async function middleware(request: NextRequest) {
  //      return await updateSession(request)
  //    }
  
  return // Allow all requests to pass through
}

/**
 * Middleware Configuration
 * 
 * This matcher determines which routes the middleware runs on.
 * Currently configured to run on all routes except:
 * - Static files (_next/static)
 * - Image optimization (_next/image) 
 * - Favicon and other assets
 * 
 * When authentication is enabled, this ensures the middleware
 * can protect all application routes while allowing assets to load freely.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Asset files (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
