import styles from './PageHero.module.css';
import { useNavigation } from '@/hooks/useNavigation';

interface Crumb { label: string; pageId?: string }

interface Props {
  title: string;
  titleHi?: string;
  subtitle?: string;
  crumbs?: Crumb[];
  bg?: string;
}

export default function PageHero({ title, titleHi, subtitle, crumbs = [], bg }: Props) {
  const { navigateTo } = useNavigation();
  return (
    <div className={styles.hero} style={bg ? { backgroundImage: `url(${bg})` } : {}}>
      <div className={styles.overlay} />
      <div className={styles.inner}>
        {titleHi && <p className={`${styles.hi} bi-hi`}>{titleHi}</p>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.sub}>{subtitle}</p>}
        {crumbs.length > 0 && (
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <button onClick={() => navigateTo('home')} className={styles.crumbLink}>Home</button>
            {crumbs.map((c, i) => (
              <span key={i}>
                <span className={styles.sep}>›</span>
                {c.pageId ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <button className={styles.crumbLink} onClick={() => navigateTo(c.pageId as any)}>{c.label}</button>
                ) : (
                  <span className={styles.crumbCurrent}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
