"use client"

import Image from "next/image"
import { ArrowRight, ExternalLink, X } from "lucide-react"
import { useLanguage } from "@/components/layout/language-provider"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const oldProjects = [
  { 
    name: "Bunyan Wood", 
    subEs: "Agencia de desarrollo web y marca", 
    subEn: "Web development & branding agency", 
    url: "https://bunyanwood.netlify.app/" 
  },
  { 
    name: "Portafolio 2.0", 
    subEs: "Segundo portafolio personal (2022)", 
    subEn: "Second personal portfolio (2022)", 
    url: "https://tomasnadal1.netlify.app/" 
  },
  { 
    name: "E-Commerce React + Firebase", 
    subEs: "Tienda online de zapatillas con base de datos en tiempo real", 
    subEn: "Online sneaker store with real-time database", 
    url: "https://chocolatesneakers.netlify.app/" 
  },
  { 
    name: "Adexa", 
    subEs: "Sitio web corporativo y de consultoría", 
    subEn: "Corporate and consulting website", 
    url: "https://adexa.netlify.app/" 
  },
  { 
    name: "Code-N-Chill", 
    subEs: "Plataforma de música y temporizador Pomodoro para programar", 
    subEn: "Music player and Pomodoro timer for coding", 
    url: "https://codenchill2.netlify.app/" 
  },
  { 
    name: "App de mensajería", 
    subEs: "Chat grupal con autenticación y base de datos", 
    subEn: "Group chat application with authentication and database", 
    url: "https://github.com/tominadal/Chocolate-Messeger" 
  },
  { 
    name: "Nokia Snake", 
    subEs: "Clon interactivo del clásico juego de la serpiente", 
    subEn: "Interactive clone of the classic snake game", 
    url: "https://snakegame-tomasnadal.netlify.app/" 
  },
  { 
    name: "Portafolio 1.0", 
    subEs: "Primer portafolio personal (HTML y CSS - 2021)", 
    subEn: "First personal portfolio (HTML & CSS - 2021)", 
    url: "https://potafolio2021-tomasnadal.netlify.app/" 
  },
]

export default function CTATestimonials() {
  const { t, language } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const inicoImagesRow1 = [
    "/inicios-6.png",
    "/inicios-2.png",
    "/inicios-1.png"
  ]

  const inicoImagesRow2 = [
    "/inicios-5.png",
    "/inicios-3.png",
    "/inicios-4.png"
  ]
  // Duplicate arrays to allow for continuous scrolling effect
  const duplicatedImagesRow1 = [...inicoImagesRow1, ...inicoImagesRow1, ...inicoImagesRow1, ...inicoImagesRow1]
  const duplicatedImagesRow2 = [...inicoImagesRow2, ...inicoImagesRow2, ...inicoImagesRow2, ...inicoImagesRow2]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Top row moves left
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  // Bottom row moves right
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"])

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [isModalOpen])

  return (
    <section className="w-full bg-secondary/30 dark:bg-muted/10 px-8 py-24 overflow-hidden relative border-t border-border/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24">
        {/* Left Side: Image */}
        <div ref={containerRef} className="w-full md:w-1/2 rounded-[2.5rem] overflow-hidden relative aspect-[4/3] scroll-reveal group bg-black/5 dark:bg-white/5 border border-border/20">
           
           <div className="absolute inset-0 flex flex-col justify-center gap-6 -rotate-[12deg] scale-[1.15] pointer-events-none z-0">
           {/* Mobile Container (Autoplay CSS animation, no scroll binding) */}
           <div className="absolute inset-0 flex flex-col justify-center gap-6 -rotate-[12deg] scale-[1.15] pointer-events-none z-0 md:hidden">
              <div className="flex w-max animate-scroll-left no-transition">
                <div className="flex gap-6 pr-6 flex-shrink-0">
                  {inicoImagesRow1.map((src, index) => (
                    <div key={`row1-mobile1-${index}`} className="relative w-64 h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10">
                      <Image src={src} alt={`Mis inicios ${index + 1}`} fill sizes="(max-width: 768px) 256px, 320px" quality={100} className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-6 pr-6 flex-shrink-0">
                  {inicoImagesRow1.map((src, index) => (
                    <div key={`row1-mobile2-${index}`} className="relative w-64 h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10">
                      <Image src={src} alt={`Mis inicios ${index + 1}`} fill sizes="(max-width: 768px) 256px, 320px" quality={100} className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex w-max animate-scroll-right no-transition">
                <div className="flex gap-6 pr-6 flex-shrink-0">
                  {inicoImagesRow2.map((src, index) => (
                    <div key={`row2-mobile1-${index}`} className="relative w-64 h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10">
                      <Image src={src} alt={`Mis inicios ${index + 1}`} fill sizes="(max-width: 768px) 256px, 320px" quality={100} className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-6 pr-6 flex-shrink-0">
                  {inicoImagesRow2.map((src, index) => (
                    <div key={`row2-mobile2-${index}`} className="relative w-64 h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10">
                      <Image src={src} alt={`Mis inicios ${index + 1}`} fill sizes="(max-width: 768px) 256px, 320px" quality={100} className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
           </div>

           {/* Desktop Container (Scroll-driven motion, visible only on md and up) */}
           <div className="absolute inset-0 flex flex-col justify-center gap-6 -rotate-[12deg] scale-[1.15] pointer-events-none z-0 max-md:hidden">
              <motion.div 
                className="flex gap-6 w-max no-transition" 
                style={{ x: x1 }}
              >
                {duplicatedImagesRow1.map((src, index) => (
                  <div key={`row1-desktop-${index}`} className="relative w-80 h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10">
                    <Image src={src} alt={`Mis inicios ${index + 1}`} fill sizes="320px" quality={100} className="object-cover" />
                  </div>
                ))}
              </motion.div>

              <motion.div 
                className="flex gap-6 w-max no-transition" 
                style={{ x: x2 }}
              >
                {duplicatedImagesRow2.map((src, index) => (
                  <div key={`row2-desktop-${index}`} className="relative w-80 h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10">
                    <Image src={src} alt={`Mis inicios ${index + 1}`} fill sizes="320px" quality={100} className="object-cover" />
                  </div>
                ))}
              </motion.div>
           </div>
           </div>
            
            {/* Resting Label */}
            <div className="absolute top-6 left-6 text-accent font-bold text-4xl tracking-wider z-10 group-hover:opacity-0 transition-opacity duration-300">
              *mis inicios
            </div>
            
            {/* Hover Overlay with Button */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20 max-md:hidden">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
              >
                {language === "es" ? "Ver Mis Inicios" : "View My Beginnings"}
              </button>
            </div>

            {/* Mobile Pill CTA at bottom right */}
            <div className="absolute bottom-4 right-4 z-30 md:hidden">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                className="inline-flex w-fit items-center group transition-all hover:scale-[1.02] bg-foreground text-background rounded-full shadow-xl"
              >
                <div className="px-4 h-10 flex items-center justify-center font-bold text-xs whitespace-nowrap">
                  {language === "es" ? "Mis Inicios" : "My Beginnings"}
                </div>
                <div className="pr-1.5 pl-1 h-10 flex items-center justify-center">
                  <div className="bg-accent text-white w-7 h-7 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </button>
            </div>


        </div>

        {/* Right Side: CTA Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center scroll-reveal">
          <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-6">
            {t("cta.subtitle")}
          </p>
          <h2 className="text-4xl lg:text-[3rem] leading-[1.1] font-medium tracking-tight mb-6">
            {t("cta.title1")}{t("cta.title2")}
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl">
            {t("cta.story")}
          </p>
          
          <div>
            <a href="mailto:tomasnadal04@gmail.com" className="inline-flex w-fit items-center group transition-all hover:scale-[1.02] bg-foreground text-background rounded-full">
              <div className="px-10 h-16 flex items-center justify-center font-bold text-lg whitespace-nowrap">
                {t("cta.btn")}
              </div>
              <div className="pr-3 pl-1 h-16 flex items-center justify-center">
                <div className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={20} />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>


      {/* Modal Mis Inicios */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-3xl bg-background border border-border/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-10">
            <div className="flex items-center justify-between p-6 border-b border-border/10">
              <h3 className="font-bold text-2xl">{language === "en" ? "My Beginnings" : "Mis Inicios"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] flex flex-col gap-3 custom-scrollbar">
              {oldProjects.map((project, i) => (
                <a 
                  key={i} 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-accent group text-foreground hover:text-white transition-colors duration-300 border border-border/5"
                >
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-sm font-semibold">{project.name}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">
                      — {language === "es" ? project.subEs : project.subEn}
                    </span>
                  </div>
                  <ExternalLink size={16} className="flex-shrink-0 ml-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
