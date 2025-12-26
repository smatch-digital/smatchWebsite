import React from 'react'
import {
  ChatCircleText,
  Check,
  Database,
  Globe,
  HardDrives,
  Cloud,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

export function Ecosystem() {
  return (
    <section className=" relative overflow-hidden bg-[#050505] text-white">
      {/* 1. BACKGROUND CONNECTING LINES (The "Nervous System") */}
      {/* This connects the Core (Center) to the peripherals visually */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden opacity-20 md:block">
        <svg className="size-full" viewBox="0 0 1515 1200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB800" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFB800" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Lines originating from roughly where the Center Card is */}
          {/* Top Left Connection */}
          <path d="M 750 600 L 400 300" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
          {/* Top Right Connection */}
          <path d="M 765 600 L 1100 300" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
          {/* Bottom Left Connection */}
          <path d="M 750 650 L 400 900" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
          {/* Bottom Right Connection */}
          <path d="M 765 650 L 1100 900" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto max-w-full px-4 md:max-w-[1515px]">
        {/* Header */}
        <div className="mb-[146px] text-center">
          <h2 className="mb-0 font-heading text-[32px] font-bold tracking-tight text-white md:text-[32px]">
            Notre Écosystème
          </h2>
          <p className="mx-auto mt-[41px] max-w-[999px] font-sans text-[24px] font-medium leading-[36px] text-[#ffffff82]">
            Un écosystème complet de solutions et de technologies pour accompagner nos clients dans
            toutes les étapes de leur digitalisation
          </p>
        </div>

        {/* BENTO LAYOUT */}
        <div className="flex flex-col items-center gap-[20px]">
          {/* ROW 1: Connectivity, Middle (Support+Core), API */}
          <div className="flex w-full flex-col justify-center gap-[20px] md:flex-row">
            {/* 1. Connectivité Universelle (Tall Left) */}
            <div className="group relative w-full overflow-hidden rounded-[20px] border border-white/5 bg-[#0A0A0A] transition-colors duration-500 hover:border-[#FFB800]/20 md:h-[545px] md:w-[400px]">
              <div className="flex h-full flex-col items-center px-[55px] pb-[61px] pt-[109px]">
                {/* Graphic: Orbit */}
                <div className="relative size-[222px] shrink-0">
                  <div className="absolute inset-0 rounded-full border border-white/5 shadow-[0px_0px_20px_rgba(0,0,0,0.5)]" />
                  <div className="absolute inset-[40px] rounded-full border border-white/10" />

                  {/* Center Icon */}
                  <div className="absolute inset-[72px] z-10 flex items-center justify-center rounded-full border border-white/10 bg-[#0A0A0A] shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    <span className="font-sans text-[32px] font-semibold text-white">@</span>
                  </div>

                  {/* Orbiting Icons */}
                  <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                    <div className="absolute right-[40px] top-0 animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/10 bg-[#0A0A0A] p-2 shadow-lg">
                      <Database size={14} weight="fill" className="text-[#FFB800]" />
                    </div>
                    <div className="absolute right-[-10px] top-[90px] animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/10 bg-[#0A0A0A] p-2 shadow-lg">
                      <Globe size={14} weight="fill" className="text-blue-500" />
                    </div>
                    <div className="absolute bottom-0 right-[40px] animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/10 bg-[#0A0A0A] p-2 shadow-lg">
                      <Cloud size={14} weight="fill" className="text-gray-400" />
                    </div>
                    <div className="absolute left-[-10px] top-[90px] animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/10 bg-[#0A0A0A] p-2 shadow-lg">
                      <HardDrives size={14} weight="fill" className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="mt-[58px] w-[276px] text-center">
                  <h3 className="mb-[28px] font-sans text-[24px] font-bold leading-[1.2] text-white">
                    Connectivité Universelle
                  </h3>
                  <p className="text-[16px] font-medium leading-[24px] text-[#ffffff7a]">
                    Intégration native avec +100 ERPs. SAP, Oracle, Sage et solutions propriétaires.
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Column: Support + Core */}
            <div className="flex w-full flex-col gap-[20px] md:w-[675px]">
              {/* 2. Support Ingénieur */}
              <div className="group relative w-full overflow-hidden rounded-[20px] border border-white/5 bg-[#0A0A0A] p-[43px_38px_47px_42px] transition-colors duration-500 hover:border-[#FFB800]/20 md:h-[271px]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-sans text-[24px] font-bold leading-[1.2] text-white">
                      Support Ingénieur
                    </h3>
                    <p className="mt-[18px] text-[16px] font-medium leading-[1.2] text-[#ffffff7a]">
                      Assistance technique dediée 24/7.
                    </p>
                  </div>
                  <div className="flex size-[42px] items-center justify-center rounded-full bg-white/5">
                    <ChatCircleText size={24} className="text-white" />
                  </div>
                </div>

                {/* Chat Bubbles */}
                <div className="mt-[34px] flex flex-col gap-4">
                  {/* Bot Message */}
                  <div className="flex items-center">
                    <div className="size-[34px] shrink-0 rounded-full bg-white/10" />
                    <div className="ml-[17px] rounded-r-[20px] rounded-bl-[4px] rounded-tl-[20px] border border-white/5 bg-[#ffffff0a] px-[20px] py-[12px]">
                      <p className="text-[14px] leading-snug text-[#ffffff80]">
                        Alerte: Le serveur de production WMS nécessite une mise à jour.
                      </p>
                    </div>
                  </div>

                  {/* Reply Message */}
                  <div className="flex items-center justify-end">
                    <div className="mr-[17px] rounded-l-[20px] rounded-br-[4px] rounded-tr-[20px] bg-[#FFB800] px-[20px] py-[12px] shadow-[0_4px_20px_rgba(255,184,0,0.2)]">
                      <p className="text-[14px] font-bold leading-snug text-black">
                        Reçu. Déploiement du patch correctif v2.4.1 en cours...
                      </p>
                    </div>
                    <div className="size-[34px] shrink-0 rounded-full bg-[#FFB800]" />
                  </div>
                </div>
              </div>

              {/* 4. Core Intelligence */}
              <div className="group relative w-full overflow-hidden rounded-[20px] border border-white/5 bg-[#0A0A0A] transition-colors duration-500 hover:border-[#FFB800]/50 md:h-[254px]">
                {/* CSS Glow Effects (Replaces missing SVG) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,184,0,0.15),transparent_70%)] opacity-80" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 bg-[#FFB800] opacity-10 blur-[120px]" />
                <div className="absolute bottom-0 left-20 top-1/4 h-20 w-40 rounded-full bg-smatch-gold opacity-70 blur-3xl " />
                <div className="absolute bottom-0 left-40 top-1/4 h-20 w-80 rounded-full bg-smatch-gold opacity-100 mix-blend-overlay blur-3xl" />
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center gap-6 z-10">
                    {/* Icon Container
                    <div className="w-[113px] h-[113px] rounded-[24px] border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md flex items-center justify-center shadow-[0px_4px_30px_0px_rgba(0,0,0,0.5)]">
                      <div className="w-[89px] h-[89px] rounded-[18px] bg-white flex items-center justify-center shadow-inner">
                        <span className="font-sans text-[40px] text-black font-bold">@</span>
                      </div>
                    </div>

                    {/* Text
                    <h3 className="font-sans text-[32px] font-bold text-white tracking-tight drop-shadow-md">
                      Core Intelligence
                    </h3>
                  </div>
                </div>*/}
                <Image
                  className="relative z-[1] mx-auto h-full w-1/2"
                  src={'/assets/domains/core-inteligence.svg'}
                  alt=""
                  width={1000}
                  height={1000}
                />
              </div>
            </div>

            {/* 3. API First (Tall Right) */}
            <div className="group relative flex w-full flex-col overflow-hidden rounded-[20px] border border-white/5 bg-[#0A0A0A] transition-colors duration-500 hover:border-[#FFB800]/20 md:h-[545px] md:w-[400px]">
              <div className="p-[24px]">
                {/* Window Controls */}
                <div className="mb-6 flex items-center gap-2">
                  <div className="size-3 rounded-full bg-[#FF5F57]" />
                  <div className="size-3 rounded-full bg-[#FEBC2E]" />
                  <div className="size-3 rounded-full bg-[#28C840]" />
                  <span className="ml-auto font-mono text-[12px] text-white/30">api.config.ts</span>
                </div>

                <div className="mb-6 h-px w-full bg-white/5" />

                {/* Code Content */}
                <div className="font-mono text-[14px] leading-relaxed">
                  <div>
                    <span className="text-[#C792EA]">import</span>{' '}
                    <span className="text-white">{'{ WMS }'}</span>{' '}
                    <span className="text-[#C792EA]">from</span>{' '}
                    <span className="text-[#98C379]">&apos;@smatch/core&apos;</span>;
                  </div>
                  <div className="mt-4">
                    <span className="text-[#C792EA]">const</span>{' '}
                    <span className="text-[#61AFEF]">client</span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-[#E5C07B]">new</span>{' '}
                    <span className="text-[#E5C07B]">WMS</span>
                    <span className="text-white">({'{'}</span>
                  </div>
                  <div className="pl-4 text-white/80">
                    apiKey: <span className="text-[#98C379]">&apos;sk_live...&apos;</span>,
                  </div>
                  <div className="pl-4 text-white/80">
                    region: <span className="text-[#98C379]">&apos;ma-cas-1&apos;</span>
                  </div>
                  <div className="text-white">{'}'});</div>
                  <div className="mt-4 italic text-white/40">{'//'} initialize sync</div>
                </div>
              </div>

              {/* Bottom Text */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent p-[30px] pt-20">
                <h3 className="mb-2 font-sans text-[24px] font-bold text-white">API First</h3>
                <p className="text-[16px] font-medium leading-snug text-[#ffffff7a]">
                  Documentation complete et SDKs modernes pour développeurs.
                </p>
              </div>
            </div>
          </div>

          {/* ROW 2: Optimization, Control */}
          <div className="flex w-full flex-col justify-center gap-[20px] md:flex-row">
            {/* 5. Optimization par l'IA */}
            <div className="group relative w-full overflow-hidden rounded-[20px] border border-white/5 bg-[#0A0A0A] p-[32px] transition-colors duration-500 hover:border-[#FFB800]/20 md:h-[232px] md:w-[749px]">
              <div className="relative z-20 ml-[10px] mt-[20px]">
                <h3 className="mb-[15px] font-sans text-[24px] font-bold text-white">
                  Optimisation par l&apos;IA
                </h3>
                <p className="max-w-[340px] text-[16px] font-medium leading-[24px] text-[#ffffff7a]">
                  Anticipez vos besoins et optimisez vos flux grâce à l&apos;analyse prédictive.
                </p>
              </div>

              {/* Chart */}
              <div className="pointer-events-none absolute bottom-0 right-0 h-[160px] w-3/5">
                <svg
                  className="size-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 300 100"
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFB800" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 100 L0 90 C 50 90, 100 80, 150 60 C 200 40, 250 20, 300 15 L 300 100 Z"
                    fill="url(#chartGradient)"
                  />
                  <path
                    d="M0 90 C 50 90, 100 80, 150 60 C 200 40, 250 20, 300 15"
                    fill="none"
                    stroke="#FFB800"
                    strokeWidth="2"
                  />

                  {/* Glowing Dot on Chart */}
                  <circle cx="250" cy="20" r="4" fill="#FFB800" className="animate-pulse" />
                </svg>

                {/* Floating Tooltip */}
                <div className="absolute right-1/4 top-[10px] rounded-lg border border-[#FFB800]/30 bg-[#1A1A1A] px-3 py-2 text-center shadow-xl">
                  <span className="block text-[18px] font-bold leading-none text-[#FFB800]">
                    +35%
                  </span>
                  <span className="mt-1 block text-[10px] uppercase tracking-wider text-white/60">
                    Efficacité
                  </span>
                </div>
              </div>
            </div>

            {/* 6. Controle Total */}
            <div className="group relative w-full overflow-hidden rounded-[20px] border border-white/5 bg-[#0A0A0A] transition-colors duration-500 hover:border-[#FFB800]/20 md:h-[232px] md:w-[747px]">
              {/* Background Gradient to simulate image if needed */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)]" />

              <div className="absolute inset-0 flex items-end justify-between p-[40px]">
                <div className="z-10 mb-2 flex flex-col items-start">
                  <h3 className="mb-[12px] font-sans text-[24px] font-bold text-white">
                    Contrôle Total
                  </h3>
                  <p className="max-w-[320px] text-[16px] font-medium leading-[24px] text-[#ffffff7a]">
                    Paramétrez vos flux logistiques via une interface intuitive sans code.
                  </p>
                </div>

                {/* Check Icon */}
                <div className="mb-[10px] mr-[10px]">
                  <div className="flex size-[32px] items-center justify-center rounded-full bg-[#FFB800] shadow-[0_0_20px_rgba(255,184,0,0.4)]">
                    <Check size={18} className="text-black" weight="bold" />
                  </div>
                </div>
              </div>

              {/* UI Floating Elements */}
              <div className="absolute right-[30px] top-[30px] flex flex-col gap-3">
                <div className="flex w-[280px] -rotate-2 items-center justify-between rounded-xl border border-[#FFB800] bg-[#111] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:rotate-0">
                  <div>
                    <span className="mb-0.5 block font-mono text-[10px] uppercase tracking-wider text-[#FFB800]">
                      Active Environment
                    </span>
                    <span className="text-[13px] font-bold text-white">v4.0 Cloud Native</span>
                  </div>
                  <div className="rounded-full bg-[#FFB800] p-1">
                    <Check size={12} className="text-black" weight="bold" />
                  </div>
                </div>

                <div className="flex w-[280px] origin-top-right scale-95 items-center justify-between rounded-xl border border-white/10 bg-[#111] p-3 opacity-40">
                  <div>
                    <span className="mb-0.5 block font-mono text-[10px] uppercase tracking-wider text-gray-500">
                      Legacy System
                    </span>
                    <span className="text-[13px] font-bold text-gray-400">v3.2 On-Premise</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
