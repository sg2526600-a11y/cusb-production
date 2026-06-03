// ─── Auth Service ─────────────────────────────────────────────────────────────
// Wraps Supabase Auth. All auth operations go through here.

import { supabase } from '@/lib/supabase';
import type { ProfileRow, UserRole } from '@/types/database';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id:       string;
  email:    string;
  profile:  ProfileRow | null;
}

export interface SignInResult {
  user:  AuthUser | null;
  error: string | null;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const authService = {

  /** Email + password sign in */
  async signIn(email: string, password: string): Promise<SignInResult> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { user: null, error: error.message };

    const profile = await authService.getProfile(data.user.id);
    return {
      user: {
        id:      data.user.id,
        email:   data.user.email ?? '',
        profile,
      },
      error: null,
    };
  },

  /** Sign out current session */
  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  },

  /** Get current session */
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  /** Get current user with profile */
  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const profile = await authService.getProfile(user.id);
    return { id: user.id, email: user.email ?? '', profile };
  },

  /** Get profile for a user ID */
  async getProfile(userId: string): Promise<ProfileRow | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      if (error) {
        console.error('getProfile error:', error);
        return null;
      }
    return data;
  },

  /** Update own profile */
  async updateProfile(userId: string, updates: Partial<ProfileRow>): Promise<{ error: string | null }> {
    const { error } = await supabase
      .from('profiles')
      .update(updates as any)
      .eq('id', userId);
    return { error: error?.message ?? null };
  },

  /** Check if current user has at least a given role */
  async hasRole(minRole: UserRole): Promise<boolean> {
    const user = await authService.getCurrentUser();
    if (!user?.profile) return minRole === 'guest';

    const hierarchy: UserRole[] = ['guest', 'student', 'faculty', 'editor', 'dept_admin', 'university_admin', 'super_admin'];
    const currentIdx = hierarchy.indexOf(user.profile.role);
    const requiredIdx = hierarchy.indexOf(minRole);
    return currentIdx >= requiredIdx;
  },

  /** Reset password by email */
  async resetPassword(email: string): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    return { error: error?.message ?? null };
  },

  /** Subscribe to auth state changes */
  onAuthStateChange(cb: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) return cb(null);
      const profile = await authService.getProfile(session.user.id);
      cb({ id: session.user.id, email: session.user.email ?? '', profile });
    });
  },
};
