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
  className?: string
}

export function SolutionsHero({
  title = "L'ARSENAL DIGITAL.",
  subtitle = 'Logistique. Mobilité. Industrie X.0. Le moteur de votre transformation commence ici.',
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
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-smatch-black/90 pointer-events-none z-0" />

      {/* Spotlight Effect - Golden/Yellow hue for "Industry/Premium" feel */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 z-10 opacity-70" fill="#FFD700" />
      <Spotlight className="top-20 right-0 md:right-60 md:-top-20 z-10 opacity-40" fill="#FFA500" />

      <div className="container relative z-20 flex flex-col items-center justify-center text-center px-4 md:px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1], // Custom easing for smooth "luxury" feel
            delay: 0.1,
          }}
          className="flex flex-col items-center max-w-5xl mx-auto"
        >
          {/* Central Visual - Gears */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-64 h-64 md:w-[400px] md:h-[400px] mb-8 md:mb-10"
          >
            {/* Glow effect behind the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-smatch-brand/10 blur-[80px] rounded-full pointer-events-none" />

            <Image
              src="/assets/domains/solutions-iso.png"
              alt="Industrial Digital Transformation Gears"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Typography Group */}
          <div className="space-y-6 md:space-y-8 max-w-4xl">
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-white drop-shadow-sm leading-[0.9]">
              {title}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-smatch-text-secondary text-lg md:text-2xl font-light tracking-wide max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Fade for smooth transition to content */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-smatch-black via-smatch-black/80 to-transparent pointer-events-none z-10" />
    </section>
  )
}
