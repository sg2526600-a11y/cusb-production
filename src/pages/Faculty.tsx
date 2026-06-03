import { useState, useMemo } from 'react';
import PageHero from '@/components/ui/PageHero';
import FacultyCard from '@/components/faculty/FacultyCard';
import { FACULTY_DATA, SCHOOLS, filterFaculty } from '@/data/faculty';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Faculty.module.css';

// ─── Stats strip ─────────────────────────────────────────────────────────────
function FacultyStats() {
  const professors     = FACULTY_DATA.filter((m) => m.designation === 'Professor').length;
  const assocProfs     = FACULTY_DATA.filter((m) => m.designation === 'Associate Professor').length;
  const asstProfs      = FACULTY_DATA.filter((m) => m.designation === 'Assistant Professor').length;

  const items = [
    { value: '150+', label: 'Total Faculty', icon: '👨‍🏫' },
    { value: String(professors),    label: 'Professors',   icon: '🎓' },
    { value: String(assocProfs),    label: 'Associate Professors', icon: '🔬' },
    { value: String(asstProfs),     label: 'Assistant Professors', icon: '📚' },
    { value: '26',   label: 'Departments', icon: '🏛️' },
  ];

  return (
    <div className={styles.statsBar}>
      {items.map(({ value, label, icon }) => (
        <div key={label} className={styles.statItem}>
          <span className={styles.statIcon}>{icon}</span>
          <strong className={styles.statVal}>{value}</strong>
          <span className={styles.statLabel}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── School filter pills ──────────────────────────────────────────────────────
function SchoolFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (s: string) => void;
}) {
  return (
    <div className={styles.filterWrap} role="group" aria-label="Filter by school">
      {SCHOOLS.map((s) => (
        <button
          key={s}
          className={`${styles.pill} ${active === s ? styles.pillActive : ''}`}
          onClick={() => onChange(s)}
          aria-pressed={active === s}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Faculty() {
  const [activeSchool, setActiveSchool] = useState<string>('All Schools');
  const [query, setQuery] = useState('');
  const gridRef = useScrollReveal({ stagger: true });

  const filtered = useMemo(
    () => filterFaculty(FACULTY_DATA, activeSchool, query),
    [activeSchool, query],
  );

  const handleSchoolChange = (s: string) => {
    setActiveSchool(s);
    setQuery('');
  };

  return (
    <>
      <PageHero
        title="Faculty & Staff"
        titleHi="शिक्षक एवं कर्मचारी"
        subtitle="Meet CUSB's 150+ dedicated scholars — researchers, teachers, and mentors across 26 departments shaping the next generation."
        crumbs={[{ label: 'Faculty & Staff' }]}
      />

      {/* Stats */}
      <FacultyStats />

      {/* Filters + Search */}
      <section className={styles.controls}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon} aria-hidden="true">🔍</span>
          <input
            type="search"
            className={styles.search}
            placeholder="Search by name, department or specialisation…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search faculty"
          />
          {query && (
            <button
              className={styles.clearSearch}
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <SchoolFilter active={activeSchool} onChange={handleSchoolChange} />
      </section>

      {/* Results count */}
      <div className={styles.resultsMeta}>
        <span>
          Showing <strong>{filtered.length}</strong>{' '}
          {filtered.length === 1 ? 'faculty member' : 'faculty members'}
          {activeSchool !== 'All Schools' && ` · ${activeSchool}`}
          {query && ` · "${query}"`}
        </span>
        {(activeSchool !== 'All Schools' || query) && (
          <button
            className={styles.clearAll}
            onClick={() => { setActiveSchool('All Schools'); setQuery(''); }}
          >
            Clear filters ✕
          </button>
        )}
      </div>

      {/* Faculty grid */}
      <section className={styles.grid}>
        {filtered.length > 0 ? (
          <div ref={gridRef} className={styles.cardGrid}>
            {filtered.map((member) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>😔 No faculty found for your search.</p>
            <button
              className={styles.resetBtn}
              onClick={() => { setActiveSchool('All Schools'); setQuery(''); }}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Disclaimer & link to official directory */}
      <section className={styles.disclaimer}>
        <div className={styles.disclaimerInner}>
          <p className={styles.disclaimerText}>
            The above listing is illustrative. For the complete, authoritative faculty directory
            with detailed profiles, publications, and contact information, visit the official
            CUSB website.
          </p>
          <a
            href="https://www.cusb.ac.in/index.php?option=com_content&view=category&id=5&Itemid=121"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.offLink}
          >
            View Official Faculty Directory →
          </a>
        </div>
      </section>
    </>
  );
}
