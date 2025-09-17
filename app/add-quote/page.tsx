import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AddQuoteForm } from "@/components/quotes/add-quote-form"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AddQuotePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Adicionar Frase</h1>
            <p className="text-muted-foreground leading-relaxed">
              Compartilhe uma frase inspiradora com nossa comunidade. Todas as frases passam por moderação antes da
              publicação.
            </p>
          </div>

          <AddQuoteForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
