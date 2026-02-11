import React from 'react'
import type { FunctionalityBenefitsBlock as FunctionalityBenefitsBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const FunctionalityBenefitsBlock: React.FC<FunctionalityBenefitsBlockProps> = ({
  sectionHeader,
  benefits,
}) => {
  return (
    <section className="relative bg-[#0F0F0F] py-24 lg:py-32 overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-[0.03]" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center md:mb-28">
          <h2 className="mb-8 font-heading text-3xl font-black uppercase tracking-tighter text-white md:text-4xl lg:text-5xl">
            {sectionHeader?.title}
          </h2>
          {sectionHeader?.description && (
            <p className="font-sans text-lg font-light leading-relaxed text-gray-400 md:text-xl">
              {sectionHeader.description}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits?.map((benefit, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#FFAA00]/30 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-[#FFAA00]/5"
            >
              {/* Icon */}
              <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#FFAA00] transition-all duration-500 group-hover:scale-110 group-hover:border-[#FFAA00]/50 group-hover:bg-[#FFAA00] group-hover:text-black shadow-lg shadow-black/50">
                {benefit.icon && typeof benefit.icon !== 'string' && (
                  <Media resource={benefit.icon} className="h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-110" />
                )}
              </div>

              <h3 className="mb-4 font-heading text-xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#FFAA00]">
                {benefit.title}
              </h3>
              <p className="font-sans text-base leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                {benefit.description}
              </p>

              {/* Decorative corner glow */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FFAA00]/10 blur-[60px] transition-all duration-500 group-hover:bg-[#FFAA00]/20" />
              
              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#FFAA00] to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
