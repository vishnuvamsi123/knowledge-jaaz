'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, TrendingDown, Zap, Info } from 'lucide-react';
import { MOCK_STOCKS } from '@/lib/mockData';
import { Stock } from '@/lib/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type RiskLevel = 'LOW' | 'MED' | 'HIGH';

interface PennyStockDisplay extends Stock {
  riskLevel: RiskLevel;
  hasVolumeSurge: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const RISK_THRESHOLDS = {
  fundamentalScoreHigh: 70,  // above this = LOW risk
  fundamentalScoreMid: 50,   // above this = MED risk, below = HIGH
};

const VOLUME_SURGE_THRESHOLD_M = 15; // million shares – considered a surge

const RISK_STYLES: Record<RiskLevel, { badge: string; bar: string; label: string }> = {
  LOW: {
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    bar: 'bg-emerald-500',
    label: 'Low Risk',
  },
  MED: {
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    bar: 'bg-amber-500',
    label: 'Medium Risk',
  },
  HIGH: {
    badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    bar: 'bg-rose-500',
    label: 'High Risk',
  },
};

const SIGNAL_STYLES: Record<Stock['signal'], string> = {
  BUY: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
  HOLD: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
  SELL: 'bg-rose-500/20 text-rose-400 border border-rose-500/40',
};

const EDU_FACTS = [
  'Penny stocks are generally priced under ₹100 (or sometimes ₹10) with low market caps.',
  'They often have very high trading volumes, making them attractive to speculators.',
  'Penny stocks are susceptible to "pump-and-dump" schemes — be very careful.',
  'Due diligence is even more critical for penny stocks. Check promoter holding, debt, and cash flows.',
  'Never invest more than 2-5% of your portfolio in any single penny stock.',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseVolumeMillion(volumeStr: string): number {
  const num = parseFloat(volumeStr.replace('M', '').replace('K', ''));
  return volumeStr.includes('K') ? num / 1000 : num;
}

function getRiskLevel(stock: Stock): RiskLevel {
  if (stock.fundamentalScore >= RISK_THRESHOLDS.fundamentalScoreHigh) return 'LOW';
  if (stock.fundamentalScore >= RISK_THRESHOLDS.fundamentalScoreMid) return 'MED';
  return 'HIGH';
}

function getRiskBarWidth(level: RiskLevel): number {
  return level === 'LOW' ? 33 : level === 'MED' ? 66 : 100;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const RiskMeter: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const style = RISK_STYLES[level];
  const width = getRiskBarWidth(level);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-white/40 font-medium">Risk Level</span>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${style.badge}`}>
          {style.label}
        </span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${style.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ boxShadow: `0 0 8px ${style.bar}60` }}
        />
      </div>
    </div>
  );
};

interface PennyCardProps {
  stock: PennyStockDisplay;
  index: number;
}

const PennyStockCard: React.FC<PennyCardProps> = ({ stock, index }) => {
  const isPositive = stock.changePct >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      {/* Volume surge badge */}
      {stock.hasVolumeSurge && (
        <div className="absolute top-3 right-3 z-10">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="flex items-center gap-1 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[10px] font-bold px-2 py-1 rounded-full"
          >
            <Zap className="w-3 h-3" />
            Volume Surge!
          </motion.div>
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 pr-28">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-base font-bold text-white">{stock.symbol}</p>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">
                {stock.exchange}
              </span>
            </div>
            <p className="text-xs text-white/40">{stock.name}</p>
            <p className="text-[11px] text-white/30 mt-0.5">{stock.sector}</p>
          </div>
        </div>

        {/* Price + Change row */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-2xl font-black text-white font-mono">
              ₹{stock.price.toFixed(2)}
            </p>
            <div
              className={`flex items-center gap-1 mt-0.5 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}
            >
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span className="text-sm font-semibold">
                {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePct.toFixed(2)}%)
              </span>
            </div>
          </div>

          {/* Signal */}
          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-lg ${SIGNAL_STYLES[stock.signal]}`}
          >
            {stock.signal}
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <p className="text-[10px] text-white/40 mb-0.5">Volume</p>
            <p className="text-sm font-bold text-white font-mono">{stock.volume}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <p className="text-[10px] text-white/40 mb-0.5">Fund. Score</p>
            <p
              className={`text-sm font-bold ${
                stock.fundamentalScore >= 70
                  ? 'text-emerald-400'
                  : stock.fundamentalScore >= 50
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}
            >
              {stock.fundamentalScore}/100
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <p className="text-[10px] text-white/40 mb-0.5">Mkt Cap</p>
            <p className="text-xs font-bold text-white">{stock.marketCap}</p>
          </div>
        </div>

        {/* Risk Meter */}
        <RiskMeter level={stock.riskLevel} />
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Educational Box
// ---------------------------------------------------------------------------

const WhatArePennyStocks: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="mt-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm p-6"
  >
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
        <Info className="w-5 h-5 text-blue-400" />
      </div>
      <div>
        <h4 className="text-base font-bold text-white mb-0.5">What are Penny Stocks?</h4>
        <p className="text-xs text-white/40">Educational overview for Indian investors</p>
      </div>
    </div>

    <p className="text-sm text-white/60 leading-relaxed mb-4">
      Penny stocks are shares of small companies that trade at relatively low prices (typically under
      ₹100). In India, these stocks are usually listed on the NSE or BSE with very small market
      capitalizations. While they can occasionally deliver massive returns (multi-baggers), they
      carry proportionally high risk.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {EDU_FACTS.map((fact, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
          <p className="text-xs text-white/50 leading-relaxed">{fact}</p>
        </div>
      ))}
    </div>

    <div className="mt-4 pt-4 border-t border-white/10">
      <div className="flex flex-wrap gap-2">
        <span className="text-[11px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-medium">
          ✅ Potential: Multi-bagger returns
        </span>
        <span className="text-[11px] bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2.5 py-1 rounded-full font-medium">
          ❌ Risk: Price manipulation, low liquidity
        </span>
        <span className="text-[11px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full font-medium">
          ⚠️ Rule: Never invest more than you can lose
        </span>
      </div>
    </div>
  </motion.div>
);

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const PennyStockSection: React.FC = () => {
  // Filter penny stocks: either in 'penny' category or price < 100
  const pennyStocks: PennyStockDisplay[] = useMemo(() => {
    return MOCK_STOCKS.filter(
      (s) => s.category.includes('penny') || s.price < 100
    )
      .slice(0, 6)
      .map((s) => {
        const volMillion = parseVolumeMillion(s.volume);
        return {
          ...s,
          riskLevel: getRiskLevel(s),
          hasVolumeSurge: volMillion >= VOLUME_SURGE_THRESHOLD_M,
        };
      });
  }, []);

  const surgeCount = pennyStocks.filter((s) => s.hasVolumeSurge).length;

  return (
    <motion.section
      id="penny-stocks"
      className="py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* ── Risk Warning Banner ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-3 bg-gradient-to-r from-orange-500/15 via-red-500/10 to-orange-500/15 border border-orange-500/40 rounded-2xl p-4 mb-10"
        >
          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="flex-shrink-0 mt-0.5"
          >
            <AlertTriangle className="w-6 h-6 text-orange-400" />
          </motion.div>
          <div>
            <p className="text-orange-400 font-bold text-sm mb-1">
              HIGH RISK ⚠️ — Penny stocks are highly volatile and speculative.
            </p>
            <p className="text-orange-300/70 text-xs leading-relaxed">
              Only invest what you can afford to lose <strong>completely</strong>. Penny stocks can
              lose 50-90% of their value rapidly and may be subject to market manipulation, pump-and-dump
              schemes, and extremely low liquidity. This section is for <strong>educational purposes only</strong> and
              does not constitute investment advice. Always consult a SEBI-registered financial advisor.
            </p>
          </div>
        </motion.div>

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-2">
              Penny Stock Tracker
            </h2>
            <p className="text-white/50 text-base max-w-lg">
              Track high-risk, high-reward penny stocks with fundamental scores and volume surge
              alerts. Educational use only.
            </p>
          </div>

          {/* Stats badges */}
          <div className="flex gap-3 flex-wrap">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-center">
              <p className="text-xl font-black text-white">{pennyStocks.length}</p>
              <p className="text-[11px] text-white/40">Tracked</p>
            </div>
            {surgeCount > 0 && (
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-2.5 text-center">
                <p className="text-xl font-black text-orange-400">{surgeCount}</p>
                <p className="text-[11px] text-orange-400/70">Volume Surges</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Penny Stock Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {pennyStocks.map((stock, idx) => (
            <PennyStockCard key={stock.id} stock={stock} index={idx} />
          ))}
        </div>

        {/* ── Educational Box ── */}
        <WhatArePennyStocks />

        {/* ── Final Disclaimer ── */}
        <p className="text-center text-xs text-white/20 mt-6 max-w-2xl mx-auto">
          Data shown is simulated for educational purposes. Knowledge Jaaz does not endorse or
          recommend penny stock investments. Past performance is not indicative of future results.
        </p>
      </div>
    </motion.section>
  );
};

export default PennyStockSection;
