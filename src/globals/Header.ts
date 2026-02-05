import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from '@/Header/hooks/revalidateHeader'
import { isAdmin } from '@/access/roles'
import type { User } from '@/payload-types'

export const Header: GlobalConfig = {
  slug: 'header',
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
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
