'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_STOCKS } from '@/lib/mockData';

// ─── Types ────────────────────────────────────────────────────────────────────
interface PickStock {
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  reason: string;
  fundamentalScore: number;
  signal: 'BUY' | 'HOLD' | 'SELL';
  stars: number;
}

// ─── Tab Config ───────────────────────────────────────────────────────────────
const TABS = [
  { id: 'penny',      label: 'Best Penny Stocks',      icon: '💰' },
  { id: 'longterm',   label: 'Best Long-Term',          icon: '🏆' },
  { id: 'dividend',   label: 'Best Dividend',           icon: '💵' },
  { id: 'multibagger',label: 'Multibagger Potential',   icon: '🚀' },
  { id: 'undervalued',label: 'Undervalued Stocks',      icon: '📉' },
] as const;

type TabId = typeof TABS[number]['id'];

// ─── Mock Data per Tab ────────────────────────────────────────────────────────
const PICKS: Record<TabId, PickStock[]> = {
  penny: [
    { symbol: 'SUZLON', name: 'Suzlon Energy', exchange: 'NSE', price: 42.30, change: 3.15, reason: 'Strong renewable energy tailwinds + improving fundamentals', fundamentalScore: 64, signal: 'BUY', stars: 4 },
    { symbol: 'YESBANK', name: 'Yes Bank', exchange: 'NSE', price: 21.85, change: -1.02, reason: 'Restructuring complete; turnaround play for risk-tolerant investors', fundamentalScore: 55, signal: 'HOLD', stars: 3 },
    { symbol: 'IRFC', name: 'IRFC', exchange: 'NSE', price: 186.40, change: 2.30, reason: 'Govt-backed railway financing; consistent growth & cheap valuation', fundamentalScore: 74, signal: 'BUY', stars: 4 },
    { symbol: 'PNBHOUSING', name: 'PNB Housing Finance', exchange: 'NSE', price: 927.65, change: 1.54, reason: 'Housing credit boom + AUM expansion driving earnings recovery', fundamentalScore: 68, signal: 'BUY', stars: 4 },
    { symbol: 'HFCL', name: 'HFCL', exchange: 'NSE', price: 74.20, change: 4.20, reason: '5G infrastructure play; order book at multi-year high', fundamentalScore: 61, signal: 'BUY', stars: 3 },
  ],
  longterm: [
    { symbol: 'RELIANCE', name: 'Reliance Industries', exchange: 'NSE', price: 2934.50, change: 1.23, reason: 'Diversified conglomerate with Jio + retail + green energy moats', fundamentalScore: 88, signal: 'BUY', stars: 5 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE', price: 3812.30, change: 0.87, reason: 'World-class IT services; consistent dividend + buyback history', fundamentalScore: 92, signal: 'BUY', stars: 5 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', exchange: 'NSE', price: 1687.45, change: 0.64, reason: 'India\'s best retail bank; pristine asset quality + CASA leadership', fundamentalScore: 90, signal: 'BUY', stars: 5 },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance', exchange: 'NSE', price: 7124.80, change: 1.44, reason: 'Consumer lending powerhouse; tech-first NBFC with superior ROE', fundamentalScore: 86, signal: 'BUY', stars: 5 },
  ],
  dividend: [
    { symbol: 'COALINDIA', name: 'Coal India', exchange: 'NSE', price: 484.30, change: 0.42, reason: '7%+ dividend yield; PSU with steady cash flows', fundamentalScore: 72, signal: 'BUY', stars: 4 },
    { symbol: 'ITC', name: 'ITC Limited', exchange: 'NSE', price: 452.15, change: 0.68, reason: 'Consistent 4%+ dividend; diversified business with FMCG growth', fundamentalScore: 80, signal: 'BUY', stars: 4 },
    { symbol: 'POWERGRID', name: 'Power Grid Corp', exchange: 'NSE', price: 312.60, change: 0.29, reason: 'Regulated monopoly; 4.5% yield + capex-backed growth', fundamentalScore: 77, signal: 'BUY', stars: 4 },
    { symbol: 'ONGC', name: 'ONGC', exchange: 'NSE', price: 278.90, change: -0.52, reason: '5%+ yield; energy supercycle beneficiary with PSU stability', fundamentalScore: 68, signal: 'HOLD', stars: 3 },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', exchange: 'NSE', price: 2312.50, change: 0.33, reason: 'Reliable 1.8% yield + FMCG brand moat; wealth compounder', fundamentalScore: 85, signal: 'BUY', stars: 5 },
  ],
  multibagger: [
    { symbol: 'TATAMOTORS', name: 'Tata Motors', exchange: 'NSE', price: 948.70, change: 2.87, reason: 'JLR electric pivot + India EV dominance = 3–5x potential', fundamentalScore: 78, signal: 'BUY', stars: 5 },
    { symbol: 'ZOMATO', name: 'Zomato', exchange: 'NSE', price: 234.80, change: 3.54, reason: 'Quick commerce + food delivery duopoly; path to profitability clear', fundamentalScore: 65, signal: 'BUY', stars: 4 },
    { symbol: 'ADANIGREEN', name: 'Adani Green Energy', exchange: 'NSE', price: 1847.30, change: 4.11, reason: 'India\'s green energy leader; massive capacity addition pipeline', fundamentalScore: 71, signal: 'BUY', stars: 4 },
    { symbol: 'DIXON', name: 'Dixon Technologies', exchange: 'NSE', price: 14320.00, change: 2.68, reason: 'PLI-driven electronics manufacturing; Apple + Samsung supplier', fundamentalScore: 82, signal: 'BUY', stars: 5 },
  ],
  undervalued: [
    { symbol: 'NTPC', name: 'NTPC Limited', exchange: 'NSE', price: 368.45, change: 0.74, reason: 'Trades at PE 14 vs sector avg 22; green energy transition underpriced', fundamentalScore: 75, signal: 'BUY', stars: 4 },
    { symbol: 'SBIN', name: 'State Bank of India', exchange: 'NSE', price: 824.60, change: 1.12, reason: 'P/B of 1.4x; best-in-class PSU bank with credit cycle tailwinds', fundamentalScore: 76, signal: 'BUY', stars: 4 },
    { symbol: 'BPCL', name: 'BPCL', exchange: 'NSE', price: 352.70, change: -0.38, reason: 'Refining margin expansion + Mozambique gas asset undervalued', fundamentalScore: 67, signal: 'HOLD', stars: 3 },
    { symbol: 'WIPRO', name: 'Wipro', exchange: 'NSE', price: 489.30, change: 0.56, reason: 'IT bellwether at 30% discount to TCS; buyback + margin improvement', fundamentalScore: 79, signal: 'BUY', stars: 4 },
    { symbol: 'MARUTI', name: 'Maruti Suzuki', exchange: 'NSE', price: 12740.00, change: 1.05, reason: 'India\'s auto market leader; EV transition cheaper than feared', fundamentalScore: 83, signal: 'BUY', stars: 5 },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SignalBadge({ signal }: { signal: 'BUY' | 'HOLD' | 'SELL' }) {
  const colors: Record<string, string> = {
    BUY:  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    HOLD: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    SELL: 'bg-red-500/20 text-red-400 border border-red-500/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold tracking-wide ${colors[signal]}`}>
      {signal}
    </span>
  );
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`text-sm ${s <= stars ? 'text-amber-400' : 'text-white/20'}`}>★</span>
      ))}
    </div>
  );
}

function FundamentalBar({ score }: { score: number }) {
  const color =
    score >= 80 ? 'bg-emerald-500' :
    score >= 60 ? 'bg-amber-500' :
    'bg-red-500';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-white/50">Fundamental Score</span>
        <span className="text-xs font-semibold text-white/80">{score}/100</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function StockCard({ stock, index }: { stock: PickStock; index: number }) {
  const isPositive = stock.change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="
        relative bg-white/5 border border-white/10 rounded-2xl p-5
        hover:bg-white/8 hover:border-emerald-500/30
        transition-all duration-300 group
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-white text-base">{stock.symbol}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/60 font-medium">
              {stock.exchange}
            </span>
          </div>
          <p className="text-white/50 text-xs">{stock.name}</p>
        </div>
        <SignalBadge signal={stock.signal} />
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-xl font-bold text-white">₹{stock.price.toLocaleString('en-IN')}</span>
        <span className={`text-sm font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {isPositive ? '+' : ''}{stock.change}%
        </span>
      </div>

      {/* Reason */}
      <p className="text-white/60 text-xs leading-relaxed mb-4 line-clamp-2">
        {stock.reason}
      </p>

      {/* Fundamental Bar */}
      <div className="mb-3">
        <FundamentalBar score={stock.fundamentalScore} />
      </div>

      {/* Stars */}
      <StarRating stars={stock.stars} />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BestPicks() {
  const [activeTab, setActiveTab] = useState<TabId>('penny');

  const stocks = PICKS[activeTab];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative" id="best-picks">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <span className="text-emerald-400 text-sm font-medium">📊 Live Market Data</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Best Stock Picks
          </h2>
          <p className="text-white/50 text-lg">
            Powered by Real-Time Market Intelligence
          </p>
        </motion.div>

        {/* Tab Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                transition-all duration-300 border
                ${activeTab === tab.id
                  ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20'
                }
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Stock Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {stocks.map((stock, idx) => (
              <StockCard key={stock.symbol} stock={stock} index={idx} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <button className="
            inline-flex items-center gap-2 px-8 py-3.5
            bg-gradient-to-r from-emerald-600 to-emerald-500
            text-white font-semibold rounded-full
            shadow-lg shadow-emerald-500/25
            hover:shadow-emerald-500/40 hover:scale-105
            transition-all duration-300
            text-sm
          ">
            View All 500+ Analyzed Stocks →
          </button>
          <p className="text-white/30 text-xs mt-3">
            Educational data only. Not investment advice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
