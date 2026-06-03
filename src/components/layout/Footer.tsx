import { useNavigation } from '@/hooks/useNavigation';
import { SITE_CONFIG } from '@/constants/site';
import styles from './Footer.module.css';

const COL1_LINKS = [
  { label: 'About CUSB',     page: 'about' as const },
  { label: 'Vice-Chancellor',page: 'about' as const },
  { label: 'Faculty & Staff', page: 'faculty' as const },
  { label: 'Departments',    page: 'departments' as const },
  { label: 'Research',       page: 'research' as const },
  { label: 'IQAC',           page: 'iqac' as const },
  { label: 'NIRF Ranking',   href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=679&Itemid=637' },
  { label: 'RTI Portal',     href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=220' },
];

const COL2_LINKS = [
  { label: 'Academic Programmes', page: 'academics' as const },
  { label: 'Admissions (CUET)',   href: 'https://cuet.samarth.ac.in' },
  { label: 'Ph.D. via URET',      page: 'research' as const },
  { label: 'Scholarships',        href: 'https://scholarships.gov.in' },
  { label: 'Results Portal',      href: 'https://cusb.ac.in/index.php?Itemid=194&id=79&option=com_content&view=article' },
  { label: 'Examination Notices', page: 'news' as const },
  { label: 'Anti-Ragging',        href: 'https://antiragging.in' },
  { label: 'Grievance e-Samadhan',href: 'https://www.ugc.gov.in/e-samadhan' },
];

const COL3_LINKS = [
  { label: 'Samarth ERP Portal',    href: 'https://cusbadm.samarth.edu.in' },
  { label: 'SWAYAM / NPTEL',        href: 'https://swayam.gov.in' },
  { label: 'UGC Website',           href: 'https://www.ugc.gov.in' },
  { label: 'MHRD / MoE',            href: 'https://www.education.gov.in' },
  { label: 'NTA (CUET)',            href: 'https://nta.ac.in' },
  { label: 'NSP Scholarships',      href: 'https://scholarships.gov.in' },
  { label: 'e-PG Pathshala',        href: 'https://epgp.inflibnet.ac.in' },
  { label: 'Digital Library NDLI',  href: 'https://ndl.iitkgp.ac.in' },
];

export default function Footer() {
  const { navigateTo } = useNavigation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <img
            src="https://www.cusb.ac.in/images/cusb/logo.png"
            alt="CUSB Logo"
            className={styles.logo}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div>
            <p className="ft-hi">{SITE_CONFIG.nameHi}</p>
            <h3 className={styles.name}>{SITE_CONFIG.name}</h3>
            <p className={styles.motto}>"{SITE_CONFIG.motto}"</p>
            <p className={styles.mottoEn}>{SITE_CONFIG.mottoEn}</p>
            <p className={styles.naac}>NAAC Accredited — {SITE_CONFIG.naac}</p>
            <div className={styles.social}>
              {Object.entries(SITE_CONFIG.socialLinks).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                  {key === 'facebook' && '📘'}
                  {key === 'twitter' && '🐦'}
                  {key === 'youtube' && '📺'}
                  {key === 'instagram' && '📷'}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className={styles.col}>
          <p className={`fch-hi ${styles.colHead}`}>विश्वविद्यालय</p>
          <h4 className={`fch-en ${styles.colHead}`}>University</h4>
          {COL1_LINKS.map(({ label, href, page }) =>
            href ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>{label}</a>
            ) : (
              <button key={label} className={styles.link} onClick={() => page && navigateTo(page)}>{label}</button>
            )
          )}
        </div>

        <div className={styles.col}>
          <p className={`fch-hi ${styles.colHead}`}>शिक्षा</p>
          <h4 className={`fch-en ${styles.colHead}`}>Academics</h4>
          {COL2_LINKS.map(({ label, href, page }) =>
            href ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>{label}</a>
            ) : (
              <button key={label} className={styles.link} onClick={() => page && navigateTo(page)}>{label}</button>
            )
          )}
        </div>

        <div className={styles.col}>
          <p className={`fch-hi ${styles.colHead}`}>पोर्टल</p>
          <h4 className={`fch-en ${styles.colHead}`}>Portals &amp; Links</h4>
          {COL3_LINKS.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>{label}</a>
          ))}
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <p className={`fch-hi ${styles.colHead}`}>संपर्क</p>
          <h4 className={`fch-en ${styles.colHead}`}>Contact</h4>
          <address className={styles.address}>
            <p>📍 {SITE_CONFIG.location}</p>
            <p>📞 <a href={`tel:${SITE_CONFIG.phone}`}>{SITE_CONFIG.phone}</a></p>
            <p>✉️ <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a></p>
          </address>
          <button className={styles.contactBtn} onClick={() => navigateTo('contact')}>
            Contact Us →
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p>
          © {year} {SITE_CONFIG.name}. All rights reserved. |{' '}
          <span style={{ opacity: .6, fontSize: '.82em' }}>
            Established by the Central Universities Act, Parliament of India, 2009
          </span>
        </p>
        <div className={styles.bottomLinks}>
          <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Terms of Use</a>
          <a href="https://www.cusb.ac.in/index.php?option=com_content&view=article&id=220" target="_blank" rel="noopener noreferrer">RTI</a>
          <a href="https://antiragging.in" target="_blank" rel="noopener noreferrer">Anti-Ragging</a>
        </div>
      </div>
    </footer>
  );
}
