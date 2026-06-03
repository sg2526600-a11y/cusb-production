// ─── Hooks ────────────────────────────────────────────────────────────────────
// React hooks for all data fetching. Uses native React patterns.
// Wire up React Query (TanStack Query) for production caching.

import { useState, useEffect, useCallback, useRef } from 'react';
import { facultyService, type FacultyListParams, type FacultyDetail } from '@/services/faculty.service';
import { noticesService, type NoticeListParams } from '@/services/notices.service';
import { authService, type AuthUser } from '@/services/auth.service';
import { supabase } from '@/lib/supabase';
import type { NoticeRow, DepartmentRow, SchoolRow } from '@/types/database';

// ─── Generic async state ──────────────────────────────────────────────────────

interface AsyncState<T> {
  data:    T | null;
  loading: boolean;
  error:   string | null;
}

function useAsync<T>(
  fn: () => Promise<T>,
  deps: unknown[] = []
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null });
  const mountedRef = useRef(true);

  const run = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await fn();
      if (mountedRef.current) setState({ data, loading: false, error: null });
    } catch (e) {
      if (mountedRef.current)
        setState({ data: null, loading: false, error: (e as Error).message });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    run();
    return () => { mountedRef.current = false; };
  }, [run]);

  return { ...state, refetch: run };
}

// ─── useFaculty ───────────────────────────────────────────────────────────────

export function useFaculty(params: FacultyListParams = {}) {
  const key = JSON.stringify(params);
  const { data, loading, error, refetch } = useAsync(
    () => facultyService.list(params),
    [key]
  );
  return {
    faculty:  data?.items ?? [],
    total:    data?.total ?? 0,
    loading,
    error,
    refetch,
  };
}

// ─── useFacultyDetail ─────────────────────────────────────────────────────────

export function useFacultyDetail(id: string | null) {
  return useAsync<FacultyDetail | null>(
    () => (id ? facultyService.getById(id) : Promise.resolve(null)),
    [id]
  );
}

// ─── useNotices ───────────────────────────────────────────────────────────────

export function useNotices(params: NoticeListParams = {}) {
  const key = JSON.stringify(params);
  const { data, loading, error, refetch } = useAsync(
    () => noticesService.list(params),
    [key]
  );

  // Realtime subscription
  useEffect(() => {
    const unsub = noticesService.subscribeToNew((notice) => {
      refetch();
      // Optionally: prepend to local state for instant update
      void notice;
    });
    return unsub;
  }, [refetch]);

  return {
    notices: data?.items ?? [] as NoticeRow[],
    total:   data?.total ?? 0,
    loading,
    error,
    refetch,
  };
}

// ─── useDepartments ───────────────────────────────────────────────────────────

export function useDepartments() {
  return useAsync<DepartmentRow[]>(async () => {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    if (error) throw new Error(error.message);
    return data ?? [];
  }, []);
}

// ─── useSchools ───────────────────────────────────────────────────────────────

export function useSchools() {
  return useAsync<(SchoolRow & { departments: DepartmentRow[] })[]>(async () => {
    const { data, error } = await supabase
      .from('schools')
      .select('*, departments(*)')
      .eq('is_active', true)
      .order('sort_order');
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as (SchoolRow & { departments: DepartmentRow[] })[];
  }, []);
}

// ─── useAuth ──────────────────────────────────────────────────────────────────

export function useAuth() {
  const [user, setUser]     = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser().then((u) => {
      setUser(u);
      setLoading(false);
    });

    const { data: sub } = authService.onAuthStateChange((u) => {
      setUser(u);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await authService.signIn(email, password);
    if (result.user) setUser(result.user);
    return result;
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setUser(null);
  }, []);

  return {
    user,
    loading,
    isLoggedIn:    !!user,
    role:          user?.profile?.role ?? 'guest',
    isAdmin:
['super_admin', 'university_admin'].includes(
  user?.profile?.role ?? ''
),
isEditor:
['super_admin', 'university_admin', 'dept_admin', 'editor'].includes(
  user?.profile?.role ?? ''
),
    signIn,
    signOut,
  };
}

// ─── useSiteSettings ──────────────────────────────────────────────────────────

export function useSiteSettings() {
  return useAsync<Record<string, unknown>>(async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');
    if (error) throw new Error(error.message);
    return Object.fromEntries((data ?? []).map((r: { key: string; value: unknown }) => [r.key, r.value]));
  }, []);
}
