"use client"

import { use, useEffect, useState } from "react"

import Footer from "@/components/layout/footer"
import { useLanguage } from "@/components/layout/language-provider"
import { ArrowLeft, Calendar, Clock, ArrowRight, ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"

// Use same query logic but inside the component
const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  titleEn,
  description,
  descriptionEn,
  content,
  contentEn,
  "image": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  category,
  year,
  demoUrl,
  githubUrl,
  slug,
  tags,
  technologies
}`

const allProjectsQuery = `*[_type == "project"] | order(order asc, year desc) {
  _id,
  title,
  description,
  "image": mainImage.asset->url,
  category,
  slug
}`

interface SanityProject {
  _id: string
  slug: { current: string }
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  content?: string
  contentEn?: string
  image: string
  gallery?: string[]
  tags: string[]
  category: string
  demoUrl?: string
  githubUrl?: string
  year?: number
  technologies?: string
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { t, language } = useLanguage()
  const { slug } = use(params)
  const [project, setProject] = useState<SanityProject | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<SanityProject[]>([])
  const [loading, setLoading] = useState(true)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const decodedSlug = decodeURIComponent(slug)
        const proj = await client.fetch(projectBySlugQuery, { slug: decodedSlug })
        if (!proj) {
          setLoading(false)
          return
        }
        setProject(proj)

        const allData: SanityProject[] = await client.fetch(allProjectsQuery)
        const allProjects = Array.from(new Map(allData.map(p => [p.slug.current, p])).values()) as SanityProject[]
        
        const sameCategory = allProjects
          .filter((p) => p.slug.current !== slug && p.category === proj.category)
          .slice(0, 3)

        if (sameCategory.length < 3) {
          const remaining = allProjects
            .filter((p) => p.slug.current !== slug && !sameCategory.includes(p))
            .slice(0, 3 - sameCategory.length)
          sameCategory.push(...remaining)
        }
        setRelatedProjects(sameCategory)
      } catch (error) {
        console.error("Error fetching project:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])

  useEffect(() => {
    if (project) {
      document.title = `Tomás Nadal - ${project.title}`
    }
  }, [project])

  const openGallery = (index: number) => {
    setCurrentImageIndex(index)
    setIsGalleryOpen(true)
  }

  const nextImage = () => {
    if (project?.gallery) {
      setCurrentImageIndex((prev) => (prev + 1) % project.gallery!.length)
    }
  }

  const prevImage = () => {
    if (project?.gallery) {
      setCurrentImageIndex((prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen pt-32 bg-background">
        <div className="max-w-7xl mx-auto px-8 py-24 text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
          <p className="text-muted-foreground">{language === "es" ? "Cargando proyecto..." : "Loading project..."}</p>
        </div>
      </main>
    )
  }

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-40 md:pt-48 bg-background">
      <div className="max-w-5xl mx-auto px-8 pb-24">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-bold tracking-widest  text-muted-foreground hover:text-accent transition-colors mb-12 scroll-reveal"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === "es" ? "Volver a Proyectos" : "Back to Projects"}
        </Link>

        {/* Project Header */}
        <div className="mb-16 scroll-reveal">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-[10px] font-bold  tracking-widest text-accent px-4 py-2 bg-accent/10 rounded-full">
              {project.category}
            </span>
            {project.year && (
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-muted/20 px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" />
                {project.year}
              </div>
            )}
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.1] tracking-tight text-foreground mb-8">
            {language === "en" ? (project.titleEn || project.title) : project.title}
          </h1>

          <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-3xl mb-10">
            {language === "es" ? project.content || project.description : project.contentEn || project.descriptionEn || project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags && project.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-[11px] font-bold  tracking-wider px-4 py-2 rounded-full bg-muted/30 text-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-4">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-bold text-sm rounded-full hover:bg-accent hover:text-white transition-all shadow-xl hover:-translate-y-1">
                <ExternalLink size={18} />
                {language === "es" ? "Ver Demo" : "View Demo"}
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-muted/20 text-foreground border border-border/50 font-bold text-sm rounded-full hover:bg-muted/50 transition-all hover:-translate-y-1">
                <ExternalLink size={18} />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Project Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-24 scroll-reveal" style={{ transitionDelay: "200ms" }}>
            <h2 className="text-3xl font-medium tracking-tight mb-10">{language === "es" ? "Galería" : "Gallery"}</h2>
            <div className="flex overflow-x-auto gap-6 md:gap-8 pb-8 snap-x snap-mandatory scrollbar-hide">
              {project.gallery.map((img, index) => (
                <div
                  key={index}
                  className="rounded-[2.5rem] overflow-hidden bg-muted/20 cursor-pointer group relative aspect-[4/3] flex-shrink-0 w-[85vw] md:w-[600px] snap-center"
                  onClick={() => openGallery(index)}
                >
                  <Image
                    src={img}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                      <ZoomIn size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Modal - Fallback if shadcn Dialog is missing or styling needs adjusting */}
        {isGalleryOpen && project.gallery && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md">
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-28 md:top-12 right-8 z-[110] p-4 rounded-full bg-muted/50 hover:bg-accent hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full flex items-center justify-center p-8 md:p-24">
              <button
                onClick={prevImage}
                className="absolute left-8 z-[110] p-4 rounded-full bg-muted/50 hover:bg-accent hover:text-white transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
              
              <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
                <Image
                  src={project.gallery[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              <button
                onClick={nextImage}
                className="absolute right-8 z-[110] p-4 rounded-full bg-muted/50 hover:bg-accent hover:text-white transition-colors"
              >
                <ChevronRight size={32} />
              </button>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[11px] font-bold tracking-widest px-6 py-2 bg-muted/50 rounded-full">
                {currentImageIndex + 1} / {project.gallery.length}
              </div>
            </div>
          </div>
        )}

        {/* Project Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 scroll-reveal">
          <div className="rounded-[2.5rem] bg-muted/10 border border-border/5 p-8 hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-[10px] font-bold  tracking-widest text-muted-foreground mb-4">{language === "es" ? "Categoría" : "Category"}</h3>
            <p className="text-xl font-medium">{project.category}</p>
          </div>

          {project.year && (
            <div className="rounded-[2.5rem] bg-muted/10 border border-border/5 p-8 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-[10px] font-bold  tracking-widest text-muted-foreground mb-4">{language === "es" ? "Año" : "Year"}</h3>
              <p className="text-xl font-medium">{project.year}</p>
            </div>
          )}

          {project.technologies && (
            <div className="rounded-[2.5rem] bg-muted/10 border border-border/5 p-8 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-[10px] font-bold  tracking-widest text-muted-foreground mb-4">{language === "es" ? "Tecnologías" : "Technologies"}</h3>
              <p className="text-xl font-medium">{project.technologies}</p>
            </div>
          )}
        </div>

        {/* Related Projects */}
        <div className="pt-20 scroll-reveal">
          <h2 className="text-4xl font-medium tracking-tight mb-12">
            {language === "es" ? "Proyectos Relacionados" : "Related Projects"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((relatedProject) => (
              <Link
                key={relatedProject._id}
                href={`/projects/${relatedProject.slug.current}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-muted/20 mb-6">
                  {relatedProject.image ? (
                    <Image
                      src={relatedProject.image}
                      alt={relatedProject.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-xs">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ArrowUpRight size={32} className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" />
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-xl font-bold group-hover:text-accent transition-colors mb-2">
                    {relatedProject.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedProject.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
