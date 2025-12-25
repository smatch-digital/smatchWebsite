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
    <section className="py-32 bg-[#050505] relative overflow-hidden">
       {/* Background Radial Glow (Left Side) */}
       <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#FFB800]/10 to-transparent blur-[120px] pointer-events-none opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-heading text-3xl md:text-4xl text-white font-bold text-center mb-24 uppercase tracking-wide"
        >
          {title}
        </motion.h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[20px] -translate-x-1/2 md:translate-x-0 md:left-0 md:right-0 md:mx-auto top-0 bottom-0 w-px bg-gradient-to-b from-white/5 via-smatch-gold to-white/5 origin-top"
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
                  className={`relative flex items-center md:justify-between ${
                    isEven ? 'flex-row' : 'flex-row md:flex-row-reverse'
                  }`}
                >
                  {/* Content Side (Title & Desc) */}
                  <motion.div
                    variants={contentVariants}
                    className={`pl-16 md:pl-0 w-full md:w-[45%] ${isEven ? 'md:text-right' : 'md:text-left'}`}
                  >
                    <div className="group">
                        <h3 className={`font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2 transition-colors duration-300 ${event.isCurrent ? 'text-smatch-gold' : 'text-white group-hover:text-smatch-gold'}`}>
                            {event.title}
                        </h3>
                        {event.description && (
                            <p className="font-mono text-gray-500 text-sm md:text-base leading-relaxed uppercase tracking-wide">
                                {event.description}
                            </p>
                        )}
                    </div>
                  </motion.div>

                  {/* Node on Line */}
                  <motion.div
                    variants={nodeVariants}
                    className="absolute left-[20px] -translate-x-1/2 md:translate-x-0 md:left-0 md:right-0 md:mx-auto flex items-center justify-center z-10 w-12 h-12"
                  >
                      {/* Glow Effect for Current Node */}
                      {event.isCurrent && (
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-smatch-gold/30 rounded-full blur-md animate-pulse" />
                      )}

                      <div className={`relative z-10 w-3 h-3 rounded-full transition-colors duration-300 backdrop-blur-md ${event.isCurrent ? 'bg-smatch-gold shadow-[0_0_15px_#FFC800]' : 'bg-smatch-gold/10 border border-white/20'}`} />
                  </motion.div>

                  {/* Version Tag Side */}
                  <motion.div
                    variants={versionVariants}
                    className={`hidden md:flex w-[45%] items-center ${isEven ? 'justify-start' : 'justify-end'}`}
                  >
                      {event.isCurrent ? (
                          <div className="px-3 py-1 border border-smatch-gold text-smatch-gold text-[10px] font-mono font-bold tracking-widest uppercase rounded-[2px] bg-smatch-gold/5">
                              {event.version || 'CURRENT'}
                          </div>
                      ) : (
                          <span className="font-mono text-gray-600 text-[10px] tracking-widest uppercase">
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
