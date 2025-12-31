import type { Block } from 'payload'

export const ContactBlock: Block = {
    slug: 'contact',
    interfaceName: 'ContactBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'headline',
                            type: 'text',
                            label: 'Headline',
                            required: true,
                            defaultValue: 'Let’s Build Something Monster',
                        },
                        {
                            name: 'subheadline',
                            type: 'textarea',
                            label: 'Subheadline',
                            defaultValue: 'Ready to engineer your vision? Reach out to our team.',
                        },
                        {
                            name: 'form',
                            type: 'relationship',
                            relationTo: 'forms',
                            required: true,
                            label: 'Form to Display',
                        },
                    ],
                },
                {
                    label: 'Contact Details',
                    fields: [
                        {
                            name: 'email',
                            type: 'email',
                            label: 'Email Address',
                            required: true,
                        },
                        {
                            name: 'phone',
                            type: 'text',
                            label: 'Phone Number',
                        },
                        {
                            name: 'addresses',
                            type: 'array',
                            label: 'Office Addresses',
                            minRows: 1,
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    label: 'Label (e.g. SIEGE SOCIAL)',
                                    required: true,
                                },
                                {
                                    name: 'value',
                                    type: 'textarea',
                                    label: 'Address',
                                    required: true,
                                },
                            ],
                        },
                        {
                            name: 'socialLinks',
                            type: 'array',
                            label: 'Social Links',
                            fields: [
                                {
                                    name: 'platform',
                                    type: 'text',
                                    label: 'Platform Name (e.g. LinkedIn)',
                                    required: true,
                                },
                                {
                                    name: 'url',
                                    type: 'text',
                                    label: 'URL',
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Settings',
                    fields: [
                        {
                            name: 'theme',
                            type: 'select',
                            options: [
                                { label: 'Dark (Default)', value: 'dark' },
                                { label: 'Charcoal', value: 'charcoal' },
                            ],
                            defaultValue: 'dark',
                        },
                    ],
                },
            ],
        },
    ],
    graphQL: {
        singularName: 'ContactBlock',
    },
    labels: {
        plural: 'Contact Blocks',
        singular: 'Contact Block',
    },
}
