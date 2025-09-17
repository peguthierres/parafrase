import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { StatsCards } from "@/components/admin/stats-cards"
import { PendingQuotesTable } from "@/components/admin/pending-quotes-table"
import { getAdminStats, getPendingQuotes, checkAdminAccess } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminDashboard() {
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

  const [stats, pendingQuotes] = await Promise.all([getAdminStats(), getPendingQuotes(5)])

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h1>
              <p className="text-muted-foreground">Gerencie o conteúdo e usuários do ParaFrase</p>
            </div>

            <StatsCards stats={stats} />

            <PendingQuotesTable
              quotes={pendingQuotes}
              onApprove={(quoteId) => {
                // This will be handled by client-side component
                console.log("Approve quote:", quoteId)
              }}
              onReject={(quoteId) => {
                // This will be handled by client-side component
                console.log("Reject quote:", quoteId)
              }}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
