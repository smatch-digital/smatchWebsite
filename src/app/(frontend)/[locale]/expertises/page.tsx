import type { Metadata } from 'next'
import { getPayload } from '@/getPayload'
import type { RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default async function ExpertisePage() {
  const { isEnabled: draft } = await draftMode()

  const page = await queryPageBySlug({ slug: 'expertises' })

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <main className="min-h-screen bg-black">
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({ slug: 'expertises' })

  if (page) {
    return generateMeta({ doc: page })
  }

  return {
    title: 'Smatch Digital | Expertise',
    description: 'Industrial Solutions, Big Data & AI capabilities.',
  }
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload()

  try {
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return result.docs?.[0] || null
  } catch (_error) {
    return null
  }
})
