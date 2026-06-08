'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <>
      {/* ── FIXED HEADER — logo only, full width, centered ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-center"
        style={{
          background: 'rgba(2,11,26,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(16,185,129,0.12)',
          boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* Top emerald accent line */}
        <div
          className="absolute top-0 left-0 w-full h-[2px] pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.7), rgba(20,184,166,0.4), transparent)' }}
        />

        {/* LOGO — full width, centered, big */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full flex items-center justify-center py-4 sm:py-5 px-4"
        >
          <img
            src={`${basePath}/logo.png`}
            alt="Knowledge Jaaz"
            className="w-auto mx-auto"
            style={{
              height: 'clamp(64px, 12vw, 120px)',
              filter: 'drop-shadow(0 0 24px rgba(16,185,129,0.45)) drop-shadow(0 4px 16px rgba(0,0,0,0.7))',
            }}
          />
        </motion.div>
      </header>

      {/* Spacer to push page content below the fixed header */}
      <div style={{ height: 'clamp(96px, 16vw, 160px)' }} />
    </>
  );
};

export default Header;
