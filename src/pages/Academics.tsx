import PageHero from '@/components/ui/PageHero';
import { useNavigation } from '@/hooks/useNavigation';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Academics.module.css';

const PROGRAMMES = [
  { level: 'Undergraduate (UG)', icon: '🎓', description: 'B.Sc., B.A., B.Com., B.Lib.I.Sc. and other undergraduate programmes.', seats: '500+', duration: '3 Years', entry: 'CUET-UG / Direct' },
  { level: 'Postgraduate (PG)',  icon: '📚', description: 'M.Sc., M.A., M.Com., M.Lib.I.Sc., MBA and integrated programmes.', seats: '800+', duration: '2 Years', entry: 'CUET-PG (NTA)' },
  { level: 'Ph.D. Programme',   icon: '🔬', description: 'Doctoral research across all departments via University Research Entrance Test (URET).', seats: '200+', duration: '3–5 Years', entry: 'URET (CUSB)' },
  { level: 'M.Phil.',           icon: '📝', description: 'M.Phil. programmes in select departments (subject to UGC regulations).', seats: 'Limited', duration: '1–2 Years', entry: 'Entrance + Interview' },
];

const HIGHLIGHTS = [
  { icon: '📋', text: 'Outcome-Based Education (OBE) curriculum framework' },
  { icon: '🌐', text: 'Choice Based Credit System (CBCS) with open electives' },
  { icon: '🏛️', text: 'Semester system with mid-term and end-term examinations' },
  { icon: '💻', text: 'Digital library with 1 lakh+ e-resources via INFLIBNET' },
  { icon: '🔬', text: 'State-of-the-art Central Instrumental Facility (CIF)' },
  { icon: '🌍', text: 'MoUs with national and international universities' },
];

export default function Academics() {
  const { navigateTo } = useNavigation();
  const ref = useScrollReveal({ stagger: true });
  const hlRef = useScrollReveal({ stagger: true });

  return (
    <>
      <PageHero
        title="Academics"
        titleHi="शैक्षणिक कार्यक्रम"
        subtitle="UG, PG and Ph.D. programmes across 26 departments — rigorous curriculum, world-class faculty, research-driven pedagogy."
        crumbs={[{ label: 'Academics' }]}
      />

      {/* Programmes */}
      <section className={styles.section}>
        <p className={styles.pre}>Programmes Offered</p>
        <h2 className={styles.title}>Academic Programmes</h2>
        <div className={styles.rule} />
        <div ref={ref} className={styles.progGrid}>
          {PROGRAMMES.map((p) => (
            <div key={p.level} className={styles.progCard}>
              <span className={styles.progIcon}>{p.icon}</span>
              <h3>{p.level}</h3>
              <p>{p.description}</p>
              <div className={styles.progMeta}>
                <span>🪑 {p.seats} seats</span>
                <span>⏱ {p.duration}</span>
                <span>🎯 {p.entry}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className={styles.hlSection}>
        <h2 className={styles.hlTitle}>Academic Highlights</h2>
        <div ref={hlRef} className={styles.hlGrid}>
          {HIGHLIGHTS.map(({ icon, text }) => (
            <div key={text} className={styles.hlCard}>
              <span>{icon}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Departments CTA */}
      <section className={styles.deptCta}>
        <h2>Explore All 26 Departments</h2>
        <p>From Bioinformatics to Mass Communication — find your department.</p>
        <div className={styles.ctaRow}>
          <button onClick={() => navigateTo('departments')} className={styles.btn}>View All Departments →</button>
          <a href="https://cusbadm.samarth.edu.in" target="_blank" rel="noopener noreferrer" className={styles.btnSec}>Apply via Samarth</a>
        </div>
      </section>
    </>
  );
}
