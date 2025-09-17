import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuoteCard } from "@/components/quotes/quote-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Heart, FileText } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { getQuotes } from "@/lib/supabase/quotes"
import { getUserLikedQuotes } from "@/lib/supabase/social"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get user's submitted quotes
  const userQuotes = await getQuotes(20, 0, { userId: user.id })

  // Get user's liked quotes
  const likedQuotes = await getUserLikedQuotes(user.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="h-24 w-24 mx-auto md:mx-0">
                  <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {profile?.full_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || user.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {profile?.full_name || "Nome não informado"}
                  </h1>
                  <p className="text-muted-foreground mb-3">
                    {profile?.username ? `@${profile.username}` : user.email}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <Badge variant="secondary">{profile?.role || "user"}</Badge>
                    {profile?.is_verified && <Badge variant="outline">Verificado</Badge>}
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-lg text-foreground">{userQuotes.length}</div>
                      <div className="text-muted-foreground">Frases Enviadas</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-lg text-foreground">{likedQuotes.length}</div>
                      <div className="text-muted-foreground">Frases Curtidas</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="quotes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quotes" className="gap-2">
                <FileText className="h-4 w-4" />
                Minhas Frases
              </TabsTrigger>
              <TabsTrigger value="liked" className="gap-2">
                <Heart className="h-4 w-4" />
                Curtidas
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Perfil
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quotes" className="space-y-6 mt-6">
              {userQuotes.length > 0 ? (
                userQuotes.map((quote) => (
                  <QuoteCard
                    key={quote.id}
                    id={quote.id}
                    content={quote.content}
                    author={{
                      id: quote.author.id,
                      name: quote.author.name,
                      category: quote.author.category,
                      avatar: quote.author.avatar_url,
                    }}
                    note={quote.note}
                    likes={quote.likes_count || 0}
                    comments={quote.comments_count || 0}
                    views={quote.views_count}
                    isLiked={quote.is_liked}
                    currentUserId={user.id}
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Nenhuma frase enviada</h3>
                    <p className="text-muted-foreground">Comece compartilhando suas frases favoritas!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="liked" className="space-y-6 mt-6">
              {likedQuotes.length > 0 ? (
                likedQuotes.map((quote) => (
                  <QuoteCard
                    key={quote.id}
                    id={quote.id}
                    content={quote.content}
                    author={{
                      id: quote.author.id,
                      name: quote.author.name,
                      category: quote.author.category,
                      avatar: quote.author.avatar_url,
                    }}
                    note={quote.note}
                    likes={quote.likes_count || 0}
                    comments={quote.comments_count || 0}
                    views={quote.views_count}
                    isLiked={true}
                    currentUserId={user.id}
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Nenhuma frase curtida</h3>
                    <p className="text-muted-foreground">Explore e curta frases que ressoam com você!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Perfil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Nome Completo</h4>
                      <p className="text-muted-foreground">{profile?.full_name || "Não informado"}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Nome de Usuário</h4>
                      <p className="text-muted-foreground">{profile?.username || "Não informado"}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Email</h4>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Função</h4>
                      <p className="text-muted-foreground capitalize">{profile?.role || "user"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
