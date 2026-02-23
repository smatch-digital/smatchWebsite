import type { MetadataRoute } from 'next'
import { getPayload } from '@/getPayload'

/**
 * Dynamic sitemap generation for Smatch Digital
 * Generates localized URLs for all published pages, solutions, projects, and posts.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://smatch.ma'
    const locales = ['en', 'fr']

    // Track seen URLs to prevent duplicates
    const seenUrls = new Set<string>()

    const addEntry = (
        entries: MetadataRoute.Sitemap,
        path: string,
        priority: number,
        changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
        lastModified: Date,
    ) => {
        for (const locale of locales) {
            const url = `${baseUrl}/${locale}${path === '/' ? '' : path}`
            if (!seenUrls.has(url)) {
                seenUrls.add(url)
                entries.push({ url, lastModified, changeFrequency, priority })
            }
        }
    }

    const entries: MetadataRoute.Sitemap = []

    // Static core routes (only those NOT coming from CMS pages collection)
    addEntry(entries, '/', 1.0, 'daily', new Date())
    addEntry(entries, '/solutions', 0.8, 'daily', new Date())
    addEntry(entries, '/projects', 0.8, 'daily', new Date())
    addEntry(entries, '/posts', 0.8, 'daily', new Date())

    try {
        const payload = await getPayload()

        // 1. CMS Pages (excluding 'home' — already covered by '/')
        const pages = await payload.find({
            collection: 'pages',
            draft: false,
            depth: 0,
            limit: 1000,
            pagination: false,
            select: { slug: true, updatedAt: true },
        })
        for (const page of pages.docs) {
            if (page.slug && page.slug !== 'home') {
                addEntry(entries, `/${page.slug}`, 0.7, 'weekly', new Date(page.updatedAt))
            }
        }

        // 2. Solution detail pages — highest value for SEO
        const solutions = await payload.find({
            collection: 'solutions',
            depth: 0,
            limit: 1000,
            pagination: false,
            select: { slug: true, updatedAt: true },
        })
        for (const sol of solutions.docs) {
            if (sol.slug) {
                addEntry(entries, `/solutions/${sol.slug}`, 0.9, 'weekly', new Date(sol.updatedAt))
            }
        }

        // 3. Project detail pages
        const projects = await payload.find({
            collection: 'projects',
            depth: 0,
            limit: 1000,
            pagination: false,
            select: { slug: true, updatedAt: true },
        })
        for (const project of projects.docs) {
            if (project.slug) {
                addEntry(entries, `/projects/${project.slug}`, 0.6, 'weekly', new Date(project.updatedAt))
            }
        }

        // 4. Blog posts
        const posts = await payload.find({
            collection: 'posts',
            depth: 0,
            limit: 1000,
            pagination: false,
            select: { slug: true, updatedAt: true },
        })
        for (const post of posts.docs) {
            if (post.slug) {
                addEntry(entries, `/posts/${post.slug}`, 0.6, 'weekly', new Date(post.updatedAt))
            }
        }

        return entries
    } catch (error) {
        console.error('Sitemap generation error:', error)
        return entries
    }
}
