import type { Block } from 'payload'

/**
 * ExpertiseDomains Block
 * 
 * Renders the scrolling expertise sections with nested cards.
 * Structure: sections[] -> cards[] -> features[]
 * 
 * Note: Uses short dbName properties to keep PostgreSQL identifiers under 63 chars
 */
export const ExpertiseDomains: Block = {
    slug: 'expertise-domains',
    dbName: 'exp_dom',
    interfaceName: 'ExpertiseDomainsBlock',
    labels: {
        singular: 'Expertise Domains',
        plural: 'Expertise Domains',
    },
    fields: [
        {
            name: 'sections',
            type: 'array',
            label: 'Expertise Sections',
            dbName: 'exp_sects',
            minRows: 1,
            admin: {
                description: 'Add expertise domains (e.g., Industry, Solutions, Data & AI)',
            },
            fields: [
                {
                    name: 'sectionId',
                    type: 'text',
                    label: 'Section ID (slug)',
                    required: true,
                    admin: {
                        description: 'URL-friendly identifier (e.g., "industrie", "solutions", "data-ai")',
                    },
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'Section Title',
                    required: true,
                    defaultValue: 'INDUSTRIE X.0',
                },
                {
                    name: 'subtitle',
                    type: 'text',
                    label: 'Section Subtitle',
                    defaultValue: 'AUTOMATISATION',
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'Section Description',
                    defaultValue: 'Transformation numérique des lignes de production.',
                },
                {
                    name: 'cards',
                    type: 'array',
                    label: 'Expertise Cards',
                    dbName: 'exp_cards',
                    minRows: 1,
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            label: 'Card Title',
                            required: true,
                        },
                        {
                            name: 'subtitle',
                            type: 'text',
                            label: 'Card Subtitle (Tag)',
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                            label: 'Card Description',
                        },
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Card Image',
                            required: true,
                        },
                        {
                            name: 'iconName',
                            type: 'text',
                            label: 'Icon Name',
                            admin: {
                                description: 'Paste icon name from Icon Library (e.g., "Factory", "Globe", "Cpu")',
                            },
                            defaultValue: 'Factory',
                        },
                        {
                            name: 'iconColor',
                            type: 'text',
                            label: 'Icon Color (Tailwind class)',
                            admin: {
                                description: 'Tailwind color class (e.g., "text-yellow-500", "text-green-500")',
                            },
                            defaultValue: 'text-yellow-500',
                        },
                        {
                            name: 'features',
                            type: 'array',
                            label: 'Features List',
                            dbName: 'exp_feats',
                            minRows: 1,
                            maxRows: 6,
                            fields: [
                                {
                                    name: 'text',
                                    type: 'text',
                                    label: 'Feature',
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
