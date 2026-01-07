'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Spotlight } from '@/components/ui/spotlight'

export const SmatchHero: React.FC<Page['hero']> = ({
  headline,
  subheadline,
  enableCta,
  primaryCta,
  secondaryCta,
  media,
}) => {
  return (
    <section className="relative mx-auto flex h-[80vh] min-h-[80vh] items-center justify-center overflow-hidden bg-smatch-black">
      {/* Background Effects */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60 " fill="#FFC800" />
      <Spotlight
        className="-top-40 left-0 opacity-50 mix-blend-overlay md:-top-40 md:left-10"
        fill="#FFE6A1"
      />
      <Spotlight className="-top-40 left-0 md:-top-40 md:left-[30rem]" fill="#FFC800" />
      <div className="absolute inset-0 z-0 size-full ">
        {media && typeof media === 'object' && (
          <Media resource={media} fill imgClassName="object-cover object-center" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-smatch-black via-transparent to-smatch-black opacity-90" />
        {/* <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-smatch-gold/10 blur-[100px]" /> */}
        {/* <div className="absolute inset-0 bg-[url('/assets/hero/hero-overlay.png')] opacity-10 bg-repeat" /> */}
      </div>

      <div className="container relative z-10 flex flex-col items-center px-4 text-center">
        {/* Top Gold Arc Effect (CSS Mock) */}

        <h1 className="mb-6 max-w-5xl font-heading text-6xl font-bold uppercase leading-none tracking-tight text-white drop-shadow-md md:text-7xl lg:text-8xl">
          {headline}
        </h1>

        <p className="mb-10 max-w-2xl text-sm font-light text-white md:text-xl">{subheadline}</p>

        {enableCta && (
          <div className="flex flex-col gap-4 sm:flex-row">
            <CMSLink {...secondaryCta} className="min-w-[200px] uppercase tracking-wider" />
            <CMSLink {...primaryCta} className="min-w-[200px] uppercase tracking-wider" />
          </div>
        )}
      </div>
    </section>
  )
}
