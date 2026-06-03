import type { FacultyMember } from '@/data/faculty';
import styles from './FacultyCard.module.css';

interface FacultyCardProps {
  member: FacultyMember;
}

// ─── Designation badge colour mapping ────────────────────────────────────────
const DESG_CLASS: Record<FacultyMember['designation'], string> = {
  'Professor':            styles.desgProf,
  'Associate Professor':  styles.desgAssoc,
  'Assistant Professor':  styles.desgAsst,
};

export default function FacultyCard({ member }: FacultyCardProps) {
  const desgClass = DESG_CLASS[member.designation];

  return (
    <div className={styles.card}>
      {/* Avatar */}
      <div className={styles.avatar}>
        <span className={styles.avatarEmoji} aria-hidden="true">{member.emoji}</span>
        {member.isHead && (
          <span className={styles.headBadge} title="Head of Department">HoD</span>
        )}
      </div>

      {/* Content */}
      <div className={styles.body}>
        <p className={`${styles.desg} ${desgClass}`}>{member.designation}</p>
        <h4 className={styles.name}>{member.name}</h4>
        <p className={styles.dept}>{member.department}</p>
        <p className={styles.spec}>{member.specialisation}</p>

        {/* Actions */}
        <div className={styles.actions}>
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className={styles.action}
              aria-label={`Email ${member.name}`}
              title={member.email}
            >
              ✉ Email
            </a>
          )}
          {member.profileUrl && (
            <a
              href={member.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.action} ${styles.actionProfile}`}
              aria-label={`View profile of ${member.name}`}
            >
              Profile →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
