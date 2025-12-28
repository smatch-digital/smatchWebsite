import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Domaines d\'Excellence | Smatch Digital',
  description: 'Nos domaines d\'excellence: Big Data, Industrie 4.0 et Solutions Métier sur-mesure.',
};

// --- SUB-COMPONENTS FOR REUSABILITY ---

const SectionTag = ({ number, title }: { number: string, title: string }) => (
  <div className="inline-flex items-center gap-3 mb-6 border border-[#FFB800]/30 bg-[#FFB800]/10 px-3 py-1 rounded-sm backdrop-blur-md">
    <span className="text-[#FFB800] text-xs font-mono font-bold tracking-widest">{number}</span>
    <div className="h-3 w-[1px] bg-[#FFB800]/50" />
    <span className="text-[#FFB800] text-xs font-mono font-bold tracking-widest uppercase">{title}</span>
  </div>
);

const FeatureList = ({ items }: { items: { label: string, desc: string }[] }) => (
  <ul className="space-y-4 mt-8">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-4 group">
        <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-[1px] bg-[#FFB800] shadow-[0_0_8px_#FFB800] transition-transform group-hover:scale-125" />
        <span className="text-sm text-gray-400 font-mono leading-relaxed">
          <strong className="text-white font-sans uppercase text-xs tracking-wider mr-2">{item.label}</strong>
          {item.desc}
        </span>
      </li>
    ))}
  </ul>
);

const GlassHUD = ({ title, sub, positionClasses }: { title: string, sub: string, positionClasses: string }) => (
  <div className={`absolute z-20 bg-black/80 border border-white/10 px-4 py-3 backdrop-blur-md rounded-sm ${positionClasses}`}>
    <div className="flex items-center gap-2 mb-1">
        <div className="h-1.5 w-1.5 bg-[#FFB800] rounded-full animate-pulse" />
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{title}</span>
    </div>
    <div className="font-mono text-xs text-[#FFB800] font-bold tracking-wider">{sub}</div>
  </div>
);

export default function ExpertisePage() {
  return (
    <main className="min-h-screen w-full bg-[#050505] text-white selection:bg-[#FFB800] selection:text-black overflow-hidden">

      {/* -------------------------------
          HERO SECTION
      ------------------------------- */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-20 text-center">
        {/* Background Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] bg-[#FFB800]/5 blur-[100px] rounded-full opacity-50" />

        <div className="container relative z-10 mx-auto px-4">

          {/* Hero Image (Abstract Machine) */}
          <div className="relative mx-auto mb-8 h-[250px] w-[250px] md:h-[350px] md:w-[350px]">
             {/* Replace src with your 'cube laser' image */}
             <img
               src="/assets/hero/solutions-iso.png"
               alt="Excellence"
               className="h-full w-full object-contain opacity-90 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
             />
             {/* Hero HUD */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-[#FFB800]/30 to-transparent" />
          </div>

          <h1 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6">
            Domaines <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">D'Excellence.</span>
          </h1>

          <div className="h-[1px] w-24 bg-[#FFB800] mx-auto mb-6" />

          <p className="mx-auto max-w-xl text-sm font-mono text-gray-400 uppercase tracking-wide leading-relaxed">
            Une expertise technique unique, déployée sur 3 axes stratégiques : Industrie, Agriculture et Data.
          </p>
        </div>
      </section>


      {/* -------------------------------
          SECTION 01: INDUSTRIE 4.0
      ------------------------------- */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <SectionTag number="01" title="ZONES D'USINE" />
              <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase leading-[0.9] mb-6">
                L'Automatisation <br/>
                <span className="text-white/40">Intelligente.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-md border-l-2 border-white/10 pl-6">
                Accélérez votre transformation vers l'Industrie 4.0. De la logistique à la ligne de production, nous déployons l'intelligence au cœur de la machine.
              </p>

              <FeatureList items={[
                { label: "Pilotage & Robotique", desc: "Automatisation des tâches répétitives (Bras robotiques, AGV)." },
                { label: "Systèmes Embarqués", desc: "Intégration hardware sur mesure." },
                { label: "Maintenance Prédictive", desc: "Anticipation des pannes par capteurs IoT." },
                { label: "Traçabilité (RFID)", desc: "Traçabilité et identification haute fréquence." }
              ]} />
            </div>

            {/* Right Image (Turbine) */}
            <div className="order-1 lg:order-2 relative flex justify-center">
                {/* HUD Overlay */}
                <GlassHUD
                    title="TURBINE_DATA"
                    sub="RPM: 12,400 // TEMP: OK"
                    positionClasses="top-10 right-0 md:right-10"
                />

                {/* Image Container */}
                <div className="relative w-full max-w-[500px] aspect-square">
                   <div className="absolute inset-0 bg-[#FFB800]/5 blur-[60px] rounded-full" />
                   <img
                     src="/assets/expertise/turbine.png"
                     alt="Industrie 4.0"
                     className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
                   />
                   {/* Decorative Circle Ring */}
                   <div className="absolute inset-0 border border-[#FFB800]/20 rounded-full scale-110 opacity-20" />
                </div>
            </div>
          </div>
        </div>
      </section>


      {/* -------------------------------
          SECTION 02: AGRI-TECH
      ------------------------------- */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            {/* Left Image (Bull Wireframe) */}
            <div className="relative flex justify-center">
                {/* HUD Overlay */}
                <GlassHUD
                    title="LIVESTOCK_SCAN"
                    sub="ID: 4942-XF // STAT: HEALTHY"
                    positionClasses="top-0 left-0 md:left-10"
                />

                <div className="relative w-full max-w-[500px] aspect-square">
                   <img
                     src="/assets/expertise/bull-wireframe.png"
                     alt="Agri Tech"
                     className="relative z-10 h-full w-full object-contain"
                   />
                </div>
            </div>

            {/* Right Content */}
            <div className="pl-0 lg:pl-10">
              <SectionTag number="02" title="AGRI-TECH" />
              <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase leading-[0.9] mb-6">
                Digitalisation <br/>
                <span className="text-white/40">Du Vivant.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-md border-l-2 border-white/10 pl-6">
                Des solutions adaptées au contexte agricole Marocain et aux défis de l'élevage moderne.
              </p>

              <FeatureList items={[
                { label: "AgriTech Mobile", desc: "Traçabilité du bétail et estimation de la reproduction." },
                { label: "Computer Vision (IA)", desc: "Pesage sans contact des opérateurs et marchandises." },
                { label: "Citoyenneté", desc: "Plateformes collaboratives pour le tissu associatif." }
              ]} />
            </div>

          </div>
        </div>
      </section>


      {/* -------------------------------
          SECTION 03: BIG DATA
      ------------------------------- */}
      <section className="pt-24 pb-40 relative bg-gradient-to-b from-[#050505] to-[#080808]">
        <div className="container mx-auto px-4 text-center">

            {/* Header */}
            <div className="mb-16 flex flex-col items-center">
                <SectionTag number="03" title="INTELLIGENCE DATA" />
                <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase leading-[0.9] mb-6">
                    La Puissance <br/>
                    <span className="text-white/40">De la donnée.</span>
                </h2>
                <p className="max-w-xl text-gray-400 font-mono text-sm">
                    "Transformez vos données brutes en décisions stratégiques grâce à l'IA et la simulation."
                </p>
            </div>

            {/* Center Image (Abstract Cube) */}
            <div className="relative mx-auto mb-20 h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
                <div className="absolute inset-0 bg-[#FFB800]/5 blur-[80px] rounded-full" />
                <img
                     src="/assets/expertise/data-cube.png"
                     alt="Data Cube"
                     className="relative z-10 h-full w-full object-contain"
                />
            </div>

            {/* 3 Column Grid */}
            <div className="grid gap-8 md:grid-cols-3 text-left max-w-6xl mx-auto">
                {/* Col 1 */}
                <div className="group border-l border-white/10 pl-8 py-2 hover:border-[#FFB800] transition-colors duration-500">
                    <h3 className="mb-3 font-mono text-[#FFB800] text-xs font-bold tracking-widest">01. DATA LAKES :</h3>
                    <h4 className="text-lg font-bold text-gray-300 mb-2 group-hover:text-white transition-colors">Centralisation</h4>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">Centralisation et gouvernance des données multi-sources pour une source de vérité unique.</p>
                </div>
                 {/* Col 2 */}
                 <div className="group border-l border-white/10 pl-8 py-2 hover:border-[#FFB800] transition-colors duration-500">
                    <h3 className="mb-3 font-mono text-[#FFB800] text-xs font-bold tracking-widest">02. INTELLIGENCE ARTIFICIELLE :</h3>
                    <h4 className="text-lg font-bold text-gray-300 mb-2 group-hover:text-white transition-colors">Modélisation & NLP</h4>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">Modélisation prédictive, NLP et Computer Vision pour automatiser l'analyse.</p>
                </div>
                 {/* Col 3 */}
                 <div className="group border-l border-white/10 pl-8 py-2 hover:border-[#FFB800] transition-colors duration-500">
                    <h3 className="mb-3 font-mono text-[#FFB800] text-xs font-bold tracking-widest">03. SIMULATION 3D :</h3>
                    <h4 className="text-lg font-bold text-gray-300 mb-2 group-hover:text-white transition-colors">Jumeaux Numériques</h4>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">Jumeaux numériques pour l'optimisation des flux et tests de scénarios sans risque.</p>
                </div>
            </div>
        </div>
      </section>

    </main>
  );
}
