import type { Block } from 'payload'

export const SolutionsArchive: Block = {
    slug: 'solutions-archive',
    interfaceName: 'SolutionsArchiveBlock',
    labels: {
        singular: 'Solutions Grid',
        plural: 'Solutions Grids',
    },
    fields: [
        {
            name: 'sectionTitle',
            type: 'text',
            label: 'Section Title',
            defaultValue: 'Nos Solutions',
            localized: true,
        },
        {
            name: 'sectionDescription',
            type: 'textarea',
            label: 'Section Description',
            defaultValue: 'Trois piliers technologiques pour transformer vos opérations industrielles.',
            localized: true,
        },
        {
            name: 'populateBy',
            type: 'select',
            defaultValue: 'collection',
            options: [
                {
                    label: 'All Solutions (from collection)',
                    value: 'collection',
                },
                {
                    label: 'Manual Selection',
                    value: 'selection',
                },
            ],
        },
        {
            name: 'limit',
            type: 'number',
            label: 'Limit',
            defaultValue: 10,
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'collection',
                step: 1,
                description: 'Maximum number of solutions to display',
            },
        },
        {
            name: 'selectedSolutions',
            type: 'relationship',
            relationTo: 'solutions',
            hasMany: true,
            label: 'Select Solutions',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'selection',
                description: 'Manually select which solutions to display',
            },
        },
        {
            name: 'columns',
            type: 'select',
            label: 'Grid Columns',
            defaultValue: '4',
            options: [
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
            ],
            admin: {
                description: 'Number of columns on desktop (responsive on mobile)',
            },
        },
    ],
}
