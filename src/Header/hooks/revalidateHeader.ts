import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { i18nConfig } from '@/utilities/i18n'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header for all locales`)

    // Revalidate all locale-specific cache tags
    for (const locale of i18nConfig.locales) {
      revalidateTag(`global_header_${locale}`)
    }
    // Also revalidate the default tag (for fallback cases)
    revalidateTag('global_header_default')
  }

  return doc
}

