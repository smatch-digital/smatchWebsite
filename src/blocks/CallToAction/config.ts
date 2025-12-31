import type { Block } from 'payload'

import { link } from '../../fields/link'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      admin: {
        description: 'Main CTA heading (e.g., "Ready to transform your organization?")',
      },
    },
    {
      name: 'subheadline',
      type: 'textarea',
      admin: {
        description: 'Supporting text below the headline',
      },
    },
    link({
      appearances: ['gold', 'outline-gold'],
    }),
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
