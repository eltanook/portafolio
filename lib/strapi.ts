// Configuración y utilidades para Strapi API

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

interface FetchOptions extends RequestInit {
  params?: Record<string, any>
}

/**
 * Función helper para hacer requests a Strapi
 */
async function fetchAPI(
  path: string,
  options: FetchOptions = {},
  retries = 3
): Promise<any> {
  const { params, ...fetchOptions } = options

  // Construir query params
  const queryParams = new URLSearchParams()
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value))
      }
    })
  }

  const queryString = queryParams.toString()
  const url = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    ...fetchOptions.headers,
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      next: { revalidate: 60 }, // Revalidar cada 60 segundos
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      return fetchAPI(path, options, retries - 1)
    }
    console.error('Error fetching from Strapi:', error)
    throw error
  }
}

/**
 * Obtener URL completa de una imagen de Strapi
 */
export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '/placeholder.png'
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

/**
 * Formatear datos de Strapi al formato esperado por el frontend
 */
export function formatStrapiData<T>(data: any): T {
  if (!data) return data

  if (Array.isArray(data)) {
    return data.map(item => formatStrapiData(item)) as T
  }

  if (data.data) {
    return formatStrapiData(data.data)
  }

  if (data.attributes) {
    const { id } = data
    const attributes = data.attributes

    // Formatear relaciones y media
    const formatted: any = { id, ...attributes }

    Object.keys(formatted).forEach(key => {
      const value = formatted[key]
      if (value?.data) {
        formatted[key] = formatStrapiData(value.data)
      }
    })

    return formatted as T
  }

  return data as T
}

/**
 * Obtener proyectos featured (los 3 primeros)
 */
export async function getFeaturedProjects() {
  try {
    const data = await fetchAPI('/projects', {
      params: {
        'populate': '*',
        'sort[0]': 'order:asc',
        'pagination[limit]': 3,
      },
    })
    return formatStrapiData(data)
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return { data: [] }
  }
}

/**
 * Obtener todos los proyectos
 */
export async function getAllProjects() {
  try {
    const data = await fetchAPI('/projects', {
      params: {
        'populate': '*',
        'sort[0]': 'order:asc',
      },
    })
    return formatStrapiData(data)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return { data: [] }
  }
}

/**
 * Obtener un proyecto por slug
 */
export async function getProjectBySlug(slug: string) {
  try {
    const data = await fetchAPI('/projects', {
      params: {
        'filters[slug][$eq]': slug,
        'populate': '*',
      },
    })
    const formatted: any = formatStrapiData(data)
    return formatted?.data?.[0] || null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

/**
 * Obtener todos los blogs
 */
export async function getAllBlogs() {
  try {
    const data = await fetchAPI('/blogs', {
      params: {
        'populate': '*',
        'sort[0]': 'date:desc',
      },
    })
    return formatStrapiData(data)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return { data: [] }
  }
}

/**
 * Obtener blogs featured
 */
export async function getFeaturedBlogs() {
  try {
    const data = await fetchAPI('/blogs', {
      params: {
        'filters[featured][$eq]': true,
        'populate': '*',
        'sort[0]': 'date:desc',
        'pagination[limit]': 3,
      },
    })
    return formatStrapiData(data)
  } catch (error) {
    console.error('Error fetching featured blogs:', error)
    return { data: [] }
  }
}

/**
 * Obtener un blog por slug
 */
export async function getBlogBySlug(slug: string) {
  try {
    const data = await fetchAPI('/blogs', {
      params: {
        'filters[slug][$eq]': slug,
        'populate': '*',
      },
    })
    const formatted: any = formatStrapiData(data)
    return formatted?.data?.[0] || null
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

export { fetchAPI, STRAPI_URL }
