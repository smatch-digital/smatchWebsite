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
      className="mb-1 whitespace-pre-wrap break-all font-mono text-sm text-slate-300/90"
    >
      <span className="mr-2 text-slate-600">$</span>
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
    <section className="relative w-full overflow-hidden bg-black py-24 text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden">
        <div className="absolute left-1/4 top-1/4 size-96 rounded-full bg-emerald-500/10 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 size-96 rounded-full bg-blue-500/5 blur-[128px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-6 flex items-center gap-2">
              <span className="font-mono text-sm font-bold tracking-wider text-yellow-500">
                {'/// PROBLEM_STATEMENT'}
              </span>
            </div>

            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {title}
            </h2>

            <p className="max-w-xl text-lg leading-relaxed text-slate-400">
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
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/80 shadow-2xl shadow-black/50 backdrop-blur-xl">

              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-500/80" />
                    <div className="size-3 rounded-full bg-yellow-500/80" />
                    <div className="size-3 rounded-full bg-emerald-500/80" />
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-50">
                  <Terminal size={14} className="text-slate-400" />
                  <span className="font-mono text-xs text-slate-400">diagnostic.sh</span>
                </div>

                <div className="flex items-center gap-2 opacity-0">
                  {/* Spacer for balance */}
                  <div className="w-12" />
                </div>
              </div>

              {/* Terminal Body */}
              <div className="relative min-h-[320px] p-6 font-mono text-sm">
                <div className="bg-grid-white/[0.02] pointer-events-none absolute inset-0" />

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
                    className="ml-1 inline-block h-4 w-2.5 bg-emerald-500 align-middle"
                  />
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements behind terminal */}
            <div className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-r from-emerald-500/20 to-blue-600/20 opacity-50 blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
