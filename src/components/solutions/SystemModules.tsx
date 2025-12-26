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
    },
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
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="text-yellow-500 font-mono text-sm tracking-wider font-bold">
              /// SYSTEM_MODULES
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {modules.map((module, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative h-full"
            >
              {/* Card Container */}
              <div
                className="relative h-full flex flex-col justify-between p-8 rounded-2xl
                           bg-neutral-900/50 border border-white/10
                           transition-all duration-300 ease-out
                           hover:border-yellow-500/50 hover:bg-neutral-900/80
                           hover:shadow-[0_0_30px_-10px_rgba(234,179,8,0.15)]"
              >
                {/* Top Row: Icon & Badge */}
                <div className="flex justify-between items-start mb-12">
                  <div
                    className="p-3 rounded-lg bg-white/5 border border-white/10
                               text-yellow-500 group-hover:text-yellow-400
                               group-hover:scale-110 transition-transform duration-300"
                  >
                    <DynamicIcon name={module.icon} className="w-6 h-6" />
                  </div>
                  <span
                    className="px-2 py-1 rounded text-[10px] font-mono font-bold tracking-widest
                               bg-white/5 text-neutral-400 border border-white/5
                               group-hover:text-yellow-500 group-hover:border-yellow-500/30 transition-colors"
                  >
                    {module.badge}
                  </span>
                </div>

                {/* Bottom Row: Content */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {module.description}
                  </p>
                </div>

                {/* Hover Glow Effect (Subtle Gradient) */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-transparent
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
