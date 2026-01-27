import { GlobalConfig } from 'payload'
import { link } from '@/fields/link'

export const Announcement: GlobalConfig = {
  slug: 'announcement',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Activate Announcement Popup',
      defaultValue: false,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      minRows: 1,
      maxRows: 1,
      admin: {
        condition: (_, siblingData) => siblingData.isActive,
      },
      blocks: [
        {
          slug: 'seafoodEvent', // Matches the specific design requested
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title (e.g. CARAVANE SEAFOOD DAKHLA)',
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Description Text',
            },
            {
              name: 'highlightText',
              type: 'text',
              label: 'Highlight Text (e.g. Date)',
              admin: {
                description: 'Appears in gold/bold below description',
              },
            },
            {
              name: 'detailsBox',
              type: 'textarea',
              label: 'Details Box Content',
              admin: {
                description: 'Content inside the bordered box',
              },
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Tags / Metrics',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'buttons',
              type: 'array',
              maxRows: 2,
              fields: [
                link({
                  appearances: false,
                }),
                {
                  name: 'style',
                  type: 'select',
                  defaultValue: 'solid',
                  options: [
                    { label: 'Solid Gold', value: 'solid' },
                    { label: 'Outline', value: 'outline' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
