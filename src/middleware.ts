import { NextRequest, NextResponse } from 'next/server'
import { i18nConfig, isValidLocale, type Locale } from '@/utilities/i18n'

/**
 * i18n Middleware
 * 
 * Strategy per user requirements:
 * - Accept-Language detection ONLY for root path (/)
 * - Deep links with locale prefix are honored as-is
 * - Deep links without locale prefix redirect to default locale
 */

/**
 * Detect preferred locale from Accept-Language header
 * Only called for root path per user requirements
 */
function getPreferredLocale(acceptLanguage: string | null): Locale {
    if (!acceptLanguage) return i18nConfig.defaultLocale

    // Parse Accept-Language header (e.g., "fr-FR,fr;q=0.9,en;q=0.8")
    const languages = acceptLanguage
        .split(',')
        .map((lang) => {
            const [code, quality = 'q=1'] = lang.trim().split(';')
            const q = parseFloat(quality.replace('q=', '')) || 1
            return { code: code.split('-')[0].toLowerCase(), q }
        })
        .sort((a, b) => b.q - a.q)

    // Find first matching locale
    for (const { code } of languages) {
        if (isValidLocale(code)) {
            return code
        }
    }

    return i18nConfig.defaultLocale
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Skip middleware for:
    // - Admin routes (Payload CMS)
    // - API routes
    // - Static files
    // - Next.js internals
    if (
        pathname.startsWith('/admin') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/next') ||
        pathname.includes('.') ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml' ||
        pathname.startsWith('/sitemap')
    ) {
        return NextResponse.next()
    }

    // Check if pathname already has a locale prefix
    const pathnameHasLocale = i18nConfig.locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) {
        // Locale already present, continue
        return NextResponse.next()
    }

    /**
     * RUTHLESS DECISION: Accept-Language detection ONLY for root path
     * Deep links (e.g., /about) use default locale, not browser preference
     * This ensures shared links work consistently
     */
    let targetLocale: Locale

    if (pathname === '/') {
        // Root path: Use Accept-Language detection
        const acceptLanguage = request.headers.get('Accept-Language')
        targetLocale = getPreferredLocale(acceptLanguage)
    } else {
        // Deep link: Use default locale
        targetLocale = i18nConfig.defaultLocale
    }

    // Redirect to locale-prefixed path
    const newUrl = new URL(
        `/${targetLocale}${pathname === '/' ? '' : pathname}`,
        request.url
    )

    // Preserve query params
    newUrl.search = request.nextUrl.search

    // Set Vary header for CDN caching (only relevant for root path)
    const response = NextResponse.redirect(newUrl, 308)
    if (pathname === '/') {
        response.headers.set('Vary', 'Accept-Language')
    }

    return response
}

export const config = {
    // Match all paths except static files and API
    matcher: [
        /*
         * Match all request paths except for:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap|.*\\..*).*)',
    ],
}
