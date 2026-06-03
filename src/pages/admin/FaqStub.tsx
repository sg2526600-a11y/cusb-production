// ─── FAQ / Setu (Admin) ─────────────────────────────────────────────────────────
// Route: /admin/Faq
// TODO: Full implementation coming soon.

import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import styles from './Admin.module.css';

export default function FaqStub() {
  const { isEditor, loading } = useAuth();
  if (loading) return <div className={styles.loader}>Loading…</div>;
  if (!isEditor) return <Navigate to="/admin/login" replace />;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>❓ FAQ / Setu</h1>
          <p className={styles.pageSubtitle}>Manage FAQ entries for the Setu chatbot</p>
        </div>
      </div>
      <div className={styles.comingSoon}>
        <div className={styles.comingSoonIcon}>❓</div>
        <h2>Coming Soon</h2>
        <p>This section is under development. Check back soon for full FAQ / Setu management functionality.</p>
      </div>
    </div>
  );
}
