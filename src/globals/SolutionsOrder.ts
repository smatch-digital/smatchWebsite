import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const SolutionsOrder: GlobalConfig = {
  slug: 'solutions-order',
  access: {
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'orderedSolutions',
      type: 'relationship',
      relationTo: 'solutions',
      hasMany: true,
      admin: {
        isSortable: true,
        description: 'Drag to reorder Solutions. This order controls the frontend listing.',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        type RelationValue = string | number | { id: string | number }

        const list = Array.isArray(doc?.orderedSolutions) ? (doc.orderedSolutions as RelationValue[]) : []
        const orderedIDs = list
          .map((item: RelationValue) => {
            if (typeof item === 'string' || typeof item === 'number') return item
            return item?.id
          })
          .filter(
            (id: string | number | undefined): id is string | number =>
              (typeof id === 'string' && id.length > 0) || typeof id === 'number',
          )

        let order = 1

        for (const id of orderedIDs) {
          await req.payload.update({
            id,
            collection: 'solutions',
            data: { order },
            overrideAccess: true,
          })
          order += 1
        }

        let page = 1
        let hasNextPage = true
        while (hasNextPage) {
          const remaining = await req.payload.find({
            collection: 'solutions',
            depth: 0,
            limit: 100,
            overrideAccess: true,
            page,
            sort: 'createdAt',
            where: orderedIDs.length
              ? {
                  id: {
                    not_in: orderedIDs,
                  },
                }
              : undefined,
          })

          for (const solution of remaining.docs) {
            await req.payload.update({
              id: solution.id,
              collection: 'solutions',
              data: { order },
              overrideAccess: true,
            })
            order += 1
          }

          hasNextPage = Boolean(remaining.hasNextPage)
          page += 1
        }
      },
    ],
  },
}
