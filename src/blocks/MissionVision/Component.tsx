'use client'

import React from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { Target, Eye, Cube, ShieldCheck, Bank, ChartLineUp, Cpu } from '@phosphor-icons/react/dist/ssr'
import type { MissionVisionBlock } from '@/payload-types'

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
      className="group relative overflow-hidden rounded-md border border-white/5 bg-[#0F0F0F] p-6 transition-colors duration-500 hover:border-[#FFB800]/50 md:p-8"
    >
      {/* Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 184, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// --- 2. Helper: Terminal Tag Component ---
const TerminalTag = ({ text }: { text: string }) => {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#050505] px-3 py-1.5 shadow-sm transition-colors duration-300 group-hover:border-[#FFB800]/30">
      {/* Prompt Symbol */}
      <span className="select-none font-mono text-xs font-bold text-[#FFB800]">{'>_'}</span>

      {/* Text */}
      <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 transition-colors group-hover:text-white md:text-[10px]">
        {text}
      </span>

      {/* Blinking Cursor */}
      <span className="h-3 w-1.5 bg-[#FFB800] opacity-0 group-hover:animate-pulse group-hover:opacity-100" />
    </div>
  )
}

// Map index to Icon for the 4 nodes
const NODE_ICONS = [ChartLineUp, ShieldCheck, Cpu, Bank]

export const MissionVisionBlockComponent: React.FC<MissionVisionBlock> = (props) => {
  const { sectionHeader, mission, vision, core, nodes } = props

  // Fallbacks in case data is missing
  const missionTitle = mission?.title || 'Notre Mission'
  const missionSubtitle = mission?.subtitle || 'PHASE 1: FOUNDATION'
  const missionDesc = mission?.description || ''

  const visionTitle = vision?.title || 'Notre Vision'
  const visionSubtitle = vision?.subtitle || 'PHASE 2: EXPANSION'
  const visionDesc = vision?.description || ''

  const headerTitle = sectionHeader?.title || 'Notre ADN'
  const headerSubtitle = sectionHeader?.subtitle || 'Corporate Identity'

  const coreText = core?.text || 'Innovation Continue'

  const safeNodes = nodes || []

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
              <span className="mb-2 block pl-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-smatch-gold md:mb-4 md:text-xs">
                {headerSubtitle}
              </span>
              <h2 className="font-heading text-3xl font-bold uppercase leading-none tracking-tight text-white md:text-5xl">
                {/* Handle splitting if "ADN" needs color, for now standard text */}
                {headerTitle.includes('ADN') ? (
                  <>
                    {headerTitle.replace('ADN', '')} <span className="text-[#FFB800]">ADN</span>
                  </>
                ) : (
                  headerTitle
                )}
              </h2>
            </div>

            {/* Mission Card */}
            <GlowCard>
              <div className="flex flex-col items-start gap-6 sm:flex-row md:gap-8">
                {/* Icon Box */}
                <div className="group relative shrink-0">
                  <div className="flex size-[50px] items-center justify-center rounded-md border border-white/10 bg-smatch-gold/5 text-white/20 shadow-2xl transition-all duration-500 group-hover:border-[#FFB800]/50 group-hover:bg-[#FFB800]/5 group-hover:text-[#FFB800] md:size-[60px]">
                    <Target size={24} weight="duotone" className='text-smatch-gold md:text-[32px]' />
                  </div>
                  {/* Connector Line */}
                  <div className="absolute left-1/2 top-16 -z-10 hidden h-[140%] w-px bg-gradient-to-b from-[#FFB800]/20 to-transparent sm:block" />
                </div>

                <div className="pt-1">
                  {/* TERMINAL TAG */}
                  <TerminalTag text={missionSubtitle} />

                  {/* Title */}
                  <h3 className="mb-2 font-heading text-2xl font-bold uppercase leading-none text-white md:mb-4 md:text-3xl">
                    {missionTitle}
                  </h3>

                  {/* Description */}
                  <div className="border border-white/5 bg-smatch-surface/20 group-hover:border-[#FFB800]/50">
                    <p className="px-3 py-1.5 font-mono text-xs text-white/40 md:px-4 md:text-sm">
                      <span className="select-none font-mono text-[10px] font-bold text-[#FFB800] md:text-xs">{'> '}</span>
                      {missionDesc}
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
                  <div className="flex size-[50px] items-center justify-center rounded-md border border-white/10 bg-smatch-gold/5 text-white/20 shadow-2xl transition-all duration-500 group-hover:border-[#FFB800]/50 group-hover:bg-[#FFB800]/5 group-hover:text-[#FFB800] md:size-[60px]">
                    <Eye size={24} weight="duotone" className='text-smatch-gold md:text-[32px]' />
                  </div>
                  <div className="absolute left-1/2 top-16 -z-10 hidden h-[140%] w-px bg-gradient-to-b from-[#FFB800]/20 to-transparent sm:block" />

                </div>

                <div className="pt-1">
                  {/* TERMINAL TAG */}
                  <TerminalTag text={visionSubtitle} />

                  {/* Title */}
                  <h3 className="mb-2 font-heading text-2xl font-bold uppercase leading-none text-white md:mb-4 md:text-3xl">
                    {visionTitle}
                  </h3>

                  {/* Description */}
                  <p className="max-w-lg border-l-2 border-white/5 pl-4 font-sans text-xs leading-relaxed text-gray-400 transition-colors duration-500 group-hover:border-[#FFB800] md:text-sm">
                    {visionDesc}
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
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#FFB800]/5 blur-2xl" />
              <div className="absolute inset-0 rounded-full border border-[#FFB800]/30" />
              <div className="absolute inset-4 animate-[spin_10s_linear_infinite] rounded-full border border-dashed border-[#FFB800]/10" />

              <div className="relative z-10 ">
                <div className="mb-2 flex justify-center text-[#FFB800] drop-shadow-[0_0_10px_rgba(255,184,0,0.5)] md:mb-3">
                  <Cube size={32} weight="fill" className="md:size-[48px]" />
                </div>
                <span className="font-heading text-sm font-bold uppercase leading-tight tracking-wider text-white md:text-lg">
                  {coreText.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}<br />
                    </React.Fragment>
                  ))}
                </span>
              </div>
            </motion.div>

            {/* Orbiting Nodes Container */}
            <motion.div
              className="absolute inset-0 "
              animate={{ rotate: 360 }}
              transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            >
              {safeNodes.map((node, i) => {
                const Icon = NODE_ICONS[i % NODE_ICONS.length]

                // Position logic based on index (0=top, 1=right, 2=bottom, 3=left)
                let positionClass = ''
                let connectionLine = null

                if (i === 0) {
                  positionClass = "top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2"
                  connectionLine = <div className="absolute left-1/2 top-full z-0 h-[80px] w-px bg-gradient-to-b from-[#FFB800]/50 to-transparent md:h-[140px]" />
                } else if (i === 1) {
                  positionClass = "top-1/2 right-[5%] translate-x-1/2 -translate-y-1/2"
                  connectionLine = <div className="absolute right-full top-1/2 h-px w-[60px] bg-gradient-to-r from-[#FFB800]/50 to-transparent md:w-[100px]" />
                } else if (i === 2) {
                  positionClass = "bottom-[5%] left-1/2 -translate-x-1/2 translate-y-1/2"
                  connectionLine = <div className="absolute bottom-full left-1/2 h-[80px] w-px bg-gradient-to-t from-[#FFB800]/50 to-transparent md:h-[140px]" />
                } else if (i === 3) {
                  positionClass = "top-1/2 left-[5%] -translate-x-1/2 -translate-y-1/2"
                  connectionLine = <div className="absolute left-full top-1/2 h-px w-[60px] bg-gradient-to-l from-[#FFB800]/50 to-transparent md:w-[100px]" />
                }

                return (
                  <div key={node.id || i} className={`absolute z-10 ${positionClass}`}>
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                      className="relative z-10 w-28 rounded-md border border-[#FFB800]/20 bg-[#0F0F0F] p-2 text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] md:w-40 md:p-4"
                    >
                      <span className="mb-1 block font-mono text-[8px] uppercase text-[#FFB800] md:mb-2 md:text-[10px]">{node.label}</span>
                      <div className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase text-white md:gap-2 md:text-xs">
                        <Icon size={12} className="text-[#FFB800] md:size-[16px]" />
                        {node.text}
                      </div>
                    </motion.div>
                    {connectionLine}
                  </div>
                )
              })}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
