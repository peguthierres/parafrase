import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AuthorProfile } from "@/components/authors/author-profile"
import { getAuthorById, getAuthorQuotes } from "@/lib/supabase/authors"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function AuthorPage({
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

  // Get author data
  const author = await getAuthorById(id, user?.id)

  if (!author) {
    notFound()
  }

  // Get author's quotes
  const quotes = await getAuthorQuotes(id)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <AuthorProfile
          author={author}
          quotes={quotes}
          onFollow={() => {
            // This will be handled by client-side component
            console.log("Follow/unfollow author")
          }}
          onShare={() => {
            console.log("Share author profile")
          }}
        />
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
  const author = await getAuthorById(id)

  if (!author) {
    return {
      title: "Autor não encontrado - ParaFrase",
    }
  }

  return {
    title: `${author.name} - ParaFrase`,
    description: author.bio || `Descubra as frases inspiradoras de ${author.name} no ParaFrase.`,
  }
}
