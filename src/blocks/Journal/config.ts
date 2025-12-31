import { Block } from 'payload'

export const Journal: Block = {
    slug: 'journal',
    interfaceName: 'JournalBlock',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Title',
            defaultValue: 'JOURNAL DES OPÉRATIONS',
        },
        {
            name: 'liveFeedText',
            type: 'text',
            label: 'Live Feed Text',
            defaultValue: 'LIVE FEED',
        },
        {
            name: 'limit',
            type: 'number',
            label: 'Number of items to show',
            defaultValue: 5,
        },
        {
            name: 'manualItems',
            type: 'array',
            label: 'Manual Items (Overrides Collection)',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
                {
                    name: 'meta',
                    type: 'text',
                    label: 'Meta (Year | Type)',
                },
                {
                    name: 'linkText',
                    type: 'text',
                },
                {
                    name: 'linkUrl',
                    type: 'text',
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                }
            ]
        }
    ],
}
