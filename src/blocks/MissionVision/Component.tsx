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
      className="group relative bg-[#0F0F0F] border border-white/5 p-8 rounded-md overflow-hidden hover:border-[#FFB800]/50 transition-colors duration-500"
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
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#050505] border border-white/10 rounded-md mb-4 group-hover:border-[#FFB800]/30 transition-colors duration-300 shadow-sm">
      {/* Prompt Symbol */}
      <span className="font-mono text-[#FFB800] text-xs font-bold select-none">{'>_'}</span>

      {/* Text */}
      <span className="font-mono text-gray-400 text-[10px] uppercase tracking-wider group-hover:text-white transition-colors">
        {text}
      </span>

      {/* Blinking Cursor */}
      <span className="w-1.5 h-3 bg-[#FFB800] opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
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
    <section className="py-32 bg-[#050505] relative overflow-hidden">

      {/* Background Tech Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
           }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left Column: Cards */}
          <div className="flex flex-col gap-8">
            {/* Section Heading */}
            <div className="mb-2">
              <span className="text-[#FFB800] font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4 block pl-1">
                {headerSubtitle}
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase tracking-tight leading-none">
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
              <div className="flex flex-col sm:flex-row items-start gap-8">
                {/* Icon Box */}
                <div className="shrink-0 relative group">
                  <div className="w-[60px] h-[60px] rounded-md bg-smatch-gold/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[#FFB800] group-hover:border-[#FFB800]/50 group-hover:bg-[#FFB800]/5 transition-all duration-500 shadow-2xl">
                    <Target size={32} weight="duotone" className='text-smatch-gold'/>
                  </div>
                  {/* Connector Line */}
                  <div className="hidden sm:block absolute top-16 left-1/2 w-px h-[140%] bg-gradient-to-b from-[#FFB800]/20 to-transparent -z-10" />
                </div>

                <div className="pt-1">
                  {/* TERMINAL TAG */}
                  <TerminalTag text={missionSubtitle} />

                  {/* Title */}
                  <h3 className="font-heading text-3xl font-bold text-white mb-4 uppercase leading-none">
                    {missionTitle}
                  </h3>

                  {/* Description */}
                  <div className="bg-smatch-surface/20 border border-white/5 group-hover:border-[#FFB800]/50">
                    <p className="font-mono text-sm text-white/40 px-4 py-1.5">
                      <span className="font-mono text-[#FFB800] text-xs font-bold select-none">{'> '}</span>
                      {missionDesc}
                    </p>
                  </div>
                </div>
              </div>
            </GlowCard>

            {/* Vision Card */}
            <GlowCard delay={0.2}>
              <div className="flex flex-col sm:flex-row items-start gap-8">
                {/* Icon Box */}
                <div className="shrink-0 relative group">
                  <div className="w-[60px] h-[60px] rounded-md bg-smatch-gold/5  border border-white/10 flex items-center justify-center text-white/20 group-hover:text-[#FFB800] group-hover:border-[#FFB800]/50 group-hover:bg-[#FFB800]/5 transition-all duration-500 shadow-2xl">
                    <Eye size={32} weight="duotone" className='text-smatch-gold' />
                  </div>
                  <div className="hidden sm:block absolute top-16 left-1/2 w-px h-[140%] bg-gradient-to-b from-[#FFB800]/20 to-transparent -z-10" />

                </div>

                <div className="pt-1">
                  {/* TERMINAL TAG */}
                  <TerminalTag text={visionSubtitle} />

                  {/* Title */}
                  <h3 className="font-heading text-3xl font-bold text-white mb-4 uppercase leading-none">
                    {visionTitle}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-lg border-l-2 border-white/5 pl-4 group-hover:border-[#FFB800] transition-colors duration-500">
                    {visionDesc}
                  </p>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Right Column: Animated Diagram */}
          <div className="relative h-[600px]  w-full flex items-center justify-center">

            {/* Central Core */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-20 w-48 h-48 rounded-full flex flex-col items-center justify-center text-center p-6"
            >
              {/* Core Glows */}
              <div className="absolute inset-0 bg-[#FFB800]/5 rounded-full blur-2xl animate-pulse" />
              <div className="absolute inset-0 border border-[#FFB800]/30 rounded-full" />
              <div className="absolute inset-4 border border-[#FFB800]/10 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />

              <div className="relative z-10 ">
                <div className="text-[#FFB800] mb-3 flex justify-center drop-shadow-[0_0_10px_rgba(255,184,0,0.5)]">
                  <Cube size={48} weight="fill" />
                </div>
                <span className="font-heading text-white font-bold text-lg uppercase leading-tight tracking-wider">
                  {coreText.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}<br/>
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
                    connectionLine = <div className="absolute z-0 top-full left-1/2 w-px h-[140px] bg-gradient-to-b from-[#FFB800]/50 to-transparent" />
                } else if (i === 1) {
                    positionClass = "top-1/2 right-[5%] translate-x-1/2 -translate-y-1/2"
                    connectionLine = <div className="absolute right-full top-1/2 h-px w-[100px] bg-gradient-to-r from-[#FFB800]/50 to-transparent" />
                } else if (i === 2) {
                    positionClass = "bottom-[5%] left-1/2 -translate-x-1/2 translate-y-1/2"
                    connectionLine = <div className="absolute bottom-full left-1/2 w-px h-[140px] bg-gradient-to-t from-[#FFB800]/50 to-transparent" />
                } else if (i === 3) {
                    positionClass = "top-1/2 left-[5%] -translate-x-1/2 -translate-y-1/2"
                    connectionLine = <div className="absolute left-full top-1/2 h-px w-[100px] bg-gradient-to-l from-[#FFB800]/50 to-transparent" />
                }

                return (
                  <div key={node.id || i} className={`absolute z-10 ${positionClass}`}>
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                      className="w-40 p-4 relative z-10 bg-[#0F0F0F] border border-[#FFB800]/20 rounded-md text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                    >
                      <span className="block font-mono text-[10px] text-[#FFB800] uppercase mb-2">{node.label}</span>
                      <div className="flex items-center justify-center gap-2 text-white font-bold text-xs uppercase">
                        <Icon size={16} className="text-[#FFB800]" />
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
