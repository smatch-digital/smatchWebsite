import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Spotlight } from '../ui/spotlight'

const HERO_DATA = {
  headline: 'ACCÉLÉREZ VOTRE TRANSFORMATION DIGITALE.',
  subheadline:
    'Smatch accompagne les acteurs industriels pour repenser les systèmes industriels, logistiques et organisationnels.',
  primaryCta: 'CONTACTEZ-NOUS',
  secondaryCta: 'DÉCOUVRIR LES OFFRES',
}

export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[90vh] items-center justify-center overflow-hidden bg-smatch-black pt-20">
      {/* Background Effects */}
      <div className="absolute inset-x-0 bottom-0 z-10 size-full bg-gradient-to-t from-smatch-black to-transparent"></div>
      <div className="absolute inset-0 z-0 ">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60 " fill="#FFC800" />
        <Spotlight
          className="-top-40 left-0 opacity-50 mix-blend-overlay md:-top-40 md:left-10"
          fill="#FFE6A1"
        />
        <Spotlight className="-top-40 left-0 md:-top-40 md:left-[30rem]" fill="#FFC800" />
        <Image
          src={'/assets/hero/hero-background.jpg'}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-smatch-black via-transparent to-smatch-black opacity-90" /> */}
        <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-smatch-gold/10 blur-[100px]" />
        {/* <div className="absolute inset-0 bg-[url('/assets/hero/hero-overlay.png')] opacity-10 bg-repeat" /> */}
      </div>

      <div className="container relative z-10 flex flex-col items-center px-4 text-center">
        {/* Top Gold Arc Effect (CSS Mock) */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="mb-6 max-w-5xl font-heading text-5xl font-bold uppercase leading-none tracking-tight text-white drop-shadow-md md:text-7xl lg:text-8xl">
            {HERO_DATA.headline}
          </h1>

          <p className="mb-10 max-w-2xl text-lg text-smatch-text-secondary md:text-xl">
            {HERO_DATA.subheadline}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="outline-gold"
              size="lg"
              className="min-w-[200px] uppercase tracking-wider"
            >
              {HERO_DATA.secondaryCta}
            </Button>
            <Button variant="gold" size="lg" className="min-w-[200px] uppercase tracking-wider">
              {HERO_DATA.primaryCta}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
