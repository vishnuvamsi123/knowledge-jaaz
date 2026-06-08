'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  MessageCircle,
  PlayCircle,
  Send,
  Camera,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Shield,
} from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Learn',
    links: [
      { label: 'Stock Basics', href: '/learn/stock-basics' },
      { label: 'Technical Analysis', href: '/learn/technical-analysis' },
      { label: 'Fundamental Analysis', href: '/learn/fundamental-analysis' },
      { label: 'Penny Stocks', href: '/learn/penny-stocks' },
      { label: 'SIP & Mutual Funds', href: '/learn/sip-mutual-funds' },
    ],
  },
  {
    heading: 'Markets',
    links: [
      { label: 'NSE Stocks', href: '/markets/nse' },
      { label: 'BSE Stocks', href: '/markets/bse' },
      { label: 'Market Dashboard', href: '/markets/dashboard' },
      { label: 'Stock Screener', href: '/markets/screener' },
      { label: 'Best Picks', href: '/markets/best-picks' },
    ],
  },
  {
    heading: 'Tools',
    links: [
      { label: 'Stock Analyzer', href: '/analyzer' },
      { label: 'Compare Stocks', href: '/analyzer/compare' },
      { label: 'AI Assistant', href: '/ai-assistant' },
      { label: 'News', href: '/news' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Mission', href: '/about/mission' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: <MessageCircle size={18} />,
    label: 'X / Twitter',
    href: 'https://twitter.com',
    color: 'hover:bg-sky-500/20 hover:border-sky-500/40 hover:text-sky-400',
  },
  {
    icon: <PlayCircle size={18} />,
    label: 'YouTube',
    href: 'https://youtube.com',
    color: 'hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400',
  },
  {
    icon: <Send size={18} />,
    label: 'Telegram',
    href: 'https://telegram.org',
    color: 'hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-blue-400',
  },
  {
    icon: <Camera size={18} />,
    label: 'Instagram',
    href: 'https://instagram.com',
    color: 'hover:bg-pink-500/20 hover:border-pink-500/40 hover:text-pink-400',
  },
];

const CONTACT_INFO = [
  { icon: <Mail size={14} />, text: 'hello@knowledgejaaz.in' },
  { icon: <Phone size={14} />, text: '+91 90000 00000' },
  { icon: <MapPin size={14} />, text: 'Hyderabad, Telangana, India' },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020b1a 0%, #010810 100%)' }}
    >
      {/* Top glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-emerald-500/3 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-teal-500/3 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <motion.div
          className="pt-16 pb-12 border-b border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Brand Column */}
            <motion.div custom={0} variants={fadeUpVariants} className="space-y-6">
              {/* Logo */}
              <a href="/" className="flex items-center w-fit">
                <Image
                  src="/logo.png"
                  alt="Knowledge Jaaz"
                  width={240}
                  height={78}
                  className="h-12 sm:h-16 lg:h-20 w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.2))' }}
                />
              </a>

              {/* Tagline */}
              <p className="text-base font-semibold text-slate-300 leading-snug max-w-xs">
                Stock Market Knowledge for Every{' '}
                <span className="text-emerald-400">Middle-Class Family</span>
              </p>

              <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                We believe every Indian family deserves to understand wealth creation.
                From stock basics to advanced analysis — learn it all in simple language.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/4 text-slate-400 transition-all duration-250 ${social.color}`}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.93 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-2.5">
                {CONTACT_INFO.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-slate-500 text-xs">
                    <span className="text-emerald-600">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div custom={1} variants={fadeUpVariants} className="grid grid-cols-3 gap-4">
              {[
                { value: '10L+', label: 'Learners', icon: '👥', color: 'emerald' },
                { value: '500+', label: 'Analyses', icon: '📊', color: 'blue' },
                { value: '₹0', label: 'To Start', icon: '🎯', color: 'yellow' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="relative flex flex-col items-center justify-center p-5 rounded-2xl text-center overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div
                    className={`text-2xl font-extrabold ${
                      stat.color === 'emerald'
                        ? 'text-emerald-400'
                        : stat.color === 'blue'
                        ? 'text-blue-400'
                        : 'text-yellow-400'
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/5">
          {FOOTER_COLUMNS.map((col, colIndex) => (
            <motion.div
              key={col.heading}
              custom={colIndex + 2}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-4"
            >
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 transition-all duration-200"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          custom={6}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="py-6 border-b border-white/5"
        >
          <div
            className="flex items-start gap-3 p-4 rounded-xl"
            style={{
              background: 'rgba(16, 185, 129, 0.04)',
              border: '1px solid rgba(16, 185, 129, 0.12)',
            }}
          >
            <div className="flex-shrink-0 mt-0.5">
              <Shield size={16} className="text-emerald-500/70" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-400">Important Disclaimer: </span>
              Knowledge Jaaz is an{' '}
              <span className="text-emerald-400/80">educational platform</span> only. We do
              not provide financial advice, investment recommendations, or trading tips. All
              content is for educational purposes only. Past performance of any stock is not
              indicative of future results. Please consult a{' '}
              <span className="text-emerald-400/80">SEBI-registered advisor</span> before making
              any investment decisions. Investing in stock markets involves risk of loss.
            </p>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          custom={7}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-slate-600 text-center sm:text-left">
            © {currentYear} Knowledge Jaaz. All rights reserved. Made with{' '}
            <span className="text-red-400">❤️</span> for{' '}
            <span className="text-emerald-500/70">Middle-Class India</span>
          </p>

          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200">
              Privacy
            </a>
            <a href="/terms" className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200">
              Terms
            </a>
            <a href="/disclaimer" className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200">
              Disclaimer
            </a>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-600 font-medium">Markets Live</span>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
