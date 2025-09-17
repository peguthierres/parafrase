"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface LikeButtonProps {
  quoteId: string
  initialLiked?: boolean
  initialCount: number
  currentUserId?: string
  size?: "sm" | "default" | "lg"
  variant?: "ghost" | "outline" | "default"
}

export function LikeButton({
  quoteId,
  initialLiked = false,
  initialCount,
  currentUserId,
  size = "default",
  variant = "ghost",
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLike = async () => {
    if (!currentUserId) {
      router.push("/auth/login")
      return
    }

    setIsLoading(true)

    // Optimistic update
    const newLiked = !liked
    const newCount = newLiked ? count + 1 : count - 1
    setLiked(newLiked)
    setCount(newCount)

    const supabase = createClient()

    try {
      if (liked) {
        // Unlike
        const { error } = await supabase.from("likes").delete().eq("quote_id", quoteId).eq("user_id", currentUserId)

        if (error) {
          // Revert optimistic update
          setLiked(true)
          setCount(count)
          console.error("Error unliking quote:", error)
        }
      } else {
        // Like
        const { error } = await supabase.from("likes").insert({
          quote_id: quoteId,
          user_id: currentUserId,
        })

        if (error) {
          // Revert optimistic update
          setLiked(false)
          setCount(count)
          console.error("Error liking quote:", error)
        }
      }

      // Refresh to update server state
      router.refresh()
    } catch (error) {
      // Revert optimistic update
      setLiked(!newLiked)
      setCount(count)
      console.error("Error handling like:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLike}
      disabled={isLoading}
      className={`gap-2 ${liked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"}`}
    >
      <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
      {count}
    </Button>
  )
}
