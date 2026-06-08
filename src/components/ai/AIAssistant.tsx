'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AI_RESPONSES } from '@/lib/mockData';
import type { ChatMessage } from '@/lib/types';

// ─── Suggested Prompts ────────────────────────────────────────────────────────

const SUGGESTED_PROMPTS = [
  'Explain Tata Motors like a beginner',
  'What is PE Ratio?',
  'How does SIP work?',
  'Tell me about Reliance Industries',
  'What is intrinsic value?',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('tata motors')) return AI_RESPONSES['tata motors'];
  if (lower.includes('reliance')) return AI_RESPONSES['reliance'];
  if (lower.includes('pe ratio') || lower.includes('p/e') || lower.includes('pe')) return AI_RESPONSES['pe ratio'];
  if (lower.includes('sip')) return AI_RESPONSES['sip'];
  if (lower.includes('stock market') || lower.includes('what is stock')) return AI_RESPONSES['stock market'];
  if (lower.includes('intrinsic value')) return AI_RESPONSES['intrinsic value'] ?? AI_RESPONSES['default'];

  return AI_RESPONSES['default'];
}

// ─── Parse simple markdown-like bold ──────────────────────────────────────────

function ParsedText({ text }: { text: string }) {
  // Split on **...** and render bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-lg shadow-emerald-500/30">
          KJ
        </div>
      )}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-lg shadow-violet-500/30">
          U
        </div>
      )}

      {/* Bubble */}
      <div
        className={`
          max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isUser
            ? 'bg-emerald-500/20 border border-emerald-500/30 text-white/90 rounded-br-sm'
            : 'bg-white/8 border border-white/10 text-white/80 rounded-bl-sm backdrop-blur-sm'
          }
        `}
      >
        {message.role === 'assistant'
          ? <ParsedText text={message.content} />
          : <span>{message.content}</span>
        }
        <p className={`text-[10px] mt-1.5 ${isUser ? 'text-emerald-300/50 text-right' : 'text-white/30'}`}>
          {new Date(message.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
        KJ
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/8 border border-white/10 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: AI_RESPONSES['default'],
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  async function handleSend(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || isTyping) return;
    setInput('');

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: msg,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate 1.5 second typing delay
    await new Promise((r) => setTimeout(r, 1500));

    const aiReply: ChatMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: getAIResponse(msg),
      timestamp: new Date().toISOString(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiReply]);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative" id="ai-assistant">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          {/* Gemini-inspired badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 text-sm font-semibold">
              ✨ Powered by Gemini AI
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
            AI Learning Assistant
          </h2>
          <p className="text-white/50 text-lg">
            Ask anything about stocks, markets & personal finance — in plain Hindi or English
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm"
        >
          {/* Chat Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-emerald-500/30">
              KJ
            </div>
            <div>
              <p className="text-white font-semibold text-sm">KJ Learning AI</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs">Online — ready to teach</span>
              </div>
            </div>
            <div className="ml-auto">
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
                Gemini ✨
              </span>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex flex-col gap-4 p-5 overflow-y-auto"
            style={{ maxHeight: '500px', minHeight: '300px' }}
          >
            <AnimatePresence>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <TypingIndicator />
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={isTyping}
                className="
                  text-xs px-3 py-1.5 rounded-full
                  bg-white/5 border border-white/10 text-white/60
                  hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-300
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition-all duration-200
                "
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <div className="px-5 pb-5">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus-within:border-emerald-500/40 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                placeholder="Ask me anything about stocks, SIP, PE ratio..."
                className="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none py-1 disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="
                  w-9 h-9 rounded-full flex items-center justify-center
                  bg-emerald-500 hover:bg-emerald-400
                  disabled:opacity-30 disabled:cursor-not-allowed
                  transition-all duration-200 shadow-lg shadow-emerald-500/30
                  flex-shrink-0
                "
              >
                <svg className="w-4 h-4 text-white rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="px-5 pb-4 flex items-center gap-2">
            <span className="text-amber-400 text-xs">⚠️</span>
            <p className="text-white/30 text-xs">
              Educational AI only. Not financial advice. Consult a SEBI-registered advisor before investing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
