'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import StockTicker from './StockTicker';
import AnimatedChart from './AnimatedChart';

// ─── Static Data ──────────────────────────────────────────────────────────────

const STAT_CARDS = [
  { value: '10L+', label: 'Middle-Class Learners', icon: '👥', color: 'emerald' as const },
  { value: '₹0',   label: 'Cost to Start',          icon: '🎯', color: 'gold'    as const },
  { value: '500+', label: 'Stock Analyses',          icon: '📊', color: 'blue'   as const },
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
        background: 'radial-gradient(ellipse 100% 80% at 50% -5%, rgba(16,185,129,0.14) 0%, rgba(4,12,30,1) 55%), #020b1a',
      }}
    >
      {/* ── Grid dot background ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Ambient glows ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-emerald-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-teal-500/5 blur-[80px] pointer-events-none" />

      {/* ════════════════════════════════════════════════
          FULL-WIDTH LOGO BANNER — prominent at the top
          ════════════════════════════════════════════════ */}
      <div
        className="relative w-full flex flex-col items-center justify-center pt-6 pb-4 sm:pt-8 sm:pb-6"
        style={{ borderBottom: '1px solid rgba(16,185,129,0.12)' }}
      >
        {/* Subtle banner bg */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(16,185,129,0.05) 0%, transparent 100%)' }}
        />

        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 flex flex-col items-center gap-3"
        >
          {/* Logo — large rectangle display */}
          <img
            src={`${basePath}/logo.png`}
            alt="Knowledge Jaaz"
            className="w-auto object-contain"
            style={{
              height: 'clamp(80px, 15vw, 180px)',
              filter: 'drop-shadow(0 0 24px rgba(16,185,129,0.35)) drop-shadow(0 4px 20px rgba(0,0,0,0.6))',
            }}
          />

          {/* Tagline under logo */}
          <p
            className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase"
            style={{ color: 'rgba(16,185,129,0.7)' }}
          >
            Stock Market Knowledge for Every Middle-Class Family
          </p>

          {/* Decorative line */}
          <div
            className="w-32 sm:w-48 h-px mt-1"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent)' }}
          />
        </motion.div>
      </div>

      {/* ════════════════════════════
          MAIN HERO CONTENT
          ════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-10 sm:py-14 lg:py-16">

          {/* ── LEFT: Text Content ── */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl w-full">

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-semibold text-emerald-300"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.22)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              India&apos;s #1 Free Stock Education Platform
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="text-white block">Learn Stock Market</span>
              <span
                className="block mt-1 bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent"
              >
                the Smart Way
              </span>
            </motion.h1>

            {/* Sub-text */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg"
            >
              Knowledge Jaaz helps{' '}
              <span className="text-emerald-400 font-semibold">middle-class families</span> learn
              investing, stock fundamentals, penny stocks, and wealth creation —
              in <span className="text-white font-medium">simple language.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="flex flex-col sm:flex-row gap-3 mt-7 w-full sm:w-auto"
            >
              <motion.a
                href="#learn"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white overflow-hidden group w-full sm:w-auto"
                style={{ background: 'linear-gradient(135deg, #10b981, #0d9488)' }}
              >
                <span className="relative z-10">Start Learning Free →</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white w-full sm:w-auto"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">▶</span>
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stat Cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="flex flex-row flex-wrap gap-3 mt-8 justify-center lg:justify-start"
            >
              {STAT_CARDS.map((card, i) => {
                const c = colorMap[card.color];
                return (
                  <motion.div
                    key={card.label}
                    whileHover={{ y: -3, scale: 1.03 }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      y: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
                    }}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border bg-gradient-to-br ${c.gradient} ${c.border}`}
                    style={{ minWidth: '130px' }}
                  >
                    <span className="text-lg">{card.icon}</span>
                    <div>
                      <div className={`text-lg font-extrabold ${c.text} leading-none`}>{card.value}</div>
                      <div className="text-[10px] text-white/60 mt-0.5">{card.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Trusted by */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-8 flex flex-col items-center lg:items-start gap-2.5"
            >
              <p className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold">Trusted by investors using</p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {TRUSTED_BRANDS.map(name => (
                  <span
                    key={name}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors duration-200 cursor-default"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Chart (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="hidden lg:flex flex-1 flex-col items-center justify-center w-full max-w-lg relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full bg-emerald-500/8 blur-[80px]" />
            </div>

            {/* Markets Open badge */}
            <div
              className="relative z-10 mb-3 self-start ml-3 flex items-center gap-2 px-3.5 py-2 rounded-xl"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.22)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-300">Markets Open</span>
              <span className="text-xs text-emerald-400/60">•</span>
              <span className="text-xs font-mono text-emerald-400">NSE/BSE</span>
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
              className="relative z-10 mt-3 self-end mr-3 flex items-center gap-3 px-4 py-2.5 rounded-xl"
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

      {/* ── Stock Ticker ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full"
      >
        <StockTicker />
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="flex justify-center py-5"
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

      {/* Gradient bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #020b1a)' }} />
    </section>
  );
};

export default HeroSection;
