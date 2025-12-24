import type { CollectionConfig } from 'payload'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
