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
        <div className="container mx-auto px-4 pt-12 md:pt-24 z-10 bg-[#050505] relative">
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6 mb-12">

            <div className="flex items-center gap-6">
                <h2 className="font-heading text-lg md:text-xl font-bold tracking-widest text-white uppercase">
                {JOURNAL_DATA.header.title}
                </h2>

                {/* Live Feed Indicator */}
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-gray-700 hidden md:block"></div>
                    <div className="flex items-center gap-2">
                        <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFB800]"></span>
                        </div>
                        <span className="font-mono text-xs font-bold text-[#FFB800] tracking-wider">
                        {JOURNAL_DATA.header.status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-4 md:mt-0">
                {JOURNAL_DATA.header.meta}
            </div>
            </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="relative flex-1 flex items-center pl-4 md:pl-[max(1rem,calc((100vw-80rem)/2))]">
           <motion.div style={{ x }} className="flex gap-0 h-[60vh]">
              {JOURNAL_DATA.articles.map((article, index) => (
                 <div
                    key={index}
                    className="relative w-[85vw] md:w-[35vw] lg:w-[30vw] min-w-[300px] h-full flex flex-col justify-between group border-r border-white/10 px-8 first:pl-0"
                 >
                    {/* Image Area */}
                    <div className="relative w-full aspect-video overflow-hidden rounded-sm bg-[#111] mb-8">
                        {/* Placeholder for missing image */}
                        <div className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center text-gray-700 font-mono text-xs">
                           NO SIGNAL
                        </div>

                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100"
                        />

                        {/* REC Overlay */}
                        <div className="absolute top-3 left-3 font-mono text-[10px] text-white/70">REC</div>
                        <div className="absolute top-3 right-3 font-mono text-[10px] text-white/70">
                            {new Date().toISOString().slice(0,10)}
                        </div>

                        {/* Scanner Line Effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#FFB800]/50 shadow-[0_0_15px_#FFB800] translate-y-[-100%] group-hover:animate-[scan_2s_linear_infinite] opacity-0 group-hover:opacity-100" />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col flex-1">
                        <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3 border-l-2 border-transparent group-hover:border-[#FFB800] pl-0 group-hover:pl-3 transition-all duration-300">
                            {article.meta}
                        </div>

                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-[#FFB800] transition-colors duration-300">
                            {article.title}
                        </h3>

                        <p className="font-sans text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                            {article.description}
                        </p>

                        <div className="mt-auto">
                            <button className="flex items-center gap-2 text-[10px] font-bold font-mono tracking-widest text-[#FFB800] uppercase group/btn">
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
