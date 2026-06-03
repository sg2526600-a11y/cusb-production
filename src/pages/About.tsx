import PageHero from '@/components/ui/PageHero';
import { SITE_CONFIG } from '@/constants/site';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './About.module.css';

const LEADERSHIP = [
  { role: 'Visitor', name: 'Smt. Droupadi Murmu', note: 'Hon\'ble President of India — constitutional head of all central universities', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=16', img: '/images/president.jpg' },
  { role: 'Chancellor', name: 'Dr. C. P. Thakur', note: 'Ceremonial head of the university', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=17', img: '/images/chancellor.jpg' },
  { role: 'Vice-Chancellor', name: 'Prof. K. N. Singh', note: 'Academic and administrative head', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=18', img: '/images/vc-kn.jpg' },
  { role: 'Registrar', name: 'Prof. Narendra Kumar Rana', note: '8th Registrar, CUSB — on deputation from Banaras Hindu University', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=23', img: '' },
  { role: 'Finance Officer', name: 'CUSB Finance Officer', note: 'Financial management', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=24', img: '' },
  { role: 'Controller of Examinations', name: 'CoE, CUSB', note: 'Examination management', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=25', img: '' },
];

const MILESTONES = [
  { year: '2009', label: 'Established by Parliament of India under Central Universities Act, 2009.' },
  { year: '2012', label: 'First batch of students admitted; academic programmes launched across 8 departments.' },
  { year: '2015', label: 'Permanent campus at NH-120, Panchanpur, Gaya inaugurated.' },
  { year: '2018', label: 'Ph.D. programmes expanded across all major schools and departments.' },
  { year: '2020', label: 'Central Instrumental Facility (CIF) commissioned for advanced research.' },
  { year: '2023', label: 'NAAC Accreditation with A++ grade (CGPA 3.58) — highest tier.' },
];

export default function About() {
  const ref1 = useScrollReveal({ stagger: true });
  const ref2 = useScrollReveal();
  return (
    <>
      <PageHero
        title="About CUSB"
        titleHi="हमारे बारे में"
        subtitle="Central University of South Bihar — a Parliament-established premier central university at Gaya, Bihar."
        crumbs={[{ label: 'About CUSB' }]}
      />

      {/* About narrative */}
      <section className={styles.about}>
        <div ref={ref2} className={styles.aboutInner}>
          <div className={styles.aboutText}>
            <p className={styles.pre}>Our Story</p>
            <h2 className={styles.title}>A University Born from National Vision</h2>
            <div className={styles.rule} />
            <p>The Central University of South Bihar (CUSB) was established by the Parliament of India through the <strong>Central Universities Act, 2009</strong>. Situated at NH-120, Panchanpur, Gaya — a city of immense historical and spiritual significance — CUSB reflects India's commitment to expanding quality higher education to every region of the country.</p>
            <p>Built on a sprawling <strong>300-acre green campus</strong>, CUSB offers world-class infrastructure, a vibrant research ecosystem, and a deeply inclusive academic culture. The university is guided by its motto <strong>"{SITE_CONFIG.motto}"</strong> — <em>Knowledge, Service and Liberation</em> — a call to transform education into a force for personal and social emancipation.</p>
            <p>Today, CUSB is home to <strong>26 departments</strong>, 5,000+ students, and a growing research community — proudly holding <strong>NAAC A++ accreditation</strong> with a CGPA of 3.58.</p>
          </div>
          <div className={styles.aboutSidebar}>
            <div className={styles.sideCard}>
              <h3>At a Glance</h3>
              <dl>
                {[
                  ['Founded', '2009 (Parliament of India)'],
                  ['NAAC Grade', 'A++ · CGPA 3.58'],
                  ['Campus', '300 Acres, Gaya, Bihar'],
                  ['Departments', '26 departments'],
                  ['Programmes', 'UG, PG, Ph.D.'],
                  ['Students', '5,000+'],
                  ['Faculty', '200+'],
                  ['Hostels', 'Boys 500 + Girls 300 seats'],
                ].map(([k, v]) => (
                  <div key={k} className={styles.dlRow}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className={styles.leadership}>
        <p className={styles.pre}>Administration</p>
        <h2 className={styles.title}>University Leadership</h2>
        <div className={styles.rule} />
        <div ref={ref1} className={styles.leaderGrid}>
          {LEADERSHIP.map(({ role, name, note, href, img }) => (
            <a key={role} href={href} target="_blank" rel="noopener noreferrer" className={styles.leaderCard}>
              <div className={styles.leaderAvatar}>
                {img ? (
                  <img
                    src={img}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : '👤'}
              </div>
              <p className={styles.leaderRole}>{role}</p>
              <p className={styles.leaderName}>{name}</p>
              <p className={styles.leaderNote}>{note}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Milestones timeline */}
      <section className={styles.timeline}>
        <p className={styles.pre}>History</p>
        <h2 className={styles.title}>Key Milestones</h2>
        <div className={styles.rule} />
        <div className={styles.tl}>
          {MILESTONES.map(({ year, label }) => (
            <div key={year} className={styles.tlItem}>
              <div className={styles.tlYear}>{year}</div>
              <div className={styles.tlDot} />
              <div className={styles.tlLabel}>{label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
