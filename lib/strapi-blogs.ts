// Servicios API para Blogs desde Strapi

import { fetchAPI, formatStrapiData, getStrapiMedia } from './strapi'

export interface StrapiBlog {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  image: {
    url: string
    alternativeText?: string
  }
  category: string
  date: string
  readTime: number
  author: string
  featured: boolean
  tags?: string[]
  locale: string
  publishedAt: string
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  titleEn?: string
  excerpt: string
  excerptEn?: string
  content: string
  contentEn?: string
  image: string
  category: string
  categoryEn?: string
  date: string
  readTime: number
  author: string
  featured?: boolean
  tags?: string[]
}

/**
 * Obtener todos los blogs
 */
export async function getBlogs(locale: string = 'es'): Promise<BlogPost[]> {
  try {
    const data = await fetchAPI('/blogs', {
      params: {
        'populate': '*',
        'locale': locale,
        'sort': 'date:desc',
        'publicationState': 'live',
      },
    })

    const blogs: StrapiBlog[] = formatStrapiData(data)
    return blogs.map(transformBlog)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

/**
 * Obtener blogs destacados
 */
export async function getFeaturedBlogs(locale: string = 'es', limit: number = 3): Promise<BlogPost[]> {
  try {
    const data = await fetchAPI('/blogs', {
      params: {
        'populate': '*',
        'locale': locale,
        'filters[featured][$eq]': true,
        'sort': 'date:desc',
        'pagination[limit]': limit,
        'publicationState': 'live',
      },
    })

    const blogs: StrapiBlog[] = formatStrapiData(data)
    return blogs.map(transformBlog)
  } catch (error) {
    console.error('Error fetching featured blogs:', error)
    return []
  }
}

/**
 * Obtener un blog por slug
 */
export async function getBlogBySlug(slug: string, locale: string = 'es'): Promise<BlogPost | null> {
  try {
    const data = await fetchAPI('/blogs', {
      params: {
        'populate': '*',
        'locale': locale,
        'filters[slug][$eq]': slug,
        'publicationState': 'live',
      },
    })

    const blogs: StrapiBlog[] = formatStrapiData(data)
    if (blogs.length === 0) return null

    return transformBlog(blogs[0])
  } catch (error) {
    console.error('Error fetching blog by slug:', error)
    return null
  }
}

/**
 * Obtener blogs por categoría
 */
export async function getBlogsByCategory(category: string, locale: string = 'es'): Promise<BlogPost[]> {
  try {
    const data = await fetchAPI('/blogs', {
      params: {
        'populate': '*',
        'locale': locale,
        'filters[category][$contains]': category,
        'sort': 'date:desc',
        'publicationState': 'live',
      },
    })

    const blogs: StrapiBlog[] = formatStrapiData(data)
    return blogs.map(transformBlog)
  } catch (error) {
    console.error('Error fetching blogs by category:', error)
    return []
  }
}

/**
 * Buscar blogs
 */
export async function searchBlogs(query: string, locale: string = 'es'): Promise<BlogPost[]> {
  try {
    const data = await fetchAPI('/blogs', {
      params: {
        'populate': '*',
        'locale': locale,
        'filters[$or][0][title][$containsi]': query,
        'filters[$or][1][excerpt][$containsi]': query,
        'filters[$or][2][content][$containsi]': query,
        'sort': 'date:desc',
        'publicationState': 'live',
      },
    })

    const blogs: StrapiBlog[] = formatStrapiData(data)
    return blogs.map(transformBlog)
  } catch (error) {
    console.error('Error searching blogs:', error)
    return []
  }
}

/**
 * Transformar blog de Strapi al formato del frontend
 */
function transformBlog(strapiBlog: StrapiBlog): BlogPost {
  return {
    id: strapiBlog.id,
    slug: strapiBlog.slug,
    title: strapiBlog.title,
    excerpt: strapiBlog.excerpt,
    content: strapiBlog.content,
    image: getStrapiMedia(strapiBlog.image?.url),
    category: strapiBlog.category,
    date: strapiBlog.date,
    readTime: strapiBlog.readTime,
    author: strapiBlog.author,
    featured: strapiBlog.featured,
    tags: strapiBlog.tags,
  }
}
