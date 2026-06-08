'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Clock, PlayCircle, CheckCircle, ChevronRight, BookOpen } from 'lucide-react';
import { MOCK_LESSONS } from '@/lib/mockData';
import { LessonCard } from '@/lib/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Level = 'beginner' | 'intermediate' | 'advanced';
type Language = 'EN' | 'TE';

interface TabConfig {
  key: Level;
  label: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TABS: TabConfig[] = [
  { key: 'beginner', label: 'Beginner 🌱' },
  { key: 'intermediate', label: 'Intermediate 📊' },
  { key: 'advanced', label: 'Advanced 🔬' },
];

const LEVEL_COLORS: Record<Level, string> = {
  beginner: 'from-emerald-500/30 to-teal-500/20',
  intermediate: 'from-blue-500/30 to-indigo-500/20',
  advanced: 'from-purple-500/30 to-pink-500/20',
};

const ICON_BG: Record<string, string> = {
  emerald: 'from-emerald-500 to-teal-500',
  blue: 'from-blue-500 to-indigo-500',
  gold: 'from-amber-500 to-orange-500',
};

const TELUGU_LABELS: Record<string, string> = {
  'Beginner 🌱': 'మొదలుపెట్టండి 🌱',
  'Intermediate 📊': 'మధ్యస్థం 📊',
  'Advanced 🔬': 'అడ్వాన్స్డ్ 🔬',
  'Knowledge Hub': 'జ్ఞాన కేంద్రం',
  'Start Learning →': 'నేర్చుకోండి →',
};

const TOTAL_LESSONS = 12;
const COMPLETED_LESSONS = 0;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const LevelBadge: React.FC<{ level: Level }> = ({ level }) => {
  const styles: Record<Level, string> = {
    beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    advanced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  };
  const labels: Record<Level, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${styles[level]}`}>
      {labels[level]}
    </span>
  );
};

interface LessonCardProps {
  lesson: LessonCard;
  lang: Language;
  index: number;
}

const LessonCardComponent: React.FC<LessonCardProps> = ({ lesson, lang, index }) => {
  const [hovered, setHovered] = useState(false);
  const iconGradient = ICON_BG[lesson.color] || ICON_BG.blue;
  const startLabel = lang === 'EN' ? 'Start Learning →' : TELUGU_LABELS['Start Learning →'];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${LEVEL_COLORS[lesson.level]} pointer-events-none`}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative p-5">
        {/* Icon + Level badge row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center text-2xl shadow-lg`}
          >
            {lesson.icon}
          </div>
          <LevelBadge level={lesson.level} />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-blue-300 transition-colors duration-200">
          {lesson.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/50 mb-4 leading-relaxed line-clamp-2">
          {lesson.description}
        </p>

        {/* Badges row: duration, video, quiz */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="flex items-center gap-1 text-[11px] text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            <Clock className="w-3 h-3" />
            {lesson.duration}
          </span>
          {lesson.hasVideo && (
            <span className="flex items-center gap-1 text-[11px] text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              <PlayCircle className="w-3 h-3" />
              Video
            </span>
          )}
          {lesson.hasQuiz && (
            <span className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              <CheckCircle className="w-3 h-3" />
              Quiz
            </span>
          )}
        </div>

        {/* Topic chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {lesson.topics.map((topic) => (
            <span
              key={topic}
              className="text-[10px] font-medium text-white/40 bg-white/5 px-2 py-0.5 rounded-md border border-white/5"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* CTA button — appears on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.2 }}
        >
          <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors duration-200 shadow-lg shadow-blue-600/30">
            <BookOpen className="w-4 h-4" />
            {startLabel}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Progress Bar
// ---------------------------------------------------------------------------

const ProgressTracker: React.FC<{ completed: number; total: number }> = ({
  completed,
  total,
}) => {
  const pct = Math.round((completed / total) * 100);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white/[0.04] border border-white/10 rounded-2xl p-4 mb-8">
      <div className="flex-1">
        <p className="text-sm text-white/70 mb-2">
          You've completed{' '}
          <span className="font-bold text-white">{completed}</span> of{' '}
          <span className="font-bold text-white">{total}</span> lessons
        </p>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
          />
        </div>
      </div>
      <div className="text-right">
        <span className="text-2xl font-extrabold text-white">{pct}%</span>
        <p className="text-xs text-white/40">complete</p>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const KnowledgeHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Level>('beginner');
  const [lang, setLang] = useState<Language>('EN');

  const filteredLessons = MOCK_LESSONS.filter((l) => l.level === activeTab);

  const hubTitle = lang === 'EN' ? 'Knowledge Hub' : TELUGU_LABELS['Knowledge Hub'];

  return (
    <motion.section
      id="knowledge"
      className="py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-2">
              {hubTitle}
            </h2>
            <p className="text-white/50 text-base max-w-lg">
              From zero to stock market hero — structured lessons in Telugu & English for every
              level of investor.
            </p>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 self-start sm:self-auto flex-shrink-0">
            {(['EN', 'TE'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`relative px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                  lang === l ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {lang === l && (
                  <motion.span
                    layoutId="lang-bg"
                    className="absolute inset-0 rounded-lg bg-blue-600"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Progress Tracker ── */}
        <ProgressTracker completed={COMPLETED_LESSONS} total={TOTAL_LESSONS} />

        {/* ── Tab Pills ── */}
        <LayoutGroup>
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
            {TABS.map((tab) => {
              const tabLabel = lang === 'EN' ? tab.label : TELUGU_LABELS[tab.label] ?? tab.label;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/50 hover:text-white/80 bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/30"
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{tabLabel}</span>
                  {/* Animated underline indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/60 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Lesson count badge */}
            <span className="ml-auto flex-shrink-0 text-xs text-white/30 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              {filteredLessons.length} lessons
            </span>
          </div>
        </LayoutGroup>

        {/* ── Lessons Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredLessons.map((lesson, idx) => (
              <LessonCardComponent
                key={lesson.id}
                lesson={lesson}
                lang={lang}
                index={idx}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-white/40 text-sm">
            New lessons added every week. Available in Telugu & English.
          </p>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 hover:scale-105">
            View All Lessons
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default KnowledgeHub;
