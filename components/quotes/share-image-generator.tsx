"use client"

import { useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"

interface ShareImageGeneratorProps {
  content: string
  authorName: string
  onGenerate?: () => void
}

export function ShareImageGenerator({ content, authorName, onGenerate }: ShareImageGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateImage = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#E07A5F") // coral
    gradient.addColorStop(0.5, "#F2CC8F") // beige
    gradient.addColorStop(1, "#81B29A") // sage green

    // Fill background
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add subtle overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Configure text styles
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Draw quote content
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 36px Georgia, serif"
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
    ctx.shadowBlur = 4
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2

    // Word wrap for quote
    const words = `"${content}"`.split(" ")
    const maxWidth = canvas.width - 120
    let line = ""
    let y = canvas.height / 2 - 60

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " "
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, canvas.width / 2, y)
        line = words[n] + " "
        y += 50
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, canvas.width / 2, y)

    // Draw author name
    ctx.font = "italic 28px Georgia, serif"
    ctx.fillText(`— ${authorName}`, canvas.width / 2, y + 80)

    // Reset shadow for watermark
    ctx.shadowColor = "transparent"
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    // Draw watermark
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    ctx.font = "16px Arial, sans-serif"
    ctx.textAlign = "right"
    ctx.fillText("ParaFrase.com.br", canvas.width - 20, canvas.height - 20)

    // Download image
    const link = document.createElement("a")
    link.download = `frase-${authorName.replace(/\s+/g, "-").toLowerCase()}.png`
    link.href = canvas.toDataURL()
    link.click()

    onGenerate?.()
  }, [content, authorName, onGenerate])

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={canvasRef} className="hidden" />
      <Button onClick={generateImage} variant="outline" size="sm" className="gap-2 bg-transparent">
        <ImageIcon className="h-4 w-4" />
        Gerar Imagem
      </Button>
    </div>
  )
}
