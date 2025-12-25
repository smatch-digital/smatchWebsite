'use client'
import React from 'react'

import { AboutHero } from '@/components/about/AboutHero'
import { QuiSommesNous } from '@/components/about/QuiSommesNous'
import { MissionVision } from '@/components/about/MissionVision'
import { HistoryTimeline } from '@/components/about/HistoryTimeline'
import { TeamSection } from '@/components/about/TeamSection'
import { OrganizationGrid } from '@/components/about/OrganizationGrid'
import { CTA } from '@/components/landing/CTA'
import {
  Factory as FactoryIcon,
  Laptop as LaptopIcon,
  WifiHigh as WifiHighIcon,
  Database as DatabaseIcon,
  UserGear as UserGearIcon,
  ShareNetwork as ShareNetworkIcon,
} from '@phosphor-icons/react'

export default function AboutPage() {
  // Mock Data (Simulating CMS Content)

  const heroData = {
    headline: "UN PONT D'INNOVATION.",
    subheadline:
      "SMATCH Digital accélère la transformation numérique de nos partenaires à travers des solutions technologiques centrées sur l'humain.",
  }

  const quiSommesNousData = {
    title: 'QUI SOMMES NOUS?',
    description:
      "SMATCH Digital accélère la transformation numérique de ses partenaires à travers des solutions technologiques centrées sur l'humain, combinant expertise métier et innovations. En tant qu'intégrateur et éditeur, nous intervenons dans les secteurs industriel, logistique, agricole et touristique en apportant des solutions prêtes à la mise en œuvre. La traçabilité, l'IoT, l'automatisation, l'IA et la Data Intelligence sont autant de briques qui composent l'apanage de nos solutions.",
    locationLabel: 'CASABLANCA, MA',
  }

  const missionVisionData = {
    mission: {
      title: 'Notre Mission',
      description:
        "Accompagner la transformation digitale des organisations. Vulgariser la technologie et la rendre accessible auprès des opérateurs de la place. Contribuer au développement de l'économie digitale. Réaliser des solutions centrées sur les besoins métiers pour ce qui est d'industriels, logisticiens, distribution et acteurs de services.",
      subtitle: 'MISSION',
    },
    vision: {
      title: 'Notre Vision',
      description:
        "Faire de la technologie un moteur de performance, d'innovation et de durabilité pour les organisations marocaines. Exporter notre savoir-faire à l'international.",
      subtitle: 'VISION',
    },
  }

  const historyEvents = [
    {
      year: '2007',
      title: 'ELSMATCH',
      description: 'Genese Supply Chain & Consulting.',
      version: 'V1.0 // 2007'
    },
    {
      year: '2008',
      title: 'WMS PROLOG',
      description: 'Lancement Pole Digitalisation.',
      version: 'V1.2 // 2008'
    },
    {
      year: '2017',
      title: 'VARLEO',
      description: 'Acquisition & Deploiement Industrie 4.0.',
      version: 'V2.0 // 2017'
    },
    {
      year: '2021',
      title: 'SOFTLOG',
      description: 'Centre de R&D IoT & Prototypage.',
      version: 'V3.0 // 2021'
    },
    {
      year: '2023',
      title: 'SMATCH DIGITAL',
      description: "Creation de l'entite complete & Synergies.",
      version: 'V4.0 // 2023',
      isCurrent: true
    },
    {
      year: '2024',
      title: 'SC ADVISORY',
      description: 'Fusion, Transformation du savoir.',
      version: 'V4.1 // 2024'
    },
  ]

  const orgItems = [
    {
      title: 'SIT',
      description: "Pole d'étude, Monitoring, Architecture & Infra Cloud.",
      badge: 'TECH',
      icon: <FactoryIcon size={24} />,
    },
    {
      title: 'MESR',
      description: 'Maintenance Informatique & Support Systeme.',
      badge: 'TECH',
      icon: <LaptopIcon size={24} />,
    },
    {
      title: 'IOT',
      description: 'Hardware Development & Firmware Embedded.',
      badge: 'TECH',
      icon: <WifiHighIcon size={24} />,
    },
    {
      title: 'DATA',
      description: 'Intelligence Artificielle & Traitement Analytique.',
      badge: 'TECH',
      icon: <DatabaseIcon size={24} />,
    },
    {
      title: 'CPO',
      description: 'Gestion Projets Agiles & Gouvernance Projets.',
      badge: 'TECH',
      icon: <UserGearIcon size={24} />,
    },
    {
      title: 'NETWORK',
      description: 'Reseau Telecom & Connectivite.',
      badge: 'TECH',
      icon: <ShareNetworkIcon size={24} />,
    },
  ]

  return (
    <main className="bg-smatch-black min-h-screen">
      <AboutHero {...heroData} />
      <QuiSommesNous {...quiSommesNousData} />
      <MissionVision {...missionVisionData} />
      <HistoryTimeline events={historyEvents} />
      <TeamSection />
      <OrganizationGrid items={orgItems} />
      <CTA />
    </main>
  )
}
