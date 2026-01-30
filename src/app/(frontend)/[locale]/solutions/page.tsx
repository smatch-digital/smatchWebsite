import type { Metadata } from 'next'
import { getPayload } from '@/getPayload'
import { SolutionsHero } from '@/components/solutions/SolutionsHero'
import { SolutionsGrid } from '@/components/solutions/SolutionsGrid'
import { SolutionsCTA } from '@/components/solutions/SolutionsCTA'
import { i18nConfig, isValidLocale, type Locale } from '@/utilities/i18n'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Solutions | Smatch Digital',
  description:
    'Logistique, traçabilité, Concept 4.0, Traitement des données… le moteur de votre transformation digital commence ici.',
}

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

export default async function SolutionsPage({ params }: Args) {
  const { locale } = await params

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound()
  }

  // 1. Initialize Payload
  const payload = await getPayload()

  // 2. Fetch all published solutions WITH locale
  const { docs: solutions } = await payload.find({
    collection: 'solutions',
    draft: false,
    locale: locale as Locale, // CRITICAL: Pass locale to get string values
    sort: 'order',
    select: {
      title: true,
      slug: true,
      heroSubtitle: true,
      description: true,
      icon: true,
      heroImage: true,
    },
  })

  return (
    <main className="flex w-full flex-col">
      <SolutionsHero image={'/assets/hero/SolutionHero.webp'} />
      {/* 3. Pass the fetched data to the Grid */}
      <SolutionsGrid solutions={solutions} />
      <SolutionsCTA />
    </main>
  )
}
