import React from 'react'
import Image from 'next/image'

const TRUSTED_BY_DATA = {
  title: "TRUSTED BY",
  logos: [
    { name: "Partner 2", src: "/assets/logos/logo-2.svg" },
    { name: "Partner 3", src: "/assets/logos/logo-3.svg" },
    { name: "Partner 1", src: "/assets/logos/logo-1.svg" },
    { name: "Partner 4", src: "/assets/logos/logo-4.svg" },
    { name: "Partner 5", src: "/assets/logos/logo-5.svg" },
  ]
}

export function TrustedBy() {
  return (
    <section className="py-12 bg-smatch-black border-y border-smatch-border/30 mx-auto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-smatch-text-muted">
            {TRUSTED_BY_DATA.title}
          </span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {TRUSTED_BY_DATA.logos.map((logo, index) => (
            <div key={index} className="relative h-4 md:h-6 w-24 md:w-32 flex items-center justify-center">
               <Image
                 src={logo.src}
                 alt={logo.name}
                 fill
                 className="object-contain"
               />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
