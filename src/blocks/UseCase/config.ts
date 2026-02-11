import type { Block } from 'payload'

export const UseCase: Block = {
  slug: 'useCase',
  interfaceName: 'UseCaseBlock',
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
      name: 'cases',
      type: 'array',
      label: 'Use Cases',
      minRows: 1,
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
          required: true,
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Scenario Image',
        },
      ],
    },
  ],
  labels: {
    plural: 'Use Cases',
    singular: 'Use Case',
  },
}
