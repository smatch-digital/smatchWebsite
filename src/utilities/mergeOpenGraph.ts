import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'SMATCH conçoit et déploie des solutions innovantes pour numériser et automatiser les processus métier des acteurs industriels, des prestataires logistiques et des institutions.',
  images: [
    {
      url: `${getServerSideURL()}/smatch-og.webp`,
      width: 1200,
      height: 630,
      alt: 'Smatch Digital — Solutions WMS & Supply Chain',
    },
  ],
  siteName: 'Smatch Digital',
  title: 'Smatch Digital | Solutions WMS & Supply Chain',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
