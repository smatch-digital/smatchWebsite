import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { LinkedinLogo, YoutubeLogo, XLogo } from '@phosphor-icons/react/dist/ssr'

export async function Footer() {
  const footerData: Footer | null = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="relative h-[500px] w-full overflow-hidden bg-[#050505] pb-12 pt-24 text-white">

      {/* Background Watermark Text (Pixel Perfect to Reference) */}
      <div className="pointer-events-none absolute bottom-[-5vw] left-0 z-0 flex w-full select-none justify-center overflow-hidden">
         <span
           className="font-heading text-[40vw] font-bold leading-none text-transparent opacity-[0.03]"
           style={{ WebkitTextStroke: '2px white' }}
         >
           SMATCH
         </span>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-8">

            {/* COLUMN 1: Brand & Socials (Span 4) */}
            <div className="flex flex-col gap-8 md:col-span-4">
               {/* Logo */}
               <div className="mb-2">
                 <Image
                   src="/logo.svg"
                   alt="SMATCH Digital"
                   width={140}
                   height={32}
                   className="h-8 w-auto"
                 />
               </div>

               {/* Tagline & Bio */}
               <div className="max-w-sm space-y-4">
                  <h3 className="font-heading text-lg font-bold tracking-wide text-white">
                    Éditeur. Intégrateur. Partenaire.
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-gray-500">
                    Nous accélérons la transformation numérique des entreprises par des solutions technologiques centrées sur l’humain, l&apos;IoT et la data intelligence.
                  </p>
               </div>

               {/* Social Icons */}
               <div className="mt-2 flex items-center gap-5">
                  <a href="#" className="text-white transition-colors duration-300 hover:text-[#FFB800]">
                    <XLogo size={20} weight="fill" />
                  </a>
                  <a href="#" className="text-white transition-colors duration-300 hover:text-[#FFB800]">
                    <LinkedinLogo size={20} weight="fill" />
                  </a>
                  <a href="#" className="text-white transition-colors duration-300 hover:text-[#FFB800]">
                    <YoutubeLogo size={20} weight="fill" />
                  </a>
               </div>
            </div>

            {/* SPACER COLUMN (Span 1) */}
            <div className="hidden lg:col-span-1 lg:block" />

            {/* COLUMN 2: Écosystème (Span 3) */}
            <div className="flex flex-col gap-6 pt-2 md:col-span-3 lg:col-span-3">
               <h4 className="font-heading text-base font-bold text-white">Écosystème</h4>
               <ul className="flex flex-col gap-4">
                 <li>
                   <Link href="#" className="block font-sans text-sm text-gray-400 transition-colors duration-200 hover:text-white">
                     Supply Chain & Logistique (WMS/TMS)
                   </Link>
                 </li>
                 <li>
                   <Link href="#" className="block font-sans text-sm text-gray-400 transition-colors duration-200 hover:text-white">
                     Industrie X.0 & IoT
                   </Link>
                 </li>
                 <li>
                   <Link href="#" className="block font-sans text-sm text-gray-400 transition-colors duration-200 hover:text-white">
                     AgriTech & Smart Assets (Ksibti)
                   </Link>
                 </li>
                 <li>
                   <Link href="#" className="block font-sans text-sm text-gray-400 transition-colors duration-200 hover:text-white">
                     Big Data & AI Analytics
                   </Link>
                 </li>
               </ul>
            </div>

            {/* COLUMN 3: SM@TCH (Span 2) */}
            <div className="flex flex-col gap-6 pt-2 md:col-span-2 lg:col-span-2">
               <h4 className="font-heading text-base font-bold text-white">SM@TCH</h4>
               <ul className="flex flex-col gap-4">
                 <li>
                   <Link href="/about" className="block font-sans text-sm text-gray-400 transition-colors duration-200 hover:text-white">
                     À Propos
                   </Link>
                 </li>
                 <li>
                   <Link href="/projects" className="block font-sans text-sm text-gray-400 transition-colors duration-200 hover:text-white">
                     Nos Projets & Réalisations
                   </Link>
                 </li>
                 <li>
                   <Link href="/journal" className="block font-sans text-sm text-gray-400 transition-colors duration-200 hover:text-white">
                     Journal des Opérations
                   </Link>
                 </li>
                 <li>
                   <Link href="/careers" className="block font-sans text-sm text-gray-400 transition-colors duration-200 hover:text-white">
                     Carrières
                   </Link>
                 </li>
                 {/* CMS Links Dynamic Injection */}
                 {navItems.map(({ link }, i) => (
                    <li key={i}>
                       <CMSLink {...link} className="block font-sans text-sm text-gray-400 transition-colors duration-200 hover:text-white" />
                    </li>
                 ))}
               </ul>
            </div>

            {/* COLUMN 4: Contact (Span 2) */}
            <div className="flex flex-col gap-6 pt-2 md:col-span-3 lg:col-span-2">
               <h4 className="font-heading text-base font-bold text-white">Contact & Info</h4>
               <div className="flex flex-col gap-4 font-sans text-sm text-gray-400">
                  <div className="flex flex-col gap-1">
                     <span className="text-gray-500">Bureau</span>
                     <span className="text-white">Casablanca, Maroc</span>
                  </div>

                  <a href="mailto:contact@smatch.ma" className="transition-colors duration-200 hover:text-[#FFB800]">
                    contact@smatch.ma
                  </a>

                  <a href="tel:+212520001878" className="transition-colors duration-200 hover:text-[#FFB800]">
                    +212 520 001 878
                  </a>
               </div>
            </div>

        </div>

        {/* Bottom Copyright Line (Optional but likely needed) */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 font-mono text-xs text-gray-600 md:flex-row">
           <span>© {new Date().getFullYear()} SMATCH DIGITAL. ALL RIGHTS RESERVED.</span>
           <div className="flex gap-6">
              <Link href="/legal" className="transition-colors hover:text-gray-400">MENTIONS LÉGALES</Link>
              <Link href="/privacy" className="transition-colors hover:text-gray-400">PRIVACY POLICY</Link>
           </div>
        </div>
      </div>
    </footer>
  )
}
