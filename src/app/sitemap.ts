import type { MetadataRoute } from 'next'
import { getPayload } from '@/getPayload'

/**
 * Dynamic sitemap generation for Smatch Digital
 * Automatically includes all published pages from the CMS.
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://smatch.ma'

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/solutions`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ]

    // Dynamic pages from CMS
    try {
        const payload = await getPayload()

        const pages = await payload.find({
            collection: 'pages',
            draft: false,
            limit: 1000,
            pagination: false,
            select: { slug: true, updatedAt: true },
        })

        const dynamicPages: MetadataRoute.Sitemap = pages.docs
            .filter((page) => page.slug && page.slug !== 'home')
            .map((page) => ({
                url: `${baseUrl}/${page.slug}`,
                lastModified: new Date(page.updatedAt),
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            }))

        // Projects
        const projects = await payload.find({
            collection: 'projects',
            draft: false,
            limit: 1000,
            pagination: false,
            select: { slug: true, updatedAt: true },
        })

        const projectPages: MetadataRoute.Sitemap = projects.docs
            .filter((project) => project.slug)
            .map((project) => ({
                url: `${baseUrl}/projects/${project.slug}`,
                lastModified: new Date(project.updatedAt),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            }))

        return [...staticPages, ...dynamicPages, ...projectPages]
    } catch (error) {
        // Return static pages if CMS query fails
        console.error('Sitemap generation error:', error)
        return staticPages
    }
}
