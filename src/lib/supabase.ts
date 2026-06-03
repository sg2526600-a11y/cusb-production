// ─── Supabase Client ──────────────────────────────────────────────────────────
// Single import point for all Supabase interactions.
// Import { supabase } from '@/lib/supabase'

import { createClient } from '@supabase/supabase-js';
import { env } from '@/config/env';

// ─── Client (anon key — safe for browser) ─────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase = createClient<any>(
  env.supabaseUrl,
  env.supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession:   true,
      detectSessionInUrl: true,
    },
    realtime: {
      params: { eventsPerSecond: 10 },
    },
  }
);

// ─── Storage helpers ──────────────────────────────────────────────────────────

export const BUCKETS = {
  FACULTY_IMAGES: 'faculty-images',
  FACULTY_CV:     'faculty-cv',
  NOTICES:        'notices',
  DOCUMENTS:      'documents',
  GALLERY:        'gallery',
  EVENTS:         'events',
  NEWS:           'news',
  RESEARCH:       'research',
  DOWNLOADS:      'downloads',
  HERO_IMAGES:    'hero-images',
} as const;

export type BucketName = (typeof BUCKETS)[keyof typeof BUCKETS];

/** Get public URL for any storage object */
export function getPublicUrl(bucket: BucketName, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/** Upload a file and return its public URL */
export async function uploadFile(
  bucket: BucketName,
  path: string,
  file: File,
  options?: { upsert?: boolean; contentType?: string }
): Promise<{ url: string; error: null } | { url: null; error: string }> {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert:      options?.upsert ?? false,
    contentType: options?.contentType ?? file.type,
  });
  if (error) return { url: null, error: error.message };
  return { url: getPublicUrl(bucket, path), error: null };
}

/** Delete a file from storage */
export async function deleteFile(bucket: BucketName, path: string): Promise<boolean> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  return !error;
}

// ─── Realtime helpers ─────────────────────────────────────────────────────────

/** Subscribe to changes on a table */
export function subscribeToTable<T extends Record<string, unknown>>(
  table: string,
  callback: (payload: { new: T; old: T; eventType: 'INSERT' | 'UPDATE' | 'DELETE' }) => void,
  filter?: string
) {
  const channel = supabase
    .channel(`realtime:${table}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table, filter },
      (payload) => callback(payload as unknown as Parameters<typeof callback>[0])
    )
    .subscribe();
  return () => supabase.removeChannel(channel);
}
