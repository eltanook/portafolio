"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/layout/language-provider"
import { client } from "@/sanity/lib/client"
import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"

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

export default function LatestArticles() {
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
        }[0...2]`
        const data = await client.fetch(query)
        setPosts(data)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading || posts.length === 0) return null

  return (
    <section className="w-full bg-secondary/30 dark:bg-muted/10 px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
            {language === "es" ? "Últimos Artículos" : "Latest Articles"}
          </h2>
          <Link href="/blog" className="text-sm font-bold  tracking-widest text-accent hover:underline underline-offset-4 hidden md:block">
            {language === "es" ? "Ver todos" : "View all"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <Link 
              key={post._id} 
              href={`/blog/${post.slug.current}`}
              className="group flex flex-col h-full scroll-reveal"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-1000 mb-6 bg-muted/20">
                {post.image ? (
                  <Image 
                    src={post.image} 
                    alt={language === "en" ? (post.titleEn || post.title) : post.title} 
                    fill 
                    quality={100}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">{t("general.noImage")}</div>
                )}
              </div>

              <div className="space-y-4 flex flex-col flex-grow">
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
                <h3 className="text-3xl font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 pb-1 leading-snug">
                  {language === "en" ? (post.titleEn || post.title) : post.title}
                </h3>
                <p className="text-lg text-muted-foreground line-clamp-3 leading-relaxed">
                  {language === "en" ? (post.excerptEn || post.excerpt) : post.excerpt}
                </p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-auto pt-2">
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
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/blog" className="inline-block px-8 py-4 bg-foreground text-background font-bold text-sm rounded-full hover:bg-accent hover:text-white transition-all shadow-xl">
            {language === "es" ? "Ver todos los artículos" : "View all articles"}
          </Link>
        </div>
      </div>
    </section>
  )
}
