"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Trash2, Send } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { Comment } from "@/lib/supabase/social"

interface CommentSectionProps {
  quoteId: string
  initialComments?: Comment[]
  currentUserId?: string
}

export function CommentSection({ quoteId, initialComments = [], currentUserId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (initialComments.length === 0) {
      loadComments()
    }
  }, [quoteId])

  const loadComments = async () => {
    setIsLoading(true)
    const supabase = createClient()

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
      console.error("Error loading comments:", error)
    } else {
      setComments(
        data?.map((comment) => ({
          ...comment,
          likes_count: comment.likes?.[0]?.count || 0,
        })) || [],
      )
    }

    setIsLoading(false)
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !currentUserId) return

    setIsSubmitting(true)
    const supabase = createClient()

    const { data, error } = await supabase
      .from("comments")
      .insert({
        quote_id: quoteId,
        user_id: currentUserId,
        content: newComment.trim(),
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
    } else {
      const newCommentData = {
        ...data,
        likes_count: 0,
        is_liked: false,
      }
      setComments([newCommentData, ...comments])
      setNewComment("")
      router.refresh()
    }

    setIsSubmitting(false)
  }

  const handleDeleteComment = async (commentId: string) => {
    const supabase = createClient()

    const { error } = await supabase.from("comments").delete().eq("id", commentId).eq("user_id", currentUserId)

    if (error) {
      console.error("Error deleting comment:", error)
    } else {
      setComments(comments.filter((comment) => comment.id !== commentId))
      router.refresh()
    }
  }

  const handleLikeComment = async (commentId: string) => {
    if (!currentUserId) return

    const supabase = createClient()
    const comment = comments.find((c) => c.id === commentId)
    if (!comment) return

    // Optimistic update
    const updatedComments = comments.map((c) =>
      c.id === commentId
        ? {
            ...c,
            is_liked: !c.is_liked,
            likes_count: c.is_liked ? (c.likes_count || 0) - 1 : (c.likes_count || 0) + 1,
          }
        : c,
    )
    setComments(updatedComments)

    // Check if already liked
    const { data: existingLike } = await supabase
      .from("comment_likes")
      .select("id")
      .eq("comment_id", commentId)
      .eq("user_id", currentUserId)
      .single()

    if (existingLike) {
      // Unlike
      await supabase.from("comment_likes").delete().eq("comment_id", commentId).eq("user_id", currentUserId)
    } else {
      // Like
      await supabase.from("comment_likes").insert({
        comment_id: commentId,
        user_id: currentUserId,
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Agora há pouco"
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d atrás`
    } else {
      return date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Comentários ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Comment Form */}
        {currentUserId ? (
          <div className="space-y-3">
            <Textarea
              placeholder="Adicione um comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-20 resize-none"
              maxLength={500}
            />
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{newComment.length}/500 caracteres</div>
              <Button onClick={handleSubmitComment} disabled={!newComment.trim() || isSubmitting} size="sm">
                <Send className="h-4 w-4 mr-1" />
                {isSubmitting ? "Enviando..." : "Comentar"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground mb-2">Faça login para comentar</p>
            <Button variant="outline" size="sm" onClick={() => router.push("/auth/login")}>
              Fazer Login
            </Button>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">Carregando comentários...</p>
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 p-4 bg-muted/30 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.user.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback>
                    {comment.user.full_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") ||
                      comment.user.username?.[0]?.toUpperCase() ||
                      "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {comment.user.full_name || comment.user.username || "Usuário"}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</span>
                  </div>

                  <p className="text-sm leading-relaxed mb-2">{comment.content}</p>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikeComment(comment.id)}
                      className={`h-6 px-2 text-xs ${comment.is_liked ? "text-red-500" : "text-muted-foreground"}`}
                      disabled={!currentUserId}
                    >
                      <Heart className={`h-3 w-3 mr-1 ${comment.is_liked ? "fill-current" : ""}`} />
                      {comment.likes_count || 0}
                    </Button>

                    {currentUserId === comment.user.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteComment(comment.id)}
                        className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Seja o primeiro a comentar!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
