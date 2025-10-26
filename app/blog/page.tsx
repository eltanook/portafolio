"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { blogPosts } from "@/lib/blog-data"

const POSTS_PER_PAGE = 6 // 2 rows x 3 columns = 6 posts per page

export default function BlogPage() {
  const { t, language } = useLanguage()
  const [currentPage, setCurrentPage] = useState(1)

  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    document.title = language === "es" ? "Tomás Nadal - Blog" : "Tomás Nadal - Blog"
  }, [language])

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

  const postsToShow = blogPosts.slice(1) // Exclude featured post
  const totalPages = Math.max(1, Math.ceil(postsToShow.length / POSTS_PER_PAGE))
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = postsToShow.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 bg-background">
        <section className="relative py-12 sm:py-16 lg:py-24 overflow-hidden">
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 sm:mb-6 text-balance">
                {t("blog.title")}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
                {t("blog.subtitle")}
              </p>
            </div>

            <div className="mb-12 sm:mb-16">
              <Link href={`/blog/${blogPosts[0].slug}`} className="block group">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Image on left - 50% with shadow and date label */}
                  <div className="relative h-64 md:h-full min-h-[300px] rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={blogPosts[0].image || "/placeholder.svg"}
                      alt={language === "es" ? blogPosts[0].title : blogPosts[0].titleEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute top-4 left-4 bg-white dark:bg-white px-3 py-1 rounded-md shadow-sm">
                      <span className="text-[10px] font-medium text-[#0f0f0f]">
                        {new Date(blogPosts[0].date).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Content on right - 50% */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-4 group-hover:text-accent transition-colors duration-300 line-clamp-3">
                      {language === "es" ? blogPosts[0].title : blogPosts[0].titleEn}
                    </h2>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                      {language === "es" ? blogPosts[0].excerpt : blogPosts[0].excerptEn}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>
                          {blogPosts[0].readTime} {t("blog.minRead")}
                        </span>
                      </div>
                      <span>•</span>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-accent/10 text-accent font-medium">
                        {language === "es" ? blogPosts[0].category : blogPosts[0].categoryEn}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedPosts.map((post) => (
                <div key={post.id} className="group h-full flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="block h-full flex flex-col">
                    <div className="relative h-48 sm:h-56 overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300 mb-4">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={language === "es" ? post.title : post.titleEn}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-white dark:bg-white px-2.5 py-1 rounded-md shadow-sm">
                        <span className="text-[10px] font-medium text-[#0f0f0f]">
                          {new Date(post.date).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 flex-1 flex flex-col">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors duration-300">
                        {language === "es" ? post.title : post.titleEn}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                        {language === "es" ? post.excerpt : post.excerptEn}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground pt-2">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {post.readTime} {t("blog.minRead")}
                          </span>
                        </div>
                        <span>•</span>
                        <span className="px-2.5 py-1 rounded-md bg-accent/10 text-accent font-medium">
                          {language === "es" ? post.category : post.categoryEn}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

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
        </section>
      </main>
      <Footer />
    </>
  )
}
