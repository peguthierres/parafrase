"use client"

import type React from "react"

import { AuthButton } from "@/components/auth/auth-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

const navigationItems = [
  { href: "/authors", label: "Autores" },
  { href: "/categories", label: "Categorias" },
  { href: "/popular", label: "Populares" },
  { href: "/recent", label: "Recentes" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
    }
  }

  return (
    <header className="relative">
      {/* Header illustration background */}
      <div
        className="h-64 md:h-80 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=400&fit=crop')",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-4 md:p-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
              <span className="text-2xl font-bold text-primary">ParaFrase</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-white/80 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:block">
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:text-white/80"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </nav>

        {/* Search Bar */}
        <div className="relative z-10 flex justify-center px-4 md:px-6 mt-8">
          <form onSubmit={handleSearch} className="w-full max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar por autor, palavra-chave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-full shadow-lg"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>

        {/* Add Quote Button */}
        <div className="relative z-10 flex justify-center px-4 md:px-6 mt-6">
          <div className="flex items-center gap-3">
            <Button asChild className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full shadow-lg">
              <Link href="/add-quote">
                <span className="mr-2">+</span>
                Adicionar Frase
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border-white/20">
              <Link href="/authors">
                Explorar Autores
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
          <div className="p-4 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
