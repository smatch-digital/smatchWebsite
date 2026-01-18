'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { getLocaleFromPath, addLocaleToPath, type Locale } from '@/utilities/i18n'

interface LocaleLinkProps extends Omit<React.ComponentProps<typeof Link>, 'href'> {
    href: string
    locale?: Locale
}

/**
 * LocaleLink Component
 * 
 * Wrapper around Next.js Link that automatically prefixes internal paths
 * with the current locale from the URL path.
 * 
 * @example
 * // In /en/about page, renders as /en/contact
 * <LocaleLink href="/contact">Contact</LocaleLink>
 * 
 * // Force specific locale
 * <LocaleLink href="/about" locale="fr">About (FR)</LocaleLink>
 * 
 * // External links pass through unchanged
 * <LocaleLink href="https://example.com">External</LocaleLink>
 */
export const LocaleLink: React.FC<LocaleLinkProps> = ({
    href,
    locale,
    children,
    ...props
}) => {
    const pathname = usePathname()
    const currentLocale = getLocaleFromPath(pathname)

    // Use provided locale or current locale from path
    const targetLocale = locale ?? currentLocale

    // Only prefix internal paths (starting with /)
    // Skip if href already has locale prefix or is external
    const isInternalPath = href.startsWith('/') && !href.startsWith('//')
    const alreadyHasLocale =
        href.startsWith('/en/') ||
        href.startsWith('/fr/') ||
        href === '/en' ||
        href === '/fr'

    const finalHref = isInternalPath && !alreadyHasLocale
        ? addLocaleToPath(href, targetLocale)
        : href

    return (
        <Link href={finalHref} {...props}>
            {children}
        </Link>
    )
}

export default LocaleLink
