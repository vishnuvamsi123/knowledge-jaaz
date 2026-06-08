'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StockTicker from './StockTicker';
import AnimatedChart from './AnimatedChart';

// ─── Static Data ──────────────────────────────────────────────────────────────

const STAT_CARDS = [
  { value: '10L+', label: 'Middle-Class Learners', icon: '👥', color: 'emerald' as const },
  { value: '₹0',   label: 'Cost to Start',         icon: '🎯', color: 'gold'    as const },
  { value: '500+', label: 'Stock Analyses',         icon: '📊', color: 'blue'   as const },
];

const TRUSTED_BRANDS = ['Zerodha', 'Groww', 'Angel One', 'NSE', 'BSE'];

const colorMap = {
  emerald: { gradient: 'from-emerald-500/15 to-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-400' },
  gold:    { gradient: 'from-yellow-500/15  to-yellow-500/5',  border: 'border-yellow-500/20',  text: 'text-yellow-400'  },
  blue:    { gradient: 'from-blue-500/15    to-blue-500/5',    border: 'border-blue-500/20',    text: 'text-blue-400'    },
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 100% 70% at 50% -5%, rgba(16,185,129,0.14) 0%, rgba(4,12,30,1) 55%), #020b1a',
      }}
    >
      {/* Grid dot background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`, backgroundSize: '28px 28px' }}
      />
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-emerald-500/8 blur-[130px] pointer-events-none" />

      {/* ══════════════════════════════════════════════
          LOGO BANNER — top of first page only, scrolls away
          ══════════════════════════════════════════════ */}
      <div className="relative z-10 w-full flex justify-center pt-6 pb-2">
        <motion.img
          src={`${basePath}/logo.png`}
          alt="Knowledge Jaaz — Learn · Invest · Grow"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            width: '75%',
            maxWidth: '860px',
            minWidth: '280px',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 0 28px rgba(16,185,129,0.35)) drop-shadow(0 4px 20px rgba(0,0,0,0.6))',
          }}
        />
      </div>

      {/* Thin divider under logo */}
      <div className="relative z-10 flex justify-center pb-2">
        <div className="w-3/4 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), rgba(236,72,153,0.2), transparent)' }} />
      </div>

      {/* ══════════════════════════════════════════════
          HERO CONTENT — fully centered layout
          ══════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col xl:flex-row items-center justify-center gap-12 py-10 sm:py-12 lg:py-16">

          {/* ── LEFT / CENTER: Text ── */}
          <div className="flex flex-col items-center xl:items-start text-center xl:text-left w-full xl:max-w-[580px]">

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold text-emerald-300 mx-auto xl:mx-0"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.22)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              India&apos;s #1 Free Stock Education Platform
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="text-white block">Learn Stock Market</span>
              <span className="block mt-1 bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                the Smart Way
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto xl:mx-0"
            >
              Knowledge Jaaz helps{' '}
              <span className="text-emerald-400 font-semibold">middle-class families</span> learn
              investing, stock fundamentals, penny stocks, and wealth creation —
              in <span className="text-white font-medium">simple language.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto justify-center xl:justify-start"
            >
              <motion.a
                href="#learn"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white overflow-hidden group w-full sm:w-auto"
                style={{ background: 'linear-gradient(135deg, #10b981, #0d9488)', boxShadow: '0 8px 32px rgba(16,185,129,0.35)' }}
              >
                <span className="relative z-10">Start Learning Free →</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-semibold text-white w-full sm:w-auto"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)' }}
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">▶</span>
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stat Cards */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-row flex-wrap gap-3 mt-8 justify-center xl:justify-start w-full"
            >
              {STAT_CARDS.map((card, i) => {
                const c = colorMap[card.color];
                return (
                  <motion.div
                    key={card.label}
                    whileHover={{ y: -3, scale: 1.04 }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ y: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 } }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border bg-gradient-to-br ${c.gradient} ${c.border} backdrop-blur-sm`}
                    style={{ minWidth: '145px' }}
                  >
                    <span className="text-xl">{card.icon}</span>
                    <div>
                      <div className={`text-xl font-extrabold ${c.text} leading-none`}>{card.value}</div>
                      <div className="text-[11px] text-white/55 mt-0.5">{card.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Trusted by */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 flex flex-col items-center xl:items-start gap-3 w-full"
            >
              <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-semibold">
                Trusted by investors using
              </p>
              <div className="flex flex-wrap gap-2 justify-center xl:justify-start">
                {TRUSTED_BRANDS.map(name => (
                  <span
                    key={name}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors duration-200 cursor-default"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Chart (xl screens only) ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="hidden xl:flex flex-col items-center justify-center w-full max-w-[480px] relative flex-shrink-0"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full bg-emerald-500/8 blur-[90px]" />
            </div>

            {/* Markets Open badge */}
            <div
              className="relative z-10 mb-3 self-start ml-4 flex items-center gap-2 px-3.5 py-2 rounded-xl"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.22)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-300">Markets Open</span>
              <span className="text-xs text-emerald-400/60 mx-1">•</span>
              <span className="text-xs font-mono text-emerald-400">NSE / BSE</span>
            </div>

            {mounted && (
              <div className="relative z-10 w-full">
                <AnimatedChart />
              </div>
            )}

            {/* Floating notification */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 mt-4 self-end mr-4 flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(4,14,36,0.92)', border: '1px solid rgba(59,130,246,0.2)', maxWidth: '210px' }}
            >
              <span className="text-2xl">🚀</span>
              <div>
                <div className="text-xs font-bold text-white">AI Analysis Ready</div>
                <div className="text-[10px] text-slate-500">RELIANCE • Buy Signal</div>
                <div className="text-[10px] text-emerald-400 font-mono font-semibold">+2.3% Today</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Stock Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full"
      >
        <StockTicker />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="flex justify-center py-6"
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 cursor-pointer group"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
        >
          <span className="text-[10px] text-slate-600 uppercase tracking-widest group-hover:text-slate-400 transition-colors">Scroll to explore</span>
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-emerald-500/50" />
            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-emerald-500/25" />
          </div>
        </motion.button>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-20 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #020b1a)' }} />
    </section>
  );
};

export default HeroSection;
