import styles from './SectionHeader.module.css';

interface Props {
  preLabel?: string;
  title: string;
  titleHi?: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ preLabel, title, titleHi, subtitle, align = 'center' }: Props) {
  return (
    <div className={styles.wrap} style={{ textAlign: align }}>
      {preLabel && <p className={styles.pre}>{preLabel}</p>}
      {titleHi && <p className="bi-hi" style={{ fontSize: '1.1rem', marginBottom: '.25rem' }}>{titleHi}</p>}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.rule} style={{ margin: align === 'center' ? '1rem auto' : '1rem 0' }} />
      {subtitle && <p className={styles.sub}>{subtitle}</p>}
    </div>
  );
}
