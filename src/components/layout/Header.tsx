'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Header height — change this one value to make the banner taller or shorter
const HEADER_HEIGHT = '90px';

const Header: React.FC = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <>
      {/* ── FIXED HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full overflow-hidden"
        style={{
          height: HEADER_HEIGHT,
          background: '#020b1a',
          borderBottom: '1px solid rgba(16,185,129,0.14)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
        }}
      >
        {/* Top emerald accent line */}
        <div
          className="absolute top-0 left-0 w-full h-[2px] z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.7), rgba(20,184,166,0.4), transparent)' }}
        />

        {/* LOGO BANNER — wide format, fills full width clearly */}
        <motion.img
          src={`${basePath}/logo-banner.png`}
          alt="Knowledge Jaaz"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </header>

      {/* Spacer — same height as the header */}
      <div style={{ height: HEADER_HEIGHT }} />
    </>
  );
};

export default Header;
