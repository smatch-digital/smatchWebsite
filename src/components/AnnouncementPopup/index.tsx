'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowRight } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import type { Announcement } from '@/payload-types'

interface AnnouncementPopupProps {
  announcement: Announcement | null
}

export const AnnouncementPopup: React.FC<AnnouncementPopupProps> = ({ announcement }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [resolvedAnnouncement, setResolvedAnnouncement] = useState<Announcement | null>(
    announcement,
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setResolvedAnnouncement(announcement)
  }, [announcement])

  useEffect(() => {
    if (!isMounted) return
    if (!announcement) {
      const localeFromLang = document.documentElement.lang || 'en'
      fetch(
        `/api/globals/announcement?depth=1&locale=${encodeURIComponent(localeFromLang)}&fallback-locale=en`,
      )
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setResolvedAnnouncement(data as Announcement)
        })
        .catch(() => null)
    }
  }, [announcement, isMounted])

  useEffect(() => {
    if (!isMounted) return
    if (
      !resolvedAnnouncement?.isActive ||
      !resolvedAnnouncement.layout ||
      !resolvedAnnouncement.layout[0]
    )
      return

    const open = () => setIsOpen(true)

    window.addEventListener('smatch:intro-finished', open)
    const fallbackTimer = window.setTimeout(open, 3500)

    return () => {
      window.removeEventListener('smatch:intro-finished', open)
      window.clearTimeout(fallbackTimer)
    }
  }, [isMounted, resolvedAnnouncement])

  const handleClose = () => {
    setIsOpen(false)
  }

  // Prevent hydration mismatch by not rendering anything on the server
  if (!isMounted) return null

  if (
    !resolvedAnnouncement?.isActive ||
    !resolvedAnnouncement.layout ||
    !resolvedAnnouncement.layout[0]
  )
    return null

  const block = resolvedAnnouncement.layout[0]

  // Render specific layout based on block type
  if (block.blockType === 'seafoodEvent') {
    const { image, title, description, highlightText, detailsBox, tags, buttons } = block

    const imageUrl = typeof image === 'object' && image?.url ? image.url : null
    const imageAlt = typeof image === 'object' && image?.alt ? image.alt : 'Announcement Image'

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 smatch-backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-[1200px] overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] shadow-2xl"
            >
              {/* Noise Overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/20 p-2 text-white/40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#FFAA00] hover:bg-[#FFAA00] hover:text-black md:right-6 md:top-6"
              >
                <X size={20} weight="bold" />
              </button>

              <div className="relative z-10 flex flex-col lg:flex-row">
                {/* Left Side: Image */}
                <div className="relative flex min-h-[300px] w-full items-center justify-center bg-white/[0.02] p-8 lg:w-1/2 lg:p-12">
                  {/* Inner Border/Container for Image */}
                  <div className="relative flex aspect-square w-full max-w-[500px] items-center justify-center rounded-xl border border-white/10 bg-[#0F0F0F] p-8 shadow-inner">
                    {imageUrl && (
                      <div className="relative h-full w-full">
                        <Image src={imageUrl} alt={imageAlt} fill className="object-contain" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="flex w-full flex-col justify-center p-8 lg:w-1/2 lg:p-12">
                  {/* Title */}
                  <h2 className="mb-2 font-heading text-4xl font-black uppercase tracking-tighter text-white lg:text-6xl">
                    {title}
                  </h2>

                  {/* Highlight Text (Date) */}
                  {highlightText && (
                    <div className="mb-6 font-mono text-sm font-bold uppercase tracking-[0.2em] text-[#FFAA00]">
                      {highlightText}
                    </div>
                  )}

                  {/* Description */}
                  <div className="mb-8 font-sans text-base font-light leading-relaxed text-gray-400 lg:text-lg">
                    <div
                      dangerouslySetInnerHTML={{ __html: description }}
                      className="[&>p]:mb-4 [&>p:last-child]:mb-0"
                    />
                  </div>

                  {/* Details Box */}
                  {detailsBox && (
                    <div className="mb-8 rounded-sm border-l-2 border-[#FFAA00] bg-white/5 p-6 backdrop-blur-md">
                      <div className="bg-gradient-to-r from-white via-white/90 to-gray-400 bg-clip-text font-sans text-base font-light italic leading-relaxed text-transparent smatch-gradient-text lg:text-lg">
                        <div dangerouslySetInnerHTML={{ __html: detailsBox }} />
                      </div>
                    </div>
                  )}

                  {/* Tags Grid */}
                  {tags && tags.length > 0 && (
                    <div className="mb-10 flex flex-wrap gap-3">
                      {tags.map((tag, idx) => (
                        <div
                          key={idx}
                          className="flex items-center overflow-hidden rounded-sm border border-white/10 bg-white/[0.02]"
                        >
                          <div className="bg-white/5 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
                            {tag.label}
                          </div>
                          <div className="px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#FFAA00]">
                            {tag.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Buttons */}
                  {buttons && buttons.length > 0 && (
                    <div className="mt-auto flex flex-col gap-4 sm:flex-row">
                      {buttons.map((btn, idx) => {
                        const href =
                          btn.link.type === 'reference' &&
                          typeof btn.link.reference?.value === 'object'
                            ? `/${btn.link.reference.value.slug === 'home' ? '' : btn.link.reference.value.slug}`
                            : btn.link.url || '#'

                        const isSolid = btn.style === 'solid'

                        return (
                          <Link
                            key={idx}
                            href={href}
                            onClick={handleClose}
                            target={btn.link.newTab ? '_blank' : undefined}
                            className={`flex flex-1 items-center justify-center rounded-sm px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                              isSolid
                                ? 'bg-[#FFAA00] text-black shadow-[0_0_20px_rgba(255,170,0,0.3)] hover:bg-white hover:shadow-[0_0_30px_rgba(255,170,0,0.6)]'
                                : 'border border-white/20 text-white hover:border-[#FFAA00] hover:bg-white/5'
                            }`}
                          >
                            {/* Force text color and ensure valid React node */}
                            <span className={isSolid ? 'text-black' : 'text-white'}>
                              {btn.link.label || 'Voir Plus'}
                            </span>
                            {isSolid && <ArrowRight weight="bold" className="ml-2 text-black" />}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
  }

  return null
}
