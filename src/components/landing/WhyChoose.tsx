import React from 'react'
import {
  Factory,
  RocketLaunch,
  ShieldCheck,
  UsersThree,
  Plug,
  ChartLineUp,
} from '@phosphor-icons/react/dist/ssr'
import { SmartGrid } from '../blocks/SmartGrid'

const WHY_CHOOSE_DATA = {
  items: [
    {
      code: '01 // EXP',
      title: 'Heritage Industriel',
      description: "Ne du terrain, optimise pour l'industrie.",
      icon: <Factory />,
    },
    {
      code: '02 // INNOV',
      title: "Forte Capacite d'innovation",
      description: 'IoT, IA et standards de demain.',
      icon: <RocketLaunch />,
    },
    {
      code: '03 // REL',
      title: 'Solutions Fiables & Evolutives',
      description: 'Architecture robuste pour operations 24/7.',
      icon: <ShieldCheck />,
    },
    {
      code: '04 // TEAM',
      title: 'Equipe Multicompetente',
      description: 'Ingenieurs et consultants dedies.',
      icon: <UsersThree />,
    },
    {
      code: '05 // INT',
      title: 'Integration Rapide',
      description: "Pret a l'usage, connectivite immediate.",
      icon: <Plug />,
    },
    {
      code: '06 // PERF',
      title: 'Approche Oriente Resultats',
      description: 'Performance et efficacite garanties.',
      icon: <ChartLineUp />,
    },
  ],
}

export function WhyChoose() {
  return (
    <section className="py-24 bg-smatch-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
            Pourquoi Choisir Smatch?
          </h2>
          <p className="font-sans text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Une expertise unique alliant connaissance metier et technologies de pointe.
          </p>
        </div>

        {/* Smart Grid Implementation */}
        <SmartGrid
          items={WHY_CHOOSE_DATA.items.map((item) => ({
            id: item.code,
            title: item.title,
            description: item.description,
            icon: item.icon,
            badge: item.code, // Pass the code as the badge
          }))}
          columns={3}
        />
      </div>
    </section>
  )
}
