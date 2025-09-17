import { createClient } from "@/lib/supabase/server"

export interface AdminStats {
  totalQuotes: number
  pendingQuotes: number
  totalAuthors: number
  totalUsers: number
  totalLikes: number
  totalComments: number
}

export interface PendingQuote {
  id: string
  content: string
  note: string | null
  created_at: string
  author: {
    id: string
    name: string
    category: string
  }
  submitted_by: {
    id: string
    full_name: string | null
    username: string | null
    email: string
  }
}

export async function checkAdminAccess(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("profiles").select("role").eq("id", userId).single()

  if (error || !data) {
    return false
  }

  return data.role === "admin"
}

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createClient()

  const [quotesResult, pendingResult, authorsResult, usersResult, likesResult, commentsResult] = await Promise.all([
    supabase.from("quotes").select("id", { count: "exact", head: true }),
    supabase.from("quotes").select("id", { count: "exact", head: true }).eq("is_approved", false),
    supabase.from("authors").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("likes").select("id", { count: "exact", head: true }),
    supabase.from("comments").select("id", { count: "exact", head: true }),
  ])

  return {
    totalQuotes: quotesResult.count || 0,
    pendingQuotes: pendingResult.count || 0,
    totalAuthors: authorsResult.count || 0,
    totalUsers: usersResult.count || 0,
    totalLikes: likesResult.count || 0,
    totalComments: commentsResult.count || 0,
  }
}

export async function getPendingQuotes(limit = 20, offset = 0): Promise<PendingQuote[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("quotes")
    .select(`
      id,
      content,
      note,
      created_at,
      author:authors(id, name, category),
      submitted_by:profiles(id, full_name, username, email)
    `)
    .eq("is_approved", false)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching pending quotes:", error)
    return []
  }

  return data || []
}

export async function approveQuote(quoteId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("quotes").update({ is_approved: true }).eq("id", quoteId)

  if (error) {
    console.error("Error approving quote:", error)
    return false
  }

  return true
}

export async function rejectQuote(quoteId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("quotes").delete().eq("id", quoteId)

  if (error) {
    console.error("Error rejecting quote:", error)
    return false
  }

  return true
}

export async function toggleFeaturedQuote(quoteId: string, featured: boolean) {
  const supabase = await createClient()

  const { error } = await supabase.from("quotes").update({ is_featured: featured }).eq("id", quoteId)

  if (error) {
    console.error("Error toggling featured quote:", error)
    return false
  }

  return true
}

export async function getUsers(limit = 20, offset = 0) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select(`
      id,
      email,
      full_name,
      username,
      role,
      is_verified,
      created_at,
      quotes:quotes(count)
    `)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching users:", error)
    return []
  }

  return (
    data?.map((user) => ({
      ...user,
      quotes_count: user.quotes?.[0]?.count || 0,
    })) || []
  )
}

export async function updateUserRole(userId: string, role: "user" | "author" | "admin") {
  const supabase = await createClient()

  const { error } = await supabase.from("profiles").update({ role }).eq("id", userId)

  if (error) {
    console.error("Error updating user role:", error)
    return false
  }

  return true
}

export async function getAds() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("ads").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching ads:", error)
    return []
  }

  return data || []
}

export async function createAd(adData: { name: string; ad_code: string; position: string }) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("ads").insert(adData).select().single()

  if (error) {
    console.error("Error creating ad:", error)
    return null
  }

  return data
}

export async function updateAd(adId: string, updates: { name?: string; ad_code?: string; is_active?: boolean }) {
  const supabase = await createClient()

  const { error } = await supabase.from("ads").update(updates).eq("id", adId)

  if (error) {
    console.error("Error updating ad:", error)
    return false
  }

  return true
}

export async function deleteAd(adId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("ads").delete().eq("id", adId)

  if (error) {
    console.error("Error deleting ad:", error)
    return false
  }

  return true
}
