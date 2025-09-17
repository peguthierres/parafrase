import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getUser() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/authors",
    "/categories",
    "/quotes",
    "/search",
    "/popular",
    "/recent",
    "/about",
    "/contact",
    "/termos-de-uso",
    "/politica-de-privacidade",
    "/cookies",
    "/auth/login",
    "/auth/register",
    "/auth/verify-email",
    "/auth/error",
  ]

  // Define protected routes that require authentication
  const protectedRoutes = ["/admin", "/add-quote", "/profile", "/settings"]

  // Check if the current path is a public route or starts with a public route
  const isPublicRoute = publicRoutes.some(route => {
    if (route === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(route)
  })

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Only redirect to login if:
  // 1. User is not authenticated AND
  // 2. Trying to access a protected route AND
  // 3. Not already on an auth page
  if (!user && isProtectedRoute && !pathname.startsWith("/auth")) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    url.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(url)
  }

  // If user is authenticated and trying to access auth pages, redirect to home
  if (user && pathname.startsWith("/auth") && pathname !== "/auth/error") {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}