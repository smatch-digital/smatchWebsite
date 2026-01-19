'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Spotlight } from '@/components/ui/spotlight'
import { cn } from '@/utilities/ui'

interface SolutionsHeroProps {
  /**
   * Optional override for the main headline.
   * Defaults to "L'ARSENAL DIGITAL."
   */
  title?: string
  /**
   * Optional override for the subtitle.
   * Defaults to "Logistique. Mobilité. Industrie X.0. Le moteur de votre transformation commence ici."
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
  className?: string
}

export function SolutionsHero({
  title = "L'ARSENAL DIGITAL.",
  subtitle = 'Logistique, traçabilité, Concept 4.0, Traitement des données… le moteur de votre transformation digital commence ici.',
  image,
  fullBleed = true,
  className,
}: SolutionsHeroProps) {
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
              alt={title}
              fill
              className="object-cover "
              priority
            />
          )}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-smatch-black via-transparent to-smatch-black opacity-90" /> */}
        </div>

        <div className="container relative z-10 flex flex-col items-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="mb-6 max-w-5xl font-heading text-6xl font-bold uppercase leading-none tracking-tight text-white drop-shadow-md md:text-7xl lg:text-8xl">
              {title}
            </h1>
            <p className="mb-10 max-w-2xl text-sm font-light text-white md:text-xl">{subtitle}</p>
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
            {title}
          </h1>

          <p className="mb-10 max-w-2xl text-lg font-light text-white md:text-xl">{subtitle}</p>
        </motion.div>
      </div>
    </section>
  )
}
