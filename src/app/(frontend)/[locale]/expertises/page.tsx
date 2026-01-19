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
import { i18nConfig, isValidLocale, type Locale } from '@/utilities/i18n'

type Args = {
  params: Promise<{
    locale: string
  }>
}

/**
 * Generate static params for all locales
 */
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function ExpertisePage({ params }: Args) {
  const { locale } = await params
  const { isEnabled: draft } = await draftMode()

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound()
  }

  const page = await queryPageBySlug({ slug: 'expertises', locale: locale as Locale })

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

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    return {}
  }

  const page = await queryPageBySlug({ slug: 'expertises', locale: locale as Locale })

  if (page) {
    return generateMeta({ doc: page })
  }

  return {
    title: 'Smatch Digital | Expertise',
    description: 'Industrial Solutions, Big Data & AI capabilities.',
  }
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload()

  try {
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      locale: locale, // CRITICAL: Pass locale to get string values
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

