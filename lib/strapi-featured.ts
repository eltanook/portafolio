// Servicios API para Items Destacados desde Strapi

import { fetchAPI, formatStrapiData, getStrapiMedia } from './strapi'

export interface StrapiFeaturedItem {
  id: number
  title: string
  description: string
  image: {
    url: string
    alternativeText?: string
  }
  link: string
  type: 'project' | 'blog' | 'external'
  order: number
  tags?: string[]
  locale: string
  publishedAt: string
}

export interface FeaturedItem {
  id: number
  title: string
  description: string
  image: string
  link: string
  type: 'project' | 'blog' | 'external'
  order: number
  tags?: string[]
}

/**
 * Obtener items destacados para la página de inicio
 */
export async function getFeaturedItems(locale: string = 'es', limit: number = 3): Promise<FeaturedItem[]> {
  try {
    const data = await fetchAPI('/featured-items', {
      params: {
        'populate': '*',
        'locale': locale,
        'sort': 'order:asc',
        'pagination[limit]': limit,
        'publicationState': 'live',
      },
    })

    const items: StrapiFeaturedItem[] = formatStrapiData(data)
    return items.map(transformFeaturedItem)
  } catch (error) {
    console.error('Error fetching featured items:', error)
    return []
  }
}

/**
 * Obtener items destacados por tipo
 */
export async function getFeaturedItemsByType(
  type: 'project' | 'blog' | 'external',
  locale: string = 'es'
): Promise<FeaturedItem[]> {
  try {
    const data = await fetchAPI('/featured-items', {
      params: {
        'populate': '*',
        'locale': locale,
        'filters[type][$eq]': type,
        'sort': 'order:asc',
        'publicationState': 'live',
      },
    })

    const items: StrapiFeaturedItem[] = formatStrapiData(data)
    return items.map(transformFeaturedItem)
  } catch (error) {
    console.error('Error fetching featured items by type:', error)
    return []
  }
}

/**
 * Transformar item destacado de Strapi al formato del frontend
 */
function transformFeaturedItem(strapiItem: StrapiFeaturedItem): FeaturedItem {
  return {
    id: strapiItem.id,
    title: strapiItem.title,
    description: strapiItem.description,
    image: getStrapiMedia(strapiItem.image?.url),
    link: strapiItem.link,
    type: strapiItem.type,
    order: strapiItem.order,
    tags: strapiItem.tags,
  }
}
