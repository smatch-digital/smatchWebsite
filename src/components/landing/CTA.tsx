import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const CTA_DATA = {
  headline: 'Pret a transformer votre organisation ?',
  subheadline: 'Découvrez nos solutions ou contactez notre équipe pour échanger sur vos besoins.',
  primaryButton: 'VOIR PROJET',
  secondaryButton: 'CONTACTER',
}

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-smatch-black py-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image

          src="/assets/cta/cta-glow-bg.jpg"
          width={500}
          height={500}
          alt="Background Glow"
          className="mx-auto object-cover"
        />
      </div>

      {/* Background Glow Center */}
      <div className="absolute left-1/2 top-1/2 z-0 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-smatch-gold/5 blur-[80px]" />

      {/* Golden Rings Effect (CSS Mock) */}
      <div className="absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-smatch-gold/20 opacity-20" />
      <div className="absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-smatch-gold/10 opacity-20" />
      <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-smatch-gold/5 opacity-20" />

      <div className="container relative z-10 px-4 text-center">
        {/* Floating Particles (Static Mock) */}
        <div className="mb-8 flex justify-center gap-4">
          <div className="size-2 animate-bounce rounded-full bg-smatch-gold delay-75" />
          <div className="size-2 animate-bounce rounded-full bg-smatch-gold delay-150" />
          <div className="size-2 animate-bounce rounded-full bg-smatch-gold delay-300" />
        </div>

        <h2 className="mb-6 font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
          {CTA_DATA.headline}
        </h2>

        <p className="mx-auto mb-10 max-w-xl font-sans text-lg text-smatch-text-secondary">
          {CTA_DATA.subheadline}
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            variant="gold"
            size="lg"
            className="min-w-[180px] font-bold uppercase tracking-wider"
          >
            {CTA_DATA.primaryButton}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[180px] border-smatch-border uppercase tracking-wider text-white hover:border-smatch-gold hover:text-smatch-gold"
          >
            {CTA_DATA.secondaryButton}
          </Button>
        </div>
      </div>
    </section>
  )
}
