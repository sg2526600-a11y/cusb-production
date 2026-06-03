import { useEffect, useState } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';
import { SITE_CONFIG } from '@/constants/site';
import { NOTICES } from '@/constants/notices';
import NoticeRow from '@/components/ui/NoticeRow';
import SectionHeader from '@/components/ui/SectionHeader';
import styles from './Home.module.css';

// ─── Hero Carousel ────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    src: '/images/hero1.png',
    alt: 'CUSB Main Campus Gate — Panchanpur, Gaya',
  },
  {
    src: '/images/hero2.jpg',
    alt: 'CUSB Sports Facility — Panchanpur Campus',
  },
  {
    src: '/images/hero3.jpeg',
    alt: 'CUSB Campus — Panchanpur, Gaya',
  },
];

function Hero() {
  const { navigateTo } = useNavigation();
  const [slide, setSlide] = useState(0);
  const total = HERO_SLIDES.length;

  /* Auto-advance every 5.5 s */
  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % total), 5500);
    return () => clearInterval(t);
  }, [total]);

  const prev = () => setSlide(p => (p - 1 + total) % total);
  const next = () => setSlide(p => (p + 1) % total);

  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Carousel background images — crossfade via CSS opacity */}
      {HERO_SLIDES.map((s, i) => (
        <img
          key={s.src}
          className={`${styles.heroImg} ${i === slide ? styles.heroImgActive : styles.heroImgHidden}`}
          src={s.src}
          alt={s.alt}
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
        />
      ))}

      {/* Directional dark overlay for text legibility */}
      <div className={styles.heroBg} aria-hidden="true" />

      {/* Content */}
      <div className={styles.heroInner}>
        <div className={styles.heroBadge}>
          <span className={styles.naacDot} />
          NAAC Accredited · {SITE_CONFIG.naac} · Est. {SITE_CONFIG.estYear}
        </div>
        <p className="hero-hi-line">{SITE_CONFIG.nameHi} — {SITE_CONFIG.motto}</p>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleTop}>Central University of</span>
          <span className={styles.heroTitleBot}>South Bihar</span>
        </h1>
        <p className={styles.heroMotto}>"{SITE_CONFIG.motto}" · {SITE_CONFIG.mottoEn}</p>
        <p className={styles.heroSub}>
          A premier central university at Gaya, Bihar — 26 departments, 5,000+ students,
          world-class research facilities and a 300-acre green campus at Panchanpur.
        </p>
        <div className={styles.heroCtas}>
          <a href={SITE_CONFIG.cuet} target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
            Apply via CUET 2026
          </a>
          <button className={styles.ctaSecondary} onClick={() => navigateTo('about')}>
            Explore University
          </button>
        </div>
      </div>

      {/* Glassmorphic stats panel — bottom-right anchor */}
      <div className={styles.statsStrip} aria-label="University statistics">
        {SITE_CONFIG.stats.map((s) => (
          <StatItem key={s.labelEn} value={s.value} labelEn={s.labelEn} labelHi={s.labelHi} />
        ))}
      </div>

      {/* Slide navigation dots */}
      <div className={styles.carouselDots} role="tablist" aria-label="Slide navigation">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === slide}
            className={`${styles.dot} ${i === slide ? styles.dotActive : ''}`}
            onClick={() => setSlide(i)}
            aria-label={`Go to slide ${i + 1} of ${total}`}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        className={`${styles.carouselBtn} ${styles.carouselPrev}`}
        onClick={prev}
        aria-label="Previous slide"
      >&#8249;</button>
      <button
        className={`${styles.carouselBtn} ${styles.carouselNext}`}
        onClick={next}
        aria-label="Next slide"
      >&#8250;</button>
    </section>
  );
}

function StatItem({ value, labelEn, labelHi }: { value: string; labelEn: string; labelHi: string }) {
  const { ref, display } = useCountUp(value);
  return (
    <div className={styles.statItem}>
      <strong ref={ref as React.RefObject<HTMLElement>}>{display}</strong>
      <span className="sl-en">{labelEn}</span>
      <span className="sl-hi">{labelHi}</span>
    </div>
  );
}

// ─── NAAC Strip ───────────────────────────────────────────────────────────────
function NaacStrip() {
  return (
    <div className={styles.naacStrip} role="complementary" aria-label="Accreditation status">
      <div className={styles.naacInner}>
        <div className={styles.naacBadge}>A++</div>
        <div className={styles.naacText}>
          <p className={styles.naacMain}>NAAC Accredited — Grade A++ · CGPA 3.58 · Highest Grade in India</p>
          <p className={styles.naacSub}>National Assessment and Accreditation Council, Government of India · NIRF Ranked</p>
        </div>
        <div className={styles.naacRight}>
          <a href="https://www.naac.gov.in" target="_blank" rel="noopener noreferrer" className={styles.naacLink}>
            Verify Accreditation →
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Quick Access Portal Links ────────────────────────────────────────────────
function QuickLinks() {
  const { navigateTo } = useNavigation();
  const ref = useScrollReveal({ stagger: true });
  const links = [
    { icon: '🎓', label: 'Admissions',    sub: 'CUET 2026',       action: () => navigateTo('admissions') },
    { icon: '📊', label: 'Results',       sub: 'All programmes',  href: 'https://cusb.ac.in/index.php?Itemid=194&id=79&option=com_content&view=article' },
    { icon: '📢', label: 'Notices',       sub: 'Circulars',       href: 'https://www.cusb.ac.in/index.php?option=com_content&view=category&id=12' },
    { icon: '📥', label: 'Downloads',     sub: 'Forms & PDFs',    action: () => navigateTo('students') },
    { icon: '🔬', label: 'Research',      sub: '26 departments',  action: () => navigateTo('research') },
    { icon: '🏠', label: 'Hostel',        sub: 'Apply now',       action: () => navigateTo('students') },
    { icon: '💼', label: 'Placement',     sub: 'Career Fair',     action: () => navigateTo('students') },
    { icon: '📞', label: 'Contact',       sub: 'Get in touch',    action: () => navigateTo('contact') },
  ];
  return (
    <section className={styles.quickLinks}>
      <SectionHeader preLabel="Portals" title="Quick Access" titleHi="त्वरित पहुँच" />
      <div ref={ref} className={styles.qlGrid}>
        {links.map(({ icon, label, sub, action, href }) =>
          href ? (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`${styles.qlCard} card-transition`}>
              <span className={styles.qlIcon}>{icon}</span>
              <strong>{label}</strong>
              <span>{sub}</span>
            </a>
          ) : (
            <button key={label} className={`${styles.qlCard} card-transition`} onClick={action}>
              <span className={styles.qlIcon}>{icon}</span>
              <strong>{label}</strong>
              <span>{sub}</span>
            </button>
          )
        )}
      </div>
    </section>
  );
}

// ─── Latest Notices ───────────────────────────────────────────────────────────
function LatestNotices() {
  const { navigateTo } = useNavigation();
  const ref = useScrollReveal();
  const latest = NOTICES.slice(0, 8);
  return (
    <section className={styles.notices}>
      <div className={styles.noticesInner}>
        <div className={styles.noticesHeader}>
          <SectionHeader preLabel="Updates" title="Latest Notices" titleHi="नवीनतम सूचनाएँ" align="left" />
          <button className={styles.viewAll} onClick={() => navigateTo('students')}>View All →</button>
        </div>
        <div ref={ref} className={styles.noticeBoard}>
          {latest.map((n) => <NoticeRow key={n.id} notice={n} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Academics Preview ────────────────────────────────────────────────────────
function AcademicsPreview() {
  const { navigateTo } = useNavigation();
  const ref = useScrollReveal({ stagger: true });
  const schools = [
    { icon: '📐', name: 'Mathematics & Computer Science', sub: '3 departments · UG, PG, Ph.D' },
    { icon: '🌿', name: 'Earth, Biological & Environmental', sub: '6 departments · UG, PG, Ph.D' },
    { icon: '🏛️', name: 'Social Sciences & Policies', sub: '6 departments · UG, PG, Ph.D' },
    { icon: '⚗️', name: 'Physical & Chemical Sciences', sub: '2 departments · UG, PG, Ph.D' },
    { icon: '📖', name: 'Languages & Literature', sub: '2 departments · UG, PG' },
    { icon: '💊', name: 'Pharmaceutical & Agricultural', sub: '2 departments · UG, PG' },
  ];
  return (
    <section className={styles.academics}>
      <SectionHeader preLabel="26 Departments" title="Academic Schools" titleHi="शैक्षणिक विद्यालय"
        subtitle="World-class education across science, social sciences, humanities, law, and management." />
      <div ref={ref} className={styles.schoolGrid}>
        {schools.map(({ icon, name, sub }) => (
          <div key={name} className={`${styles.schoolCard} card-transition`}>
            <span className={styles.schoolIcon}>{icon}</span>
            <div>
              <p className={styles.schoolName}>{name}</p>
              <p className={styles.schoolSub}>{sub}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.academicsCtas}>
        <button onClick={() => navigateTo('academics')} className={styles.acadBtn}>View All Programmes →</button>
        <button onClick={() => navigateTo('departments')} className={styles.acadBtnSec}>All 26 Departments</button>
        <button onClick={() => navigateTo('faculty')} className={styles.acadBtnSec}>Meet Our Faculty 👨‍🏫</button>
      </div>
    </section>
  );
}

// ─── Research Strip ───────────────────────────────────────────────────────────
function ResearchStrip() {
  const { navigateTo } = useNavigation();
  const ref = useScrollReveal();
  const items = [
    { icon: '🔬', stat: '150+', label: 'Research Projects' },
    { icon: '📄', stat: '500+', label: 'Publications (2020–25)' },
    { icon: '👨‍🎓', stat: '200+', label: 'Ph.D. Scholars' },
    { icon: '💰', stat: '₹5Cr+', label: 'Research Funding' },
  ];
  return (
    <section className={styles.research}>
      <div className={styles.researchBg} />
      <div className={styles.researchInner} ref={ref}>
        <div className={styles.researchLeft}>
          <p className={styles.researchPre}>Innovation & Discovery</p>
          <h2 className={styles.researchTitle}>Research at CUSB</h2>
          <p className={styles.researchSub}>
            From Central Instrumental Facility to interdisciplinary Ph.D. programmes,
            CUSB pushes the frontiers of knowledge across 26 departments.
          </p>
          <button onClick={() => navigateTo('research')} className={styles.researchBtn}>
            Explore Research →
          </button>
        </div>
        <div className={styles.researchStats}>
          {items.map(({ icon, stat, label }) => (
            <div key={label} className={styles.rStat}>
              <span>{icon}</span>
              <strong>{stat}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Admissions CTA Banner ────────────────────────────────────────────────────
function AdmissionBanner() {
  return (
    <section className={styles.admBanner}>
      <div className={styles.admBannerInner}>
        <div>
          <p className={styles.admPre}>Admissions 2026–27</p>
          <h2 className={styles.admTitle}>Join CUSB — Apply via CUET</h2>
          <p className={styles.admSub}>PG admissions through CUET-PG (NTA) · UG direct · Ph.D. via URET</p>
        </div>
        <div className={styles.admBtns}>
          <a href={SITE_CONFIG.cuet} target="_blank" rel="noopener noreferrer" className={styles.admBtnPrimary}>
            Apply via CUET →
          </a>
          <a href={SITE_CONFIG.samarth} target="_blank" rel="noopener noreferrer" className={styles.admBtnSecondary}>
            Samarth Portal
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── News ticker ──────────────────────────────────────────────────────────────
function NewsTicker() {
  const [idx, setIdx] = useState(0);
  const items = NOTICES.filter(n => n.isNew).map(n => n.title);
  useEffect(() => {
    if (!items.length) return;
    const t = setInterval(() => setIdx(p => (p + 1) % items.length), 3500);
    return () => clearInterval(t);
  }, [items.length]);
  if (!items.length) return null;
  return (
    <div className={styles.ticker}>
      <span className={styles.tickerLabel}>📢 LATEST</span>
      <div className={styles.tickerText}>{items[idx]}</div>
    </div>
  );
}

// ─── Counter strip (scroll-triggered) ────────────────────────────────────────
function ImpactCounters() {
  const ref = useScrollReveal({ stagger: true });
  const counters = [
    { value: '2009', label: 'Year Established', labelHi: 'स्थापना वर्ष', icon: '🏛️' },
    { value: '300',  label: 'Acres Campus',     labelHi: 'एकड़ परिसर',    icon: '🌳' },
    { value: '26',   label: 'Departments',      labelHi: 'विभाग',         icon: '📚' },
    { value: '200',  label: 'Faculty Members',  labelHi: 'शिक्षक',        icon: '👨‍🏫' },
    { value: '5000', label: 'Students',         labelHi: 'छात्र',         icon: '👨‍🎓' },
    { value: '150',  label: 'Ph.D. Scholars',   labelHi: 'पीएचडी शोधार्थी', icon: '🔬' },
  ];
  return (
    <section className={styles.counters}>
      <div ref={ref} className={styles.countersGrid}>
        {counters.map((c) => (
          <CounterCard key={c.label} {...c} />
        ))}
      </div>
    </section>
  );
}

function CounterCard({ value, label, labelHi, icon }: { value: string; label: string; labelHi: string; icon: string }) {
  const { ref, display } = useCountUp(value);
  return (
    <div className={styles.counterCard}>
      <span className={styles.counterIcon}>{icon}</span>
      <strong ref={ref as React.RefObject<HTMLElement>} className={styles.counterVal}>{display}</strong>
      <span className="sl-en">{label}</span>
      <span className="sl-hi">{labelHi}</span>
    </div>
  );
}

// ─── VC's Message ─────────────────────────────────────────────────────────────
function VCMessage() {
  const ref = useScrollReveal();
  return (
    <section className={styles.vc}>
      <div ref={ref} className={styles.vcInner}>
        <div className={styles.vcImg}>
          <img
            src="/images/vc-kn.jpg"
            alt="Vice-Chancellor CUSB"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = 'none';
              if (el.parentElement) el.parentElement.innerHTML = '<div style="font-size:4rem;display:flex;align-items:center;justify-content:center;height:100%">👨‍💼</div>';
            }}
          />
        </div>
        <div className={styles.vcContent}>
          <p className={styles.vcPre}>From the Desk of</p>
          <h2 className={styles.vcTitle}>Vice-Chancellor's Message</h2>
          <div className={styles.vcRule} />
          <blockquote className={styles.vcQuote}>
            "Central University of South Bihar stands as a beacon of excellence in higher education.
            Our commitment to quality research, inclusive education, and holistic student development
            drives us to create a future where knowledge truly liberates — as our motto '{SITE_CONFIG.motto}' proclaims."
          </blockquote>
          <p className={styles.vcName}>Prof. K. N. Singh</p>
          <p className={styles.vcRole}>Vice-Chancellor, Central University of South Bihar</p>
          <a href="https://www.cusb.ac.in/index.php?option=com_content&view=article&id=18" target="_blank" rel="noopener noreferrer" className={styles.vcMore}>
            Read Full Message →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Campus Strip (new — adapted from CUSB React Migration) ─────────────────
const CAMPUS_TILES = [
  {
    title: 'Administrative Block',
    sub: 'Heart of CUSB Governance',
  },
  {
    title: 'Central Library',
    sub: '2L+ Volumes · 24×7 Digital Access',
  },
  {
    title: 'Research Laboratories',
    sub: 'State-of-the-art Facilities',
  },
];

function CampusStrip() {
  return (
    <div className={styles.campusStrip} aria-label="Campus highlights">
      {CAMPUS_TILES.map(({ title, sub }) => (
        <div key={title} className={styles.csImg}>
          {/* Emoji placeholder — images removed per design spec */}
          <div className={styles.csPh} style={{ display: 'flex' }}>
            {title === 'Administrative Block' ? '🏛️' : title === 'Central Library' ? '📚' : '🔬'}
          </div>
          <div className={styles.csOverlay}>
            <h3>{title}</h3>
            <p>{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <NewsTicker />
      <Hero />
      <NaacStrip />
      <QuickLinks />
      <LatestNotices />
      <CampusStrip />
      <ImpactCounters />
      <AcademicsPreview />
      <ResearchStrip />
      <VCMessage />
      <AdmissionBanner />
    </>
  );
}
