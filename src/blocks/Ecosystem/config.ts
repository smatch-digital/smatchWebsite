import { Block } from 'payload'

export const Ecosystem: Block = {
  slug: 'ecosystem',
  interfaceName: 'EcosystemBlock',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Notre Écosystème',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue:
        'Un écosystème complet de solutions et de technologies pour accompagner nos clients dans toutes les étapes de leur digitalisation',
    },
    // Card 1: Connectivity
    {
      name: 'connectivityTitle',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Connectivité Universelle',
    },
    {
      name: 'connectivityDesc',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue:
        'Intégration native avec +100 ERPs. SAP, Oracle, Sage et solutions propriétaires.',
    },
    // Card 2: Support
    {
      name: 'supportTitle',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Support Ingénieur',
    },
    {
      name: 'supportDesc',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue: 'Assistance technique dediée 24/7.',
    },
    // Card 3: API
    {
      name: 'apiTitle',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'API First',
    },
    {
      name: 'apiDesc',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue: 'Documentation complete et SDKs modernes pour développeurs.',
    },
    // Card 4: Optimization
    {
      name: 'optimizationTitle',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: "Optimization par l'IA",
    },
    {
      name: 'optimizationDesc',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue:
        "Anticipez vos besoins et optimisez vos flux grâce à l'analyse prédictive.",
    },
    // Card 5: Control
    {
      name: 'controlTitle',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Contrôle Total',
    },
    {
      name: 'controlDesc',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue:
        'Paramétrez vos flux logistiques via une interface intuitive sans code.',
    },
  ],
}
