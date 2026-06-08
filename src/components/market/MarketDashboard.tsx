'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, Activity, Wifi } from 'lucide-react';
import { MOCK_STOCKS, simulateStockUpdate } from '@/lib/mockData';
import { Stock, StockCategory } from '@/lib/types';
import SparklineChart from './SparklineChart';

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

type CategoryFilter = 'all' | StockCategory;

const CATEGORY_LABELS: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'penny', label: 'Penny' },
  { key: 'bluechip', label: 'Blue-Chip' },
  { key: 'dividend', label: 'Dividend' },
  { key: 'growth', label: 'Growth' },
  { key: 'undervalued', label: 'Undervalued' },
  { key: 'longterm', label: 'Long-Term' },
];

const SIGNAL_STYLES: Record<Stock['signal'], string> = {
  BUY: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
  HOLD: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
  SELL: 'bg-rose-500/20 text-rose-400 border border-rose-500/40',
};

const MARKET_STATS = [
  { label: 'Nifty 50', value: '24,127.50', change: '+128.40', pct: '+0.53%', positive: true },
  { label: 'Sensex', value: '79,486.32', change: '+412.80', pct: '+0.52%', positive: true },
  { label: 'USD/INR', value: '₹83.42', change: '-0.18', pct: '-0.22%', positive: false },
  { label: 'Gold', value: '₹72,150', change: '+340', pct: '+0.47%', positive: true },
];

// ---------------------------------------------------------------------------
// Helper: flash colours on price change
// ---------------------------------------------------------------------------
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// ---------------------------------------------------------------------------
// Sub-component: Stock Table Row
// ---------------------------------------------------------------------------
interface RowProps {
  stock: Stock;
  rank: number;
}

const StockRow: React.FC<RowProps> = ({ stock, rank }) => {
  const prevPrice = usePrevious(stock.price);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (prevPrice === undefined) return;
    if (stock.price > prevPrice) {
      setFlash('up');
    } else if (stock.price < prevPrice) {
      setFlash('down');
    }
    const timer = setTimeout(() => setFlash(null), 700);
    return () => clearTimeout(timer);
  }, [stock.price, prevPrice]);

  const isPositive = stock.changePct >= 0;

  const flashClass =
    flash === 'up'
      ? 'bg-emerald-500/10'
      : flash === 'down'
      ? 'bg-rose-500/10'
      : '';

  const priceFlashClass =
    flash === 'up'
      ? 'text-emerald-400'
      : flash === 'down'
      ? 'text-rose-400'
      : 'text-white';

  return (
    <tr
      className={`border-b border-white/5 transition-all duration-500 hover:bg-white/5 cursor-pointer group ${flashClass} animate-fadeIn`}
    >
      {/* Rank */}
      <td className="px-4 py-3 text-center text-xs text-white/40 w-8">{rank}</td>

      {/* Company */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {stock.symbol.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate max-w-[140px]">
              {stock.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs text-white/50">{stock.symbol}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">
                {stock.exchange}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-3">
        <span
          className={`font-mono text-sm font-semibold transition-colors duration-300 ${priceFlashClass}`}
        >
          ₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </td>

      {/* Change */}
      <td className="px-4 py-3">
        <div
          className={`flex flex-col ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}
        >
          <span className="text-xs font-semibold">
            {isPositive ? '+' : ''}
            {stock.change.toFixed(2)}
          </span>
          <span className="text-[11px] font-medium">
            {isPositive ? '+' : ''}
            {stock.changePct.toFixed(2)}%
          </span>
        </div>
      </td>

      {/* Sparkline */}
      <td className="px-4 py-3 hidden md:table-cell">
        <SparklineChart
          data={stock.sparkline}
          color={isPositive ? '#10b981' : '#f43f5e'}
          width={80}
          height={32}
        />
      </td>

      {/* Volume */}
      <td className="px-4 py-3 hidden lg:table-cell">
        <span className="text-xs text-white/70 font-mono">{stock.volume}</span>
      </td>

      {/* Market Cap */}
      <td className="px-4 py-3 hidden lg:table-cell">
        <span className="text-xs text-white/70">{stock.marketCap}</span>
      </td>

      {/* PE */}
      <td className="px-4 py-3 hidden xl:table-cell">
        <span className="text-xs font-mono text-white/80">{stock.pe.toFixed(1)}</span>
      </td>

      {/* Fundamental Score */}
      <td className="px-4 py-3 hidden xl:table-cell">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden max-w-[48px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${stock.fundamentalScore}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-white/80 w-6 text-right">
            {stock.fundamentalScore}
          </span>
        </div>
      </td>

      {/* Growth Score */}
      <td className="px-4 py-3 hidden 2xl:table-cell">
        <span
          className={`text-xs font-semibold ${
            stock.growthScore >= 80
              ? 'text-emerald-400'
              : stock.growthScore >= 60
              ? 'text-amber-400'
              : 'text-rose-400'
          }`}
        >
          {stock.growthScore}
        </span>
      </td>

      {/* Signal */}
      <td className="px-4 py-3">
        <span
          className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-md ${SIGNAL_STYLES[stock.signal]}`}
        >
          {stock.signal}
        </span>
      </td>
    </tr>
  );
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const MarketDashboard: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>(MOCK_STOCKS);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLive, setIsLive] = useState(true);

  // Auto-update prices every 3 seconds
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setStocks((prev) => simulateStockUpdate(prev));
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  // Filter logic
  const filteredStocks = useCallback(() => {
    let result = stocks;

    if (activeCategory !== 'all') {
      result = result.filter((s) => s.category.includes(activeCategory as StockCategory));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.symbol.toLowerCase().includes(q) ||
          s.sector.toLowerCase().includes(q)
      );
    }

    return result;
  }, [stocks, activeCategory, searchQuery]);

  const displayedStocks = filteredStocks();

  return (
    <motion.section
      id="market"
      className="py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="max-w-screen-2xl mx-auto">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Live Market Dashboard
              </h2>
              {/* LIVE badge */}
              <div className="flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                LIVE
              </div>
            </div>
            <p className="text-white/50 text-base max-w-lg">
              Real-time price tracking for NSE & BSE stocks — updated every 3 seconds with
              fundamental signals.
            </p>
          </div>

          {/* Live toggle */}
          <button
            onClick={() => setIsLive((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 ${
              isLive
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30'
                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
            }`}
          >
            {isLive ? (
              <>
                <Wifi className="w-4 h-4" />
                Live On
              </>
            ) : (
              <>
                <Activity className="w-4 h-4" />
                Paused
              </>
            )}
          </button>
        </div>

        {/* ── Controls Row: Filters + Search ── */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Category pill filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORY_LABELS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === key
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {label}
                {activeCategory === key && (
                  <motion.span
                    layoutId="active-category-pill"
                    className="absolute inset-0 rounded-full bg-blue-600 -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative lg:ml-auto lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search stocks, symbols..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 backdrop-blur border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* ── Stock Table ── */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="px-4 py-3 text-center text-[11px] font-semibold text-white/40 uppercase tracking-widest w-8">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                    Change
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-white/40 uppercase tracking-widest hidden md:table-cell">
                    Chart
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-white/40 uppercase tracking-widest hidden lg:table-cell">
                    Volume
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-white/40 uppercase tracking-widest hidden lg:table-cell">
                    Mkt Cap
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-white/40 uppercase tracking-widest hidden xl:table-cell">
                    PE
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-white/40 uppercase tracking-widest hidden xl:table-cell">
                    Fund. Score
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-white/40 uppercase tracking-widest hidden 2xl:table-cell">
                    Growth
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-white/40 uppercase tracking-widest">
                    Signal
                  </th>
                </tr>
              </thead>
              <tbody>
                  {displayedStocks.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-4 py-16 text-center">
                        <div className="flex flex-col items-center gap-3 text-white/30">
                          <Search className="w-8 h-8" />
                          <p className="text-sm">No stocks match your search.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    displayedStocks.map((stock, idx) => (
                      <StockRow key={stock.id} stock={stock} rank={idx + 1} />
                    ))
                  )}
              </tbody>
            </table>

            {/* AnimatePresence wraps motion.tr but we need proper table rows, so using a workaround below */}
          </div>

          {/* Row count footer */}
          <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-white/30">
              Showing {displayedStocks.length} of {stocks.length} stocks
            </span>
            <span className="text-xs text-white/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Auto-refreshing every 3s
            </span>
          </div>
        </div>

        {/* ── Market Stats Row ── */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MARKET_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:border-white/20 transition-colors duration-200"
            >
              <p className="text-xs text-white/40 font-medium mb-1">{stat.label}</p>
              <p className="text-base font-bold text-white font-mono">{stat.value}</p>
              <div
                className={`flex items-center gap-1 mt-1 ${
                  stat.positive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {stat.positive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-xs font-semibold">
                  {stat.change} ({stat.pct})
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default MarketDashboard;
