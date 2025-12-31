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
            name: 'populateBy',
            type: 'select',
            label: 'Source des Données',
            defaultValue: 'latest',
            options: [
                { label: 'Les Plus Récents', value: 'latest' },
                { label: 'Sélection Manuelle', value: 'selection' },
            ],
        },
        {
            name: 'limit',
            type: 'number',
            label: 'Number of items to show',
            defaultValue: 5,
            min: 1,
            max: 20,
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'latest',
                description: 'Nombre maximum d\'éléments à afficher',
            },
        },
        {
            name: 'filterByType',
            type: 'select',
            label: 'Filtrer par Type',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'latest',
            },
            options: [
                { label: 'Tous', value: 'all' },
                { label: 'Projets uniquement', value: 'project' },
                { label: 'Événements uniquement', value: 'event' },
            ],
            defaultValue: 'all',
        },
        {
            name: 'selectedItems',
            type: 'relationship',
            relationTo: 'projects',
            hasMany: true,
            label: 'Éléments Sélectionnés',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'selection',
                description: 'Choisissez les projets/événements à afficher',
            },
        },
        {
            name: 'manualItems',
            type: 'array',
            label: 'Manual Items (Deprecated - use Selection instead)',
            admin: {
                hidden: true, // Hide this as we want to move to dynamic
            },
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
