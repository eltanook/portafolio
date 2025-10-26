"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { blogPosts } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import { useEffect } from "react"

export default function BlogArticlePage() {
  const { t, language } = useLanguage()
  const params = useParams()

  const blogPost = blogPosts.find((post) => post.slug === params.slug)

  if (!blogPost) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter((post) => post.slug !== blogPost.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)

  useEffect(() => {
    const title = language === "es" ? blogPost.title : blogPost.titleEn
    document.title = `Tomás Nadal - ${title}`
  }, [blogPost, language])

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 bg-background">
        <article className="relative py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Back button */}
            <Button asChild variant="ghost" className="mb-8 -ml-4 hover:bg-accent/10">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "es" ? "Volver al Blog" : "Back to Blog"}
              </Link>
            </Button>

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
                  {language === "es" ? blogPost.category : blogPost.categoryEn}
                </span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(blogPost.date).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>
                    {blogPost.readTime} {t("blog.minRead")}
                  </span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-4 text-balance">
                {language === "es" ? blogPost.title : blogPost.titleEn}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === "es" ? blogPost.excerpt : blogPost.excerptEn}
              </p>
            </div>

            {/* Featured Image */}
            <Card className="mb-12 overflow-hidden border-0 shadow-sm">
              <div className="relative h-96">
                <Image
                  src={blogPost.image || "/placeholder.svg"}
                  alt={language === "es" ? blogPost.title : blogPost.titleEn}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>

            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-12
                prose-headings:text-foreground prose-headings:font-semibold prose-headings:mb-4 prose-headings:mt-8
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg prose-p:mb-12
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-muted prose-pre:border prose-pre:border-border
                prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-foreground prose-blockquote:text-lg prose-blockquote:my-8
                prose-ul:text-muted-foreground prose-ul:text-lg prose-ul:space-y-2 prose-ul:my-6
                prose-li:text-muted-foreground prose-li:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: language === "es" ? blogPost.content : blogPost.contentEn }}
            />

            <div className="mt-16">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                {language === "es" ? "Artículos Relacionados" : "Related Articles"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="bg-card border-0 shadow-sm hover:shadow-md transition-all group overflow-hidden"
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={language === "es" ? post.title : post.titleEn}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="text-xs px-3 py-1 rounded-full bg-accent/90 text-accent-foreground font-medium backdrop-blur-sm">
                            {language === "es" ? post.category : post.categoryEn}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="text-xs text-white/90 backdrop-blur-sm bg-black/30 px-2 py-1 rounded">
                            {new Date(post.date).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                          {language === "es" ? post.title : post.titleEn}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {language === "es" ? post.excerpt : post.excerptEn}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {post.readTime} {t("blog.minRead")}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
