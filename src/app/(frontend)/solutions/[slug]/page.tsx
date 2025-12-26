import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
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
    const payload = await getPayload({ config: configPromise })
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
  } catch (error) {
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
    // @ts-ignore
    heroSubtitle, 
    // @ts-ignore
    heroImage, 
    // @ts-ignore
    problemTitle, 
    // @ts-ignore
    problemDescription, 
    // @ts-ignore
    terminalContent, 
    // @ts-ignore
    dashboardImage, 
    // @ts-ignore
    modules 
  } = solution

  // Helper to get image URL
  const getImageUrl = (media: any) => {
    if (!media) return null
    if (typeof media === 'string') return media
    return media.url
  }

  const heroImgUrl = getImageUrl(heroImage)
  const dashboardImgUrl = getImageUrl(dashboardImage)

  // Format terminal lines
  const terminalLines = terminalContent?.map((item: any) => item.line) || []

  // Format modules
  const formattedModules = modules?.map((mod: any) => ({
    title: mod.title,
    description: mod.description,
    icon: mod.icon,
    badge: mod.badge
  })) || []

  return (
    <article className="bg-smatch-black min-h-screen">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <SolutionsHero 
        title={title} 
        subtitle={heroSubtitle || undefined}
        image={heroImgUrl}
      />

      {(problemTitle || problemDescription || terminalLines.length > 0) && (
        <ProblemStatement
          title={problemTitle || ''}
          description={problemDescription || ''}
          terminalLines={terminalLines}
        />
      )}

      {dashboardImgUrl && (
        <UIReveal image={dashboardImgUrl} />
      )}

      {formattedModules.length > 0 && (
        <SystemModules modules={formattedModules} />
      )}
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
  const payload = await getPayload({ config: configPromise })

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
  } catch (error) {
    return null
  }
})
