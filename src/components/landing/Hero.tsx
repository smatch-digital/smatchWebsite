import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
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
    <section className="relative mx-auto min-h-[90vh] flex items-center justify-center overflow-hidden bg-smatch-black pt-20">
      {/* Background Effects */}
      <div className='absolute w-full h-full bottom-0 left-0 right-0 bg-gradient-to-t from-smatch-black to-transparent z-10'></div>
      <div className="absolute inset-0 mix-blend-screen z-0">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60 "
        fill="#FFC800"
      />
      <Spotlight
        className="-top-40 left-0 md:-top-40 md:left-10 opacity-50 mix-blend-overlay"
        fill="#FFE6A1"
      />
      <Spotlight
        className="-top-40 left-0 md:-top-40 md:left-[30rem]"
        fill="#FFC800"
      />
        <Image
          className="mix-blend-screen"
          src={'/assets/hero/hero-background.jpg'}
          alt=""
          width={2000}
          height={2000}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-smatch-black via-transparent to-smatch-black opacity-90" /> */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-smatch-gold/10 rounded-full blur-[100px] animate-pulse" />
        {/* <div className="absolute inset-0 bg-[url('/assets/hero/hero-overlay.png')] opacity-10 bg-repeat" /> */}
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center px-4">
        {/* Top Gold Arc Effect (CSS Mock) */}

        <h1 className="font-heading text-5xl drop-shadow-md md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight uppercase max-w-5xl leading-none">
          {HERO_DATA.headline}
        </h1>

        <p className="text-smatch-text-secondary text-lg md:text-xl max-w-2xl mb-10">
          {HERO_DATA.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
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
      </div>
    </section>
  )
}
