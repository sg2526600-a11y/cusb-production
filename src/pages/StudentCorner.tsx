import { useState, useEffect } from 'react';
import PageHero from '@/components/ui/PageHero';
import NoticeRow from '@/components/ui/NoticeRow';
import { NOTICES, QUICK_ACCESS } from '@/constants/notices';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { NoticeTag } from '@/types';
import styles from './StudentCorner.module.css';

// ─── SQA module data (extracted + upgraded from v11 MODS[]) ──────────────────
interface SqaItem {
  title: string;
  date: string;
  isNew: boolean;
  url: string;
}

interface SqaModule {
  id: string;
  icon: string;
  labelEn: string;
  labelHi: string;
  color: string;
  items: SqaItem[];
  viewAllUrl: string;
}

const SQA_MODULES: SqaModule[] = [
  {
    id: 'notices',
    icon: '📢',
    labelEn: 'Notices',
    labelHi: 'सूचनाएं',
    color: 'rgba(123,29,29,.08)',
    viewAllUrl: 'https://www.cusb.ac.in/index.php?option=com_content&view=category&id=12',
    items: [
      { title: 'Admission Notification 2026-27 — PG Programmes via CUET-PG', date: 'May 2026', isNew: true, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=category&id=12' },
      { title: 'Academic Calendar AY 2025-26 — Ongoing PG Batches (F.No. AE1135)', date: 'Jul 2025', isNew: false, url: 'https://cusb.ac.in/index.php?Itemid=191&id=76&option=com_content&view=article' },
      { title: 'Academic Calendar AY 2025-26 — Newly Admitted PG Students (F.No. AE1136)', date: 'Jul 2025', isNew: false, url: 'https://cusb.ac.in/index.php?Itemid=191&id=76&option=com_content&view=article' },
      { title: 'Anti-Ragging Policy Notice — F.No. CUSB/Rector/2025', date: 'Aug 2025', isNew: false, url: 'https://antiragging.in' },
      { title: 'Office Orders / Circulars / Notifications — General', date: 'Ongoing', isNew: false, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=category&id=56' },
    ],
  },
  {
    id: 'exam',
    icon: '📅',
    labelEn: 'Exam Schedule',
    labelHi: 'परीक्षा कार्यक्रम',
    color: 'rgba(200,146,42,.08)',
    viewAllUrl: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=77&Itemid=192',
    items: [
      { title: 'End-Term Exam Timetable — UG, PG & Ph.D. Even Sem 2025 (F.No. AE814)', date: 'May 2025', isNew: true, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=77&Itemid=192' },
      { title: 'Revised Timetable: End-Term Even Sem 2025 — Continuation of AE814', date: 'May 2025', isNew: true, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=77&Itemid=192' },
      { title: 'Academic Calendar 2025-26 (Jul–Dec) — UG Programmes (F.No. AE1344)', date: 'Aug 2025', isNew: false, url: 'https://cusb.ac.in/index.php?Itemid=191&id=76&option=com_content&view=article' },
      { title: 'Exam Pattern: 70% End-Sem + 30% Internal · Pass: 40% (UG) / 50% (PG)', date: 'Ongoing', isNew: false, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=77&Itemid=192' },
    ],
  },
  {
    id: 'results',
    icon: '📊',
    labelEn: 'Results',
    labelHi: 'परिणाम',
    color: 'rgba(16,185,129,.08)',
    viewAllUrl: 'https://cusb.ac.in/index.php?Itemid=194&id=79&option=com_content&view=article',
    items: [
      { title: 'M.A. English 2nd Semester Result (Session 2024-26) — F.No. AE-1081 dt. 20.06.2025', date: 'Jun 2025', isNew: true, url: 'https://www.cusb.ac.in/images/2025/sem_exam/may_25/206.pdf' },
      { title: 'Odd Semester Results 2024 — UG/PG All Departments', date: 'Mar 2025', isNew: false, url: 'https://cusb.ac.in/index.php?Itemid=194&id=79&option=com_content&view=article' },
      { title: 'Ph.D. Course Work Results — Batch 2024', date: 'Aug 2024', isNew: false, url: 'https://cusb.ac.in/index.php?Itemid=194&id=79&option=com_content&view=article' },
      { title: 'Check Results on Samarth Student Portal', date: 'Ongoing', isNew: false, url: 'https://cusbadm.samarth.edu.in' },
    ],
  },
  {
    id: 'downloads',
    icon: '📥',
    labelEn: 'Downloads',
    labelHi: 'डाउनलोड',
    color: 'rgba(59,130,246,.08)',
    viewAllUrl: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=445&Itemid=591',
    items: [
      { title: 'PG Admission Notification 2026-27 — Seat Matrix & Eligibility', date: 'May 2026', isNew: true, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=897&Itemid=690' },
      { title: 'Prospectus 2025-26 (UG/PG/Ph.D.) · PDF', date: 'Mar 2025', isNew: false, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=445' },
      { title: 'Student Forms — Exam, Migration, TC, Bonafide, etc.', date: '2025', isNew: false, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=445' },
      { title: 'Fee Structure 2025-26 · PDF', date: '2025', isNew: false, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=445' },
      { title: 'Annual Report & Accounts — CUSB 2024', date: '2024', isNew: false, url: 'https://cusb.ac.in/index.php?option=com_content&view=article&id=8&Itemid=111' },
    ],
  },
  {
    id: 'scholarships',
    icon: '🎓',
    labelEn: 'Scholarships',
    labelHi: 'छात्रवृत्ति',
    color: 'rgba(168,85,247,.08)',
    viewAllUrl: 'https://scholarships.gov.in',
    items: [
      { title: 'National Scholarship Portal (NSP) — Central Government Scholarships', date: 'Ongoing', isNew: true, url: 'https://scholarships.gov.in' },
      { title: 'Bihar State Scholarship — e-Kalyan Portal, Govt. of Bihar', date: 'Ongoing', isNew: false, url: 'https://ekalyan.bih.nic.in' },
      { title: 'INSPIRE Scholarship — DST (B.Sc. / Integrated M.Sc. Students)', date: 'Ongoing', isNew: false, url: 'https://online-inspire.gov.in' },
      { title: 'SC/ST Post-Matric Scholarship — Ministry of Social Justice', date: 'Ongoing', isNew: false, url: 'https://scholarships.gov.in' },
      { title: 'UGC-JRF Fellowship Disbursement — April 2025', date: 'Apr 2025', isNew: false, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=category&id=12' },
    ],
  },
  {
    id: 'hostel',
    icon: '🏠',
    labelEn: 'Hostel',
    labelHi: 'छात्रावास',
    color: 'rgba(249,115,22,.08)',
    viewAllUrl: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=20&Itemid=124',
    items: [
      { title: 'Hostel Allotment Notice — Boys & Girls Hostels, AY 2025-26', date: 'Jul 2025', isNew: true, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=category&id=12' },
      { title: 'Hostel Fee: ₹8,000/semester · Boys: 500 seats · Girls: 300 seats', date: '2025', isNew: false, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=20&Itemid=124' },
      { title: 'Hostel Facilities: Reading Room, Wi-Fi, Laundry, Medical, Gymnasium', date: 'Ongoing', isNew: false, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=20&Itemid=124' },
      { title: 'UGC Anti-Ragging Helpline: 1800-180-5522 (24×7)', date: 'Ongoing', isNew: false, url: 'https://antiragging.in' },
    ],
  },
  {
    id: 'placement',
    icon: '💼',
    labelEn: 'Placement',
    labelHi: 'नियुक्ति',
    color: 'rgba(14,165,233,.08)',
    viewAllUrl: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=20&Itemid=124',
    items: [
      { title: 'Campus Placement Drive 2025 — Registration Open for Final Year Students', date: 'Oct 2025', isNew: true, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=category&id=12' },
      { title: 'Career Fair 2025 — 20+ Companies Participating', date: 'Nov 2025', isNew: false, url: 'https://www.cusb.ac.in' },
      { title: 'Training & Placement Cell — Contact: placement@cusb.ac.in', date: 'Ongoing', isNew: false, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=20&Itemid=124' },
      { title: 'Resume / CV Writing Workshop — DSW Office', date: 'Aug 2025', isNew: false, url: 'https://www.cusb.ac.in' },
    ],
  },
  {
    id: 'services',
    icon: '🛠️',
    labelEn: 'Student Services',
    labelHi: 'छात्र सेवाएं',
    color: 'rgba(100,116,139,.08)',
    viewAllUrl: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=20&Itemid=124',
    items: [
      { title: 'Character / Bonafide Certificate — Online via Samarth Portal', date: 'Ongoing', isNew: false, url: 'https://cusbadm.samarth.edu.in' },
      { title: 'Migration Certificate — Controller of Examinations Office', date: 'Ongoing', isNew: false, url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=25' },
      { title: 'Library Membership & OPAC — Central Library', date: 'Ongoing', isNew: false, url: 'https://www.cusb.ac.in' },
      { title: 'e-Samadhan Grievance Portal — UGC', date: 'Ongoing', isNew: false, url: 'https://www.ugc.gov.in/e-samadhan' },
      { title: 'Medical Facility — Campus Health Centre', date: 'Ongoing', isNew: false, url: 'https://www.cusb.ac.in' },
    ],
  },
];

// ─── Portal quick-access pills ────────────────────────────────────────────────
const PORTAL_PILLS = [
  { icon: '🎓', label: 'Samarth ERP Portal', href: 'https://cusbadm.samarth.edu.in' },
  { icon: '✉', label: 'CUSB Webmail', href: 'https://accounts.google.com/signin/v2/identifier?service=mail&hd=cusb.ac.in' },
  { icon: '💰', label: 'NSP Scholarships', href: 'https://scholarships.gov.in' },
  { icon: '🏦', label: 'Academic Bank', href: 'https://www.abc.gov.in' },
  { icon: '🚫', label: 'Anti-Ragging', href: 'https://antiragging.in' },
  { icon: '💻', label: 'SWAYAM', href: 'https://swayam.gov.in' },
  { icon: '📚', label: 'e-PG Pathshala', href: 'https://epgp.inflibnet.ac.in' },
  { icon: '🔬', label: 'INSPIRE (DST)', href: 'https://online-inspire.gov.in' },
];

// ─── SQA Module Card ──────────────────────────────────────────────────────────
function SqaCard({ mod }: { mod: SqaModule }) {
  const [open, setOpen] = useState(false);
  const newCount = mod.items.filter((i) => i.isNew).length;

  return (
    <div className={`${styles.sqaCard} ${open ? styles.sqaCardOpen : ''}`}>
      {/* Card header */}
      <button
        className={styles.sqaCardHeader}
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <span className={styles.sqaIcon}>{mod.icon}</span>
        <div className={styles.sqaLabels}>
          <span className="bi-hi">{mod.labelHi}</span>
          <span className={styles.sqaEn}>{mod.labelEn}</span>
        </div>
        {newCount > 0 && (
          <span className={styles.sqaBadge}>{newCount} NEW</span>
        )}
        <span
          className={`${styles.sqaChevron} ${open ? styles.sqaChevronOpen : ''}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>

      {/* Drawer */}
      {open && (
        <div className={styles.sqaDrawer}>
          {mod.items.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sqaItem}
            >
              <span
                className={`${styles.sqaDot} ${item.isNew ? styles.sqaDotNew : ''}`}
                aria-hidden="true"
              />
              <div className={styles.sqaItemContent}>
                <span className={styles.sqaItemTitle}>{item.title}</span>
                <span className={styles.sqaItemMeta}>
                  {item.isNew && <span className={styles.sqaNewTag}>NEW</span>}
                  {item.date}
                </span>
              </div>
              <span className={styles.sqaArrow} aria-hidden="true">↗</span>
            </a>
          ))}
          <a
            href={mod.viewAllUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sqaViewAll}
          >
            View all {mod.labelEn} →
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Notice tab types ─────────────────────────────────────────────────────────
type Tab = 'all' | NoticeTag;

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'all',       label: 'All',          emoji: '📋' },
  { id: 'exam',      label: 'Exam',         emoji: '📅' },
  { id: 'result',    label: 'Results',      emoji: '📊' },
  { id: 'notice',    label: 'Notices',      emoji: '📢' },
  { id: 'download',  label: 'Downloads',    emoji: '📥' },
  { id: 'scholar',   label: 'Scholarships', emoji: '🎓' },
  { id: 'hostel',    label: 'Hostel',       emoji: '🏠' },
  { id: 'placement', label: 'Placement',    emoji: '💼' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StudentCorner() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const gridRef  = useScrollReveal({ stagger: true });
  const sqaRef   = useScrollReveal({ stagger: true });
  const boardRef = useScrollReveal();

  // Live ticker
  const [tickerIdx, setTickerIdx] = useState(0);
  const tickerItems = NOTICES.filter((n) => n.isNew).map((n) => n.title);
  useEffect(() => {
    if (!tickerItems.length) return;
    const t = setInterval(() => setTickerIdx((p) => (p + 1) % tickerItems.length), 3500);
    return () => clearInterval(t);
  }, [tickerItems.length]);

  const filtered = activeTab === 'all'
    ? NOTICES
    : NOTICES.filter((n) => n.type === activeTab);

  return (
    <>
      <PageHero
        title="Student Corner"
        titleHi="छात्र कोना"
        subtitle="Your one-stop hub for exam timetables, results, scholarships, hostel info, notices and placement."
        crumbs={[{ label: 'Student Corner' }]}
      />

      {/* ─── Live ticker ─────────────────────────────────────────────────── */}
      {tickerItems.length > 0 && (
        <div className={styles.ticker} aria-live="polite" aria-atomic="true">
          <span className={styles.tickerLabel}>📢 LIVE</span>
          <span className={styles.tickerText}>{tickerItems[tickerIdx]}</span>
        </div>
      )}

      {/* ─── Portal pills ─────────────────────────────────────────────────── */}
      <section className={styles.portals}>
        <p className={styles.portalsLabel}>Quick Portals</p>
        <div className={styles.pillsWrap}>
          {PORTAL_PILLS.map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="sqa-pill"
            >
              {icon} {label}
            </a>
          ))}
        </div>
      </section>

      {/* ─── Quick access cards ───────────────────────────────────────────── */}
      <section className={styles.qa}>
        <div ref={gridRef} className={styles.qaGrid}>
          {QUICK_ACCESS.map(({ icon, label, sub, tab, color, textColor }) => (
            <button
              key={label}
              className={styles.qaCard}
              style={{ background: color, color: textColor, border: `1px solid ${textColor}30` }}
              onClick={() => setActiveTab(tab as Tab)}
            >
              <span className={styles.qaIcon}>{icon}</span>
              <strong>{label}</strong>
              <span>{sub}</span>
            </button>
          ))}
        </div>
      </section>

      <div className={styles.rule} />

      {/* ─── SQA Module Grid (from v11 MODS system) ────────────────────────── */}
      <section className={styles.sqaSection}>
        <div className={styles.sqaHeader}>
          <div>
            <p className="s-eye">Quick Access</p>
            <h2 className="s-ttl">Student Services</h2>
          </div>
          <p className={styles.sqaSubtitle}>Click any module to expand notices and links</p>
        </div>
        <div ref={sqaRef} className={styles.sqaGrid}>
          {SQA_MODULES.map((mod) => (
            <SqaCard key={mod.id} mod={mod} />
          ))}
        </div>
      </section>

      <div className={styles.rule} />

      {/* ─── Notice Board with tabs ───────────────────────────────────────── */}
      <section className={styles.board}>
        <div className={styles.boardHeader}>
          <h2 className={styles.boardTitle}>Notice Board</h2>
          <p className={styles.boardSub}>{filtered.length} notices</p>
        </div>

        <div className={styles.tabs} role="tablist">
          {TABS.map(({ id, label, emoji }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              className={`${styles.tab} ${activeTab === id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(id)}
            >
              {emoji} {label}
            </button>
          ))}
        </div>

        <div ref={boardRef} className={styles.noticeList} role="tabpanel">
          {filtered.length > 0
            ? filtered.map((n) => <NoticeRow key={n.id} notice={n} />)
            : <p className={styles.empty}>No notices in this category yet.</p>
          }
        </div>
      </section>

      {/* ─── Important links ──────────────────────────────────────────────── */}
      <section className={styles.links}>
        <h2 className={styles.linksTitle}>Important Student Links</h2>
        <div className={styles.linksGrid}>
          {[
            { icon: '🎓', label: 'Samarth ERP Portal',  sub: 'Fee, exam forms, result',          href: 'https://cusbadm.samarth.edu.in' },
            { icon: '📋', label: 'CUET Admissions',      sub: 'NTA official portal',              href: 'https://cuet.samarth.ac.in' },
            { icon: '💰', label: 'NSP Scholarships',     sub: 'Central govt. scholarships',       href: 'https://scholarships.gov.in' },
            { icon: '📚', label: 'e-Kalyan Bihar',       sub: 'State scholarships',               href: 'https://ekalyan.bih.nic.in' },
            { icon: '🚫', label: 'Anti-Ragging',         sub: 'Helpline 1800-180-5522',           href: 'https://antiragging.in' },
            { icon: '📩', label: 'e-Samadhan',           sub: 'Grievance portal (UGC)',           href: 'https://www.ugc.gov.in/e-samadhan' },
            { icon: '🖥️', label: 'SWAYAM / NPTEL',       sub: 'Online courses',                   href: 'https://swayam.gov.in' },
            { icon: '🔬', label: 'INSPIRE (DST)',         sub: 'Science scholarships',             href: 'https://online-inspire.gov.in' },
          ].map(({ icon, label, sub, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
              <span className={styles.linkIcon}>{icon}</span>
              <div>
                <p className={styles.linkLabel}>{label}</p>
                <p className={styles.linkSub}>{sub}</p>
              </div>
              <span className={styles.linkArrow}>↗</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
