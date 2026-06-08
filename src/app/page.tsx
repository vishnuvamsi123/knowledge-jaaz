'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/hero/HeroSection';

// Lazy load heavy sections — each has a min-height placeholder to prevent scroll jumping
const MarketDashboard    = dynamic(() => import('@/components/market/MarketDashboard'),     { ssr: false });
const KnowledgeHub       = dynamic(() => import('@/components/knowledge/KnowledgeHub'),     { ssr: false });
const PennyStockSection  = dynamic(() => import('@/components/analyzer/PennyStockSection'), { ssr: false });
const FundamentalAnalyzer= dynamic(() => import('@/components/analyzer/FundamentalAnalyzer'),{ ssr: false });
const BestPicks          = dynamic(() => import('@/components/stocks/BestPicks'),            { ssr: false });
const ComparisonTool     = dynamic(() => import('@/components/stocks/ComparisonTool'),       { ssr: false });
const AIAssistant        = dynamic(() => import('@/components/ai/AIAssistant'),              { ssr: false });
const NewsSection        = dynamic(() => import('@/components/news/NewsSection'),            { ssr: false });
const CommunitySection   = dynamic(() => import('@/components/community/CommunitySection'),  { ssr: false });
const TrustSection       = dynamic(() => import('@/components/trust/TrustSection'),          { ssr: false });

// Thin divider between sections
function Divider() {
  return (
    <div
      className="w-full h-px mx-auto max-w-6xl"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.12), transparent)' }}
    />
  );
}

// Wrapper that prevents scroll-anchor jumping when lazy content loads in
function SectionWrapper({ id, children, style }: { id: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section
      id={id}
      className="section-padding"
      style={{ overflowAnchor: 'none', minHeight: '300px', ...style }}
    >
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{ background: '#020b1a', overflowAnchor: 'none' }}
    >
      <Header />

      {/* Section 1: Hero — includes full-width logo banner + hero content */}
      <section id="home">
        <HeroSection />
      </section>

      <Divider />

      {/* Section 2: Live Market Dashboard */}
      <SectionWrapper id="markets">
        <MarketDashboard />
      </SectionWrapper>

      <Divider />

      {/* Section 3: Knowledge Hub */}
      <SectionWrapper
        id="learn"
        style={{ background: 'linear-gradient(180deg, #020b1a 0%, #060f22 100%)' }}
      >
        <KnowledgeHub />
      </SectionWrapper>

      <Divider />

      {/* Section 4: Penny Stocks */}
      <SectionWrapper id="penny-stocks">
        <PennyStockSection />
      </SectionWrapper>

      <Divider />

      {/* Section 5: Fundamental Analyzer */}
      <SectionWrapper
        id="analyzer"
        style={{ background: 'linear-gradient(180deg, #020b1a 0%, #071739 100%)' }}
      >
        <FundamentalAnalyzer />
      </SectionWrapper>

      <Divider />

      {/* Section 6: Best Picks */}
      <SectionWrapper id="stocks">
        <BestPicks />
      </SectionWrapper>

      <Divider />

      {/* Section 7: Comparison Tool */}
      <SectionWrapper
        id="compare"
        style={{ background: 'linear-gradient(180deg, #020b1a 0%, #060f22 100%)' }}
      >
        <ComparisonTool />
      </SectionWrapper>

      <Divider />

      {/* Section 8: AI Assistant */}
      <SectionWrapper id="ai-assistant">
        <AIAssistant />
      </SectionWrapper>

      <Divider />

      {/* Section 9: News */}
      <SectionWrapper
        id="news"
        style={{ background: 'linear-gradient(180deg, #020b1a 0%, #060f22 100%)' }}
      >
        <NewsSection />
      </SectionWrapper>

      <Divider />

      {/* Section 10: Community */}
      <SectionWrapper id="community">
        <CommunitySection />
      </SectionWrapper>

      <Divider />

      {/* Section 11: Trust */}
      <SectionWrapper
        id="trust"
        style={{ background: 'linear-gradient(180deg, #020b1a 0%, #071739 100%)' }}
      >
        <TrustSection />
      </SectionWrapper>

      <Divider />

      <Footer />
    </main>
  );
}
