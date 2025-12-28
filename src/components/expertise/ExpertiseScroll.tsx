'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ArrowRight, Cube, Factory, Brain, ChartBar, Truck, Database, WifiHigh, ShieldCheck, Plant, Bed, UsersThree } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import Image from 'next/image'

// Register (ensure only client side)
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

// --- CONFIG ---
const ALL_GOLD = '#FFB800'

// --- MOCK DATA ---
const EXPERTISE_SECTIONS = [
    {
        id: 'big-data',
        layout: 'sticky_grid',
        title: 'BIG DATA & ANALYSIS',
        subtitle: 'INTELLIGENCE DÉCISIONNELLE',
        description: "La donnée est le nouvel or noir. Nous structurons vos Data Lakes et déployons des algorithmes prédictifs.",
        mainImage: '/assets/expertise/data-iso.png',
        color: ALL_GOLD, // Unified to Gold
        cards: [
            { id: 'lakes', title: 'Data Archiving', icon: Database, desc: 'Centralisation & Sécurité', image: '/assets/expertise/data-iso.png' },
            { id: 'etl', title: 'ETL Pipelines', icon: ChartBar, desc: 'Transformation de Données', image: '/assets/expertise/ai-iso.png' },
            { id: 'bi', title: 'Business Intelligence', icon: Brain, desc: 'Tableaux de Bord Dynamiques', image: '/assets/expertise/sim-iso.png' },
        ]
    },
    {
        id: 'industry-4-0',
        layout: 'sticky_grid',
        title: 'INDUSTRIE 4.0 & IOT',
        subtitle: 'L\'USINE CONNECTÉE',
        description: "Connecter le monde physique au numérique. Capteurs IoT, maintenance prédictive et automatisation.",
        mainImage: '/assets/domains/industry-iso.png',
        color: ALL_GOLD,
        cards: [
            { id: 'iot', title: 'Capteurs IOT', icon: WifiHigh, desc: 'Collecte Temps Réel', image: '/assets/domains/industry-iso.png' },
            { id: 'robotics', title: 'Robotique', icon: Factory, desc: 'Automatisation & Cobots', image: '/assets/domains/supply-chain-iso.png' },
            { id: 'predictive', title: 'Maintenance IA', icon: ShieldCheck, desc: 'Anticipation des Pannes', image: '/assets/domains/solutions-iso.png' },
        ]
    },
    {
        id: 'solutions-metier',
        layout: 'scannable_sticky', // THE NEW REQUESTED LAYOUT
        title: 'DIGITALISATION DU VIVANT',
        subtitle: 'SOLUTIONS MÉTIERS',
        description: "Des écosystèmes digitaux complets pour des secteurs spécialisés. De l'agriculture de précision à la gestion hôtelière.",
        mainImage: '/assets/domains/solutions-iso.png',
        color: ALL_GOLD,
        cards: [
            { id: 'agri', title: 'Agriculture', icon: Plant, desc: 'Tracking & Monitoring Bétail', image: '/assets/expertise/agri-wireframe.png' },
            // Added Spacer items or simply relying on gap? User said "spaced out vertically with large gaps".
            { id: 'hospitality', title: 'Hospitalité', icon: Bed, desc: 'Smart Hotels & Expérience Client', image: '/assets/expertise/hotel-wireframe.png' },
            { id: 'city', title: 'Citoyenneté', icon: UsersThree, desc: 'E-Gouvernement & Identité', image: '/assets/expertise/city-wireframe.png' },
            // Extra spacer for scrolling past
        ]
    }
]

// --- 1. STICKY GRID (Existing Logic for first 2 sections) ---
const StickyGridSection = ({ section, index }: { section: typeof EXPERTISE_SECTIONS[0], index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeImage, setActiveImage] = useState(section.mainImage)

    useGSAP(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        )
    }, { scope: containerRef })

    return (
        <div ref={containerRef} className="relative flex min-h-screen flex-col items-start lg:flex-row">
            {/* Sticky Visual */}
            <div className="sticky top-0 hidden h-screen w-full flex-1 items-center justify-center bg-[#050505] p-10 lg:flex lg:w-1/2">
                <div className="relative flex size-full max-w-xl items-center justify-center rounded-3xl border border-white/5 bg-[#0A0A0A] shadow-2xl">
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]" style={{ '--tw-gradient-from': `${section.color}15`, '--tw-gradient-to': 'transparent' } as any} />
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeImage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative z-10 size-full p-12"
                        >
                            <div className="relative size-full">
                                <Image
                                    src={activeImage}
                                    alt={section.title}
                                    fill
                                    className="object-contain drop-shadow-[0_0_50px_rgba(255,184,0,0.2)]"
                                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                                />
                                <div className="absolute inset-0 -z-10 flex items-center justify-center text-white/5">
                                    <Cube weight="thin" size={128} />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <div className="absolute bottom-10 left-10 font-mono text-6xl font-bold text-white/5">0{index + 1}.</div>
                </div>
            </div>

            {/* Content Content */}
            <div className="relative z-10 w-full flex-1 bg-[#050505] px-6 py-24 lg:w-1/2 lg:px-20 lg:py-32">
                <div className="mb-20">
                    <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[0.2em]" style={{ color: section.color }}>{section.subtitle}</span>
                    <h2 className="mb-8 font-heading text-5xl font-bold uppercase leading-none tracking-tight text-white md:text-6xl">{section.title}</h2>
                    <p className="max-w-xl font-sans text-lg leading-relaxed text-gray-400">{section.description}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {section.cards.map((card) => (
                        <div
                            key={card.id}
                            onMouseEnter={() => setActiveImage(card.image)}
                            onMouseLeave={() => setActiveImage(section.mainImage)}
                            className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#0F0F0F] p-8 transition-all duration-300 hover:border-[#FFB800]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative z-10 flex flex-col items-start gap-4">
                                <div className="rounded-md bg-white/5 p-3 text-white/40 transition-colors duration-300 group-hover:bg-[#FFB800] group-hover:text-black">
                                    <card.icon size={24} weight="duotone" />
                                </div>
                                <div>
                                    <h3 className="font-heading text-xl font-bold uppercase text-white transition-colors group-hover:text-[#FFB800]">{card.title}</h3>
                                    <p className="mt-2 font-mono text-xs text-gray-500">{card.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


// --- 2. SCANNABLE STICKY SECTION ('The Magic') ---
const ScannableStickySection = ({ section, index }: { section: typeof EXPERTISE_SECTIONS[0], index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const rightColRef = useRef<HTMLDivElement>(null)
    const [activeCardId, setActiveCardId] = useState<string>(section.cards[0].id)

    useGSAP(() => {
        // For each card in the right column, create a ScrollTrigger
        const cards = gsap.utils.toArray('.scannable-card') as HTMLElement[]

        cards.forEach((card) => {
            ScrollTrigger.create({
                trigger: card,
                start: 'top center+=10%', // When card hits center
                end: 'bottom center+=10%',
                onEnter: () => setActiveCardId(card.dataset.id!),
                onEnterBack: () => setActiveCardId(card.dataset.id!),
                // Toggle classes for visual "Scanning" effect
                toggleClass: { targets: card, className: 'is-active-scan' },
            })
        })

    }, { scope: rightColRef, dependencies: [section.cards] })

    // Derived Active Data
    const activeCardData = section.cards.find(c => c.id === activeCardId) || section.cards[0]


    return (
        <div ref={containerRef} className="relative flex flex-col bg-[#050505] lg:flex-row">

            {/* LEFT: THE ANCHOR (Sticky) */}
            <div className="relative hidden h-screen w-1/2 flex-col justify-between p-20 lg:sticky lg:top-0 lg:flex">
                {/* Text Block */}
                <div className="relative z-10 mt-20">
                    <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#FFB800]">
                        {section.subtitle}
                    </span>
                    <h2 className="mb-6 font-heading text-6xl font-bold uppercase leading-[0.9] text-white">
                        {section.title}
                    </h2>
                    <p className="max-w-md font-sans text-lg leading-relaxed text-gray-400">
                        {section.description}
                    </p>
                </div>

                {/* THE 3D BULL / VISUAL */}
                {/* Changes based on activeCardId */}
                <div className="absolute bottom-0 right-0 z-0 h-4/5 w-[90%] opacity-100">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCardId}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="relative size-full"
                        >
                            <Image
                                src={activeCardData.image}
                                alt={activeCardData.title}
                                fill
                                className="object-contain object-bottom drop-shadow-[0_0_80px_rgba(255,184,0,0.15)]"
                            />
                            {/* Connector Line (Virtual) */}
                            {/* A visual line from right edge towards center to imply connection to the list */}
                            <div className="absolute right-0 top-1/2 h-px w-20 bg-gradient-to-l from-[#FFB800] to-transparent" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Number */}
                <div className="relative z-10 font-mono text-sm text-gray-600">
                    SYSTEM STATUS: SCANNING...
                </div>
            </div>


            {/* RIGHT: THE TRIGGER LIST (Scrollable) */}
            <div ref={rightColRef} className="flex min-h-[150vh] w-full flex-col justify-center px-6 py-24 pb-[40vh] lg:w-1/2 lg:px-32 lg:pt-[40vh]">
                <div className="flex flex-col gap-[30vh]"> {/* LARGE GAPS between cards */}
                    {section.cards.map((card) => (
                        <div
                            key={card.id}
                            data-id={card.id}
                            className={clsx(
                                "scannable-card group relative flex items-center gap-6 rounded-r-xl border-l-4 bg-[#0F0F0F] p-8 transition-all duration-500",
                                // Inactive State: Dark, Transparent-ish border
                                "border-transparent opacity-40 grayscale",
                                // Active State (Handled by GSAP toggleClass 'is-active-scan' usually, but we also use React State for failsafe)
                                activeCardId === card.id && "!border-[#FFB800] !bg-black/80 !opacity-100 ring-1 ring-[#FFB800]/20 !grayscale-0 backdrop-blur-md"
                            )}
                        >
                            {/* Connector Line (Leftwards) - Only visible when active */}
                            <div className={clsx(
                                "absolute -left-20 top-1/2 h-px w-20 bg-[#FFB800] transition-all duration-500",
                                activeCardId === card.id ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                            )} />

                            <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#FFB800]">
                                <card.icon size={32} weight={activeCardId === card.id ? "fill" : "duotone"} />
                            </div>

                            <div>
                                <h3 className="font-heading text-2xl font-bold uppercase text-white">{card.title}</h3>
                                <p className="font-mono text-xs text-gray-500">{card.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}


export function ExpertiseScroll() {
    return (
        <div className="relative w-full">
            {EXPERTISE_SECTIONS.map((section, i) => {
                if (section.layout === 'scannable_sticky') {
                    return <ScannableStickySection key={section.id} section={section} index={i} />
                }
                return <StickyGridSection key={section.id} section={section} index={i} />
            })}
        </div>
    )
}
