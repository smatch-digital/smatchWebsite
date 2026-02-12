'use client'

import React from 'react'
import { motion } from 'framer-motion'
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
  /**
   * Optional override for the main headline.
   */
  title?: string
  /**
   * Optional override for the subtitle.
   */
  subtitle?: string
  /**
   * Optional override for the hero image.
   */
  image?: string | null
  /**
   * If true, the image will be used as a full-bleed background.
   */
  fullBleed?: boolean
  /**
   * Current locale for default text selection.
   */
  locale?: string
  className?: string
}

export function SolutionsHero({
  title,
  subtitle,
  image,
  fullBleed = true,
  locale = 'en',
  className,
}: SolutionsHeroProps) {
  const defaults = heroDefaults[locale] || heroDefaults.en
  const resolvedTitle = title || defaults.title
  const resolvedSubtitle = subtitle || defaults.subtitle

  // Full-bleed mode for detail pages (Project Page usually uses this)
  if (fullBleed || image) {
    return (
      <section
        className={cn(
          'relative mx-auto w-full flex h-screen min-h-[90vh] items-center justify-center overflow-hidden bg-smatch-black',
          className,
        )}
        aria-label="Solutions Hero"
      >
        {/* Background Effects */}
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60 " fill="#FFAA00" />
        <Spotlight
          className="-top-40 left-0 opacity-50 mix-blend-overlay md:-top-40 md:left-10"
          fill="#FFE6A1"
        />
        <Spotlight className="-top-40 left-0 md:-top-40 md:left-[30rem]" fill="#FFAA00" />

        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0 size-full ">
          {image && (
            <Image
              src={image}
              alt={resolvedTitle}
              fill
              className="object-cover "
              priority
            />
          )}
        </div>

        <div className="container relative z-10 flex flex-col items-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="mb-6 max-w-5xl font-heading text-6xl font-bold uppercase leading-none tracking-tight text-white drop-shadow-md md:text-7xl lg:text-8xl">
              {resolvedTitle}
            </h1>
            <p className="mb-10 max-w-2xl text-sm font-light text-white md:text-xl">{resolvedSubtitle}</p>
          </motion.div>
        </div>
      </section>
    )
  }

  // Fallback / Default mode (similar to SmatchHero but without image if none provided)
  return (
    <section
      className={cn(
        'relative mx-auto flex h-screen min-h-[90vh] items-center justify-center overflow-hidden bg-smatch-black',
        className,
      )}
      aria-label="Solutions Hero"
    >
      {/* Background Effects */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60 " fill="#FFAA00" />
      <Spotlight
        className="-top-40 left-0 opacity-50 mix-blend-overlay md:-top-40 md:left-10"
        fill="#FFE6A1"
      />
      <Spotlight className="-top-40 left-0 md:-top-40 md:left-[30rem]" fill="#FFAA00" />

      <div className="container relative z-10 flex flex-col items-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          className="flex flex-col items-center"
        >
          {/* Typography */}
          <h1 className="mb-6 max-w-5xl font-heading text-8xl font-bold uppercase leading-none tracking-tight text-white drop-shadow-md md:text-7xl lg:text-8xl">
            {resolvedTitle}
          </h1>

          <p className="mb-10 max-w-2xl text-lg font-light text-white md:text-xl">{resolvedSubtitle}</p>
        </motion.div>
      </div>
    </section>
  )
}
