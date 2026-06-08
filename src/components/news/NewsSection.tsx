'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_NEWS, MOCK_STOCKS } from '@/lib/mockData';

// ─── Sector Trends (static) ───────────────────────────────────────────────────

const SECTOR_TRENDS = [
  { sector: 'IT',       change: -1.2, up: false },
  { sector: 'Energy',   change: +2.4, up: true  },
  { sector: 'Banking',  change: +1.1, up: true  },
  { sector: 'Auto',     change: +0.8, up: true  },
  { sector: 'Pharma',   change: -0.4, up: false },
  { sector: 'FMCG',     change: +0.3, up: true  },
  { sector: 'Metals',   change: +3.1, up: true  },
  { sector: 'Realty',   change: -2.0, up: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sentimentBorderColor(sentiment: string) {
  if (sentiment === 'positive') return 'border-l-emerald-500';
  if (sentiment === 'negative') return 'border-l-red-500';
  return 'border-l-white/20';
}

function sentimentBadgeColor(sentiment: string) {
  if (sentiment === 'positive') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  if (sentiment === 'negative') return 'bg-red-500/20 text-red-400 border-red-500/30';
  return 'bg-white/10 text-white/50 border-white/10';
}

function sentimentDot(sentiment: string) {
  if (sentiment === 'positive') return 'bg-emerald-500';
  if (sentiment === 'negative') return 'bg-red-500';
  return 'bg-white/40';
}

function timeAgo(dateStr: string) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 60000);
  if (diff < 1) return 'Just now';
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

// ─── Featured News Card ───────────────────────────────────────────────────────

function FeaturedCard({ news }: { news: (typeof MOCK_NEWS)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`
        relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden
        border-l-4 ${sentimentBorderColor(news.sentiment)}
        hover:bg-white/8 transition-all duration-300 group
        lg:col-span-2 cursor-pointer
      `}
    >
      {/* Top row badges */}
      <div className="flex items-center gap-2 p-5 pb-0">
        <span className={`
          inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border
          ${sentimentBadgeColor(news.sentiment)}
        `}>
          <span className={`w-1.5 h-1.5 rounded-full ${sentimentDot(news.sentiment)}`} />
          {news.sentiment === 'positive' ? 'Bullish' : news.sentiment === 'negative' ? 'Bearish' : 'Neutral'}
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60 border border-white/10">
          {news.category}
        </span>
        {news.sector && (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
            {news.sector}
          </span>
        )}
        <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/20">
          FEATURED
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-xl leading-snug mb-3 group-hover:text-emerald-300 transition-colors">
          {news.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
          {news.summary}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 text-white/40 text-xs">
            <span>🕐 {news.readTime ?? '3 min read'}</span>
            <span>{timeAgo(news.timestamp)}</span>
            {news.source && <span>📰 {news.source}</span>}
          </div>
          <button className="text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors flex items-center gap-1">
            Read More →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Small News Card ──────────────────────────────────────────────────────────

function SmallNewsCard({ news, index }: { news: (typeof MOCK_NEWS)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`
        bg-white/5 border border-white/10 rounded-xl p-4
        border-l-4 ${sentimentBorderColor(news.sentiment)}
        hover:bg-white/8 transition-all duration-300 group cursor-pointer
      `}
    >
      <div className="flex items-start gap-2 mb-2">
        <span className={`
          flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold border
          ${sentimentBadgeColor(news.sentiment)}
        `}>
          {news.category}
        </span>
        {news.sector && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
            {news.sector}
          </span>
        )}
      </div>

      <h4 className="text-white text-sm font-semibold leading-snug mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors">
        {news.title}
      </h4>
      <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-3">
        {news.summary}
      </p>

      <div className="flex items-center justify-between text-white/30 text-xs">
        <span>{timeAgo(news.timestamp)}</span>
        <span className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
          Read →
        </span>
      </div>
    </motion.div>
  );
}

// ─── Market Movers ────────────────────────────────────────────────────────────

function MarketMovers() {
  const sorted = [...MOCK_STOCKS].sort((a, b) => (b.change ?? 0) - (a.change ?? 0));
  const gainers = sorted.slice(0, 5);
  const losers  = sorted.slice(-5).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-5"
    >
      {/* Top Gainers */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-emerald-500/5">
          <span className="text-emerald-400 text-sm">📈</span>
          <h4 className="text-emerald-400 text-sm font-bold">Top Gainers</h4>
        </div>
        <div className="divide-y divide-white/5">
          {gainers.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors">
              <div>
                <p className="text-white text-xs font-semibold">{stock.symbol}</p>
                <p className="text-white/40 text-[10px]">₹{stock.price?.toLocaleString('en-IN')}</p>
              </div>
              <span className="text-emerald-400 text-xs font-bold">
                +{stock.change?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-red-500/5">
          <span className="text-red-400 text-sm">📉</span>
          <h4 className="text-red-400 text-sm font-bold">Top Losers</h4>
        </div>
        <div className="divide-y divide-white/5">
          {losers.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors">
              <div>
                <p className="text-white text-xs font-semibold">{stock.symbol}</p>
                <p className="text-white/40 text-[10px]">₹{stock.price?.toLocaleString('en-IN')}</p>
              </div>
              <span className="text-red-400 text-xs font-bold">
                {stock.change?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NewsSection() {
  const featured   = MOCK_NEWS[0];
  const smallCards = MOCK_NEWS.slice(1, 7);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative" id="news">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] bg-sky-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between flex-wrap gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-4xl sm:text-5xl font-black text-white">
                News & Market Insights
              </h2>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Auto-Updated
              </span>
            </div>
            <p className="text-white/50 text-lg">Real-time market news with sentiment analysis</p>
          </div>
        </motion.div>

        {/* Sector Trend Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {SECTOR_TRENDS.map((s) => (
            <span
              key={s.sector}
              className={`
                px-3 py-1.5 rounded-full text-xs font-semibold border
                ${s.up
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
                }
              `}
            >
              {s.sector} {s.up ? '↑' : '↓'} {s.up ? '+' : ''}{s.change}%
            </span>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: news */}
          <div className="lg:col-span-3 space-y-5">
            {/* Featured + small cards in a sub-grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FeaturedCard news={featured} />
              {smallCards.slice(0, 2).map((news, i) => (
                <SmallNewsCard key={news.id} news={news} index={i} />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {smallCards.slice(2).map((news, i) => (
                <SmallNewsCard key={news.id} news={news} index={i + 2} />
              ))}
            </div>
          </div>

          {/* Right: Movers sidebar */}
          <div className="lg:col-span-1">
            <MarketMovers />
          </div>
        </div>

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <button className="
            px-7 py-3 rounded-full bg-white/5 border border-white/10
            text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20
            text-sm font-semibold transition-all duration-300
          ">
            Load More News →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
