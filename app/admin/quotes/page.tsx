import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { PendingQuotesTable } from "@/components/admin/pending-quotes-table"
import { getPendingQuotes, checkAdminAccess } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminQuotesPage() {
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

  const pendingQuotes = await getPendingQuotes(50)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Moderação de Frases</h1>
              <p className="text-muted-foreground">Revise e aprove frases enviadas pela comunidade</p>
            </div>

            <PendingQuotesTable
              quotes={pendingQuotes}
              onApprove={(quoteId) => {
                console.log("Approve quote:", quoteId)
              }}
              onReject={(quoteId) => {
                console.log("Reject quote:", quoteId)
              }}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
