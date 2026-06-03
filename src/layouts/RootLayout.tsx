// ─── Root Layout ──────────────────────────────────────────────────────────────
// Wraps every page with the shared shell: TopBar, Navbar, MobileMenu, Footer.
// Owns global scroll behaviors (progress bar, back-to-top, navbar blur).

import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import TopBar     from '@/components/layout/TopBar';
import Navbar     from '@/components/layout/Navbar';
import MobileMenu from '@/components/layout/MobileMenu';
import Footer     from '@/components/layout/Footer';
import SetuChatbot from '@/components/chatbot/SetuChatbot';

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function PageSkeleton() {
  return (
    <div
      style={{
        minHeight:      '60vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', color: 'var(--is)' }}>
        <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🏛️</div>
        <div style={{ fontSize: '.85rem' }}>Loading…</div>
      </div>
    </div>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progRef   = useRef<HTMLDivElement>(null);
  const bttRef    = useRef<HTMLButtonElement>(null);
  const nbRef     = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const location  = useLocation();

  // Scroll-to-top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll progress + back-to-top + nav blur
  useEffect(() => {
    const onScroll = () => {
      const st   = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (progRef.current) {
        progRef.current.style.width = `${docH > 0 ? (st / docH) * 100 : 0}%`;
      }
      bttRef.current?.classList.toggle('show', st > 400);
      nbRef.current?.classList.toggle('scrolled', st > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Loading screen dismissal
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;
    const t = setTimeout(() => loader.classList.add('hidden'), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Loading screen */}
      <div id="loader" ref={loaderRef}>
        <img
          className="loader-logo"
          src="https://www.cusb.ac.in/images/cusb/logo.png"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          alt="CUSB"
        />
        <div className="loader-text">Central University of South Bihar</div>
      </div>

      {/* Scroll progress */}
      <div id="scroll-prog" ref={progRef} role="progressbar" aria-hidden="true" />

      {/* Navigation */}
      <TopBar />
      <Navbar ref={nbRef} onMobileMenuToggle={() => setMobileMenuOpen((p) => !p)} mobileMenuOpen={mobileMenuOpen} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Page content — Outlet renders matched child route */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to top */}
      <button
        id="btt"
        ref={bttRef}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* AI Chatbot */}
      <SetuChatbot />
    </>
  );
}

export { PageSkeleton };
