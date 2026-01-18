import type { Config } from '@/payload-types'
import type { Locale } from '@/utilities/i18n'

import { getPayload } from '@/getPayload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

/**
 * Fetch a global with optional locale support
 * Per Payload docs: payload.findGlobal({ slug, locale, fallbackLocale })
 */
async function getGlobal(slug: Global, depth = 0, locale?: Locale) {
  const payload = await getPayload()

  try {
    const global = await payload.findGlobal({
      slug,
      depth,
      locale: locale,
      fallbackLocale: 'en', // DDIA principle: always have a fallback
    })
    return global
  } catch (_error) {
    return null
  }
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug and locale
 * Cache keys include locale to ensure proper cache separation per language
 */
export const getCachedGlobal = (slug: Global, depth = 0, locale?: Locale) =>
  unstable_cache(
    async () => getGlobal(slug, depth, locale),
    [slug, locale ?? 'default'],
    {
      tags: [`global_${slug}_${locale ?? 'default'}`],
    }
  )
