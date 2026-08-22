import { MetadataRoute } from 'next'
import { client } from "@/sanity/lib/client"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: 'https://tomasnadal.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://tomasnadal.vercel.app/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://tomasnadal.vercel.app/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://tomasnadal.vercel.app/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ]

  try {
    const projects = await client.fetch(`*[_type == "project"]{ slug, _updatedAt }`)
    const blogPosts = await client.fetch(`*[_type == "blogPost"]{ slug, _updatedAt }`)

    const projectUrls: MetadataRoute.Sitemap = projects
      .filter((p: any) => p.slug?.current)
      .map((p: any) => ({
        url: `https://tomasnadal.vercel.app/projects/${p.slug.current}`,
        lastModified: new Date(p._updatedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      }))

    const blogUrls: MetadataRoute.Sitemap = blogPosts
      .filter((p: any) => p.slug?.current)
      .map((p: any) => ({
        url: `https://tomasnadal.vercel.app/blog/${p.slug.current}`,
        lastModified: new Date(p._updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      }))

    return [...defaultPages, ...projectUrls, ...blogUrls]
  } catch (error) {
    console.error("Error generating sitemap dynamic routes", error)
    return defaultPages
  }
}
