// ─── Chatbot Service ──────────────────────────────────────────────────────────
// Persists Setu chatbot conversations. Provides FAQ lookup for hybrid responses.

import { supabase } from '@/lib/supabase';
import type { FaqRow, InsertChatLog } from '@/types/database';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SessionMessage {
  role:    'user' | 'assistant';
  content: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const chatbotService = {

  /** Log a single message to the DB */
  async logMessage(payload: InsertChatLog): Promise<void> {
    // Fire-and-forget — don't block the UI
    supabase.from('chat_logs').insert(payload as any).then(({ error }) => {
      if (error) console.warn('[Setu] Chat log failed:', error.message);
    });
  },

  /** Log full conversation at session end */
  async logSession(sessionId: string, messages: SessionMessage[], userId?: string): Promise<void> {
    const rows: InsertChatLog[] = messages.map((m) => ({
      session_id: sessionId,
      role:       m.role,
      content:    m.content,
      user_id:    userId ?? null,
    }));

    const { error } = await supabase.from('chat_logs').insert(rows as any);
    if (error) console.warn('[Setu] Session log failed:', error.message);
  },

  /** Search FAQ for a question (keyword match) */
  async searchFaq(question: string): Promise<FaqRow[]> {
    const { data } = await supabase
      .from('faq')
      .select('*')
      .eq('is_published', true)
      .ilike('question', `%${question}%`)
      .order('sort_order')
      .limit(5);
    return data ?? [];
  },

  /** Get all published FAQ (for system prompt injection) */
  async getAllFaq(): Promise<FaqRow[]> {
    const { data } = await supabase
      .from('faq')
      .select('*')
      .eq('is_published', true)
      .order('category')
      .order('sort_order');
    return data ?? [];
  },

  /** Build FAQ section for Setu system prompt */
  async buildFaqSystemContext(): Promise<string> {
    const faqs = await chatbotService.getAllFaq();
    if (!faqs.length) return '';

    const grouped = faqs.reduce<Record<string, FaqRow[]>>((acc, f) => {
      (acc[f.category] ??= []).push(f);
      return acc;
    }, {});

    const lines: string[] = ['\nFAQ DATABASE:'];
    for (const [cat, items] of Object.entries(grouped)) {
      lines.push(`\n[${cat.toUpperCase()}]`);
      for (const item of items) {
        lines.push(`Q: ${item.question}`);
        lines.push(`A: ${item.answer}`);
      }
    }
    return lines.join('\n');
  },

  // ─── Admin ────────────────────────────────────────────────────────────────

  async createFaq(payload: Omit<FaqRow, 'id' | 'created_at' | 'updated_at'>): Promise<FaqRow> {
    const { data, error } = await supabase.from('faq').insert(payload as any).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  async updateFaq(id: string, payload: Partial<FaqRow>): Promise<void> {
    const { error } = await supabase.from('faq').update(payload as any).eq('id', id);
    if (error) throw new Error(error.message);
  },

  async deleteFaq(id: string): Promise<void> {
    const { error } = await supabase.from('faq').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },

  /** Admin analytics: message count per day (last 30 days) */
  async getChatStats(): Promise<{ date: string; count: number }[]> {
    const { data } = await supabase.rpc('chat_stats_last_30_days');
    return data ?? [];
  },
};
