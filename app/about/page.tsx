import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, BookOpen, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "Sobre - ParaFrase",
  description: "Conheça a história e missão do ParaFrase",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-parafrase-dark mb-4">Sobre o ParaFrase</h1>
        <p className="text-xl text-parafrase-dark/70 leading-relaxed">
          Uma plataforma dedicada a preservar e compartilhar a sabedoria dos grandes pensadores da humanidade
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-parafrase-coral" />
              Nossa Missão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-parafrase-dark/80 leading-relaxed">
              Democratizar o acesso à sabedoria universal, conectando pessoas através de frases inspiradoras e reflexões
              profundas dos maiores pensadores da história.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-parafrase-coral" />
              Nossa Visão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-parafrase-dark/80 leading-relaxed">
              Ser a principal plataforma brasileira para descoberta e compartilhamento de citações, criando uma
              comunidade engajada em busca de conhecimento e inspiração.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-parafrase-dark mb-6 text-center">Por que ParaFrase?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-parafrase-coral" />
                Curadoria de Qualidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-parafrase-dark/70">
                Todas as frases passam por moderação para garantir autenticidade e qualidade do conteúdo.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-parafrase-coral" />
                Comunidade Ativa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-parafrase-dark/70">
                Conecte-se com outros amantes da sabedoria através de comentários, curtidas e compartilhamentos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5 text-parafrase-coral" />
                Experiência Personalizada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-parafrase-dark/70">
                Descubra frases baseadas em seus interesses e siga seus autores favoritos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-parafrase-beige/30 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-parafrase-dark mb-4 text-center">Nossa História</h2>
        <div className="prose prose-lg max-w-none text-parafrase-dark/80">
          <p className="leading-relaxed mb-4">
            O ParaFrase nasceu da paixão por conectar pessoas através da sabedoria atemporal. Acreditamos que uma frase
            no momento certo pode transformar perspectivas, inspirar ações e criar conexões profundas entre as pessoas.
          </p>
          <p className="leading-relaxed mb-4">
            Nossa plataforma foi criada para ser mais que um repositório de citações - é um espaço onde a comunidade
            pode descobrir, compartilhar e refletir sobre os ensinamentos dos grandes mestres da humanidade.
          </p>
          <p className="leading-relaxed">
            Desde filósofos antigos até pensadores contemporâneos, nossa missão é preservar e disseminar conhecimento de
            forma acessível e envolvente para todos.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-parafrase-dark mb-4">Junte-se à Nossa Comunidade</h2>
        <p className="text-parafrase-dark/70 mb-6">Faça parte de uma comunidade apaixonada por sabedoria e reflexão</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/auth/register"
            className="bg-parafrase-coral hover:bg-parafrase-coral/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Criar Conta Gratuita
          </a>
          <a
            href="/add-quote"
            className="border border-parafrase-coral text-parafrase-coral hover:bg-parafrase-coral hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Compartilhar uma Frase
          </a>
        </div>
      </div>
    </div>
  )
}
