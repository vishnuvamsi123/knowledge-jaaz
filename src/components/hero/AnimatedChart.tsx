'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Realistic NIFTY-style data points [x, y] within SVG viewBox 0 0 600 200
// Y axis: lower value = higher on screen. We'll map 23850–24300 range to y 160–30
const RAW_DATA_POINTS: [number, number][] = [
  [0, 148],
  [30, 155],
  [55, 145],
  [80, 150],
  [108, 140],
  [135, 132],
  [160, 138],
  [185, 125],
  [210, 118],
  [238, 128],
  [262, 115],
  [288, 108],
  [315, 118],
  [340, 100],
  [365, 92],
  [390, 85],
  [418, 95],
  [442, 78],
  [468, 65],
  [495, 72],
  [520, 58],
  [548, 45],
  [572, 38],
  [600, 32],
];

// Build SVG polyline points string
const buildPolylinePoints = (pts: [number, number][]): string =>
  pts.map(([x, y]) => `${x},${y}`).join(' ');

// Build SVG smooth path from points
const buildSmoothPath = (pts: [number, number][]): string => {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx0 = x0 + (x1 - x0) / 3;
    const cy0 = y0;
    const cx1 = x1 - (x1 - x0) / 3;
    const cy1 = y1;
    d += ` C ${cx0},${cy0} ${cx1},${cy1} ${x1},${y1}`;
  }
  return d;
};

// Build fill area path (closes at bottom)
const buildFillPath = (pts: [number, number][], svgHeight: number): string => {
  if (pts.length < 2) return '';
  const linePath = buildSmoothPath(pts);
  const lastPt = pts[pts.length - 1];
  const firstPt = pts[0];
  return `${linePath} L ${lastPt[0]},${svgHeight} L ${firstPt[0]},${svgHeight} Z`;
};

const GRID_Y_LINES = [40, 80, 120, 160];
const Y_AXIS_LABELS: { y: number; label: string }[] = [
  { y: 40, label: '24,250' },
  { y: 100, label: '24,127' },
  { y: 160, label: '24,000' },
];

const SVG_WIDTH = 600;
const SVG_HEIGHT = 200;

// Precomputed volume bars — static constant, runs once at module load, identical server & client
const VOLUME_BARS: { height: string; isUp: boolean }[] = Array.from({ length: 48 }, (_, i) => ({
  height: (4 + Math.abs(Math.sin(i * 0.7 + 1.3) * Math.cos(i * 0.4)) * 16).toFixed(2) + 'px',
  isUp: (i * 7 + 3) % 10 > 3,
}));

const smoothPath = buildSmoothPath(RAW_DATA_POINTS);
const fillPath = buildFillPath(RAW_DATA_POINTS, SVG_HEIGHT + 10);
const polylinePoints = buildPolylinePoints(RAW_DATA_POINTS);

// Animated dot — last point on path
const LAST_POINT = RAW_DATA_POINTS[RAW_DATA_POINTS.length - 1];

const AnimatedChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg mx-auto select-none"
    >
      {/* Card wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(4, 14, 36, 0.85)',
          border: '1px solid rgba(16, 185, 129, 0.18)',
          boxShadow: '0 0 60px rgba(16, 185, 129, 0.08), 0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-[11px] text-slate-500 font-mono tracking-wide">NSE: NIFTY50 • 1D</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-emerald-400 font-semibold">LIVE</span>
          </div>
        </div>

        {/* NIFTY Label */}
        <div className="flex items-baseline justify-between px-5 pb-2">
          <div className="flex items-baseline gap-3">
            <span className="text-lg font-bold text-white font-mono">NIFTY 50</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base font-bold text-emerald-400 font-mono"
            >
              ▲ +128.40
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm font-semibold text-emerald-400/80 font-mono"
            >
              (+0.53%)
            </motion.span>
          </div>
          <span className="text-xs text-slate-500 font-mono">24,128.40</span>
        </div>

        {/* SVG Chart */}
        <div className="relative px-0 pb-0">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            className="block"
            aria-label="NIFTY 50 stock chart"
          >
            <defs>
              {/* Line glow filter */}
              <filter id="chart-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Fill gradient */}
              <linearGradient id="fill-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>

              {/* Dot glow */}
              <radialGradient id="dot-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00C853" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00C853" stopOpacity="0" />
              </radialGradient>

              {/* Clip path for line draw animation */}
              <clipPath id="chart-clip">
                <motion.rect
                  x="0"
                  y="0"
                  height={SVG_HEIGHT}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: SVG_WIDTH } : { width: 0 }}
                  transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                />
              </clipPath>
            </defs>

            {/* Horizontal grid lines */}
            {GRID_Y_LINES.map((y) => (
              <line
                key={y}
                x1="48"
                y1={y}
                x2={SVG_WIDTH}
                y2={y}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            ))}

            {/* Y-axis labels */}
            {Y_AXIS_LABELS.map(({ y, label }) => (
              <text
                key={label}
                x="44"
                y={y + 4}
                textAnchor="end"
                fontSize="9"
                fontFamily="'Courier New', monospace"
                fill="rgba(148,163,184,0.55)"
              >
                {label}
              </text>
            ))}

            {/* Area fill */}
            <motion.path
              d={fillPath}
              fill="url(#fill-gradient)"
              clipPath="url(#chart-clip)"
            />

            {/* Main line */}
            <motion.path
              d={smoothPath}
              fill="none"
              stroke="#00C853"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#chart-glow)"
              clipPath="url(#chart-clip)"
            />

            {/* Glow line (thicker, more transparent) */}
            <motion.path
              d={smoothPath}
              fill="none"
              stroke="#00C853"
              strokeWidth="6"
              strokeLinecap="round"
              strokeOpacity="0.15"
              clipPath="url(#chart-clip)"
            />

            {/* Animated dot at end */}
            {isInView && (
              <g>
                {/* Outer pulsing ring */}
                <motion.circle
                  cx={LAST_POINT[0]}
                  cy={LAST_POINT[1]}
                  r="10"
                  fill="url(#dot-glow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.7, 0.2, 0.7],
                  }}
                  transition={{
                    delay: 2.0,
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                {/* Middle ring */}
                <motion.circle
                  cx={LAST_POINT[0]}
                  cy={LAST_POINT[1]}
                  r="5"
                  fill="none"
                  stroke="#00C853"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.9, duration: 0.4 }}
                />
                {/* Inner solid dot */}
                <motion.circle
                  cx={LAST_POINT[0]}
                  cy={LAST_POINT[1]}
                  r="3"
                  fill="#00C853"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 2.0, duration: 0.3, type: 'spring' }}
                />
              </g>
            )}

            {/* Bottom axis line */}
            <line
              x1="48"
              y1={SVG_HEIGHT - 2}
              x2={SVG_WIDTH}
              y2={SVG_HEIGHT - 2}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Time axis labels */}
        <div className="flex justify-between px-6 pb-4 pt-1">
          {['09:15', '10:30', '11:45', '13:00', '14:15', '15:30'].map((t) => (
            <span key={t} className="text-[9px] text-slate-600 font-mono">
              {t}
            </span>
          ))}
        </div>

        {/* Volume bar indicators — static precomputed, no hydration mismatch */}
        <div className="px-6 pb-4 flex items-end gap-0.5 h-6">
          {VOLUME_BARS.map((bar, i) => (
            <div
              key={i}
              className={`flex-1 rounded-sm ${bar.isUp ? 'bg-emerald-500/20' : 'bg-red-500/15'}`}
              style={{ height: bar.height }}
            />
          ))}
        </div>

        {/* Bottom stats row */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {[
            { label: 'Open', value: '23,999.60' },
            { label: 'High', value: '24,180.20' },
            { label: 'Low', value: '23,980.45' },
            { label: 'Prev', value: '24,000.00' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-[9px] text-slate-600 uppercase tracking-wider">{label}</span>
              <span className="text-[11px] text-slate-300 font-mono font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* External glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none -z-10 blur-2xl opacity-20 bg-emerald-500/20" />
    </div>
  );
};

export default AnimatedChart;
