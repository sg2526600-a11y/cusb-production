import PageHero from '@/components/ui/PageHero';
import { SITE_CONFIG } from '@/constants/site';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Admissions.module.css';

const STEPS = [
  { step: '01', icon: '📝', title: 'Register for CUET', desc: 'Register on NTA portal (cuet.samarth.ac.in) for CUET-PG. Check eligibility criteria for your programme.' },
  { step: '02', icon: '✏️', title: 'Appear in CUET', desc: 'Appear in CUET-PG examination conducted by NTA. Score will be used for merit ranking.' },
  { step: '03', icon: '📋', title: 'Apply on Samarth', desc: 'Apply on CUSB Samarth portal (cusbadm.samarth.edu.in) after CUET result with your CUET scores.' },
  { step: '04', icon: '🎯', title: 'Merit List & Counselling', desc: 'Merit list published on Samarth portal. Attend online/offline counselling and document verification.' },
  { step: '05', icon: '💳', title: 'Pay Fee & Enrol', desc: 'Pay admission fee online via Samarth portal and complete enrolment. Collect ID card from university.' },
];

const PROGRAMMES = [
  { prog: 'M.Sc. / M.A. (2-year PG)', entry: 'CUET-PG (NTA)', elig: 'Graduation with 50% (45% SC/ST/PwD)' },
  { prog: 'M.Com. / MBA', entry: 'CUET-PG (NTA)', elig: 'Graduation with 50% in relevant field' },
  { prog: 'M.Lib.I.Sc.', entry: 'CUET-PG (NTA)', elig: 'Graduation with 50%' },
  { prog: 'B.Sc. / B.A. (UG, 3-year)', entry: 'Direct / Merit', elig: 'Class XII with 50% in relevant subjects' },
  { prog: 'B.Lib.I.Sc.', entry: 'Direct / Merit', elig: 'Graduation with 45%' },
  { prog: 'Ph.D. (All departments)', entry: 'URET (CUSB)', elig: 'PG with 55% (50% SC/ST/PwD) + valid NET/JRF' },
  { prog: 'M.Phil.', entry: 'Entrance + Interview', elig: 'PG with 55% (check UGC norms)' },
];

export default function Admissions() {
  const ref = useScrollReveal({ stagger: true });
  return (
    <>
      <PageHero
        title="Admissions"
        titleHi="प्रवेश"
        subtitle="PG admissions via CUET-PG · Ph.D. via URET · UG direct admission — all through Samarth ERP portal."
        crumbs={[{ label: 'Admissions' }]}
      />

      {/* Portal links */}
      <section className={styles.portals}>
        <div className={styles.portalGrid}>
          {[
            { icon: '🎓', title: 'CUET-PG Portal (NTA)', sub: 'Register and download admit card', href: 'https://cuet.samarth.ac.in', cta: 'Visit NTA →' },
            { icon: '🖥️', title: 'CUSB Samarth Portal', sub: 'Apply, pay fee, download docs', href: 'https://cusbadm.samarth.edu.in', cta: 'Open Samarth →' },
            { icon: '📄', title: 'PG Notification 2026-27', sub: 'Admission notification & eligibility 2026-27', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=897&Itemid=690', cta: 'View Notification →' },
          ].map(({ icon, title, sub, href, cta }) => (
            <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={styles.portalCard}>
              <span>{icon}</span>
              <div>
                <p className={styles.portalTitle}>{title}</p>
                <p className={styles.portalSub}>{sub}</p>
              </div>
              <span className={styles.portalCta}>{cta}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Process steps */}
      <section className={styles.process}>
        <p className={styles.pre}>How to Apply</p>
        <h2 className={styles.title}>Admission Process</h2>
        <div className={styles.rule} />
        <div ref={ref} className={styles.steps}>
          {STEPS.map(({ step, icon, title, desc }) => (
            <div key={step} className={styles.stepCard}>
              <div className={styles.stepNum}>{step}</div>
              <span className={styles.stepIcon}>{icon}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility table */}
      <section className={styles.eligSection}>
        <h2 className={styles.title}>Programme-wise Eligibility</h2>
        <div className={styles.rule} />
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Programme</th><th>Entrance Test</th><th>Eligibility</th></tr>
            </thead>
            <tbody>
              {PROGRAMMES.map(({ prog, entry, elig }) => (
                <tr key={prog}>
                  <td>{prog}</td>
                  <td><span className={styles.entryBadge}>{entry}</span></td>
                  <td>{elig}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Ready to Join CUSB?</h2>
        <p>Apply now via CUET 2026 or visit the Samarth portal for latest notifications.</p>
        <div className={styles.ctaBtns}>
          <a href={SITE_CONFIG.cuet} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>Apply via CUET →</a>
          <a href={SITE_CONFIG.samarth} target="_blank" rel="noopener noreferrer" className={styles.btnSec}>Samarth Portal</a>
        </div>
      </section>
    </>
  );
}
