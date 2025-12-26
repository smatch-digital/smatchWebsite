import React from 'react'
import { generateMetadata } from './[slug]/page'
import { Hero } from '@/components/landing/Hero'
import { TrustedBy } from '@/components/landing/TrustedBy'
import { Intro } from '@/components/landing/Intro'
import { Ecosystem } from '@/components/landing/Ecosystem'
import { Domains } from '@/components/landing/Domains'
import { Journal, JournalArticle } from '@/components/landing/Journal'
import { WhyChoose } from '@/components/landing/WhyChoose'
import { CTA } from '@/components/landing/CTA'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function Page() {
  let journalArticles: JournalArticle[] = []

  // Wrap in try-catch to handle case where projects table doesn't exist yet
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs: latestActivities } = await payload.find({
      collection: 'projects',
      limit: 5,
      sort: '-date',
    })

    journalArticles = latestActivities.map((doc) => {
      const imageUrl = typeof doc.image === 'object' && doc.image?.url ? doc.image.url : '/assets/journal/placeholder.jpg'
      return {
        id: doc.id,
        meta: `${new Date(doc.date || '').getFullYear()} | ${doc.type === 'event' ? 'ÉVÉNEMENT' : 'PROJET'}`,
        title: doc.title,
        description: doc.description || '',
        linkText: doc.linkLabel || 'VOIR LES DÉTAILS',
        linkUrl: `/projects/${doc.slug}`,
        image: imageUrl,
      }
    })
  } catch (error) {
    // Table might not exist yet - use fallback data
    console.warn('Could not fetch projects for Journal, using fallback:', error)
  }

  return (
    <main className="mx-auto min-h-screen w-full bg-smatch-black font-sans text-smatch-text-primary selection:bg-smatch-gold selection:text-smatch-black">
      <Hero />
      <TrustedBy />
      <Intro />
      <Ecosystem />
      <Domains />
      <Journal articles={journalArticles} />
      <WhyChoose />
      <CTA />
    </main>
  )
}

export { generateMetadata }
