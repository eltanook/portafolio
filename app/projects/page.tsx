"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { ExternalLink, Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

// Placeholder data - will be replaced with Strapi data
const projects = [
  {
    id: 1,
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Plataforma de comercio electrónico completa con pasarela de pagos y gestión de inventario",
    descriptionEn: "Complete e-commerce platform with payment gateway and inventory management",
    image: "/modern-ecommerce-dashboard.png",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    category: "Web App",
    demo: "https://demo.com",
  },
  {
    id: 2,
    slug: "task-management-app",
    title: "Task Management App",
    description: "Aplicación de gestión de tareas con colaboración en tiempo real",
    descriptionEn: "Task management application with real-time collaboration",
    image: "/task-management-interface.png",
    tags: ["React", "Firebase", "Tailwind"],
    category: "Web App",
    demo: "https://demo.com",
  },
  {
    id: 3,
    slug: "portfolio-cms",
    title: "Portfolio CMS",
    description: "Sistema de gestión de contenidos para portfolios creativos",
    descriptionEn: "Content management system for creative portfolios",
    image: "/portfolio-cms-dashboard.jpg",
    tags: ["Next.js", "Strapi", "GraphQL"],
    category: "CMS",
    demo: "https://demo.com",
  },
  {
    id: 4,
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    description: "Dashboard de análisis con visualización de datos en tiempo real",
    descriptionEn: "Analytics dashboard with real-time data visualization",
    image: "/analytics-dashboard-charts.png",
    tags: ["React", "D3.js", "Node.js"],
    category: "Dashboard",
    demo: "https://demo.com",
  },
  {
    id: 5,
    slug: "social-media-app",
    title: "Social Media App",
    description: "Red social con mensajería instantánea y compartición de contenido",
    descriptionEn: "Social network with instant messaging and content sharing",
    image: "/social-media-feed-interface.jpg",
    tags: ["Next.js", "Socket.io", "MongoDB"],
    category: "Web App",
    demo: "https://demo.com",
  },
  {
    id: 6,
    slug: "booking-system",
    title: "Booking System",
    description: "Sistema de reservas para servicios profesionales con calendario integrado",
    descriptionEn: "Booking system for professional services with integrated calendar",
    image: "/booking-calendar-interface.png",
    tags: ["React", "Express", "PostgreSQL"],
    category: "Web App",
    demo: "https://demo.com",
  },
]

const categories = ["All", "Web App", "CMS", "Dashboard"]
const ITEMS_PER_PAGE = 6 // 3 rows x 2 columns = 6 items per page

export default function ProjectsPage() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("recent")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  useEffect(() => {
    document.title = language === "es" ? "Tomás Nadal - Proyectos" : "Tomás Nadal - Projects"
  }, [language])

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale",
    )
    elements.forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view")
            }
          })
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      )
      observer.observe(el)
      return () => observer.disconnect()
    })
  }, [])

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "recent") return b.id - a.id
      if (sortBy === "oldest") return a.id - b.id
      return 0
    })

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 bg-background">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 overflow-hidden">
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-4 text-balance">
                {t("projects.title")}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
                {t("projects.subtitle")}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="lg:w-64 shrink-0">
                <div className="space-y-6 bg-card border border-border rounded-lg p-6 lg:sticky lg:top-24">
                  {/* Search */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">{t("projects.search")}</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={t("projects.searchPlaceholder")}
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value)
                          setCurrentPage(1)
                        }}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">{t("projects.categories")}</h3>
                    <div className="relative">
                      <button
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        className="w-full flex items-center justify-between px-4 py-2 bg-background border border-border rounded-md text-sm text-foreground hover:border-accent transition-colors"
                      >
                        <span>{selectedCategory}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isCategoryOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg overflow-hidden">
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => {
                                setSelectedCategory(category)
                                setCurrentPage(1)
                                setIsCategoryOpen(false)
                              }}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                selectedCategory === category
                                  ? "bg-accent text-accent-foreground font-medium"
                                  : "text-foreground hover:bg-accent/10"
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3">{t("projects.sortBy")}</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSortBy("recent")}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          sortBy === "recent"
                            ? "bg-foreground text-background font-medium"
                            : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                        }`}
                      >
                        {t("projects.recent")}
                      </button>
                      <button
                        onClick={() => setSortBy("oldest")}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          sortBy === "oldest"
                            ? "bg-foreground text-background font-medium"
                            : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                        }`}
                      >
                        {t("projects.oldest")}
                      </button>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="bg-card border-0 shadow-sm hover:shadow-lg transition-all duration-700 group overflow-hidden flex flex-col"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center gap-3">
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-600"
                          >
                            <Link href={`/projects/${project.slug}`}>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t("projects.viewDetails")}
                            </Link>
                          </Button>
                          <Button
                            asChild
                            size="sm"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-600"
                          >
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t("projects.visitSite")}
                            </a>
                          </Button>
                        </div>
                      </div>

                      <CardContent className="p-6 space-y-3 flex-1 flex flex-col">
                        <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                          {language === "es" ? project.description : project.descriptionEn}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredProjects.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">{t("projects.noProjectsFound")}</p>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1 || totalPages === 1}
                    className={`bg-transparent shadow-sm ${totalPages === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      disabled={totalPages === 1}
                      className={
                        currentPage === page
                          ? `bg-foreground text-background ${totalPages === 1 ? "opacity-50" : ""}`
                          : `bg-transparent hover:bg-accent/10 shadow-sm ${totalPages === 1 ? "opacity-50 cursor-not-allowed" : ""}`
                      }
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages || totalPages === 1}
                    className={`bg-transparent shadow-sm ${totalPages === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
