import type { Block } from 'payload'

import { link } from '@/fields/link'

export const QuickPresentation: Block = {
  slug: 'quickPresentation',
  interfaceName: 'QuickPresentationBlock',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Headline',
      localized: true,
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Subheadline',
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      localized: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Presentation Media (Image/Video)',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'mediaRight',
      options: [
        { label: 'Media Right', value: 'mediaRight' },
        { label: 'Media Left', value: 'mediaLeft' },
      ],
      label: 'Layout',
    },
    link({
      appearances: false,
      overrides: {
        label: 'CTA Button',
      },
    }),
  ],
  labels: {
    plural: 'Quick Presentations',
    singular: 'Quick Presentation',
  },
}
