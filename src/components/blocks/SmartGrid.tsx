'use client'
import React from 'react'
import * as motion from 'framer-motion/client'
import { SolutionCard, SolutionCardProps } from './SolutionCard'

interface SmartGridProps {
  items: SolutionCardProps[]
  columns?: 2 | 3 | 4
  className?: string
}

export const SmartGrid: React.FC<SmartGridProps> = ({ items, columns = 3, className = '' }) => {
  // Map column count to Tailwind grid classes
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="h-full"
        >
          <SolutionCard {...item} />
        </motion.div>
      ))}
    </div>
  )
}
