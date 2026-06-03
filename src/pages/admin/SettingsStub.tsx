// ─── Settings (Admin) ─────────────────────────────────────────────────────────
// Route: /admin/Settings
// TODO: Full implementation coming soon.

import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import styles from './Admin.module.css';

export default function SettingsStub() {
  const { isEditor, loading } = useAuth();
  if (loading) return <div className={styles.loader}>Loading…</div>;
  if (!isEditor) return <Navigate to="/admin/login" replace />;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>⚙️ Settings</h1>
          <p className={styles.pageSubtitle}>Configure site settings</p>
        </div>
      </div>
      <div className={styles.comingSoon}>
        <div className={styles.comingSoonIcon}>⚙️</div>
        <h2>Coming Soon</h2>
        <p>This section is under development. Check back soon for full Settings management functionality.</p>
      </div>
    </div>
  );
}
