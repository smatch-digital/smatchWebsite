import React from 'react'
import Image from 'next/image'

const TRUSTED_BY_DATA = {
  title: "TRUSTED BY",
  logos: [
    { name: "Partner 1", src: "/assets/logos/logo-1.svg" },
    { name: "Partner 2", src: "/assets/logos/logo-2.svg" },
    { name: "Partner 3", src: "/assets/logos/logo-3.svg" },
    { name: "Partner 4", src: "/assets/logos/logo-4.svg" },
    { name: "Partner 5", src: "/assets/logos/logo-5.svg" },
  ]
}

export function TrustedBy() {
  return (
    <section className="mx-auto overflow-hidden border-y border-smatch-border/30 bg-smatch-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-smatch-text-muted">
            {TRUSTED_BY_DATA.title}
          </span>
        </div>

        <div className="mask-gradient-x relative w-full overflow-hidden">
          {/* Gradient Masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-smatch-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-smatch-black to-transparent" />

          {/* Marquee Track */}
          <div className="flex w-max animate-scroll gap-12 md:gap-20">
            {/* First set of logos */}
            {[...TRUSTED_BY_DATA.logos, ...TRUSTED_BY_DATA.logos, ...TRUSTED_BY_DATA.logos].map((logo, index) => (
              <div key={index} className="flex min-w-[120px] items-center justify-center opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
                <div className="relative h-8 w-32 md:h-10 md:w-40">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop (already tripled above for safety on wide screens) */}
          </div>
        </div>
      </div>
    </section>
  )
}
