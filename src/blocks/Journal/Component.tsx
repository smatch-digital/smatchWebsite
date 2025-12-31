'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { JournalBlock, Media } from '@/payload-types' // Ensure these types exist or used the generated ones

// --- Types ---
export interface JournalItem {
    id: number | string
    meta: string
    title: string
    description: string
    linkText: string
    linkUrl: string
    image: string
}

type JournalBlockProps = JournalBlock & {
    className?: string
}

// Fallback data for when no CMS data is available
const FALLBACK_ARTICLES: JournalItem[] = [
    {
        id: 1,
        meta: '2024 | ÉVÉNEMENT',
        title: 'Présentation Ksibti @ SIAM',
        description: "Démonstration technologique de nos solutions AgriTech au Salon International de l'Agriculture.",
        linkText: 'VOIR LE RÉCAP',
        linkUrl: '/projects',
        image: '/assets/journal/siam-event.jpg',
    },
    {
        id: 2,
        meta: '2024 | PROJET',
        title: 'Intégration IoT & 4.0',
        description: "Déploiement de capteurs et digitalisation industrielle sur site.",
        linkText: 'DÉTAILS DU PROJET',
        linkUrl: '/projects',
        image: '/assets/journal/iot-integration.jpg',
    },
    {
        id: 3,
        meta: '2025 | ÉVÉNEMENT',
        title: 'Séminaires Techniques 2025',
        description: "Ateliers de formation et transfert de compétences pour nos partenaires.",
        linkText: "S'INSCRIRE",
        linkUrl: '/projects',
        image: '/assets/journal/seminar.jpg',
    },
]

export const JournalBlockComponent: React.FC<JournalBlockProps> = (props) => {
    const { title, liveFeedText, manualItems } = props
    const targetRef = useRef<HTMLDivElement>(null)

    // Transform manual items or use fallback
    const displayArticles: JournalItem[] = manualItems && manualItems.length > 0
        ? manualItems.map((item, index) => {
            const imageUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : '/assets/journal/placeholder.jpg'
            return {
                id: item.id || index,
                meta: item.meta || '',
                title: item.title,
                description: item.description || '',
                linkText: item.linkText || 'VOIR PLUS',
                linkUrl: item.linkUrl || '#',
                image: imageUrl
            }
        })
        : FALLBACK_ARTICLES

    // Logic: Adjust scroll height based on item count.
    // If few items (<= 2), utilize less vertical space because we need less horizontal travel.
    // Standard height is 300vh for a rich feed.
    const itemCount = displayArticles.length
    const sectionHeight = itemCount <= 1 ? 'h-[150vh]' : itemCount <= 2 ? 'h-[200vh]' : 'h-[300vh]'

    // Track scroll progress
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Transform vertical scroll to horizontal movement
    // If only 1 item, we might hardly scroll at all horizontally, or just a tiny bit.
    const scrollAmount = itemCount > 3 ? `-${(itemCount - 2) * 20}%` : itemCount <= 1 ? '0%' : '-20%'
    const x = useTransform(scrollYProgress, [0, 1], ['0%', scrollAmount])

    return (
        <section ref={targetRef} className={`relative ${sectionHeight} bg-[#050505]`}>
            {/* Sticky Viewport */}
            <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
                {/* Header */}
                <div className="container relative z-10 mx-auto bg-[#050505] px-4 pt-12 md:pt-24">
                    <div className="mb-12 flex flex-col items-end justify-between border-b border-white/10 pb-6 md:flex-row">
                        <div className="flex items-center gap-6">
                            <h2 className="font-heading text-lg font-bold uppercase tracking-widest text-white md:text-xl">
                                {title}
                            </h2>
                            <div className="flex items-center gap-3">
                                <div className="hidden h-px w-8 bg-gray-700 md:block" />
                                <div className="flex items-center gap-2">
                                    <div className="relative flex size-2.5">
                                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FFB800] opacity-75" />
                                        <span className="relative inline-flex size-2.5 rounded-full bg-[#FFB800]" />
                                    </div>
                                    <span className="font-mono text-xs font-bold tracking-wider text-[#FFB800]">
                                        {liveFeedText}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/projects"
                            className="mt-4 font-mono text-[10px] uppercase tracking-widest text-gray-500 transition-colors hover:text-[#FFB800] md:mt-0"
                        >
                            VOIR TOUT →
                        </Link>
                    </div>
                </div>

                {/* Horizontal Scroll Track */}
                <div className="relative flex flex-1 items-center pl-4 md:pl-[max(1rem,calc((100vw-80rem)/2))]">
                    <motion.div style={{ x }} className="flex h-[60vh] gap-0">
                        {displayArticles.map((article, index) => (
                            <Link
                                href={article.linkUrl}
                                key={`${article.id}-${index}`}
                                className="group relative flex h-full w-[85vw] min-w-[300px] flex-col justify-between border-r border-white/10 px-8 first:pl-0 md:w-[35vw] lg:w-[30vw]"
                            >
                                {/* Image Area */}
                                <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-sm bg-[#111]">
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A] font-mono text-xs text-gray-700">
                                        NO SIGNAL
                                    </div>

                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                                    />

                                    {/* REC Overlay */}
                                    <div className="absolute left-3 top-3 font-mono text-[10px] text-white/70">REC</div>
                                    <div className="absolute right-3 top-3 font-mono text-[10px] text-white/70">
                                        {new Date().toISOString().slice(0, 10)}
                                    </div>

                                    {/* Scanner Line Effect */}
                                    <div className="absolute left-0 top-0 h-1 w-full -translate-y-full bg-[#FFB800]/50 opacity-0 shadow-[0_0_15px_#FFB800] group-hover:animate-[scan_2s_linear_infinite] group-hover:opacity-100" />
                                </div>

                                {/* Text Content */}
                                <div className="flex flex-1 flex-col">
                                    <div className="mb-3 border-l-2 border-transparent pl-0 font-mono text-[10px] uppercase tracking-widest text-gray-500 transition-all duration-300 group-hover:border-[#FFB800] group-hover:pl-3">
                                        {article.meta}
                                    </div>

                                    <h3 className="mb-4 font-heading text-2xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#FFB800] md:text-3xl">
                                        {article.title}
                                    </h3>

                                    <p className="mb-8 max-w-sm font-sans text-sm leading-relaxed text-gray-400">
                                        {article.description}
                                    </p>

                                    <div className="mt-auto">
                                        <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#FFB800]">
                                            <span>&gt;</span>
                                            {article.linkText}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* Spacer */}
                        <div className="w-[10vw] shrink-0" />
                    </motion.div>
                </div>

                {/* Bottom Border */}
                <div className="absolute bottom-0 left-0 w-full border-t border-white/10" />
            </div>
        </section>
    )
}
