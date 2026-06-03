// ─── Research Page ────────────────────────────────────────────────────────────
import PageHero from '@/components/ui/PageHero';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Research.module.css';

const AREAS = [
  { icon: '🧬', title: 'Life & Biological Sciences', desc: 'Bioinformatics, Biotechnology, Life Science, Environmental Sciences — cutting-edge lab facilities.' },
  { icon: '⚗️', title: 'Chemistry & Physics', desc: 'Materials science, spectroscopy, computational chemistry, theoretical and experimental physics.' },
  { icon: '📐', title: 'Mathematical & Statistical Sciences', desc: 'Pure maths, applied statistics, data science, machine learning, cryptography.' },
  { icon: '🌍', title: 'Earth & Geo Sciences', desc: 'Geology, geography, geomorphology, remote sensing and GIS studies.' },
  { icon: '🏛️', title: 'Social Sciences & Humanities', desc: 'Historical research, sociological studies, political economy, development policy.' },
  { icon: '💊', title: 'Pharmaceutical Sciences', desc: 'Drug discovery, formulation, pharmacokinetics and herbal medicine research.' },
];

export default function Research() {
  const ref = useScrollReveal({ stagger: true });
  return (
    <>
      <PageHero title="Research" titleHi="अनुसंधान" subtitle="Advancing knowledge through interdisciplinary research, world-class facilities and a vibrant Ph.D. community." crumbs={[{ label: 'Research' }]} />
      <section className={styles.section}>
        <p className={styles.pre}>Innovation at CUSB</p>
        <h2 className={styles.title}>Research Areas</h2>
        <div className={styles.rule} />
        <div ref={ref} className={styles.grid}>
          {AREAS.map((a) => (
            <div key={a.title} className={styles.card}>
              <span>{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.fac}>
        <h2>Research Facilities</h2>
        <div className={styles.facGrid}>
          {[
            { icon: '🔬', name: 'Central Instrumental Facility (CIF)', desc: 'State-of-the-art instruments for advanced scientific research.' },
            { icon: '💻', name: 'University Computer Centre (UCC)', desc: 'High-performance computing, servers, and digital infrastructure.' },
            { icon: '📚', name: 'Rajarshi Janak Central Library', desc: '1 lakh+ volumes, 10,000+ e-journals via INFLIBNET N-LIST.' },
          ].map(({ icon, name, desc }) => (
            <div key={name} className={styles.facCard}>
              <span>{icon}</span>
              <div>
                <h4>{name}</h4>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
