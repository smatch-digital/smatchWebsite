'use client'

import React from 'react'
import { motion } from 'framer-motion'

export interface TimelineEvent {
  year: string
  title: string
  description?: string
}

export interface HistoryTimelineProps {
  title?: string
  events: TimelineEvent[]
}

export function HistoryTimeline({
  title = 'Historique de l\'entreprise',
  events
}: HistoryTimelineProps) {
  return (
    <section className="py-24 bg-smatch-black relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="font-heading text-4xl text-white font-bold text-center mb-16 uppercase tracking-wide">
          {title}
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-smatch-gold to-transparent md:-translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {events.map((event, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center md:justify-between ${
                    isEven ? 'flex-row' : 'flex-row md:flex-row-reverse'
                  }`}
                >
                  {/* Content Side */}
                  <div className={`pl-16 md:pl-0 w-full md:w-[45%] ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="group">
                        <span className="font-mono text-smatch-gold text-lg font-bold mb-1 block group-hover:text-white transition-colors">{event.year}</span>
                        <h3 className="font-heading text-2xl md:text-3xl text-white font-bold uppercase tracking-tight group-hover:text-smatch-gold transition-colors">{event.title}</h3>
                        {event.description && (
                            <p className="mt-2 text-smatch-text-secondary text-sm">{event.description}</p>
                        )}
                    </div>
                  </div>

                  {/* Node on Line */}
                  <div className="absolute left-[16px] md:left-1/2 w-[9px] h-[9px] bg-smatch-black border-2 border-smatch-gold rounded-full z-10 md:-translate-x-1/2 shadow-[0_0_10px_#FFC800]" />

                  {/* Empty Side for spacing */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
