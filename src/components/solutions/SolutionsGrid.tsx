'use client'

import React from 'react'
import { motion } from 'framer-motion'
// Import all icons you might use
import { Barcode, Truck, Warehouse, ArrowRight, Cpu, Globe } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

// --- Types ---
// Define what the data coming from Payload looks like
interface SolutionDoc {
  id: string
  title: string
  slug: string
  heroSubtitle?: string | null
  description?: string | null
  heroImage?: any // Payload media type
  icon?: string | null // The string name of the icon (e.g., "Barcode")
}

interface SolutionsGridProps {
  solutions?: SolutionDoc[]
}

// --- Icon Mapping Strategy ---
// Since CMS gives us a string "Barcode", we need to return the Component <Barcode />
const getIconComponent = (iconName: string | null | undefined) => {
  const icons: Record<string, React.ReactNode> = {
    'Barcode': <Barcode />,
    'Truck': <Truck />,
    'Warehouse': <Warehouse />,
    'Circuitry': <Cpu />,
    'Globe': <Globe />,
    // Add default fallback
    'default': <Barcode />
  }
  return icons[iconName || 'default'] || icons['default']
}

// --- Individual Card Component (Unchanged logic, just props usage) ---
const InteractiveCard = ({ data }: { data: SolutionDoc }) => {
  // 1. Construct the Dynamic URL
  const href = `/solutions/${data.slug}`

  // 2. Handle Image URL (Payload returns objects for media)
  const imageUrl = typeof data.heroImage === 'string'
    ? data.heroImage
    : data.heroImage?.url || '/assets/placeholders/default-grid.jpg'

  // 3. Get the correct icon
  const icon = getIconComponent(data.icon)

  return (
    <Link href={href} className="block w-full h-full">
      <motion.div
        className="group relative h-[600px] w-full rounded-[12px] overflow-hidden border border-white/10 bg-[#050505] cursor-pointer"
        whileHover="hover"
        initial="initial"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl}
            alt={data.title}
            fill
            className="object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
        </div>

        {/* Border Glow */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFB800] rounded-[12px] z-20 transition-colors duration-300 pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col p-8">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-20 h-20 rounded-[16px] bg-[#1A1A1A]/80 backdrop-blur-md border border-[#FFB800]/30 flex items-center justify-center group-hover:bg-[#FFB800]/10 group-hover:border-[#FFB800] transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="text-[#FFB800]">
                {React.cloneElement(icon as React.ReactElement, { size: 40, weight: 'duotone' })}
              </div>
            </div>
          </div>

          <motion.div
            className="flex flex-col justify-end"
            variants={{
              initial: { y: 0 },
              hover: { y: -20 },
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <span className="text-sm font-mono uppercase tracking-widest mb-2 font-bold text-[#FFB800]">
              {data.heroSubtitle || 'Solution'}
            </span>

            <h3 className="text-3xl font-bold uppercase leading-tight mb-4 text-white">
              {data.title}
            </h3>

            {data.description && (
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-4 line-clamp-3">
                {data.description}
              </p>
            )}

            <motion.div
              className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300"
              variants={{
                initial: { height: 0, opacity: 0 },
                hover: { height: 'auto', opacity: 1 },
              }}
            >
              <button className="w-full bg-[#FFB800] hover:bg-[#E5A500] text-black font-bold py-4 px-6 rounded-[4px] uppercase tracking-widest text-xs flex items-center justify-between transition-colors mt-4">
                Explore Solution
                <ArrowRight size={16} weight="bold" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

// --- Main Grid Section ---
export const SolutionsGrid = ({ solutions = [] }: SolutionsGridProps) => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFB800]/20 to-transparent" />
      <div className="absolute -left-[20%] top-[20%] w-[40%] h-[40%] bg-[#FFB800]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-white font-bold text-lg mb-2 block">Nos Solutions</span>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Trois piliers technologiques pour transformer vos opérations industrielles.
          </p>
        </div>

        {/* The Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.length > 0 ? (
            solutions.map((solution) => (
              <InteractiveCard
                key={solution.id}
                data={solution}
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-12">
              <p>No solutions found. Please add them in the CMS.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
