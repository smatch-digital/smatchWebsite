'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/utilities/ui'
import type { TeamBlock, Media } from '@/payload-types'

// --- Helper: Type Guard for Image ---
const isMedia = (media: unknown): media is Media => {
    return media !== null && typeof media === 'object' && 'url' in media
}

const SocialButton = ({ icon: Icon, href, className }: { icon: React.ElementType, href?: string | null, className?: string }) => {
    if (!href) return null
    return (
        <Link
            href={href}
            className={cn(
                "w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#FFB800] hover:border-[#FFB800] hover:bg-[#FFB800]/10 transition-all duration-300 bg-[#111]",
                className
            )}
        >
            <Icon size={18} />
        </Link>
    )
}

// --- 1. Main Leader Card (Tarik) ---
const LeaderCard = ({ member, className }: { member: NonNullable<TeamBlock['leaders']>[number]; className?: string }) => {
    const imageUrl = isMedia(member.image) ? member.image.url : null
    const imageAlt = isMedia(member.image) ? member.image.alt : member.name

    return (
        <div className={cn("relative group rounded-[24px] border border-white/5 bg-[#0A0A0A] overflow-hidden flex flex-col justify-between p-6 md:p-12 transition-all duration-500 hover:border-[#FFB800]/30", className)}>

            {/* Texture Background */}
            <div className="pointer-events-none absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay" />

            {/* Background Glow (Responsive size) */}
            <div className="pointer-events-none absolute -right-[20%] -top-[20%] size-4/5 rounded-full bg-[#FFB800]/5 blur-[100px] transition-colors duration-700 group-hover:bg-[#FFB800]/10 md:size-3/5" />

            {/* Content Grid */}
            <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:gap-10">
                {/* PFP Container */}
                <div className="relative flex w-full shrink-0 justify-center md:block md:w-auto">
                    <div className="relative size-32 overflow-hidden rounded-[20px] border border-white/10 bg-[#151515] shadow-2xl transition-colors duration-500 group-hover:border-[#FFB800]/50 md:h-64 md:w-56">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={imageAlt || ''}
                                fill
                                className="scale-100 object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white/20">NO IMG</div>
                        )}
                        {/* Tech Corners */}
                        <div className="absolute right-2 top-2 size-2 border-r border-t border-[#FFB800] opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="absolute bottom-2 left-2 size-2 border-b border-l border-[#FFB800] opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                </div>

                {/* Text Info */}
                <div className="flex flex-1 flex-col pt-2 text-center md:text-left">
                    <span className="mb-4 block self-center rounded border border-[#FFB800]/20 bg-[#FFB800]/5 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFB800] md:self-start md:text-xs">
                        {member.tag}
                    </span>

                    <h3 className="mb-4 font-heading text-3xl font-bold uppercase leading-[0.9] tracking-tight text-white md:text-5xl lg:text-6xl">
                        {member.name}
                    </h3>

                    <p className="mb-8 border-l-0 border-[#FFB800] pl-0 font-sans text-xs font-medium uppercase tracking-widest text-gray-400 md:border-l-2 md:pl-4 md:text-sm">
                        {member.role}
                    </p>

                    <div className="mt-auto border-t border-white/5 pt-8">
                        <p className="mx-auto max-w-lg font-sans text-base italic leading-relaxed text-gray-400 md:mx-0 md:text-lg">
                            {member.description}
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="mt-8 flex justify-center gap-3 md:justify-start">
                        <SocialButton icon={LinkedinLogo} href={member.linkedin} />
                        <SocialButton icon={EnvelopeSimple} href={member.email ? `mailto:${member.email}` : null} />
                    </div>
                </div>
            </div>

            {/* Bottom ID Tag */}
            <div className="relative z-10 mt-auto flex items-center justify-center pt-6 md:justify-start">
                <div className="flex items-center gap-3">
                    <div className="size-1.5 animate-pulse rounded-full bg-[#FFB800]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                        {member.footerId}
                    </span>
                </div>
            </div>
        </div>
    )
}

// --- 2. Secondary Leader Card (Mostafa) ---
const SecondaryLeaderCard = ({ member, className }: { member: NonNullable<TeamBlock['leaders']>[number]; className?: string }) => {
    const imageUrl = isMedia(member.image) ? member.image.url : null
    const imageAlt = isMedia(member.image) ? member.image.alt : member.name

    return (
        <div className={cn("relative group rounded-[24px] border border-white/5 bg-[#0A0A0A] overflow-hidden flex flex-col p-6 md:p-10 transition-all duration-500 hover:border-[#FFB800]/30", className)}>

            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Top Section: Image & Tag */}
            <div className="relative z-10 mb-8 flex flex-col items-start justify-between gap-4 md:flex-row">
                {/* PFP Circle */}
                <div className="relative size-16 overflow-hidden rounded-2xl border border-white/10 transition-colors duration-500 group-hover:border-[#FFB800]/50 md:size-20">
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt={imageAlt || ''}
                            fill
                            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        />
                    )}
                </div>

                {/* Tag */}
                <div className="self-start rounded-md border border-white/10 bg-[#151515] px-3 py-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 transition-colors group-hover:text-white">
                        {member.tag}
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1">
                <h3 className="mb-3 font-heading text-3xl font-bold uppercase leading-none text-white transition-colors duration-300 group-hover:text-[#FFB800] md:text-5xl">
                    {member.name}
                </h3>
                <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500 md:text-xs">
                    {member.role}
                </p>
                <p className="mb-8 border-l border-white/10 pl-4 font-sans text-sm leading-relaxed text-gray-400 transition-colors group-hover:border-[#FFB800]">
                    {member.description}
                </p>
            </div>

            {/* Footer & Socials */}
            <div className="relative z-10 mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    {member.footerId}
                </span>

                <div className="flex gap-2">
                    <SocialButton icon={LinkedinLogo} href={member.linkedin} className="size-8" />
                    <SocialButton icon={EnvelopeSimple} href={member.email ? `mailto:${member.email}` : null} className="size-8" />
                </div>
            </div>
        </div>
    )
}

// --- 3. Expandable Team Member Card ---
const TeamMemberCard = ({
    member,
    isHovered,
    onHover,
    onLeave
}: {
    member: NonNullable<TeamBlock['members']>[number];
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}) => {
    const imageUrl = isMedia(member.image) ? member.image.url : null
    const imageAlt = isMedia(member.image) ? member.image.alt : member.name

    return (
        <motion.div
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="group relative flex h-[450px] w-full cursor-pointer flex-col justify-end overflow-hidden rounded-[24px] border border-white/5 bg-[#0A0A0A] p-6 md:h-[500px] md:p-8"
            // Desktop: Flex expand. Mobile: Static flex-1 (handled by parent layout usually, but here we enforce full width on mobile)
            animate={{
                flex: isHovered ? 2.5 : 1,
            }}
            // Custom Bezier for ultra-smooth "luxury" feel
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
            {/* Background Image Logic */}
            <div className="absolute inset-0 z-0">
                {/* Dark overlay when not hovered */}
                <div className="absolute inset-0 z-10 bg-[#0A0A0A] opacity-100 transition-opacity duration-500 group-hover:opacity-0" />

                {/* Image */}
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={imageAlt || ''}
                        fill
                        className="scale-105 object-cover grayscale transition-all duration-700 group-hover:scale-100 group-hover:grayscale-0"
                    />
                )}

                {/* Gradient for text readability when hovered */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/90 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* Top Dot & Tag (Absolute top) */}
            <div className="absolute left-6 top-6 z-30 flex w-[calc(100%-3rem)] items-center justify-between md:left-8 md:top-8 md:w-[calc(100%-4rem)]">
                <div className="flex items-center gap-3">
                    <div className={`size-2 rounded-full transition-colors duration-300 ${isHovered ? 'bg-[#FFB800] shadow-[0_0_10px_#FFB800]' : 'bg-white/20'}`} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors group-hover:text-white">
                        {member.tag}
                    </span>
                </div>
            </div>

            {/* Content Container (Slides up on hover) */}
            <div className="relative z-30 translate-y-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
                <h4 className={`mb-1 font-heading text-2xl font-bold uppercase leading-none transition-colors duration-300 md:text-3xl ${isHovered ? 'text-white' : 'text-white/60'}`}>
                    {member.name}
                </h4>
                <p className="mb-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFB800]">
                    {member.role}
                </p>

                {/* Reveal Content (Description + Socials) */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        height: isHovered ? 'auto' : 0
                    }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="overflow-hidden"
                >
                    {/* Description */}
                    <div className="my-4 border-l-2 border-[#FFB800] pl-3">
                        <p className="max-w-[95%] font-sans text-xs leading-relaxed text-gray-300 md:text-sm">
                            {member.description}
                        </p>
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                        <div className="flex gap-2">
                            <SocialButton icon={LinkedinLogo} href={member.linkedin} className="size-8" />
                            <SocialButton icon={EnvelopeSimple} href={member.email ? `mailto:${member.email}` : null} className="size-8" />
                        </div>
                        <ArrowUpRight size={16} className="text-[#FFB800]" />
                    </div>
                </motion.div>
            </div>

            {/* Border Glow on Hover */}
            <div className="pointer-events-none absolute inset-0 z-40 rounded-[24px] border border-[#FFB800] opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
        </motion.div>
    )
}


export const TeamBlockComponent: React.FC<TeamBlock> = (props) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const { header, leaders, members } = props

    const title = header?.title || "L'Équipe / Leadership"
    const tag = header?.tag || "Our People"
    const description = header?.description || "Experts en ingénierie, logistique et transformation digitale."

    const safeLeaders = leaders || []
    const safeMembers = members || []

    const tarik = safeLeaders[0]
    const mostafa = safeLeaders[1]

    return (
        <section className="relative overflow-hidden bg-[#050505] py-24 md:py-32">
            {/* Background Atmosphere */}
            <div className="absolute left-1/2 top-0 h-px w-full max-w-7xl -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container relative z-10 mx-auto px-4">
                <div className="flex flex-col gap-12">

                    {/* Header */}
                    <div className="flex flex-col items-end justify-between gap-4 border-b border-white/5 pb-6 md:flex-row">
                        <div>
                            <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#FFB800]">{tag}</span>
                            <h2 className="font-heading text-4xl font-bold uppercase leading-none tracking-tight text-white md:text-5xl">
                                {title}
                            </h2>
                        </div>
                        <div className="hidden text-right md:block">
                            <p className="max-w-xs font-mono text-xs uppercase tracking-widest text-white/40">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* ROW 1: Leaders */}
                    {/* Stacks vertically on mobile, side-by-side on desktop */}
                    {safeLeaders.length > 0 && (
                        <div className="grid grid-cols-1 gap-6 lg:h-[600px] lg:grid-cols-12">
                            {/* Tarik (Larger) */}
                            {tarik && (
                                <div className={`${mostafa ? 'lg:col-span-7' : 'lg:col-span-12'} h-full`}>
                                    <LeaderCard member={tarik} className="h-full" />
                                </div>
                            )}
                            {/* Mostafa (Smaller) */}
                            {mostafa && (
                                <div className="h-full lg:col-span-5">
                                    <SecondaryLeaderCard member={mostafa} className="h-full" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* ROW 2: Team Members */}
                    {/* Flex row on desktop (for expansion effect), Flex col on mobile (for stability) */}
                    {safeMembers.length > 0 && (
                        <div className="flex h-auto w-full flex-col gap-6 md:h-[500px] md:flex-row">
                            {safeMembers.map((member, i) => (
                                <TeamMemberCard
                                    key={member.id || i}
                                    member={member}
                                    isHovered={hoveredIndex === i}
                                    onHover={() => setHoveredIndex(i)}
                                    onLeave={() => setHoveredIndex(null)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
