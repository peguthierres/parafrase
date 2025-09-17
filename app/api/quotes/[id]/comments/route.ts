import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: quoteId } = await params
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

    if (error) {
      return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
    }

    const comments = data?.map((comment) => ({
      ...comment,
      likes_count: comment.likes?.[0]?.count || 0,
    }))

    return NextResponse.json({ comments })
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: quoteId } = await params
    const { content } = await request.json()

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Comment content is required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("comments")
      .insert({
        quote_id: quoteId,
        user_id: user.id,
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
      return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
    }

    const comment = {
      ...data,
      likes_count: 0,
      is_liked: false,
    }

    return NextResponse.json({ comment })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
