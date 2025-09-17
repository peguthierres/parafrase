import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    value: "filosofo",
    label: "Filósofos",
    description: "Grandes pensadores que moldaram nossa compreensão do mundo",
    count: 15,
    authors: 8,
  },
  {
    value: "poeta",
    label: "Poetas",
    description: "Mestres das palavras que tocam a alma",
    count: 23,
    authors: 12,
  },
  {
    value: "escritor",
    label: "Escritores",
    description: "Contadores de histórias e criadores de mundos",
    count: 18,
    authors: 9,
  },
  {
    value: "cientista",
    label: "Cientistas",
    description: "Mentes brilhantes que desvendaram os mistérios do universo",
    count: 12,
    authors: 6,
  },
  {
    value: "politico",
    label: "Políticos",
    description: "Líderes que transformaram sociedades",
    count: 14,
    authors: 7,
  },
  {
    value: "sociologo",
    label: "Sociólogos",
    description: "Estudiosos da sociedade e comportamento humano",
    count: 8,
    authors: 4,
  },
  {
    value: "psicologo",
    label: "Psicólogos",
    description: "Exploradores da mente humana",
    count: 10,
    authors: 5,
  },
  {
    value: "historiador",
    label: "Historiadores",
    description: "Guardiões da memória da humanidade",
    count: 7,
    authors: 3,
  },
  {
    value: "religioso",
    label: "Religiosos",
    description: "Guias espirituais e mestres da fé",
    count: 16,
    authors: 8,
  },
  {
    value: "artista",
    label: "Artistas",
    description: "Criadores de beleza e expressão",
    count: 11,
    authors: 6,
  },
  {
    value: "educador",
    label: "Educadores",
    description: "Formadores de mentes e caracteres",
    count: 9,
    authors: 4,
  },
  {
    value: "jornalista",
    label: "Jornalistas",
    description: "Contadores da verdade e cronistas do tempo",
    count: 6,
    authors: 3,
  },
  {
    value: "empresario",
    label: "Empresários",
    description: "Visionários dos negócios e inovação",
    count: 5,
    authors: 2,
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Categorias</h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Explore frases organizadas por diferentes áreas do conhecimento. Cada categoria reúne pensadores que
            contribuíram significativamente para seu campo.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.value} href={`/authors?category=${category.value}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground">{category.label}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {category.count} frases
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{category.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {category.authors} autores
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {category.count} frases
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
