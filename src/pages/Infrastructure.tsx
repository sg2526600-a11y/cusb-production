import PageHero from '@/components/ui/PageHero';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Infrastructure.module.css';

const FACILITIES = [
  { icon: '🔬', name: 'Central Instrumental Facility (CIF)', desc: 'Houses advanced analytical instruments including HPLC, FTIR, UV-Vis Spectrophotometer, Atomic Absorption Spectrophotometer and more, serving research needs across departments.' },
  { icon: '💻', name: 'University Computer Centre (UCC)', desc: 'High-performance computing infrastructure, servers, internet connectivity (1 Gbps leased line), and digital classrooms across the campus.' },
  { icon: '📚', name: 'Rajarshi Janak Central Library', desc: '1 lakh+ volumes, 10,000+ e-journals, access to INFLIBNET N-LIST, Shodhganga thesis database, and 24×7 digital reading room.' },
  { icon: '🏠', name: 'Hostels (Boys & Girls)', desc: 'Separate boys (500 seats) and girls (300 seats) hostels with Wi-Fi, reading rooms, laundry, medical facilities, CCTV surveillance, and mess.' },
  { icon: '🏟️', name: 'Sports Complex', desc: 'Multi-purpose sports ground, indoor sports hall, gymnasium, and facilities for cricket, football, volleyball, badminton, athletics and yoga.' },
  { icon: '🏥', name: 'Health Centre', desc: 'On-campus medical facility with full-time doctor and nurse, first aid, ambulance service, and tie-up with District Hospital, Gaya.' },
  { icon: '🍽️', name: 'Cafeteria & Mess', desc: 'Central cafeteria serving hygienic meals and snacks. Hostel mess with nutritious food at subsidised rates for resident students.' },
  { icon: '🌳', name: '300-Acre Green Campus', desc: 'Eco-friendly campus with gardens, walking tracks, medicinal plant garden, solar power infrastructure, and rainwater harvesting systems.' },
  { icon: '🕌', name: 'Meditation & Yoga Centre', desc: 'Dedicated space for meditation, yoga, and mental wellness. CUSB promotes holistic development alongside academic excellence.' },
  { icon: '🏛️', name: 'Administrative Block', desc: 'Modern administrative complex housing the Vice-Chancellor\'s office, academic sections, finance, examination, and all administrative departments.' },
  { icon: '🎭', name: 'Multipurpose Hall', desc: 'Auditorium with 1,000-seat capacity hosting convocations, seminars, cultural fests, and university events.' },
  { icon: '🌐', name: 'Wi-Fi Campus', desc: 'High-speed Wi-Fi connectivity across the entire campus including hostels, library, departments, and common areas.' },
];

export default function Infrastructure() {
  const ref = useScrollReveal({ stagger: true });
  return (
    <>
      <PageHero
        title="Infrastructure"
        titleHi="अवसंरचना"
        subtitle="World-class facilities on a 300-acre green campus — from a state-of-the-art CIF to a 1 lakh-volume library."
        crumbs={[{ label: 'Infrastructure' }]}
      />
      <section className={styles.section}>
        <p className={styles.pre}>Campus Facilities</p>
        <h2 className={styles.title}>Our Infrastructure</h2>
        <div className={styles.rule} />
        <div ref={ref} className={styles.grid}>
          {FACILITIES.map(({ icon, name, desc }) => (
            <div key={name} className={styles.card}>
              <span className={styles.icon}>{icon}</span>
              <div>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.desc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
