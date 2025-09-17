import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validate environment variables exist
  if (!supabaseUrl || !supabaseAnonKey || 
      supabaseUrl === 'https://your-project-ref.supabase.co' || 
      supabaseAnonKey === 'your-anon-key-here') {
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

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
