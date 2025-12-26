import type { Block, Field } from 'payload'

const memberFields: Field[] = [
  {
    name: 'name',
    type: 'text',
    required: true,
    label: 'Full Name',
  },
  {
    name: 'role',
    type: 'text',
    required: true,
    label: 'Role / Position',
  },
  {
    name: 'tag',
    type: 'text',
    label: 'Tag (e.g. ARCHITECT_01)',
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Bio / Description',
  },
  {
    name: 'footerId',
    type: 'text',
    label: 'ID Tag (e.g. ID: TZ_001 // LEAD)',
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Profile Picture',
  },
  {
    type: 'row',
    fields: [
      {
        name: 'linkedin',
        type: 'text',
        label: 'LinkedIn URL',
      },
      {
        name: 'email',
        type: 'text',
        label: 'Email Address',
      },
    ],
  },
]

export const Team: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: {
    singular: 'Team Section',
    plural: 'Team Sections',
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      label: 'Section Header',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Top Tag',
          defaultValue: 'Our People',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Main Title',
          defaultValue: "L'Équipe / Leadership",
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue: 'Experts en ingénierie, logistique et transformation digitale.',
        },
      ],
    },
    {
      name: 'leaders',
      type: 'array',
      label: 'Leadership (Top Row - Max 2)',
      minRows: 1,
      maxRows: 2,
      fields: memberFields,
    },
    {
      name: 'members',
      type: 'array',
      label: 'Team Members (Bottom Row)',
      fields: memberFields,
    },
  ],
}
