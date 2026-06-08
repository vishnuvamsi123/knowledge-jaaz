'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Learn', href: '/learn', hasDropdown: true },
  { label: 'Markets', href: '/markets', hasDropdown: true },
  { label: 'Stocks', href: '/stocks' },
  { label: 'Analyzer', href: '/analyzer' },
  { label: 'AI Assistant', href: '/ai-assistant' },
  { label: 'Community', href: '/community' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<'EN' | 'TE'>('EN');
  const [activeLink, setActiveLink] = useState<string>('/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'EN' ? 'TE' : 'EN'));
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      height: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -16 },
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-[rgba(4,12,30,0.95)] backdrop-blur-2xl shadow-2xl shadow-black/40'
            : 'bg-[rgba(4,12,30,0.80)] backdrop-blur-xl'
        }`}
        style={{
          borderBottom: '1px solid rgba(16, 185, 129, 0.12)',
        }}
      >
        {/* Top gradient accent line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">

            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Plain img so basePath prefix works correctly in GitHub Pages static export */}
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.png`}
                alt="Knowledge Jaaz"
                className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.25))' }}
              />
            </motion.a>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden lg:flex items-center gap-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`relative flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    activeLink === link.href
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-slate-300 hover:text-emerald-400 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={12}
                      className="text-current opacity-60 group-hover:opacity-100 transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                  {activeLink === link.href && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-emerald-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </motion.nav>

            {/* Right Actions */}
            <motion.div
              className="hidden lg:flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="relative flex items-center gap-0 rounded-full p-0.5 bg-white/8 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 overflow-hidden"
                aria-label="Toggle Language"
              >
                <span
                  className={`relative z-10 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                    language === 'EN'
                      ? 'text-slate-900 bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  EN
                </span>
                <span
                  className={`relative z-10 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                    language === 'TE'
                      ? 'text-slate-900 bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  తె
                </span>
              </button>

              {/* CTA Button */}
              <motion.a
                href="/learn"
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden group"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-xl shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow duration-300" />
                <span className="relative z-10">Start Learning</span>
                <span className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200 text-base">→</span>
              </motion.a>
            </motion.div>

            {/* Mobile Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Language pill - mobile */}
              <button
                onClick={toggleLanguage}
                className="flex items-center rounded-full p-0.5 bg-white/8 border border-white/10"
              >
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
                    language === 'EN' ? 'text-slate-900 bg-emerald-400' : 'text-slate-400'
                  }`}
                >
                  EN
                </span>
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
                    language === 'TE' ? 'text-slate-900 bg-emerald-400' : 'text-slate-400'
                  }`}
                >
                  తె
                </span>
              </button>

              <motion.button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-200"
                whileTap={{ scale: 0.93 }}
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden overflow-hidden"
              style={{
                background: 'rgba(4, 12, 30, 0.97)',
                borderTop: '1px solid rgba(16, 185, 129, 0.10)',
              }}
            >
              <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    variants={mobileLinkVariants}
                    onClick={() => {
                      setActiveLink(link.href);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeLink === link.href
                        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                        : 'text-slate-300 hover:text-emerald-400 hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && (
                      <ChevronDown size={14} className="opacity-50" />
                    )}
                  </motion.a>
                ))}

                {/* Mobile CTA */}
                <motion.div variants={mobileLinkVariants} className="mt-3 pb-1">
                  <a
                    href="/learn"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25"
                  >
                    Start Learning Free →
                  </a>
                </motion.div>

                {/* Mobile market ticker mini */}
                <motion.div
                  variants={mobileLinkVariants}
                  className="mt-2 flex items-center gap-3 px-3 py-2 rounded-lg bg-white/3 text-xs text-slate-500 border border-white/5"
                >
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    LIVE
                  </span>
                  <span className="text-emerald-400 font-mono">NIFTY 24,128 ▲</span>
                  <span className="text-emerald-400 font-mono">SENSEX 79,245 ▲</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20 lg:h-24" />
    </>
  );
};

export default Header;
