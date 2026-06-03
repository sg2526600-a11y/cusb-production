// ─── Setu Chatbot (Supabase-backed) ──────────────────────────────────────────
// Extends the original SetuChatbot with:
//   • Chat session logging to Supabase chat_logs table
//   • FAQ lookup from Supabase faq table (injected into system prompt)
//   • Session ID generated per mount
// All UI is preserved exactly as-is from the original component.

import { useState, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SETU_NOTICES, SETU_TICKERS } from '@/constants/notices';
import { SITE_CONFIG } from '@/constants/site';
import type { ChatMessage } from '@/types';
import { chatbotService } from '@/services/chatbot.service';
import styles from './SetuChatbot.module.css';

// ─── System prompt (original — FAQ appended dynamically) ─────────────────────
const BASE_SYSTEM_PROMPT = `You are CUSB Setu (सेतु), the official AI assistant for Central University of South Bihar (CUSB), Gaya, Bihar, India. You are knowledgeable, warm, helpful, and precise.

UNIVERSITY FACTS:
- Full name: Central University of South Bihar (CUSB)
- Location: NH-120, Panchanpur, Gaya – 824236, Bihar
- Established: 2009 (Parliament of India — Central Universities Act)
- NAAC: A++ (CGPA 3.58)
- Vice-Chancellor: Prof. K. N. Singh
- Phone: +91-631-2229530 | Email: admission@cusb.ac.in
- Programmes: UG, PG, Ph.D. across 26 departments
- Admission: CUET-PG (for PG) via NTA | Portal: cusbadm.samarth.edu.in
- Ph.D.: URET (University Research Entrance Test) conducted by CUSB
- Anti-ragging helpline: 1800-180-5522 (toll-free 24×7)
- Scholarship: NSP (scholarships.gov.in), Bihar e-Kalyan, INSPIRE, UGC-JRF
- Hostels: Boys (500 seats), Girls (300 seats), fee Rs 8,000/semester

CURRENT NOTICE DATABASE:
${JSON.stringify(SETU_NOTICES, null, 2)}

INSTRUCTIONS:
- Answer ONLY about CUSB and related university/education topics.
- For off-topic questions, politely redirect to CUSB matters.
- Always cite specific notice titles, file numbers, dates, and portal URLs when relevant.
- For exam/result queries, always point to: cusb.ac.in/index.php?Itemid=194&id=79&option=com_content&view=article
- For admissions, always point to: cusbadm.samarth.edu.in
- Format responses clearly. Use **bold** for key terms. Use - for bullet lists.
- Keep responses concise (under 200 words) unless detail is needed.
- Use friendly, professional tone. Emojis sparingly.
- Respond in the same language as the user (English or Hindi).
- If asked in Hindi, respond in Hindi with Devanagari script.`;

// ─── Quick actions — original unchanged ──────────────────────────────────────
interface QuickAction { label: string; prompt: string; icon: string }

const QUICK_ACTIONS: QuickAction[] = [
  { icon: '🎓', label: 'Admission Process', prompt: 'How do I apply for admission to CUSB?' },
  { icon: '📅', label: 'Exam Schedule',     prompt: 'What is the current exam schedule at CUSB?' },
  { icon: '🏠', label: 'Hostel Info',       prompt: 'Tell me about hostel facilities at CUSB.' },
  { icon: '🔬', label: 'Research / PhD',    prompt: 'How can I apply for PhD at CUSB?' },
  { icon: '💰', label: 'Scholarships',      prompt: 'What scholarships are available at CUSB?' },
  { icon: '📋', label: 'Latest Notices',    prompt: 'Show me the latest notices from CUSB.' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function SetuChatbot() {
  const sessionId = useRef<string>(uuidv4());
  const [isOpen,     setIsOpen]     = useState(false);
  const [messages,   setMessages]   = useState<ChatMessage[]>([]);
  const [input,      setInput]      = useState('');
  const [isLoading,  setIsLoading]  = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(BASE_SYSTEM_PROMPT);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);
  const loggedCount    = useRef(0); // track already-logged messages

  // ── Load FAQ from Supabase and append to system prompt ───────────────────
  useEffect(() => {
    chatbotService.buildFaqSystemContext().then((faqContext) => {
      if (faqContext) setSystemPrompt(BASE_SYSTEM_PROMPT + faqContext);
    });
  }, []);

  // ── Scroll to bottom on new messages ─────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Focus input when chat opens ───────────────────────────────────────────
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  // ── Log new messages to Supabase (debounced on each new message) ──────────
  useEffect(() => {
    if (messages.length === 0) return;
    const unlogged = messages.slice(loggedCount.current);
    if (!unlogged.length) return;

    unlogged.forEach((msg) => {
      chatbotService.logMessage({
        session_id: sessionId.current,
        role:       msg.role,
        content:    msg.content,
        user_id:    null,
      });
    });
    loggedCount.current = messages.length;
  }, [messages]);

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: trimmed, timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method:  'POST',
        headers: {
          'Content-Type':      'application/json',
          'x-api-key':         (import.meta.env.VITE_ANTHROPIC_API_KEY as string) ?? '',
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model:      'claude-opus-4-20250514',
          max_tokens: 1024,
          system:     systemPrompt,
          messages:   history,
        }),
      });

      if (!response.ok) throw new Error(`API error ${response.status}`);
      const data = await response.json() as { content: { type: string; text: string }[] };
      const reply = data.content.find((c) => c.type === 'text')?.text ?? 'I could not generate a response.';

      setMessages((m) => [
        ...m,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: reply, timestamp: new Date() },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          id:        (Date.now() + 1).toString(),
          role:      'assistant',
          content:   '⚠️ I\'m having trouble connecting right now. Please try again in a moment or contact us directly at admission@cusb.ac.in.',
          timestamp: new Date(),
        },
      ]);
      console.error('[Setu]', err);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, systemPrompt]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={styles.wrap}>
      {/* Floating button */}
      <button
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? 'Close Setu chatbot' : 'Open Setu chatbot'}
        title="Chat with CUSB Setu"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className={styles.panel} role="dialog" aria-label="CUSB Setu Chatbot">
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>🎓</div>
              <div>
                <div className={styles.botName}>CUSB Setu</div>
                <div className={styles.botStatus}>
                  <span className={styles.statusDot} />
                  {isLoading ? 'Typing…' : 'Online'}
                </div>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close">✕</button>
          </div>

          {/* Ticker (original) */}
          {SETU_TICKERS.length > 0 && (
            <div className={styles.ticker}>
              <span className={styles.tickerLabel}>📢 Latest:</span>
              <span className={styles.tickerText}>{SETU_TICKERS[0]}</span>
            </div>
          )}

          {/* Messages */}
          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.welcome}>
                <p className={styles.welcomeText}>
                  Namaste! 🙏 I'm <strong>Setu</strong>, your CUSB assistant.
                  Ask me about admissions, exams, hostels, scholarships, or anything about {SITE_CONFIG.shortName}.
                </p>
                <div className={styles.quickActions}>
                  {QUICK_ACTIONS.map((qa) => (
                    <button key={qa.label} className={styles.quickBtn} onClick={() => sendMessage(qa.prompt)}>
                      {qa.icon} {qa.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`${styles.message} ${styles[msg.role]}`}>
                <div className={styles.bubble}>
                  <MessageContent content={msg.content} />
                </div>
                <div className={styles.timestamp}>
                  {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.bubble}>
                  <span className={styles.typing}>
                    <span /><span /><span />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder="Ask about CUSB…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              disabled={isLoading}
              maxLength={500}
            />
            <button
              className={styles.sendBtn}
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Inline markdown renderer (bold / links / bullets) ────────────────────────
function MessageContent({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        if (line.startsWith('- ') || line.startsWith('• ')) {
          return <div key={i} className={styles.bullet}>• {renderInline(line.slice(2))}</div>;
        }
        return <p key={i} className={styles.para}>{renderInline(line)}</p>;
      })}
    </>
  );
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}
