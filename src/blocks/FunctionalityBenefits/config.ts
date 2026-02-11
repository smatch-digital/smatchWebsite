import type { Block } from 'payload'

export const FunctionalityBenefits: Block = {
  slug: 'functionalityBenefits',
  interfaceName: 'FunctionalityBenefitsBlock',
  fields: [
    {
      name: 'sectionHeader',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
      label: 'Section Header',
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits / Features',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Functionality & Benefits',
    singular: 'Functionality & Benefits',
  },
}
