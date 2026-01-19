'use client'
import React from 'react'
import * as motion from 'framer-motion/client'
import { ArrowRight, Cpu, Globe, ShieldCheck, Factory, Lightning } from '@phosphor-icons/react/dist/ssr'

// Types
type BentoItemSize = '1x1' | '2x1' | '2x2'

interface BentoItem {
  title: string
  description: string
  icon: React.ElementType
  size: BentoItemSize
}

interface BentoGridProps {
  items?: BentoItem[]
}

// Mock Data (if no props provided)
const MOCK_ITEMS: BentoItem[] = [
  {
    title: "Global Connectivity",
    description: "Seamless integration across 100+ industrial protocols and ERP systems.",
    icon: Globe,
    size: '2x2'
  },
  {
    title: "Edge Computing",
    description: "Real-time data processing at the source.",
    icon: Cpu,
    size: '1x1'
  },
  {
    title: "Secure Cloud",
    description: "Enterprise-grade security infrastructure.",
    icon: ShieldCheck,
    size: '1x1'
  },
  {
    title: "Smart Manufacturing",
    description: "AI-driven optimization for production lines.",
    icon: Factory,
    size: '2x1'
  },
  {
    title: "Instant Scalability",
    description: "Elastic resources that grow with your needs.",
    icon: Lightning,
    size: '1x1'
  }
]

export const BentoGrid: React.FC<BentoGridProps> = ({ items = MOCK_ITEMS }) => {
  return (
    <section className="relative overflow-hidden bg-smatch-black py-24">
      <div className="container mx-auto px-4">
        <div className="grid auto-rows-[250px] grid-cols-1 gap-4 md:grid-cols-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                group relative flex flex-col justify-between overflow-hidden 
                rounded-2xl border 
                border-white/10 bg-smatch-surface/50
                p-8 backdrop-blur-md transition-all duration-300 hover:border-smatch-gold hover:shadow-[0_0_30px_-10px_rgba(255,170,0,0.15)]
                ${item.size === '2x2' ? 'md:col-span-2 md:row-span-2' : ''}
                ${item.size === '2x1' ? 'md:col-span-2' : ''}
                ${item.size === '1x1' ? 'md:col-span-1' : ''}
              `}
            >
              {/* Background Glow on Hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-smatch-gold/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Icon */}
              <div className="relative z-10 mb-4 flex size-12 items-center justify-center rounded-lg bg-white/5 transition-colors duration-300 group-hover:bg-smatch-gold group-hover:text-smatch-black">
                <item.icon size={24} weight="fill" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="mb-2 font-heading text-2xl font-bold uppercase tracking-wide text-white transition-colors group-hover:text-smatch-gold">
                  {item.title}
                </h3>
                <p className="font-mono text-sm leading-relaxed text-smatch-text-secondary">
                  {item.description}
                </p>
              </div>

              {/* Decorative Arrow */}
              <div className="absolute right-4 top-4 -translate-x-2 text-smatch-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <ArrowRight size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
