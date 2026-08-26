"use client"

import { useEffect, useState, useMemo } from "react"
import { useLanguage } from "@/components/layout/language-provider"
import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/layout/footer"
import { ExternalLink, ArrowUpRight, Search, ChevronLeft, ChevronRight, LayoutGrid, List, Eye } from "lucide-react"
import CustomSelect from "@/components/ui/custom-select"

interface Project {
  _id: string
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  image: string
  category: string
  year?: number
  demoUrl?: string
  slug: { current: string }
  tags?: string[]
  order: number
  isDataAi?: boolean
}

const categories = ["All", "landing page", "website corporativo", "landing page / e-commerce híbrido", "website / portal reservas", "ciencia de datos"]
const LIST_ITEMS_PER_PAGE = 6
const GRID_ITEMS_PER_PAGE = 8

export default function ProjectsPage() {
  const { t, language } = useLanguage()
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("recent")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const itemsPerPage = viewMode === "grid" ? GRID_ITEMS_PER_PAGE : LIST_ITEMS_PER_PAGE

  const handleViewMode = (mode: "list" | "grid") => {
    setViewMode(mode)
    setCurrentPage(1)
  }

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(order asc, year desc) {
          _id,
          title,
          titleEn,
          description,
          descriptionEn,
          "image": mainImage.asset->url,
          category,
          year,
          demoUrl,
          slug,
          tags,
          order
        }`
        const data = await client.fetch(query)
        
        // Deduplicate by slug as in V1
        const uniqueProjects = data.filter((project: Project, index: number, self: Project[]) =>
          index === self.findIndex((p) => p.slug?.current === project.slug?.current)
        )
        
        setAllProjects(uniqueProjects)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAllProjects()
  }, [])

  const filteredProjects = useMemo(() => {
    return allProjects
      .filter((project) => {
        const title = language === "en" ? (project.titleEn || project.title) : project.title
        const desc = language === "en" ? (project.descriptionEn || project.description) : project.description
        
        const matchesSearch =
          title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
          
        const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
        
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === "recent") return (a.order || 0) - (b.order || 0)
        if (sortBy === "oldest") return (b.order || 0) - (a.order || 0)
        return 0
      })
  }, [allProjects, searchQuery, selectedCategory, sortBy, language])

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

  const getPaginationItems = (): (number | "...")[] => {
    const maxPages = isMobile ? 3 : 6;
    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const pages: (number | "...")[] = []
    if (isMobile) {
      if (currentPage <= 2) {
        pages.push(1, 2, "...", totalPages)
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, "...", totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", currentPage, "...", totalPages)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }
    return pages
  }

  return (
    <main className="min-h-screen bg-background pt-40 md:pt-48">
      <div className="max-w-7xl mx-auto px-8 pb-12 md:pb-24">
        <header className="mb-16 scroll-reveal">
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] leading-tight font-medium tracking-tight mb-6">
            {t("projects.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-4 font-medium tracking-tight leading-relaxed">
            {t("projects.subtitle")}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-72 shrink-0 scroll-reveal relative z-30">
            <div className="sticky top-32 space-y-10">
              <div>
                <h3 className="text-xs font-bold  tracking-widest text-foreground/40 mb-4">{t("projects.search")}</h3>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-accent transition-colors" />
                  <input
                    type="text"
                    placeholder={t("projects.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm focus:outline-none focus:border-accent transition-all"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold tracking-widest text-foreground/40 mb-4">{t("projects.categories")}</h3>
                <div className="mb-6">
                  <CustomSelect
                    options={categories.map((cat) => ({ value: cat, label: cat }))}
                    value={selectedCategory}
                    onChange={(val) => {
                      setSelectedCategory(val)
                      setCurrentPage(1)
                    }}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold  tracking-widest text-foreground/40 mb-4">{t("projects.sortBy")}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy("recent")}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                      sortBy === "recent" ? "bg-foreground text-background" : "bg-muted/30 text-foreground/60"
                    }`}
                  >
                    {t("projects.recent")}
                  </button>
                  <button
                    onClick={() => setSortBy("oldest")}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                      sortBy === "oldest" ? "bg-foreground text-background" : "bg-muted/30 text-foreground/60"
                    }`}
                  >
                    {t("projects.oldest")}
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {/* View toggle + counter */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-foreground/40 font-medium">
                {loading ? "—" : `${filteredProjects.length} ${language === "es" ? "proyectos" : "projects"}`}
              </p>
              <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-xl border border-border/30 max-md:hidden">
                <button
                  id="view-list"
                  onClick={() => handleViewMode("list")}
                  title={language === "es" ? "Vista lista" : "List view"}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "list" ? "bg-foreground text-background shadow" : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  <List size={14} />
                  <span className="hidden sm:inline">{language === "es" ? "Lista" : "List"}</span>
                </button>
                <button
                  id="view-grid"
                  onClick={() => handleViewMode("grid")}
                  title={language === "es" ? "Vista grilla" : "Grid view"}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "grid" ? "bg-foreground text-background shadow" : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  <LayoutGrid size={14} />
                  <span className="hidden sm:inline">{language === "es" ? "Grilla" : "Grid"}</span>
                </button>
              </div>
            </div>

            <div key={viewMode} className={viewMode === "grid" ? "grid sm:grid-cols-2 gap-6" : "flex flex-col gap-8"}>
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-[3rem]"></div>
              ))
            ) : (
              paginatedProjects.map((project, idx) => (
                <div 
                  key={project._id} 
                  className={`group scroll-reveal ${viewMode === "grid" ? "block" : "flex flex-col md:flex-row gap-8 items-center"}`}
                  style={{ transitionDelay: `${(idx % 2) * 100}ms` }}
                >
                  <div className={`relative ${viewMode === "grid" ? "h-72 w-full mb-4" : "h-56 sm:h-[240px] w-full md:w-1/2 shrink-0"} overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-1000 bg-muted/20`}>
                    <Link href={`/projects/${project.slug.current}`} className="block w-full h-full">
                      {project.image ? (
                        <Image 
                          src={project.image} 
                          alt={language === "en" ? (project.titleEn || project.title) : project.title} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                      )}
                    </Link>
                    
                    {/* Hover overlay with action buttons */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto max-md:hidden">
                      <Link 
                        href={`/projects/${project.slug.current}`}
                        className="w-14 h-14 bg-white hover:bg-accent hover:text-white rounded-full flex items-center justify-center text-black transition-all duration-300 shadow-2xl scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                        title={language === "es" ? "Ver detalles" : "View details"}
                      >
                        <Eye size={22} />
                      </Link>
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 bg-white hover:bg-accent hover:text-white rounded-full flex items-center justify-center text-black transition-all duration-300 shadow-2xl scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 delay-[50ms]"
                          title={language === "es" ? "Visitar sitio" : "Visit website"}
                        >
                          <ExternalLink size={22} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className={`space-y-3 ${viewMode === "grid" ? "" : "w-full md:w-1/2 py-4"}`}>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="text-accent">{project.category}</span>
                      <span>{project.year || "2025"}</span>
                    </div>
                    <Link href={`/projects/${project.slug.current}`} className="block group/title">
                      <h3 className={`font-semibold text-foreground group-hover/title:text-accent transition-colors line-clamp-2 pb-1 leading-snug ${viewMode === "grid" ? "text-xl" : "text-2xl md:text-3xl"}`}>
                        {language === "en" ? (project.titleEn || project.title) : project.title}
                      </h3>
                    </Link>
                    <p className={`text-muted-foreground line-clamp-3 leading-relaxed ${viewMode === "grid" ? "text-sm" : "text-base mt-4"}`}>
                      {language === "en" ? (project.descriptionEn || project.description) : project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags && project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px]  tracking-widest text-muted-foreground border border-border/50 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}

            {!loading && filteredProjects.length === 0 && (
              <div className="text-center py-20 bg-muted/10 rounded-[2.5rem] border border-dashed border-border/50">
                <p className="text-foreground/40 font-medium">{t("projects.noProjectsFound")}</p>
              </div>
            )}
            </div>{/* end inner grid/list div */}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2 flex-wrap scroll-reveal">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                {getPaginationItems().map((page, i) =>
                  page === "..." ? (
                    <span key={`ellipsis-${i}`} className="w-12 h-12 flex items-center justify-center text-foreground/40 font-bold select-none">
                      …
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={`w-12 h-12 rounded-full text-sm font-bold transition-all ${
                        currentPage === page ? "bg-accent text-white" : "border border-border/50 hover:bg-muted"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>{/* end flex-1 */}
        </div>

      </div>
      <Footer />
    </main>
  )
}
