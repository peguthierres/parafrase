"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-parafrase-beige shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-parafrase-dark/80">
              Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda com
              nossa{" "}
              <a href="/politica-de-privacidade" className="text-parafrase-coral hover:underline">
                Política de Privacidade
              </a>
              .
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={rejectCookies}
              className="text-parafrase-dark border-parafrase-dark/20 hover:bg-parafrase-beige/50 bg-transparent"
            >
              Rejeitar
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              style={{ backgroundColor: "#E07A5F", color: "#FFFFFF" }}
              className="hover:opacity-90 border-0"
            >
              Aceitar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={rejectCookies}
              className="p-1 h-auto text-parafrase-dark/60 hover:text-parafrase-dark hover:bg-parafrase-beige/30"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
