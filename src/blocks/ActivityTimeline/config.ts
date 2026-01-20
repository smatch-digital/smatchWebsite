import type { Block } from 'payload'

export const ActivityTimeline: Block = {
    slug: 'activityTimeline',
    labels: {
        singular: 'Timeline Activités',
        plural: 'Timelines Activités',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Titre de la Section',
            defaultValue: 'JOURNAL DES OPÉRATIONS',
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
            label: 'Nombre d\'éléments',
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
            name: 'showFilters',
            type: 'checkbox',
            label: 'Afficher les filtres (Événements / Projets)',
            defaultValue: true,
        },
    ],
    interfaceName: 'ActivityTimelineBlock',
}
