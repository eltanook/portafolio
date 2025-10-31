"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { TypingEffect } from "@/components/typing-effect"
import { ArrowRight, Mail, FileText, User, ExternalLink, Phone, MapPin } from "lucide-react"
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { getStrapiMedia } from "@/lib/strapi"

interface Project {
  id: number
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
}

const technologies = ["Java", "JavaScript", "ReactJS", "Python", "Node.js", "Firebase", "Git", "R-script"]

const iniciosImages = ["/inicios-1.png", "/inicios-2.png", "/inicios-3.png", "/inicios-4.png"]

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime: number | null = null
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return { count, ref }
}

function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

function CounterCard({ end, label }: { end: number; label: string }) {
  const { count, ref } = useCountUp(end)
  return (
    <div ref={ref} className="flex flex-col justify-center items-center text-center">
      <div className="text-4xl font-semibold text-accent mb-1">{count}+</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

export default function HomePage() {
  const { t, language } = useLanguage()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [age, setAge] = useState(calculateAge(new Date(2004, 10, 17)))
  const [showModalButton, setShowModalButton] = useState(false)
  const [showIniciosButton, setShowIniciosButton] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  // Fetch featured projects from Strapi
  useEffect(() => {
    async function fetchProjects() {
      try {
        const headers: HeadersInit = {}
        if (process.env.NEXT_PUBLIC_STRAPI_API_TOKEN) {
          headers['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        }
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=*&sort[0]=order:asc&pagination[limit]=3`,
          { headers }
        )
        const data = await response.json()
        
        const projects: Project[] = data.data?.map((item: any) => {
          const imageUrl = item.attributes.image?.data?.attributes?.url
          return {
            id: item.id,
            slug: item.attributes.slug,
            title: item.attributes.title,
            description: item.attributes.description,
            image: imageUrl ? getStrapiMedia(imageUrl) : '/placeholder.png',
            tags: item.attributes.tags || []
          }
        }) || []
        
        setFeaturedProjects(projects)
      } catch (error) {
        console.error('Error fetching projects:', error)
        // Keep empty array on error
      }
    }
    
    fetchProjects()
  }, [])

  useEffect(() => {
    // Update age every day
    const interval = setInterval(() => {
      setAge(calculateAge(new Date(2004, 10, 17)))
    }, 86400000) // 24 hours

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % iniciosImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(
      ".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale",
    )
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => {
    document.title = language === "es" ? "Tomás Nadal - Inicio" : "Tomás Nadal - Home"
  }, [language])

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        <section className="relative py-8 sm:py-12 bg-background">
          {/* Efecto de luces naranjas en el fondo */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff620a]/5 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#ff620a]/3 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-[#ff620a]/4 rounded-full blur-[110px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <Card className="bg-[#1a1a1a] dark:bg-[#0f0f0f] border-0 shadow-lg overflow-hidden">
              <CardContent className="p-8 sm:p-10 lg:p-12">
                <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Tomás Nadal
                  </h1>

                  <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-accent min-h-[2.5rem] flex items-center">
                    <TypingEffect
                      texts={[language === "es" ? "Desarrollador Web" : "Web Developer", language === "es" ? "Estudiante de Ciencia de Datos" : "Data Science Student"]}
                      typingSpeed={100}
                      deletingSpeed={50}
                      pauseDuration={2000}
                    />
                  </div>

                  <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
                    {language === "es"
                      ? "Me gusta crear soluciones, convirtiendo la tecnología en una herramienta al servicio del prójimo."
                      : "I like to create solutions, turning technology into a tool to serve others."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button
                      asChild
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground group transition-all duration-300"
                    >
                      <Link href="/contact" className="flex items-center gap-2">
                        {language === "es" ? "Enviar Mensaje" : "Send Message"}
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm transition-all duration-300"
                    >
                      <Link href="/projects">{language === "es" ? "Ver Proyectos" : "View Projects"}</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="relative py-12 sm:py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[minmax(200px,auto)]">
              <Dialog>
                <Card
                  className="sm:col-span-2 lg:row-span-2 bg-card border-0 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                  onMouseEnter={() => setShowModalButton(true)}
                  onMouseLeave={() => setShowModalButton(false)}
                >
                  <CardContent className="h-full flex flex-col justify-between p-6 sm:p-8 relative">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">Tomás Nadal</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {language === "es"
                          ? "Soy Tomás Nadal, desarrollador web de Buenos Aires, Argentina. Mi pasión es crear soluciones digitales innovadoras que aporten valor real. Cada proyecto es una oportunidad para transformar ideas en herramientas al servicio de las personas."
                          : "I'm Tomás Nadal, a web developer from Buenos Aires, Argentina. My passion is creating innovative digital solutions that provide real value. Each project is an opportunity to transform ideas into tools that serve people."}
                      </p>

                      <div className="relative overflow-hidden mb-6 h-8">
                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-card to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent z-10" />
                        <div className="flex gap-2 animate-[scroll-left_20s_linear_infinite] hover:[animation-play-state:paused]">
                          {[...technologies, ...technologies].map((tech, index) => (
                            <span
                              key={`${tech}-${index}`}
                              className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium whitespace-nowrap flex-shrink-0"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="relative w-full h-24 mb-6 overflow-hidden rounded-lg">
                        <Image
                          src="/andrew-kliatskyi-B_Z9jqassqE-unsplash.jpg"
                          alt="Tomás Nadal working"
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <a
                          href="https://github.com/eltanook"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent transition-colors duration-300"
                        >
                          <FaGithub className="w-5 h-5" />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/tomasnadal/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent transition-colors duration-300"
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </a>
                        <a
                          href="https://www.instagram.com/tominadal_/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent transition-colors duration-300"
                        >
                          <FaInstagram className="w-5 h-5" />
                        </a>
                        <a
                          href="https://api.whatsapp.com/send?phone=+54%209%2011%203647%204934&text=Hola%20Tom%C3%A1s,%20vengo%20de%20tu%20portafolio!"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent transition-colors duration-300"
                        >
                          <FaWhatsapp className="w-5 h-5" />
                        </a>
                      </div>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className={`bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 ${showModalButton ? "opacity-100" : "opacity-0"}`}
                        >
                          {language === "es" ? "Ver más" : "View more"}
                        </Button>
                      </DialogTrigger>
                    </div>
                  </CardContent>
                </Card>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      {language === "es" ? "Tomás Nadal - Full Stack Developer" : "Tomás Nadal - Full Stack Developer"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 pt-4">
                    <div className="text-base leading-relaxed space-y-4 text-muted-foreground">
                      <div>
                        {language === "es"
                          ? "Soy Tomás Nadal, desarrollador web de Buenos Aires, Argentina. Mi pasión es crear soluciones digitales innovadoras que aporten valor real. Cada proyecto es una oportunidad para transformar ideas en herramientas al servicio de las personas."
                          : "I'm Tomás Nadal, a web developer from Buenos Aires, Argentina. My passion is creating innovative digital solutions that provide real value. Each project is an opportunity to transform ideas into tools that serve people."}
                      </div>
                      <div>
                        {language === "es"
                          ? "Hoy combino desarrollo web con análisis de datos, y lidero mis propios proyectos en Nexium y Zevetix. Me especializo en construir aplicaciones web escalables y eficientes."
                          : "Today I combine web development with data analysis, and lead my own projects at Nexium and Zevetix. I specialize in building scalable and efficient web applications."}
                      </div>
                      <div className="pt-4">
                        <div className="font-semibold mb-2">{language === "es" ? "Tecnologías:" : "Technologies:"}</div>
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full h-64 overflow-hidden rounded-lg mt-4">
                      <Image
                        src="/Gemini_Generated_Image_xml7o8xml7o8xml7.png"
                        alt="Tomás Nadal working"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Card className="sm:col-span-2 bg-card border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6 h-full">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 h-full">
                    <CounterCard end={70} label={language === "es" ? "Proyectos" : "Projects"} />
                    <div className="flex flex-col justify-center items-center text-center border-x border-border">
                      <CounterCard end={40} label={language === "es" ? "Clientes" : "Clients"} />
                    </div>
                    <CounterCard end={5} label={language === "es" ? "Años" : "Years"} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center items-center text-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#f5f4f6] dark:bg-[#1a1a1a] flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-3xl sm:text-4xl font-semibold text-accent">{age}</div>
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {language === "es" ? "años" : "years old"}
                  </span>
                </CardContent>
              </Card>

              <Card className="bg-card border-0 shadow-sm group hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center items-center text-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#f5f4f6] dark:bg-[#1a1a1a] flex items-center justify-center group-hover:bg-accent/20 group-hover:rotate-12 transition-all duration-300">
                    <FileText className="w-6 h-6 sm:w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    {language === "es" ? "Mi CV" : "My CV"}
                  </h3>
                  <Button
                    asChild
                    size="sm"
                    className="bg-foreground dark:bg-background text-background dark:text-foreground hover:bg-foreground/90 dark:hover:bg-background/90 transition-all duration-300"
                  >
                    <a href="/CV — Tomás Nadal 2025.pdf" download="CV-Tomas-Nadal-2025.pdf">
                      {language === "es" ? "Descargar" : "Download"}
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="sm:col-span-2 lg:col-span-4 bg-transparent border-2 border-black dark:border-white shadow-sm hover:border-accent dark:hover:border-accent overflow-hidden hover:scale-[1.01] transition-all duration-300 group">
                <div className="grid md:grid-cols-2 h-full min-h-[300px]">
                  <div className="relative h-full min-h-[250px] p-4">
                    <div className="relative w-full h-full">
                      <Image
                        src="/Gemini_Generated_Image_xml7o8xml7o8xml7.png"
                        alt="Mi trayectoria"
                        fill
                        className="object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
                      {language === "es" ? "Mi Trayectoria" : "My Journey"}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                      {language === "es"
                        ? "Empecé en 2020 cuando compré mi primera computadora. Aprendí de manera autodidacta, participé en bootcamps y construí proyectos personales. Desde 2023 estudio la Licenciatura en Ciencia de Datos en la Universidad Nacional de San Martín. Mi pasión es crear soluciones innovadoras al servicio de los demás. Hoy lidero el desarrollo completo en Nexium Solutions y creo experiencias digitales únicas en Zevetix."
                        : "I started in 2020 when I bought my first computer. I learned self-taught, participated in bootcamps and built personal projects. Since 2023 I've been studying Data Science at the National University of San Martín. My passion is creating innovative solutions to serve others. Today I lead full development at Nexium Solutions and create unique digital experiences at Zevetix."}
                    </p>
                  </div>
                </div>
              </Card>

              {featuredProjects.length >= 2 && (
                <Card className="sm:col-span-2 bg-card border-0 shadow-sm hover:shadow-md group overflow-hidden hover:scale-[1.02] transition-all duration-300">
                  <Link href={`/projects/${featuredProjects[1].slug}`} className="block h-full">
                    <div className="relative h-full min-h-[300px]">
                      <Image
                        src={featuredProjects[1].image || "/placeholder.svg"}
                        alt={featuredProjects[1].title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{featuredProjects[1].title}</h3>
                        <p className="text-xs sm:text-sm text-white/90 mb-3 sm:mb-4">
                          {featuredProjects[1].description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {featuredProjects[1].tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              )}

              {featuredProjects.length >= 3 && (
                <Card className="lg:row-span-2 bg-card border-0 shadow-sm hover:shadow-md group overflow-hidden hover:scale-[1.02] transition-all duration-300">
                  <Link href={`/projects/${featuredProjects[2].slug}`} className="block h-full">
                    <div className="relative h-full min-h-[250px]">
                      <Image
                        src={featuredProjects[2].image || "/placeholder.svg"}
                        alt={featuredProjects[2].title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{featuredProjects[2].title}</h3>
                        <p className="text-xs sm:text-sm text-white/80">
                          {featuredProjects[2].description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Card>
              )}

                            <Card className="lg:row-span-2 bg-transparent border-2 border-border dark:border-white hover:border-accent shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                <div className="h-full flex flex-col p-4">
                  <Link
                    href="/projects/nexium"
                    className="block flex-1 group/nexium relative overflow-hidden rounded-lg"
                  >
                    <div className="relative h-full min-h-[250px] p-6">
                      <Image
                        src="/logo-nexium.png"
                        alt="Nexium"
                        fill
                        className="object-contain grayscale group-hover/nexium:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </Link>
                  <Link
                    href="/projects/zevetix"
                    className="block flex-1 group/zevetix relative overflow-hidden rounded-lg mt-3"
                  >
                    <div className="relative h-full min-h-[250px] p-6">
                      <Image
                        src="/logo-zevetix.png"
                        alt="Zevetix"
                        fill
                        className="object-contain grayscale group-hover/zevetix:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </Link>
                </div>
              </Card>

              <Dialog>
                <Card
                  className="sm:col-span-2 bg-card border-0 shadow-sm hover:shadow-md group overflow-hidden hover:scale-[1.02] transition-all duration-300"
                  onMouseEnter={() => setShowIniciosButton(true)}
                  onMouseLeave={() => setShowIniciosButton(false)}
                >
                  <div className="grid md:grid-cols-2 h-full min-h-[250px]">
                    <div className="relative h-full min-h-[200px] p-4">
                      <div className="relative w-full h-full">
                        {iniciosImages.map((img, index) => (
                          <Image
                            key={img}
                            src={img || "/placeholder.svg"}
                            alt={`Mis Inicios ${index + 1}`}
                            fill
                            className={`object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-1000 ${
                              index === currentImageIndex ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3">
                          {language === "es" ? "Mis Inicios" : "My Beginnings"}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {language === "es"
                            ? "2020 - 2022. Explora los proyectos que fueron los primeros pasos que di en el desarrollo web. Si bien son mejorables, me gusta siempre tenerlos a mano para recordar cómo empecé y todo lo que aprendí en el camino."
                            : "2020 - 2022. Explore the projects that were my first steps in web development. While they can be improved, I like to always have them on hand to remember how I started and everything I learned along the way."}
                        </p>
                      </div>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-foreground hover:bg-foreground/90 text-background mt-4 transition-all duration-300"
                        >
                          {language === "es" ? "Ver más" : "View more"}
                        </Button>
                      </DialogTrigger>
                    </div>
                  </div>
                </Card>

                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      {language === "es" ? "Mis Inicios" : "My Beginnings"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <a
                        href="https://bunyanwood.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors duration-300"
                      >
                        <span className="text-sm font-medium text-foreground">Bunyan Wood</span>
                        <ExternalLink className="w-4 h-4 text-accent" />
                      </a>
                      <a
                        href="https://tomasnadal2023.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors duration-300"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {language === "es" ? "Portafolio 2.0" : "Portfolio 2.0"}
                        </span>
                        <ExternalLink className="w-4 h-4 text-accent" />
                      </a>
                      <a
                        href="https://chocolatesneakers.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors duration-300"
                      >
                        <span className="text-sm font-medium text-foreground">E-Commerce React + Firebase</span>
                        <ExternalLink className="w-4 h-4 text-accent" />
                      </a>
                      <a
                        href="https://adexa.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors duration-300"
                      >
                        <span className="text-sm font-medium text-foreground">Adexa</span>
                        <ExternalLink className="w-4 h-4 text-accent" />
                      </a>
                      <a
                        href="https://codenchill2.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors duration-300"
                      >
                        <span className="text-sm font-medium text-foreground">Code-N-Chill</span>
                        <ExternalLink className="w-4 h-4 text-accent" />
                      </a>
                      <a
                        href="https://github.com/eltanook/Chocolate-Messeger"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors duration-300"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {language === "es" ? "App de mensajería (muy principiante)" : "Messaging App (beginner)"}
                        </span>
                        <ExternalLink className="w-4 h-4 text-accent" />
                      </a>
                      <a
                        href="https://snakegame-tomasnadal.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors duration-300"
                      >
                        <span className="text-sm font-medium text-foreground">Nokia Snake</span>
                        <ExternalLink className="w-4 h-4 text-accent" />
                      </a>
                      <a
                        href="https://potafolio2021-tomasnadal.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors duration-300"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {language === "es" ? "Portafolio 1.0" : "Portfolio 1.0"}
                        </span>
                        <ExternalLink className="w-4 h-4 text-accent" />
                      </a>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Card className="sm:col-span-2 bg-card border-0 shadow-sm hover:shadow-md overflow-hidden">
                <div className="relative h-full min-h-[250px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.50150904932!2d-58.51520919999999!3d-34.6158037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: "none" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 grayscale dark:invert dark:hue-rotate-180"
                  />
                  <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg shadow-sm pointer-events-none">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                      <span className="text-xs sm:text-sm font-medium text-foreground">Buenos Aires, Argentina</span>
                    </div>
                  </div>
                </div>
              </Card>

              {featuredProjects.length >= 1 && (
                <Card className="sm:col-span-2 bg-card border-0 shadow-sm hover:shadow-md group overflow-hidden hover:scale-[1.02] transition-all duration-300">
                  <Link href={`/projects/${featuredProjects[0].slug}`} className="block h-full">
                    <div className="relative h-full min-h-[250px]">
                      <Image
                        src={featuredProjects[0].image || "/placeholder.svg"}
                        alt={featuredProjects[0].title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{featuredProjects[0].title}</h3>
                        <p className="text-xs sm:text-sm text-white/80">
                          {featuredProjects[0].description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Card>
              )}
            </div>

            <Card className="mt-8 sm:mt-12 lg:mt-16 bg-card border-0 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
                        {language === "es" ? "¿Listo para trabajar juntos?" : "Ready to work together?"}
                      </h2>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                        {language === "es"
                          ? "Envíame un mensaje y hablemos sobre tu propuesta. Estoy disponible para colaboraciones y nuevos desafíos."
                          : "Send me a message and let's talk about your proposal. I'm available for collaborations and new challenges."}
                      </p>

                      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#f5f4f6] dark:bg-[#1a1a1a] flex items-center justify-center">
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-foreground">
                              {language === "es" ? "Teléfono" : "Phone"}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">+54 9 11 3647 4934</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#f5f4f6] dark:bg-[#1a1a1a] flex items-center justify-center">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-foreground">
                              {language === "es" ? "Ubicación" : "Location"}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">Buenos Aires, Argentina</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#f5f4f6] dark:bg-[#1a1a1a] flex items-center justify-center">
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-foreground">Email</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">tomasnadal04@gmail.com</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <Button
                        asChild
                        size="lg"
                        className="bg-foreground hover:bg-foreground/90 text-background group transition-all duration-300"
                      >
                        <Link href="/projects">
                          {language === "es" ? "Ver Todos los Proyectos" : "See All Projects"}
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="bg-transparent dark:border-white shadow-sm transition-all duration-300"
                      >
                        <a href="https://www.linkedin.com/in/tomasnadal/" target="_blank" rel="noopener noreferrer">
                          {language === "es" ? "Contactar por LinkedIn" : "Contact via LinkedIn"}
                        </a>
                      </Button>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        {language === "es" ? "Nombre" : "Name"}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-background dark:bg-[#0a0a0a] border-border focus:border-accent transition-all duration-300"
                        placeholder={language === "es" ? "Tu nombre" : "Your name"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-background dark:bg-[#0a0a0a] border-border focus:border-accent transition-all duration-300"
                        placeholder={language === "es" ? "tu@email.com" : "your@email.com"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        {language === "es" ? "Mensaje" : "Message"}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-background dark:bg-[#0a0a0a] border-border focus:border-accent h-32 resize-none transition-all duration-300"
                        placeholder={
                          language === "es" ? "Cuéntame sobre tu proyecto..." : "Tell me about your project..."
                        }
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-foreground hover:bg-foreground/90 text-background transition-all duration-300"
                    >
                      {isSubmitting
                        ? language === "es"
                          ? "Enviando..."
                          : "Sending..."
                        : language === "es"
                          ? "Enviar Mensaje"
                          : "Send Message"}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
