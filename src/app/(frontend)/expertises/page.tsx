import React from 'react'
import ExpertiseScroll from '@/components/expertise/ExpertiseScroll'
import { ExpertiseHero } from '@/components/expertise/ExpertiseHero'

export const metadata = {
  title: 'Smatch Digital | Expertise',
  description: 'Industrial Solutions, Big Data & AI capabilities.',
}

export default function ExpertisePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* 1. Hero Section */}
      <ExpertiseHero
        title="Domaines D'Excellence."
        subtitle="Une expertise technique unique, déployée sur 3 axes stratégiques : Industrie, Agriculture et Data."
        image="/assets/hero/ExpertiseHero.webp"
      />



      {/* 3. The New Horizontal Scroll Engine */}
      <ExpertiseScroll />
    </main>
  )
}
