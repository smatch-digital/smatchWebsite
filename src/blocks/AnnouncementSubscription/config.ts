import type { Block } from 'payload'

export const AnnouncementSubscription: Block = {
  slug: 'announcementSubscription',
  interfaceName: 'AnnouncementSubscriptionBlock',
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Stay Updated',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Subscribe to our newsletter to receive the latest updates and announcements.',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Form',
    },
  ],
  labels: {
    plural: 'Announcement Subscriptions',
    singular: 'Announcement Subscription',
  },
}
