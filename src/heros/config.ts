import { link } from '@/fields/link'
import type { Field } from 'payload'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Smatch Hero',
          value: 'smatch',
        },
      ],
      required: true,
    },
    // Smatch Hero Specific Fields

    {
      name: 'headline',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'smatch',
      },
    },
    {
      name: 'subheadline',
      type: 'textarea',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'smatch',
      },
    },
    {
      name: 'enableCta',
      type: 'checkbox',
      label: 'Enable Call to Action',
      defaultValue: false,
      admin: {
        condition: (_, { type } = {}) => type === 'smatch',
      },
    },
    link({
      appearances: ['gold', 'outline-gold', 'default', 'outline'],
      overrides: {
        name: 'primaryCta',
        label: 'Primary CTA',
        admin: {
          condition: (_, { type, enableCta } = {}) => type === 'smatch' && enableCta,
        },
      },
    }),
    link({
      appearances: ['gold', 'outline-gold', 'default', 'outline'],
      overrides: {
        name: 'secondaryCta',
        label: 'Secondary CTA',
        admin: {
          condition: (_, { type, enableCta } = {}) => type === 'smatch' && enableCta,
        },
      },
    }),
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type !== 'smatch',
      },
    },
    {
      name: 'links',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type !== 'smatch',
      },
      fields: [
        link({
          appearances: ['default', 'outline'],
        }),
      ],
      maxRows: 2,
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'smatch'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
