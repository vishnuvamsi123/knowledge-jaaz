'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_COMMUNITY } from '@/lib/mockData';

// ─── Tag Config ───────────────────────────────────────────────────────────────

const TAG_STYLES: Record<string, string> = {
  success:  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  question: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  analysis: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  warning:  'bg-red-500/20 text-red-400 border-red-500/30',
  tip:      'bg-violet-500/20 text-violet-400 border-violet-500/30',
};

const TAG_ICONS: Record<string, string> = {
  success:  '🎉',
  question: '❓',
  analysis: '📊',
  warning:  '⚠️',
  tip:      '💡',
};

// ─── Stats ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '10L+',   label: 'Members',     icon: '👥' },
  { value: '50K+',   label: 'Discussions', icon: '💬' },
  { value: '4.9★',   label: 'Rating',      icon: '⭐' },
  { value: '24/7',   label: 'Support',     icon: '🛡️' },
];

// ─── Avatar ───────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  'from-emerald-500 to-emerald-700',
  'from-violet-500 to-violet-700',
  'from-sky-500 to-sky-700',
  'from-amber-500 to-amber-700',
  'from-rose-500 to-rose-700',
  'from-indigo-500 to-indigo-700',
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function Avatar({ name, index }: { name: string; index: number }) {
  const gradient = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div
      className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-black shadow-lg flex-shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
}

// ─── Level Badge ─────────────────────────────────────────────────────────────

function LevelBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Expert:    'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Advanced:  'bg-violet-500/20 text-violet-400 border-violet-500/30',
    Beginner:  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Moderate:  'bg-sky-500/20 text-sky-400 border-sky-500/30',
    Learner:   'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };
  const cls = map[level] ?? 'bg-white/10 text-white/50 border-white/10';
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${cls}`}>
      {level}
    </span>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: (typeof MOCK_COMMUNITY)[0]; index: number }) {
  const tagStyle = TAG_STYLES[post.tag] ?? 'bg-white/10 text-white/50 border-white/10';
  const tagIcon  = TAG_ICONS[post.tag] ?? '📌';

  function timeAgo(dateStr: string) {
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    const diff = Math.floor((now - then) / 60000);
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 hover:border-white/20 transition-all duration-300 group cursor-pointer"
    >
      {/* Author row */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar name={post.author} index={index} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white text-sm font-semibold truncate">{post.author}</span>
            <LevelBadge level={post.authorLevel} />
          </div>
          <p className="text-white/40 text-xs">{timeAgo(post.timestamp)}</p>
        </div>
        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${tagStyle}`}>
          <span>{tagIcon}</span>
          <span>{post.tag.charAt(0).toUpperCase() + post.tag.slice(1)}</span>
        </span>
      </div>

      {/* Title */}
      <h4 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
        {post.title}
      </h4>

      {/* Preview */}
      <p className="text-white/50 text-xs leading-relaxed line-clamp-3 mb-4">
        {post.preview}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-4 text-white/40 text-xs">
        <button className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{post.replies} replies</span>
        </button>
        <span className="ml-auto">👁 {post.views ?? Math.floor(Math.random() * 500 + 50)}</span>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CommunitySection() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative" id="community">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[400px] bg-violet-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4">
            <span className="text-violet-400 text-sm font-medium">🤝 Community</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-2">
            Learning Community
          </h2>
          <p className="text-white/50 text-lg">
            Join 10L+ Middle-Class Investors Learning Together
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/8 transition-colors"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {MOCK_COMMUNITY.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Browse More CTA */}
        <div className="flex justify-center mb-16">
          <button className="
            px-7 py-3 rounded-full bg-white/5 border border-white/10
            text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20
            text-sm font-semibold transition-all duration-300
          ">
            Browse All Discussions →
          </button>
        </div>

        {/* Join CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/40 via-emerald-800/20 to-violet-900/30 border border-emerald-500/20 p-10 text-center"
        >
          {/* Decorative glows */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Join 10L+ Investors Learning Together
            </h3>
            <p className="text-white/60 text-base mb-8 max-w-xl mx-auto">
              Get free access to stock analysis, community discussions, AI assistant, and weekly market insights — all in one place.
            </p>

            {joined ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold"
              >
                ✅ You're on the list! Welcome to the community.
              </motion.div>
            ) : (
              <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="
                    flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3
                    text-white placeholder-white/40 text-sm
                    focus:outline-none focus:border-emerald-500/50 focus:bg-white/15
                    transition-all duration-200
                  "
                />
                <button
                  type="submit"
                  className="
                    px-7 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400
                    text-white font-bold text-sm
                    shadow-lg shadow-emerald-500/30
                    hover:shadow-emerald-500/50 hover:scale-105
                    transition-all duration-300 flex-shrink-0
                  "
                >
                  Join Free →
                </button>
              </form>
            )}

            <p className="text-white/30 text-xs mt-4">
              Free forever · No spam · Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
