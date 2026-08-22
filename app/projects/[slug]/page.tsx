import type { Metadata } from "next"
import ProjectDetailPageClient from "./projects-slug-client"
import { client } from "@/sanity/lib/client"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  
  const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0]{ title, description, "image": mainImage.asset->url }`, { slug: decodedSlug })
  
  if (!project) {
    return {
      title: "Proyecto no encontrado",
    }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [{ url: project.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : [],
    }
  }
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <ProjectDetailPageClient params={params} />
}
