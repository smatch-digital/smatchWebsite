import { Block } from 'payload'

export const SmartGrid: Block = {
  slug: 'smart-grid',
  interfaceName: 'SmartGridBlock',
  fields: [
    {
      type: 'group',
      name: 'sectionHeader',
      label: 'Section Header',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'align',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' }
          ]
        }
      ]
    },
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
          name: 'iconType',
          type: 'radio',
          defaultValue: 'upload',
          options: [
            { label: 'Upload SVG', value: 'upload' },
            { label: 'Icon Name (Phosphor)', value: 'name' }
          ]
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Upload an SVG icon.',
            condition: (_, siblingData) => siblingData.iconType === 'upload'
          },
        },
        {
          name: 'iconName',
          type: 'text',
          admin: {
            description: 'Enter Phosphor Icon name (e.g. Factory, RocketLaunch)',
            condition: (_, siblingData) => siblingData.iconType === 'name'
          }
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
