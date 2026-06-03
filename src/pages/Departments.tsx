import PageHero from '@/components/ui/PageHero';
import { SCHOOLS } from '@/constants/departments';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Departments.module.css';

export default function Departments() {
  const ref = useScrollReveal({ stagger: true });
  return (
    <>
      <PageHero
        title="Schools & Departments"
        titleHi="विद्यालय और विभाग"
        subtitle="26 departments across 12 schools — covering science, social sciences, humanities, law, and management."
        crumbs={[{ label: 'Academics', pageId: 'academics' }, { label: 'Departments' }]}
      />

      <section className={styles.section}>
        <div ref={ref} className={styles.grid}>
          {SCHOOLS.map((school) => (
            <div key={school.name} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.icon}>{school.icon}</span>
                <h3 className={styles.schoolName}>{school.name}</h3>
              </div>
              <ul className={styles.deptList}>
                {school.departments.map((dept) => (
                  <li key={dept.name}>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <span className={styles.arrow}>→</span> {dept.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
