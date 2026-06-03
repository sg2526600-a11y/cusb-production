import styles from './Badge.module.css';
import type { NoticeTag } from '@/types';

const TAG_META: Record<NoticeTag, { label: string; color: string }> = {
  exam:      { label: 'Exam',       color: '#1d4ed8' },
  result:    { label: 'Result',     color: '#059669' },
  notice:    { label: 'Notice',     color: '#7c3aed' },
  scholar:   { label: 'Scholarship',color: '#b45309' },
  hostel:    { label: 'Hostel',     color: '#db2777' },
  placement: { label: 'Placement',  color: '#0369a1' },
  download:  { label: 'Download',   color: '#6b5e55' },
};

interface Props {
  type: NoticeTag;
  className?: string;
}

export default function Badge({ type, className = '' }: Props) {
  const meta = TAG_META[type] ?? { label: type, color: '#6b5e55' };
  return (
    <span
      className={`${styles.badge} ${className}`}
      style={{ background: meta.color + '18', color: meta.color, border: `1px solid ${meta.color}35` }}
    >
      {meta.label}
    </span>
  );
}
