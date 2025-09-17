"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Eye, Users } from "lucide-react"
import Link from "next/link"

const topAuthors = [
  {
    id: 1,
    name: "Aristóteles",
    category: "Filósofo",
    followers: 1250,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Fernando Pessoa",
    category: "Poeta",
    followers: 980,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Einstein",
    category: "Cientista",
    followers: 875,
    avatar: "https://images.unsplash.com/photo-15602500970b93528c311a?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Gandhi",
    category: "Político",
    followers: 720,
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Machado de Assis",
    category: "Escritor",
    followers: 650,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
  },
]

const mostRead = [
  { id: 1, content: "Ser ou não ser, eis a questão.", author: "Shakespeare", views: 2340 },
  { id: 2, content: "Só sei que nada sei.", author: "Sócrates", views: 1890 },
  { id: 3, content: "A imaginação é mais importante que o conhecimento.", author: "Einstein", views: 1650 },
  { id: 4, content: "Seja a mudança que você quer ver no mundo.", author: "Gandhi", views: 1420 },
]

export function Sidebar() {
  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Top Authors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" />
            Top Autores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topAuthors.map((author, index) => (
            <Link key={author.id} href={`/authors/${author.id}`} className="block">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">#{index + 1}</div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={author.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{author.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {author.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{author.followers} seguidores</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Most Read Quotes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Eye className="h-5 w-5 text-primary" />
            Mais Lidas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mostRead.map((quote, index) => (
            <Link key={quote.id} href={`/quotes/${quote.id}`} className="block">
              <div className="p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-2 mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">#{index + 1}</div>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed line-clamp-2">"{quote.content}"</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">— {quote.author}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        {quote.views}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Google Ads Placeholder */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64 bg-muted/50 rounded-lg">
            <div className="text-center text-muted-foreground">
              <div className="text-sm font-medium mb-1">Publicidade</div>
              <div className="text-xs">300x300</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
