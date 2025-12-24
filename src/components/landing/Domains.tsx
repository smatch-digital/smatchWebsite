'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DOMAINS_DATA = {
  title: 'Architecture de Solutions',
  subtitle:
    "Une suite intégrée d'outils puissants conçus pour l'évolutivité, la sécurité et la performance opérationnelle.",
  tabs: [
    {
      id: 'supply-chain',
      number: '01.',
      label: 'Supply Chain & Logistique',
      content: {
        moduleTag: 'MODULE: LOG_2.0 // FLOW OPTIMIZATION',
        subTitle: '1. AgriTech & Smart Assets',
        mainTitle: 'Gestion de Flux & Traçabilité',
        description:
          'Déploiement de capteurs intelligents et systèmes de tri automatisés. Nos solutions connectent vos actifs physiques à vos données décisionnelles pour une maintenance prédictive.',
        hardware: 'Capteurs RFID / Beacons GPS / Handhelds',
        image: '/assets/domains/supply-chain-iso.png',
      },
    },
    {
      id: 'industry',
      number: '02.',
      label: 'Industrie X.0 & IOT',
      content: {
        moduleTag: 'MODULE: IND_X.0 // AUTOMATION LAYER',
        subTitle: '2. Smart Factory & Robotique',
        mainTitle: 'Usine Connectée & Robotique',
        description:
          'Déploiement de capteurs intelligents et systèmes de tri automatisés. Nos solutions connectent vos actifs physiques (convoyeurs, machines) à vos données décisionnelles pour une maintenance prédictive.',
        hardware: 'Capteurs IoT / RFID Industriel',
        image: '/assets/domains/industry-iso.png',
      },
    },
    {
      id: 'solutions',
      number: '03.',
      label: 'Solutions Metier',
      content: {
        moduleTag: 'MODULE: CUSTOM_DEV // BUSINESS LOGIC',
        subTitle: '3. Solutions Spécifiques',
        mainTitle: 'Applications Verticales',
        description:
          "Développement de solutions verticales adaptées aux contraintes spécifiques de votre secteur d'activité, intégrant les processus métiers complexes.",
        hardware: 'Tablettes Durcies / Bornes Interactives',
        image: '/assets/domains/solutions-iso.png',
      },
    },
  ],
}

export function Domains() {
  const [activeTab, setActiveTab] = useState(DOMAINS_DATA.tabs[1].id)

  return (
    <section className="py-32 bg-[#050505] text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {DOMAINS_DATA.title}
          </h2>
          <p className="font-sans text-gray-500 max-w-2xl mx-auto text-base">
            {DOMAINS_DATA.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Navigation Tabs */}
          <div className="lg:col-span-3 flex flex-col pt-4">
            {DOMAINS_DATA.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group flex flex-col items-start py-6 px-6 text-left transition-all duration-300 relative
                  ${activeTab === tab.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
                `}
              >
                {/* Active Indicator Line */}
                <div
                  className={`absolute left-0 top-6 bottom-6 w-[2px] transition-colors duration-300 ${activeTab === tab.id ? 'bg-[#FFB800]' : 'bg-gray-800'}`}
                />

                <span className="text-[#FFB800] text-sm font-bold font-mono mb-2">
                  {tab.number}
                </span>
                <span className="font-heading text-xl font-bold leading-tight max-w-[150px]">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* RIGHT: Content Card */}
          <div className="lg:col-span-9">
            {/* Removed overflow-hidden here to allow image to break out */}
            <div className="bg-[#0F0F0F] rounded-2xl border border-white/5 p-8 md:p-12 min-h-[500px] relative flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {DOMAINS_DATA.tabs.map(
                  (tab) =>
                    tab.id === activeTab && (
                      <motion.div
                        key={tab.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full"
                      >
                        {/* Text Content */}
                        <div className="flex flex-col h-full relative z-10">
                          <div className="mb-6">
                            <span className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">
                              {tab.content.moduleTag}
                            </span>
                          </div>

                          <h4 className="text-[#FFB800] font-bold text-sm mb-2">
                            {tab.content.subTitle}
                          </h4>

                          <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.1]">
                            {tab.content.mainTitle}
                          </h3>

                          <p className="font-sans text-gray-500 text-sm leading-relaxed mb-12 max-w-sm">
                            {tab.content.description}
                          </p>

                          <div className="mt-auto pt-6 border-t border-white/5">
                            <span className="block text-[10px] text-gray-600 uppercase mb-1 font-mono">
                              Hardware
                            </span>
                            <span className="font-mono text-xs text-gray-400">
                              {tab.content.hardware}
                            </span>
                          </div>
                        </div>

                        {/* Visual / Image Area */}
                        {/* Added negative margins to pull the container right, out of the card */}
                        <div className="relative flex items-center justify-center min-h-[300px] md:min-h-0">
                          {/* The "Holo-Platform" Base Effects */}
                          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FFB800]/5 rounded-full blur-2xl pointer-events-none" />
                          {/* Removed the glowing yellow line here */}

                          {/* Tech Decorative Lines Container */}
                          <div className="absolute inset-0 border border-white/5 rounded-lg opacity-50 pointer-events-none">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFB800]" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFB800]" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FFB800]" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFB800]" />
                          </div>

                          {/* ACTUAL IMAGE RENDER */}
                          {/* Removed p-6 padding to allow image to fill space */}
                          <div className="relative z-10 w-full h-full flex items-center justify-center">
                            <motion.img
                              src={tab.content.image}
                              alt={tab.content.mainTitle}
                              // Increased width to 130%, removed max-h, and added transform to push it out of the frame
                              className="w-[110%] md:w-[130%] h-auto object-contain drop-shadow-2xl transform translate-x-6 translate-y-6 md:translate-x-12 md:translate-y-12"
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                            />

                            {/* Subtle floating animation overlay for extra "3D" feel */}
                            <motion.div
                              className="absolute inset-0 z-20 pointer-events-none"
                              animate={{ y: [0, -10, 0] }}
                              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
