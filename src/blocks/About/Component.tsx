'use client'

import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
} from 'framer-motion'

// Define the Props locally to avoid waiting for Payload type generation
export type AboutBlockProps = {
  headingPart1: string
  headingPart2: string
  tag: string
  description: string
  cta: string
}

export const AboutBlock: React.FC<AboutBlockProps> = (props) => {
  const { headingPart1, headingPart2, tag, description, cta } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Parallax effect for the background text (moves slower than scroll)
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const bgTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.05, 0.1, 0.05],
  )

  // Mouse Interaction Logic for the "Spotlight" effect on headings
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-32 bg-[#050505] relative overflow-hidden flex items-center min-h-[90vh]"
    >
      {/* 1. Top Yellow Glow (Ambient Light) */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[60vw] h-[200px] bg-[#FFB800] opacity-70 blur-[150px] pointer-events-none z-0" />

      {/* 2. Parallax Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 mix-blend-overlay">
        <motion.span
          style={{
            y: bgTextY,
            opacity: bgTextOpacity,
            WebkitTextStroke: '1.5px rgba(255,255,255,1)',
          }}
          className="text-[50vw] font-black font-heading text-transparent leading-none whitespace-nowrap mix-blend-overlay"
        >
          SMATCH
        </motion.span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headings */}
          <div className="lg:col-span-7 flex flex-col select-none relative group/text">
            {/* Animated Entry Wrapper */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Solid White Text */}
              <h2 className="font-heading text-7xl md:text-8xl lg:text-[11rem] font-black text-white leading-[0.85] tracking-tighter uppercase relative z-10">
                {headingPart1}
              </h2>

              {/* Outlined Gold Text with Hover Fill Effect */}
              <div className="relative">
                {/* The Stroke Version */}
                <h2
                  className="font-heading text-7xl md:text-8xl lg:text-[11rem] font-black text-transparent leading-[0.85] tracking-tighter uppercase relative left-1 md:left-4 z-10 transition-colors duration-500"
                  style={{ WebkitTextStroke: '2px #FFB800' }}
                >
                  {headingPart2}
                </h2>

                {/* The "Filling" Version (clip-path animation could go here, but let's do a glow) */}
                <motion.div className="absolute inset-0 bg-[#FFB800] blur-[80px] opacity-0 group-hover/text:opacity-20 transition-opacity duration-700 pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center pt-8 lg:pt-0 pl-2 lg:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              {/* Tag */}
              <div className="mb-8 flex items-center gap-3">
                <span className="w-1 h-4 bg-[#FFB800]" /> {/* Small accent bar */}
                <span className="font-mono text-sm text-gray-500 tracking-[0.2em] uppercase">
                  {tag}
                </span>
              </div>

              {/* Description */}
              <p className="font-sans text-[#A0A0A0] text-sm md:text-[15px] leading-relaxed text-justify mb-12 max-w-lg border-l border-white/10 pl-6">
                {description}
              </p>

              {/* CTA Button */}
              <div>
                <button className="group relative px-8 py-3 border border-gray-800 rounded-[6px] bg-transparent overflow-hidden transition-colors duration-300">
                  {/* Hover Background Fill */}
                  <span className="absolute inset-0 bg-[#FFB800] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

                  {/* Text Content */}
                  <span className="relative flex items-center gap-4 text-gray-500 text-xs font-bold tracking-[0.2em] uppercase group-hover:text-black transition-colors duration-300">
                    {cta}
                    {/* Tiny animated arrow */}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      &rarr;
                    </span>
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
