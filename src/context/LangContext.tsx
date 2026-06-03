import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Lang } from '@/types';

// ─── Context definition ───────────────────────────────────────────────────────
interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  isHi: boolean;
}

const LangContext = createContext<LangContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return (localStorage.getItem('cusb_lang') as Lang) || 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('cusb_lang', l);
    } catch {
      /* no-op */
    }
    // Sync data-lang attribute on <html> for CSS-driven bilingual display
    document.documentElement.setAttribute('data-lang', l);
  };

  // Set initial attribute on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, isHi: lang === 'hi' }}>
      {children}
    </LangContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}

// ─── Utility: pick the right string by current lang ──────────────────────────
export function useT() {
  const { lang } = useLang();
  /** Return `en` string when lang=en, `hi` string when lang=hi */
  return function t(en: string, hi?: string): string {
    return lang === 'hi' && hi ? hi : en;
  };
}
