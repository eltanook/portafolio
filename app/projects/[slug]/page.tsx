"use client"

import { use, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { ArrowLeft, ExternalLink, Calendar, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Placeholder data - will be replaced with Strapi data
const projectsData: Record<string, any> = {
  "ecommerce-platform": {
    id: 1,
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Plataforma de comercio electrónico completa con pasarela de pagos y gestión de inventario",
    descriptionEn: "Complete e-commerce platform with payment gateway and inventory management",
    longDescription:
      "Una plataforma de comercio electrónico completa desarrollada con Next.js y Stripe. Incluye gestión de inventario en tiempo real, procesamiento de pagos seguro, panel de administración, y una experiencia de usuario optimizada para conversiones. El sistema permite a los comerciantes gestionar productos, procesar pedidos, y analizar métricas de ventas desde un dashboard intuitivo.",
    longDescriptionEn:
      "A complete e-commerce platform built with Next.js and Stripe. Features real-time inventory management, secure payment processing, admin dashboard, and a user experience optimized for conversions. The system allows merchants to manage products, process orders, and analyze sales metrics from an intuitive dashboard.",
    image: "/modern-ecommerce-dashboard.png",
    images: ["/modern-ecommerce-dashboard.png", "/task-management-interface.png", "/analytics-dashboard-charts.png"],
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    category: "Web App",
    demo: "https://demo.com",
    github: "https://github.com",
    date: "Enero 2024",
    client: "Retail Company",
    features: [
      "Gestión de inventario en tiempo real",
      "Procesamiento de pagos con Stripe",
      "Panel de administración completo",
      "Sistema de notificaciones",
      "Análisis de ventas y métricas",
      "Responsive design",
    ],
  },
  "task-management-app": {
    id: 2,
    slug: "task-management-app",
    title: "Task Management App",
    description: "Aplicación de gestión de tareas con colaboración en tiempo real",
    descriptionEn: "Task management application with real-time collaboration",
    longDescription:
      "Aplicación de gestión de tareas con colaboración en tiempo real usando Firebase. Permite a los equipos organizar proyectos, asignar tareas, establecer prioridades y comunicarse eficientemente. Incluye notificaciones push, sincronización en tiempo real, y un sistema de permisos granular.",
    longDescriptionEn:
      "Task management application with real-time collaboration using Firebase. Allows teams to organize projects, assign tasks, set priorities and communicate efficiently. Includes push notifications, real-time sync, and granular permissions system.",
    image: "/task-management-interface.png",
    images: ["/task-management-interface.png", "/analytics-dashboard-charts.png", "/portfolio-cms-dashboard.jpg"],
    tags: ["React", "Firebase", "Tailwind", "Real-time"],
    category: "Web App",
    demo: "https://demo.com",
    github: "https://github.com",
    date: "Febrero 2024",
    client: "Tech Startup",
    features: [
      "Colaboración en tiempo real",
      "Sistema de notificaciones push",
      "Gestión de proyectos y tareas",
      "Asignación de responsables",
      "Priorización de tareas",
      "Comentarios y menciones",
    ],
  },
  "portfolio-cms": {
    id: 3,
    slug: "portfolio-cms",
    title: "Portfolio CMS",
    description: "Sistema de gestión de contenidos para portfolios creativos",
    descriptionEn: "Content management system for creative portfolios",
    longDescription:
      "Sistema de gestión de contenidos diseñado específicamente para portfolios creativos. Construido con Next.js y Strapi, permite a diseñadores y desarrolladores gestionar su contenido de forma sencilla con una interfaz intuitiva y moderna.",
    longDescriptionEn:
      "Content management system designed specifically for creative portfolios. Built with Next.js and Strapi, it allows designers and developers to manage their content easily with an intuitive and modern interface.",
    image: "/portfolio-cms-dashboard.jpg",
    images: ["/portfolio-cms-dashboard.jpg", "/modern-ecommerce-dashboard.png", "/task-management-interface.png"],
    tags: ["Next.js", "Strapi", "GraphQL", "TypeScript"],
    category: "CMS",
    demo: "https://demo.com",
    github: "https://github.com",
    date: "Marzo 2024",
    client: "Creative Agency",
    features: [
      "Editor visual de contenido",
      "API GraphQL",
      "Gestión de medios",
      "SEO optimizado",
      "Multi-idioma",
      "Temas personalizables",
    ],
  },
  "analytics-dashboard": {
    id: 4,
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    description: "Dashboard de análisis con visualización de datos en tiempo real",
    descriptionEn: "Analytics dashboard with real-time data visualization",
    longDescription:
      "Dashboard de análisis avanzado con visualización de datos en tiempo real. Construido con React y D3.js, permite a las empresas monitorear métricas clave, generar reportes personalizados y tomar decisiones basadas en datos. Incluye gráficos interactivos, filtros avanzados y exportación de datos.",
    longDescriptionEn:
      "Advanced analytics dashboard with real-time data visualization. Built with React and D3.js, it allows businesses to monitor key metrics, generate custom reports and make data-driven decisions. Includes interactive charts, advanced filters and data export.",
    image: "/analytics-dashboard-charts.png",
    images: ["/analytics-dashboard-charts.png", "/modern-ecommerce-dashboard.png"],
    tags: ["React", "D3.js", "Node.js", "WebSocket"],
    category: "Dashboard",
    demo: "https://demo.com",
    github: "https://github.com",
    date: "Abril 2024",
    client: "Data Analytics Firm",
    features: [
      "Visualización en tiempo real",
      "Gráficos interactivos con D3.js",
      "Filtros y segmentación avanzada",
      "Exportación de reportes",
      "Alertas personalizables",
      "API REST integrada",
    ],
  },
  "social-media-app": {
    id: 5,
    slug: "social-media-app",
    title: "Social Media App",
    description: "Red social con mensajería instantánea y compartición de contenido",
    descriptionEn: "Social network with instant messaging and content sharing",
    longDescription:
      "Red social completa con mensajería instantánea, compartición de contenido multimedia y sistema de notificaciones. Desarrollada con Next.js y Socket.io, ofrece una experiencia fluida y en tiempo real. Incluye perfiles de usuario, feed personalizado, sistema de likes y comentarios, y chat en tiempo real.",
    longDescriptionEn:
      "Complete social network with instant messaging, multimedia content sharing and notification system. Built with Next.js and Socket.io, it offers a smooth real-time experience. Includes user profiles, personalized feed, likes and comments system, and real-time chat.",
    image: "/social-media-feed-interface.jpg",
    images: ["/social-media-feed-interface.jpg", "/task-management-interface.png"],
    tags: ["Next.js", "Socket.io", "MongoDB", "Redis"],
    category: "Web App",
    demo: "https://demo.com",
    github: "https://github.com",
    date: "Mayo 2024",
    client: "Social Startup",
    features: [
      "Mensajería en tiempo real",
      "Feed personalizado con algoritmo",
      "Sistema de likes y comentarios",
      "Notificaciones push",
      "Compartir multimedia",
      "Perfiles personalizables",
    ],
  },
  "booking-system": {
    id: 6,
    slug: "booking-system",
    title: "Booking System",
    description: "Sistema de reservas para servicios profesionales con calendario integrado",
    descriptionEn: "Booking system for professional services with integrated calendar",
    longDescription:
      "Sistema de reservas completo para servicios profesionales con calendario integrado. Permite a los clientes reservar citas, gestionar disponibilidad, recibir recordatorios automáticos y procesar pagos. Incluye panel de administración para gestionar reservas, clientes y servicios ofrecidos.",
    longDescriptionEn:
      "Complete booking system for professional services with integrated calendar. Allows clients to book appointments, manage availability, receive automatic reminders and process payments. Includes admin panel to manage bookings, clients and offered services.",
    image: "/booking-calendar-interface.png",
    images: ["/booking-calendar-interface.png", "/analytics-dashboard-charts.png"],
    tags: ["React", "Express", "PostgreSQL", "Stripe"],
    category: "Web App",
    demo: "https://demo.com",
    github: "https://github.com",
    date: "Junio 2024",
    client: "Professional Services",
    features: [
      "Calendario interactivo",
      "Gestión de disponibilidad",
      "Recordatorios automáticos por email",
      "Procesamiento de pagos",
      "Panel de administración",
      "Sincronización con Google Calendar",
    ],
  },
  nexium: {
    id: 7,
    slug: "nexium",
    title: "Nexium",
    description: "Plataforma de gestión empresarial integral con soluciones innovadoras",
    descriptionEn: "Comprehensive business management platform with innovative solutions",
    longDescription:
      "Nexium es una plataforma de gestión empresarial integral que ofrece soluciones innovadoras para optimizar procesos, mejorar la productividad y facilitar la toma de decisiones estratégicas. Desarrollada con tecnologías de vanguardia, Nexium integra módulos de gestión financiera, recursos humanos, CRM y análisis de datos en una única plataforma cohesiva.",
    longDescriptionEn:
      "Nexium is a comprehensive business management platform that offers innovative solutions to optimize processes, improve productivity and facilitate strategic decision-making. Built with cutting-edge technologies, Nexium integrates financial management, human resources, CRM and data analytics modules into a single cohesive platform.",
    image: "/logo-nexium.png",
    images: ["/logo-nexium.png", "/analytics-dashboard-charts.png", "/modern-ecommerce-dashboard.png"],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "GraphQL", "Microservices"],
    category: "Enterprise",
    demo: "https://nexium.com",
    github: "https://github.com",
    date: "Julio 2024",
    client: "Nexium Corporation",
    features: [
      "Gestión financiera integrada",
      "Sistema de recursos humanos",
      "CRM avanzado",
      "Análisis de datos en tiempo real",
      "Arquitectura de microservicios",
      "API GraphQL escalable",
      "Dashboard personalizable",
      "Reportes automatizados",
    ],
  },
  zevetix: {
    id: 8,
    slug: "zevetix",
    title: "Zevetix",
    description: "Solución de automatización y transformación digital para empresas modernas",
    descriptionEn: "Automation and digital transformation solution for modern businesses",
    longDescription:
      "Zevetix es una solución completa de automatización y transformación digital diseñada para empresas modernas que buscan optimizar sus operaciones y escalar eficientemente. La plataforma ofrece herramientas de automatización de procesos, integración de sistemas, y análisis predictivo para impulsar el crecimiento empresarial.",
    longDescriptionEn:
      "Zevetix is a complete automation and digital transformation solution designed for modern businesses looking to optimize their operations and scale efficiently. The platform offers process automation tools, system integration, and predictive analytics to drive business growth.",
    image: "/logo-zevetix.png",
    images: ["/logo-zevetix.png", "/task-management-interface.png", "/analytics-dashboard-charts.png"],
    tags: ["React", "Node.js", "MongoDB", "Redis", "Docker", "Kubernetes"],
    category: "Enterprise",
    demo: "https://zevetix.com",
    github: "https://github.com",
    date: "Agosto 2024",
    client: "Zevetix Technologies",
    features: [
      "Automatización de procesos empresariales",
      "Integración con sistemas legacy",
      "Análisis predictivo con IA",
      "Workflows personalizables",
      "Monitoreo en tiempo real",
      "Escalabilidad horizontal",
      "API REST completa",
      "Seguridad empresarial",
    ],
  },
}

// Suggested projects
const suggestedProjects = [
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    image: "/analytics-dashboard-charts.png",
  },
  {
    slug: "social-media-app",
    title: "Social Media App",
    image: "/social-media-feed-interface.jpg",
  },
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    image: "/modern-ecommerce-dashboard.png",
  },
  {
    slug: "nexium",
    title: "Nexium",
    image: "/logo-nexium.png",
  },
  {
    slug: "zevetix",
    title: "Zevetix",
    image: "/logo-zevetix.png",
  },
]

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { t, language } = useLanguage()
  const { slug } = use(params)
  const project = projectsData[slug]

  if (!project) {
    notFound()
  }

  useEffect(() => {
    document.title = `Tomás Nadal - ${project.title}`
  }, [project.title])

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 bg-background">
        <section className="relative py-16 sm:py-20 overflow-hidden">
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("projects.backToProjects")}
            </Link>

            {/* Project Header */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-sm px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {project.date}
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4 text-balance">
                  {project.title}
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground mb-6 text-pretty leading-relaxed">
                  {language === "es" ? project.longDescription : project.longDescriptionEn}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-sm px-4 py-2 rounded-full bg-card border border-border text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("projects.viewDemo")}
                  </a>
                </Button>
              </div>

              <div className="relative h-[300px] md:h-full min-h-[400px] rounded-xl overflow-hidden border border-border">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-card border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">{t("projects.client")}</h3>
                  <p className="text-lg text-foreground">{project.client}</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">{t("projects.date")}</h3>
                  <p className="text-lg text-foreground">{project.date}</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">{t("projects.category")}</h3>
                  <p className="text-lg text-foreground">{project.category}</p>
                </CardContent>
              </Card>
            </div>

            <div className="pt-12 border-t border-border">
              <h2 className="text-3xl font-semibold text-foreground mb-8">{t("projects.relatedProjects")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {suggestedProjects
                  .filter((p) => p.slug !== project.slug)
                  .slice(0, 3)
                  .map((suggestedProject) => (
                    <Link
                      key={suggestedProject.slug}
                      href={`/projects/${suggestedProject.slug}`}
                      className="group block"
                    >
                      <Card className="bg-card border-0 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={suggestedProject.image || "/placeholder.svg"}
                            alt={suggestedProject.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                            {suggestedProject.title}
                          </h3>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
