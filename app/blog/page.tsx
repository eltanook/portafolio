import type { Metadata } from "next"
import BlogPageClient from "./blog-client"

export const metadata: Metadata = {
  title: "Blog",
  description: "Reflexiones, aprendizajes y experiencias sobre tecnología, desarrollo y emprendimiento.",
}

export default function BlogPage() {
  return <BlogPageClient />
}
