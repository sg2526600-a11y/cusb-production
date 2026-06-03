/// <reference types="vite/client" />

// ─── CSS Modules ──────────────────────────────────────────────────────────────
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

// ─── Image assets ─────────────────────────────────────────────────────────────
declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}

// ─── Environment variables ────────────────────────────────────────────────────
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?:       string;
  readonly VITE_APP_VERSION?:        string;
  readonly VITE_SUPABASE_URL?:       string;
  readonly VITE_SUPABASE_ANON_KEY?:  string;
  readonly VITE_ANTHROPIC_API_KEY?:  string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
