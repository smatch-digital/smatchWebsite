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
                            type: 'select',
                            label: 'Icon',
                            dbName: 'icon',
                            enumName: 'exp_icon',
                            options: [
                                { label: 'Factory (Industry)', value: 'Factory' },
                                { label: 'Globe (Citizenship)', value: 'Globe' },
                                { label: 'Truck (Supply Chain)', value: 'Truck' },
                                { label: 'Leaf (Agriculture)', value: 'Leaf' },
                                { label: 'Cpu (AI)', value: 'Cpu' },
                                { label: 'Database (Data)', value: 'Database' },
                                { label: 'Cube (3D/Digital Twin)', value: 'Cube' },
                                { label: 'Gear (Automation)', value: 'Gear' },
                                { label: 'Lightning (Energy)', value: 'Lightning' },
                                { label: 'Cloud (Cloud Computing)', value: 'Cloud' },
                            ],
                            defaultValue: 'Factory',
                        },
                        {
                            name: 'iconColor',
                            type: 'select',
                            label: 'Icon Color',
                            dbName: 'clr',
                            enumName: 'exp_icon_clr',
                            options: [
                                { label: 'Yellow (Primary)', value: 'text-yellow-500' },
                                { label: 'Orange', value: 'text-orange-500' },
                                { label: 'Green', value: 'text-green-500' },
                                { label: 'Blue', value: 'text-blue-500' },
                                { label: 'Purple', value: 'text-purple-500' },
                                { label: 'Cyan', value: 'text-cyan-500' },
                                { label: 'Red', value: 'text-red-500' },
                            ],
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
