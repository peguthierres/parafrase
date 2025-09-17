import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { getAds, checkAdminAccess } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminAdsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const isAdmin = await checkAdminAccess(user.id)
  if (!isAdmin) {
    redirect("/")
  }

  const ads = await getAds()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Gerenciar Anúncios</h1>
                <p className="text-muted-foreground">Configure anúncios do Google Ads na plataforma</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Anúncio
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Anúncios Configurados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ads.map((ad) => (
                    <div key={ad.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{ad.name}</h3>
                          <Badge variant={ad.is_active ? "default" : "secondary"}>
                            {ad.is_active ? "Ativo" : "Inativo"}
                          </Badge>
                          <Badge variant="outline">{ad.position}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Criado em {formatDate(ad.created_at)}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  ))}

                  {ads.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Nenhum anúncio configurado.</p>
                      <Button className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Primeiro Anúncio
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
