'use client'

import React from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { Target, Eye, Cube, ShieldCheck, Bank, ChartLineUp, Cpu } from '@phosphor-icons/react/dist/ssr'

export interface CardData {
  title: string
  description: string
  subtitle?: string
}

export interface MissionVisionProps {
  mission: CardData
  vision: CardData
}

// --- 1. Helper: Mouse-Tracking Glow Card ---
function GlowCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-md border border-white/5 bg-[#0F0F0F] p-6 transition-colors duration-500 hover:border-[#FFAA00]/50 md:p-8"
    >
      {/* Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 170, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// --- 2. Helper: Terminal Tag Component (The Requested Block) ---
const TerminalTag = ({ text }: { text: string }) => {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#050505] px-3 py-1.5 shadow-sm transition-colors duration-300 group-hover:border-[#FFAA00]/30">
      {/* Prompt Symbol */}
      <span className="select-none font-mono text-xs font-bold text-[#FFAA00]">{'>_'}</span>

      {/* Text */}
      <span className="font-mono text-[clamp(0.5rem,0.6vw,0.625rem)] uppercase tracking-wider text-gray-400 transition-colors group-hover:text-white">
        {text}
      </span>

      {/* Blinking Cursor */}
      <span className="h-3 w-1.5 bg-[#FFAA00] opacity-0 group-hover:animate-pulse group-hover:opacity-100" />
    </div>
  )
}

export function MissionVision({ mission, vision }: MissionVisionProps) {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-20 md:py-32">

      {/* Background Tech Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left Column: Cards */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Section Heading */}
            <div className="mb-2">
              <span className="mb-2 block pl-1 font-mono text-[clamp(0.6rem,0.75vw,0.75rem)] font-bold uppercase tracking-[0.2em] text-smatch-gold md:mb-4">
                Corporate Identity
              </span>
              <h2 className="font-heading text-3xl font-bold uppercase leading-none tracking-tight text-white md:text-5xl">
                Notre <span className="text-smatch-gold">ADN</span>
              </h2>
            </div>

            {/* Mission Card */}
            <GlowCard>
              <div className="flex flex-col items-start gap-6 sm:flex-row md:gap-8">
                {/* Icon Box */}
                <div className="group relative shrink-0">
                  <div className="flex size-[50px] items-center justify-center rounded-md border border-white/10 bg-smatch-gold/5 text-white/20 shadow-2xl transition-all duration-500 group-hover:border-[#FFAA00]/50 group-hover:bg-[#FFAA00]/5 group-hover:text-[#FFAA00] md:size-[60px]">
                    <Target size={24} weight="duotone" className='text-smatch-gold md:text-[32px]' />
                  </div>
                  {/* Connector Line */}
                  <div className="absolute left-1/2 top-16 -z-10 hidden h-[140%] w-px bg-gradient-to-b from-[#FFAA00]/20 to-transparent sm:block" />
                </div>

                <div className="pt-1">
                  {/* TERMINAL TAG */}
                  <TerminalTag text={mission.subtitle || 'PHASE 1: FOUNDATION'} />

                  {/* Title */}
                  <h3 className="mb-2 font-heading text-2xl font-bold uppercase leading-none text-white md:mb-4 md:text-3xl">
                    {mission.title}
                  </h3>

                  {/* Description */}
                  <div className="border border-white/5 bg-smatch-surface/20 group-hover:border-[#FFAA00]/50">
                    <p className="px-3 py-1.5 font-mono text-xs text-white/40 md:px-4 md:text-sm">
                      <span className="select-none font-mono text-[10px] font-bold text-[#FFAA00] md:text-xs">{'> '}</span>
                      {mission.description || 'PHASE 1: FOUNDATION'}
                    </p>
                  </div>
                </div>
              </div>
            </GlowCard>

            {/* Vision Card */}
            <GlowCard delay={0.2}>
              <div className="flex flex-col items-start gap-6 sm:flex-row md:gap-8">
                {/* Icon Box */}
                <div className="group relative shrink-0">
                  <div className="flex size-[50px] items-center justify-center rounded-md border border-white/10 bg-smatch-gold/5 text-white/20 shadow-2xl transition-all duration-500 group-hover:border-[#FFAA00]/50 group-hover:bg-[#FFAA00]/5 group-hover:text-[#FFAA00] md:size-[60px]">
                    <Eye size={24} weight="duotone" className='text-smatch-gold md:text-[32px]' />
                  </div>
                  <div className="absolute left-1/2 top-16 -z-10 hidden h-[140%] w-px bg-gradient-to-b from-[#FFAA00]/20 to-transparent sm:block" />

                </div>

                <div className="pt-1">
                  {/* TERMINAL TAG */}
                  <TerminalTag text={vision.subtitle || 'PHASE 2: EXPANSION'} />

                  {/* Title */}
                  <h3 className="mb-2 font-heading text-2xl font-bold uppercase leading-none text-white md:mb-4 md:text-3xl">
                    {vision.title}
                  </h3>

                  {/* Description */}
                  <p className="max-w-lg border-l-2 border-white/5 pl-4 font-sans text-xs leading-relaxed text-gray-400 transition-colors duration-500 group-hover:border-[#FFAA00] md:text-sm">
                    {vision.description}
                  </p>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Right Column: Animated Diagram */}
          <div className="relative flex h-[400px] w-full items-center justify-center md:h-[600px]">

            {/* Central Core */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-20 flex size-32 flex-col items-center justify-center rounded-full p-4 text-center md:size-48 md:p-6"
            >
              {/* Core Glows */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#FFAA00]/5 blur-2xl" />
              <div className="absolute inset-0 rounded-full border border-[#FFAA00]/30" />
              <div className="absolute inset-4 animate-[spin_10s_linear_infinite] rounded-full border border-dashed border-[#FFAA00]/10" />

              <div className="relative z-10 ">
                <div className="mb-2 flex justify-center text-[#FFAA00] drop-shadow-[0_0_10px_rgba(255,170,0,0.5)] md:mb-3">
                  <Cube size={32} weight="fill" className="md:size-[48px]" />
                </div>
                <span className="font-heading text-sm font-bold uppercase leading-tight tracking-wider text-white md:text-lg">
                  Innovation<br />Continue
                </span>
              </div>
            </motion.div>

            {/* Orbiting Nodes Container */}
            <motion.div
              className="absolute inset-0 "
              animate={{ rotate: 360 }}
              transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            >
              {/* Node 1: Top */}
              <div className="absolute left-1/2 top-[5%] z-10 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                  className="relative z-10 w-28 rounded-md border border-[#FFAA00]/20 bg-[#0F0F0F] p-2 text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] md:w-40 md:p-4"
                >
                  <span className="mb-1 block font-mono text-[8px] uppercase text-[#FFAA00] md:mb-2 md:text-[10px]">01.0 // PROCESS</span>
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-white md:gap-2 md:text-xs">
                    <ChartLineUp size={12} className="text-[#FFAA00] md:size-[16px]" />
                    Modéliser
                  </div>
                </motion.div>
                <div className="absolute left-1/2 top-full z-0 h-[80px] w-px bg-gradient-to-b from-[#FFAA00]/50 to-transparent md:h-[140px]" />
              </div>

              {/* Node 2: Right */}
              <div className="absolute right-[5%] top-1/2 z-10 -translate-y-1/2 translate-x-1/2">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                  className="relative z-10 w-28 rounded-md border border-[#FFAA00]/20 bg-[#0F0F0F] p-2 text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] md:w-40 md:p-4"
                >
                  <span className="mb-1 block font-mono text-[8px] uppercase text-[#FFAA00] md:mb-2 md:text-[10px]">02.0 // ETHICS</span>
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-white md:gap-2 md:text-xs">
                    <ShieldCheck size={12} className="text-[#FFAA00] md:size-[16px]" />
                    Responsabilité
                  </div>
                </motion.div>
                <div className="absolute right-full top-1/2 h-px w-[60px] bg-gradient-to-r from-[#FFAA00]/50 to-transparent md:w-[100px]" />
              </div>

              {/* Node 3: Bottom */}
              <div className="absolute bottom-[5%] left-1/2 z-10 -translate-x-1/2 translate-y-1/2">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                  className="relative z-10 w-28 rounded-md border border-[#FFAA00]/20 bg-[#0F0F0F] p-2 text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] md:w-40 md:p-4"
                >
                  <span className="mb-1 block font-mono text-[8px] uppercase text-[#FFAA00] md:mb-2 md:text-[10px]">03.0 // TECH</span>
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-white md:gap-2 md:text-xs">
                    <Cpu size={12} className="text-[#FFAA00] md:size-[16px]" />
                    Sécurité
                  </div>
                </motion.div>
                <div className="absolute bottom-full left-1/2 h-[80px] w-px bg-gradient-to-t from-[#FFAA00]/50 to-transparent md:h-[140px]" />
              </div>

              {/* Node 4: Left */}
              <div className="absolute left-[5%] top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                  className="relative z-10 w-28 rounded-md border border-[#FFAA00]/20 bg-[#0F0F0F] p-2 text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] md:w-40 md:p-4"
                >
                  <span className="mb-1 block font-mono text-[8px] uppercase text-[#FFAA00] md:mb-2 md:text-[10px]">04.0 // VALUE</span>
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-white md:gap-2 md:text-xs">
                    <Bank size={12} className="text-[#FFAA00] md:size-[16px]" />
                    Valorisation
                  </div>
                </motion.div>
                <div className="absolute left-full top-1/2 h-px w-[60px] bg-gradient-to-l from-[#FFAA00]/50 to-transparent md:w-[100px]" />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
