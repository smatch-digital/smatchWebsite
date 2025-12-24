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
    <section className="py-24 bg-smatch-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl text-white font-bold mb-4 uppercase tracking-wide">
            {title}
          </h2>
          <p className="text-smatch-text-secondary text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
