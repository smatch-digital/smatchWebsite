'use client'

import React, { useEffect } from 'react'
import {
  Factory,
  Globe,
  Truck,
  Leaf,
  Cpu,
  Database,
  Cube,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/utilities/ui'

// --- DATA ---
const EXPERTISE_DATA = [
  {
    id: 'industrie',
    title: 'INDUSTRIE X.0',
    subtitle: 'AUTOMATISATION',
    description: 'Transformation numérique des lignes de production.',
    cards: [
      {
        title: 'AUTOMATISATION INTELLIGENTE',
        subtitle: 'INDUSTRIE 4.0',
        description:
          "Accélérez votre transformation vers l'Industrie 4.0. De la logistique à la ligne de production, nous déployons l'intelligence au cœur de la machine.",
        image: '/assets/expertise/turbine.png',
        features: [
          'Pilotage & Robotique (Bras, AGV)',
          'Systèmes Embarqués sur mesure',
          'Maintenance Prédictive IoT',
        ],
        icon: <Factory className="h-8 w-8 text-yellow-500" />,
      },
    ],
  },
  {
    id: 'solutions',
    title: 'SOLUTIONS MÉTIER',
    subtitle: 'SECTEURS CLÉS',
    description: 'Expertise verticale pour des défis spécifiques.',
    cards: [
      {
        title: 'SUPPLY CHAIN 360',
        subtitle: 'LOGISTIQUE',
        description:
          'Une visibilité totale sur vos opérations grâce à la traçabilité RFID, la gestion WMS avancée et l’orchestration des transports.',
        image: '/assets/domains/supply-chain-iso.png',
        features: ['WMS & TMS Intégrés', 'Traçabilité RFID Temps Réel', 'Optimisation de Tournées'],
        icon: <Truck className="h-8 w-8 text-orange-500" />,
      },
      {
        title: 'AGRI & HOSPITALITÉ',
        subtitle: 'SMART SERVICES',
        description:
          "Digitalisation des actifs ruraux (AgriTech) et réinvention de l'expérience client (Hospitalité) via l'IoT.",
        image: '/assets/expertise/bull-wireframe.png',
        features: ['Suivi Bétail & Rendement', 'Check-in Sans Contact', 'Computer Vision'],
        icon: <Leaf className="h-8 w-8 text-green-500" />,
      },
      {
        title: 'CITOYENNETÉ',
        subtitle: 'SMART CITY',
        description:
          'Plateformes unifiées, identité numérique et transparence administrative pour les villes de demain.',
        image: '/assets/domains/core-inteligence.png',
        features: ['Portails Citoyens Unifiés', 'Identité Numérique', 'Gestion des Déchets'],
        icon: <Globe className="h-8 w-8 text-blue-500" />,
      },
    ],
  },
  {
    id: 'data-ai',
    title: 'DATA & INTELLIGENCE',
    subtitle: 'COGNITIVE',
    description: 'Le pouvoir de la donnée massive.',
    cards: [
      {
        title: 'INTELLIGENCE ARTIFICIELLE',
        subtitle: 'AI AGENTS',
        description:
          "Algorithmes génératifs et vision par ordinateur pour l'automatisation des tâches complexes.",
        image: '/assets/domains/core-inteligence.svg',
        features: ['LLMs & Agents Autonomes', 'OCR & Traitement Doc', 'Computer Vision'],
        icon: <Cpu className="h-8 w-8 text-purple-500" />,
      },
      {
        title: 'BIG DATA ANALYTICS',
        subtitle: 'DATA ENGINEERING',
        description:
          'Traitement massif de données non structurées. De la collecte à la visualisation décisionnelle.',
        image: '/assets/expertise/data-cube.png',
        features: ['Data Lakes & Warehouses', 'Pipelines ETL Temps Réel', 'Dashboards BI'],
        icon: <Database className="h-8 w-8 text-cyan-500" />,
      },
      {
        title: 'SIMULATION 3D',
        subtitle: 'DIGITAL TWINS',
        description:
          'Jumeaux numériques pour entrepôts et usines. Simulation immersive des opérations sous Unreal Engine 5.',
        image: '/assets/domains/industry-iso.png',
        features: ['Jumeaux Numériques', 'Simulation de Flux', 'Rendu Temps Réel'],
        icon: <Cube className="h-8 w-8 text-red-500" />,
      },
    ],
  },
]

export default function ExpertiseScroll() {
  // Enable scroll snapping on the document root
  useEffect(() => {
    // Save original style to restore on unmount
    const originalScrollSnapType = document.documentElement.style.scrollSnapType

    // Use 'proximity' instead of 'mandatory' so the browser doesn't force scrolling
    // away from sections that don't have snap points (like Hero/Footer).
    document.documentElement.style.scrollSnapType = 'y proximity'

    return () => {
      document.documentElement.style.scrollSnapType = originalScrollSnapType
    }
  }, [])

  return (
    <div className="bg-black relative z-10">
      <div className="container mx-auto px-4 py-32">
        {/* Loop through Main Sections */}
        {EXPERTISE_DATA.map((section, index) => (
          <div
            key={section.id}
            className="relative grid md:grid-cols-12 gap-16 lg:gap-24 py-32 border-t border-white/10 first:border-0"
          >
            {/* LEFT COLUMN: Sticky Header */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="sticky top-40">
                <span className="font-mono text-sm text-yellow-500 tracking-widest mb-4 block">
                  0{index + 1} / {section.subtitle}
                </span>
                <h2 className="text-4xl md:text-5xl font-black font-heading leading-loose text-white mb-6 uppercase leading-none">
                  {section.title}
                </h2>
                <p className="text-zinc-500 text-lg max-w-xs">{section.description}</p>
              </div>
            </div>

            {/* RIGHT COLUMN: Stacked Cards */}
            <div className="md:col-span-8 lg:col-span-9 space-y-48">
              {section.cards.map((card, i) => (
                <div key={i} className="group relative snap-center">
                  {/* Background Glow */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/10 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative bg-zinc-900/40 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm hover:border-yellow-500/30 transition-colors duration-500">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Text Content */}
                      <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="p-3 bg-white/5 rounded-full border border-white/10 text-white">
                            {card.icon}
                          </div>
                          <span className="font-mono text-xs font-bold text-yellow-500 uppercase tracking-widest">
                            {card.subtitle}
                          </span>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-4 uppercase">
                          {card.title}
                        </h3>
                        <p className="text-zinc-400 leading-relaxed mb-12">{card.description}</p>

                        <ul className="space-y-6">
                          {card.features.map((feature, fIndex) => (
                            <li
                              key={fIndex}
                              className="flex items-start gap-3 text-sm text-zinc-300"
                            >
                              <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Image Content */}
                      <div className="relative min-h-[300px] lg:min-h-full bg-black/50 border-t lg:border-t-0 lg:border-l border-white/10">
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                          {/* Glow behind image */}
                          <div className="absolute w-[200px] h-[200px] bg-yellow-500/20 blur-[80px] rounded-full" />
                          <img
                            src={card.image}
                            alt={card.title}
                            className="relative z-10 w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
