import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Contato - ParaFrase",
  description: "Entre em contato conosco para dúvidas, sugestões ou suporte",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-parafrase-dark mb-4">Entre em Contato</h1>
        <p className="text-lg text-parafrase-dark/70">
          Estamos aqui para ajudar! Entre em contato conosco para dúvidas, sugestões ou suporte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Envie uma Mensagem
            </CardTitle>
            <CardDescription>Preencha o formulário abaixo e responderemos em breve</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-parafrase-dark">
                  Nome
                </label>
                <Input id="name" placeholder="Seu nome completo" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-parafrase-dark">
                  Email
                </label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="text-sm font-medium text-parafrase-dark">
                Assunto
              </label>
              <Input id="subject" placeholder="Assunto da sua mensagem" />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium text-parafrase-dark">
                Mensagem
              </label>
              <Textarea id="message" placeholder="Descreva sua dúvida, sugestão ou problema..." rows={6} />
            </div>
            <Button className="w-full bg-parafrase-coral hover:bg-parafrase-coral/90">Enviar Mensagem</Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Informações de Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-parafrase-dark mb-2">Email Geral</h3>
                <p className="text-parafrase-dark/70">contato@parafrase.com.br</p>
              </div>
              <div>
                <h3 className="font-semibold text-parafrase-dark mb-2">Suporte Técnico</h3>
                <p className="text-parafrase-dark/70">suporte@parafrase.com.br</p>
              </div>
              <div>
                <h3 className="font-semibold text-parafrase-dark mb-2">Privacidade e Dados</h3>
                <p className="text-parafrase-dark/70">privacidade@parafrase.com.br</p>
              </div>
              <div>
                <h3 className="font-semibold text-parafrase-dark mb-2">Parcerias</h3>
                <p className="text-parafrase-dark/70">parcerias@parafrase.com.br</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tempo de Resposta</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-parafrase-dark/70 leading-relaxed">
                Respondemos todas as mensagens em até 24 horas durante dias úteis. Para questões urgentes, utilize nosso
                email de suporte técnico.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reportar Problemas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-parafrase-dark/70 leading-relaxed">
                Encontrou um bug ou problema técnico? Descreva detalhadamente o que aconteceu, incluindo o navegador
                utilizado e os passos para reproduzir o problema.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
