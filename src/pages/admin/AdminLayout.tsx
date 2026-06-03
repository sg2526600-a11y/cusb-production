// ─── Admin Layout ─────────────────────────────────────────────────────────────
// Sidebar + content shell wrapping all /admin/* pages.
// Add to your App.tsx router as a layout route.

import { useState } from 'react';
import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import styles from './AdminLayout.module.css';

// ─── Nav config ───────────────────────────────────────────────────────────────

const NAV = [
  { icon: '📊', label: 'Dashboard',   href: '/admin/dashboard' },
  { icon: '👨‍🏫', label: 'Faculty',      href: '/admin/faculty' },
  { icon: '🏛️',  label: 'Departments', href: '/admin/departments' },
  { icon: '📋', label: 'Notices',     href: '/admin/notices' },
  { icon: '📰', label: 'News',        href: '/admin/news' },
  { icon: '📅', label: 'Events',      href: '/admin/events' },
  { icon: '💬', label: 'Queries',     href: '/admin/queries' },
  { icon: '🎓', label: 'Admissions',  href: '/admin/admissions' },
  { icon: '📖', label: 'IQAC Docs',   href: '/admin/iqac' },
  { icon: '❓', label: 'FAQ / Setu',  href: '/admin/faq' },
  { icon: '⚙️', label: 'Settings',    href: '/admin/settings' },
];

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function AdminLayout() {
  const { user, loading, isEditor, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading)             return <div className={styles.splash}>Loading…</div>;
  if (!user)
    return <Navigate to="/admin/login" replace />;


  console.log('USER', user);
  console.log('PROFILE', user?.profile);
  console.log('ROLE', user?.profile?.role);
  console.log('EDITOR', isEditor);


  if (!isEditor) return <Navigate to="/" replace />;
  async function handleSignOut() {
    await signOut();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className={styles.shell}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <span className={styles.brandIcon}>🎓</span>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>CUSB Admin</span>
            <span className={styles.brandSub}>Portal</span>
          </div>
        </div>

        {/* User info */}
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {user.profile?.full_name?.charAt(0)?.toUpperCase() ?? '?'}
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user.profile?.full_name ?? user.email}</span>
            <span className={styles.userRole}>{user.profile?.role?.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navActive : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sign out */}
        <div className={styles.sidebarFooter}>
          <a
            href="/"
            className={styles.navItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.navIcon}>🌐</span>
            <span className={styles.navLabel}>View Site</span>
          </a>
          <button className={styles.signOutBtn} onClick={handleSignOut}>
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className={styles.main}>
        {/* Mobile topbar */}
        <header className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
          <span className={styles.topbarTitle}>CUSB Admin</span>
          <button className={styles.topbarSignOut} onClick={handleSignOut}>Sign out</button>
        </header>

        {/* Page content */}
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
