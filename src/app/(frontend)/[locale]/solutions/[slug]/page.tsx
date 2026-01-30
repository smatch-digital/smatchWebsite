import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { getPayload } from '@/getPayload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'

import { SolutionsHero } from '@/components/solutions/SolutionsHero'
import { ProblemStatement } from '@/components/solutions/ProblemStatement'
import { UIReveal } from '@/components/solutions/UIReveal'
import { SystemModules } from '@/components/solutions/SystemModules'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const solutions = await payload.find({
      collection: 'solutions',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    return solutions.docs.map(({ slug }) => ({ slug }))
  } catch (_error) {
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function SolutionPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise

  if (!slug) return notFound()

  const decodedSlug = decodeURIComponent(slug)
  const url = '/solutions/' + decodedSlug

  const solution = await querySolutionBySlug({ slug: decodedSlug })

  if (!solution) {
    return <PayloadRedirects url={url} />
  }

  // Extract data with type safety
  const {
    title,
    heroSubtitle,
    heroImage,
    problemTitle,
    problemDescription,
    terminalContent,
    dashboardImage,
    modules,
  } = solution

  // Helper to get image URL
  const getImageUrl = (media: unknown) => {
    if (!media) return null
    if (typeof media === 'string') return media
    if (typeof media === 'object' && media !== null && 'url' in media)
      return (media as { url: string }).url
    return null
  }

  const heroImgUrl = getImageUrl(heroImage)
  const dashboardImgUrl = getImageUrl(dashboardImage)

  // Format terminal lines
  const terminalLines = Array.isArray(terminalContent)
    ? terminalContent
      .map((item) => item.line)
      .filter((line): line is string => typeof line === 'string')
    : []

  // Format modules
  const formattedModules = Array.isArray(modules)
    ? modules.map((mod) => ({
      title: mod.title || '',
      description: mod.description || '',
      icon: mod.icon || '',
      badge: mod.badge || '',
    }))
    : []

  return (
    <article className="min-h-screen bg-smatch-black">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <SolutionsHero
        title={title}
        subtitle={heroSubtitle || undefined}
        image={heroImgUrl}
        fullBleed={!!heroImgUrl}
      />

      {(problemTitle || problemDescription || terminalLines.length > 0) && (
        <ProblemStatement
          title={problemTitle || ''}
          description={problemDescription || ''}
          terminalLines={terminalLines}
        />
      )}

      {dashboardImgUrl && <UIReveal image={dashboardImgUrl} />}

      {formattedModules.length > 0 && <SystemModules modules={formattedModules} />}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  if (!slug) return {}

  const decodedSlug = decodeURIComponent(slug)
  const solution = await querySolutionBySlug({ slug: decodedSlug })

  return generateMeta({ doc: solution })
}

const querySolutionBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload()

  try {
    const result = await payload.find({
      collection: 'solutions',
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
