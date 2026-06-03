import PageHero from '@/components/ui/PageHero';
import { NOTICES } from '@/constants/notices';
import NoticeRow from '@/components/ui/NoticeRow';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './News.module.css';

const EVENTS = [
  { icon: '🎓', tag: 'Convocation', title: 'Annual Convocation 2025', date: 'Jan 2026', desc: 'Annual convocation ceremony for graduating batch 2024–25. Degrees conferred by the Chancellor.' },
  { icon: '🔬', tag: 'Research', title: 'CUSB International Research Conclave', date: 'Oct 2025', desc: 'Annual research conclave featuring invited talks, poster sessions and paper presentations.' },
  { icon: '🎨', tag: 'Cultural', title: 'Aarambh — Annual Cultural Fest', date: 'Nov 2025', desc: 'Three-day annual cultural festival celebrating music, dance, drama and fine arts.' },
  { icon: '🏏', tag: 'Sports', title: 'CUSB Sports Meet 2025', date: 'Mar 2026', desc: 'Annual inter-department sports meet — athletics, cricket, football, badminton and more.' },
  { icon: '📚', tag: 'Academic', title: 'National Seminar on Sustainable Development', date: 'Dec 2025', desc: 'National seminar organised by Department of Development Studies on SDG progress in Bihar.' },
  { icon: '💼', tag: 'Placement', title: 'Campus Placement Drive — Spring 2026', date: 'Feb 2026', desc: 'Spring semester campus placement drive with 25+ companies across IT, banking and education.' },
];

export default function News() {
  const ref = useScrollReveal({ stagger: true });
  const ref2 = useScrollReveal();
  return (
    <>
      <PageHero
        title="News & Events"
        titleHi="समाचार और कार्यक्रम"
        subtitle="Latest news, official notices, upcoming events, and achievements from Central University of South Bihar."
        crumbs={[{ label: 'News & Events' }]}
      />

      {/* Events */}
      <section className={styles.events}>
        <p className={styles.pre}>What's Happening</p>
        <h2 className={styles.title}>Upcoming Events</h2>
        <div className={styles.rule} />
        <div ref={ref} className={styles.evGrid}>
          {EVENTS.map(({ icon, tag, title, date, desc }) => (
            <div key={title} className={styles.evCard}>
              <div className={styles.evHead}>
                <span className={styles.evIcon}>{icon}</span>
                <span className={styles.evTag}>{tag}</span>
                <span className={styles.evDate}>{date}</span>
              </div>
              <h3 className={styles.evTitle}>{title}</h3>
              <p className={styles.evDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Official notices */}
      <section className={styles.notices}>
        <h2 className={styles.title}>Official Notices</h2>
        <div className={styles.rule} />
        <div ref={ref2} className={styles.noticeBoard}>
          {NOTICES.map((n) => <NoticeRow key={n.id} notice={n} />)}
        </div>
        <p className={styles.moreLink}>
          <a href="https://www.cusb.ac.in/index.php?option=com_content&view=category&id=12" target="_blank" rel="noopener noreferrer">
            View all notices on official website →
          </a>
        </p>
      </section>
    </>
  );
}
