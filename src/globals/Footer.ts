import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from '@/Footer/hooks/revalidateFooter'
import { isAdmin } from '@/access/roles'
import type { User } from '@/payload-types'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    // Only Admin+ can update navigation
    update: ({ req }) => isAdmin(req.user as User),
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      localized: true,
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
