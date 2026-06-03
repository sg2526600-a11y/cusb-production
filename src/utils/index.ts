// ─── Utility Functions ────────────────────────────────────────────────────────

/**
 * Format a date string for display. Handles partial dates like "Jul 2025".
 */
export function formatDate(raw: string): string {
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return raw;
  }
}

/**
 * Truncate text to a given character limit, appending '…'.
 */
export function truncate(text: string, maxLength = 120): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Debounce: delay function calls until a quiet period elapses.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Safely get an item from localStorage; returns null on failure.
 */
export function safeLocalGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Safely set an item in localStorage; no-op on failure.
 */
export function safeLocalSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch { /* no-op */ }
}

/**
 * Build a Google search URL redirecting to the CUSB site.
 */
export function buildCusbSearchUrl(query: string): string {
  const base = 'https://www.cusb.ac.in/index.php';
  return `${base}?option=com_search&view=search&searchword=${encodeURIComponent(query)}`;
}
