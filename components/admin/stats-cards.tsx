import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, UserCheck, Heart, MessageCircle, Clock } from "lucide-react"
import type { AdminStats } from "@/lib/supabase/admin"

interface StatsCardsProps {
  stats: AdminStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total de Frases",
      value: stats.totalQuotes,
      icon: FileText,
      description: "Frases publicadas",
    },
    {
      title: "Frases Pendentes",
      value: stats.pendingQuotes,
      icon: Clock,
      description: "Aguardando aprovação",
    },
    {
      title: "Usuários",
      value: stats.totalUsers,
      icon: Users,
      description: "Usuários registrados",
    },
    {
      title: "Autores",
      value: stats.totalAuthors,
      icon: UserCheck,
      description: "Autores cadastrados",
    },
    {
      title: "Curtidas",
      value: stats.totalLikes,
      icon: Heart,
      description: "Total de curtidas",
    },
    {
      title: "Comentários",
      value: stats.totalComments,
      icon: MessageCircle,
      description: "Total de comentários",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
