"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Calendar } from "lucide-react"
import Link from "next/link"
import type { Author } from "@/lib/supabase/authors"

interface AuthorCardProps {
  author: Author
  onFollow?: (authorId: string) => void
  showFollowButton?: boolean
}

export function AuthorCard({ author, onFollow, showFollowButton = true }: AuthorCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    return new Date(dateString).getFullYear()
  }

  const getLifeSpan = () => {
    const birth = formatDate(author.birth_date)
    const death = formatDate(author.death_date)

    if (birth && death) {
      return `${birth} - ${death}`
    } else if (birth) {
      return `${birth} - presente`
    }
    return null
  }

  const handleFollow = () => {
    onFollow?.(author.id)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Link href={`/authors/${author.id}`}>
            <Avatar className="h-16 w-16 hover:ring-2 hover:ring-primary/20 transition-all">
              <AvatarImage src={author.avatar_url || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Link>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <Link href={`/authors/${author.id}`} className="hover:text-primary transition-colors">
                  <h3 className="font-semibold text-lg leading-tight">{author.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {author.category}
                  </Badge>
                  {author.is_classic && (
                    <Badge variant="outline" className="text-xs">
                      Clássico
                    </Badge>
                  )}
                </div>
              </div>

              {showFollowButton && (
                <Button
                  variant={author.is_following ? "outline" : "default"}
                  size="sm"
                  onClick={handleFollow}
                  className="ml-2"
                >
                  {author.is_following ? "Seguindo" : "Seguir"}
                </Button>
              )}
            </div>

            {/* Bio */}
            {author.bio && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{author.bio}</p>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {getLifeSpan() && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {getLifeSpan()}
                </div>
              )}

              {author.nationality && <span>{author.nationality}</span>}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{author.quotes_count || 0} frases</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{author.followers_count || 0} seguidores</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
