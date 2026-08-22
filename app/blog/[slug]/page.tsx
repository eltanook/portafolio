import type { Metadata } from "next"
import BlogArticlePageClient from "./blog-slug-client"
import { client } from "@/sanity/lib/client"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  
  const post = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ title, excerpt, "image": mainImage.asset->url }`, { slug: decodedSlug })
  
  if (!post) {
    return {
      title: "Artículo no encontrado",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    }
  }
}

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogArticlePageClient params={params} />
}
