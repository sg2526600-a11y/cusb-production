import { useState, useEffect } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { SITE_CONFIG } from '@/constants/site';
import styles from './MobileMenu.module.css';
import type { PageId } from '@/types';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  const { navigateTo } = useNavigation();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#mm')) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  const go = (page: PageId) => { navigateTo(page); onClose(); };
  const toggle = (key: string) => setExpanded((p) => (p === key ? null : key));

  return (
    <div id="mm" className={`${styles.menu} ${open ? styles.open : ''}`} role="dialog" aria-label="Mobile navigation">

      {/* Home */}
      <div className={styles.section}>
        <button className={styles.toggle} onClick={() => go('home')}>🏠 Home</button>
      </div>

      {/* About */}
      <div className={styles.section}>
        <button className={`${styles.toggle} ${expanded === 'about' ? styles.open : ''}`} onClick={() => toggle('about')}>
          🏛️ परिचय / About CUSB <span className={styles.arr}>▾</span>
        </button>
        {expanded === 'about' && (
          <div className={styles.sub}>
            <button onClick={() => go('about')}>About CUSB</button>
            <button onClick={() => go('about')}>History &amp; Development</button>
            <button onClick={() => go('about')}>Vision &amp; Mission</button>
            <button onClick={() => go('contact')}>How to Reach CUSB</button>
            <span className={styles.subLabel}>Statutory Bodies</span>
            <button onClick={() => go('about')}>Executive Council</button>
            <button onClick={() => go('about')}>Academic Council</button>
            <button onClick={() => go('about')}>Finance Committee</button>
            <span className={styles.subLabel}>Resources</span>
            <button onClick={() => go('news')}>Notices</button>
            <a href="https://www.cusb.ac.in/index.php?option=com_phocagallery&view=category&id=2" target="_blank" rel="noopener noreferrer">Photo Gallery ↗</a>
            <a href="https://www.cusb.ac.in/index.php?option=com_content&view=article&id=220" target="_blank" rel="noopener noreferrer">RTI Portal ↗</a>
          </div>
        )}
      </div>

      {/* Administration */}
      <div className={styles.section}>
        <button className={`${styles.toggle} ${expanded === 'admin' ? styles.open : ''}`} onClick={() => toggle('admin')}>
          🏛️ प्रशासन / Administration <span className={styles.arr}>▾</span>
        </button>
        {expanded === 'admin' && (
          <div className={styles.sub}>
            <span className={styles.subLabel}>Leadership</span>
            <button onClick={() => go('about')}>Visitor — Smt. Droupadi Murmu</button>
            <button onClick={() => go('about')}>Chancellor</button>
            <button onClick={() => go('about')}>Vice-Chancellor</button>
            <button onClick={() => go('about')}>Pro-Vice Chancellor</button>
            <button onClick={() => go('about')}>Dean of Student Welfare</button>
            <span className={styles.subLabel}>Officers</span>
            <button onClick={() => go('about')}>Registrar</button>
            <button onClick={() => go('about')}>Finance Officer</button>
            <button onClick={() => go('about')}>Controller of Examinations</button>
            <button onClick={() => go('about')}>Librarian</button>
            <span className={styles.subLabel}>Faculty</span>
            <button onClick={() => go('faculty')}>Faculty &amp; Staff</button>
            <span className={styles.subLabel}>Quality &amp; Infrastructure</span>
            <button onClick={() => go('iqac')}>✅ IQAC</button>
            <button onClick={() => go('infrastructure')}>🏗️ Infrastructure</button>
          </div>
        )}
      </div>

      {/* Academics */}
      <div className={styles.section}>
        <button className={`${styles.toggle} ${expanded === 'academics' ? styles.open : ''}`} onClick={() => toggle('academics')}>
          📚 शैक्षणिक / Academics <span className={styles.arr}>▾</span>
        </button>
        {expanded === 'academics' && (
          <div className={styles.sub}>
            <button onClick={() => go('academics')}>Academics Overview</button>
            <button onClick={() => go('departments')}>All 26 Departments</button>
            <span className={styles.subLabel}>🌿 Earth, Biological &amp; Env. Sciences</span>
            <a href="https://www.cusb.ac.in/index.php?option=com_content&view=article&id=31" target="_blank" rel="noopener noreferrer">Bioinformatics ↗</a>
            <a href="https://www.cusb.ac.in/index.php?option=com_content&view=article&id=36" target="_blank" rel="noopener noreferrer">Life Science ↗</a>
            <a href="https://www.cusb.ac.in/index.php?option=com_content&view=article&id=34" target="_blank" rel="noopener noreferrer">Biotechnology ↗</a>
            <span className={styles.subLabel}>📐 Math, Stats &amp; CS</span>
            <a href="https://www.cusb.ac.in/index.php?option=com_content&view=article&id=56" target="_blank" rel="noopener noreferrer">Mathematics ↗</a>
            <a href="https://www.cusb.ac.in/index.php?option=com_content&view=article&id=55" target="_blank" rel="noopener noreferrer">Statistics ↗</a>
            <a href="https://www.cusb.ac.in/index.php?option=com_content&view=article&id=57" target="_blank" rel="noopener noreferrer">Computer Science ↗</a>
          </div>
        )}
      </div>

      {/* Departments */}
      <div className={styles.section}>
        <button className={styles.toggle} onClick={() => go('departments')}>🏛️ Departments</button>
      </div>

      {/* Research */}
      <div className={styles.section}>
        <button className={`${styles.toggle} ${expanded === 'research' ? styles.open : ''}`} onClick={() => toggle('research')}>
          🔬 अनुसंधान / Research <span className={styles.arr}>▾</span>
        </button>
        {expanded === 'research' && (
          <div className={styles.sub}>
            <button onClick={() => go('research')}>Research Overview</button>
            <span className={styles.subLabel}>Facilities</span>
            <button onClick={() => go('infrastructure')}>Central Instrumental Facility (CIF)</button>
            <button onClick={() => go('infrastructure')}>University Computer Centre (UCC)</button>
            <button onClick={() => go('infrastructure')}>Rajarshi Janak Central Library</button>
            <span className={styles.subLabel}>Programmes</span>
            <button onClick={() => go('research')}>Ph.D. Programmes (URET)</button>
            <button onClick={() => go('research')}>Seed Money Projects</button>
            <button onClick={() => go('research')}>Sponsored Research</button>
          </div>
        )}
      </div>

      {/* Admissions */}
      <div className={styles.section}>
        <button className={`${styles.toggle} ${expanded === 'admissions' ? styles.open : ''}`} onClick={() => toggle('admissions')}>
          🎓 प्रवेश / Admissions <span className={styles.arr}>▾</span>
        </button>
        {expanded === 'admissions' && (
          <div className={styles.sub}>
            <button onClick={() => go('admissions')}>Admissions Overview</button>
            <button onClick={() => go('admissions')}>Eligibility Criteria</button>
            <button onClick={() => go('admissions')}>Fee Structure</button>
            <button onClick={() => go('admissions')}>Ph.D. via URET</button>
            <a href="https://cuet.samarth.ac.in" target="_blank" rel="noopener noreferrer">CUET Portal (NTA) ↗</a>
            <a href="https://cusbadm.samarth.edu.in" target="_blank" rel="noopener noreferrer">CUSB Samarth Portal ↗</a>
          </div>
        )}
      </div>

      {/* Student Corner */}
      <div className={styles.section}>
        <button className={`${styles.toggle} ${expanded === 'students' ? styles.open : ''}`} onClick={() => toggle('students')}>
          🎓 छात्र कोना / Student Corner <span className={styles.arr}>▾</span>
        </button>
        {expanded === 'students' && (
          <div className={styles.sub}>
            <button onClick={() => go('students')}>Student Corner Overview</button>
            <a href="https://cusbadm.samarth.edu.in" target="_blank" rel="noopener noreferrer">Samarth Portal ↗</a>
            <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer">Scholarships ↗</a>
            <a href="https://antiragging.in" target="_blank" rel="noopener noreferrer">Anti-Ragging ↗</a>
            <a href="https://swayam.gov.in" target="_blank" rel="noopener noreferrer">SWAYAM / NPTEL ↗</a>
          </div>
        )}
      </div>

      {/* News & Events */}
      <div className={styles.section}>
        <button className={styles.toggle} onClick={() => go('news')}>📰 समाचार / News &amp; Events</button>
      </div>

      {/* Faculty */}
      <div className={styles.section}>
        <button className={styles.toggle} onClick={() => go('faculty')}>👩‍🏫 Faculty</button>
      </div>

      {/* Contact */}
      <div className={styles.section}>
        <button className={styles.toggle} onClick={() => go('contact')}>📞 संपर्क / Contact</button>
      </div>

      {/* Apply CTA */}
      <div className={styles.cta}>
        <a href={SITE_CONFIG.samarth} target="_blank" rel="noopener noreferrer">
          Apply Now via CUET / Samarth →
        </a>
      </div>
    </div>
  );
}
