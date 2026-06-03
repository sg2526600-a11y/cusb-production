// ─── Notices API (v2 — Supabase) ─────────────────────────────────────────────
// Drop-in replacement for the original static fallback version.
// All callers that imported noticesApi.list() / noticesApi.getById() continue to
// work without any changes; they now hit Supabase instead of static data.

import { noticesService } from '@/services/notices.service';
import type { NoticeRow, NoticeType } from '@/types/database';

// ─── Legacy shape (used by existing components) ───────────────────────────────
// Maps the DB row to the original Notice interface so no consumer needs editing.

export interface Notice {
  id:       string;
  type:     NoticeType;
  title:    string;
  url:      string | null;
  pdf_url:  string | null;
  isNew:    boolean;
  isPinned: boolean;
  date:     string | null;
}

function toNotice(row: NoticeRow): Notice {
  return {
    id:       row.id,
    type:     row.type,
    title:    row.title,
    url:      row.url,
    pdf_url:  row.pdf_url,
    isNew:    row.is_new,
    isPinned: row.is_pinned,
    date:     row.notice_date ?? row.published_at ?? null,
  };
}

export interface NoticesListParams {
  page?:  number;
  limit?: number;
  tag?:   NoticeType;
  isNew?: boolean;
}

export interface NoticesListResponse {
  items: Notice[];
  total: number;
  page:  number;
  limit: number;
}

// ─── Shim: same interface as original noticesApi ──────────────────────────────

export const noticesApi = {
  /** List notices — exact same signature as the original */
  list: async (params: NoticesListParams = {}): Promise<NoticesListResponse> => {
    const result = await noticesService.list({
      page:  params.page,
      limit: params.limit,
      type:  params.tag,
      isNew: params.isNew,
    });
    return {
      items: result.items.map(toNotice),
      total: result.total,
      page:  result.page,
      limit: result.limit,
    };
  },

  getById: async (id: string): Promise<Notice | null> => {
    const row = await noticesService.getById(id);
    return row ? toNotice(row) : null;
  },
};
