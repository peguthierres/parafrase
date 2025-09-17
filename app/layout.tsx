import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { CookieBanner } from "@/components/layout/cookie-banner"

export const metadata: Metadata = {
  title: "ParaFrase - Descubra e Compartilhe Frases Inspiradoras",
  description:
    "Descubra e compartilhe frases inspiradoras dos maiores pensadores da humanidade. Conecte-se com uma comunidade apaixonada por sabedoria e reflexão.",
  keywords: "frases, citações, pensadores, filosofia, inspiração, sabedoria",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} antialiased`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
