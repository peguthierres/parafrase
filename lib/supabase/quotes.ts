import { createClient } from "@/lib/supabase/server"

export interface QuoteWithAuthor {
  id: string
  content: string
  note: string | null
  is_approved: boolean
  is_featured: boolean
  views_count: number
  created_at: string
  updated_at: string
  author: {
    id: string
    name: string
    category: string
    avatar_url: string | null
  }
  submitted_by: {
    id: string
    full_name: string | null
    username: string | null
  } | null
  likes_count?: number
  comments_count?: number
  is_liked?: boolean
}

export async function getQuotes(
  limit = 20,
  offset = 0,
  filters?: {
    authorId?: string
    category?: string
    featured?: boolean
    approved?: boolean
    userId?: string
  },
) {
  const supabase = await createClient()
  
  // Get current user to check likes
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let query = supabase
    .from("quotes")
    .select(`
      *,
      author:authors(*),
      submitted_by:profiles(id, full_name, username),
      likes:likes(count),
      comments:comments(count)
    `)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (filters?.authorId) {
    query = query.eq("author_id", filters.authorId)
  }

  if (filters?.featured !== undefined) {
    query = query.eq("is_featured", filters.featured)
  }

  if (filters?.approved !== undefined) {
    query = query.eq("is_approved", filters.approved)
  }

  if (filters?.userId) {
    query = query.eq("submitted_by", filters.userId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching quotes:", error)
    return []
  }

  // Check which quotes the current user has liked
  const quotesWithLikes = await Promise.all(
    (data || []).map(async (quote) => {
      let isLiked = false
      
      if (user) {
        const { data: likeData } = await supabase
          .from("likes")
          .select("id")
          .eq("user_id", user.id)
          .eq("quote_id", quote.id)
          .single()
        
        isLiked = !!likeData
      }
      
      return {
      ...quote,
      likes_count: quote.likes?.[0]?.count || 0,
      comments_count: quote.comments?.[0]?.count || 0,
      is_liked: isLiked,
      }
    })
  )
  
  return quotesWithLikes
}

export async function getQuoteById(id: string, userId?: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("quotes")
    .select(`
      *,
      author:authors(*),
      submitted_by:profiles(id, full_name, username),
      likes:likes(count),
      comments:comments(count)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching quote:", error)
    return null
  }

  // Check if current user liked this quote
  let isLiked = false
  if (userId) {
    const { data: likeData } = await supabase
      .from("likes")
      .select("id")
      .eq("user_id", userId)
      .eq("quote_id", id)
      .single()

    isLiked = !!likeData
  }

  // Increment view count
  await supabase
    .from("quotes")
    .update({ views_count: (data.views_count || 0) + 1 })
    .eq("id", id)

  return {
    ...data,
    likes_count: data.likes?.[0]?.count || 0,
    comments_count: data.comments?.[0]?.count || 0,
    is_liked: isLiked,
  }
}

export async function createQuote(quoteData: {
  content: string
  author_id: string
  note?: string
  submitted_by: string
}) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("quotes")
    .insert({
      content: quoteData.content,
      author_id: quoteData.author_id,
      note: quoteData.note || null,
      submitted_by: quoteData.submitted_by,
      is_approved: false, // Requires admin approval
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating quote:", error)
    return null
  }

  return data
}

export async function updateQuote(
  id: string,
  updates: {
    content?: string
    note?: string
    is_approved?: boolean
    is_featured?: boolean
  },
) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("quotes").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error updating quote:", error)
    return null
  }

  return data
}

export async function deleteQuote(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("quotes").delete().eq("id", id)

  if (error) {
    console.error("Error deleting quote:", error)
    return false
  }

  return true
}

export async function searchQuotes(query: string, limit = 20) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("quotes")
    .select(`
      *,
      author:authors(*),
      submitted_by:profiles(id, full_name, username),
      likes:likes(count),
      comments:comments(count)
    `)
    .or(`content.ilike.%${query}%, author.name.ilike.%${query}%`)
    .eq("is_approved", true)
    .order("views_count", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error searching quotes:", error)
    return []
  }

  return (
    data?.map((quote) => ({
      ...quote,
      likes_count: quote.likes?.[0]?.count || 0,
      comments_count: quote.comments?.[0]?.count || 0,
    })) || []
  )
}

export async function likeQuote(quoteId: string, userId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("likes").insert({
    quote_id: quoteId,
    user_id: userId,
  })

  if (error) {
    console.error("Error liking quote:", error)
    return false
  }

  return true
}

export async function unlikeQuote(quoteId: string, userId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("likes").delete().eq("quote_id", quoteId).eq("user_id", userId)

  if (error) {
    console.error("Error unliking quote:", error)
    return false
  }

  return true
}
