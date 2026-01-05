'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import type { TeamBlock, Media } from '@/payload-types'

// --- Helper: Type Guard for Payload Media ---
const isMedia = (media: unknown): media is Media => {
  return media !== null && typeof media === 'object' && 'url' in media
}

// --- Components ---

interface MemberData {
  name: string
  role: string
  tag?: string | null
  description?: string | null
  footerId?: string | null
  image?: number | Media | null
  linkedin?: string | null
  email?: string | null
  id?: string | null
}

const LeaderCard = ({ member }: { member: MemberData }) => {
  const imageUrl = isMedia(member.image) ? member.image.url : null
  const imageAlt = isMedia(member.image) ? member.image.alt : member.name

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-[#FFB800]/30 md:p-8">
      {/* Decorative Noise/Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      <div className="relative z-10 flex flex-col-reverse gap-10 lg:flex-row lg:items-start lg:gap-16">

        {/* Image & ID Block */}
        <div className="flex flex-col gap-4 lg:w-[320px]">
          {/* Image Container */}
          <div className="group relative aspect-[5/8] w-full overflow-hidden rounded-xl border border-white/10 bg-black/50">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt || ''}
                fill
                className="object-cover opacity-90 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                sizes="(max-width: 1024px) 100vw, 320px"
                priority
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-[#111] font-mono text-white/20">
                NO_IMG
              </div>
            )}

            <div className="absolute top-0 z-20 h-[2px] w-full bg-[#FFB800]/50 opacity-0 shadow-[0_0_20px_#FFB800] group-hover:animate-pulse group-hover:opacity-100" />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1">
          {/* Tag */}
          {member.tag && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-[#FFB800]/20 bg-[#FFB800]/10 px-4 py-1.5">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#FFB800]">
                {member.tag}
              </span>
            </div>
          )}

          {/* Name (Font Heading / Antonio) */}
          <h3 className="mb-4 font-heading text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-[5rem]">
            {member.name.split(' ')[0]} <br />
            <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              {member.name.split(' ').slice(1).join(' ')}
            </span>
          </h3>

          {/* Role (Font Mono / JetBrains) */}
          <p className="mb-8 font-mono text-sm uppercase tracking-widest text-[#FFB800]/80">
            {member.role}
          </p>

          {/* Description Block */}
          {member.description && (
            <div className="relative mb-10 border-l-2 border-[#FFB800] pl-6">
              <p className="bg-gradient-to-r from-white via-white/90 to-gray-400 bg-clip-text font-sans text-lg font-light leading-relaxed text-transparent md:text-xl">
                &ldquo;{member.description}&rdquo;
              </p>
            </div>
          )}

          {/* Socials (Phosphor Icons) */}
          <div className="flex gap-4">
            {member.linkedin && (
              <Link href={member.linkedin} className="group flex size-12 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-white transition-all hover:border-[#FFB800] hover:bg-[#FFB800] hover:text-black">
                <LinkedinLogo size={32} weight="duotone" />
              </Link>
            )}
            {member.email && (
              <Link href={`mailto:${member.email}`} className="group flex size-12 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-white transition-all hover:border-[#FFB800] hover:bg-[#FFB800] hover:text-black">
                <EnvelopeSimple size={32} weight="duotone" />
              </Link>
            )}
          </div>
        </div>

      </div>
      {/* Footer ID Tag */}
      {member.footerId && (
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs tracking-widest text-gray-500">
          <span>{member.footerId}</span>
          <span className="text-[#FFB800]">ONLINE</span>
        </div>
      )}
    </div>
  )
}

const TeamMemberCard = ({ member }: { member: MemberData }) => {
  const imageUrl = isMedia(member.image) ? member.image.url : null
  const imageAlt = isMedia(member.image) ? member.image.alt : member.name

  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#FFB800]/50 hover:shadow-[0_10px_40px_-10px_rgba(255,184,0,0.1)]">

      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header: Image & Tag */}
      <div className="relative z-10 mb-6 flex items-start justify-between">
        <div className="relative size-24 overflow-hidden rounded-lg border border-white/10 bg-[#151515]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt || ''}
              fill
              className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              sizes="96px"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-[10px] text-white/20">IMG</div>
          )}
        </div>

        {member.tag && (
          <div className="rounded border border-white/10 bg-white/5 px-2 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] font-bold tracking-wider text-[#FFB800]">
              {member.tag}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Name (Font Heading) */}
        <h3 className="mb-1 font-heading text-2xl font-bold uppercase text-white transition-colors group-hover:text-[#FFB800]">
          {member.name}
        </h3>

        {/* Role (Font Mono) */}
        <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-gray-500">
          {member.role}
        </p>

        {/* Description (Font Sans) */}
        {member.description && (
          <p className="mb-6 line-clamp-3 font-sans text-sm font-light leading-relaxed text-gray-400 transition-colors group-hover:text-gray-300">
            {member.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/10 pt-4">
        <span className="font-mono text-[10px] text-gray-600 transition-colors group-hover:text-[#FFB800]">
          {member.footerId}
        </span>
        <div className="rounded-full bg-white/5 p-1.5 text-white/30 transition-colors group-hover:bg-[#FFB800] group-hover:text-black">
          <ArrowUpRight size={14} weight="bold" />
        </div>
      </div>
    </div>
  )
}

export const TeamBlockComponent: React.FC<TeamBlock> = (props) => {
  const { header, leaders, members, directorsQuote } = props

  const title = header?.title || "Notre Équipe."
  const tag = header?.tag || '// THE MINDS BEHIND'
  const description = header?.description

  const safeLeaders = leaders || []
  const safeMembers = members || []

  const primaryLeader = safeLeaders[0]
  // Combine secondary leaders with members for the grid
  const teamGrid = [...safeLeaders.slice(1), ...safeMembers]

  // Get quote text and author from CMS or use defaults
  const quoteText = directorsQuote?.text || "Dans un contexte économique exigeant, Smatch Digital s'impose comme le partenaire opérationnel des PME marocaines. Notre mission : élever les standards de la Supply Chain par des solutions concrètes et immédiates. Nous privilégions le pragmatisme et la proximité pour bâtir notre notoriété sur une seule exigence : l'excellence au service de votre performance."
  const quoteAuthor = directorsQuote?.author || primaryLeader?.name || 'SMATCH'

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-24 text-white">
      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute left-0 top-0 size-[500px] rounded-full bg-[#FFB800]/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">

        {/* Section Header */}
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block font-mono text-xs tracking-[0.3em] text-[#FFB800]">
            {tag}
          </span>
          <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
            {title.split(' ')[0]}{' '}
            <span className="bg-gradient-to-r from-white to-gray-600 bg-clip-text text-transparent">
              {title.split(' ').slice(1).join(' ')}
            </span>
          </h2>
          {description && (
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base text-gray-400">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-8">

          {/* 1. Leader Section: Leader Card + Quote Side Panel */}
          {primaryLeader && (
            <div className="grid gap-6 lg:grid-cols-12">

              {/* Leader Card (Col Span 8) */}
              <div className="lg:col-span-8">
                <LeaderCard member={primaryLeader} />
              </div>

              {/* Quote Side Panel (Col Span 4) */}
              <div className="relative flex flex-col justify-between overflow-hidden p-8 lg:col-span-4 lg:p-12">
                {/* Giant Watermark Quote */}
                <div className="pointer-events-none absolute left-4 top-0 select-none font-sans text-[200px] font-black leading-none text-white/5 mix-blend-overlay">
                  <Image className='pointer-events-none select-none opacity-10 mix-blend-overlay' src="/assets/comma-first.svg" alt="" width={200} height={150} />
                </div>
                <p className='my-auto bg-gradient-to-r from-white via-white/90 to-gray-400 bg-clip-text pt-20 text-justify font-sans text-lg font-light leading-relaxed text-transparent md:text-xl'>
                  {quoteText}
                </p>
                <div className="relative z-10 my-auto flex h-full flex-col justify-end">
                  <div className="mb-4 h-[1px] w-12 bg-[#FFB800]" />
                  <p className="font-mono text-xl tracking-widest text-[#FFB800]">
                    - {quoteAuthor}
                  </p>
                </div>
                <div className="pointer-events-none absolute bottom-0 right-4 select-none font-sans text-[200px] font-black leading-none text-white/5 mix-blend-overlay">
                  <Image className='pointer-events-none select-none opacity-10 mix-blend-overlay' src="/assets/comma-final.svg" alt="" width={200} height={150} />
                </div>
              </div>

            </div>
          )}

          {/* 2. Team Grid */}
          {teamGrid.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamGrid.map((member, index) => (
                <TeamMemberCard key={member.id || index} member={member} />
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
