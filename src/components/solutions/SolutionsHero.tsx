'use client'

import React from 'react'
import Image from 'next/image'
import { Spotlight } from '@/components/ui/spotlight'
import { cn } from '@/utilities/ui'

// --- Static text by locale ---
const heroDefaults: Record<string, { title: string; subtitle: string }> = {
  fr: {
    title: "L'ARSENAL DIGITAL.",
    subtitle: 'Logistique, traçabilité, Concept 4.0, Traitement des données… le moteur de votre transformation digital commence ici.',
  },
  en: {
    title: 'THE DIGITAL ARSENAL.',
    subtitle: 'Logistics, traceability, Concept 4.0, Data processing… the engine of your digital transformation starts here.',
  },
}

interface SolutionsHeroProps {
  title?: string
  subtitle?: string
  image?: string | null
  locale?: string
  className?: string
}

export function SolutionsHero({
  title,
  subtitle,
  image,
  locale = 'en',
  className,
}: SolutionsHeroProps) {
  const defaults = heroDefaults[locale] || heroDefaults.en
  const resolvedTitle = title || defaults.title
  const resolvedSubtitle = subtitle || defaults.subtitle

  return (
    <section
      className={cn(
        'relative flex h-[80vh] min-h-[80vh] items-center justify-center overflow-hidden bg-smatch-black',
        className,
      )}
      aria-label="Solutions Hero"
    >
      {/* Background Effects — identical to SmatchHero */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#FFAA00" />
      <Spotlight
        className="-top-40 left-0 opacity-50 mix-blend-overlay md:-top-40 md:left-10"
        fill="#FFE6A1"
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0 size-full">
        {image && (
          <Image
            src={image}
            alt={resolvedTitle}
            fill
            className="object-cover object-center"
            priority
          />
        )}
      </div>

      {/* Content — same structure as SmatchHero */}
      <div className="container relative z-10 flex flex-col items-center px-4 text-center">
        <h1 className="mb-6 max-w-5xl font-heading text-6xl font-bold uppercase leading-none tracking-tight text-white drop-shadow-md md:text-7xl lg:text-8xl">
          {resolvedTitle}
        </h1>

        <p className="mb-10 max-w-2xl text-sm font-light text-white md:text-xl">
          {resolvedSubtitle}
        </p>
      </div>
    </section>
  )
}
