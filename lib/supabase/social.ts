import { createClient } from "@/lib/supabase/server"

export interface Comment {
  id: string
  content: string
  created_at: string
  updated_at: string
  user: {
    id: string
    full_name: string | null
    username: string | null
    avatar_url: string | null
  }
  likes_count?: number
  is_liked?: boolean
}

export async function likeQuote(quoteId: string, userId: string) {
  const supabase = await createClient()

  // Check if already liked
  const { data: existingLike } = await supabase
    .from("likes")
    .select("id")
    .eq("quote_id", quoteId)
    .eq("user_id", userId)
    .single()

  if (existingLike) {
    // Unlike
    const { error } = await supabase.from("likes").delete().eq("quote_id", quoteId).eq("user_id", userId)

    if (error) {
      console.error("Error unliking quote:", error)
      return { success: false, liked: false }
    }

    return { success: true, liked: false }
  } else {
    // Like
    const { error } = await supabase.from("likes").insert({
      quote_id: quoteId,
      user_id: userId,
    })

    if (error) {
      console.error("Error liking quote:", error)
      return { success: false, liked: true }
    }

    return { success: true, liked: true }
  }
}

export async function getQuoteComments(quoteId: string, limit = 20, offset = 0): Promise<Comment[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("comments")
    .select(`
      id,
      content,
      created_at,
      updated_at,
      user:profiles(id, full_name, username, avatar_url),
      likes:comment_likes(count)
    `)
    .eq("quote_id", quoteId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching comments:", error)
    return []
  }

  return (
    data?.map((comment) => ({
      ...comment,
      likes_count: comment.likes?.[0]?.count || 0,
    })) || []
  )
}

export async function createComment(quoteId: string, userId: string, content: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("comments")
    .insert({
      quote_id: quoteId,
      user_id: userId,
      content: content.trim(),
    })
    .select(`
      id,
      content,
      created_at,
      updated_at,
      user:profiles(id, full_name, username, avatar_url)
    `)
    .single()

  if (error) {
    console.error("Error creating comment:", error)
    return null
  }

  return {
    ...data,
    likes_count: 0,
    is_liked: false,
  }
}

export async function deleteComment(commentId: string, userId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("comments").delete().eq("id", commentId).eq("user_id", userId)

  if (error) {
    console.error("Error deleting comment:", error)
    return false
  }

  return true
}

export async function likeComment(commentId: string, userId: string) {
  const supabase = await createClient()

  // Check if already liked
  const { data: existingLike } = await supabase
    .from("comment_likes")
    .select("id")
    .eq("comment_id", commentId)
    .eq("user_id", userId)
    .single()

  if (existingLike) {
    // Unlike
    const { error } = await supabase.from("comment_likes").delete().eq("comment_id", commentId).eq("user_id", userId)

    if (error) {
      console.error("Error unliking comment:", error)
      return { success: false, liked: false }
    }

    return { success: true, liked: false }
  } else {
    // Like
    const { error } = await supabase.from("comment_likes").insert({
      comment_id: commentId,
      user_id: userId,
    })

    if (error) {
      console.error("Error liking comment:", error)
      return { success: false, liked: true }
    }

    return { success: true, liked: true }
  }
}

export async function getUserLikedQuotes(userId: string, limit = 20, offset = 0) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("likes")
    .select(`
      quote:quotes(
        id,
        content,
        note,
        views_count,
        created_at,
        author:authors(id, name, category, avatar_url),
        likes:likes(count),
        comments:comments(count)
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching liked quotes:", error)
    return []
  }

  return (
    data
      ?.filter((item) => item.quote)
      .map((item) => ({
        ...item.quote,
        likes_count: item.quote.likes?.[0]?.count || 0,
        comments_count: item.quote.comments?.[0]?.count || 0,
        is_liked: true,
      })) || []
  )
}
