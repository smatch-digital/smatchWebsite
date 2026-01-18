import { Block } from 'payload'

export const Domains: Block = {
  slug: 'domains',
  interfaceName: 'DomainsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Architecture de Solutions',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue:
        "Une suite intégrée d'outils puissants conçus pour l'évolutivité, la sécurité et la performance opérationnelle.",
    },
    {
      name: 'tabs',
      type: 'array',
      label: 'Domain Tabs',
      minRows: 1,
      required: true,
      localized: true,
      fields: [
        {
          name: 'tabLabel',
          type: 'text',
          required: true,
          label: 'Tab Label',
          admin: {
            description: 'The name displayed in the left navigation list (e.g., "Supply Chain & Logistique")',
          },
        },
        {
          name: 'moduleTag',
          type: 'text',
          label: 'Module Tag',
          defaultValue: 'MODULE: LOG_2.0 // FLOW OPTIMIZATION',
          admin: {
            description: 'Technical tag displayed above the content (e.g., "MODULE: LOG_2.0")',
          },
        },
        {
          name: 'subTitle',
          type: 'text',
          label: 'Sub Title',
          defaultValue: '1. AgriTech & Smart Assets',
        },
        {
          name: 'mainTitle',
          type: 'text',
          required: true,
          label: 'Main Title',
          defaultValue: 'Gestion de Flux & Traçabilité',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'hardware',
          type: 'text',
          label: 'Hardware Info',
          defaultValue: 'Capteurs RFID / Beacons GPS / Handhelds',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Domain Image',
          admin: {
            description: 'Recommended: Transparent PNG, approx 800x600px. The image will float on the right side.',
          },
        },
      ],
    },
  ],
}
