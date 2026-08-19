"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import { Clock, ArrowRight, ArrowUpRight } from "lucide-react"
import CustomSelect from "@/components/custom-select"

interface BlogPost {
  _id: string
  title: string
  titleEn?: string
  excerpt: string
  excerptEn?: string
  image: string
  category: string
  categoryEn?: string
  date: string
  readTime: number
  slug: { current: string }
  author?: string
}

export default function BlogPage() {
  const { t, language } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "blogPost"] | order(date desc) {
          _id,
          title,
          titleEn,
          excerpt,
          excerptEn,
          "image": mainImage.asset->url,
          category,
          categoryEn,
          date,
          readTime,
          slug,
          author
        }`
        const data = await client.fetch(query)
        
        // Deduplicate by slug
        const uniquePosts = data.filter((post: BlogPost, index: number, self: BlogPost[]) =>
          index === self.findIndex((p) => p.slug?.current === post.slug?.current)
        )
        
        setPosts(uniquePosts)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Treat the first post as the featured post (always static, unaffected by filter)
  const featuredPosts = posts.slice(0, 1)
  
  // Extract unique categories from all posts for the dropdown
  const categories = ["all", ...Array.from(new Set(posts.map(p => language === "en" ? (p.categoryEn || p.category) : p.category).filter(Boolean)))]

  // Filter regular posts (excluding the featured one) based on selected category
  const regularPosts = posts.slice(1).filter(p => {
    if (selectedCategory === "all") return true
    const postCat = language === "en" ? (p.categoryEn || p.category) : p.category
    return postCat === selectedCategory
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const postsPerPage = 6
  const totalPages = Math.ceil(regularPosts.length / postsPerPage)
  const paginatedPosts = regularPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

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
    <main className="min-h-screen bg-background pt-32">
      <div className="max-w-7xl mx-auto px-8 pb-12 md:pb-24">
        <header className="mb-20 scroll-reveal">
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] leading-tight font-medium tracking-tight mb-6">
            {t("blog.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-4 font-medium tracking-tight leading-relaxed">
            {language === "es"
              ? "Reflexiones, aprendizajes y experiencias sobre tecnología, desarrollo y emprendimiento"
              : "Reflections, learnings and experiences about technology, development and entrepreneurship"}
          </p>
        </header>

        {/* Featured Section */}
        {featuredPosts.length > 0 && (
          <div className="mb-12 md:mb-24">
            <h2 className="text-xs font-bold  tracking-[0.2em] text-accent mb-10 scroll-reveal">
              {language === "es" ? "Artículo destacado" : "Featured article"}
            </h2>
            <div className="flex flex-col">
              {loading ? (
                <div className="h-[500px] bg-muted animate-pulse rounded-[3.5rem]"></div>
              ) : (
                featuredPosts.map((post) => (
                  <Link 
                    key={post._id} 
                    href={`/blog/${post.slug.current}`}
                    className="group flex flex-col lg:flex-row gap-8 lg:gap-12 items-center scroll-reveal"
                  >
                    <div className="relative w-full lg:w-1/2 h-[225px] lg:h-[255px] overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-1000 bg-muted/20 shrink-0">
                      {post.image ? (
                        <Image 
                          src={post.image} 
                          alt={language === "en" ? (post.titleEn || post.title) : post.title} 
                          fill 
                          priority
                          quality={95}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">No Image</div>
                      )}
                    </div>

                    <div className="space-y-4 w-full lg:w-1/2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {new Date(post.date).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-accent font-medium">{language === "en" ? (post.categoryEn || post.category) : post.category}</span>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-3 pb-1 leading-snug">
                        {language === "en" ? (post.titleEn || post.title) : post.title}
                      </h3>
                      <p className="text-lg text-muted-foreground line-clamp-3 leading-relaxed mt-4">
                        {language === "en" ? (post.excerptEn || post.excerpt) : post.excerpt}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground pt-4">
                        <Clock className="w-4 h-4" />
                        <span>
                          {post.readTime} min
                        </span>
                        {post.author && (
                          <>
                            <span className="mx-2">·</span>
                            <span>{post.author}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}

        {/* Regular Section */}
        {regularPosts.length > 0 && (
          <div className="mb-12 md:mb-24 pt-12 border-t border-border/10">
            <div className="relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4 scroll-reveal">
              <h2 className="text-xs font-bold tracking-[0.2em] text-foreground/40">
                {language === "es" ? "Todos los artículos" : "All articles"}
              </h2>
              
              <div className="min-w-[200px] w-full sm:w-auto">
                <CustomSelect
                  options={categories.map((cat) => ({
                    value: cat,
                    label: cat === "all" ? (language === "es" ? "Todas las categorías" : "All categories") : cat,
                  }))}
                  value={selectedCategory}
                  onChange={(val) => setSelectedCategory(val)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post, idx) => (
                  <Link 
                    key={post._id} 
                    href={`/blog/${post.slug.current}`}
                    className="group flex flex-col h-full scroll-reveal"
                    style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
                  >
                    <div className="relative h-56 overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-1000 mb-4 shrink-0">
                      {post.image ? (
                        <Image 
                          src={post.image} 
                          alt={language === "en" ? (post.titleEn || post.title) : post.title} 
                          fill 
                          quality={85}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">No Image</div>
                      )}
                    </div>

                    <div className="flex flex-col flex-1 space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {new Date(post.date).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-accent">{language === "en" ? (post.categoryEn || post.category) : post.category}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 pb-1 leading-snug">
                        {language === "en" ? (post.titleEn || post.title) : post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                        {language === "en" ? (post.excerptEn || post.excerpt) : post.excerpt}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-auto pt-2">
                        <Clock className="w-3 h-3" />
                        <span>
                          {post.readTime} min
                        </span>
                        {post.author && (
                          <>
                            <span className="mx-2">·</span>
                            <span>{post.author}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16 scroll-reveal flex-wrap">
                {getPaginationItems().map((page, i) =>
                  page === "..." ? (
                    <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-foreground/40 font-bold select-none">
                      …
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page as number)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        currentPage === page 
                          ? "bg-accent text-accent-foreground" 
                          : "bg-muted hover:bg-accent/20 text-foreground"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        )}

            {!loading && posts.length === 0 && (
              <div className="text-center py-24 bg-muted/10 rounded-[3rem] border border-dashed border-border/50">
                <p className="text-foreground/40 font-medium">No articles found.</p>
              </div>
            )}
      </div>
      <Footer />
    </main>
  )
}
