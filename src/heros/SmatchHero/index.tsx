import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const SmatchHero: React.FC<Page['hero']> = ({
  headline,
  subheadline,
  enableCta,
  primaryCta,
  secondaryCta,
  media,
}) => {
  return (
    <section className="relative mx-auto min-h-[90vh] flex items-center justify-center overflow-hidden bg-smatch-black pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 mix-blend-screen z-0">
        {media && typeof media === 'object' && (
          <Media resource={media} fill imgClassName="mix-blend-screen object-cover" />
        )}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-smatch-black via-transparent to-smatch-black opacity-90" /> */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-smatch-gold/10 rounded-full blur-[100px] animate-pulse" />
        {/* <div className="absolute inset-0 bg-[url('/assets/hero/hero-overlay.png')] opacity-10 bg-repeat" /> */}
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center px-4">
        {/* Top Gold Arc Effect (CSS Mock) */}

        <h1 className="font-heading text-5xl drop-shadow-md md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight uppercase max-w-5xl leading-none">
          {headline}
        </h1>

        <p className="text-smatch-text-secondary text-lg md:text-xl max-w-2xl mb-10">
          {subheadline}
        </p>

        {enableCta && (
          <div className="flex flex-col sm:flex-row gap-4">
            <CMSLink {...secondaryCta} className="min-w-[200px] uppercase tracking-wider" />
            <CMSLink {...primaryCta} className="min-w-[200px] uppercase tracking-wider" />
          </div>
        )}
      </div>
    </section>
  )
}
