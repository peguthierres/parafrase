"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, Calendar, MapPin, Share2 } from "lucide-react"
import { QuoteCard } from "@/components/quotes/quote-card"
import type { Author, Quote } from "@/lib/supabase/authors"

interface AuthorProfileProps {
  author: Author
  quotes: Quote[]
  onFollow?: () => void
  onShare?: () => void
}

export function AuthorProfile({ author, quotes, onFollow, onShare }: AuthorProfileProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getLifeSpan = () => {
    const birth = formatDate(author.birth_date)
    const death = formatDate(author.death_date)

    if (birth && death) {
      return `${birth} - ${death}`
    } else if (birth) {
      return `Nascido em ${birth}`
    }
    return null
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Perfil de ${author.name}`,
        text: `Conheça as frases de ${author.name} no ParaFrase`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
    onShare?.()
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <Avatar className="h-32 w-32 mx-auto md:mx-0">
              <AvatarImage src={author.avatar_url || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{author.name}</h1>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <Badge variant="secondary" className="text-sm">
                      {author.category}
                    </Badge>
                    {author.is_classic && (
                      <Badge variant="outline" className="text-sm">
                        Autor Clássico
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant={author.is_following ? "outline" : "default"} onClick={onFollow} className="gap-2">
                    <Users className="h-4 w-4" />
                    {author.is_following ? "Seguindo" : "Seguir"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Bio */}
              {author.bio && <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">{author.bio}</p>}

              {/* Metadata */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-4">
                {getLifeSpan() && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {getLifeSpan()}
                  </div>
                )}

                {author.nationality && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {author.nationality}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center md:justify-start gap-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-lg text-foreground">{author.quotes_count || 0}</div>
                  <div className="text-muted-foreground">Frases</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-lg text-foreground">{author.followers_count || 0}</div>
                  <div className="text-muted-foreground">Seguidores</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="quotes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quotes">Frases</TabsTrigger>
          <TabsTrigger value="about">Sobre</TabsTrigger>
        </TabsList>

        <TabsContent value="quotes" className="space-y-6 mt-6">
          {quotes.length > 0 ? (
            quotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                id={quote.id}
                content={quote.content}
                author={{
                  id: author.id,
                  name: author.name,
                  category: author.category,
                  avatar: author.avatar_url,
                }}
                note={quote.note}
                likes={quote.likes_count || 0}
                comments={quote.comments_count || 0}
                views={quote.views_count}
                isLiked={quote.is_liked}
              />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Nenhuma frase encontrada</h3>
                <p className="text-muted-foreground">Este autor ainda não possui frases publicadas.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Sobre {author.name}</h3>

              {author.bio ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{author.bio}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    {author.birth_date && (
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Data de Nascimento</h4>
                        <p className="text-muted-foreground">{formatDate(author.birth_date)}</p>
                      </div>
                    )}

                    {author.death_date && (
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Data de Falecimento</h4>
                        <p className="text-muted-foreground">{formatDate(author.death_date)}</p>
                      </div>
                    )}

                    {author.nationality && (
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Nacionalidade</h4>
                        <p className="text-muted-foreground">{author.nationality}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium text-foreground mb-1">Categoria</h4>
                      <p className="text-muted-foreground">{author.category}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Informações biográficas não disponíveis para este autor.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
