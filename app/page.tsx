import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { QuoteCard } from "@/components/quotes/quote-card"
import { Card, CardContent } from "@/components/ui/card"

const mockQuotes = [
  {
    id: "1",
    content: "A excelência não é um ato, mas um hábito.",
    author: {
      id: "1",
      name: "Aristóteles",
      category: "Filósofo",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    likes: 234,
    comments: 12,
    views: 1250,
    isLiked: false,
  },
  {
    id: "2",
    content: "Só sei que nada sei.",
    author: {
      id: "2",
      name: "Sócrates",
      category: "Filósofo",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    likes: 189,
    comments: 8,
    views: 890,
    isLiked: true,
  },
  {
    id: "3",
    content: "A imaginação é mais importante que o conhecimento.",
    author: {
      id: "3",
      name: "Albert Einstein",
      category: "Cientista",
      avatar: "https://images.unsplash.com/photo-1560250097791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    },
    note: "Frase adaptada de uma entrevista de 1929",
    likes: 312,
    comments: 24,
    views: 1650,
    isLiked: false,
  },
  {
    id: "4",
    content: "Seja a mudança que você quer ver no mundo.",
    author: {
      id: "4",
      name: "Mahatma Gandhi",
      category: "Político",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    },
    likes: 445,
    comments: 31,
    views: 2100,
    isLiked: false,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {mockQuotes.map((quote, index) => (
                <div key={quote.id}>
                  <QuoteCard {...quote} />

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
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  )
}
