'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_STOCKS } from '@/lib/mockData';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CompareStock {
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  marketCap: string;
  peRatio: number;
  eps: number;
  roe: number;
  revenueGrowth: number;
  profitGrowth: number;
  debtEquity: number;
  dividendYield: number;
  fundamentalScore: number;
  growthScore: number;
  analystSignal: 'BUY' | 'HOLD' | 'SELL';
}

type MetricKey = keyof Omit<CompareStock, 'symbol' | 'name' | 'exchange' | 'analystSignal'>;

interface Metric {
  key: MetricKey | 'analystSignal';
  label: string;
  format: (v: number | string) => string;
  higherIsBetter?: boolean; // undefined = analystSignal special case
  unit?: string;
}

// ─── Stock Database for comparison ────────────────────────────────────────────

const COMPARE_DB: Record<string, CompareStock> = {
  RELIANCE: {
    symbol: 'RELIANCE', name: 'Reliance Industries', exchange: 'NSE',
    price: 2934.50, marketCap: '19.87L Cr', peRatio: 28.4, eps: 103.3,
    roe: 9.8, revenueGrowth: 10.2, profitGrowth: 17.6, debtEquity: 0.42,
    dividendYield: 0.34, fundamentalScore: 88, growthScore: 82, analystSignal: 'BUY',
  },
  TCS: {
    symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE',
    price: 3812.30, marketCap: '13.82L Cr', peRatio: 32.1, eps: 118.8,
    roe: 52.4, revenueGrowth: 8.4, profitGrowth: 9.1, debtEquity: 0.01,
    dividendYield: 1.24, fundamentalScore: 92, growthScore: 76, analystSignal: 'BUY',
  },
  HDFCBANK: {
    symbol: 'HDFCBANK', name: 'HDFC Bank', exchange: 'NSE',
    price: 1687.45, marketCap: '12.84L Cr', peRatio: 20.6, eps: 81.9,
    roe: 17.1, revenueGrowth: 22.1, profitGrowth: 20.3, debtEquity: 0.09,
    dividendYield: 1.18, fundamentalScore: 90, growthScore: 80, analystSignal: 'BUY',
  },
  INFY: {
    symbol: 'INFY', name: 'Infosys', exchange: 'NSE',
    price: 1524.60, marketCap: '6.34L Cr', peRatio: 25.8, eps: 59.1,
    roe: 31.8, revenueGrowth: 6.2, profitGrowth: 11.4, debtEquity: 0.03,
    dividendYield: 2.14, fundamentalScore: 87, growthScore: 72, analystSignal: 'BUY',
  },
  TATAMOTORS: {
    symbol: 'TATAMOTORS', name: 'Tata Motors', exchange: 'NSE',
    price: 948.70, marketCap: '3.52L Cr', peRatio: 12.1, eps: 78.4,
    roe: 18.9, revenueGrowth: 27.4, profitGrowth: 134.5, debtEquity: 1.24,
    dividendYield: 0.42, fundamentalScore: 78, growthScore: 86, analystSignal: 'BUY',
  },
  ITC: {
    symbol: 'ITC', name: 'ITC Limited', exchange: 'NSE',
    price: 452.15, marketCap: '5.65L Cr', peRatio: 27.3, eps: 16.6,
    roe: 26.8, revenueGrowth: 12.4, profitGrowth: 14.2, debtEquity: 0.02,
    dividendYield: 3.54, fundamentalScore: 80, growthScore: 70, analystSignal: 'BUY',
  },
  BAJFINANCE: {
    symbol: 'BAJFINANCE', name: 'Bajaj Finance', exchange: 'NSE',
    price: 7124.80, marketCap: '4.31L Cr', peRatio: 36.4, eps: 195.7,
    roe: 22.3, revenueGrowth: 31.2, profitGrowth: 22.8, debtEquity: 3.21,
    dividendYield: 0.49, fundamentalScore: 86, growthScore: 88, analystSignal: 'BUY',
  },
  SBIN: {
    symbol: 'SBIN', name: 'State Bank of India', exchange: 'NSE',
    price: 824.60, marketCap: '7.36L Cr', peRatio: 10.2, eps: 80.8,
    roe: 18.6, revenueGrowth: 16.4, profitGrowth: 61.1, debtEquity: 0.12,
    dividendYield: 1.94, fundamentalScore: 76, growthScore: 79, analystSignal: 'BUY',
  },
  WIPRO: {
    symbol: 'WIPRO', name: 'Wipro', exchange: 'NSE',
    price: 489.30, marketCap: '2.57L Cr', peRatio: 21.4, eps: 22.9,
    roe: 16.2, revenueGrowth: 4.1, profitGrowth: 6.8, debtEquity: 0.07,
    dividendYield: 0.41, fundamentalScore: 79, growthScore: 65, analystSignal: 'HOLD',
  },
  MARUTI: {
    symbol: 'MARUTI', name: 'Maruti Suzuki', exchange: 'NSE',
    price: 12740.00, marketCap: '3.86L Cr', peRatio: 29.5, eps: 431.8,
    roe: 18.4, revenueGrowth: 19.8, profitGrowth: 64.2, debtEquity: 0.00,
    dividendYield: 0.94, fundamentalScore: 83, growthScore: 78, analystSignal: 'BUY',
  },
};

const STOCK_OPTIONS = Object.keys(COMPARE_DB);

// ─── Metrics config ───────────────────────────────────────────────────────────

const METRICS: Metric[] = [
  { key: 'price',           label: 'Price',            format: (v) => `₹${Number(v).toLocaleString('en-IN')}`,      higherIsBetter: false },
  { key: 'marketCap',       label: 'Market Cap',       format: (v) => String(v),                                     higherIsBetter: true  },
  { key: 'peRatio',         label: 'PE Ratio',         format: (v) => `${v}x`,                                       higherIsBetter: false },
  { key: 'eps',             label: 'EPS',              format: (v) => `₹${v}`,                                       higherIsBetter: true  },
  { key: 'roe',             label: 'ROE %',            format: (v) => `${v}%`,                                       higherIsBetter: true  },
  { key: 'revenueGrowth',   label: 'Revenue Growth %', format: (v) => `${v}%`,                                       higherIsBetter: true  },
  { key: 'profitGrowth',    label: 'Profit Growth %',  format: (v) => `${v}%`,                                       higherIsBetter: true  },
  { key: 'debtEquity',      label: 'Debt/Equity',      format: (v) => `${v}x`,                                       higherIsBetter: false },
  { key: 'dividendYield',   label: 'Dividend Yield',   format: (v) => `${v}%`,                                       higherIsBetter: true  },
  { key: 'fundamentalScore',label: 'Fundamental Score',format: (v) => `${v}/100`,                                    higherIsBetter: true  },
  { key: 'growthScore',     label: 'Growth Score',     format: (v) => `${v}/100`,                                    higherIsBetter: true  },
  { key: 'analystSignal',   label: 'Analyst Signal',   format: (v) => String(v),                                     higherIsBetter: undefined },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getSignalRank(signal: string) {
  return signal === 'BUY' ? 3 : signal === 'HOLD' ? 2 : 1;
}

function isWinner(
  stocks: CompareStock[],
  stockIdx: number,
  metric: Metric,
): boolean {
  if (stocks.length < 2) return false;
  const key = metric.key as keyof CompareStock;

  const values = stocks.map((s) => {
    const raw = s[key];
    if (metric.key === 'analystSignal') return getSignalRank(String(raw));
    if (metric.key === 'marketCap') return 0; // skip marketCap comparison
    return Number(raw);
  });

  const best = metric.higherIsBetter !== false
    ? Math.max(...values)
    : Math.min(...values);

  const myVal = values[stockIdx];

  // For marketCap (string) skip highlight
  if (metric.key === 'marketCap') return false;

  // All tied → no highlight
  if (values.every((v) => v === values[0])) return false;

  return myVal === best;
}

function countWins(stocks: CompareStock[], stockIdx: number): number {
  return METRICS.reduce((acc, metric) => {
    if (metric.key === 'marketCap') return acc;
    return acc + (isWinner(stocks, stockIdx, metric) ? 1 : 0);
  }, 0);
}

function SignalBadge({ signal }: { signal: 'BUY' | 'HOLD' | 'SELL' }) {
  const map: Record<string, string> = {
    BUY:  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    HOLD: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    SELL: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${map[signal]}`}>
      {signal}
    </span>
  );
}

// ─── Stock Selector ───────────────────────────────────────────────────────────

function StockSelector({
  value,
  onChange,
  onRemove,
  canRemove,
  index,
}: {
  value: string;
  onChange: (sym: string) => void;
  onRemove: () => void;
  canRemove: boolean;
  index: number;
}) {
  const stock = COMPARE_DB[value];
  const colors = ['emerald', 'violet', 'sky', 'amber'];
  const color = colors[index % colors.length];

  const borderClass = {
    emerald: 'border-emerald-500/30',
    violet:  'border-violet-500/30',
    sky:     'border-sky-500/30',
    amber:   'border-amber-500/30',
  }[color];

  const bgClass = {
    emerald: 'bg-emerald-500/10',
    violet:  'bg-violet-500/10',
    sky:     'bg-sky-500/10',
    amber:   'bg-amber-500/10',
  }[color];

  return (
    <div className={`flex-1 min-w-[200px] bg-white/5 border ${borderClass} rounded-2xl p-4`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${bgClass} border ${borderClass} text-white/70`}>
          Stock {index + 1}
        </span>
        {canRemove && (
          <button
            onClick={onRemove}
            className="text-white/30 hover:text-red-400 transition-colors text-sm"
          >
            ✕ Remove
          </button>
        )}
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm
                   focus:outline-none focus:border-emerald-500/50 mb-3 appearance-none cursor-pointer"
      >
        {STOCK_OPTIONS.map((sym) => (
          <option key={sym} value={sym} className="bg-gray-900 text-white">
            {sym} — {COMPARE_DB[sym].name}
          </option>
        ))}
      </select>

      {stock && (
        <div>
          <p className="text-white font-bold text-base">{stock.symbol}</p>
          <p className="text-white/50 text-xs">{stock.name}</p>
          <p className="text-white/40 text-xs mt-0.5">{stock.exchange} · {stock.marketCap}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ComparisonTool() {
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>(['RELIANCE', 'TCS']);

  const stocks = selectedSymbols.map((sym) => COMPARE_DB[sym]).filter(Boolean);

  const winCounts = stocks.map((_, idx) => countWins(stocks, idx));
  const maxWins = Math.max(...winCounts);
  const overallWinnerIdx = winCounts.indexOf(maxWins);
  const winner = stocks[overallWinnerIdx];

  function handleChange(idx: number, sym: string) {
    setSelectedSymbols((prev) => {
      const next = [...prev];
      next[idx] = sym;
      return next;
    });
  }

  function addStock() {
    if (selectedSymbols.length >= 4) return;
    const unused = STOCK_OPTIONS.find((s) => !selectedSymbols.includes(s));
    if (unused) setSelectedSymbols((prev) => [...prev, unused]);
  }

  function removeStock(idx: number) {
    setSelectedSymbols((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative" id="comparison">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-violet-500/5 rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4">
            <span className="text-violet-400 text-sm font-medium">⚖️ Side-by-Side Analysis</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Compare Stocks Side by Side
          </h2>
          <p className="text-white/50 text-lg">
            Objective metrics to find the better investment candidate
          </p>
        </motion.div>

        {/* Selectors row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {selectedSymbols.map((sym, idx) => (
            <StockSelector
              key={idx}
              value={sym}
              index={idx}
              onChange={(s) => handleChange(idx, s)}
              onRemove={() => removeStock(idx)}
              canRemove={selectedSymbols.length > 2}
            />
          ))}

          {selectedSymbols.length < 4 && (
            <div className="flex items-center">
              <button
                onClick={addStock}
                className="
                  flex items-center gap-2 px-5 py-3 rounded-2xl
                  bg-white/5 border border-dashed border-white/20
                  text-white/50 hover:text-white hover:border-white/40
                  transition-all duration-300 text-sm font-medium
                "
              >
                <span className="text-xl">+</span>
                Add Stock
              </button>
            </div>
          )}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Column Headers */}
          <div
            className="grid border-b border-white/10 bg-white/5"
            style={{ gridTemplateColumns: `200px repeat(${stocks.length}, 1fr)` }}
          >
            <div className="p-4">
              <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">Metric</span>
            </div>
            {stocks.map((stock, idx) => (
              <div key={idx} className="p-4 text-center border-l border-white/10">
                <p className="text-white font-bold text-sm">{stock.symbol}</p>
                <p className="text-white/40 text-xs">{stock.name}</p>
              </div>
            ))}
          </div>

          {/* Metric Rows */}
          {METRICS.map((metric, mIdx) => (
            <div
              key={metric.key}
              className={`grid border-b border-white/5 ${mIdx % 2 === 0 ? '' : 'bg-white/[0.02]'}`}
              style={{ gridTemplateColumns: `200px repeat(${stocks.length}, 1fr)` }}
            >
              {/* Label */}
              <div className="p-4 flex items-center">
                <span className="text-white/60 text-sm">{metric.label}</span>
              </div>

              {/* Values */}
              {stocks.map((stock, sIdx) => {
                const rawVal = stock[metric.key as keyof CompareStock];
                const formatted = metric.format(rawVal as number | string);
                const winner = isWinner(stocks, sIdx, metric);

                return (
                  <div
                    key={sIdx}
                    className={`
                      p-4 text-center border-l border-white/10
                      flex items-center justify-center
                      transition-all duration-300
                      ${winner ? 'bg-emerald-500/10' : ''}
                    `}
                  >
                    {metric.key === 'analystSignal' ? (
                      <SignalBadge signal={rawVal as 'BUY' | 'HOLD' | 'SELL'} />
                    ) : (
                      <span className={`text-sm font-semibold ${winner ? 'text-emerald-400' : 'text-white/80'}`}>
                        {formatted}
                        {winner && <span className="ml-1 text-xs">✓</span>}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Wins Row */}
          <div
            className="grid bg-white/5"
            style={{ gridTemplateColumns: `200px repeat(${stocks.length}, 1fr)` }}
          >
            <div className="p-4 flex items-center">
              <span className="text-white/80 text-sm font-semibold">Metrics Won</span>
            </div>
            {stocks.map((stock, sIdx) => (
              <div key={sIdx} className="p-4 text-center border-l border-white/10">
                <span className={`text-lg font-black ${sIdx === overallWinnerIdx ? 'text-emerald-400' : 'text-white/50'}`}>
                  {winCounts[sIdx]}
                </span>
                <span className="text-white/30 text-xs"> / {METRICS.length - 1}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Overall Winner Banner */}
        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-2xl">
                  🏆
                </div>
                <div>
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Overall Winner</p>
                  <p className="text-white font-black text-xl">{winner.symbol}</p>
                  <p className="text-white/50 text-sm">{winner.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-emerald-400 text-2xl font-black">{maxWins}</p>
                <p className="text-white/50 text-xs">metrics won</p>
                <p className="text-white/30 text-xs mt-0.5">out of {METRICS.length - 1} compared</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-white/30 text-xs text-center mt-4">
          Educational comparison only. Past performance does not guarantee future results.
        </p>
      </div>
    </section>
  );
}
