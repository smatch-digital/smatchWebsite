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

        <span className="font-mono text-smatch-gold text-xs font-bold tracking-[0.2em] uppercase">
          //{tag}
        </span>
        
      </div>

      {/* 2. The Main Title */}
      <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white tracking-tight leading-none">
        {title}
      </h2>

      {/* 3. Optional Description */}
      {description && (
        <p className="max-w-2xl text-smatch-text-secondary text-base md:text-lg leading-relaxed mt-2">
          {description}
        </p>
      )}
    </div>
  )
}
