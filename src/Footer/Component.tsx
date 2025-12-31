import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import type { Footer } from '@/payload-types'
import { LinkedinLogo, YoutubeLogo, XLogo } from '@phosphor-icons/react/dist/ssr'

export async function Footer() {
  await getCachedGlobal('footer', 1)()

  return (
    <footer className="relative mt-20 w-full overflow-hidden bg-smatch-black pb-12 pt-24 text-white">
      {/* Background Watermark - "SMATCH" stroked text at bottom */}
      <div className="pointer-events-none absolute bottom-[-4vw] left-0 z-0 flex w-full select-none justify-center overflow-hidden mix-blend-overlay">
        <Image className='object-contain ' src={'/assets/footer/bg.png'} alt='bg' width={1440} height={500} />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* COLUMN 1: Brand Identity */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="mb-2">
              <Image
                src="/logo.svg"
                alt="SMATCH DIGITAL"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-white">
                Éditeur. Intégrateur. Partenaire.
              </h3>
              <p className="max-w-xs font-sans text-sm font-medium leading-relaxed text-gray-500">
                Nous accélérons la transformation numérique des entreprises par des solutions technologiques centrées sur l&apos;humain, l&apos;IoT et la data intelligence.
              </p>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              <Link href="#" className="text-white transition-all hover:scale-110 hover:text-smatch-gold">
                <XLogo size={24} weight="fill" />
              </Link>
              <Link href="#" className="text-white transition-all hover:scale-110 hover:text-smatch-gold">
                <LinkedinLogo size={24} weight="fill" />
              </Link>
              <Link href="#" className="text-white transition-all hover:scale-110 hover:text-smatch-gold">
                <YoutubeLogo size={24} weight="fill" />
              </Link>
            </div>
          </div>

          {/* COLUMN 2: Écosystème */}
          <div className="flex flex-col gap-6 pt-2">
            <h4 className="font-heading text-lg font-bold text-white">Écosystème</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  Supply Chain & Logistique (WMS/TMS)
                </Link>
              </li>
              <li>
                <Link href="#" className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  Industrie X.0 & IoT
                </Link>
              </li>
              <li>
                <Link href="#" className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  AgriTech & Smart Assets (Ksibti)
                </Link>
              </li>
              <li>
                <Link href="#" className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  Big Data & AI Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: SM@TCH */}
          <div className="flex flex-col gap-6 pt-2">
            <h4 className="font-heading text-lg font-bold text-white">SM@TCH</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/projects" className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  Nos Projets & Réalisations
                </Link>
              </li>
              <li>
                <Link href="/journal" className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  Journal des Opérations
                </Link>
              </li>
              <li>
                <Link href="/careers" className="font-sans text-sm font-medium text-gray-500 transition-colors hover:text-white">
                  Carrières
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Contact & Info */}
          <div className="flex flex-col gap-6 pt-2">
            <h4 className="font-heading text-lg font-bold text-white">Contact & Info</h4>
            <div className="space-y-4 font-sans text-sm font-medium text-gray-500">
              <div className="flex flex-col">
                <span className="text-gray-500">Bureau</span>
                <span className="text-gray-500">Casablanca, Maroc</span>
              </div>
              <div>
                <a href="mailto:contact@smatch.ma" className="block transition-colors hover:text-smatch-gold">
                  contact@smatch.ma
                </a>
              </div>
              <div>
                <a href="tel:+212520001878" className="block transition-colors hover:text-smatch-gold">
                  +212 520 001 878
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
