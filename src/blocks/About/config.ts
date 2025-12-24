import { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  fields: [
    {
      name: 'headingPart1',
      type: 'text',
      required: true,
      defaultValue: 'ÉDITEUR.',
    },
    {
      name: 'headingPart2',
      type: 'text',
      required: true,
      defaultValue: 'INTÉGRATEUR.',
    },
    {
      name: 'tag',
      type: 'text',
      required: true,
      defaultValue: '/// ORIGIN_STORY',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        "SMATCH Digital accélère la transformation numérique de ses partenaires à travers des solutions technologiques centrées sur l'humain, combinant expertise métier et innovations. En tant qu'intégrateur et éditeur, nous intervenons dans les secteurs industriel, logistique, agricole et touristique en apportant des solutions prêtes à la mise en œuvre. La traçabilité, l'IoT, l'automatisation, l'IA et la Data Intelligence sont autant de briques qui composent l'apanage de nos solutions. Notre approche favorise l'interopérabilité, la valorisation des données, et l'adoption des technologies intelligentes au service de la performance terrain.",
    },
    {
      name: 'cta',
      type: 'text',
      required: true,
      defaultValue: 'CASABLANCA, MA',
    },
  ],
}
