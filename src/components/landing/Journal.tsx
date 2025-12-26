'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const JOURNAL_DATA = {
  header: {
    title: 'JOURNAL DES OPÉRATIONS',
    status: 'LIVE FEED',
    meta: 'ENCRYPTED // TLS 1.3',
  },
  articles: [
    {
      id: 1,
      meta: '2024 | AGRI-TECH | ÉVÉNEMENT',
      title: 'Présentation Ksibti @ SIAM',
      description: "Démonstration technologique de nos solutions AgriTech au Salon International de l'Agriculture. Rencontre avec les acteurs du secteur.",
      linkText: 'VOIR LE RÉCAP',
      image: '/assets/journal/siam-event.jpg', // Replace with your image path
    },
    {
      id: 2,
      meta: '2024 | AGRI-TECH | PROJET/INTÉGRATION',
      title: 'Intégration IoT & 4.0',
      description: 'Déploiement de capteurs et digitalisation industrielle sur site. Mise en place de l\'automatisation et connectivité des équipements.',
      linkText: 'DÉTAILS DU PROJET',
      image: '/assets/journal/iot-integration.jpg',
    },
    {
      id: 3,
      meta: '2024 | AGRI-TECH | WORKSHOP/ACADEMY',
      title: 'Séminaires Techniques 2025',
      description: 'Ateliers de formation et transfert de compétences pour nos partenaires. Sessions dédiées à la maintenance prédictive et outils WMS.',
      linkText: "S'INSCRIRE",
      image: '/assets/journal/seminar.jpg',
    },
    // Added extra items to demonstrate horizontal scrolling
    {
      id: 4,
      meta: '2025 | INNOVATION | R&D',
      title: 'Lancement Module IA Gen.',
      description: "Déploiement de la version beta de notre assistant logistique propulsé par LLM. Analyse prédictive en temps réel.",
      linkText: 'BETA ACCESS',
      image: '/assets/journal/ai-research.jpg',
    },
    {
      id: 5,
      meta: '2025 | SECURITY | INFRA',
      title: 'Mise à jour Cybersécurité',
      description: "Audit complet et renforcement des protocoles de chiffrement pour l'ensemble des infrastructures cloud de nos clients.",
      linkText: 'RAPPORT DE SÉCURITÉ',
      image: '/assets/journal/security.jpg',
    },
  ],
}

export function Journal() {
  const targetRef = useRef<HTMLDivElement>(null)

  // We track the scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // We transform that vertical scroll (0 to 1) into a horizontal move
  // From 0% (start) to -55% (move left). Adjust the -55% based on how many extra cards you have.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"])

  return (
    // The Container: 300vh height means it takes 3 screen heights to scroll through fully
    <section ref={targetRef} className="relative h-[300vh] bg-[#050505]">

      {/* The Sticky Viewport: Sticks to the top while we scroll through the container */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">

        {/* Header Section (Static) */}
        <div className="container relative z-10 mx-auto bg-[#050505] px-4 pt-12 md:pt-24">
            <div className="mb-12 flex flex-col items-end justify-between border-b border-white/10 pb-6 md:flex-row">

            <div className="flex items-center gap-6">
                <h2 className="font-heading text-lg font-bold uppercase tracking-widest text-white md:text-xl">
                {JOURNAL_DATA.header.title}
                </h2>

                {/* Live Feed Indicator */}
                <div className="flex items-center gap-3">
                    <div className="hidden h-px w-8 bg-gray-700 md:block"></div>
                    <div className="flex items-center gap-2">
                        <div className="relative flex size-2.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FFB800] opacity-75"></span>
                        <span className="relative inline-flex size-2.5 rounded-full bg-[#FFB800]"></span>
                        </div>
                        <span className="font-mono text-xs font-bold tracking-wider text-[#FFB800]">
                        {JOURNAL_DATA.header.status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-gray-500 md:mt-0">
                {JOURNAL_DATA.header.meta}
            </div>
            </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="relative flex flex-1 items-center pl-4 md:pl-[max(1rem,calc((100vw-80rem)/2))]">
           <motion.div style={{ x }} className="flex h-[60vh] gap-0">
              {JOURNAL_DATA.articles.map((article, index) => (
                 <div
                    key={index}
                    className="group relative flex h-full w-[85vw] min-w-[300px] flex-col justify-between border-r border-white/10 px-8 first:pl-0 md:w-[35vw] lg:w-[30vw]"
                 >
                    {/* Image Area */}
                    <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-sm bg-[#111]">
                        {/* Placeholder for missing image */}
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
                            {new Date().toISOString().slice(0,10)}
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
                            <button className="group/btn flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#FFB800]">
                                <span className="mr-2">&gt;</span>
                                {article.linkText}
                            </button>
                        </div>
                    </div>
                 </div>
              ))}

              {/* Spacer at the end so the last item isn't flush with edge */}
              <div className="w-[10vw] shrink-0" />
           </motion.div>
        </div>

        {/* Bottom Decorative Border */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/10" />
      </div>
    </section>
  )
}
