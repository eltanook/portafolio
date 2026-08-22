import type { Metadata } from "next"
import ProjectsPageClient from "./projects-client"

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Explora mis proyectos y trabajos más recientes. Landing pages, e-commerce, sitios corporativos y más.",
}

export default function ProjectsPage() {
  return <ProjectsPageClient />
}
