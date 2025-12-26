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
    <section className="relative overflow-hidden bg-smatch-black py-24">
      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="mb-4 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
            Pourquoi Choisir Smatch?
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-gray-400">
            Une expertise unique alliant connaissance metier et technologies de pointe.
          </p>
        </div>

        {/* Smart Grid Implementation */}
        <SmartGrid
          cards={WHY_CHOOSE_DATA.items.map((item) => ({
            id: item.code,
            title: item.title,
            description: item.description,
            icon: item.icon,
            badge: item.code,
          }))}
          columns={3}
        />
      </div>
    </section>
  )
}
