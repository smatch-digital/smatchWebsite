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
    <section className=" bg-[#050505] text-white overflow-hidden relative">
      {/* 1. BACKGROUND CONNECTING LINES (The "Nervous System") */}
      {/* This connects the Core (Center) to the peripherals visually */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 hidden md:block">
        <svg className="w-full h-full" viewBox="0 0 1515 1200" preserveAspectRatio="none">
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

      <div className="container mx-auto px-4 relative z-10 md:max-w-[1515px] max-w-full">
        {/* Header */}
        <div className="text-center mb-[146px]">
          <h2 className="font-heading text-[32px] md:text-[32px] font-bold tracking-tight text-white mb-0">
            Notre Écosystème
          </h2>
          <p className="font-sans text-[#ffffff82] max-w-[999px] mx-auto text-[24px] leading-[36px] font-medium mt-[41px]">
            Un écosystème complet de solutions et de technologies pour accompagner nos clients dans
            toutes les étapes de leur digitalisation
          </p>
        </div>

        {/* BENTO LAYOUT */}
        <div className="flex flex-col gap-[20px] items-center">
          {/* ROW 1: Connectivity, Middle (Support+Core), API */}
          <div className="flex flex-col md:flex-row gap-[20px] justify-center w-full">
            {/* 1. Connectivité Universelle (Tall Left) */}
            <div className="md:w-[400px] md:h-[545px] w-full bg-[#0A0A0A] border border-white/5 rounded-[20px] relative overflow-hidden group hover:border-[#FFB800]/20 transition-colors duration-500">
              <div className="pt-[109px] px-[55px] pb-[61px] h-full flex flex-col items-center">
                {/* Graphic: Orbit */}
                <div className="relative w-[222px] h-[222px] flex-shrink-0">
                  <div className="absolute inset-0 border border-white/5 rounded-full shadow-[0px_0px_20px_rgba(0,0,0,0.5)]" />
                  <div className="absolute inset-[40px] border border-white/10 rounded-full" />

                  {/* Center Icon */}
                  <div className="absolute inset-[72px] bg-[#0A0A0A] rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] z-10">
                    <span className="font-sans text-[32px] text-white font-semibold">@</span>
                  </div>

                  {/* Orbiting Icons */}
                  <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                    <div className="absolute top-0 right-[40px] bg-[#0A0A0A] p-2 rounded-full border border-white/10 shadow-lg animate-[spin_20s_linear_infinite_reverse]">
                      <Database size={14} weight="fill" className="text-[#FFB800]" />
                    </div>
                    <div className="absolute top-[90px] right-[-10px] bg-[#0A0A0A] p-2 rounded-full border border-white/10 shadow-lg animate-[spin_20s_linear_infinite_reverse]">
                      <Globe size={14} weight="fill" className="text-blue-500" />
                    </div>
                    <div className="absolute bottom-[0px] right-[40px] bg-[#0A0A0A] p-2 rounded-full border border-white/10 shadow-lg animate-[spin_20s_linear_infinite_reverse]">
                      <Cloud size={14} weight="fill" className="text-gray-400" />
                    </div>
                    <div className="absolute top-[90px] left-[-10px] bg-[#0A0A0A] p-2 rounded-full border border-white/10 shadow-lg animate-[spin_20s_linear_infinite_reverse]">
                      <HardDrives size={14} weight="fill" className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="mt-[58px] text-center w-[276px]">
                  <h3 className="font-sans text-[24px] font-bold text-white leading-[1.2] mb-[28px]">
                    Connectivité Universelle
                  </h3>
                  <p className="text-[16px] text-[#ffffff7a] font-medium leading-[24px]">
                    Intégration native avec +100 ERPs. SAP, Oracle, Sage et solutions propriétaires.
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Column: Support + Core */}
            <div className="flex flex-col gap-[20px] md:w-[675px] w-full">
              {/* 2. Support Ingénieur */}
              <div className="md:h-[271px] w-full bg-[#0A0A0A] border border-white/5 rounded-[20px] p-[43px_38px_47px_42px] relative overflow-hidden group hover:border-[#FFB800]/20 transition-colors duration-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-sans text-[24px] font-bold text-white leading-[1.2]">
                      Support Ingénieur
                    </h3>
                    <p className="text-[16px] text-[#ffffff7a] font-medium mt-[18px] leading-[1.2]">
                      Assistance technique dediée 24/7.
                    </p>
                  </div>
                  <div className="w-[42px] h-[42px] rounded-full bg-white/5 flex items-center justify-center">
                    <ChatCircleText size={24} className="text-white" />
                  </div>
                </div>

                {/* Chat Bubbles */}
                <div className="mt-[34px] flex flex-col gap-4">
                  {/* Bot Message */}
                  <div className="flex items-center">
                    <div className="w-[34px] h-[34px] rounded-full bg-white/10 flex-shrink-0" />
                    <div className="ml-[17px] bg-[#ffffff0a] rounded-r-[20px] rounded-bl-[4px] rounded-tl-[20px] px-[20px] py-[12px] border border-white/5">
                      <p className="text-[14px] text-[#ffffff80] leading-snug">
                        Alerte: Le serveur de production WMS nécessite une mise à jour.
                      </p>
                    </div>
                  </div>

                  {/* Reply Message */}
                  <div className="flex items-center justify-end">
                    <div className="mr-[17px] bg-[#FFB800] rounded-l-[20px] rounded-br-[4px] rounded-tr-[20px] px-[20px] py-[12px] shadow-[0_4px_20px_rgba(255,184,0,0.2)]">
                      <p className="text-[14px] text-black font-bold leading-snug">
                        Reçu. Déploiement du patch correctif v2.4.1 en cours...
                      </p>
                    </div>
                    <div className="w-[34px] h-[34px] rounded-full bg-[#FFB800] flex-shrink-0" />
                  </div>
                </div>
              </div>

              {/* 4. Core Intelligence */}
              <div className="md:h-[254px] w-full relative bg-[#0A0A0A] border border-white/5 rounded-[20px] overflow-hidden group hover:border-[#FFB800]/50 transition-colors duration-500">
                {/* CSS Glow Effects (Replaces missing SVG) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,184,0,0.15),transparent_70%)] opacity-80" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FFB800] blur-[120px] opacity-10 pointer-events-none" />
                <div className="absolute left-20 top-1/4 opacity-70 bottom-0 bg-smatch-gold w-40 h-20 rounded-full blur-3xl " />
                <div className="absolute left-40 top-1/4 mix-blend-overlay opacity-100 bottom-0 bg-smatch-gold w-80 h-20 rounded-full blur-3xl" />
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
                  className="relative w-1/2 h-full mx-auto z-[1]"
                  src={'/assets/domains/core-inteligence.svg'}
                  alt=""
                  width={1000}
                  height={1000}
                />
              </div>
            </div>

            {/* 3. API First (Tall Right) */}
            <div className="md:w-[400px] md:h-[545px] w-full bg-[#0A0A0A] border border-white/5 rounded-[20px] flex flex-col relative overflow-hidden group hover:border-[#FFB800]/20 transition-colors duration-500">
              <div className="p-[24px]">
                {/* Window Controls */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="ml-auto font-mono text-[12px] text-white/30">api.config.ts</span>
                </div>

                <div className="w-full h-[1px] bg-white/5 mb-6" />

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
                  <div className="mt-4 text-white/40 italic">{'//'} initialize sync</div>
                </div>
              </div>

              {/* Bottom Text */}
              <div className="absolute bottom-0 left-0 w-full p-[30px] bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent pt-20">
                <h3 className="font-sans text-[24px] font-bold mb-2 text-white">API First</h3>
                <p className="text-[16px] text-[#ffffff7a] font-medium leading-snug">
                  Documentation complete et SDKs modernes pour développeurs.
                </p>
              </div>
            </div>
          </div>

          {/* ROW 2: Optimization, Control */}
          <div className="flex flex-col md:flex-row gap-[20px] justify-center w-full">
            {/* 5. Optimization par l'IA */}
            <div className="md:w-[749px] md:h-[232px] w-full bg-[#0A0A0A] border border-white/5 rounded-[20px] p-[32px] relative overflow-hidden group hover:border-[#FFB800]/20 transition-colors duration-500">
              <div className="relative z-20 mt-[20px] ml-[10px]">
                <h3 className="font-sans text-[24px] font-bold mb-[15px] text-white">
                  Optimisation par l&apos;IA
                </h3>
                <p className="text-[16px] text-[#ffffff7a] font-medium max-w-[340px] leading-[24px]">
                  Anticipez vos besoins et optimisez vos flux grâce à l&apos;analyse prédictive.
                </p>
              </div>

              {/* Chart */}
              <div className="absolute bottom-0 right-0 w-[60%] h-[160px] pointer-events-none">
                <svg
                  className="w-full h-full overflow-visible"
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
                <div className="absolute top-[10px] right-[25%] bg-[#1A1A1A] border border-[#FFB800]/30 px-3 py-2 rounded-lg text-center shadow-xl">
                  <span className="block text-[#FFB800] font-bold text-[18px] leading-none">
                    +35%
                  </span>
                  <span className="block text-white/60 text-[10px] uppercase tracking-wider mt-1">
                    Efficacité
                  </span>
                </div>
              </div>
            </div>

            {/* 6. Controle Total */}
            <div className="md:w-[747px] md:h-[232px] w-full bg-[#0A0A0A] border border-white/5 rounded-[20px] relative overflow-hidden group hover:border-[#FFB800]/20 transition-colors duration-500">
              {/* Background Gradient to simulate image if needed */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)]" />

              <div className="absolute inset-0 p-[40px] flex items-end justify-between">
                <div className="flex flex-col items-start z-10 mb-2">
                  <h3 className="font-sans text-[24px] font-bold mb-[12px] text-white">
                    Contrôle Total
                  </h3>
                  <p className="text-[16px] text-[#ffffff7a] font-medium leading-[24px] max-w-[320px]">
                    Paramétrez vos flux logistiques via une interface intuitive sans code.
                  </p>
                </div>

                {/* Check Icon */}
                <div className="mb-[10px] mr-[10px]">
                  <div className="w-[32px] h-[32px] bg-[#FFB800] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,184,0,0.4)]">
                    <Check size={18} className="text-black" weight="bold" />
                  </div>
                </div>
              </div>

              {/* UI Floating Elements */}
              <div className="absolute top-[30px] right-[30px] flex flex-col gap-3">
                <div className="w-[280px] bg-[#111] border border-[#FFB800] rounded-xl p-3 flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                  <div>
                    <span className="block text-[10px] text-[#FFB800] font-mono mb-0.5 uppercase tracking-wider">
                      Active Environment
                    </span>
                    <span className="text-[13px] text-white font-bold">v4.0 Cloud Native</span>
                  </div>
                  <div className="bg-[#FFB800] rounded-full p-1">
                    <Check size={12} className="text-black" weight="bold" />
                  </div>
                </div>

                <div className="w-[280px] bg-[#111] border border-white/10 rounded-xl p-3 flex justify-between items-center opacity-40 transform scale-95 origin-top-right">
                  <div>
                    <span className="block text-[10px] text-gray-500 font-mono mb-0.5 uppercase tracking-wider">
                      Legacy System
                    </span>
                    <span className="text-[13px] text-gray-400 font-bold">v3.2 On-Premise</span>
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
