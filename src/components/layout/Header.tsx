'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'Learn',        href: '#learn' },
  { label: 'Markets',      href: '#markets' },
  { label: 'Stocks',       href: '#stocks' },
  { label: 'Analyzer',     href: '#analyzer' },
  { label: 'AI Assistant', href: '#ai-assistant' },
  { label: 'Community',    href: '#community' },
];

const Header: React.FC = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeLink,  setActiveLink]  = useState('#home');
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════
          FIXED HEADER WRAPPER
          ══════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{
          background: scrolled
            ? 'rgba(2,11,26,0.97)'
            : 'rgba(2,11,26,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(16,185,129,0.1)',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 w-full h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.6), rgba(20,184,166,0.4), transparent)' }}
        />

        {/* ── LOGO ROW — centered, full width ── */}
        <div className="w-full flex items-center justify-center py-3 sm:py-4 relative">

          {/* Logo — large, centered */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={`${basePath}/logo.png`}
              alt="Knowledge Jaaz"
              className="w-auto mx-auto"
              style={{
                height: 'clamp(52px, 9vw, 88px)',
                filter: 'drop-shadow(0 0 16px rgba(16,185,129,0.35)) drop-shadow(0 2px 12px rgba(0,0,0,0.6))',
              }}
            />
          </motion.a>

          {/* Mobile hamburger — positioned absolute right */}
          <button
            className="absolute right-4 flex md:hidden items-center justify-center w-10 h-10 rounded-xl text-white"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* ── NAV ROW — desktop only ── */}
        <nav className="hidden md:flex items-center justify-center gap-1 pb-2.5 px-6">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 * i }}
              className="relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
              style={{ color: activeLink === link.href ? '#34d399' : 'rgba(255,255,255,0.6)' }}
              whileHover={{ color: '#34d399' }}
            >
              {link.label}
              {/* Active underline dot */}
              {activeLink === link.href && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400"
                />
              )}
            </motion.a>
          ))}

          {/* Start Learning CTA */}
          <motion.a
            href="#learn"
            onClick={(e) => { e.preventDefault(); handleNav('#learn'); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="ml-4 px-5 py-2 rounded-xl text-sm font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #10b981, #0d9488)',
              boxShadow: '0 4px 16px rgba(16,185,129,0.3)',
            }}
          >
            Start Learning →
          </motion.a>
        </nav>
      </header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.nav
              key="mobile-nav"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed left-0 right-0 z-50 flex flex-col gap-1 p-4"
              style={{
                top: 'var(--header-height, 130px)',
                background: 'rgba(2,11,26,0.97)',
                backdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(16,185,129,0.12)',
              }}
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="flex items-center w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200"
                  style={{
                    color: activeLink === link.href ? '#34d399' : 'rgba(255,255,255,0.7)',
                    background: activeLink === link.href ? 'rgba(16,185,129,0.08)' : 'transparent',
                    border: `1px solid ${activeLink === link.href ? 'rgba(16,185,129,0.15)' : 'transparent'}`,
                  }}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => handleNav('#learn')}
                className="mt-3 w-full py-3.5 rounded-xl text-sm font-bold text-white text-center"
                style={{ background: 'linear-gradient(135deg, #10b981, #0d9488)' }}
              >
                Start Learning Free →
              </button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Spacer so page content doesn't go under fixed header */}
      <div style={{ height: 'clamp(110px, 16vw, 158px)' }} />
    </>
  );
};

export default Header;
