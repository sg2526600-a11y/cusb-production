// ─── HTTP Client ─────────────────────────────────────────────────────────────
// Centralised fetch wrapper. All API calls go through here.
// Swap the base implementation with axios if needed without touching call sites.

import { env } from '@/config/env';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

export type ApiResult<T> =
  | { ok: true;  data: T }
  | { ok: false; error: ApiError };

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildUrl(path: string, params?: Record<string, string | number | boolean>): string {
  const base = path.startsWith('http') ? path : `${env.apiBaseUrl}${path}`;
  if (!params) return base;
  const qs = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  );
  return `${base}?${qs.toString()}`;
}

async function handleResponse<T>(res: Response): Promise<ApiResult<T>> {
  if (res.ok) {
    try {
      const data = (await res.json()) as T;
      return { ok: true, data };
    } catch {
      return { ok: false, error: { status: res.status, message: 'Invalid JSON response' } };
    }
  }

  let message = res.statusText || 'Request failed';
  try {
    const body = (await res.json()) as { message?: string; error?: string };
    message = body.message ?? body.error ?? message;
  } catch { /* ignore */ }

  return { ok: false, error: { status: res.status, message } };
}

// ─── HTTP methods ─────────────────────────────────────────────────────────────

async function request<T>(
  path: string,
  method: string,
  options: RequestOptions = {}
): Promise<ApiResult<T>> {
  const { params, ...fetchOptions } = options;
  const url = buildUrl(path, params);

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    });
    return handleResponse<T>(res);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { ok: false, error: { status: 0, message } };
  }
}

export const http = {
  get:    <T>(path: string, opts?: RequestOptions) => request<T>(path, 'GET', opts),
  post:   <T>(path: string, body: unknown, opts?: RequestOptions) =>
            request<T>(path, 'POST', { ...opts, body: JSON.stringify(body) }),
  put:    <T>(path: string, body: unknown, opts?: RequestOptions) =>
            request<T>(path, 'PUT', { ...opts, body: JSON.stringify(body) }),
  delete: <T>(path: string, opts?: RequestOptions) => request<T>(path, 'DELETE', opts),
  patch:  <T>(path: string, body: unknown, opts?: RequestOptions) =>
            request<T>(path, 'PATCH', { ...opts, body: JSON.stringify(body) }),
};
