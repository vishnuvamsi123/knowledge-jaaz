'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/hero/HeroSection';

// Lazy load heavy sections for performance
const MarketDashboard = dynamic(() => import('@/components/market/MarketDashboard'), { ssr: false });
const KnowledgeHub = dynamic(() => import('@/components/knowledge/KnowledgeHub'), { ssr: false });
const PennyStockSection = dynamic(() => import('@/components/analyzer/PennyStockSection'), { ssr: false });
const FundamentalAnalyzer = dynamic(() => import('@/components/analyzer/FundamentalAnalyzer'), { ssr: false });
const BestPicks = dynamic(() => import('@/components/stocks/BestPicks'), { ssr: false });
const ComparisonTool = dynamic(() => import('@/components/stocks/ComparisonTool'), { ssr: false });
const AIAssistant = dynamic(() => import('@/components/ai/AIAssistant'), { ssr: false });
const NewsSection = dynamic(() => import('@/components/news/NewsSection'), { ssr: false });
const CommunitySection = dynamic(() => import('@/components/community/CommunitySection'), { ssr: false });
const TrustSection = dynamic(() => import('@/components/trust/TrustSection'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: '#040C1E' }}>
      <Header />

      {/* Section 1: Hero */}
      <section id="home">
        <HeroSection />
      </section>

      <div className="section-divider" />

      {/* Section 2: Live Market Dashboard */}
      <section id="markets" className="section-padding">
        <MarketDashboard />
      </section>

      <div className="section-divider" />

      {/* Section 3: Knowledge Hub */}
      <section id="learn" className="section-padding" style={{ background: 'linear-gradient(180deg, #040C1E 0%, #060F22 100%)' }}>
        <KnowledgeHub />
      </section>

      <div className="section-divider" />

      {/* Section 4: Penny Stock Analyzer */}
      <section id="penny-stocks" className="section-padding">
        <PennyStockSection />
      </section>

      <div className="section-divider" />

      {/* Section 5: Fundamental Analyzer */}
      <section id="analyzer" className="section-padding" style={{ background: 'linear-gradient(180deg, #040C1E 0%, #071739 100%)' }}>
        <FundamentalAnalyzer />
      </section>

      <div className="section-divider" />

      {/* Section 6: Best Stock Picks */}
      <section id="stocks" className="section-padding">
        <BestPicks />
      </section>

      <div className="section-divider" />

      {/* Section 7: Comparison Tool */}
      <section id="compare" className="section-padding" style={{ background: 'linear-gradient(180deg, #040C1E 0%, #060F22 100%)' }}>
        <ComparisonTool />
      </section>

      <div className="section-divider" />

      {/* Section 8: AI Assistant */}
      <section id="ai-assistant" className="section-padding">
        <AIAssistant />
      </section>

      <div className="section-divider" />

      {/* Section 9: News */}
      <section id="news" className="section-padding" style={{ background: 'linear-gradient(180deg, #040C1E 0%, #060F22 100%)' }}>
        <NewsSection />
      </section>

      <div className="section-divider" />

      {/* Section 10: Community */}
      <section id="community" className="section-padding">
        <CommunitySection />
      </section>

      <div className="section-divider" />

      {/* Section 11: Trust */}
      <section id="trust" className="section-padding" style={{ background: 'linear-gradient(180deg, #040C1E 0%, #071739 100%)' }}>
        <TrustSection />
      </section>

      <div className="section-divider" />

      <Footer />
    </main>
  );
}
