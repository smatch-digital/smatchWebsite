import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo, XLogo } from '@phosphor-icons/react/dist/ssr'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="relative w-full h-[500px] bg-[#050505] text-white overflow-hidden pt-24 pb-12">

      {/* Background Watermark Text (Pixel Perfect to Reference) */}
      <div className="absolute bottom-[-5vw] left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0">
         <span
           className="font-heading font-bold text-[40vw] leading-none text-transparent opacity-[0.03]"
           style={{ WebkitTextStroke: '2px white' }}
         >
           SMATCH
         </span>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

            {/* COLUMN 1: Brand & Socials (Span 4) */}
            <div className="md:col-span-4 flex flex-col gap-8">
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
               <div className="space-y-4 max-w-sm">
                  <h3 className="font-heading font-bold text-white text-lg tracking-wide">
                    Éditeur. Intégrateur. Partenaire.
                  </h3>
                  <p className="font-sans text-gray-500 text-sm leading-relaxed">
                    Nous accélérons la transformation numérique des entreprises par des solutions technologiques centrées sur l’humain, l&apos;IoT et la data intelligence.
                  </p>
               </div>

               {/* Social Icons */}
               <div className="flex items-center gap-5 mt-2">
                  <a href="#" className="text-white hover:text-[#FFB800] transition-colors duration-300">
                    <XLogo size={20} weight="fill" />
                  </a>
                  <a href="#" className="text-white hover:text-[#FFB800] transition-colors duration-300">
                    <LinkedinLogo size={20} weight="fill" />
                  </a>
                  <a href="#" className="text-white hover:text-[#FFB800] transition-colors duration-300">
                    <YoutubeLogo size={20} weight="fill" />
                  </a>
               </div>
            </div>

            {/* SPACER COLUMN (Span 1) */}
            <div className="hidden lg:block lg:col-span-1" />

            {/* COLUMN 2: Écosystème (Span 3) */}
            <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-6 pt-2">
               <h4 className="font-heading font-bold text-white text-base">Écosystème</h4>
               <ul className="flex flex-col gap-4">
                 <li>
                   <Link href="#" className="font-sans text-sm text-gray-400 hover:text-white transition-colors duration-200 block">
                     Supply Chain & Logistique (WMS/TMS)
                   </Link>
                 </li>
                 <li>
                   <Link href="#" className="font-sans text-sm text-gray-400 hover:text-white transition-colors duration-200 block">
                     Industrie X.0 & IoT
                   </Link>
                 </li>
                 <li>
                   <Link href="#" className="font-sans text-sm text-gray-400 hover:text-white transition-colors duration-200 block">
                     AgriTech & Smart Assets (Ksibti)
                   </Link>
                 </li>
                 <li>
                   <Link href="#" className="font-sans text-sm text-gray-400 hover:text-white transition-colors duration-200 block">
                     Big Data & AI Analytics
                   </Link>
                 </li>
               </ul>
            </div>

            {/* COLUMN 3: SM@TCH (Span 2) */}
            <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-6 pt-2">
               <h4 className="font-heading font-bold text-white text-base">SM@TCH</h4>
               <ul className="flex flex-col gap-4">
                 <li>
                   <Link href="/about" className="font-sans text-sm text-gray-400 hover:text-white transition-colors duration-200 block">
                     À Propos
                   </Link>
                 </li>
                 <li>
                   <Link href="/projects" className="font-sans text-sm text-gray-400 hover:text-white transition-colors duration-200 block">
                     Nos Projets & Réalisations
                   </Link>
                 </li>
                 <li>
                   <Link href="/journal" className="font-sans text-sm text-gray-400 hover:text-white transition-colors duration-200 block">
                     Journal des Opérations
                   </Link>
                 </li>
                 <li>
                   <Link href="/careers" className="font-sans text-sm text-gray-400 hover:text-white transition-colors duration-200 block">
                     Carrières
                   </Link>
                 </li>
                 {/* CMS Links Dynamic Injection */}
                 {navItems.map(({ link }, i) => (
                    <li key={i}>
                       <CMSLink {...link} className="font-sans text-sm text-gray-400 hover:text-white transition-colors duration-200 block" />
                    </li>
                 ))}
               </ul>
            </div>

            {/* COLUMN 4: Contact (Span 2) */}
            <div className="md:col-span-3 lg:col-span-2 flex flex-col gap-6 pt-2">
               <h4 className="font-heading font-bold text-white text-base">Contact & Info</h4>
               <div className="flex flex-col gap-4 font-sans text-sm text-gray-400">
                  <div className="flex flex-col gap-1">
                     <span className="text-gray-500">Bureau</span>
                     <span className="text-white">Casablanca, Maroc</span>
                  </div>

                  <a href="mailto:contact@smatch.ma" className="hover:text-[#FFB800] transition-colors duration-200">
                    contact@smatch.ma
                  </a>

                  <a href="tel:+212520001878" className="hover:text-[#FFB800] transition-colors duration-200">
                    +212 520 001 878
                  </a>
               </div>
            </div>

        </div>

        {/* Bottom Copyright Line (Optional but likely needed) */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono">
           <span>© {new Date().getFullYear()} SMATCH DIGITAL. ALL RIGHTS RESERVED.</span>
           <div className="flex gap-6">
              <Link href="/legal" className="hover:text-gray-400 transition-colors">MENTIONS LÉGALES</Link>
              <Link href="/privacy" className="hover:text-gray-400 transition-colors">PRIVACY POLICY</Link>
           </div>
        </div>
      </div>
    </footer>
  )
}
