// ─── Notices Service ──────────────────────────────────────────────────────────
// Replaces static src/constants/notices.ts and src/api/notices.ts
// Drop-in replacement: same return shape as original noticesApi

import { supabase, subscribeToTable } from '@/lib/supabase';
import type { NoticeRow, NoticeType, InsertNotice } from '@/types/database';

// ─── Query types ──────────────────────────────────────────────────────────────

export interface NoticeListParams {
  type?:         NoticeType;
  isNew?:        boolean;
  isPinned?:     boolean;
  departmentId?: string;
  search?:       string;
  page?:         number;
  limit?:        number;
}

export interface NoticeListResponse {
  items: NoticeRow[];
  total: number;
  page:  number;
  limit: number;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const noticesService = {

  /** List published notices — matches original noticesApi.list() signature */
  async list(params: NoticeListParams = {}): Promise<NoticeListResponse> {
    const { page = 1, limit = 20, type, isNew, isPinned, departmentId, search } = params;

    let query = supabase
      .from('notices')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString())
      .order('is_pinned', { ascending: false })
      .order('published_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (type)         query = query.eq('type', type);
    if (isNew !== undefined) query = query.eq('is_new', isNew);
    if (isPinned !== undefined) query = query.eq('is_pinned', isPinned);
    if (departmentId) query = query.eq('department_id', departmentId);
    if (search)       query = query.ilike('title', `%${search}%`);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    return { items: data ?? [], total: count ?? 0, page, limit };
  },

  /** Get by ID */
  async getById(id: string): Promise<NoticeRow | null> {
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  },

  /** Admin: list ALL notices (including unpublished) */
  async listAdmin(params: NoticeListParams = {}): Promise<NoticeListResponse> {
    const { page = 1, limit = 30, type, departmentId, search } = params;

    let query = supabase
      .from('notices')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (type)         query = query.eq('type', type);
    if (departmentId) query = query.eq('department_id', departmentId);
    if (search)       query = query.ilike('title', `%${search}%`);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);
    return { items: data ?? [], total: count ?? 0, page, limit };
  },

  /** Create notice */
  async create(payload: InsertNotice): Promise<NoticeRow> {
    const { data, error } = await supabase
      .from('notices')
      .insert(payload as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  /** Update notice */
  async update(id: string, payload: Partial<NoticeRow>): Promise<NoticeRow> {
    const { data, error } = await supabase
      .from('notices')
      .update(payload as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  /** Delete notice */
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('notices').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },

  /** Pin / unpin notice */
  async togglePin(id: string, isPinned: boolean): Promise<void> {
    await noticesService.update(id, { is_pinned: isPinned });
  },

  /** Publish / unpublish */
  async togglePublish(id: string, isPublished: boolean): Promise<void> {
    await noticesService.update(id, {
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : undefined,
    });
  },

  /** Subscribe to realtime notice inserts */
  subscribeToNew(callback: (notice: NoticeRow) => void): () => void {
    return subscribeToTable<NoticeRow & Record<string, unknown>>(
      'notices',
      ({ new: notice, eventType }) => {
        if (eventType === 'INSERT' && notice.is_published) callback(notice);
      }
    );
  },
};
