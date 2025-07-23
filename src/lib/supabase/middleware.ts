/**
 * @file supabase/middleware.ts
 * @purpose Supabase-specific middleware for session management and route protection
 * @why Handles Supabase auth sessions and enforces route protection based on authentication status
 * @how Creates Supabase client, checks user session, and redirects unauthenticated users from protected routes
 * @security Enforces authentication requirements and maintains secure session state
 * @related /src/middleware.ts - Main middleware that calls this function
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Updates Supabase session and enforces route protection
 * 
 * This function:
 * 1. Creates a Supabase client with proper cookie handling
 * 2. Refreshes the user's authentication session
 * 3. Checks if the user is authenticated
 * 4. Redirects unauthenticated users away from protected routes
 * 5. Allows authenticated users to access all routes
 * 
 * @param request - The incoming Next.js request
 * @returns NextResponse - Either allows the request or redirects to login
 */
export async function updateSession(request: NextRequest) {
  // Create the response object that will be returned
  // This must be done first to properly handle cookies
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Create Supabase client with cookie handling
  // This client can read and write cookies for session management
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Read all cookies from the request
        getAll() {
          return request.cookies.getAll()
        },
        // Set cookies on both request and response
        setAll(cookiesToSet) {
          // Set cookies on the request for immediate use
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          
          // Create new response to ensure cookies are properly set
          supabaseResponse = NextResponse.next({
            request,
          })
          
          // Set cookies on the response to send back to browser
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 🚨 CRITICAL: Do not run code between createServerClient and supabase.auth.getClaims()
  // Any code here could interfere with session refresh and cause random logouts

  // Get the current user's authentication claims
  // This also refreshes the session if needed
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  // 🔒 ROUTE PROTECTION LOGIC
  // 
  // Define which routes require authentication:
  const protectedRoutes = [
    '/dashboard',
    // Add more protected route prefixes here as needed
    // Example: '/admin', '/profile', '/settings'
  ]

  // Define which routes are always public (no auth required):
  const publicRoutes = [
    '/',           // Home page
    '/auth',       // All auth routes (login, signup, etc.)
    '/about',      // Public pages
    '/contact',
    '/faq',
    '/blog',
    // Add more public routes here as needed
  ]

  // Check if the current path requires authentication
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  // If user is not authenticated and trying to access a protected route
  if (!user && isProtectedRoute) {
    // Redirect to login page
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    
    // Optional: Add the original URL as a redirect parameter
    // so user can be sent back after login
    url.searchParams.set('redirectTo', request.nextUrl.pathname)
    
    return NextResponse.redirect(url)
  }

  // 📝 CUSTOMIZATION NOTES:
  // 
  // To modify route protection:
  // 1. Add routes to protectedRoutes array to require authentication
  // 2. Add routes to publicRoutes array to allow without authentication
  // 3. Modify the redirect logic above if you want different behavior
  // 
  // Advanced customization:
  // - Add role-based access control by checking user.role
  // - Add different redirect destinations based on user type
  // - Add rate limiting or other security measures

  // 🚨 CRITICAL: You MUST return the supabaseResponse object
  // 
  // This response object contains the updated session cookies.
  // If you need to create a custom response:
  // 1. Create new response: const customResponse = NextResponse.next({ request })
  // 2. Copy cookies: customResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Make your modifications
  // 4. Return the custom response
  // 
  // Failure to properly handle cookies will cause session issues!

  return supabaseResponse
}
