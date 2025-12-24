'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight as ArrowRightIcon, LinkedinLogo as LinkedinLogoIcon } from '@phosphor-icons/react'

export interface SpotlightProfile {
  name: string
  role: string
  quote: string
  imageSrc: string
}

export interface TeamLink {
  label: string
  href: string
}

export interface TeamSectionProps {
  title?: string
  spotlight: SpotlightProfile
  links: TeamLink[]
}

export function TeamSection({
  title = 'Notre Equipe',
  spotlight,
  links
}: TeamSectionProps) {
  return (
    <section className="py-24 bg-smatch-black relative">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl text-white font-bold text-center mb-16 uppercase tracking-wide">
          {title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Spotlight Profile */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-smatch-charcoal border border-white/5 rounded-2xl overflow-hidden p-6 md:p-10 flex flex-col md:flex-row gap-8 hover:border-smatch-gold/30 transition-colors duration-500"
            >
              {/* Image */}
              <div className="relative w-full md:w-1/3 aspect-[3/4] md:aspect-auto grayscale hover:grayscale-0 transition-all duration-500 rounded-xl overflow-hidden">
                <Image
                  src={spotlight.imageSrc}
                  alt={spotlight.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-2">
                   <span className="inline-block px-3 py-1 bg-smatch-gold/10 text-smatch-gold text-xs font-mono uppercase tracking-widest rounded-full mb-4">
                     /// SPOTLIGHT
                   </span>
                </div>
                <h3 className="font-heading text-4xl md:text-5xl text-white font-bold uppercase leading-none mb-2">
                  {spotlight.name}
                </h3>
                <p className="font-mono text-smatch-text-secondary text-sm uppercase tracking-wide mb-8">
                  {spotlight.role}
                </p>

                <blockquote className="border-l-2 border-smatch-gold pl-6 py-2 mb-8">
                  <p className="font-sans text-white text-lg italic leading-relaxed">
                    &quot;{spotlight.quote}&quot;
                  </p>
                </blockquote>

                <div className="mt-auto">
                  <Link href="#" className="inline-flex items-center gap-2 text-smatch-text-secondary hover:text-smatch-gold transition-colors">
                    <LinkedinLogoIcon size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Connect</span>
                  </Link>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-smatch-gold/5 blur-[80px] rounded-full pointer-events-none" />
            </motion.div>
          </div>

          {/* Right: Links */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {links.map((link, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="group flex items-center justify-between p-6 bg-transparent border border-white/10 rounded-xl hover:bg-white/5 hover:border-smatch-gold transition-all duration-300"
                >
                  <span className="font-heading text-xl text-white font-bold uppercase tracking-wide group-hover:text-smatch-gold transition-colors">
                    {link.label}
                  </span>
                  <ArrowRightIcon className="text-smatch-text-muted group-hover:text-smatch-gold group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
