"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Share2, Eye } from "lucide-react"
import { LikeButton } from "@/components/social/like-button"
import { ShareImageGenerator } from "./share-image-generator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface QuoteCardProps {
  id: string
  content: string
  author: {
    id: string
    name: string
    category: string
    avatar?: string | null
  }
  note?: string | null
  likes: number
  comments: number
  views: number
  isLiked?: boolean
  currentUserId?: string
  onShare?: () => void
}

export function QuoteCard({
  id,
  content,
  author,
  note,
  likes,
  comments,
  views,
  isLiked = false,
  currentUserId,
  onShare,
}: QuoteCardProps) {
  const handleShare = () => {
    const shareText = `"${content}" - ${author.name}`

    if (navigator.share) {
      navigator
        .share({
          title: `Frase de ${author.name}`,
          text: shareText,
        })
        .catch(() => {
          // Fallback to clipboard
          navigator.clipboard?.writeText(shareText)
        })
    } else {
      navigator.clipboard?.writeText(shareText)
    }
    onShare?.()
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Quote Content */}
        <blockquote className="text-lg leading-relaxed text-foreground mb-4 text-pretty">"{content}"</blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <Link href={`/authors/${author.id}`}>
            <Avatar className="h-10 w-10 hover:ring-2 hover:ring-primary/20 transition-all">
              <AvatarImage
                src={
                  author.avatar ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                }
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <Link href={`/authors/${author.id}`} className="hover:text-primary transition-colors">
              <p className="font-medium">— {author.name}</p>
            </Link>
            <Badge variant="secondary" className="text-xs">
              {author.category}
            </Badge>
          </div>
        </div>

        {/* Note if present */}
        {note && <p className="text-xs text-muted-foreground italic mb-4 border-l-2 border-muted pl-3">{note}</p>}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LikeButton
              quoteId={id}
              initialLiked={isLiked}
              initialCount={likes}
              currentUserId={currentUserId}
              size="sm"
            />

            <Link href={`/quotes/${id}`}>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                <MessageCircle className="h-4 w-4" />
                {comments}
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                  <Share2 className="h-4 w-4" />
                  Compartilhar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar Link
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <div className="w-full">
                    <ShareImageGenerator content={content} authorName={author.name} onGenerate={onShare} />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            {views}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
