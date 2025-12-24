'use client'

import { cn } from '@/utilities/ui'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'

// --- Types & Layout ---

interface NavItem {
  name: string
  link: string
}

export const NavbarLayout = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <>
      {/* Desktop Layout - Top Fixed */}
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-[10000] w-full px-6 py-6 pointer-events-none hidden md:block',
          className,
        )}
      >
        <div className="mx-auto max-w-[1440px] flex items-center justify-between relative">
          {children}
        </div>
      </div>

      {/* Mobile Layout Container - Handles z-index for children */}
      <div className="md:hidden fixed inset-0 z-[10000] pointer-events-none">{children}</div>
    </>
  )
}

// --- DESKTOP COMPONENTS (Unchanged from previous best version) ---

export const NavBrand = ({
  children,
  isScrolled,
}: {
  children: React.ReactNode
  isScrolled: boolean
}) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: isScrolled ? 0 : 1,
        y: isScrolled ? -20 : 0,
        pointerEvents: isScrolled ? 'none' : 'auto',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden md:flex items-center min-w-[200px]"
    >
      {children}
    </motion.div>
  )
}

export const NavCenterPill = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto">
      <div
        className={cn(
          'relative flex flex-row items-center gap-1',
          'bg-[#ffffff08] backdrop-blur-xl border border-white/10',
          'shadow-[0_4px_30px_rgba(0,0,0,0.1)]',
          'rounded-full px-2 py-2',
          className,
        )}
      >
        <div className="absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {children}
      </div>
    </div>
  )
}

export const NavLinks = ({ items, activePath }: { items: NavItem[]; activePath?: string }) => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <nav className="flex items-center">
      {items.map((item, idx) => {
        const isActive = activePath === item.link || (activePath === '/' && item.link === '/')
        return (
          <Link
            key={idx}
            href={item.link}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              'relative px-5 py-2.5 rounded-full transition-colors duration-300',
              'group flex items-center justify-center',
            )}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill-active"
                className="absolute inset-0 bg-white/10 rounded-full border border-white/5 shadow-inner"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {!isActive && hovered === idx && (
              <motion.div
                layoutId="nav-pill-hover"
                className="absolute inset-0 bg-white/5 border border-white/10 shadow-inner rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span
              className={cn(
                'relative z-10 font-sans text-[11px] font-bold tracking-[0.15em] uppercase transition-colors',
                isActive ? 'text-white' : 'text-white/60 group-hover:text-white',
              )}
            >
              {item.name}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

export const NavCTAContainer = ({
  children,
  isScrolled,
}: {
  children: React.ReactNode
  isScrolled: boolean
}) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: isScrolled ? 0 : 1,
        y: isScrolled ? -20 : 0,
        pointerEvents: isScrolled ? 'none' : 'auto',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden md:flex items-center justify-end min-w-[200px]"
    >
      {children}
    </motion.div>
  )
}

export const CTAButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <Link href={href}>
      <div className="bg-[#FFB800] hover:bg-[#E0A200] text-black transition-colors duration-300 rounded-[8px] px-6 py-2.5 shadow-[0_0_20px_rgba(255,184,0,0.2)]">
        <span className="font-sans text-[12px] font-bold tracking-widest uppercase">
          {children}
        </span>
      </div>
    </Link>
  )
}

// --- NEW MOBILE "TACTICAL DOCK" COMPONENTS ---

// 1. Top Bar (Logo Only)
export const MobileTopBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute top-0 left-0 w-full p-4 flex justify-center pointer-events-none md:hidden z-10">
      <div className="pointer-events-auto  bg-[#0F0F0F]/80 backdrop-blur-2xl border border-white/10 rounded-md px-2 py-2 ">
        {children}
      </div>
    </div>
  )
}

// 2. Bottom Dock (The Navigation)
export const MobileBottomDock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute bottom-4 left-0 w-full flex justify-center pointer-events-none md:hidden z-50">
      <div className="pointer-events-auto flex items-center gap-6 bg-[#0F0F0F]/80 backdrop-blur-2xl border border-white/10 rounded-md px-8 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">
        {children}
      </div>
    </div>
  )
}

// 3. Bottom Sheet Overlay
export const MobileMenuOverlay = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden pointer-events-auto"
          />

          {/* Sheet - Slides up from bottom */}
          <motion.div
            initial={{ y: '100%', opacity: 1 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 1 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 z-[100] bg-[#111] border-t border-white/10 rounded-t-[2rem] p-8 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pointer-events-auto min-h-[60vh]"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8" />

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
