import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { i18nConfig } from '@/utilities/i18n'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const basePath = doc.slug === 'home' ? '' : `/${doc.slug}`

      // Revalidate all locale-prefixed paths
      for (const locale of i18nConfig.locales) {
        const path = `/${locale}${basePath}`
        payload.logger.info(`Revalidating page at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('pages-sitemap')
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldBasePath = previousDoc.slug === 'home' ? '' : `/${previousDoc.slug}`

      for (const locale of i18nConfig.locales) {
        const oldPath = `/${locale}${oldBasePath}`
        payload.logger.info(`Revalidating old page at path: ${oldPath}`)
        revalidatePath(oldPath)
      }
      revalidateTag('pages-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    const basePath = doc?.slug === 'home' ? '' : `/${doc?.slug}`

    for (const locale of i18nConfig.locales) {
      const path = `/${locale}${basePath}`
      payload.logger.info(`Revalidating deleted page at path: ${path}`)
      revalidatePath(path)
    }
    revalidateTag('pages-sitemap')
  }

  return doc
}

