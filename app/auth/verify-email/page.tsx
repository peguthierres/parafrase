import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Verifique seu Email</CardTitle>
            <CardDescription>Enviamos um link de confirmação para seu email</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Você se cadastrou com sucesso! Por favor, verifique sua caixa de entrada e clique no link de confirmação
              para ativar sua conta.
            </p>
            <p className="text-sm text-muted-foreground">Não recebeu o email? Verifique sua pasta de spam.</p>
            <Button asChild className="w-full">
              <Link href="/auth/login">Voltar para Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
