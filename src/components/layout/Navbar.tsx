import { forwardRef } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { NAV_ITEMS } from '@/constants/nav';
import { SITE_CONFIG } from '@/constants/site';
import NavDropdown from '@/components/nav/NavDropdown';
import NavMegaMenu from '@/components/nav/NavMegaMenu';
import styles from './Navbar.module.css';
import type { PageId } from '@/types';

interface NavbarProps {
  onMobileMenuToggle: () => void;
  mobileMenuOpen?: boolean;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>(({ onMobileMenuToggle, mobileMenuOpen = false }, ref) => {
  const { currentPage, navigateTo } = useNavigation();

  return (
    <header id="nb" ref={ref} className={styles.navbar} role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <a
        className={styles.logo}
        onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
        href="#home"
        aria-label="CUSB Home"
      >
        <img
          className={styles.logoImg}
          src="/images/cusb-logo.png"
          alt="CUSB Logo"
          width={56}
          height={56}
        />
        <div className={`logo-t ${styles.logoText}`}>
          <span className="bi-hi">{SITE_CONFIG.nameHi}</span>
          <span className={styles.un}>{SITE_CONFIG.name}</span>
          <span className={styles.mo}>{SITE_CONFIG.motto}</span>
        </div>
      </a>

      {/* Desktop navigation */}
      <nav aria-label="Site sections">
        <ul className={styles.navList} role="menubar">
          {NAV_ITEMS.map((item) => {
            const isActive = item.type === 'link'
              ? currentPage === item.pageId
              : 'pageId' in item && currentPage === item.pageId;

            if (item.type === 'link') {
              return (
                <li key={item.label} role="none">
                  <button
                    role="menuitem"
                    className={isActive ? styles.active : ''}
                    onClick={() => navigateTo(item.pageId as PageId)}
                  >
                    <div className="nl-btn-wrap">
                      {item.labelHi && <span className="bi-hi">{item.labelHi}</span>}
                      <span className="bi-en">{item.label}</span>
                    </div>
                  </button>
                </li>
              );
            }

            if (item.type === 'dropdown') {
              return (
                <li key={item.label} className={styles.hasDd} role="none">
                  <NavDropdown item={item} isActive={isActive} />
                </li>
              );
            }

            if (item.type === 'mega') {
              return (
                <li key={item.label} className={styles.hasMega} role="none">
                  <NavMegaMenu item={item} isActive={isActive} />
                </li>
              );
            }

            return null;
          })}

          {/* Apply CTA */}
          <li role="none">
            <a
              className={styles.cta}
              href="https://cusbadm.samarth.edu.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now →
            </a>
          </li>
        </ul>
      </nav>

      {/* Hamburger (mobile) — animates to × when menu is open */}
      <button
        id="hbg"
        className={styles.hamburger}
        onClick={onMobileMenuToggle}
        aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileMenuOpen}
      >
        <span style={{
          transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          transition: 'transform .2s ease',
        }} />
        <span style={{
          opacity: mobileMenuOpen ? 0 : 1,
          transition: 'opacity .2s ease',
        }} />
        <span style={{
          transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          transition: 'transform .2s ease',
        }} />
      </button>
    </header>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
