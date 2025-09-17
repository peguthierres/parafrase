"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { PendingQuote } from "@/lib/supabase/admin"

interface PendingQuotesTableProps {
  quotes: PendingQuote[]
  onApprove: (quoteId: string) => void
  onReject: (quoteId: string) => void
}

export function PendingQuotesTable({ quotes, onApprove, onReject }: PendingQuotesTableProps) {
  const [selectedQuote, setSelectedQuote] = useState<PendingQuote | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frases Pendentes de Aprovação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div key={quote.id} className="flex items-start gap-4 p-4 border rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  {quote.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{quote.author.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      {quote.author.category}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{formatDate(quote.created_at)}</div>
                </div>

                <blockquote className="text-sm leading-relaxed mb-2 line-clamp-2">"{quote.content}"</blockquote>

                {quote.note && (
                  <p className="text-xs text-muted-foreground italic mb-2 border-l-2 border-muted pl-2">{quote.note}</p>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Enviado por: {quote.submitted_by.full_name || quote.submitted_by.username || "Usuário"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedQuote(quote)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Revisar Frase</DialogTitle>
                        </DialogHeader>
                        {selectedQuote && (
                          <div className="space-y-4">
                            <blockquote className="text-lg leading-relaxed text-center p-4 bg-muted/50 rounded-lg">
                              "{selectedQuote.content}"
                            </blockquote>
                            <div className="text-center">
                              <p className="font-medium">— {selectedQuote.author.name}</p>
                              <Badge variant="secondary">{selectedQuote.author.category}</Badge>
                            </div>
                            {selectedQuote.note && (
                              <div className="bg-muted/30 p-3 rounded-lg">
                                <p className="text-sm text-muted-foreground italic">{selectedQuote.note}</p>
                              </div>
                            )}
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>
                                Enviado por:{" "}
                                {selectedQuote.submitted_by.full_name || selectedQuote.submitted_by.username}
                              </span>
                              <span>{formatDate(selectedQuote.created_at)}</span>
                            </div>
                            <div className="flex gap-2 pt-4">
                              <Button
                                onClick={() => {
                                  onApprove(selectedQuote.id)
                                  setSelectedQuote(null)
                                }}
                                className="flex-1"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Aprovar
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  onReject(selectedQuote.id)
                                  setSelectedQuote(null)
                                }}
                                className="flex-1"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Rejeitar
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button variant="default" size="sm" onClick={() => onApprove(quote.id)}>
                      <Check className="h-4 w-4 mr-1" />
                      Aprovar
                    </Button>

                    <Button variant="destructive" size="sm" onClick={() => onReject(quote.id)}>
                      <X className="h-4 w-4 mr-1" />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {quotes.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhuma frase pendente de aprovação.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
