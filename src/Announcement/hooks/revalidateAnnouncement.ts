import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { i18nConfig } from '@/utilities/i18n'

export const revalidateAnnouncement: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating announcement for all locales`)

    for (const locale of i18nConfig.locales) {
      revalidateTag(`global_announcement_${locale}`)
    }
    revalidateTag('global_announcement_default')
  }

  return doc
}

