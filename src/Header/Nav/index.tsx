'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center z-50">
      {/* Glassmorphism Pill Container */}
      <div className="flex items-center gap-1 p-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg">

        {/* Home Button (Active State Simulation) */}
        <div className="px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
           <span className="font-sans font-bold text-sm tracking-widest text-white uppercase">HOME</span>
        </div>

        {/* Other Links */}
        <div className="flex items-center gap-6 px-6">
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className="font-sans font-medium text-sm tracking-widest text-white/80 hover:text-smatch-gold uppercase transition-colors"
              />
            )
          })}
          {/* Fallback Static Links if CMS is empty during dev */}
          {navItems.length === 0 && (
            <>
              <a href="#" className="font-sans font-medium text-sm tracking-widest text-white/80 hover:text-smatch-gold uppercase transition-colors">A PROPOS</a>
              <a href="#" className="font-sans font-medium text-sm tracking-widest text-white/80 hover:text-smatch-gold uppercase transition-colors">SOLUTIONS</a>
              <a href="#" className="font-sans font-medium text-sm tracking-widest text-white/80 hover:text-smatch-gold uppercase transition-colors">PROJECTS</a>
              <a href="#" className="font-sans font-medium text-sm tracking-widest text-white/80 hover:text-smatch-gold uppercase transition-colors">EXPERTISES</a>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}
