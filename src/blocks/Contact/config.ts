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
                        {
                            name: 'mapEmbedUrl',
                            type: 'text',
                            label: 'Google Maps Embed URL',
                            admin: {
                                description: 'Paste the Google Maps embed URL (from "Share > Embed a map")',
                            },
                            defaultValue: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.596001257176!2d-7.660682284797746!3d33.56382758074211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2e7409395d9%3A0x629c414674066066!2sTechnopark%20Casablanca!5e0!3m2!1sen!2sma!4v1620000000000!5m2!1sen!2sma',
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
