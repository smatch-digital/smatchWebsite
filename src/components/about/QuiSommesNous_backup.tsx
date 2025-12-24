'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export interface QuiSommesNousProps {
  title: string
  description: string
  locationLabel?: string
}

export function QuiSommesNous({
  title = 'QUI SOMMES NOUS?',
  description,
  locationLabel = 'CASABLANCA, MA',
}: QuiSommesNousProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Parallax for background text
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.1, 0.05])

  return (
    <section
      ref={containerRef}
      className="py-32 bg-smatch-black relative overflow-hidden flex items-center min-h-[80vh]"
    >
      {/* Background Text Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 mix-blend-overlay">
        <motion.span
          style={{
            y: bgTextY,
            opacity: bgTextOpacity,
            WebkitTextStroke: '1.5px rgba(255,255,255,1)',
          }}
          className="text-[20vw] font-black font-heading text-transparent leading-none whitespace-nowrap mix-blend-overlay"
        >
          SMATCH
        </motion.span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Big Title */}
          <div className="lg:col-span-6 flex flex-col select-none relative group/text">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h2 className="font-heading text-6xl md:text-8xl lg:text-[7rem] font-black text-white leading-[0.9] tracking-tighter uppercase relative z-10">
                {title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                ))}
              </h2>
               {/* Gold Glow behind text */}
               <div className="absolute -top-10 -left-10 w-[300px] h-[300px] bg-smatch-gold/20 blur-[100px] rounded-full pointer-events-none" />
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6 flex flex-col justify-center pt-8 lg:pt-0 pl-2 lg:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              {/* Tag / Decoration */}
              <div className="mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-smatch-gold" />
                <span className="font-mono text-sm text-smatch-gold tracking-[0.2em] uppercase">
                  /// ABOUT_US
                </span>
              </div>

              {/* Description */}
              <p className="font-sans text-smatch-text-secondary text-base md:text-lg leading-relaxed text-justify mb-12 border-l border-white/10 pl-6">
                {description}
              </p>

              {/* Location Button */}
              <div>
                <button className="group relative px-8 py-3 border border-smatch-border rounded-[6px] bg-transparent overflow-hidden transition-colors duration-300 hover:border-smatch-gold">
                  <span className="relative flex items-center gap-4 text-smatch-text-muted text-xs font-bold tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
                    {locationLabel}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
