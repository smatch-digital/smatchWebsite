import type { Block } from 'payload'

export const TrustedBy: Block = {
    slug: 'trustedBy',
    labels: {
        singular: 'Trusted By',
        plural: 'Trusted By Sections',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Section Title',
            defaultValue: 'TRUSTED BY',
            required: true,
        },
        {
            name: 'partners',
            type: 'array',
            label: 'Partners',
            minRows: 1,
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    label: 'Partner Name',
                    required: true,
                },
                {
                    name: 'logoType',
                    type: 'radio',
                    label: 'Logo Type',
                    defaultValue: 'image',
                    options: [
                        {
                            label: 'Image Upload',
                            value: 'image',
                        },
                        {
                            label: 'Text (Fallback)',
                            value: 'text',
                        },
                    ],
                    admin: {
                        layout: 'horizontal',
                    },
                },
                {
                    name: 'logo',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Logo Image',
                    required: true,
                    admin: {
                        description: 'Logo should be white (SVG preferred). Transparent background.',
                        condition: (_, siblingData) => siblingData.logoType === 'image',
                    },
                },
                {
                    name: 'textLogo',
                    type: 'text',
                    label: 'Logo Text',
                    required: true,
                    admin: {
                        description: 'Text to display if no image is available.',
                        condition: (_, siblingData) => siblingData.logoType === 'text',
                    },
                },
            ],
        },
    ],
}
