import React from 'react'
import {
  ChatCircleText,
  Check,
  Database,
  Globe,
  HardDrives,
  Cloud,
  Cpu,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

// Local props definition until types are generated
export type EcosystemBlockProps = {
  headline: string
  description: string
  connectivityTitle: string
  connectivityDesc: string
  supportTitle: string
  supportDesc: string
  apiTitle: string
  apiDesc: string
  optimizationTitle: string
  optimizationDesc: string
  controlTitle: string
  controlDesc: string
}

export const EcosystemBlock: React.FC<EcosystemBlockProps> = (props) => {
  const {
    headline,
    description,
    connectivityTitle,
    connectivityDesc,
    supportTitle,
    supportDesc,
    apiTitle,
    apiDesc,
    optimizationTitle,
    optimizationDesc,
    controlTitle,
    controlDesc,
  } = props

  return (
    <section className="relative w-full bg-[#050505] py-20 text-white selection:bg-[#FFB800] selection:text-black md:py-32 overflow-hidden">

      {/* 1. BACKGROUND NERVOUS SYSTEM (Restored SVG Lines) */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <svg className="h-full w-full" viewBox="0 0 1515 1200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB800" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFB800" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 750 600 L 400 300" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
          <path d="M 765 600 L 1100 300" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
          <path d="M 750 650 L 400 900" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
          <path d="M 765 650 L 1100 900" stroke="url(#lineGrad)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto max-w-[1600px] px-4">

        {/* HEADER */}
        <div className="mb-16 text-center md:mb-24">
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-[40px] leading-tight">
            {headline}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white/50 md:text-xl">
            {description}
          </p>
        </div>

        {/* THE GRID (8 cols x 6 rows) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-8 md:grid-rows-6 md:gap-4">

          {/* 1. UNIVERSAL CONNECTIVITY (Tall Left) */}
          {/* Position: Col 1-2 / Row 1-4 */}
          <div className="group relative overflow-hidden rounded-md border border-white/5 bg-[#0A0A0A] transition-all duration-500 hover:border-[#FFB800]/30 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-5">
            <div className="relative z-10 flex h-full flex-col p-6 md:p-8">

              {/* ORBIT ANIMATION */}
              <div className="relative mx-auto mt-8 size-[200px] md:mt-12">
                <div className="absolute inset-0 rounded-full border border-white/5 shadow-[0px_0px_20px_rgba(0,0,0,0.5)]" />
                <div className="absolute inset-[30px] rounded-full border border-white/10" />
                <div className="absolute inset-[60px] z-10 flex items-center justify-center rounded-full border border-white/10 bg-[#0A0A0A] shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  <span className="font-sans text-3xl font-semibold text-white">@</span>
                </div>
                {/* Orbiting Icons - 4 icons at 90° intervals */}
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                  {/* Top (0°) */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/10 bg-[#0A0A0A] p-2 shadow-lg">
                    <Database size={14} className="text-[#FFB800]" />
                  </div>
                  {/* Right (90°) */}
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/10 bg-[#0A0A0A] p-2 shadow-lg">
                    <Globe size={14} className="text-blue-500" />
                  </div>
                  {/* Bottom (180°) */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/10 bg-[#0A0A0A] p-2 shadow-lg">
                    <Cloud size={14} className="text-gray-400" />
                  </div>
                  {/* Left (270°) */}
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite_reverse] rounded-full border border-white/10 bg-[#0A0A0A] p-2 shadow-lg">
                    <HardDrives size={14} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* 3D PLUG IMAGE */}
              <div className="absolute inset-0 -left-20 z-30 pointer-events-none md:-top-20 md:-left-20">
                <div className="relative transform transition-transform duration-700 ease-out group-hover:scale-110">
                  <Image className='relative w-[280px] md:w-[320px]' alt='' src="/assets/ecosystem/plug.webp" width={400} height={400} />
                  <div className='absolute top-20 left-20 z-0 opacity-50 bg-smatch-gold h-[100px] w-[100px] rounded-full blur-[80px] mix-blend-screen transition-opacity duration-700 group-hover:opacity-80'></div>
                </div>
              </div>

              {/* Text Content */}
              <div className="relative z-10 mt-auto text-center">
                <h3 className="mb-3 text-xl font-bold leading-tight md:text-2xl">{connectivityTitle}</h3>
                <p className="text-sm font-medium leading-relaxed text-white/50">
                  {connectivityDesc}
                </p>
              </div>
            </div>
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFB800]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>


          {/* 2. SUPPORT (Wide Top) */}
          {/* Position: Col 3-6 / Row 1-2 */}
          <div className="group relative overflow-hidden rounded-md border border-white/5 bg-[#0A0A0A] p-6 transition-all duration-500 hover:border-[#FFB800]/30 md:col-start-3 md:col-end-7 md:row-start-1 md:row-end-3 md:p-10">
            {/* 3D Asset - z-20 above content */}
            <div className="absolute -top-20 -right-16 z-20 pointer-events-none md:-bottom-24 md:-right-20">
              <div className="relative transform transition-transform duration-700 ease-out group-hover:scale-110">
                <Image className="w-[180px] md:w-[350px]" alt='' src="/assets/ecosystem/support.png" width={300} height={300} />
                <div className='absolute top-10 left-10 -z-10 opacity-30 bg-smatch-gold h-[80px] w-[80px] rounded-full blur-[60px] transition-opacity duration-700 group-hover:opacity-60'></div>
              </div>
            </div>
            {/* Content - z-10 below asset */}
            <div className="relative z-10 flex h-full flex-col justify-between md:flex-col md:gap-4">

              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">{supportTitle}</h3>
                  <p className="max-w-xs text-sm font-medium text-white/50">{supportDesc}</p>
                </div>
              </div>

              {/* Chat UI (Restored Logic) */}
              <div className="flex flex-1 flex-col justify-center gap-3">
                {/* Bot */}
                <div className="flex items-center">
                  <div className="size-8 shrink-0 rounded-full bg-white/10" />
                  <div className="ml-3 rounded-r-2xl rounded-bl-sm rounded-tl-2xl border border-white/5 bg-[#ffffff0a] px-4 py-3">
                    <p className="text-xs text-white/60">Alerte: Le serveur de production WMS necessite une mise a jour.</p>
                  </div>
                </div>
                {/* User */}
                <div className="flex items-center justify-end">
                  <div className="mr-3 rounded-l-2xl rounded-br-sm rounded-tr-2xl bg-[#FFB800] px-4 py-3 shadow-lg">
                    <p className="text-xs font-bold text-black">Recu. Deploiment du patch correctif v2.4.1 en cours...</p>
                  </div>
                  <div className="size-8 shrink-0 rounded-full bg-[#FFB800]" />
                </div>
              </div>
            </div>
          </div>


          {/* 3. API FIRST (Tall Right) */}
          {/* Position: Col 7-8 / Row 1-4 */}
          <div className="group relative overflow-hidden rounded-md border border-white/5 bg-[#0A0A0A] transition-all duration-500 hover:border-[#FFB800]/30 md:col-start-7 md:col-end-9 md:row-start-1 md:row-end-5">
            <div className="absolute top-1/4 -right-12 z-20 pointer-events-none md:bottom-20 md:right-[-40px] md:top-auto">
              <div className="relative transform transition-transform duration-700 ease-out group-hover:scale-110">
                <Image className="w-[140px] md:w-[250px]" alt='' src="/assets/ecosystem/api.png" width={300} height={300} />
                <div className='absolute top-10 left-10 -z-10 opacity-30 bg-smatch-gold h-[60px] w-[60px] rounded-full blur-[50px] transition-opacity duration-700 group-hover:opacity-60'></div>
              </div>
            </div>
            <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
              {/* Window Controls */}
              <div className="mb-6 flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-[#FF5F57]" />
                <div className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="size-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-auto font-mono text-[10px] text-white/30">api.config.ts</span>
              </div>

              <div className="mb-8 h-px w-full bg-white/5" />

              {/* Code Snippet (Restored Colors) */}
              <div className="font-mono text-xs leading-relaxed md:text-sm">
                <div>
                  <span className="text-[#C792EA]">import</span> <span className="text-white">{'{ WMS }'}</span> <span className="text-[#C792EA]">from</span> <span className="text-[#98C379]">'@smatch/core'</span>;
                </div>
                <div className="mt-4">
                  <span className="text-[#C792EA]">const</span> <span className="text-[#61AFEF]">client</span> <span className="text-white">=</span> <span className="text-[#E5C07B]">new</span> <span className="text-[#E5C07B]">WMS</span><span className="text-white">({'{'}</span>
                </div>
                <div className="pl-4 text-white/80">
                  apiKey: <span className="text-[#98C379]">'sk_live...'</span>,
                </div>
                <div className="pl-4 text-white/80">
                  region: <span className="text-[#98C379]">'ma-cas-1'</span>
                </div>
                <div className="text-white">{'}'});</div>
                <div className="mt-4 italic text-white/40">// initialize sync</div>
              </div>

              {/* Bottom Text */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent p-6 pt-16">
                <h3 className="mb-2 text-xl font-bold">{apiTitle}</h3>
                <p className="text-sm font-medium text-white/50">{apiDesc}</p>
              </div>
            </div>
          </div>


          {/* 4. CORE INTELLIGENCE (Middle Center) */}
          {/* Position: Col 3-6 / Row 3-4 */}
          <div className="group relative overflow-hidden rounded-md border border-white/5 bg-[#0A0A0A] transition-all duration-500 hover:border-[#FFB800]/50 md:col-start-3 md:col-end-7 md:row-start-3 md:row-end-5">
            <div className="absolute inset-0 left-10 z-20 pointer-events-none flex md:left-4">
              <div className="relative flex justify-center items-center">
                <Image className="w-[160px] md:w-[250px] opacity-90 transform transition-transform duration-700 ease-out group-hover:scale-110" alt='' src="/assets/ecosystem/at.png" width={250} height={250} />
                <div className='absolute top-14 left-14 -z-10 opacity-30 bg-smatch-gold h-[80px] w-[80px] rounded-full blur-[60px] transition-opacity duration-700 group-hover:opacity-60'></div>
              </div>
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center bg-transparent">



              <div className="pl-0 md:pl-52 relative z-20">
                <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 backdrop-blur-md">
                  <Cpu size={14} className="text-[#FFB800]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFB800]">Neural Engine</span>
                </div>
                <h3 className="text-3xl font-bold text-white md:text-4xl">Intelligence fondamentale</h3>
              </div>
            </div>
          </div>


          {/* 5. OPTIMIZATION (Bottom Left) */}
          {/* Position: Col 1-4 / Row 5-6 */}
          <div className="group relative overflow-hidden rounded-md border border-white/5 bg-[#0A0A0A] p-6 transition-all duration-500 hover:border-[#FFB800]/30 md:col-start-1 md:col-end-5 md:row-start-5 md:row-end-7 md:p-10">

            <div className="absolute -bottom-10 -right-16 z-20 pointer-events-none md:-bottom-20 md:-right-10">
              <div className="relative transform transition-transform duration-700 ease-out group-hover:scale-110">
                <Image className='relative w-[280px] md:w-[350px]' alt='' src="/assets/ecosystem/chart.png" width={400} height={400} />
                <div className='absolute top-20 right-20 -z-10 opacity-30 bg-smatch-gold h-[100px] w-[100px] rounded-full blur-[70px] transition-opacity duration-700 group-hover:opacity-60'></div>
              </div>
            </div>
            <div className="relative z-20 flex h-full items-start justify-between">
              <div className="max-w-[340px]">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">{optimizationTitle}</h3>
                <p className="text-sm font-medium leading-relaxed text-white/50">
                  {optimizationDesc}
                </p>
              </div>
            </div>
          </div>


          {/* 6. CONTROL (Bottom Right) */}
          {/* Position: Col 5-8 / Row 5-6 */}
          <div className="group relative overflow-hidden rounded-md border border-white/5 bg-[#0A0A0A] transition-all duration-500 hover:border-[#FFB800]/30 md:col-start-5 md:col-end-9 md:row-start-5 md:row-end-7">
            <div className="absolute -bottom-12 -right-12 z-20 pointer-events-none md:-bottom-20 md:-right-20">
              <div className="relative transform transition-transform duration-700 ease-out group-hover:scale-110">
                <Image className='relative w-[220px] md:w-[380px] -rotate-12' alt='' src="/assets/ecosystem/joystick.png" width={300} height={300} />
                <div className='absolute top-20 right-20 -z-10 opacity-30 bg-smatch-gold h-[100px] w-[100px] rounded-full blur-[70px] transition-opacity duration-700 group-hover:opacity-60'></div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-end justify-between p-6 md:p-10">
              <div className="z-10 mb-2">
                <h3 className="mb-2 text-xl font-bold md:text-2xl">{controlTitle}</h3>
                <p className="max-w-[320px] text-sm font-medium leading-relaxed text-white/50">
                  {controlDesc}
                </p>
              </div>
              <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-[#FFB800] shadow-[0_0_20px_rgba(255,184,0,0.4)]">
                <Check size={20} className="text-black" strokeWidth={3} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
