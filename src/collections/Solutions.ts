import type { CollectionConfig } from 'payload'
import { createRAGAfterChangeHook, createRAGAfterDeleteHook } from '@/hooks/ragSync'
import { adminOrHigher, adminPanelEditorOrHigher, editorOrHigher } from '@/access/roles'

export const Solutions: CollectionConfig<'solutions'> = {
  slug: 'solutions',
  access: {
    admin: adminPanelEditorOrHigher, // Editor+ can see Solutions in admin
    create: editorOrHigher,       // Editor+ can create
    delete: adminOrHigher,        // Admin+ can delete
    read: () => true,             // Public read access for frontend
    update: editorOrHigher,       // Editor+ can update
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        if (typeof data.order === 'number') return data

        try {
          const { docs } = await req.payload.find({
            collection: 'solutions',
            depth: 0,
            limit: 1,
            overrideAccess: true,
            pagination: false,
            sort: '-order',
            where: {
              order: {
                exists: true,
              },
            },
          })

          const lastOrder = docs?.[0]?.order
          data.order = (typeof lastOrder === 'number' ? lastOrder : 0) + 1
        } catch {
          return data
        }

        return data
      },
    ],
    afterChange: [createRAGAfterChangeHook('solutions')],
    afterDelete: [createRAGAfterDeleteHook('solutions')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card Settings',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              label: 'Short Description',
              localized: true,
              admin: {
                description: 'Shown on the solution card in the grid',
              },
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Icon Name',
              admin: {
                description: 'Copy from Icon Library (/admin/icons) e.g., Barcode, Truck, Warehouse',
              },
            },
          ],
        },
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroSubtitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Problem Statement',
          fields: [
            {
              name: 'problemTitle',
              type: 'text',
              localized: true,
            },
            {
              name: 'problemDescription',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'terminalContent',
              type: 'array',
              fields: [
                {
                  name: 'line',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'UI Reveal',
          fields: [
            {
              name: 'dashboardImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Specifications / Modules',
          fields: [
            {
              name: 'modules',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon Name',
                  admin: {
                    description: 'Copy from Icon Library (/admin/icons)',
                  },
                },
                {
                  name: 'badge',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
