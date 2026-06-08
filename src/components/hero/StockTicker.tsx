'use client';

import React, { useRef, useEffect } from 'react';

interface TickerStock {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

// Fallback inline data in case the import path is not yet set up
const FALLBACK_TICKER_STOCKS: TickerStock[] = [
  { symbol: 'NIFTY 50', price: 24128.4, change: 128.4, changePercent: 0.53 },
  { symbol: 'SENSEX', price: 79245.12, change: 312.45, changePercent: 0.40 },
  { symbol: 'RELIANCE', price: 2945.6, change: 32.15, changePercent: 1.10 },
  { symbol: 'TCS', price: 3876.2, change: -18.75, changePercent: -0.48 },
  { symbol: 'INFY', price: 1542.85, change: 21.3, changePercent: 1.40 },
  { symbol: 'HDFC BANK', price: 1678.9, change: -8.4, changePercent: -0.50 },
  { symbol: 'ICICI BANK', price: 1245.5, change: 15.2, changePercent: 1.23 },
  { symbol: 'BAJFINANCE', price: 7234.1, change: 98.6, changePercent: 1.38 },
  { symbol: 'WIPRO', price: 478.35, change: -4.65, changePercent: -0.96 },
  { symbol: 'ADANIENT', price: 2876.0, change: 56.5, changePercent: 2.00 },
  { symbol: 'HCLTECH', price: 1356.7, change: 12.3, changePercent: 0.91 },
  { symbol: 'MARUTI', price: 12340.0, change: 145.0, changePercent: 1.19 },
  { symbol: 'SBIN', price: 834.6, change: -3.4, changePercent: -0.41 },
  { symbol: 'TITAN', price: 3567.8, change: 44.2, changePercent: 1.25 },
  { symbol: 'LTIM', price: 5643.2, change: 78.9, changePercent: 1.42 },
];

const TICKER_STOCKS: TickerStock[] = FALLBACK_TICKER_STOCKS;

const formatPrice = (price: number): string => {
  const num = typeof price === 'string' ? parseFloat(String(price).replace(/,/g, '')) : price;
  if (isNaN(num)) return String(price);
  if (num >= 10000) {
    return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return num.toFixed(2);
};

const formatChange = (change: number): string => {
  const abs = Math.abs(change);
  return (change >= 0 ? '+' : '-') + abs.toFixed(2);
};

const formatPercent = (pct: number): string => {
  return (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%';
};

interface TickerItemProps {
  stock: TickerStock;
  index: number;
}

const TickerItem: React.FC<TickerItemProps> = ({ stock }) => {
  const isPositive = stock.change >= 0;

  return (
    <span className="inline-flex items-center gap-2 px-4 flex-shrink-0">
      {/* Symbol */}
      <span className="text-white font-bold text-xs tracking-wide">
        {stock.symbol}
      </span>

      {/* Price */}
      <span className="font-mono text-slate-200 text-xs font-semibold">
        ₹{formatPrice(stock.price)}
      </span>

      {/* Change */}
      <span
        className={`font-mono text-xs font-medium ${
          isPositive ? 'text-emerald-400' : 'text-red-400'
        }`}
      >
        {isPositive ? '▲' : '▼'} {formatChange(stock.change)}
      </span>

      {/* Percent */}
      <span
        className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
          isPositive
            ? 'text-emerald-400 bg-emerald-500/10'
            : 'text-red-400 bg-red-500/10'
        }`}
      >
        {formatPercent(stock.changePercent)}
      </span>

      {/* Separator */}
      <span className="text-slate-600 text-base leading-none select-none">•</span>
    </span>
  );
};

const StockTicker: React.FC = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  // Duplicate items for seamless loop
  const displayStocks = [...TICKER_STOCKS, ...TICKER_STOCKS, ...TICKER_STOCKS];

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    // Pause on hover
    const handleMouseEnter = () => {
      ticker.style.animationPlayState = 'paused';
    };
    const handleMouseLeave = () => {
      ticker.style.animationPlayState = 'running';
    };

    ticker.addEventListener('mouseenter', handleMouseEnter);
    ticker.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ticker.removeEventListener('mouseenter', handleMouseEnter);
      ticker.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden flex items-center"
      style={{
        background: 'rgba(4, 12, 30, 0.85)',
        borderLeft: '3px solid #10b981',
        borderTop: '1px solid rgba(16, 185, 129, 0.15)',
        borderBottom: '1px solid rgba(16, 185, 129, 0.10)',
        height: '44px',
      }}
    >
      {/* Left: LIVE Badge */}
      <div
        className="flex-shrink-0 flex items-center gap-2 px-4 py-2 z-10"
        style={{
          background: 'rgba(4, 12, 30, 0.98)',
          borderRight: '1px solid rgba(16, 185, 129, 0.20)',
          minWidth: '80px',
        }}
      >
        <span className="relative flex items-center justify-center w-2 h-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        <span className="text-xs font-bold text-red-400 tracking-widest uppercase">
          LIVE
        </span>
      </div>

      {/* Left fade gradient */}
      <div
        className="absolute left-[80px] top-0 bottom-0 w-12 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(4,12,30,0.95), transparent)',
        }}
      />

      {/* Scrolling Track */}
      <div className="flex-1 overflow-hidden relative">
        <div
          ref={tickerRef}
          className="inline-flex items-center whitespace-nowrap"
          style={{
            animation: 'ticker-scroll 60s linear infinite',
            willChange: 'transform',
          }}
        >
          {displayStocks.map((stock, index) => (
            <TickerItem key={`${stock.symbol}-${index}`} stock={stock} index={index} />
          ))}
        </div>
      </div>

      {/* Right fade gradient */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(4,12,30,0.95), transparent)',
        }}
      />

      {/* Keyframe style injection */}
      <style>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
};

export default StockTicker;
