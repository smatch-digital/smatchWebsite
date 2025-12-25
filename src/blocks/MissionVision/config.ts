import type { Block } from 'payload'

export const MissionVision: Block = {
  slug: 'missionVision',
  interfaceName: 'MissionVisionBlock',
  labels: {
    singular: 'Mission & Vision',
    plural: 'Mission & Vision Blocks',
  },
  fields: [
    {
      name: 'sectionHeader',
      type: 'group',
      label: 'Section Header',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle (Small Top)',
          defaultValue: 'Corporate Identity',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Main Title',
          defaultValue: 'Notre ADN',
        },
      ],
    },
    {
      name: 'mission',
      type: 'group',
      label: 'Mission Card',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle (Tag)',
          defaultValue: 'PHASE 1: FOUNDATION',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Notre Mission',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue: "Accompagner la transformation digitale des organisations...",
        },
      ],
    },
    {
      name: 'vision',
      type: 'group',
      label: 'Vision Card',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle (Tag)',
          defaultValue: 'PHASE 2: EXPANSION',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          defaultValue: 'Notre Vision',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          defaultValue: "Faire de la technologie un moteur de performance...",
        },
      ],
    },
    {
      name: 'core',
      type: 'group',
      label: 'Central Core',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Core Text',
          defaultValue: 'Innovation Continue',
        },
      ],
    },
    {
      name: 'nodes',
      type: 'array',
      label: 'Orbiting Nodes',
      minRows: 4,
      maxRows: 4,
      labels: {
        singular: 'Node',
        plural: 'Nodes',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label (e.g., 01.0 // PROCESS)',
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Text (e.g., Modéliser)',
          required: true,
        },
      ],
      defaultValue: [
        { label: '01.0 // PROCESS', text: 'Modéliser' },
        { label: '02.0 // ETHICS', text: 'Responsabilité' },
        { label: '03.0 // TECH', text: 'Sécurité' },
        { label: '04.0 // VALUE', text: 'Valorisation' },
      ],
    },
  ],
}
