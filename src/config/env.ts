// ─── Environment Configuration ───────────────────────────────────────────────
// Centralised env access. Never read import.meta.env directly elsewhere.

interface EnvConfig {
  readonly apiBaseUrl:      string;
  readonly supabaseUrl:     string;
  readonly supabaseAnonKey: string;
  readonly isDev:           boolean;
  readonly isProd:          boolean;
  readonly appVersion:      string;
}

function createEnvConfig(): EnvConfig {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      '[CUSB] Missing Supabase env vars. ' +
      'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
    );
  }

  return {
    apiBaseUrl:      (import.meta.env.VITE_API_BASE_URL as string) ?? '/api/v1',
    supabaseUrl:     supabaseUrl ?? '',
    supabaseAnonKey: supabaseAnonKey ?? '',
    isDev:           import.meta.env.DEV,
    isProd:          import.meta.env.PROD,
    appVersion:      (import.meta.env.VITE_APP_VERSION as string) ?? '1.0.0',
  };
}

export const env = createEnvConfig();
