'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, CheckCircle, AlertTriangle, XCircle, BarChart2 } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MetricCard {
  label: string;
  value: string;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  description: string;
}

type SignalType = 'BUY' | 'HOLD' | 'SELL';
type Verdict = 'STRONG' | 'MODERATE' | 'WEAK';

interface StockAnalysis {
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE';
  sector: string;
  price: number;
  fundamentalScore: number;
  metrics: MetricCard[];
  verdict: Verdict;
  verdictText: string;
  signal: SignalType;
  intrinsicValue: number;
  signalReason: string;
}

// ---------------------------------------------------------------------------
// Full Analysis Data
// ---------------------------------------------------------------------------

const ANALYSES: Record<string, StockAnalysis> = {
  RELIANCE: {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    exchange: 'NSE',
    sector: 'Energy & Retail',
    price: 2847.5,
    fundamentalScore: 88,
    metrics: [
      { label: 'Revenue Growth', value: '8.4', unit: '%', trend: 'up', description: 'YoY revenue expansion driven by Jio & Retail segments' },
      { label: 'Profit Growth', value: '12.1', unit: '%', trend: 'up', description: 'Net profit growth led by retail and digital services' },
      { label: 'ROE', value: '11.2', unit: '%', trend: 'up', description: 'Return on Equity; decent for a large conglomerate' },
      { label: 'Debt / Equity', value: '0.35', trend: 'neutral', description: 'Healthy debt levels; declining trend over last 3 years' },
      { label: 'PE Ratio', value: '28.4', trend: 'neutral', description: 'Fairly valued vs sector average of 26; not expensive' },
      { label: 'Dividend Yield', value: '0.37', unit: '%', trend: 'down', description: 'Low yield; company reinvests profits for growth' },
    ],
    verdict: 'STRONG',
    verdictText:
      'Reliance Industries is fundamentally strong with consistent revenue and profit growth across multiple business segments. The diversified business model (Jio, Retail, O&G, Green Energy) provides resilience. Debt levels are manageable and declining. Suitable for long-term wealth creation.',
    signal: 'BUY',
    intrinsicValue: 3100,
    signalReason: 'Trading at ~8% discount to intrinsic value of ₹3,100. Strong growth catalysts across segments. Accumulate on dips.',
  },
  TCS: {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    exchange: 'NSE',
    sector: 'IT & Technology',
    price: 3524.15,
    fundamentalScore: 95,
    metrics: [
      { label: 'Revenue Growth', value: '6.8', unit: '%', trend: 'up', description: 'Steady growth despite global IT spending slowdown' },
      { label: 'Profit Growth', value: '9.3', unit: '%', trend: 'up', description: 'Consistent profit growth with strong margin management' },
      { label: 'ROE', value: '47.2', unit: '%', trend: 'up', description: 'Exceptional ROE — one of the best in Indian IT' },
      { label: 'Debt / Equity', value: '0.02', trend: 'neutral', description: 'Virtually debt-free; very clean balance sheet' },
      { label: 'PE Ratio', value: '27.8', trend: 'neutral', description: 'Fairly priced for a blue-chip IT giant' },
      { label: 'Dividend Yield', value: '1.8', unit: '%', trend: 'up', description: 'Consistent dividend payer with special dividends history' },
    ],
    verdict: 'STRONG',
    verdictText:
      'TCS is one of the fundamentally strongest companies in India. Near-zero debt, exceptional ROE of 47%, consistent cash flows, and industry-leading margins. Priced fairly at current levels. Core holding for any long-term portfolio.',
    signal: 'HOLD',
    intrinsicValue: 3800,
    signalReason: 'Fundamentally excellent but priced near fair value. Hold existing positions; wait for a 10-15% correction before adding more.',
  },
  TATAMOTORS: {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd',
    exchange: 'NSE',
    sector: 'Automobile',
    price: 782.3,
    fundamentalScore: 79,
    metrics: [
      { label: 'Revenue Growth', value: '24.6', unit: '%', trend: 'up', description: 'Strong revenue growth driven by JLR recovery and EV sales' },
      { label: 'Profit Growth', value: '38.2', unit: '%', trend: 'up', description: 'Explosive profit growth from near-zero base; impressive turnaround' },
      { label: 'ROE', value: '22.4', unit: '%', trend: 'up', description: 'ROE recovering strongly after years of losses' },
      { label: 'Debt / Equity', value: '1.8', trend: 'down', description: 'Debt elevated but being paid down aggressively' },
      { label: 'PE Ratio', value: '8.4', trend: 'neutral', description: 'Very low PE — potentially deeply undervalued for growth story' },
      { label: 'Dividend Yield', value: '0.5', unit: '%', trend: 'neutral', description: 'Low dividend; company prioritizes debt repayment' },
    ],
    verdict: 'MODERATE',
    verdictText:
      'Tata Motors shows strong growth metrics but carries significant debt. The EV and JLR recovery story is compelling. PE of 8.4 suggests deep undervaluation if growth continues. Higher risk than blue-chips but strong upside potential for 3-5 year horizon.',
    signal: 'BUY',
    intrinsicValue: 1100,
    signalReason: 'Significantly undervalued vs intrinsic value of ₹1,100. EV market share of 70%+ and JLR profitability make this a multibagger candidate.',
  },
  HDFCBANK: {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    exchange: 'NSE',
    sector: 'Banking & Finance',
    price: 1673.8,
    fundamentalScore: 92,
    metrics: [
      { label: 'Revenue Growth', value: '15.2', unit: '%', trend: 'up', description: 'Net Interest Income growing strongly post-merger' },
      { label: 'Profit Growth', value: '18.7', unit: '%', trend: 'up', description: 'Net profit growth accelerating; merger synergies realizing' },
      { label: 'ROE', value: '16.8', unit: '%', trend: 'up', description: 'Best-in-class ROE among Indian private banks' },
      { label: 'Debt / Equity', value: '8.1', trend: 'neutral', description: 'High for a bank but normal; CASA ratio best in class' },
      { label: 'PE Ratio', value: '18.2', trend: 'neutral', description: 'Reasonable valuation for India\'s largest private bank' },
      { label: 'Dividend Yield', value: '1.2', unit: '%', trend: 'up', description: 'Steady dividend growth track record maintained' },
    ],
    verdict: 'STRONG',
    verdictText:
      'HDFC Bank remains India\'s premier private sector bank with best-in-class asset quality, CASA ratio, and management quality. Post-merger integration is progressing well. A cornerstone holding for any long-term Indian equity portfolio.',
    signal: 'BUY',
    intrinsicValue: 1950,
    signalReason: 'Trading at 14% discount to intrinsic value. Post-merger dip creates an attractive entry. Strong fundamentals support continued wealth creation.',
  },
  SUZLON: {
    symbol: 'SUZLON',
    name: 'Suzlon Energy Ltd',
    exchange: 'NSE',
    sector: 'Renewable Energy',
    price: 42.85,
    fundamentalScore: 68,
    metrics: [
      { label: 'Revenue Growth', value: '32.1', unit: '%', trend: 'up', description: 'Order book at all-time high; revenue growth accelerating' },
      { label: 'Profit Growth', value: '88.4', unit: '%', trend: 'up', description: 'Explosive profit growth from very low base; debt-free now' },
      { label: 'ROE', value: '24.8', unit: '%', trend: 'up', description: 'ROE improving rapidly post debt restructuring' },
      { label: 'Debt / Equity', value: '0.42', trend: 'down', description: 'Remarkable transformation from heavily indebted to near debt-free' },
      { label: 'PE Ratio', value: '38.4', trend: 'up', description: 'Premium valuation for a high-growth green energy play' },
      { label: 'Dividend Yield', value: '0', unit: '%', trend: 'neutral', description: 'No dividend; reinvesting in growth capacity' },
    ],
    verdict: 'MODERATE',
    verdictText:
      'Suzlon\'s remarkable turnaround story is real — from near-bankrupt to debt-free, with record order books. Growth metrics are exceptional. However, the stock now commands a premium. High risk/high reward for investors with 3+ year horizon who can stomach volatility.',
    signal: 'BUY',
    intrinsicValue: 65,
    signalReason: 'Intrinsic value estimated at ₹65. Green energy mega-trend and debt-free status are strong tailwinds. Buy in tranches; it\'s a penny stock with high volatility.',
  },
  ITC: {
    symbol: 'ITC',
    name: 'ITC Limited',
    exchange: 'NSE',
    sector: 'FMCG & Tobacco',
    price: 428.9,
    fundamentalScore: 88,
    metrics: [
      { label: 'Revenue Growth', value: '5.8', unit: '%', trend: 'up', description: 'Steady growth across FMCG, hotels, and agri businesses' },
      { label: 'Profit Growth', value: '8.4', unit: '%', trend: 'up', description: 'Consistent profit growth with expanding non-tobacco contribution' },
      { label: 'ROE', value: '28.4', unit: '%', trend: 'up', description: 'Excellent ROE; one of the highest cash-generating businesses in India' },
      { label: 'Debt / Equity', value: '0.01', trend: 'neutral', description: 'Virtually debt-free; huge cash reserves on balance sheet' },
      { label: 'PE Ratio', value: '27.2', trend: 'neutral', description: 'Reasonable valuation; FMCG sector peers trade at 40-60x' },
      { label: 'Dividend Yield', value: '3.4', unit: '%', trend: 'up', description: 'High dividend yield — excellent for income investors' },
    ],
    verdict: 'STRONG',
    verdictText:
      'ITC is fundamentally one of the strongest FMCG companies in India. Near-zero debt, exceptional cash generation, 3.4% dividend yield, and FMCG business growing well. Undervalued compared to peers. Excellent for conservative investors seeking income + growth.',
    signal: 'BUY',
    intrinsicValue: 520,
    signalReason: 'Trading at 17% discount to intrinsic value of ₹520. High dividend yield provides downside protection. Hotels business demerger is a potential catalyst.',
  },
};

const DEFAULT_SYMBOL = 'RELIANCE';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SIGNAL_STYLES: Record<SignalType, { bg: string; text: string; icon: string }> = {
  BUY: { bg: 'from-emerald-600 to-teal-600', text: 'text-emerald-400', icon: '📈' },
  HOLD: { bg: 'from-amber-600 to-orange-600', text: 'text-amber-400', icon: '⏸️' },
  SELL: { bg: 'from-rose-600 to-red-600', text: 'text-rose-400', icon: '📉' },
};

const VERDICT_CONFIG: Record<
  Verdict,
  { icon: React.ReactNode; bg: string; border: string; label: string }
> = {
  STRONG: {
    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    label: '✅ FUNDAMENTALLY STRONG',
  },
  MODERATE: {
    icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    label: '⚠️ MODERATELY STRONG',
  },
  WEAK: {
    icon: <XCircle className="w-5 h-5 text-rose-400" />,
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    label: '🔴 FUNDAMENTALLY WEAK',
  },
};

const TREND_ICON: Record<string, React.ReactNode> = {
  up: <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />,
  down: <TrendingDown className="w-3.5 h-3.5 text-rose-400" />,
  neutral: <BarChart2 className="w-3.5 h-3.5 text-white/40" />,
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface GaugeProp {
  score: number;
}

const FundamentalGauge: React.FC<GaugeProp> = ({ score }) => {
  const radius = 52;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const dashoffset = circumference - (score / 100) * circumference;

  const color =
    score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#f43f5e';

  const label =
    score >= 80 ? 'Strong' : score >= 60 ? 'Moderate' : 'Weak';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg width="128" height="128" viewBox="0 0 128 128">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r={normalizedRadius}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={stroke}
          />
          {/* Progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r={normalizedRadius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            transform="rotate(-90 64 64)"
            style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>
        {/* Score text in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-black text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            {score}
          </motion.span>
          <span className="text-[10px] text-white/40 font-medium">/100</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-bold" style={{ color }}>
        {label}
      </p>
      <p className="text-xs text-white/40 mt-0.5">Fundamental Score</p>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const FundamentalAnalyzer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState<StockAnalysis>(ANALYSES[DEFAULT_SYMBOL]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleAnalyze = () => {
    const sym = query.trim().toUpperCase();
    if (!sym) return;

    setLoading(true);
    setNotFound(false);

    // Simulate async analysis
    setTimeout(() => {
      const found = ANALYSES[sym];
      if (found) {
        setAnalysis(found);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAnalyze();
  };

  const sigStyle = SIGNAL_STYLES[analysis.signal];
  const verdictCfg = VERDICT_CONFIG[analysis.verdict];
  const discount = analysis.intrinsicValue - analysis.price;
  const discountPct = ((discount / analysis.intrinsicValue) * 100).toFixed(1);
  const priceBarWidth = Math.min(100, (analysis.price / analysis.intrinsicValue) * 100);

  return (
    <motion.section
      id="analyzer"
      className="py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* ── Section Header ── */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <BarChart2 className="w-3.5 h-3.5" />
            AI-POWERED ANALYSIS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            Fundamental Stock Analyzer
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Enter any NSE/BSE stock symbol and get instant fundamental analysis — revenue growth, PE,
            ROE, intrinsic value, and a plain-English verdict.
          </p>
        </div>

        {/* ── Search Bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter company name or symbol... e.g. RELIANCE, TCS, ITC"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 transition-all backdrop-blur"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-600/30 whitespace-nowrap"
          >
            {loading ? (
              <>
                <motion.span
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                />
                Analyzing...
              </>
            ) : (
              <>
                <BarChart2 className="w-4 h-4" />
                Analyze
              </>
            )}
          </button>
        </div>

        {/* Quick pick chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.keys(ANALYSES).map((sym) => (
            <button
              key={sym}
              onClick={() => {
                setQuery(sym);
                setAnalysis(ANALYSES[sym]);
                setNotFound(false);
              }}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 ${
                analysis.symbol === sym
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white'
              }`}
            >
              {sym}
            </button>
          ))}
        </div>

        {/* Not found error */}
        <AnimatePresence>
          {notFound && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-sm text-center"
            >
              ⚠️ Stock not found in our database. Try: RELIANCE, TCS, TATAMOTORS, HDFCBANK, SUZLON, or ITC
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Analysis Output ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={analysis.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden"
          >
            {/* ── Top Banner ── */}
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h3 className="text-xl font-extrabold text-white">{analysis.name}</h3>
                  <span className="text-xs font-bold px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-md">
                    {analysis.exchange}
                  </span>
                </div>
                <p className="text-sm text-white/40">
                  {analysis.sector} · ₹{analysis.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>

              {/* Signal Badge */}
              <div
                className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r ${sigStyle.bg} shadow-lg`}
              >
                <span className="text-2xl">{sigStyle.icon}</span>
                <div>
                  <p className="text-xs text-white/60 font-medium">Recommendation</p>
                  <p className="text-2xl font-black text-white leading-tight">{analysis.signal}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col xl:flex-row gap-8">
                {/* Left: Gauge */}
                <div className="flex flex-col items-center xl:items-start gap-6 xl:w-48 flex-shrink-0">
                  <FundamentalGauge score={analysis.fundamentalScore} />

                  {/* Intrinsic Value Bar */}
                  <div className="w-full">
                    <div className="flex justify-between text-xs text-white/50 mb-2">
                      <span>Current</span>
                      <span>Intrinsic</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
                      <motion.div
                        className={`h-full rounded-full ${
                          analysis.price < analysis.intrinsicValue
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : 'bg-gradient-to-r from-amber-500 to-orange-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${priceBarWidth}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1.5">
                      <span className="text-white font-semibold">
                        ₹{analysis.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-white/50">
                        ₹{analysis.intrinsicValue.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] mt-1.5 font-semibold ${
                        discount > 0 ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {discount > 0 ? `${discountPct}% below intrinsic value` : 'Trading above intrinsic value'}
                    </p>
                  </div>
                </div>

                {/* Right: Metrics + Verdict */}
                <div className="flex-1 min-w-0">
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {analysis.metrics.map((metric) => (
                      <motion.div
                        key={metric.label}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="bg-white/[0.05] border border-white/10 rounded-xl p-3.5 hover:border-white/20 transition-colors"
                        title={metric.description}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[11px] text-white/40 font-medium uppercase tracking-wide">
                            {metric.label}
                          </p>
                          {metric.trend && TREND_ICON[metric.trend]}
                        </div>
                        <p className="text-xl font-black text-white leading-none">
                          {metric.value}
                          {metric.unit && (
                            <span className="text-sm font-semibold text-white/50 ml-0.5">
                              {metric.unit}
                            </span>
                          )}
                        </p>
                        <p className="text-[10px] text-white/30 mt-1.5 leading-snug line-clamp-2">
                          {metric.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* AI Verdict Box */}
                  <div
                    className={`rounded-xl border ${verdictCfg.border} ${verdictCfg.bg} p-4`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {verdictCfg.icon}
                      <p className="text-sm font-bold text-white">Is this company fundamentally strong?</p>
                    </div>
                    <div className="mb-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border ${verdictCfg.border} ${
                          analysis.verdict === 'STRONG'
                            ? 'text-emerald-400'
                            : analysis.verdict === 'MODERATE'
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {verdictCfg.label}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{analysis.verdictText}</p>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-xs font-semibold text-white/80">
                        💡 <strong>Signal Reasoning:</strong>{' '}
                        <span className="font-normal text-white/60">{analysis.signalReason}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Disclaimer */}
        <p className="text-center text-xs text-white/20 mt-6 max-w-2xl mx-auto">
          ⚠️ This analysis is for educational purposes only and does not constitute investment advice.
          Always do your own research before investing.
        </p>
      </div>
    </motion.section>
  );
};

export default FundamentalAnalyzer;
