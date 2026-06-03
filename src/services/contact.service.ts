// ─── Contact Service ──────────────────────────────────────────────────────────
// Saves contact form submissions to DB, replaces no-op form handling

import { supabase } from '@/lib/supabase';
import type { ContactQueryRow, QueryStatus, InsertContactQuery } from '@/types/database';
import type { ContactFormData } from '@/lib/validations';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SubmitResult {
  success: boolean;
  error:   string | null;
}

export interface QueryListParams {
  status?: QueryStatus;
  search?: string;
  page?:   number;
  limit?:  number;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const contactService = {

  /** Submit contact form (public — no auth required by RLS) */
  async submit(form: ContactFormData): Promise<SubmitResult> {
    const payload: InsertContactQuery = {
      name:       form.name.trim(),
      email:      form.email.trim().toLowerCase(),
      phone:      form.phone?.trim() || null,
      subject:    form.subject.trim(),
      message:    form.message.trim(),
      user_agent: navigator.userAgent,
      ip_address: null,
    };

    const { error } = await supabase.from('contact_queries').insert(payload as any);
    if (error) return { success: false, error: error.message };
    return { success: true, error: null };
  },

  /** Admin: list queries */
  async listAdmin(params: QueryListParams = {}): Promise<{
    items: ContactQueryRow[];
    total: number;
  }> {
    const { page = 1, limit = 20, status, search } = params;

    let query = supabase
      .from('contact_queries')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (status) query = query.eq('status', status);
    if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,subject.ilike.%${search}%`);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);
    return { items: data ?? [], total: count ?? 0 };
  },

  /** Admin: update query status */
  async updateStatus(id: string, status: QueryStatus, responseText?: string): Promise<void> {
    const update: Partial<ContactQueryRow> = { status };
    if (responseText) {
      update.response_text = responseText;
      update.responded_at  = new Date().toISOString();
    }
    const { error } = await supabase.from('contact_queries').update(update as any).eq('id', id);
    if (error) throw new Error(error.message);
  },

  /** Admin: mark as spam */
  async markSpam(id: string): Promise<void> {
    await contactService.updateStatus(id, 'spam');
  },
};
