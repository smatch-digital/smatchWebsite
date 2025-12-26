import { Block } from 'payload'

export const SmartGrid: Block = {
  slug: 'smart-grid',
  interfaceName: 'SmartGridBlock',
  fields: [
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        {
          label: '2 Columns',
          value: '2',
        },
        {
          label: '3 Columns',
          value: '3',
        },
        {
          label: '4 Columns',
          value: '4',
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Upload an SVG icon.',
          },
        },
        {
          name: 'badge',
          type: 'text',
          defaultValue: 'MOD_01',
        },
        {
          name: 'ctaText',
          type: 'text',
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '#',
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Stats',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
