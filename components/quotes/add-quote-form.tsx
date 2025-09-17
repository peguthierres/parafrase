"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Search } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Author {
  id: string
  name: string
  category: string
}

export function AddQuoteForm() {
  const [content, setContent] = useState("")
  const [note, setNote] = useState("")
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [authors, setAuthors] = useState<Author[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.from("authors").select("id, name, category").order("name")

    if (error) {
      console.error("Error fetching authors:", error)
      return
    }

    setAuthors(data || [])
  }

  const filteredAuthors = authors.filter((author) => author.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!content.trim() || !selectedAuthor) {
      setError("Por favor, preencha todos os campos obrigatórios.")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("Você precisa estar logado para adicionar uma frase.")
        setIsLoading(false)
        return
      }

      // Create quote
      const { error: createError } = await supabase.from("quotes").insert({
        content: content.trim(),
        author_id: selectedAuthor,
        note: note.trim() || null,
        submitted_by: user.id,
        is_approved: false,
      })

      if (createError) {
        throw createError
      }

      setSuccess(true)
      setContent("")
      setNote("")
      setSelectedAuthor("")

      // Redirect after success
      setTimeout(() => {
        router.push("/profile?tab=quotes")
      }, 2000)
    } catch (error) {
      console.error("Error creating quote:", error)
      setError("Erro ao adicionar frase. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-green-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Frase Enviada com Sucesso!</h3>
          <p className="text-muted-foreground mb-4">
            Sua frase foi enviada para moderação e será publicada após aprovação.
          </p>
          <Button onClick={() => setSuccess(false)} variant="outline">
            Adicionar Outra Frase
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Adicionar Nova Frase
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quote Content */}
          <div className="space-y-2">
            <Label htmlFor="content">
              Frase <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="content"
              placeholder="Digite a frase aqui..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-24 resize-none"
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground text-right">{content.length}/500 caracteres</div>
          </div>

          {/* Author Selection */}
          <div className="space-y-2">
            <Label htmlFor="author">
              Autor <span className="text-destructive">*</span>
            </Label>
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar autor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um autor" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {filteredAuthors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{author.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{author.category}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Optional Note */}
          <div className="space-y-2">
            <Label htmlFor="note">Nota (opcional)</Label>
            <Textarea
              id="note"
              placeholder="Ex: Frase adaptada, autor desconhecido, contexto específico..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-16 resize-none"
              maxLength={200}
            />
            <div className="text-xs text-muted-foreground">
              Use este campo para adicionar informações sobre adaptações, contexto ou outras observações relevantes.
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Frase"
            )}
          </Button>

          <div className="text-xs text-muted-foreground text-center">
            Sua frase será revisada por nossa equipe antes da publicação.
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
