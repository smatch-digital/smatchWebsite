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
  className?: string
}

export function SolutionsHero({
  title = "L'ARSENAL DIGITAL.",
  subtitle = 'Logistique. Mobilité. Industrie X.0. Le moteur de votre transformation commence ici.',
  image,
  className,
}: SolutionsHeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-[70vh] w-full overflow-hidden bg-smatch-black flex items-center justify-center',
        className,
      )}
      aria-label="Solutions Hero"
    >
      {/* Background Gradients & Effects */}
      <div className="bg-grid-white/[0.02] pointer-events-none absolute inset-0 -z-10 size-full" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-transparent to-smatch-black/90" />

      {/* Spotlight Effect - Golden/Yellow hue for "Industry/Premium" feel */}
      <Spotlight className="-top-40 left-0 z-10 opacity-70 md:-top-20 md:left-60" fill="#FFD700" />
      <Spotlight className="right-0 top-20 z-10 opacity-40 md:-top-20 md:right-60" fill="#FFA500" />

      <div className="container relative z-20 mt-16 flex flex-col items-center justify-center px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1], // Custom easing for smooth "luxury" feel
            delay: 0.1,
          }}
          className="mx-auto flex max-w-5xl flex-col items-center"
        >
          {/* Central Visual - Gears */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mb-8 size-64 md:mb-10 md:size-[400px]"
          >
            {/* Glow effect behind the image */}
            <div className="bg-smatch-brand/10 pointer-events-none absolute left-1/2 top-1/2 size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]" />

            <Image
              src={image || "/assets/hero/solutions-iso.png"}
              alt="Industrial Digital Transformation Gears"
              fill
              className="relative z-0 w-full object-contain mix-blend-screen drop-shadow-2xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Typography Group */}
          <div className="max-w-4xl space-y-6 md:space-y-8">
            <h1 className="font-heading text-5xl font-bold uppercase leading-[0.9] tracking-tighter text-white drop-shadow-sm md:text-7xl lg:text-8xl">
              {title}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mx-auto max-w-3xl text-lg font-light leading-relaxed tracking-wide text-smatch-text-secondary md:text-2xl"
            >
              {subtitle}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Fade for smooth transition to content */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-32 w-full bg-gradient-to-t from-smatch-black via-smatch-black/80 to-transparent" />
    </section>
  )
}
