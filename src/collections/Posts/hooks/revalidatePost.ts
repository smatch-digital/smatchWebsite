import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'
import { i18nConfig } from '@/utilities/i18n'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      // Revalidate all locale-prefixed paths
      for (const locale of i18nConfig.locales) {
        const path = `/${locale}/posts/${doc.slug}`
        payload.logger.info(`Revalidating post at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('posts-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      for (const locale of i18nConfig.locales) {
        const oldPath = `/${locale}/posts/${previousDoc.slug}`
        payload.logger.info(`Revalidating old post at path: ${oldPath}`)
        revalidatePath(oldPath)
      }
      revalidateTag('posts-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    for (const locale of i18nConfig.locales) {
      const path = `/${locale}/posts/${doc?.slug}`
      payload.logger.info(`Revalidating deleted post at path: ${path}`)
      revalidatePath(path)
    }
    revalidateTag('posts-sitemap')
  }

  return doc
}

