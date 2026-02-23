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
    const locales = ['en', 'fr']

    // Helper to generate localized paths for a given route segment
    const generateLocalizedUrls = (path: string, priority: number, changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never', lastModified: Date) => {
        return locales.map((locale) => ({
            url: `${baseUrl}/${locale}${path === '/' ? '' : path}`,
            lastModified,
            changeFrequency,
            priority,
        }))
    }

    // Static core routes
    const staticPages: MetadataRoute.Sitemap = [
        ...generateLocalizedUrls('/', 1.0, 'daily', new Date()),
        ...generateLocalizedUrls('/solutions', 0.8, 'daily', new Date()),
        ...generateLocalizedUrls('/projects', 0.8, 'daily', new Date()),
        ...generateLocalizedUrls('/contact', 0.7, 'weekly', new Date()),
        ...generateLocalizedUrls('/posts', 0.8, 'daily', new Date()),
        ...generateLocalizedUrls('/search', 0.5, 'monthly', new Date()),
    ]

    try {
        const payload = await getPayload()

        // 1. Pages
        const pages = await payload.find({
            collection: 'pages',
            draft: false,
            depth: 0,
            limit: 1000,
            pagination: false,
            select: { slug: true, updatedAt: true },
        })
        const dynamicPages = pages.docs
            .filter((page) => page.slug && page.slug !== 'home')
            .flatMap((page) => generateLocalizedUrls(`/${page.slug}`, 0.7, 'weekly', new Date(page.updatedAt)))

        // 2. Solutions (Previously Missing!)
        const solutions = await payload.find({
            collection: 'solutions',
            depth: 0,
            limit: 1000,
            pagination: false,
            select: { slug: true, updatedAt: true },
        })
        const solutionPages = solutions.docs
            .filter((sol) => sol.slug)
            .flatMap((sol) => generateLocalizedUrls(`/solutions/${sol.slug}`, 0.9, 'weekly', new Date(sol.updatedAt)))

        // 3. Projects
        const projects = await payload.find({
            collection: 'projects',
            depth: 0,
            limit: 1000,
            pagination: false,
            select: { slug: true, updatedAt: true },
        })
        const projectPages = projects.docs
            .filter((project) => project.slug)
            .flatMap((project) => generateLocalizedUrls(`/projects/${project.slug}`, 0.6, 'weekly', new Date(project.updatedAt)))

        // 4. Posts
        const posts = await payload.find({
            collection: 'posts',
            depth: 0,
            limit: 1000,
            pagination: false,
            select: { slug: true, updatedAt: true },
        })
        const postPages = posts.docs
            .filter((post) => post.slug)
            .flatMap((post) => generateLocalizedUrls(`/posts/${post.slug}`, 0.6, 'weekly', new Date(post.updatedAt)))

        return [...staticPages, ...dynamicPages, ...solutionPages, ...projectPages, ...postPages]
    } catch (error) {
        console.error('Sitemap generation error:', error)
        return staticPages
    }
}
