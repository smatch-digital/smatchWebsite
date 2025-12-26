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
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-smatch-black py-32"
    >
      {/* Background Text Effect */}
      <div className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center mix-blend-overlay">
        <motion.span
          style={{
            y: bgTextY,
            opacity: bgTextOpacity,
            WebkitTextStroke: '1.5px rgba(255,255,255,1)',
          }}
          className="whitespace-nowrap font-heading text-[20vw] font-black leading-none text-transparent mix-blend-overlay"
        >
          SMATCH
        </motion.span>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Big Title */}
          <div className="group/text relative flex select-none flex-col lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h2 className="relative z-10 font-heading text-6xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-8xl lg:text-[7rem]">
                {title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                ))}
              </h2>
               {/* Gold Glow behind text */}
               <div className="pointer-events-none absolute -left-10 -top-10 size-[300px] rounded-full bg-smatch-gold/20 blur-[100px]" />
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col justify-center pl-2 pt-8 lg:col-span-6 lg:pl-12 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
                {/* Tag / Decoration */}
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-8 w-1 bg-smatch-gold" />
                  <span className="font-mono text-sm uppercase tracking-[0.2em] text-smatch-gold">
                    {"///"} ABOUT_US
                  </span>
                </div>

              {/* Description */}
              <p className="mb-12 border-l border-white/10 pl-6 text-justify font-sans text-base leading-relaxed text-smatch-text-secondary md:text-lg">
                {description}
              </p>

              {/* Location Button */}
              <div>
                <button className="group relative overflow-hidden rounded-[6px] border border-smatch-border bg-transparent px-8 py-3 transition-colors duration-300 hover:border-smatch-gold">
                  <span className="relative flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-smatch-text-muted transition-colors duration-300 group-hover:text-white">
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
