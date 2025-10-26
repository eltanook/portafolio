"use client"

import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-9xl font-bold text-foreground">404</h1>
              <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">Página no encontrada</h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-foreground hover:bg-foreground/90 text-background">
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Volver al Inicio
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent">
                <Link href="/projects">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Ver Proyectos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
