'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/utilities/ui'

// --- Data Structure ---
const TEAM_MEMBERS = [
  {
    id: 'tarik',
    tag: '[ ARCHITECT_01 ]',
    name: 'TARIK ZAGHLOUL',
    role: 'CEO & FOUNDER | EPFL ALUMNI',
    description: '"Consultant manager polyvalent alliant expertise technique et vision entrepreneuriale. Mon code source : transformer la complexité en opportunité."',
    footerId: 'ID: TZ_001 // LEAD',
    image: '/assets/team/tarik.jpg',
    linkedin: '#',
    email: 'mailto:tarik@smatch.ma',
  },
  {
    id: 'mostafa',
    tag: 'SYS ADMIN',
    name: 'MOSTAFA T.',
    role: 'PROJECT MANAGER',
    description: "Ingénieur d’État en mécanique et titulaire d’un Executive MBA en Supply Chain. 25 ans d’expérience.",
    footerId: 'ID: MT_002 // LEAD',
    image: '/assets/team/mostafa.jpg',
    linkedin: '#',
    email: 'mailto:mostafa@smatch.ma',
  },
  {
    id: 'mohammed',
    tag: 'TEAM_LEADER',
    name: 'Mohammed B.',
    role: 'HEAD OF ENGINEERING',
    description: "Pilotage de l'architecture technique et supervision des équipes de développement Full Stack.",
    footerId: 'ID: MB_003 // ENG',
    image: '/assets/team/mohammed.jpg',
    linkedin: '#',
    email: 'mailto:mohammed@smatch.ma',
  },
  {
    id: 'fatima',
    tag: 'DATA_SCI',
    name: 'Fatima B.',
    role: 'TEAM LEAD',
    description: "Expertise en modélisation prédictive et algorithmes d'IA appliqués à la logistique.",
    footerId: 'ID: FB_004 // DATA',
    image: '/assets/team/fatima.jpg',
    linkedin: '#',
    email: 'mailto:fatima@smatch.ma',
  },
  {
    id: 'adil',
    tag: 'LOGISTICS',
    name: 'Adil F.',
    role: 'EXPERT EN LOGISTIQUE',
    description: "Optimisation des flux WMS et intégration des processus terrain.",
    footerId: 'ID: AF_005 // LOG',
    image: '/assets/team/adil.jpg',
    linkedin: '#',
    email: 'mailto:adil@smatch.ma',
  },
]

// --- Helper Components ---

const SocialButton = ({ icon: Icon, href, className }: { icon: any, href: string, className?: string }) => (
  <Link
    href={href}
    className={cn(
      "w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#FFB800] hover:border-[#FFB800] hover:bg-[#FFB800]/10 transition-all duration-300 bg-[#111]",
      className
    )}
  >
    <Icon size={18} />
  </Link>
)

// --- 1. Main Leader Card (Tarik) ---
const LeaderCard = ({ member, className }: { member: typeof TEAM_MEMBERS[0]; className?: string }) => {
  return (
    <div className={cn("relative group rounded-[24px] border border-white/5 bg-[#0A0A0A] overflow-hidden flex flex-col justify-between p-6 md:p-12 transition-all duration-500 hover:border-[#FFB800]/30", className)}>

      {/* Texture Background */}
      <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />

      {/* Background Glow (Responsive size) */}
      <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] md:w-[60%] md:h-[60%] bg-[#FFB800]/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#FFB800]/10 transition-colors duration-700" />

      {/* Content Grid */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-10 items-start">
        {/* PFP Container */}
        <div className="relative shrink-0 w-full md:w-auto flex justify-center md:block">
           <div className="w-32 h-32 md:w-56 md:h-64 rounded-[20px] overflow-hidden bg-[#151515] border border-white/10 group-hover:border-[#FFB800]/50 transition-colors duration-500 relative shadow-2xl">
               {member.image ? (
                 <Image
                   src={member.image}
                   alt={member.name}
                   fill
                   className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                 />
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs">NO IMG</div>
               )}
               {/* Tech Corners */}
               <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#FFB800] opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#FFB800] opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
        </div>

        {/* Text Info */}
        <div className="flex-1 flex flex-col pt-2 text-center md:text-left">
            <span className="font-mono text-[#FFB800] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase block mb-4 border border-[#FFB800]/20 self-center md:self-start px-2 py-1 rounded bg-[#FFB800]/5">
                {member.tag}
            </span>

            <h3 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-[0.9] mb-4 tracking-tight">
                {member.name}
            </h3>

            <p className="font-sans text-gray-400 text-xs md:text-sm font-medium tracking-widest uppercase mb-8 border-l-0 md:border-l-2 border-[#FFB800] pl-0 md:pl-4">
                {member.role}
            </p>

            <div className="pt-8 border-t border-white/5 mt-auto">
                <p className="font-sans text-gray-400 text-base md:text-lg leading-relaxed italic max-w-lg mx-auto md:mx-0">
                    {member.description}
                </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-8 justify-center md:justify-start">
                <SocialButton icon={LinkedinLogo} href={member.linkedin} />
                <SocialButton icon={EnvelopeSimple} href={member.email} />
            </div>
        </div>
      </div>

      {/* Bottom ID Tag */}
      <div className="relative z-10 mt-auto pt-6 flex items-center justify-center md:justify-start">
         <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#FFB800] rounded-full animate-pulse" />
            <span className="font-mono text-white/30 text-[10px] tracking-[0.2em] uppercase">
                {member.footerId}
            </span>
         </div>
      </div>
    </div>
  )
}

// --- 2. Secondary Leader Card (Mostafa) ---
const SecondaryLeaderCard = ({ member, className }: { member: typeof TEAM_MEMBERS[0]; className?: string }) => {
    return (
      <div className={cn("relative group rounded-[24px] border border-white/5 bg-[#0A0A0A] overflow-hidden flex flex-col p-6 md:p-10 transition-all duration-500 hover:border-[#FFB800]/30", className)}>

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Section: Image & Tag */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
             {/* PFP Circle */}
             <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#FFB800]/50 transition-colors duration-500 relative">
                 {member.image && (
                     <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                     />
                 )}
             </div>

             {/* Tag */}
             <div className="px-3 py-1 bg-[#151515] border border-white/10 rounded-md self-start">
                 <span className="font-mono text-gray-500 text-[10px] tracking-widest uppercase group-hover:text-white transition-colors">
                     {member.tag}
                 </span>
             </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex-1">
            <h3 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase leading-none mb-3 group-hover:text-[#FFB800] transition-colors duration-300">
                {member.name}
            </h3>
            <p className="font-mono text-gray-500 text-[10px] md:text-xs tracking-[0.15em] uppercase mb-8">
                {member.role}
            </p>
            <p className="font-sans text-gray-400 text-sm leading-relaxed mb-8 border-l border-white/10 pl-4 group-hover:border-[#FFB800] transition-colors">
                {member.description}
            </p>
        </div>

        {/* Footer & Socials */}
        <div className="relative z-10 mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
            <span className="font-mono text-white/30 text-[10px] tracking-[0.2em] uppercase">
                {member.footerId}
            </span>

            <div className="flex gap-2">
                 <SocialButton icon={LinkedinLogo} href={member.linkedin} className="w-8 h-8" />
                 <SocialButton icon={EnvelopeSimple} href={member.email} className="w-8 h-8" />
            </div>
        </div>
      </div>
    )
  }

// --- 3. Expandable Team Member Card ---
const TeamMemberCard = ({
    member,
    isHovered,
    onHover,
    onLeave
}: {
    member: typeof TEAM_MEMBERS[0];
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}) => {
    // Only apply expansion logic on desktop. On mobile, we rely on standard layout.
    // In Framer Motion, we can condition the 'animate' prop.

    return (
        <motion.div
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="relative h-[450px] md:h-[500px] rounded-[24px] border border-white/5 bg-[#0A0A0A] overflow-hidden flex flex-col justify-end p-6 md:p-8 cursor-pointer group w-full"
            // Desktop: Flex expand. Mobile: Static flex-1 (handled by parent layout usually, but here we enforce full width on mobile)
            animate={{
                flex: isHovered ? 2.5 : 1,
            }}
            // Custom Bezier for ultra-smooth "luxury" feel
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
            {/* Background Image Logic */}
            <div className="absolute inset-0 z-0">
               {/* Dark overlay when not hovered */}
               <div className="absolute inset-0 bg-[#0A0A0A] z-10 transition-opacity duration-500 opacity-100 group-hover:opacity-0" />

               {/* Image */}
               {member.image && (
                 <Image
                   src={member.image}
                   alt={member.name}
                   fill
                   className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                 />
               )}

               {/* Gradient for text readability when hovered */}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Top Dot & Tag (Absolute top) */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center justify-between w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] z-30">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isHovered ? 'bg-[#FFB800] shadow-[0_0_10px_#FFB800]' : 'bg-white/20'}`} />
                    <span className="font-mono text-white/40 text-[10px] tracking-[0.2em] uppercase group-hover:text-white transition-colors">
                        {member.tag}
                    </span>
                </div>
            </div>

            {/* Content Container (Slides up on hover) */}
            <div className="relative z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h4 className={`font-heading text-2xl md:text-3xl font-bold uppercase mb-1 leading-none transition-colors duration-300 ${isHovered ? 'text-white' : 'text-white/60'}`}>
                    {member.name}
                </h4>
                <p className="font-mono text-[#FFB800] text-[10px] tracking-[0.2em] uppercase mb-0">
                    {member.role}
                </p>

                {/* Reveal Content (Description + Socials) */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        height: isHovered ? 'auto' : 0
                    }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="overflow-hidden"
                >
                    {/* Description */}
                    <div className="mt-4 border-l-2 border-[#FFB800] pl-3 mb-4">
                         <p className="font-sans text-gray-300 text-xs md:text-sm leading-relaxed max-w-[95%]">
                            {member.description}
                         </p>
                    </div>

                    {/* Footer Row */}
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                         <div className="flex gap-2">
                            <SocialButton icon={LinkedinLogo} href={member.linkedin} className="w-8 h-8" />
                            <SocialButton icon={EnvelopeSimple} href={member.email} className="w-8 h-8" />
                         </div>
                         <ArrowUpRight size={16} className="text-[#FFB800]" />
                    </div>
                </motion.div>
            </div>

            {/* Border Glow on Hover */}
            <div className="absolute inset-0 border border-[#FFB800] rounded-[24px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-40" />
        </motion.div>
    )
}


export function TeamSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const tarik = TEAM_MEMBERS[0];
    const mostafa = TEAM_MEMBERS[1];
    const team = TEAM_MEMBERS.slice(2);

    return (
        <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col gap-12">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-6 gap-4">
                         <div>
                             <span className="text-[#FFB800] font-mono text-xs font-bold tracking-widest uppercase mb-2 block">Our People</span>
                             <h2 className="font-heading text-4xl md:text-5xl text-white font-bold uppercase tracking-tight leading-none">
                                 L&apos;Équipe <span className="text-[#333]">/</span> Leadership
                             </h2>
                         </div>
                         <div className="hidden md:block text-right">
                             <p className="font-mono text-white/40 text-xs uppercase tracking-widest max-w-xs">
                                 Experts en ingénierie, logistique et transformation digitale.
                             </p>
                         </div>
                    </div>

                    {/* ROW 1: Leaders */}
                    {/* Stacks vertically on mobile, side-by-side on desktop */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[600px]">
                        {/* Tarik (Larger) */}
                        <div className="lg:col-span-7 h-full">
                            <LeaderCard member={tarik} className="h-full" />
                        </div>
                        {/* Mostafa (Smaller) */}
                        <div className="lg:col-span-5 h-full">
                            <SecondaryLeaderCard member={mostafa} className="h-full" />
                        </div>
                    </div>

                    {/* ROW 2: Team Members */}
                    {/* Flex row on desktop (for expansion effect), Flex col on mobile (for stability) */}
                    <div className="flex flex-col md:flex-row gap-6 w-full h-auto md:h-[500px]">
                        {team.map((member, i) => (
                            <TeamMemberCard
                                key={member.id}
                                member={member}
                                isHovered={hoveredIndex === i}
                                onHover={() => setHoveredIndex(i)}
                                onLeave={() => setHoveredIndex(null)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
