import type { CollectionConfig } from 'payload'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  access: {
    read: () => true, // Allow public read access
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
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
