import Badge from './Badge';
import type { Notice } from '@/types';
import styles from './NoticeRow.module.css';

interface Props {
  notice: Notice;
}

export default function NoticeRow({ notice }: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.left}>
        <div className={styles.topLine}>
          <Badge type={notice.type} />
          {notice.isNew && <span className={styles.newBadge}>NEW</span>}
          <span className={styles.date}>{notice.date}</span>
        </div>
        <a href={notice.url} target="_blank" rel="noopener noreferrer" className={styles.title}>
          {notice.title}
        </a>
        <p className={styles.body}>{notice.body}</p>
      </div>
      {notice.pdfUrl && (
        <a
          href={notice.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.pdfBtn}
          title="Download PDF"
          aria-label={`Download PDF for ${notice.title}`}
        >
          📄 PDF
        </a>
      )}
    </div>
  );
}
