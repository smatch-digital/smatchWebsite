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
    <section className="py-32 bg-smatch-black relative overflow-hidden">
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-smatch-gold/5 rounded-full blur-[80px] z-0" />

      {/* Golden Rings Effect (CSS Mock) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-smatch-gold/20 rounded-full opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-smatch-gold/10 rounded-full opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-smatch-gold/5 rounded-full opacity-20" />

      <div className="container relative z-10 px-4 text-center">
        {/* Floating Particles (Static Mock) */}
        <div className="flex justify-center mb-8 gap-4">
          <div className="w-2 h-2 bg-smatch-gold rounded-full animate-bounce delay-75" />
          <div className="w-2 h-2 bg-smatch-gold rounded-full animate-bounce delay-150" />
          <div className="w-2 h-2 bg-smatch-gold rounded-full animate-bounce delay-300" />
        </div>

        <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {CTA_DATA.headline}
        </h2>

        <p className="font-sans text-smatch-text-secondary text-lg max-w-xl mx-auto mb-10">
          {CTA_DATA.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="gold"
            size="lg"
            className="min-w-[180px] uppercase tracking-wider font-bold"
          >
            {CTA_DATA.primaryButton}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[180px] border-smatch-border text-white hover:border-smatch-gold hover:text-smatch-gold uppercase tracking-wider"
          >
            {CTA_DATA.secondaryButton}
          </Button>
        </div>
      </div>
    </section>
  )
}
