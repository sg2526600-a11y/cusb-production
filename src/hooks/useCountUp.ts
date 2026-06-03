import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `target` when the element enters the viewport.
 * Supports floats and suffix strings (e.g. "5K+", "3.58", "300").
 */
export function useCountUp(rawValue: string, duration = 1400) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(rawValue);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const num = parseFloat(rawValue.replace(/[^0-9.]/g, ''));
    const suffix = rawValue.replace(/[0-9.]/g, '').trim();
    const isFloat = rawValue.includes('.');

    if (isNaN(num)) return; // non-numeric value (e.g. "2009" is fine, "N/A" skip)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || animated.current) return;
          animated.current = true;

          let start: number | null = null;
          const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
            const current = num * ease;
            setDisplay((isFloat ? current.toFixed(1) : Math.floor(current)) + suffix);
            if (progress < 1) requestAnimationFrame(step);
            else setDisplay(rawValue); // restore exact value at end
          };

          requestAnimationFrame(step);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rawValue, duration]);

  return { ref, display };
}
