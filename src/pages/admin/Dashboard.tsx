// ─── Admin Dashboard ──────────────────────────────────────────────────────────
// Route: /admin/dashboard (add to routes/index.ts)
// Requires: role >= university_admin

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks';
import { Navigate, Link } from 'react-router-dom';
import styles from './Admin.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DashboardStats {
  faculty:      number;
  departments:  number;
  notices:      number;
  queries:      number;
  news:         number;
  events:       number;
  pendingQueries: number;
  newNotices:   number;
}

interface RecentActivity {
  id:         string;
  type:       string;
  title:      string;
  created_at: string;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label, value, icon, sub, href, color,
}: {
  label: string;
  value: number | string;
  icon:  string;
  sub?:  string;
  href?: string;
  color?: string;
}) {
  const inner = (
    <div className={styles.statCard} style={{ borderTopColor: color }}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
      {sub && <div className={styles.statSub}>{sub}</div>}
    </div>
  );
  return href ? <Link to={href}>{inner}</Link> : inner;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { user, loading: authLoading, isAdmin } = useAuth();

  console.log('DASHBOARD isAdmin =', isAdmin);
  console.log('DASHBOARD user =', user);

  const [stats, setStats]     = useState<DashboardStats | null>(null);
  const [recent, setRecent]   = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !isAdmin) return;

    async function loadStats() {
      const [
        { count: faculty },
        { count: departments },
        { count: notices },
        { count: queries },
        { count: news },
        { count: events },
        { count: pending },
        { count: newNotices },
      ] = await Promise.all([
        supabase.from('faculty_members').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('departments').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('notices').select('*', { count: 'exact', head: true }).eq('is_published', true),
        supabase.from('contact_queries').select('*', { count: 'exact', head: true }),
        supabase.from('news').select('*', { count: 'exact', head: true }).eq('is_published', true),
        supabase.from('events').select('*', { count: 'exact', head: true }).eq('is_published', true),
        supabase.from('contact_queries').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('notices').select('*', { count: 'exact', head: true }).eq('is_new', true).eq('is_published', true),
      ]);

      setStats({
        faculty:        faculty ?? 0,
        departments:    departments ?? 0,
        notices:        notices ?? 0,
        queries:        queries ?? 0,
        news:           news ?? 0,
        events:         events ?? 0,
        pendingQueries: pending ?? 0,
        newNotices:     newNotices ?? 0,
      });

      // Recent activity: last 8 notices
      const { data: recentNotices } = await supabase
        .from('notices')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(8);

      setRecent(
        (recentNotices ?? []).map((n: { id: string; title: string; created_at: string }) => ({
          id:         n.id,
          type:       '📋 Notice',
          title:      n.title,
          created_at: n.created_at,
        }))
      );

      setLoading(false);
    }

    loadStats();
  }, [authLoading, isAdmin]);

  if (authLoading) return <div className={styles.loader}>Loading…</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;
  if (loading) return <div className={styles.loader}>Loading dashboard…</div>;

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>CUSB Admin Dashboard</h1>
          <p className={styles.subtitle}>Welcome back, {user.profile?.full_name ?? user.email}</p>
        </div>
        <button className={styles.btnSecondary} onClick={() => {}}>Refresh</button>
      </header>

      {/* Stats grid */}
      {stats && (
        <section className={styles.statsGrid}>
          <StatCard label="Faculty"     value={stats.faculty}     icon="👨‍🏫" color="#3b82f6" href="/admin/faculty" />
          <StatCard label="Departments" value={stats.departments} icon="🏛️"  color="#8b5cf6" href="/admin/departments" />
          <StatCard
            label="Notices"
            value={stats.notices}
            icon="📋"
            color="#10b981"
            sub={`${stats.newNotices} new`}
            href="/admin/notices"
          />
          <StatCard
            label="Queries"
            value={stats.queries}
            icon="💬"
            color="#f59e0b"
            sub={`${stats.pendingQueries} pending`}
            href="/admin/queries"
          />
          <StatCard label="News"   value={stats.news}   icon="📰" color="#ef4444" href="/admin/news" />
          <StatCard label="Events" value={stats.events} icon="🎉" color="#06b6d4" href="/admin/events" />
        </section>
      )}

      {/* Quick actions */}
      <section className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionGrid}>
          {[
            { icon: '➕', label: 'Add Faculty',   href: '/admin/faculty/new' },
            { icon: '📢', label: 'Post Notice',   href: '/admin/notices/new' },
            { icon: '📰', label: 'Write News',    href: '/admin/news/new' },
            { icon: '📅', label: 'Add Event',     href: '/admin/events/new' },
            { icon: '💬', label: 'View Queries',  href: '/admin/queries' },
            { icon: '⚙️', label: 'Site Settings', href: '/admin/settings' },
          ].map((a) => (
            <Link key={a.href} to={a.href} className={styles.actionCard}>
              <span className={styles.actionIcon}>{a.icon}</span>
              <span className={styles.actionLabel}>{a.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section className={styles.recent}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.activityList}>
          {recent.map((item) => (
            <div key={item.id} className={styles.activityRow}>
              <span className={styles.activityType}>{item.type}</span>
              <span className={styles.activityTitle}>{item.title}</span>
              <span className={styles.activityDate}>
                {new Date(item.created_at).toLocaleDateString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
