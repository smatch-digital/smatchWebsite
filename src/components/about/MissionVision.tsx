'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'
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

// Helper for the mouse-tracking glow card
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
      className="group relative bg-[#0F0F0F] border border-white/5 p-8 rounded-[24px] overflow-hidden hover:border-[#FFB800]/50 transition-colors duration-500"
    >
      {/* Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-300 group-hover:opacity-100"
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

export function MissionVision({ mission, vision }: MissionVisionProps) {
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
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
              Notre <span className="text-[#FFB800]">ADN</span>
            </h2>

            {/* Mission Card */}
            <GlowCard>
              <div className="flex items-start gap-6">
                 <div className="p-4 bg-[#FFB800]/10 rounded-xl text-[#FFB800] border border-[#FFB800]/20 shadow-[0_0_15px_rgba(255,184,0,0.1)] group-hover:bg-[#FFB800] group-hover:text-black transition-colors duration-300">
                    <Target size={32} weight="duotone" />
                 </div>
                 <div>
                    <span className="inline-block px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-[#FFB800] uppercase tracking-widest mb-3 border border-white/5">
                      {mission.subtitle || 'PHASE 1: FOUNDATION'}
                    </span>
                    <h3 className="font-heading text-3xl font-bold text-white mb-3 tracking-wide">
                      {mission.title}
                    </h3>
                    <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-md">
                      {mission.description}
                    </p>
                 </div>
              </div>
            </GlowCard>

            {/* Vision Card */}
            <GlowCard delay={0.2}>
              <div className="flex items-start gap-6">
                 <div className="p-4 bg-[#FFB800]/10 rounded-xl text-[#FFB800] border border-[#FFB800]/20 shadow-[0_0_15px_rgba(255,184,0,0.1)] group-hover:bg-[#FFB800] group-hover:text-black transition-colors duration-300">
                    <Eye size={32} weight="duotone" />
                 </div>
                 <div>
                    <span className="inline-block px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-[#FFB800] uppercase tracking-widest mb-3 border border-white/5">
                      {vision.subtitle || 'PHASE 2: EXPANSION'}
                    </span>
                    <h3 className="font-heading text-3xl font-bold text-white mb-3 tracking-wide">
                      {vision.title}
                    </h3>
                    <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-md">
                      {vision.description}
                    </p>
                 </div>
              </div>
            </GlowCard>
          </div>

          {/* Right Column: Animated Diagram */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
             
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
                
                <div className="relative z-10">
                   <div className="text-[#FFB800] mb-3 flex justify-center drop-shadow-[0_0_10px_rgba(255,184,0,0.5)]">
                     <Cube size={48} weight="fill" />
                   </div>
                   <span className="font-heading text-white font-bold text-lg uppercase leading-tight tracking-wider">
                     Innovation<br/>Continue
                   </span>
                </div>
             </motion.div>

             {/* Orbiting Nodes Container */}
             {/* We rotate the whole container to orbit the nodes */}
             <motion.div 
               className="absolute inset-0"
               animate={{ rotate: 360 }}
               transition={{ duration: 60, ease: "linear", repeat: Infinity }}
             >
                {/* Node 1: Top */}
                <div className="absolute top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="w-40 p-4 bg-[#0F0F0F] border border-[#FFB800]/20 rounded-xl text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transform -rotate-0"> 
                      {/* Counter-rotate content if you want text to stay upright, or keep it rotating for "satellite" feel */}
                      <span className="block font-mono text-[10px] text-[#FFB800] uppercase mb-2">01.0 // PROCESS</span>
                      <div className="flex items-center justify-center gap-2 text-white font-bold text-xs uppercase">
                        <ChartLineUp size={16} className="text-[#FFB800]" />
                        Modéliser
                      </div>
                   </div>
                   {/* Connection Line */}
                   <div className="absolute top-full left-1/2 w-px h-[140px] bg-gradient-to-b from-[#FFB800]/50 to-transparent" />
                </div>

                {/* Node 2: Right */}
                <div className="absolute top-1/2 right-[5%] translate-x-1/2 -translate-y-1/2">
                   <div className="w-40 p-4 bg-[#0F0F0F] border border-[#FFB800]/20 rounded-xl text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      <span className="block font-mono text-[10px] text-[#FFB800] uppercase mb-2">02.0 // ETHICS</span>
                      <div className="flex items-center justify-center gap-2 text-white font-bold text-xs uppercase">
                        <ShieldCheck size={16} className="text-[#FFB800]" />
                        Responsabilité
                      </div>
                   </div>
                   <div className="absolute right-full top-1/2 h-px w-[100px] bg-gradient-to-r from-[#FFB800]/50 to-transparent" />
                </div>

                {/* Node 3: Bottom */}
                <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 translate-y-1/2">
                   <div className="w-40 p-4 bg-[#0F0F0F] border border-[#FFB800]/20 rounded-xl text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      <span className="block font-mono text-[10px] text-[#FFB800] uppercase mb-2">03.0 // TECH</span>
                      <div className="flex items-center justify-center gap-2 text-white font-bold text-xs uppercase">
                        <Cpu size={16} className="text-[#FFB800]" />
                        Sécurité
                      </div>
                   </div>
                   <div className="absolute bottom-full left-1/2 w-px h-[140px] bg-gradient-to-t from-[#FFB800]/50 to-transparent" />
                </div>

                {/* Node 4: Left */}
                <div className="absolute top-1/2 left-[5%] -translate-x-1/2 -translate-y-1/2">
                   <div className="w-40 p-4 bg-[#0F0F0F] border border-[#FFB800]/20 rounded-xl text-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      <span className="block font-mono text-[10px] text-[#FFB800] uppercase mb-2">04.0 // VALUE</span>
                      <div className="flex items-center justify-center gap-2 text-white font-bold text-xs uppercase">
                        <Bank size={16} className="text-[#FFB800]" />
                        Valorisation
                      </div>
                   </div>
                   <div className="absolute left-full top-1/2 h-px w-[100px] bg-gradient-to-l from-[#FFB800]/50 to-transparent" />
                </div>
             </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}