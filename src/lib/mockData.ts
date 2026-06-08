import { Stock, NewsItem, LessonCard, CommunityPost } from './types';

// Deterministic seeded PRNG (mulberry32) — same output on server AND client
function seededRandom(seed: number): () => number {
  let s = seed;
  return function () {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Generates a realistic sparkline with trend — fully deterministic via seed
function generateSparkline(basePrice: number, trend: 'up' | 'down' | 'flat', points = 20): number[] {
  const rng = seededRandom(Math.round(basePrice * 100));
  const data: number[] = [];
  let current = basePrice * 0.9;
  for (let i = 0; i < points; i++) {
    const trendBias = trend === 'up' ? 0.006 : trend === 'down' ? -0.004 : 0;
    const noise = (rng() - 0.5) * 0.02;
    current = current * (1 + trendBias + noise);
    data.push(Math.round(current * 100) / 100);
  }
  return data;
}

export const MOCK_STOCKS: Stock[] = [
  {
    id: 'RELIANCE',
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    sector: 'Energy & Retail',
    price: 2847.50,
    change: 42.30,
    changePct: 1.51,
    volume: '8.2M',
    marketCap: '₹19.2L Cr',
    pe: 28.4,
    eps: 100.26,
    roe: 11.2,
    debtEquity: 0.35,
    revenueGrowth: 8.4,
    profitGrowth: 12.1,
    dividendYield: 0.37,
    fundamentalScore: 88,
    growthScore: 82,
    signal: 'BUY',
    category: ['bluechip', 'longterm'],
    intrinsicValue: 3100,
    sparkline: generateSparkline(2847.50, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'TCS',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    sector: 'IT & Technology',
    price: 3524.15,
    change: -18.45,
    changePct: -0.52,
    volume: '2.1M',
    marketCap: '₹12.8L Cr',
    pe: 27.8,
    eps: 126.8,
    roe: 47.2,
    debtEquity: 0.02,
    revenueGrowth: 6.8,
    profitGrowth: 9.3,
    dividendYield: 1.8,
    fundamentalScore: 95,
    growthScore: 79,
    signal: 'HOLD',
    category: ['bluechip', 'dividend', 'longterm'],
    intrinsicValue: 3800,
    sparkline: generateSparkline(3524.15, 'flat'),
    exchange: 'NSE',
  },
  {
    id: 'HDFCBANK',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank',
    sector: 'Banking & Finance',
    price: 1673.80,
    change: 22.55,
    changePct: 1.37,
    volume: '6.8M',
    marketCap: '₹12.7L Cr',
    pe: 18.2,
    eps: 91.97,
    roe: 16.8,
    debtEquity: 8.1,
    revenueGrowth: 15.2,
    profitGrowth: 18.7,
    dividendYield: 1.2,
    fundamentalScore: 92,
    growthScore: 88,
    signal: 'BUY',
    category: ['bluechip', 'longterm', 'growth'],
    intrinsicValue: 1950,
    sparkline: generateSparkline(1673.80, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'INFY',
    symbol: 'INFY',
    name: 'Infosys',
    sector: 'IT & Technology',
    price: 1482.60,
    change: 8.90,
    changePct: 0.60,
    volume: '3.4M',
    marketCap: '₹6.2L Cr',
    pe: 24.1,
    eps: 61.52,
    roe: 33.2,
    debtEquity: 0.01,
    revenueGrowth: 5.2,
    profitGrowth: 7.8,
    dividendYield: 2.3,
    fundamentalScore: 90,
    growthScore: 74,
    signal: 'HOLD',
    category: ['bluechip', 'dividend', 'longterm'],
    intrinsicValue: 1600,
    sparkline: generateSparkline(1482.60, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'TATAMOTORS',
    symbol: 'TATAMOTORS',
    name: 'Tata Motors',
    sector: 'Automobile',
    price: 782.30,
    change: 15.20,
    changePct: 1.98,
    volume: '9.1M',
    marketCap: '₹2.9L Cr',
    pe: 8.4,
    eps: 93.13,
    roe: 22.4,
    debtEquity: 1.8,
    revenueGrowth: 24.6,
    profitGrowth: 38.2,
    dividendYield: 0.5,
    fundamentalScore: 79,
    growthScore: 91,
    signal: 'BUY',
    category: ['growth', 'undervalued', 'multibagger'],
    intrinsicValue: 1100,
    sparkline: generateSparkline(782.30, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'WIPRO',
    symbol: 'WIPRO',
    name: 'Wipro Ltd',
    sector: 'IT & Technology',
    price: 458.45,
    change: -3.20,
    changePct: -0.69,
    volume: '4.2M',
    marketCap: '₹2.4L Cr',
    pe: 19.8,
    eps: 23.15,
    roe: 17.8,
    debtEquity: 0.05,
    revenueGrowth: 3.1,
    profitGrowth: 4.2,
    dividendYield: 0.22,
    fundamentalScore: 76,
    growthScore: 62,
    signal: 'HOLD',
    category: ['bluechip'],
    intrinsicValue: 500,
    sparkline: generateSparkline(458.45, 'down'),
    exchange: 'NSE',
  },
  {
    id: 'ADANIENT',
    symbol: 'ADANIENT',
    name: 'Adani Enterprises',
    sector: 'Conglomerate',
    price: 2428.75,
    change: -45.60,
    changePct: -1.84,
    volume: '1.8M',
    marketCap: '₹2.8L Cr',
    pe: 118.4,
    eps: 20.51,
    roe: 8.9,
    debtEquity: 2.4,
    revenueGrowth: 42.1,
    profitGrowth: 56.3,
    dividendYield: 0.06,
    fundamentalScore: 58,
    growthScore: 84,
    signal: 'HOLD',
    category: ['growth'],
    intrinsicValue: 1800,
    sparkline: generateSparkline(2428.75, 'down'),
    exchange: 'NSE',
  },
  {
    id: 'BAJFINANCE',
    symbol: 'BAJFINANCE',
    name: 'Bajaj Finance',
    sector: 'NBFC & Finance',
    price: 7182.40,
    change: 98.30,
    changePct: 1.39,
    volume: '1.1M',
    marketCap: '₹4.3L Cr',
    pe: 35.2,
    eps: 204.04,
    roe: 22.1,
    debtEquity: 3.2,
    revenueGrowth: 28.4,
    profitGrowth: 22.8,
    dividendYield: 0.28,
    fundamentalScore: 89,
    growthScore: 87,
    signal: 'BUY',
    category: ['bluechip', 'growth', 'longterm'],
    intrinsicValue: 8500,
    sparkline: generateSparkline(7182.40, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'SUNPHARMA',
    symbol: 'SUNPHARMA',
    name: 'Sun Pharmaceutical',
    sector: 'Pharmaceuticals',
    price: 1628.90,
    change: 24.10,
    changePct: 1.50,
    volume: '2.8M',
    marketCap: '₹3.9L Cr',
    pe: 37.8,
    eps: 43.09,
    roe: 15.6,
    debtEquity: 0.08,
    revenueGrowth: 11.8,
    profitGrowth: 14.2,
    dividendYield: 0.52,
    fundamentalScore: 85,
    growthScore: 78,
    signal: 'BUY',
    category: ['bluechip', 'longterm', 'dividend'],
    intrinsicValue: 1900,
    sparkline: generateSparkline(1628.90, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'LTIM',
    symbol: 'LTIM',
    name: 'LTIMindtree',
    sector: 'IT & Technology',
    price: 4823.55,
    change: 62.40,
    changePct: 1.31,
    volume: '0.8M',
    marketCap: '₹1.4L Cr',
    pe: 32.4,
    eps: 148.88,
    roe: 28.9,
    debtEquity: 0.01,
    revenueGrowth: 14.2,
    profitGrowth: 11.8,
    dividendYield: 1.1,
    fundamentalScore: 87,
    growthScore: 81,
    signal: 'BUY',
    category: ['growth', 'longterm'],
    intrinsicValue: 5500,
    sparkline: generateSparkline(4823.55, 'up'),
    exchange: 'NSE',
  },
  // Penny stocks
  {
    id: 'SUZLON',
    symbol: 'SUZLON',
    name: 'Suzlon Energy',
    sector: 'Renewable Energy',
    price: 42.85,
    change: 2.15,
    changePct: 5.28,
    volume: '48.2M',
    marketCap: '₹58K Cr',
    pe: 38.4,
    eps: 1.12,
    roe: 24.8,
    debtEquity: 0.42,
    revenueGrowth: 32.1,
    profitGrowth: 88.4,
    dividendYield: 0,
    fundamentalScore: 68,
    growthScore: 94,
    signal: 'BUY',
    category: ['penny', 'growth', 'multibagger'],
    intrinsicValue: 65,
    sparkline: generateSparkline(42.85, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'IRFC',
    symbol: 'IRFC',
    name: 'Indian Railway Finance Corp',
    sector: 'Government Finance',
    price: 168.45,
    change: -2.80,
    changePct: -1.64,
    volume: '22.4M',
    marketCap: '₹2.2L Cr',
    pe: 29.8,
    eps: 5.65,
    roe: 12.8,
    debtEquity: 9.4,
    revenueGrowth: 18.2,
    profitGrowth: 15.6,
    dividendYield: 1.5,
    fundamentalScore: 72,
    growthScore: 76,
    signal: 'HOLD',
    category: ['growth', 'dividend', 'longterm'],
    intrinsicValue: 200,
    sparkline: generateSparkline(168.45, 'down'),
    exchange: 'NSE',
  },
  {
    id: 'YESBANK',
    symbol: 'YESBANK',
    name: 'Yes Bank',
    sector: 'Banking',
    price: 21.30,
    change: 0.45,
    changePct: 2.16,
    volume: '112.8M',
    marketCap: '₹66K Cr',
    pe: 42.6,
    eps: 0.50,
    roe: 4.2,
    debtEquity: 15.2,
    revenueGrowth: 22.4,
    profitGrowth: 124.8,
    dividendYield: 0,
    fundamentalScore: 42,
    growthScore: 68,
    signal: 'HOLD',
    category: ['penny'],
    intrinsicValue: 15,
    sparkline: generateSparkline(21.30, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'VEDL',
    symbol: 'VEDL',
    name: 'Vedanta Limited',
    sector: 'Metals & Mining',
    price: 452.60,
    change: 8.90,
    changePct: 2.01,
    volume: '18.4M',
    marketCap: '₹1.7L Cr',
    pe: 12.4,
    eps: 36.50,
    roe: 18.9,
    debtEquity: 1.8,
    revenueGrowth: 6.2,
    profitGrowth: 28.4,
    dividendYield: 12.8,
    fundamentalScore: 71,
    growthScore: 72,
    signal: 'BUY',
    category: ['dividend', 'undervalued'],
    intrinsicValue: 550,
    sparkline: generateSparkline(452.60, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'COALINDIA',
    symbol: 'COALINDIA',
    name: 'Coal India',
    sector: 'Mining & Resources',
    price: 382.15,
    change: 4.25,
    changePct: 1.12,
    volume: '8.9M',
    marketCap: '₹2.4L Cr',
    pe: 6.8,
    eps: 56.20,
    roe: 48.2,
    debtEquity: 0.01,
    revenueGrowth: 4.2,
    profitGrowth: 12.8,
    dividendYield: 6.8,
    fundamentalScore: 84,
    growthScore: 58,
    signal: 'BUY',
    category: ['dividend', 'undervalued', 'longterm'],
    intrinsicValue: 480,
    sparkline: generateSparkline(382.15, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'ITC',
    symbol: 'ITC',
    name: 'ITC Limited',
    sector: 'FMCG & Tobacco',
    price: 428.90,
    change: 3.45,
    changePct: 0.81,
    volume: '11.2M',
    marketCap: '₹5.3L Cr',
    pe: 27.2,
    eps: 15.77,
    roe: 28.4,
    debtEquity: 0.01,
    revenueGrowth: 5.8,
    profitGrowth: 8.4,
    dividendYield: 3.4,
    fundamentalScore: 88,
    growthScore: 65,
    signal: 'BUY',
    category: ['bluechip', 'dividend', 'longterm', 'undervalued'],
    intrinsicValue: 520,
    sparkline: generateSparkline(428.90, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'HCLTECH',
    symbol: 'HCLTECH',
    name: 'HCL Technologies',
    sector: 'IT & Technology',
    price: 1628.40,
    change: 18.25,
    changePct: 1.13,
    volume: '2.8M',
    marketCap: '₹4.4L Cr',
    pe: 26.8,
    eps: 60.76,
    roe: 24.8,
    debtEquity: 0.02,
    revenueGrowth: 7.8,
    profitGrowth: 10.4,
    dividendYield: 2.8,
    fundamentalScore: 88,
    growthScore: 76,
    signal: 'BUY',
    category: ['bluechip', 'dividend', 'longterm'],
    intrinsicValue: 1900,
    sparkline: generateSparkline(1628.40, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'MARUTI',
    symbol: 'MARUTI',
    name: 'Maruti Suzuki',
    sector: 'Automobile',
    price: 11842.30,
    change: 142.80,
    changePct: 1.22,
    volume: '0.9M',
    marketCap: '₹3.7L Cr',
    pe: 28.4,
    eps: 417.0,
    roe: 18.4,
    debtEquity: 0.01,
    revenueGrowth: 12.4,
    profitGrowth: 24.8,
    dividendYield: 1.2,
    fundamentalScore: 91,
    growthScore: 82,
    signal: 'BUY',
    category: ['bluechip', 'longterm', 'growth'],
    intrinsicValue: 13500,
    sparkline: generateSparkline(11842.30, 'up'),
    exchange: 'NSE',
  },
  {
    id: 'TITAN',
    symbol: 'TITAN',
    name: 'Titan Company',
    sector: 'Consumer Goods',
    price: 3342.85,
    change: -28.40,
    changePct: -0.84,
    volume: '1.2M',
    marketCap: '₹2.97L Cr',
    pe: 82.4,
    eps: 40.57,
    roe: 29.8,
    debtEquity: 0.12,
    revenueGrowth: 18.4,
    profitGrowth: 22.8,
    dividendYield: 0.3,
    fundamentalScore: 86,
    growthScore: 88,
    signal: 'HOLD',
    category: ['bluechip', 'growth', 'longterm'],
    intrinsicValue: 3600,
    sparkline: generateSparkline(3342.85, 'down'),
    exchange: 'NSE',
  },
  {
    id: 'POWERGRID',
    symbol: 'POWERGRID',
    name: 'Power Grid Corp',
    sector: 'Utilities & Power',
    price: 292.40,
    change: 2.80,
    changePct: 0.97,
    volume: '9.4M',
    marketCap: '₹2.7L Cr',
    pe: 17.8,
    eps: 16.43,
    roe: 19.8,
    debtEquity: 1.4,
    revenueGrowth: 8.2,
    profitGrowth: 9.8,
    dividendYield: 4.8,
    fundamentalScore: 82,
    growthScore: 66,
    signal: 'BUY',
    category: ['dividend', 'undervalued', 'longterm'],
    intrinsicValue: 360,
    sparkline: generateSparkline(292.40, 'up'),
    exchange: 'NSE',
  },
];

// Auto-update stock prices with realistic fluctuation
export function simulateStockUpdate(stocks: Stock[]): Stock[] {
  return stocks.map(stock => {
    const volatility = stock.price < 100 ? 0.025 : stock.price < 500 ? 0.015 : 0.008;
    const delta = stock.price * volatility * (Math.random() - 0.48);
    const newPrice = Math.max(stock.price + delta, stock.price * 0.5);
    const newChange = stock.change + delta * 0.7;
    const newChangePct = (newChange / (newPrice - newChange)) * 100;
    
    return {
      ...stock,
      price: Math.round(newPrice * 100) / 100,
      change: Math.round(newChange * 100) / 100,
      changePct: Math.round(newChangePct * 100) / 100,
    };
  });
}

// Ticker data - top stocks for the scrolling ticker
export const TICKER_STOCKS = [
  { symbol: 'NIFTY 50', price: '24,127.50', change: '+128.40', pct: '+0.53%', positive: true },
  { symbol: 'SENSEX', price: '79,486.32', change: '+412.80', pct: '+0.52%', positive: true },
  { symbol: 'RELIANCE', price: '2,847.50', change: '+42.30', pct: '+1.51%', positive: true },
  { symbol: 'TCS', price: '3,524.15', change: '-18.45', pct: '-0.52%', positive: false },
  { symbol: 'HDFCBANK', price: '1,673.80', change: '+22.55', pct: '+1.37%', positive: true },
  { symbol: 'INFY', price: '1,482.60', change: '+8.90', pct: '+0.60%', positive: true },
  { symbol: 'BAJFINANCE', price: '7,182.40', change: '+98.30', pct: '+1.39%', positive: true },
  { symbol: 'TATAMOTORS', price: '782.30', change: '+15.20', pct: '+1.98%', positive: true },
  { symbol: 'WIPRO', price: '458.45', change: '-3.20', pct: '-0.69%', positive: false },
  { symbol: 'ITC', price: '428.90', change: '+3.45', pct: '+0.81%', positive: true },
  { symbol: 'SUNPHARMA', price: '1,628.90', change: '+24.10', pct: '+1.50%', positive: true },
  { symbol: 'SUZLON', price: '42.85', change: '+2.15', pct: '+5.28%', positive: true },
  { symbol: 'COALINDIA', price: '382.15', change: '+4.25', pct: '+1.12%', positive: true },
  { symbol: 'MARUTI', price: '11,842.30', change: '+142.80', pct: '+1.22%', positive: true },
  { symbol: 'VEDL', price: '452.60', change: '+8.90', pct: '+2.01%', positive: true },
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Nifty 50 Hits New All-Time High as FII Inflows Surge',
    summary: 'Foreign Institutional Investors poured ₹12,400 crore into Indian equities this week, pushing Nifty to fresh record highs above 24,000.',
    category: 'Market Update',
    sector: 'Broad Market',
    timestamp: '2 hours ago',
    readTime: '3 min',
    sentiment: 'positive',
    source: 'Market Desk',
  },
  {
    id: 'n2',
    title: 'Tata Motors EV Sales Cross 50,000 Units in FY25',
    summary: 'Tata Motors reported record electric vehicle sales, maintaining 70%+ market share in India\'s fast-growing EV segment.',
    category: 'Stock News',
    sector: 'Automobile',
    timestamp: '4 hours ago',
    readTime: '4 min',
    sentiment: 'positive',
    source: 'Auto Desk',
  },
  {
    id: 'n3',
    title: 'RBI Keeps Repo Rate Unchanged at 6.5%',
    summary: 'The Reserve Bank of India maintained the repo rate at 6.5% in its latest monetary policy meeting, signaling a wait-and-watch approach.',
    category: 'Economy',
    sector: 'Banking',
    timestamp: '6 hours ago',
    readTime: '5 min',
    sentiment: 'neutral',
    source: 'Economy Desk',
  },
  {
    id: 'n4',
    title: 'IT Sector Faces Headwinds: TCS, Infosys Guidance Cautious',
    summary: 'Major IT companies issued cautious guidance for FY26 amid global tech spending slowdown and visa restrictions in the US.',
    category: 'Sector Trend',
    sector: 'IT & Technology',
    timestamp: '8 hours ago',
    readTime: '4 min',
    sentiment: 'negative',
    source: 'Tech Desk',
  },
  {
    id: 'n5',
    title: 'Renewable Energy Stocks Rally on Budget Allocation',
    summary: 'Suzlon, NTPC Green, and Adani Green surged 5-8% after the government announced ₹1.2 lakh crore allocation for renewable energy.',
    category: 'Sector Trend',
    sector: 'Renewable Energy',
    timestamp: '10 hours ago',
    readTime: '3 min',
    sentiment: 'positive',
    source: 'Energy Desk',
  },
  {
    id: 'n6',
    title: 'Gold Hits ₹72,000/10g: Should You Invest in Gold ETFs?',
    summary: 'Gold prices touched a historic high as global uncertainty rises. Experts suggest SGB and Gold ETFs for retail investors.',
    category: 'Investment',
    sector: 'Commodities',
    timestamp: '12 hours ago',
    readTime: '6 min',
    sentiment: 'neutral',
    source: 'Commodity Desk',
  },
];

export const MOCK_LESSONS: LessonCard[] = [
  // Beginner
  { id: 'b1', title: 'What is Stock Market?', description: 'Understand how the stock market works — from basics to your first investment concept.', level: 'beginner', icon: '📈', duration: '15 min', hasVideo: true, hasQuiz: true, topics: ['NSE/BSE', 'Shares', 'Market Hours'], color: 'emerald' },
  { id: 'b2', title: 'NSE & BSE Explained', description: 'The two major Indian stock exchanges explained in simple Telugu & English.', level: 'beginner', icon: '🏛️', duration: '12 min', hasVideo: true, hasQuiz: true, topics: ['NSE', 'BSE', 'Listing'], color: 'blue' },
  { id: 'b3', title: 'Opening a Demat Account', description: 'Step-by-step guide to opening a Demat account and start your investing journey.', level: 'beginner', icon: '🏦', duration: '20 min', hasVideo: true, hasQuiz: false, topics: ['Demat', 'Zerodha', 'KYC'], color: 'gold' },
  { id: 'b4', title: 'Mutual Funds Simplified', description: 'Learn what mutual funds are and why they are the safest start for beginners.', level: 'beginner', icon: '💼', duration: '18 min', hasVideo: true, hasQuiz: true, topics: ['NAV', 'AMC', 'Fund Types'], color: 'emerald' },
  { id: 'b5', title: 'Start a SIP Today', description: 'Systematic Investment Plans — how to create wealth with just ₹500/month.', level: 'beginner', icon: '💰', duration: '10 min', hasVideo: true, hasQuiz: true, topics: ['SIP', 'Compounding', 'ELSS'], color: 'blue' },
  // Intermediate
  { id: 'i1', title: 'Technical Analysis Basics', description: 'Read price charts like a pro. Understand trends, support, resistance.', level: 'intermediate', icon: '📊', duration: '25 min', hasVideo: true, hasQuiz: true, topics: ['Charts', 'Trends', 'Indicators'], color: 'gold' },
  { id: 'i2', title: 'Candlestick Patterns', description: '20 must-know candlestick patterns for trading decisions.', level: 'intermediate', icon: '🕯️', duration: '30 min', hasVideo: true, hasQuiz: true, topics: ['Doji', 'Hammer', 'Engulfing'], color: 'emerald' },
  { id: 'i3', title: 'Swing Trading Strategy', description: 'Capture 5-15% gains in stocks over days to weeks with swing trading.', level: 'intermediate', icon: '🎯', duration: '35 min', hasVideo: true, hasQuiz: true, topics: ['Entry/Exit', 'Stop Loss', 'Targets'], color: 'blue' },
  { id: 'i4', title: 'Risk Management', description: 'Never lose more than you can afford. Master position sizing and stop losses.', level: 'intermediate', icon: '🛡️', duration: '20 min', hasVideo: true, hasQuiz: true, topics: ['Stop Loss', '2% Rule', 'Diversification'], color: 'gold' },
  // Advanced
  { id: 'a1', title: 'Reading Financial Statements', description: 'Balance Sheet, P&L, Cash Flow — understand company health deeply.', level: 'advanced', icon: '📑', duration: '45 min', hasVideo: true, hasQuiz: true, topics: ['Balance Sheet', 'P&L', 'Cash Flow'], color: 'emerald' },
  { id: 'a2', title: 'PE Ratio Deep Dive', description: 'What is a good PE ratio? When is a stock cheap vs expensive?', level: 'advanced', icon: '🔬', duration: '30 min', hasVideo: true, hasQuiz: true, topics: ['PE', 'PEG', 'Sector PE'], color: 'blue' },
  { id: 'a3', title: 'Intrinsic Value & DCF', description: 'Calculate the true value of any stock using Discounted Cash Flow model.', level: 'advanced', icon: '⚖️', duration: '50 min', hasVideo: true, hasQuiz: true, topics: ['DCF', 'Intrinsic Value', 'Margin of Safety'], color: 'gold' },
];

export const MOCK_COMMUNITY: CommunityPost[] = [
  { id: 'c1', author: 'Ravi Kumar', avatar: 'RK', title: 'How I turned ₹50,000 into ₹2.4L in 3 years with SIP', content: 'Started SIP in 2021 with just ₹2,000/month in a flexi cap fund. Sharing my journey and learnings...', preview: 'Started SIP in 2021 with just ₹2,000/month in a flexi cap fund...', likes: 284, replies: 47, views: 4200, timestamp: '2 hours ago', tag: 'Success Story', level: 'beginner', authorLevel: 'Beginner' },
  { id: 'c2', author: 'Priya Sharma', avatar: 'PS', title: 'Best books to learn Fundamental Analysis in Telugu?', content: 'I can read Telugu better than English. Are there any good stock market books in Telugu? Or YouTube channels?', preview: 'I can read Telugu better than English. Are there any good resources?', likes: 128, replies: 32, views: 1800, timestamp: '5 hours ago', tag: 'Question', level: 'beginner', authorLevel: 'Beginner' },
  { id: 'c3', author: 'Vijay Reddy', avatar: 'VR', title: 'Suzlon at ₹42 — Buy, Hold or Sell? My Analysis', content: 'Deep diving into Suzlon\'s order book, debt reduction, and wind energy opportunity. Here is my detailed view...', preview: 'Deep diving into Suzlon\'s order book, debt reduction, and wind energy...', likes: 412, replies: 89, views: 8700, timestamp: '1 day ago', tag: 'Analysis', level: 'intermediate', authorLevel: 'Advanced' },
  { id: 'c4', author: 'Lakshmi Devi', avatar: 'LD', title: 'Warning: These 5 penny stocks are scams — AVOID', content: 'As someone who lost ₹40,000 in pump-and-dump schemes, I want to warn beginners about these dangerous stocks...', preview: 'As someone who lost ₹40,000 in pump-and-dump schemes, I want to warn...', likes: 624, replies: 112, views: 15200, timestamp: '2 days ago', tag: 'Warning', level: 'beginner', authorLevel: 'Expert' },
];

export const AI_RESPONSES: Record<string, string> = {
  default: `I'm your Knowledge Jaaz AI assistant! 🤖 I can help you understand stocks, explain company fundamentals, teach investing concepts, and guide your learning journey. Try asking me about any company or concept!`,
  
  'tata motors': `**Tata Motors** 🚗 — Simple Explanation for Beginners:

Tata Motors is like India's biggest car factory. They make cars (Tiago, Nexon, Harrier), trucks, and buses.

📊 **Current Status:**
• Price: ₹782 | PE Ratio: 8.4 (Very Cheap!)
• Revenue growing 24% year-over-year
• Profit growing 38% — very strong!

🌟 **Why Beginners Should Know:**
• They own Jaguar Land Rover (JLR) — a luxury British car brand
• India's #1 electric vehicle maker (Nexon EV, Tiago EV)
• PE of 8.4 means it's trading below its value

⚠️ **Risk:** High debt (but decreasing), depends on global auto market

💡 **Simple Verdict:** Fundamentally strong with strong EV growth story. Good for long-term investors who can hold 3-5 years.`,

  'reliance': `**Reliance Industries** 🏭 — The Backbone of India Inc.

Reliance is like 5 companies in one! They do everything:

🛢️ **Oil & Gas** → Petrol, diesel, chemicals
📱 **Jio** → 47 crore mobile customers
🛍️ **Retail** → Reliance Fresh, Trends, JioMart
♻️ **Green Energy** → Building solar, hydrogen plants

📊 **Financials:**
• Price: ₹2,847 | PE: 28 (Fairly valued)
• Revenue: ₹9 lakh crore+ annually
• Debt reducing every year ✅

💡 **Why Middle Class Should Know:**
Think of Reliance as buying a share in India's entire economy. If India grows, Reliance grows.

🎯 **Bottom Line:** Safe, diversified, long-term wealth creator. Suitable for beginners.`,

  'what is stock market': `**What is Stock Market?** 📈 — Simplest Explanation

Imagine you and 3 friends start a tea shop 🍵

Total value: ₹1,00,000
Each person: ₹25,000 = 25% ownership = 25 shares

Now your shop becomes successful. Value grows to ₹5,00,000.
Your 25 shares are now worth ₹1,25,000! 🎉

**That's exactly how stock market works:**
• Companies need money → They sell shares to public
• You buy shares → You become part-owner
• Company profits grow → Your share value grows

**NSE & BSE** are the marketplaces where these shares are bought and sold, just like a vegetable market — but for company ownership!

📱 **How to Start:**
1. Open Demat Account (Zerodha, Groww)
2. Complete KYC (Aadhar + PAN)
3. Add ₹500 minimum
4. Buy your first stock or mutual fund!

💡 **Beginner Tip:** Start with Mutual Fund SIP before individual stocks.`,

  'pe ratio': `**PE Ratio Explained Simply** 🔢

PE = Price ÷ Earnings Per Share

**Simple Example:**
🏪 Imagine a shop earns ₹10 profit per year.
If the shop costs ₹200, the PE = 200/10 = **20**

This means you're paying ₹20 for every ₹1 of profit.

**How to Use It:**
| PE Range | What It Means |
|----------|--------------|
| Below 15 | Possibly undervalued / value stock |
| 15-30 | Fairly valued |
| 30-50 | Growth expectations built in |
| Above 50 | Expensive or high-growth stock |

⚠️ **Important:** Compare PE within same sector!
• IT Sector avg PE: 25-30
• Bank Sector avg PE: 12-18
• FMCG avg PE: 40-60

💡 **Quick Rule:** Lower PE in a growing company = Potential Bargain!

Example: Tata Motors PE is 8.4 — very cheap for a growing company with EVs!`,

  'sip': `**SIP — Start Investing with ₹500/month!** 💰

SIP = Systematic Investment Plan

**How SIP Works (Super Simple):**
Every month, same amount auto-deducted from bank → invested in mutual fund

**The Magic of SIP — Compounding:**
₹2,000/month for 20 years at 12% return:
• Total Invested: ₹4.8 lakhs
• Final Value: **₹19.8 lakhs!** 🚀

That's 4x your money — just from regular investing!

**Why SIP is PERFECT for Middle Class:**
✅ Start with just ₹500/month
✅ No need to watch market daily
✅ Automatic — just set and forget
✅ Rupee cost averaging (buy more when cheap, less when costly)
✅ Tax saving with ELSS funds

**Best SIP Funds for Beginners:**
1. Parag Parikh Flexi Cap
2. Mirae Asset Large Cap
3. HDFC Mid Cap Opportunities

💡 **Action:** Open Zerodha Coin or Groww today. Start ₹1,000 SIP. Your future self will thank you!`,

  'intrinsic value': `**Intrinsic Value Explained Simply** 💎

Intrinsic value is the REAL worth of a company — not just its market price.

**Simple Analogy:**
Imagine a house worth ₹50 lakhs (real value).
But currently selling for ₹35 lakhs.
That ₹15 lakh discount = your margin of safety!

Same with stocks:
• **Current Price** = what market is charging right now
• **Intrinsic Value** = what the company is truly worth based on earnings, growth, and assets

**How to Estimate Intrinsic Value:**
1. **PE-based**: If sector average PE is 25 and EPS is ₹100 → fair value = ₹2,500
2. **DCF Method**: Calculate future cash flows, discount to today's value
3. **Graham Formula**: √(22.5 × EPS × Book Value)

**Rule of Thumb:**
✅ Buy when price is 20-30% BELOW intrinsic value
⚠️ Hold when near intrinsic value
❌ Avoid when price is ABOVE intrinsic value

💡 **Example:** If TATAMOTORS intrinsic value = ₹1,100 and price = ₹782 → trading at 29% discount → potential BUY!`,
};
