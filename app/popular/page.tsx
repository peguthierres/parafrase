import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteCard } from "@/components/quotes/quote-card"
import { getQuotes } from "@/lib/supabase/quotes"

export default async function PopularPage() {
  // Get popular quotes (featured and highly viewed)
  const quotes = await getQuotes(20, 0, { featured: true, approved: true })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Frases Populares</h1>
          <p className="text-muted-foreground leading-relaxed">
            Descubra as frases mais curtidas e compartilhadas da nossa comunidade.
          </p>
        </div>

        <div className="space-y-6">
          {quotes.map((quote) => (
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
            />
          ))}
        </div>

        {quotes.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhuma frase popular encontrada</h3>
            <p className="text-muted-foreground">Volte em breve para ver as frases mais populares.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
