// ─── Departments (Admin) ─────────────────────────────────────────────────────────
// Route: /admin/Departments
// TODO: Full implementation coming soon.

import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import styles from './Admin.module.css';

export default function DepartmentsStub() {
  const { isEditor, loading } = useAuth();
  if (loading) return <div className={styles.loader}>Loading…</div>;
  if (!isEditor) return <Navigate to="/admin/login" replace />;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>🏛️ Departments</h1>
          <p className={styles.pageSubtitle}>Manage university departments</p>
        </div>
      </div>
      <div className={styles.comingSoon}>
        <div className={styles.comingSoonIcon}>🏛️</div>
        <h2>Coming Soon</h2>
        <p>This section is under development. Check back soon for full Departments management functionality.</p>
      </div>
    </div>
  );
}
