'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import StockTicker from './StockTicker';
import AnimatedChart from './AnimatedChart';

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatCard {
  value: string;
  label: string;
  sublabel: string;
  icon: string;
  color: 'emerald' | 'gold' | 'blue';
  delay: number;
}

interface TrustedBrand {
  name: string;
  tagline: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STAT_CARDS: StatCard[] = [
  {
    value: '10L+',
    label: 'Middle-Class Learners',
    sublabel: 'Across India',
    icon: '👥',
    color: 'emerald',
    delay: 0.6,
  },
  {
    value: '₹0',
    label: 'Cost to Start Learning',
    sublabel: '100% Free Platform',
    icon: '🎯',
    color: 'gold',
    delay: 0.75,
  },
  {
    value: '500+',
    label: 'Stock Analyses',
    sublabel: 'Updated Daily',
    icon: '📊',
    color: 'blue',
    delay: 0.9,
  },
];

const TRUSTED_BRANDS: TrustedBrand[] = [
  { name: 'Zerodha', tagline: '#1 Broker' },
  { name: 'Groww', tagline: 'Easy Investing' },
  { name: 'Angel One', tagline: 'Smart Trading' },
  { name: 'NSE', tagline: 'National Exchange' },
  { name: 'BSE', tagline: 'Bombay Exchange' },
];

// ─── Particle component ───────────────────────────────────────────────────────

interface ParticleProps {
  id: number;
}

const Particle: React.FC<ParticleProps> = ({ id }) => {
  const size = 1 + (id % 3);
  const xStart = ((id * 137.5) % 100);
  const yStart = ((id * 73.1) % 100);
  const duration = 12 + (id % 10);
  const delay = -(id * 1.3) % duration;

  return (
    <motion.div
      className="absolute rounded-full bg-emerald-400/20"
      style={{
        width: size,
        height: size,
        left: `${xStart}%`,
        top: `${yStart}%`,
      }}
      animate={{
        y: [0, -60, 0],
        x: [0, (id % 2 === 0 ? 20 : -20), 0],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// ─── Rotating Ring ────────────────────────────────────────────────────────────

interface RingProps {
  size: number;
  speed: number;
  opacity: number;
  delay?: number;
  reverse?: boolean;
}

const RotatingRing: React.FC<RingProps> = ({ size, speed, opacity, delay = 0, reverse = false }) => (
  <motion.div
    className="absolute rounded-full border border-emerald-500/20"
    style={{
      width: size,
      height: size,
      left: '50%',
      top: '50%',
      marginLeft: -size / 2,
      marginTop: -size / 2,
      opacity,
    }}
    animate={{ rotate: reverse ? -360 : 360 }}
    transition={{ duration: speed, delay, repeat: Infinity, ease: 'linear' }}
  />
);

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardComponentProps {
  card: StatCard;
}

const colorMap = {
  emerald: {
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/25',
    value: 'text-emerald-400',
    icon: 'bg-emerald-500/15',
    glow: 'shadow-emerald-500/20',
  },
  gold: {
    gradient: 'from-yellow-500/20 to-yellow-500/5',
    border: 'border-yellow-500/25',
    value: 'text-yellow-400',
    icon: 'bg-yellow-500/15',
    glow: 'shadow-yellow-500/20',
  },
  blue: {
    gradient: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/25',
    value: 'text-blue-400',
    icon: 'bg-blue-500/15',
    glow: 'shadow-blue-500/20',
  },
};

const floatVariants = {
  initial: { y: 0 },
  float: (delay: number) => ({
    y: [-6, 6, -6],
    transition: {
      duration: 4,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

const StatCardComponent: React.FC<StatCardComponentProps> = ({ card }) => {
  const colors = colorMap[card.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: card.delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      variants={floatVariants}
      custom={card.delay * 0.5}
    >
      <motion.div
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 4 + card.delay,
          delay: card.delay * 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`relative p-4 rounded-2xl border bg-gradient-to-br ${colors.gradient} ${colors.border} backdrop-blur-sm shadow-xl ${colors.glow} cursor-default group`}
        whileHover={{ scale: 1.05, y: -4 }}
        style={{ minWidth: '160px' }}
      >
        <div className="flex items-start gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${colors.icon} text-lg flex-shrink-0`}>
            {card.icon}
          </div>
          <div>
            <div className={`text-2xl font-extrabold ${colors.value} leading-none`}>
              {card.value}
            </div>
            <div className="text-xs font-semibold text-white/80 mt-1 leading-tight">
              {card.label}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{card.sublabel}</div>
          </div>
        </div>
        {/* Subtle inner glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.06), transparent 70%)' }}
        />
      </motion.div>
    </motion.div>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles] = useState(() => Array.from({ length: 30 }, (_, i) => i));
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%']);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.12) 0%, rgba(4,12,30,1) 60%), linear-gradient(180deg, #020b1a 0%, #010810 100%)',
      }}
    >
      {/* ── Background Layers ── */}

      {/* Grid dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Rotating rings (decorative) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <RotatingRing size={900} speed={80} opacity={0.18} />
        <RotatingRing size={650} speed={55} opacity={0.12} reverse delay={5} />
        <RotatingRing size={420} speed={35} opacity={0.10} delay={2} />
        <RotatingRing size={200} speed={20} opacity={0.08} reverse delay={1} />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/6 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-teal-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-blue-500/4 blur-[90px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted && particles.map((id) => <Particle key={id} id={id} />)}
      </div>

      {/* ── Main Hero Content ── */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 flex-1 flex flex-col"
      >
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 min-h-[calc(100vh-160px)] py-16 lg:py-20">

            {/* ── LEFT COLUMN: Text Content ── */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl w-full lg:max-w-none">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-emerald-300"
                  style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  India's #1 Stock Education Platform
                  <span className="ml-1 text-emerald-500">→</span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="text-white block">Learn Stock Market</span>
                <span className="block mt-1">
                  <span
                    className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent"
                    style={{
                      backgroundSize: '200% 100%',
                      animation: 'gradient-shift 4s ease infinite',
                    }}
                  >
                    the Smart Way
                  </span>
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg"
              >
                Knowledge Jaaz helps{' '}
                <span className="text-emerald-400 font-semibold">middle-class people</span> learn
                investing, stock fundamentals, penny stocks, wealth creation, and real-time market
                insights in{' '}
                <span className="text-white font-medium">simple language.</span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mt-8 w-full sm:w-auto"
              >
                {/* Primary CTA */}
                <motion.a
                  href="/learn"
                  className="relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white overflow-hidden group w-full sm:w-auto"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-emerald-500/40 group-hover:shadow-emerald-500/60 transition-shadow duration-300" />
                  {/* Shimmer */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="relative z-10">Start Learning Free</span>
                  <span className="relative z-10 text-lg">→</span>
                </motion.a>

                {/* Secondary CTA */}
                <motion.button
                  className="relative flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-semibold text-white group w-full sm:w-auto overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.08)' }} />
                  <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm">
                    ▶
                  </span>
                  <span className="relative z-10">Watch Demo</span>
                </motion.button>
              </motion.div>

              {/* Stat Cards */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
                className="flex flex-col sm:flex-row flex-wrap gap-4 mt-10 justify-center lg:justify-start"
              >
                {STAT_CARDS.map((card) => (
                  <StatCardComponent key={card.label} card={card} />
                ))}
              </motion.div>

              {/* Trusted By row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="mt-12 flex flex-col items-center lg:items-start gap-4"
              >
                <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold">
                  Trusted by investors using
                </p>
                <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
                  {TRUSTED_BRANDS.map((brand) => (
                    <div
                      key={brand.name}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl group cursor-default transition-all duration-200 hover:border-emerald-500/20"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      <span className="text-xs font-bold text-slate-300 group-hover:text-emerald-400 transition-colors duration-200">
                        {brand.name}
                      </span>
                      <span className="hidden sm:block text-[9px] text-slate-600 group-hover:text-slate-500 transition-colors duration-200">
                        • {brand.tagline}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN: Chart + Decorative ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex-1 flex flex-col items-center justify-center w-full max-w-xl lg:max-w-lg relative"
            >
              {/* Decorative glow behind chart */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-emerald-500/8 blur-[80px]" />
              </div>

              {/* Top floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="relative z-10 mb-4 self-start ml-4"
              >
                <div
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                  style={{
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-300">Markets Open</span>
                  <span className="text-xs text-emerald-400/60">•</span>
                  <span className="text-xs font-mono text-emerald-400">NSE/BSE</span>
                </div>
              </motion.div>

              {/* AnimatedChart */}
              <div className="relative z-10 w-full">
                <AnimatedChart />
              </div>

              {/* Bottom floating notification card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="relative z-10 mt-4 self-end mr-4"
                style={{ maxWidth: '220px' }}
              >
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(4, 14, 36, 0.90)',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  <div className="flex-shrink-0 text-2xl">🚀</div>
                  <div>
                    <div className="text-xs font-bold text-white">AI Analysis Ready</div>
                    <div className="text-[10px] text-slate-500">RELIANCE • Buy Signal</div>
                    <div className="text-[10px] text-emerald-400 font-mono font-semibold">+2.3% Today</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Side floating info pill */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.15 }}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 hidden xl:block"
              >
                <motion.div
                  animate={{ x: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center gap-2 px-3 py-4 rounded-2xl"
                  style={{
                    background: 'rgba(4, 14, 36, 0.90)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    writingMode: 'vertical-rl',
                  }}
                >
                  <span className="text-[10px] font-bold text-emerald-400 tracking-widest" style={{ writingMode: 'horizontal-tb' }}>
                    📈 SENSEX
                  </span>
                  <span className="text-[11px] font-mono text-white font-bold" style={{ writingMode: 'horizontal-tb' }}>
                    79,245
                  </span>
                  <span className="text-[9px] text-emerald-400" style={{ writingMode: 'horizontal-tb' }}>
                    ▲ +0.40%
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Stock Ticker ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full"
        >
          <StockTicker />
        </motion.div>

        {/* ── Scroll Indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex justify-center py-6"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => {
              window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
            }}
          >
            <span className="text-[10px] text-slate-600 uppercase tracking-widest group-hover:text-slate-400 transition-colors duration-200">
              Scroll to explore
            </span>
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-emerald-500/50 group-hover:border-t-emerald-400/80 transition-colors duration-200" />
              <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-emerald-500/25 group-hover:border-t-emerald-400/50 transition-colors duration-200" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Gradient shift keyframe */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
