import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

// Default SEO description fallback when CMS field is empty
const DEFAULT_DESCRIPTION = 'Smatch Digital conçoit des solutions WMS, supply chain et IoT sur mesure pour l\'industrie marocaine. Expertise locale, standards internationaux.'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Smatch Digital'
    : 'Smatch Digital | Solutions WMS & Supply Chain'

  // Use CMS description if available, otherwise fall back to default
  const description = doc?.meta?.description || DEFAULT_DESCRIPTION

  return {
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
          {
            url: ogImage,
          },
        ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    alternates: {
      canonical: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    },
    title,
  }
}

