import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validate environment variables exist
  if (!supabaseUrl || !supabaseAnonKey || 
      supabaseUrl === 'https://suitxmtcojmiivwfhmrf.supabase.co' || 
      supabaseAnonKey === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1aXR4bXRjb2ptaWl2d2ZobXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMDg3OTUsImV4cCI6MjA3MzY4NDc5NX0.utYDwlNmx7pPy3CQCN1ylcVgOIX8RTeu0GHNEIocGVQ') {
    throw new Error(
      'Missing or invalid Supabase environment variables. Please check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set with your actual Supabase project credentials.'
    )
  }

  // Validate URL format
  if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
    throw new Error(
      'Invalid Supabase URL format. The NEXT_PUBLIC_SUPABASE_URL must be a valid HTTP or HTTPS URL (e.g., https://your-project-ref.supabase.co)'
    )
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The "setAll" method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
