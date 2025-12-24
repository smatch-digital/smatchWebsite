'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function SolutionsCTA() {
  return (
    <section className="relative py-24 md:py-32 bg-smatch-black overflow-hidden flex items-center justify-center">
      {/* Background Image & Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-smatch-black/60 z-10" />
        <Image
          src="/assets/cta/cta-glow-bg.jpg"
          alt="Background Texture"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-smatch-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-20 px-4 text-center flex flex-col items-center">
        {/* Animated Gears / Industrial Element Placeholder */}
        {/* Note: Using a decorative element to match the industrial feel if specific gear asset is unavailable */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 relative"
        >
          {/* We use a subtle ring effect here to mimic the machinery/gears aesthetic if the image is missing */}
          <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-smatch-gold/20 rounded-full flex items-center justify-center relative">
             <div className="absolute inset-0 border border-smatch-gold/10 rounded-full animate-[spin_10s_linear_infinite]" />
             <div className="w-16 h-16 md:w-20 md:h-20 border border-smatch-gold/30 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg"
        >
          Une architecture sur mesure ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="font-sans text-smatch-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Découvrez nos solutions ou contactez notre équipe pour échanger sur vos besoins.
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
            className="min-w-[200px] uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-shadow duration-300"
          >
            CONTACTEZ-NOUS
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
