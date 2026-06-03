import { Link } from 'react-router-dom';
import styles from './TopBar.module.css';
import { TOP_BAR_LINKS } from '@/constants/nav';
import LangToggle from '@/components/ui/LangToggle';

export default function TopBar() {
  return (
    <div id="tb" className={styles.topBar} role="banner">
      {/* Left: quick links */}
      <div className={styles.left}>
        {TOP_BAR_LINKS.slice(0, 3).map((link) =>
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title="Opens in new tab"
            >
              {link.label}
            </a>
          ) : (
            <Link key={link.label} to={link.href}>
              {link.label}
            </Link>
          )
        )}
      </div>

      {/* Right: search + lang toggle */}
      <div className={styles.right}>
        <input
          className={styles.search}
          type="search"
          placeholder="🔍 Search CUSB…"
          aria-label="Search the CUSB website"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const q = (e.target as HTMLInputElement).value.trim();
              if (q) window.open(`https://www.cusb.ac.in/index.php?option=com_search&view=search&searchword=${encodeURIComponent(q)}`, '_blank');
            }
          }}
        />
        <LangToggle />
      </div>
    </div>
  );
}
