import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import type { NavDropdown as NavDropdownType, PageId } from '@/types';
import styles from './NavDropdown.module.css';

interface Props {
  item: NavDropdownType;
  isActive: boolean;
}

export default function NavDropdown({ item, isActive }: Props) {
  const { navigateTo } = useNavigation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={containerRef} style={{ display: 'contents' }}>
      <button
        className={isActive ? styles.active : ''}
        onClick={() => {
          if (item.pageId) navigateTo(item.pageId as PageId);
          else setOpen((o) => !o);
        }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="nl-btn-wrap">
          {item.labelHi && <span className="bi-hi">{item.labelHi}</span>}
          <span className="bi-en">{item.label}</span>
        </div>
      </button>

      <div className={`${styles.dropdown} ${open ? styles.dropdownOpen : ''}`} role="menu">
        {item.items.map((dd, i) => {
          if (dd.divider) return <div key={`div-${i}`} className={styles.divider} />;
          if (dd.sectionLabel) return (
            <span key={`lbl-${i}`} className={styles.label}>{dd.sectionLabel}</span>
          );
          if (dd.external && dd.href) {
            return (
              <a key={dd.label} href={dd.href} target="_blank" rel="noopener noreferrer" role="menuitem">
                {dd.label}
              </a>
            );
          }
          return (
            <button
              key={dd.label}
              role="menuitem"
              onClick={() => { dd.pageId && navigateTo(dd.pageId as PageId); setOpen(false); }}
            >
              {dd.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
