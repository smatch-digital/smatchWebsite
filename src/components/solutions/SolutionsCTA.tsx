'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

// --- Static text by locale ---
const ctaText: Record<string, { heading: string; description: string; button: string }> = {
  fr: {
    heading: 'Une architecture sur mesure ?',
    description: 'Découvrez nos solutions ou contactez notre équipe pour échanger sur vos besoins.',
    button: 'CONTACTEZ-NOUS',
  },
  en: {
    heading: 'Need a custom architecture?',
    description: 'Explore our solutions or contact our team to discuss your needs.',
    button: 'CONTACT US',
  },
}

interface SolutionsCTAProps {
  locale?: string
}

export function SolutionsCTA({ locale = 'en' }: SolutionsCTAProps) {
  const t = ctaText[locale] || ctaText.en

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-smatch-black py-24 md:py-32">
      {/* Background Image & Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-smatch-black/60" />
        <Image
          src="/assets/cta/cta-glow-bg.jpg"
          alt="Background Texture"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      {/* Central Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-smatch-gold/10 blur-[100px]" />

      <div className="container relative z-20 flex flex-col items-center px-4 text-center">
        {/* Animated Gears / Industrial Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mb-8"
        >
          <div className="relative flex size-24 items-center justify-center rounded-full border-2 border-smatch-gold/20 md:size-32">
            <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border border-smatch-gold/10" />
            <div className="size-16 animate-[spin_8s_linear_infinite_reverse] rounded-full border border-smatch-gold/30 md:size-20" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-6 font-heading text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl"
        >
          {t.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl font-sans text-lg leading-relaxed text-smatch-text-secondary md:text-xl"
        >
          {t.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            variant="gold"
            size="lg"
            className="min-w-[200px] bg-[#FFAA00] font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-shadow duration-300 hover:bg-[#D99200] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]"
          >
            {t.button}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
