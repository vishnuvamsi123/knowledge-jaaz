'use client';

import React, { useMemo } from 'react';

interface SparklineChartProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

const SparklineChart: React.FC<SparklineChartProps> = ({
  data,
  color,
  width = 80,
  height = 32,
}) => {
  const { points, fillPath, gradientId } = useMemo(() => {
    if (!data || data.length < 2) {
      return { points: '', fillPath: '', gradientId: `grad-${Math.random()}` };
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const padding = 2;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const normalizeX = (index: number) =>
      padding + (index / (data.length - 1)) * chartWidth;

    const normalizeY = (value: number) =>
      padding + chartHeight - ((value - min) / range) * chartHeight;

    const coordPairs = data.map((value, index) => ({
      x: normalizeX(index),
      y: normalizeY(value),
    }));

    const pts = coordPairs.map(({ x, y }) => `${x},${y}`).join(' ');

    // Fill path: go along the line, then close back along the bottom
    const firstX = coordPairs[0].x;
    const lastX = coordPairs[coordPairs.length - 1].x;
    const bottom = padding + chartHeight;
    const fillPts = `${firstX},${bottom} ${pts} ${lastX},${bottom}`;

    const gradId = `grad-${color.replace(/[^a-zA-Z0-9]/g, '')}-${width}-${height}`;

    return { points: pts, fillPath: fillPts, gradientId: gradId };
  }, [data, color, width, height]);

  if (!data || data.length < 2) {
    return <svg width={width} height={height} />;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>

      {/* Gradient fill area */}
      <polygon
        points={fillPath}
        fill={`url(#${gradientId})`}
      />

      {/* The sparkline itself */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SparklineChart;
