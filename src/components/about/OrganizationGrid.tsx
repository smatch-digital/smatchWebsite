'use client'

import React from 'react'
import { SolutionCard } from '@/components/blocks/SolutionCard'
import { motion } from 'framer-motion'

export interface OrgItem {
  title: string
  description: string
  badge: string
  icon: React.ReactNode
}

export interface OrganizationGridProps {
  title?: string
  subtitle?: string
  items: OrgItem[]
}

export function OrganizationGrid({
  title = 'Organisation',
  subtitle = 'Une organisation pensée pour créer une approche professionnelle, agile et de proximité',
  items
}: OrganizationGridProps) {
  return (
    <section className="relative bg-smatch-black py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-heading text-4xl font-bold uppercase tracking-wide text-white">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-smatch-text-secondary">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <SolutionCard
                title={item.title}
                description={item.description}
                badge={item.badge}
                icon={item.icon}
                href="#"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
