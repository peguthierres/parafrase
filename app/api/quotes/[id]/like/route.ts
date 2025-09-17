import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: quoteId } = await params
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if already liked
    const { data: existingLike } = await supabase
      .from("likes")
      .select("id")
      .eq("quote_id", quoteId)
      .eq("user_id", user.id)
      .single()

    if (existingLike) {
      // Unlike
      const { error } = await supabase.from("likes").delete().eq("quote_id", quoteId).eq("user_id", user.id)

      if (error) {
        return NextResponse.json({ error: "Failed to unlike quote" }, { status: 500 })
      }

      return NextResponse.json({ liked: false })
    } else {
      // Like
      const { error } = await supabase.from("likes").insert({
        quote_id: quoteId,
        user_id: user.id,
      })

      if (error) {
        return NextResponse.json({ error: "Failed to like quote" }, { status: 500 })
      }

      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    console.error("Error in like route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
