// TypeScript types for Knowledge Jaaz

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePct: number;
  volume: string;
  marketCap: string;
  pe: number;
  eps: number;
  roe: number;
  debtEquity: number;
  revenueGrowth: number;
  profitGrowth: number;
  dividendYield: number;
  fundamentalScore: number;
  growthScore: number;
  signal: 'BUY' | 'HOLD' | 'SELL';
  category: StockCategory[];
  intrinsicValue: number;
  sparkline: number[];
  exchange: 'NSE' | 'BSE';
}

export type StockCategory = 
  | 'penny'
  | 'bluechip'
  | 'dividend'
  | 'growth'
  | 'undervalued'
  | 'longterm'
  | 'multibagger';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  sector: string;
  timestamp: string;
  readTime: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  source: string;
}

export interface LessonCard {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  duration: string;
  hasVideo: boolean;
  hasQuiz: boolean;
  topics: string[];
  color: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  preview?: string;
  likes: number;
  replies: number;
  views?: number;
  timestamp: string;
  tag: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  authorLevel?: 'Beginner' | 'Advanced' | 'Expert';
}
