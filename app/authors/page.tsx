import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AuthorCard } from "@/components/authors/author-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAuthors } from "@/lib/supabase/authors"

const categories = [
  { value: "all", label: "Todas as Categorias" },
  { value: "filosofo", label: "Filósofo" },
  { value: "sociologo", label: "Sociólogo" },
  { value: "poeta", label: "Poeta" },
  { value: "escritor", label: "Escritor" },
  { value: "politico", label: "Político" },
  { value: "cientista", label: "Cientista" },
  { value: "psicologo", label: "Psicólogo" },
  { value: "historiador", label: "Historiador" },
  { value: "religioso", label: "Religioso" },
  { value: "artista", label: "Artista" },
  { value: "educador", label: "Educador" },
  { value: "jornalista", label: "Jornalista" },
  { value: "empresario", label: "Empresário" },
]

export default async function AuthorsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const selectedCategory = params.category && params.category !== "all" ? params.category : undefined
  const authors = await getAuthors(selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Autores</h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Descubra os grandes pensadores da humanidade e suas frases mais inspiradoras. Explore diferentes categorias
            e encontre autores que ressoam com você.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select defaultValue={selectedCategory || "all"}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Selecionar categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Mais Seguidos
            </Button>
            <Button variant="outline" size="sm">
              Mais Frases
            </Button>
            <Button variant="outline" size="sm">
              Recentes
            </Button>
          </div>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>

        {/* Load More */}
        {authors.length >= 20 && (
          <div className="flex justify-center mt-8">
            <Button variant="outline">Carregar Mais Autores</Button>
          </div>
        )}

        {/* Empty State */}
        {authors.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">Nenhum autor encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros ou explore outras categorias.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
