'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Define the exact props we need for strict typing
export interface SolutionStat {
  value: string
  label: string
}

export interface SolutionCardProps {
  id?: string
  title: string
  subtitle?: string
  description: string
  icon: React.ReactNode
  stats?: SolutionStat[]
  href?: string
  badge?: string
  ctaText?: string
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  stats,
  href = '#',
  badge = 'MOD_02', // Default to match reference
  ctaText,
}) => {
  return (
    <Link href={href} className="block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className="group relative h-full flex flex-col bg-[#0F0F0F]/90 backdrop-blur-xl border border-white/5 p-8 rounded-[24px] overflow-hidden transition-all duration-300 hover:border-[#FFB800]/50 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
      >
        {/* 1. Top Section: Icon & Badge */}
        <div className="flex justify-between items-start mb-8">

          {/* Icon Box - Gold border, dark fill */}
          <div className="flex items-center justify-center w-[48px] h-[48px] rounded-[12px] border border-[#FFB800]/30 bg-[#FFB800]/5 text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black transition-all duration-300">
             {/* Clone element to force size if it's a Phosphor icon */}
             {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<{ size?: number | string; weight?: string }>, { size: 24, weight: 'fill' })
              : icon}
          </div>

          {/* Badge - Terminal Style */}
          <div className="flex items-center px-3 py-1.5 bg-[#151515] rounded-lg border border-white/5 shadow-inner">
            <span className="font-mono text-[11px] font-bold text-[#FFB800] tracking-[0.15em] uppercase">
              {badge}
            </span>
          </div>
        </div>

        {/* 2. Content */}
        <div className="flex-grow flex flex-col justify-end">
          {subtitle && (
            <span className="font-mono text-[#FFB800] text-xs font-bold tracking-widest uppercase mb-2">
              {subtitle}
            </span>
          )}
          <h3 className="font-sans text-[22px] font-bold text-white mb-2 tracking-wide leading-tight group-hover:text-[#FFB800] transition-colors">
            {title}
          </h3>
          <p className="font-sans text-[#888888] text-[15px] leading-relaxed font-medium">
            {description}
          </p>
        </div>

        {/* 3. Stats Footer (Optional) */}
        {stats && stats.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-mono text-[#FFB800] text-lg font-bold">{stat.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600 font-bold mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 4. CTA Button (Optional) */}
        {ctaText && (
          <div className="mt-8">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-[#FFB800] text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-transform transform group-hover:scale-105">
              {ctaText}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        )}

        {/* 4. Hover Glow Effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFB800] blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      </motion.div>
    </Link>
  )
}
