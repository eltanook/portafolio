"use client"

import { use, useEffect, useState } from "react"
import Footer from "@/components/layout/footer"
import { useLanguage } from "@/components/layout/language-provider"
import { ArrowLeft, Calendar, Clock, ArrowRight, Link2, Check, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { FaWhatsapp, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa"

const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  titleEn,
  slug,
  excerpt,
  excerptEn,
  "image": mainImage.asset->url,
  content,
  contentEn,
  category,
  categoryEn,
  date,
  readTime,
  author
}`

const allBlogPostsQuery = `*[_type == "blogPost"] | order(date desc) {
  _id,
  title,
  titleEn,
  slug,
  excerpt,
  excerptEn,
  "image": mainImage.asset->url,
  category,
  categoryEn,
  date,
  readTime
}`

interface SanityBlogPost {
  _id: string
  title: string
  titleEn: string
  slug: { current: string }
  excerpt: string
  excerptEn: string
  image: string
  content: string
  contentEn: string
  category: string
  categoryEn: string
  date: string
  readTime: number
  author: string
}

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { t, language } = useLanguage()
  const { slug } = use(params)
  const [blogPost, setBlogPost] = useState<SanityBlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<SanityBlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const decodedSlug = decodeURIComponent(slug)
        const post = await client.fetch(blogPostBySlugQuery, { slug: decodedSlug })
        if (!post) {
          setLoading(false)
          return
        }
        setBlogPost(post)

        const allData: SanityBlogPost[] = await client.fetch(allBlogPostsQuery)
        const allPosts = Array.from(new Map(allData.map(p => [p.slug.current, p])).values()) as SanityBlogPost[]
        
        const related = allPosts
          .filter((p) => p.slug.current !== slug)
          .sort(() => Math.random() - 0.5)
          .slice(0, 2)
        setRelatedPosts(related)
      } catch (error) {
        console.error("Error fetching blog post:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])

  useEffect(() => {
    if (blogPost) {
      const title = language === "es" ? (blogPost.title || blogPost.titleEn) : (blogPost.titleEn || blogPost.title)
      document.title = `Tomás Nadal - ${title}`
    }
  }, [blogPost, language])

  if (loading) {
    return (
      <main className="min-h-screen pt-32 bg-background">
        <div className="max-w-7xl mx-auto px-8 py-24 text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
          <p className="text-muted-foreground">{language === "es" ? "Cargando artículo..." : "Loading article..."}</p>
        </div>
      </main>
    )
  }

  if (!blogPost) {
    notFound()
  }

  return (
    <main className="min-h-screen pt-40 md:pt-48 bg-background">
      <article className="max-w-5xl mx-auto px-8 pb-24">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold tracking-widest  text-muted-foreground hover:text-accent transition-colors mb-12 scroll-reveal"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === "es" ? "Volver al Blog" : "Back to Blog"}
        </Link>

        {/* Article Header */}
        <div className="mb-12 scroll-reveal">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="text-[10px] font-bold  tracking-widest text-accent px-4 py-2 bg-accent/10 rounded-full">
              {language === "es" ? (blogPost.category || blogPost.categoryEn) : (blogPost.categoryEn || blogPost.category)}
            </span>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-muted/20 px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(blogPost.date).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-muted/20 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span>
                {blogPost.readTime} min
              </span>
            </div>
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.1] tracking-tight text-foreground mb-8">
            {language === "es" ? (blogPost.title || blogPost.titleEn) : (blogPost.titleEn || blogPost.title)}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mt-4 font-medium tracking-tight">
            {language === "es" ? (blogPost.excerpt || blogPost.excerptEn) : (blogPost.excerptEn || blogPost.excerpt)}
          </p>
        </div>

        <div className="relative h-[320px] md:h-[400px] rounded-[3rem] overflow-hidden mb-16 bg-muted/20 scroll-reveal">
          {blogPost.image ? (
            <Image
              src={blogPost.image}
              alt={language === "es" ? (blogPost.title || blogPost.titleEn) : (blogPost.titleEn || blogPost.title)}
              fill
              priority
              quality={95}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">No Image</div>
          )}
        </div>

        <div className="mb-12 scroll-reveal text-foreground">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-12 mb-6">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mt-12 mb-6">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-foreground mt-10 mb-4">{children}</h3>,
              h4: ({ children }) => <h4 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-foreground mt-8 mb-3">{children}</h4>,
              p: ({ children }) => <p className="text-foreground/90 leading-relaxed text-lg mb-6">{children}</p>,
              a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">{children}</a>,
              strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-accent pl-6 italic text-foreground text-lg my-8 bg-muted/10 py-4 pr-4 rounded-r-lg">
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => <ul className="list-disc pl-6 text-foreground/90 text-lg space-y-2 my-6">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 text-foreground/90 text-lg space-y-2 my-6">{children}</ol>,
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              code: ({ children }) => <code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
              pre: ({ children }) => <pre className="bg-muted border border-border/50 p-4 rounded-xl overflow-x-auto my-6 font-mono text-sm">{children}</pre>,
              hr: () => <hr className="border-border/30 my-10" />
            }}
          >
            {language === "es" ? (blogPost.content || blogPost.contentEn) : (blogPost.contentEn || blogPost.content)}
          </ReactMarkdown>
        </div>

        {/* Share and Download Panel */}
        <div className="py-8 my-8 border-t border-b border-border/10 flex flex-wrap items-center justify-between gap-4 scroll-reveal share-panel">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              {language === "es" ? "Compartir:" : "Share:"}
            </span>
            <div className="flex items-center gap-2">
              {/* LinkedIn */}
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/30 hover:bg-accent hover:text-white flex items-center justify-center transition-colors text-foreground"
                title={language === "es" ? "Compartir en LinkedIn" : "Share on LinkedIn"}
              >
                <FaLinkedin size={16} />
              </a>
              {/* Twitter / X */}
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(blogPost.title || "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/30 hover:bg-accent hover:text-white flex items-center justify-center transition-colors text-foreground"
                title={language === "es" ? "Compartir en X" : "Share on X"}
              >
                <FaTwitter size={16} />
              </a>
              {/* WhatsApp */}
              <a 
                href={`https://wa.me/?text=${encodeURIComponent((blogPost.title || "") + " - " + (typeof window !== "undefined" ? window.location.href : ""))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/30 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors text-foreground"
                title={language === "es" ? "Compartir por WhatsApp" : "Share on WhatsApp"}
              >
                <FaWhatsapp size={16} />
              </a>
              {/* Email */}
              <a 
                href={`mailto:?subject=${encodeURIComponent(blogPost.title || "")}&body=${encodeURIComponent("Mira este artículo: " + (typeof window !== "undefined" ? window.location.href : ""))}`}
                className="w-10 h-10 rounded-full bg-muted/30 hover:bg-accent hover:text-white flex items-center justify-center transition-colors text-foreground"
                title={language === "es" ? "Enviar por Email" : "Share via Email"}
              >
                <FaEnvelope size={16} />
              </a>
              {/* Copy Link */}
              <button 
                onClick={handleCopyLink}
                className="w-10 h-10 rounded-full bg-muted/30 hover:bg-accent hover:text-white flex items-center justify-center transition-colors text-foreground cursor-pointer"
                title={language === "es" ? "Copiar enlace" : "Copy link"}
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Link2 size={16} />}
              </button>
            </div>
          </div>
          
          {/* PDF Download Button */}
          <button 
            onClick={handlePrint}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest bg-muted/30 hover:bg-accent hover:text-white text-foreground px-6 py-3 rounded-full border border-border/10 transition-colors cursor-pointer"
            title={language === "es" ? "Descargar como PDF" : "Download as PDF"}
          >
            <Download size={14} />
            {language === "es" ? "DESCARGAR PDF" : "DOWNLOAD PDF"}
          </button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-20 scroll-reveal related-posts">
            <h2 className="text-3xl font-medium tracking-tight mb-12">
              {language === "es" ? "Artículos Relacionados" : "Related Articles"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((post, idx) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col h-full scroll-reveal"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="relative h-44 overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-1000 mb-4 shrink-0 bg-muted/20">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={language === "es" ? (post.title || post.titleEn) : (post.titleEn || post.title)}
                        fill
                        quality={85}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">No Image</div>
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
                      <span className="text-accent">{language === "es" ? (post.category || post.categoryEn) : (post.categoryEn || post.category)}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 pb-1 leading-snug">
                      {language === "es" ? (post.title || post.titleEn) : (post.titleEn || post.title)}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                      {language === "es" ? (post.excerpt || post.excerptEn) : (post.excerptEn || post.excerpt)}
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
          </div>
        )}
      </article>
      <Footer />
    </main>
  )
}
