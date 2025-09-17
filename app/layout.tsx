import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { CookieBanner } from "@/components/layout/cookie-banner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

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
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
