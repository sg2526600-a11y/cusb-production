import PageHero from '@/components/ui/PageHero';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './IQAC.module.css';

const INITIATIVES = [
  { icon: '📋', title: 'Annual Quality Assurance Report (AQAR)', desc: 'Annual report submitted to NAAC detailing academic quality metrics, research output, and institutional development.' },
  { icon: '🎓', title: 'Faculty Development Programme (FDP)', desc: 'Regular FDPs for faculty on research methodology, pedagogy, ICT tools, and NEP 2020 implementation.' },
  { icon: '📊', title: 'Student Satisfaction Survey', desc: 'Annual survey to measure student satisfaction with academics, infrastructure, library, administration, and support services.' },
  { icon: '🔍', title: 'Academic Audit', desc: 'Systematic internal academic audit of departments to assess curriculum quality, teaching-learning process, and research output.' },
  { icon: '🤝', title: 'Industry-Academia Interface', desc: 'Facilitating MoUs and collaborations with industries, research institutions and government bodies for mutual benefit.' },
  { icon: '🌱', title: 'Green Campus Initiatives', desc: 'Promoting environmental sustainability through waste management, energy efficiency, solar power, and tree plantation drives.' },
];

export default function IQAC() {
  const ref = useScrollReveal({ stagger: true });
  return (
    <>
      <PageHero
        title="IQAC"
        titleHi="आंतरिक गुणवत्ता आश्वासन प्रकोष्ठ"
        subtitle="Internal Quality Assurance Cell — driving continuous improvement in academic quality, research and institutional governance."
        crumbs={[{ label: 'IQAC' }]}
      />
      <section className={styles.section}>
        <div className={styles.intro}>
          <p className={styles.pre}>Quality Assurance</p>
          <h2 className={styles.title}>About IQAC</h2>
          <div className={styles.rule} />
          <p>The Internal Quality Assurance Cell (IQAC) of CUSB was established as per the mandate of the National Assessment and Accreditation Council (NAAC). The IQAC serves as the nucleus for all quality-related activities of the university and works to ensure a conscious, consistent, and catalytic improvement in the overall performance of the institution.</p>
          <p>CUSB has been awarded the prestigious <strong>NAAC A++ grade (CGPA 3.58)</strong> — a testament to the sustained quality assurance efforts of the institution across all parameters: Teaching-Learning &amp; Evaluation, Research, Innovation &amp; Extension, Infrastructure &amp; Learning Resources, Student Support &amp; Progression, Governance, Leadership &amp; Management, and Institutional Values.</p>
        </div>

        <h3 className={styles.subTitle}>Key Initiatives</h3>
        <div ref={ref} className={styles.grid}>
          {INITIATIVES.map(({ icon, title, desc }) => (
            <div key={title} className={styles.card}>
              <span>{icon}</span>
              <div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.links}>
          <h3>IQAC Documents</h3>
          <div className={styles.docGrid}>
            {[
              { label: 'NAAC Accreditation Certificate', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=679&Itemid=637' },
              { label: 'AQAR Reports', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=category&id=12' },
              { label: 'Self-Study Report (SSR)', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=679&Itemid=637' },
              { label: 'NIRF Data Submission', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=679&Itemid=637' },
              { label: 'Academic Calendar', href: 'https://cusb.ac.in/index.php?Itemid=191&id=76&option=com_content&view=article' },
              { label: 'RTI Portal', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=220' },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles.docLink}>
                📄 {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
