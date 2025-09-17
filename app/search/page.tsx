import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteCard } from "@/components/quotes/quote-card"
import { searchQuotes } from "@/lib/supabase/quotes"
import { Search } from "lucide-react"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const query = params.q || ""
  const quotes = query ? await searchQuotes(query) : []

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Resultados da Busca</h1>
          {query && (
            <p className="text-muted-foreground">
              Mostrando resultados para: <span className="font-medium">"{query}"</span>
            </p>
          )}
        </div>

        {quotes.length > 0 ? (
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
        ) : query ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhum resultado encontrado</h3>
            <p className="text-muted-foreground">
              Tente buscar por outras palavras-chave ou explore nossas categorias.
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Digite algo para buscar</h3>
            <p className="text-muted-foreground">Use a barra de busca acima para encontrar frases e autores.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
