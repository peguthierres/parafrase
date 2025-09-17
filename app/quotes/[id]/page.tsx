import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { QuoteDetail } from "@/components/quotes/quote-detail"
import { CommentSection } from "@/components/social/comment-section"
import { getQuoteById } from "@/lib/supabase/quotes"
import { getQuoteComments } from "@/lib/supabase/social"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function QuotePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Get current user
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get quote data
  const quote = await getQuoteById(id, user?.id)

  if (!quote || !quote.is_approved) {
    notFound()
  }

  // Get comments
  const comments = await getQuoteComments(id)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <QuoteDetail
            quote={quote}
            onLike={() => {
              console.log("Like/unlike quote")
            }}
            onShare={() => {
              console.log("Share quote")
            }}
          />

          <CommentSection quoteId={id} initialComments={comments} currentUserId={user?.id} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const quote = await getQuoteById(id)

  if (!quote) {
    return {
      title: "Frase não encontrada - ParaFrase",
    }
  }

  return {
    title: `"${quote.content}" - ${quote.author.name} | ParaFrase`,
    description: `${quote.content} - Uma frase inspiradora de ${quote.author.name} no ParaFrase.`,
  }
}
