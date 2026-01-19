import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { i18nConfig } from '@/utilities/i18n'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer for all locales`)

    // Revalidate all locale-specific cache tags
    for (const locale of i18nConfig.locales) {
      revalidateTag(`global_footer_${locale}`)
    }
    // Also revalidate the default tag (for fallback cases)
    revalidateTag('global_footer_default')
  }

  return doc
}

