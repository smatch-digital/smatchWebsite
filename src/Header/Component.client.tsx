'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { Header } from '@/payload-types'
// Import icons for the dock
import {
  SquaresFour, // The "Menu" icon
  House, // Home
  PhoneCall, // Contact
  X,
} from '@phosphor-icons/react'
import {
  NavbarLayout,
  NavBrand,
  NavCenterPill,
  NavLinks,
  NavCTAContainer,
  CTAButton,
  MobileTopBar,
  MobileBottomDock,
  MobileMenuOverlay,
} from '@/components/ui/resizable-navbar'

interface HeaderClientProps {
  data: Header | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const navItems = data?.navItems || []

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true)
      else setIsScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Data Transformation
  const items =
    navItems.length > 0
      ? navItems.map((item) => ({
          name: item.link.label || 'Link',
          link:
            ((item.link.type === 'reference'
              ? item.link.reference?.value
              : item.link.url) as string) || '#',
        }))
      : [
          { name: 'HOME', link: '/' },
          { name: 'A PROPOS', link: '/about' },
          { name: 'SOLUTIONS', link: '/solutions' },
          { name: 'PROJECTS', link: '/projects' },
          { name: 'EXPERTISES', link: '/expertises' },
        ]

  // SVG Logo
  const LogoSVG = () => (
    <Link href="/" className="group flex items-center gap-3">
      <Image src='/logo.svg' alt='Smatch Logo' width={100} height={50} />
      {/* <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="#FFB800" />
          <path
            d="M20 28C15.5817 28 12 24.4183 12 20C12 15.5817 15.5817 12 20 12C23.0984 12 25.7873 13.7618 27.1213 16.3333"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M20 24C17.7909 24 16 22.2091 16 20C16 17.7909 17.7909 16 20 16C22.2091 16 24 17.7909 24 20V20.5C24 21.8807 25.1193 23 26.5 23C27.8807 23 29 21.8807 29 20.5V16"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-heading font-extrabold text-[14px] md:text-[16px] leading-[0.9] text-white tracking-tight">
          SMATCH
        </span>
        <span className="font-sans font-medium text-[8px] md:text-[9px] leading-none text-white/60 tracking-[0.25em] mt-1">
          DIGITAL
        </span>
      </div> */}
    </Link>
  )

  return (
    <>
      <NavbarLayout>
        {/* --- DESKTOP --- */}
        <NavBrand isScrolled={isScrolled}>
          <LogoSVG />
        </NavBrand>

        <NavCenterPill className="hidden md:flex">
          <NavLinks items={items} activePath={pathname} />
        </NavCenterPill>

        <NavCTAContainer isScrolled={isScrolled}>
          <CTAButton href="/contact">Contact Us</CTAButton>
        </NavCTAContainer>

        {/* --- MOBILE --- */}

        {/* 1. Top Bar: Just the Logo (Static branding) */}
        <MobileTopBar>
          <LogoSVG />
        </MobileTopBar>

        {/* 2. Bottom Dock: The "Tactical" Navigation */}
        <MobileBottomDock>
          {/* Home Button */}
          <Link
            href="/"
            className={`p-2 rounded-full transition-colors ${pathname === '/' ? 'text-[#FFB800]' : 'text-white/60'}`}
          >
            <House size={24} weight={pathname === '/' ? 'fill' : 'regular'} />
          </Link>

          <div className="w-px h-6 bg-white/10 mx-2" />

          {/* Menu Trigger (Central Action) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="bg-[#FFB800] text-black p-3 rounded-full shadow-[0_0_15px_rgba(255,184,0,0.3)] transform active:scale-95 transition-transform"
          >
            <SquaresFour size={24} weight="bold" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-2" />

          {/* Quick Contact */}
          <Link
            href="/contact"
            className="p-2 text-white/60 hover:text-[#FFB800] transition-colors"
          >
            <PhoneCall size={24} />
          </Link>
        </MobileBottomDock>

        {/* 3. The Menu Sheet (Slides up from bottom) */}
        <MobileMenuOverlay isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <div className="flex justify-between items-center mb-8">
            <span className="text-white/40 text-xs font-mono uppercase tracking-widest">
              Navigation
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-white/5 rounded-full text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="text-2xl font-heading font-bold text-white uppercase tracking-wider flex items-center justify-between group"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
                <span className="w-2 h-2 rounded-full bg-[#FFB800] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}

            <div className="h-px bg-white/10 w-full my-4" />

            {/* Extra Info in Menu */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/contact"
                className="bg-[#FFB800] text-black text-center font-bold py-4 rounded-xl uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                Start Project
              </Link>
              <Link
                href="/journal"
                className="bg-white/5 border border-white/10 text-white text-center font-bold py-4 rounded-xl uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                Journal
              </Link>
            </div>
          </div>
        </MobileMenuOverlay>
      </NavbarLayout>
    </>
  )
}
