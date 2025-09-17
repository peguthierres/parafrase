import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { QuoteCard } from "@/components/quotes/quote-card"
import { Card, CardContent } from "@/components/ui/card"
import { getQuotes } from "@/lib/supabase/quotes"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  // Get current user (optional for home page)
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get approved quotes for the home page
  const quotes = await getQuotes(10, 0, { approved: true, featured: true })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {quotes.length > 0 ? (
            <div className="space-y-6">
              {quotes.map((quote, index) => (
                <div key={quote.id}>
                  <QuoteCard
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
                    currentUserId={user?.id}
                  />

                  {/* Ad placeholder every 3 quotes */}
                  {(index + 1) % 3 === 0 && (
                    <Card className="mt-6 bg-muted/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-center h-32 bg-muted/50 rounded-lg">
                          <div className="text-center text-muted-foreground">
                            <div className="text-sm font-medium mb-1">Publicidade</div>
                            <div className="text-xs">Anúncio Responsivo</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-medium text-foreground mb-2">Bem-vindo ao ParaFrase!</h3>
                  <p className="text-muted-foreground mb-4">
                    Descubra frases inspiradoras dos maiores pensadores da humanidade.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    As primeiras frases serão carregadas em breve. Enquanto isso, explore nossos autores e categorias.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  )
}
