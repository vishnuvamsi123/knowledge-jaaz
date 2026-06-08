'use client';

import React from 'react';

// Minimal header — just a thin top accent line (no sticky logo)
const Header: React.FC = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] w-full pointer-events-none"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.8), rgba(236,72,153,0.5), transparent)' }}
    />
  );
};

export default Header;
