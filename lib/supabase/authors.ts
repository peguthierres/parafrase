import { createClient } from "@/lib/supabase/server"

export interface Author {
  id: string
  name: string
  bio: string | null
  birth_date: string | null
  death_date: string | null
  nationality: string | null
  category: string
  avatar_url: string | null
  is_classic: boolean
  user_id: string | null
  created_at: string
  updated_at: string
  quotes_count?: number
  followers_count?: number
  is_following?: boolean
}

export interface Quote {
  id: string
  content: string
  note: string | null
  is_approved: boolean
  is_featured: boolean
  views_count: number
  created_at: string
  likes_count?: number
  comments_count?: number
  is_liked?: boolean
}

export async function getAuthors(category?: string, limit = 20, offset = 0) {
  const supabase = await createClient()

  let query = supabase
    .from("authors")
    .select(`
      *,
      quotes:quotes(count),
      follows:follows(count)
    `)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching authors:", error)
    return []
  }

  return (
    data?.map((author) => ({
      ...author,
      quotes_count: author.quotes?.[0]?.count || 0,
      followers_count: author.follows?.[0]?.count || 0,
    })) || []
  )
}

export async function getAuthorById(id: string, userId?: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("authors")
    .select(`
      *,
      quotes:quotes(count),
      follows:follows(count)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching author:", error)
    return null
  }

  // Check if current user is following this author
  let isFollowing = false
  if (userId) {
    const { data: followData } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", userId)
      .eq("author_id", id)
      .single()

    isFollowing = !!followData
  }

  return {
    ...data,
    quotes_count: data.quotes?.[0]?.count || 0,
    followers_count: data.follows?.[0]?.count || 0,
    is_following: isFollowing,
  }
}

export async function getAuthorQuotes(authorId: string, limit = 10, offset = 0) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("quotes")
    .select(`
      *,
      likes:likes(count),
      comments:comments(count)
    `)
    .eq("author_id", authorId)
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching author quotes:", error)
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

export async function followAuthor(authorId: string, userId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("follows").insert({
    follower_id: userId,
    author_id: authorId,
  })

  if (error) {
    console.error("Error following author:", error)
    return false
  }

  return true
}

export async function unfollowAuthor(authorId: string, userId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("follows").delete().eq("follower_id", userId).eq("author_id", authorId)

  if (error) {
    console.error("Error unfollowing author:", error)
    return false
  }

  return true
}
