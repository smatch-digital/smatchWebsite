import React from 'react'
import { cn } from '@/utilities/ui'

interface SectionHeaderProps {
  tag: string        // e.g. "// OUR CAPABILITIES"
  title: string      // e.g. "INTELLIGENT INVENTORY"
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  description,
  align = 'center',
  className
}) => {
  return (
    <div className={cn(
      "flex flex-col gap-4 mb-16",
      align === 'center' ? 'items-center text-center' : 'items-start text-left',
      className
    )}>

      {/* 1. The "Tag" with Gold Bar decoration */}
      <div className="flex items-center gap-3">

        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-smatch-gold">
          {'//'}{tag}
        </span>

      </div>

      {/* 2. The Main Title */}
      <h2 className="font-heading text-4xl font-bold uppercase leading-none tracking-tight text-white md:text-5xl">
        {title}
      </h2>

      {/* 3. Optional Description */}
      {description && (
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-smatch-text-secondary md:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
