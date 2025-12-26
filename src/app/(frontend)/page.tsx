import React from 'react'
import { generateMetadata } from './[slug]/page'
import { Hero } from '@/components/landing/Hero'
import { TrustedBy } from '@/components/landing/TrustedBy'
import { Intro } from '@/components/landing/Intro'
import { Ecosystem } from '@/components/landing/Ecosystem'
import { Domains } from '@/components/landing/Domains'
import { Journal } from '@/components/landing/Journal'
import { WhyChoose } from '@/components/landing/WhyChoose'
import { CTA } from '@/components/landing/CTA'

export default function Page() {
  return (
    <main className="mx-auto  min-h-screen w-full bg-smatch-black font-sans text-smatch-text-primary selection:bg-smatch-gold selection:text-smatch-black">
      <Hero />
      <TrustedBy />
      <Intro />
      <Ecosystem />
      <Domains />
      <Journal />
      <WhyChoose />
      <CTA />
    </main>
  )
}

export { generateMetadata }
