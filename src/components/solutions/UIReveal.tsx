'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

interface UIRevealProps {
  image?: string | null
  className?: string
}

export function UIReveal({ image, className }: UIRevealProps) {
  if (!image) return null

  return (
    <section className={cn('relative w-full py-24  overflow-hidden', className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="mx-auto mb-8 w-full max-w-7xl">
            <p className="text-smatch-brand mb-4 font-mono text-xs uppercase tracking-widest">
              {'/// UI_REVEAL'}
            </p>
          </div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0.5, y: 40 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl"
          >
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent" />

            <Image
              src={image}
              alt="Platform Dashboard UI"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
