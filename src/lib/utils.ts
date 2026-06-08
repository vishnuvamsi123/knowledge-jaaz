import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return price.toFixed(2);
}

export function formatChange(change: number, pct: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)} (${sign}${pct.toFixed(2)}%)`;
}

export function getSignalColor(signal: 'BUY' | 'HOLD' | 'SELL'): string {
  if (signal === 'BUY') return 'badge-buy';
  if (signal === 'SELL') return 'badge-sell';
  return 'badge-hold';
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#00C853';
  if (score >= 60) return '#F5B800';
  return '#FF3B5C';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
