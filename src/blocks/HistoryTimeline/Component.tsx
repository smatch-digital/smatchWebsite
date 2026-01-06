'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import type { HistoryTimelineBlock } from '@/payload-types'

export const HistoryTimelineBlockComponent: React.FC<HistoryTimelineBlock> = ({
  title = "Historique de l'entreprise",
  events
}) => {
  const safeEvents = events || []

  return (
    <section className="relative overflow-hidden bg-[#050505] py-32">
      {/* Background Radial Glow (Left Side) */}
      <div className="pointer-events-none absolute left-0 top-1/2 size-[600px] -translate-y-1/2 bg-gradient-to-r from-[#FFB800]/10 to-transparent opacity-40 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 text-center font-heading text-3xl font-bold uppercase tracking-wide text-white md:text-4xl"
        >
          {title}
        </motion.h2>

        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-y-0 left-[20px] w-px origin-top -translate-x-1/2 bg-gradient-to-b from-white/5 via-smatch-gold to-white/5 md:inset-x-0 md:mx-auto md:translate-x-0"
          />

          <div className="flex flex-col gap-24">
            {safeEvents.map((event, index) => {
              const isEven = index % 2 === 0

              // Define variants inside to use isEven logic easily
              const rowVariants: Variants = {
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    when: "beforeChildren",
                    staggerChildren: 0.15
                  }
                }
              }

              const contentVariants: Variants = {
                hidden: { opacity: 0, x: isEven ? -50 : 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                }
              }

              const nodeVariants: Variants = {
                hidden: { scale: 0, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 200, damping: 20 }
                }
              }

              const versionVariants: Variants = {
                hidden: { opacity: 0, x: isEven ? 50 : -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                }
              }

              return (
                <motion.div
                  key={event.id || index}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex items-center md:justify-between ${isEven ? 'flex-row' : 'flex-row md:flex-row-reverse'
                    }`}
                >
                  {/* Content Side (Title & Desc) */}
                  <motion.div
                    variants={contentVariants}
                    className={`w-full pl-16 md:w-[45%] md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}
                  >
                    <div className="group">
                      {/* Date - visible and clear */}
                      {event.year && (
                        <span className={`mb-2 block font-mono text-xs font-semibold uppercase tracking-widest ${event.isCurrent ? 'text-smatch-gold' : 'text-gray-500'}`}>
                          {event.year}
                        </span>
                      )}
                      <h3 className={`mb-2 font-heading text-3xl font-bold uppercase tracking-tight transition-colors duration-300 md:text-4xl ${event.isCurrent ? 'text-smatch-gold' : 'text-white group-hover:text-smatch-gold'}`}>
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="font-mono text-sm uppercase leading-relaxed tracking-wide text-gray-500 md:text-base">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* Node on Line */}
                  <motion.div
                    variants={nodeVariants}
                    className="absolute left-[20px] z-10 flex size-12 -translate-x-1/2 items-center justify-center md:inset-x-0 md:mx-auto md:translate-x-0"
                  >
                    {/* Glow Effect for Current Node */}
                    {event.isCurrent && (
                      <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-smatch-gold/30 blur-md" />
                    )}

                    <div className={`relative z-10 size-3 rounded-full backdrop-blur-md transition-colors duration-300 ${event.isCurrent ? 'bg-smatch-gold shadow-[0_0_15px_#FFC800]' : 'border border-white/20 bg-smatch-gold/10'}`} />
                  </motion.div>

                  {/* Version Tag Side */}
                  <motion.div
                    variants={versionVariants}
                    className={`hidden w-[45%] items-center md:flex ${isEven ? 'justify-start' : 'justify-end'}`}
                  >
                    {event.isCurrent ? (
                      <div className="rounded-[2px] border border-smatch-gold bg-smatch-gold/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-smatch-gold">
                        {event.version || 'CURRENT'}
                      </div>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600">
                        {event.version}
                      </span>
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
