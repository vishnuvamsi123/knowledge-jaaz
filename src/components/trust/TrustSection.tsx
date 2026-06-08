'use client';

import { motion } from 'framer-motion';

// ─── Trust Pillars ────────────────────────────────────────────────────────────

const TRUST_PILLARS = [
  {
    icon: '🔒',
    title: '100% Secure',
    subtitle: 'Bank-grade encryption',
    description:
      'Bank-grade AES-256 encryption protects all data. We never store personal trading data, portfolio details, or financial credentials. Your privacy is our top priority.',
    color: 'emerald',
  },
  {
    icon: '🏢',
    title: 'DPDP Compliant',
    subtitle: "India's Data Protection Act",
    description:
      "Full compliance with India's Digital Personal Data Protection Act 2023. We collect only what we need, use it only for education, and delete it on request.",
    color: 'blue',
  },
  {
    icon: '📚',
    title: 'Educational First',
    subtitle: 'We teach, not sell',
    description:
      "We teach investing principles, not sell stocks. No pump-and-dump schemes, no hidden commission structures, no paid promotions disguised as analysis. Pure education.",
    color: 'violet',
  },
  {
    icon: '🔍',
    title: 'Data Transparent',
    subtitle: 'All sources cited',
    description:
      'All data sources are clearly cited — NSE, BSE, company filings, SEBI disclosures. All scores are educational estimates based on publicly available information only.',
    color: 'amber',
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

const TRUST_STATS = [
  { value: '10L+', label: 'Learners Trusted Us', icon: '👥' },
  { value: '0',    label: 'Financial Scams',      icon: '🛡️' },
  { value: '100%', label: 'Free Education',       icon: '📚' },
  { value: '3+',   label: 'Years Trusted',        icon: '🏆' },
];

// ─── Partners ────────────────────────────────────────────────────────────────

const PARTNERS = ['NPCI', 'NSE', 'BSE', 'RBI Education', 'SEBI Guidelines'];

// ─── Color maps ───────────────────────────────────────────────────────────────

const colorMap: Record<string, { border: string; bg: string; icon: string; badge: string }> = {
  emerald: {
    border: 'border-emerald-500/30 hover:border-emerald-500/60',
    bg:     'bg-emerald-500/5',
    icon:   'bg-emerald-500/20 text-emerald-400 shadow-emerald-500/20',
    badge:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  blue: {
    border: 'border-blue-500/30 hover:border-blue-500/60',
    bg:     'bg-blue-500/5',
    icon:   'bg-blue-500/20 text-blue-400 shadow-blue-500/20',
    badge:  'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  violet: {
    border: 'border-violet-500/30 hover:border-violet-500/60',
    bg:     'bg-violet-500/5',
    icon:   'bg-violet-500/20 text-violet-400 shadow-violet-500/20',
    badge:  'bg-violet-500/10 text-violet-400 border-violet-500/20',
  },
  amber: {
    border: 'border-amber-500/30 hover:border-amber-500/60',
    bg:     'bg-amber-500/5',
    icon:   'bg-amber-500/20 text-amber-400 shadow-amber-500/20',
    badge:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
};

// ─── Pillar Card ──────────────────────────────────────────────────────────────

function PillarCard({ pillar, index }: { pillar: typeof TRUST_PILLARS[0]; index: number }) {
  const c = colorMap[pillar.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative rounded-2xl p-6 border ${c.border} ${c.bg}
        transition-all duration-300 group
        hover:shadow-lg hover:shadow-white/5
      `}
    >
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl ${c.icon} flex items-center justify-center text-2xl mb-5 shadow-lg`}>
        {pillar.icon}
      </div>

      {/* Subtitle badge */}
      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${c.badge} mb-2`}>
        {pillar.subtitle}
      </span>

      {/* Title */}
      <h3 className="text-white font-bold text-lg mb-3">{pillar.title}</h3>

      {/* Description */}
      <p className="text-white/60 text-sm leading-relaxed">{pillar.description}</p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TrustSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative" id="trust">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <span className="text-emerald-400 text-sm font-medium">🛡️ Trust & Transparency</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Why Trust Knowledge Jaaz?
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Built with integrity for India's middle-class investors. Education first, always.
          </p>
        </motion.div>

        {/* Trust Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {TRUST_PILLARS.map((pillar, idx) => (
            <PillarCard key={pillar.title} pillar={pillar} index={idx} />
          ))}
        </div>

        {/* Disclaimer Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 mb-12 overflow-hidden"
        >
          {/* Left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l-2xl" />

          <div className="flex items-start gap-4 pl-3">
            <div className="text-2xl flex-shrink-0 mt-0.5">⚠️</div>
            <div>
              <h4 className="text-amber-400 font-bold text-base mb-2 uppercase tracking-wide">
                Important Disclaimer
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                <strong className="text-white font-semibold">Knowledge Jaaz</strong> is a stock market{' '}
                <strong className="text-amber-300 font-semibold">education platform ONLY</strong>. We do{' '}
                <strong className="text-white font-semibold">NOT</strong> provide SEBI-registered investment advice.
                All content — including stock scores, signals, and analysis — is for{' '}
                <strong className="text-amber-300 font-semibold">educational purposes only</strong> and should{' '}
                <strong className="text-white font-semibold">NOT</strong> be construed as investment
                recommendations. Please consult a{' '}
                <strong className="text-emerald-300 font-semibold">SEBI-registered investment advisor</strong>{' '}
                before making any investment decisions.{' '}
                <strong className="text-red-300 font-semibold">
                  Stock market investments are subject to market risks. Read all related documents carefully before
                  investing.
                </strong>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {TRUST_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/8 transition-colors"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-3xl font-black text-emerald-400">{stat.value}</p>
              <p className="text-white/50 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Partner Logos Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-5">
            Aligned with Regulatory Guidelines
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {PARTNERS.map((partner) => (
              <div
                key={partner}
                className="
                  px-5 py-2.5 rounded-xl bg-white/5 border border-white/10
                  text-white/50 text-sm font-semibold
                  hover:bg-white/10 hover:text-white/80 hover:border-white/20
                  transition-all duration-300
                "
              >
                {partner}
              </div>
            ))}
          </div>
          <p className="text-white/20 text-xs mt-4 max-w-lg mx-auto">
            Knowledge Jaaz is aligned with guidelines from the above regulatory bodies for educational content.
            We are not affiliated with or endorsed by any of the above organizations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
