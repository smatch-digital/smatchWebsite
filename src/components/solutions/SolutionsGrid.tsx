'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Barcode, Truck, Warehouse, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

// --- Types ---
interface SolutionCardProps {
  subtitle: string // e.g. "Performance" or "Telemetry Ops"
  title: string // e.g. "Precision: 99.9%" or "TEST DE CONDUIT"
  description?: string // e.g. "Traçabilité RFID..."
  image: string // Background image path
  icon: React.ReactNode
  isHighlighted?: boolean // To force yellow title color like the left card
}

// --- Individual Card Component ---
const InteractiveCard = ({
  subtitle,
  title,
  description,
  image,
  icon,
  isHighlighted = false,
}: SolutionCardProps) => {
  return (
    <motion.div
      className="group relative h-[600px] w-full rounded-[12px] overflow-hidden border border-white/10 bg-[#050505] cursor-pointer"
      whileHover="hover"
      initial="initial"
    >
      {/* 1. Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-110 transform transition-transform duration-700 ease-out"
        />
        {/* Gradient Overlay (Darker at bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      {/* 2. Border Transition (Grey -> Yellow) */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFB800] rounded-[12px] z-20 transition-colors duration-300 pointer-events-none" />

      {/* 3. Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col p-8">
        {/* Icon (Centered initially, stays fixed or moves slightly) */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-20 h-20 rounded-[16px] bg-[#1A1A1A]/80 backdrop-blur-md border border-[#FFB800]/30 flex items-center justify-center group-hover:bg-[#FFB800]/10 group-hover:border-[#FFB800] transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {/* Clone icon to style it */}
            <div className="text-[#FFB800]">
              {React.cloneElement(icon as React.ReactElement, { size: 40, weight: 'duotone' })}
            </div>
          </div>
        </div>

        {/* Text Content (Slides up on hover) */}
        <motion.div
          className="flex flex-col justify-end"
          variants={{
            initial: { y: 0 },
            hover: { y: -20 }, // Moves up to make room for button
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Subtitle */}
          <span
            className={`text-sm font-mono uppercase tracking-widest mb-2 font-bold ${isHighlighted ? 'text-gray-500' : 'text-[#FFB800]'}`}
          >
            {subtitle}
          </span>

          {/* Title */}
          <h3
            className={`text-3xl font-bold uppercase leading-tight mb-4 ${isHighlighted ? 'text-[#FFB800]' : 'text-white'}`}
          >
            {title}
          </h3>

          {/* Description (Fades in/out or stays) */}
          {description && (
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-4">{description}</p>
          )}

          {/* CTA Button (Hidden by default, slides up and fades in) */}
          <motion.div
            className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300"
            variants={{
              initial: { height: 0, opacity: 0 },
              hover: { height: 'auto', opacity: 1 },
            }}
          >
            <button className="w-full bg-[#FFB800] hover:bg-[#E5A500] text-black font-bold py-4 px-6 rounded-[4px] uppercase tracking-widest text-xs flex items-center justify-between transition-colors mt-4">
              Start Project
              <ArrowRight size={16} weight="bold" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// --- Main Grid Section ---
export const SolutionsGrid = () => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB800]/20 to-transparent" />
      <div className="absolute -left-[20%] top-[20%] w-[40%] h-[40%] bg-[#FFB800]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-white font-bold text-lg mb-2 block">Nos Solutions</span>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Trois piliers technologiques pour transformer vos opérations industrielles.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Precision (The "Active" example from image) */}
          <InteractiveCard
            subtitle="Performance"
            title="Precision: 99.9%"
            description="Traçabilité RFID native et scan haute fréquence."
            icon={<Barcode />}
            image="/assets/solutions/rfid-scan.jpg" // Replace with your image path
            isHighlighted={true} // Makes title yellow like reference
          />

          {/* Card 2: Transport */}
          <InteractiveCard
            subtitle="Telemetry Ops"
            title="TEST DE CONDUIT"
            icon={<Truck />}
            image="/assets/solutions/truck-cockpit.jpg" // Replace with your image path
          />

          {/* Card 3: Logistics */}
          <InteractiveCard
            subtitle="Core Logistics"
            title="WMS PROLOG"
            icon={<Warehouse />}
            image="/assets/solutions/robot-arm.jpg" // Replace with your image path
          />
        </div>
      </div>
    </section>
  )
}
