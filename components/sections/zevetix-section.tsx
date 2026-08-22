"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/layout/language-provider"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function ZevetixSection() {
  const { language } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes shimmer-slide {
        0% { transform: translateX(-150%) skewX(-25deg); }
        100% { transform: translateX(400%) skewX(-25deg); }
      }
      .animate-shimmer-slide {
        animation: shimmer-slide 1s ease-in-out forwards;
      }
    `}} />
    <section ref={ref} className="w-full bg-background px-6 md:px-12 lg:px-20 py-24 max-md:pt-12 border-b border-border/10 flex justify-center scroll-reveal">
      <div className="max-w-7xl w-full mx-auto">
        <div className="bg-transparent border-[2.5px] border-black dark:border-white hover:border-accent dark:hover:border-accent overflow-hidden hover:scale-[1.01] transition-all duration-1000 group rounded-[2rem]">
          <div className="grid md:grid-cols-[30%_70%] lg:grid-cols-[25%_75%] h-full min-h-[300px]">
            {/* Left Side: Logo */}
            <div className="relative h-full min-h-[250px] p-4 max-md:hidden">
              <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#f5f4f6] dark:bg-[#1a1a1a] flex items-center justify-center">
                {/* Metallic Reflection / Shimmer */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/60 dark:via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-slide translate-x-[-150%] skew-x-[-25deg]" />
                </div>
                {mounted ? (
                  <Image src={resolvedTheme === "dark" ? "/images/logo_png_blanco.png" : "/images/logo_png.png"} alt="Zevetix Logo" fill className="object-contain p-6 group-hover:scale-105 transition-transform duration-1000" />
                ) : (
                  <Image src="/images/logo_png.png" alt="Zevetix Logo" fill className="object-contain p-6 group-hover:scale-105 transition-transform duration-1000" />
                )}
              </div>
            </div>
            
            {/* Right Side: Content */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="md:hidden w-10 h-10 relative flex-shrink-0">
                  {mounted ? (
                    <Image src={resolvedTheme === "dark" ? "/images/logo_png_blanco.png" : "/images/logo_png.png"} alt="Zevetix Logo" fill className="object-contain" />
                  ) : (
                    <Image src="/images/logo_png.png" alt="Zevetix Logo" fill className="object-contain" />
                  )}
                </div>
                <h3 className="text-3xl sm:text-4xl font-semibold text-foreground">
                  Zevetix Labs
                </h3>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                {language === "es" 
                  ? "Consultoría IT integral: desarrollo de productos digitales, web, análisis de datos y automatización con Inteligencia Artificial. Transformamos tecnología en herramientas clave para el crecimiento de tu negocio."
                  : "Comprehensive IT consulting: digital product development, web, data analysis, and Artificial Intelligence automation. We transform technology into key tools for your business growth."}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-fit mt-auto">
                {/* Primary CTA */}
                <a
                  href="https://zevetix.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center group/btn transition-all hover:scale-[1.02] bg-foreground text-background rounded-full"
                >
                  <div className="px-6 h-12 flex items-center justify-center font-bold text-sm whitespace-nowrap">
                    {language === "es" ? "Visitar Zevetix" : "Visit Zevetix"}
                  </div>
                  <div className="pr-2 pl-1 h-12 flex items-center justify-center">
                    <div className="bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
