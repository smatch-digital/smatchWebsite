'use client'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface ProblemStatementProps {
  title: string;
  description: string;
  terminalLines: string[];
}

const TerminalLine = ({ text, index }: { text: string; index: number }) => {
  // Simple parser for color codes
  const parseContent = (line: string) => {
    // Regex to match brackets like [CRITICAL], [SUCCESS], etc.
    const parts = line.split(/(\[[A-Z_]+\])/g);

    return parts.map((part, i) => {
      if (part.match(/^\[[A-Z_]+\]$/)) {
        let colorClass = 'text-gray-400';
        if (part === '[CRITICAL]' || part === '[ERROR]') colorClass = 'text-red-500 font-bold';
        if (part === '[SUCCESS]' || part === '[OK]') colorClass = 'text-emerald-500 font-bold';
        if (part === '[WARNING]') colorClass = 'text-yellow-500 font-bold';
        if (part === '[INFO]') colorClass = 'text-blue-400 font-bold';

        return <span key={i} className={colorClass}>{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.3 }}
      className="font-mono text-sm mb-1 text-slate-300/90 whitespace-pre-wrap break-all"
    >
      <span className="text-slate-600 mr-2">$</span>
      {parseContent(text)}
    </motion.div>
  );
};

export const ProblemStatement: React.FC<ProblemStatementProps> = ({
  title,
  description,
  terminalLines,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full py-24 overflow-hidden bg-black text-white">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-500 font-mono text-sm font-bold tracking-wider">
                {'/// PROBLEM_STATEMENT'}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {title}
            </h2>

            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              {description}
            </p>
          </motion.div>

          {/* Right Column: Terminal UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Glassmorphism Container */}
            <div className="relative rounded-xl overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">

              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-50">
                  <Terminal size={14} className="text-slate-400" />
                  <span className="text-xs font-mono text-slate-400">diagnostic.sh</span>
                </div>

                <div className="flex items-center gap-2 opacity-0">
                  {/* Spacer for balance */}
                  <div className="w-12" />
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 min-h-[320px] font-mono text-sm relative">
                <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

                {terminalLines.map((line, idx) => (
                  <TerminalLine key={idx} text={line} index={idx} />
                ))}

                {/* Blinking Cursor */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: terminalLines.length * 0.15 + 0.5, duration: 0.2 }}
                  className="mt-2"
                >
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2.5 h-4 bg-emerald-500 align-middle ml-1"
                  />
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements behind terminal */}
            <div className="absolute -z-10 -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-600/20 rounded-xl blur-xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
