// Servicios API para Proyectos desde Strapi

import { fetchAPI, formatStrapiData, getStrapiMedia } from './strapi'

export interface StrapiProject {
  id: number
  slug: string
  title: string
  description: string
  content?: string
  image: {
    url: string
    alternativeText?: string
  }
  gallery?: Array<{
    url: string
    alternativeText?: string
  }>
  tags: string[]
  category: string
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  order: number
  technologies?: string[]
  client?: string
  year?: number
  locale: string
  publishedAt: string
}

export interface Project {
  id: number
  slug: string
  title: string
  description: string
  descriptionEn?: string
  content?: string
  contentEn?: string
  image: string
  gallery?: string[]
  tags: string[]
  category: string
  demo?: string
  github?: string
  featured?: boolean
  order?: number
  technologies?: string[]
  client?: string
  year?: number
}

/**
 * Obtener todos los proyectos
 */
export async function getProjects(locale: string = 'es'): Promise<Project[]> {
  try {
    const data = await fetchAPI('/projects', {
      params: {
        'populate': '*',
        'locale': locale,
        'sort': 'order:asc',
        'publicationState': 'live',
      },
    })

    const projects: StrapiProject[] = formatStrapiData(data)
    return projects.map(transformProject)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

/**
 * Obtener proyectos destacados
 */
export async function getFeaturedProjects(locale: string = 'es'): Promise<Project[]> {
  try {
    const data = await fetchAPI('/projects', {
      params: {
        'populate': '*',
        'locale': locale,
        'filters[featured][$eq]': true,
        'sort': 'order:asc',
        'publicationState': 'live',
      },
    })

    const projects: StrapiProject[] = formatStrapiData(data)
    return projects.map(transformProject)
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

/**
 * Obtener un proyecto por slug
 */
export async function getProjectBySlug(slug: string, locale: string = 'es'): Promise<Project | null> {
  try {
    const data = await fetchAPI('/projects', {
      params: {
        'populate': '*',
        'locale': locale,
        'filters[slug][$eq]': slug,
        'publicationState': 'live',
      },
    })

    const projects: StrapiProject[] = formatStrapiData(data)
    if (projects.length === 0) return null

    return transformProject(projects[0])
  } catch (error) {
    console.error('Error fetching project by slug:', error)
    return null
  }
}

/**
 * Obtener proyectos por categoría
 */
export async function getProjectsByCategory(category: string, locale: string = 'es'): Promise<Project[]> {
  try {
    const data = await fetchAPI('/projects', {
      params: {
        'populate': '*',
        'locale': locale,
        'filters[category][$eq]': category,
        'sort': 'order:asc',
        'publicationState': 'live',
      },
    })

    const projects: StrapiProject[] = formatStrapiData(data)
    return projects.map(transformProject)
  } catch (error) {
    console.error('Error fetching projects by category:', error)
    return []
  }
}

/**
 * Transformar proyecto de Strapi al formato del frontend
 */
function transformProject(strapiProject: StrapiProject): Project {
  return {
    id: strapiProject.id,
    slug: strapiProject.slug,
    title: strapiProject.title,
    description: strapiProject.description,
    content: strapiProject.content,
    image: getStrapiMedia(strapiProject.image?.url),
    gallery: strapiProject.gallery?.map(img => getStrapiMedia(img.url)),
    tags: Array.isArray(strapiProject.tags) ? strapiProject.tags : [],
    category: strapiProject.category,
    demo: strapiProject.demoUrl,
    github: strapiProject.githubUrl,
    featured: strapiProject.featured,
    order: strapiProject.order,
    technologies: strapiProject.technologies,
    client: strapiProject.client,
    year: strapiProject.year,
  }
}
