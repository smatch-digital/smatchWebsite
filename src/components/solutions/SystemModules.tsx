'use client'

import React from 'react'
import { motion } from 'framer-motion'
import * as PhosphorIcons from '@phosphor-icons/react'
import { cn } from '@/utilities/ui'

// --- Types ---

export interface SystemModule {
  title: string
  description: string
  icon: string
  badge: string
}

interface SystemModulesProps {
  modules: SystemModule[]
  className?: string
}

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    } as const,
  },
}

// --- Helper Component ---

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  // Safe cast to access icon by string key
  // Phosphor icons are usually PascalCase (e.g. "House", "User")
  const IconComponent = (PhosphorIcons as any)[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in @phosphor-icons/react`)
    // Fallback icon
    return <PhosphorIcons.Question className={className} size={24} />
  }

  // Phosphor icons accept size and weight props
  return <IconComponent className={className} size={24} weight="fill" />
}

// --- Main Component ---

export const SystemModules: React.FC<SystemModulesProps> = ({ modules, className }) => {
  return (
    <section className={cn('relative w-full py-24 bg-smatch-background overflow-hidden', className)}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2"
          >
            <span className="font-mono text-sm font-bold tracking-wider text-yellow-500">
              {'/// SYSTEM_MODULES'}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Spécifications
          </motion.h2>
        </div>

        {/* Modules Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {modules.map((module, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative h-full"
            >
              {/* Card Container */}
              <div
                className="relative flex h-full flex-col justify-between rounded-2xl border
                           border-white/10 bg-neutral-900/50 p-8
                           transition-all duration-300 ease-out
                           hover:border-yellow-500/50 hover:bg-neutral-900/80
                           hover:shadow-[0_0_30px_-10px_rgba(234,179,8,0.15)]"
              >
                {/* Top Row: Icon & Badge */}
                <div className="mb-12 flex items-start justify-between">
                  <div
                    className="rounded-lg border border-white/10 bg-white/5 p-3
                               text-yellow-500 transition-transform
                               duration-300 group-hover:scale-110 group-hover:text-yellow-400"
                  >
                    <DynamicIcon name={module.icon} className="size-6" />
                  </div>
                  <span
                    className="rounded border border-white/5 bg-white/5 px-2 py-1 font-mono
                               text-[10px] font-bold tracking-widest text-neutral-400
                               transition-colors group-hover:border-yellow-500/30 group-hover:text-yellow-500"
                  >
                    {module.badge}
                  </span>
                </div>

                {/* Bottom Row: Content */}
                <div>
                  <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-yellow-500">
                    {module.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {module.description}
                  </p>
                </div>

                {/* Hover Glow Effect (Subtle Gradient) */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/5
                             to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
