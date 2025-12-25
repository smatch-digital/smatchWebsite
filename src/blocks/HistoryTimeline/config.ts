import type { Block } from 'payload'

export const HistoryTimeline: Block = {
  slug: 'historyTimeline',
  interfaceName: 'HistoryTimelineBlock',
  labels: {
    singular: 'History Timeline',
    plural: 'History Timelines',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: "Historique de l'entreprise",
    },
    {
      name: 'events',
      type: 'array',
      label: 'Timeline Events',
      minRows: 1,
      fields: [
        {
          name: 'year',
          type: 'text',
          label: 'Year',
          required: true,
          admin: {
            width: '20%',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          admin: {
            width: '30%',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          admin: {
            width: '50%',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'version',
              type: 'text',
              label: 'Version Tag (e.g., V1.0 // 2013)',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'isCurrent',
              type: 'checkbox',
              label: 'Is Current Milestone?',
              defaultValue: false,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
  ],
}
