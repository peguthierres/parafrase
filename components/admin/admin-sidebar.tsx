"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  FileText,
  Users,
  UserCheck,
  Settings,
  BarChart3,
  MessageSquare,
  Star,
  Hand as Ad,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Frases Pendentes",
    href: "/admin/quotes",
    icon: FileText,
  },
  {
    title: "Usuários",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Autores",
    href: "/admin/authors",
    icon: UserCheck,
  },
  {
    title: "Comentários",
    href: "/admin/comments",
    icon: MessageSquare,
  },
  {
    title: "Frases em Destaque",
    href: "/admin/featured",
    icon: Star,
  },
  {
    title: "Anúncios",
    href: "/admin/ads",
    icon: Ad,
  },
  {
    title: "Relatórios",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Configurações",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Painel Administrativo</h2>
          <div className="space-y-1">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              {sidebarItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-secondary text-secondary-foreground",
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
