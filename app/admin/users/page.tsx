import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUsers, checkAdminAccess } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminUsersPage() {
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

  const users = await getUsers(50)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "author":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gerenciar Usuários</h1>
              <p className="text-muted-foreground">Visualize e gerencie usuários da plataforma</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((userData) => (
                    <div key={userData.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {userData.full_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || userData.email[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{userData.full_name || "Nome não informado"}</h3>
                          <Badge variant={getRoleBadgeVariant(userData.role)}>{userData.role}</Badge>
                          {userData.is_verified && <Badge variant="outline">Verificado</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {userData.username ? `@${userData.username}` : userData.email}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Cadastrado em {formatDate(userData.created_at)}</span>
                          <span>{userData.quotes_count} frases enviadas</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {users.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
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
