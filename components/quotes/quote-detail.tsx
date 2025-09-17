"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Share2, Eye, Calendar, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { QuoteWithAuthor } from "@/lib/supabase/quotes"

interface QuoteDetailProps {
  quote: QuoteWithAuthor
  onLike?: () => void
  onShare?: () => void
}

export function QuoteDetail({ quote, onLike, onShare }: QuoteDetailProps) {
  const [liked, setLiked] = useState(quote.is_liked || false)
  const [likeCount, setLikeCount] = useState(quote.likes_count || 0)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
    onLike?.()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Frase de ${quote.author.name}`,
        text: `"${quote.content}" - ${quote.author.name}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(`"${quote.content}" - ${quote.author.name}\n\n${window.location.href}`)
    }
    onShare?.()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Main Quote Card */}
      <Card>
        <CardContent className="p-8">
          {/* Quote Content */}
          <blockquote className="text-2xl md:text-3xl leading-relaxed text-foreground mb-6 text-center text-pretty font-medium">
            "{quote.content}"
          </blockquote>

          {/* Author Info */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link href={`/authors/${quote.author.id}`}>
              <Avatar className="h-12 w-12 hover:ring-2 hover:ring-primary/20 transition-all">
                <AvatarImage src={quote.author.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {quote.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="text-center">
              <Link href={`/authors/${quote.author.id}`} className="hover:text-primary transition-colors">
                <p className="font-semibold text-lg">— {quote.author.name}</p>
              </Link>
              <Badge variant="secondary" className="text-sm">
                {quote.author.category}
              </Badge>
            </div>
          </div>

          {/* Note if present */}
          {quote.note && (
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground italic text-center">{quote.note}</p>
            </div>
          )}

          <Separator className="my-6" />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="lg"
                onClick={handleLike}
                className={`gap-2 ${liked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"}`}
              >
                <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
                {likeCount}
              </Button>

              <Button variant="ghost" size="lg" className="gap-2 text-muted-foreground hover:text-primary">
                <MessageCircle className="h-5 w-5" />
                {quote.comments_count || 0}
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={handleShare}
                className="gap-2 text-muted-foreground hover:text-primary"
              >
                <Share2 className="h-5 w-5" />
                Compartilhar
              </Button>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              {quote.views_count} visualizações
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quote Metadata */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Informações da Frase</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Publicada em:</span>
              <span className="font-medium">{formatDate(quote.created_at)}</span>
            </div>

            {quote.submitted_by && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Enviada por:</span>
                <span className="font-medium">
                  {quote.submitted_by.full_name || quote.submitted_by.username || "Usuário"}
                </span>
              </div>
            )}

            {quote.is_featured && (
              <div className="md:col-span-2">
                <Badge variant="default" className="bg-primary">
                  Frase em Destaque
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
