// ─── Notices Management ───────────────────────────────────────────────────────
// Route: /admin/notices
// Full CRUD: create, edit, delete, pin, publish/unpublish

import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { useAuth } from '@/hooks';
import { noticesService } from '@/services/notices.service';
import { Navigate } from 'react-router-dom';
import type { NoticeRow, NoticeType } from '@/types/database';
import styles from './Admin.module.css';

const NOTICE_TYPES: NoticeType[] = ['exam', 'result', 'notice', 'scholar', 'hostel', 'placement', 'download'];

// ─── Notice form (shared for create + edit) ───────────────────────────────────

interface NoticeFormProps {
  initial?: Partial<NoticeRow>;
  onSave:   (data: Partial<NoticeRow>) => Promise<void>;
  onCancel: () => void;
}

function NoticeForm({ initial, onSave, onCancel }: NoticeFormProps) {
  const [form, setForm] = useState<Partial<NoticeRow>>({
    type:         'notice',
    title:        '',
    body:         '',
    url:          '',
    pdf_url:      '',
    is_new:       true,
    is_pinned:    false,
    is_published: true,
    ...initial,
  });
  const [busy, setBusy]   = useState(false);
  const [err, setErr]     = useState('');

  const set = (k: keyof NoticeRow, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim()) { setErr('Title is required'); return; }
    setBusy(true);
    setErr('');
    try {
      await onSave(form);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.noticeForm}>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label className={styles.label}>Type *</label>
          <select className={styles.select} value={form.type} onChange={(e) => set('type', e.target.value)}>
            {NOTICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className={`${styles.field} ${styles.spanFull}`}>
          <label className={styles.label}>Title *</label>
          <input
            className={styles.input}
            value={form.title ?? ''}
            onChange={(e) => set('title', e.target.value)}
            placeholder="Notice title…"
            required
          />
        </div>

        <div className={`${styles.field} ${styles.spanFull}`}>
          <label className={styles.label}>Body</label>
          <textarea
            className={styles.textarea}
            rows={4}
            value={form.body ?? ''}
            onChange={(e) => set('body', e.target.value)}
            placeholder="Notice description…"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>External URL</label>
          <input
            className={styles.input}
            type="url"
            value={form.url ?? ''}
            onChange={(e) => set('url', e.target.value)}
            placeholder="https://cusb.ac.in/…"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>PDF URL</label>
          <input
            className={styles.input}
            type="url"
            value={form.pdf_url ?? ''}
            onChange={(e) => set('pdf_url', e.target.value)}
            placeholder="https://…/file.pdf"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Notice Date</label>
          <input
            className={styles.input}
            type="date"
            value={form.notice_date ?? ''}
            onChange={(e) => set('notice_date', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Expires At</label>
          <input
            className={styles.input}
            type="datetime-local"
            value={form.expires_at?.slice(0, 16) ?? ''}
            onChange={(e) => set('expires_at', e.target.value ? new Date(e.target.value).toISOString() : null)}
          />
        </div>
      </div>

      {/* Toggles */}
      <div className={styles.toggleRow}>
        {(['is_new', 'is_pinned', 'is_published'] as const).map((k) => (
          <label key={k} className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={!!form[k]}
              onChange={(e) => set(k, e.target.checked)}
            />
            {k === 'is_new' ? 'Mark as New' : k === 'is_pinned' ? 'Pin Notice' : 'Published'}
          </label>
        ))}
      </div>

      {err && <div className={styles.error}>{err}</div>}

      <div className={styles.formActions}>
        <button type="button" className={styles.btnSecondary} onClick={onCancel}>Cancel</button>
        <button type="submit" className={styles.btnPrimary} disabled={busy}>
          {busy ? 'Saving…' : initial?.id ? 'Update Notice' : 'Create Notice'}
        </button>
      </div>
    </form>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function NoticesManagement() {
  const { isEditor } = useAuth();

  const [notices, setNotices] = useState<NoticeRow[]>([]);
  const [total,   setTotal]   = useState(0);
  const [page,    setPage]    = useState(1);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [search,    setSearch]    = useState('');

  const [showForm,  setShowForm]  = useState(false);
  const [editing,   setEditing]   = useState<NoticeRow | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await noticesService.listAdmin({
        type:   (typeFilter as NoticeType) || undefined,
        search: search || undefined,
        page,
        limit:  25,
      });
      setNotices(res.items);
      setTotal(res.total);
    } finally {
      setLoading(false);
    }
  }, [typeFilter, search, page]);

  // Load on mount + filter change
  useEffect(() => { void load(); }, [load]);

  const handleCreate = async (data: Partial<NoticeRow>) => {
    await noticesService.create(data as Parameters<typeof noticesService.create>[0]);
    setShowForm(false);
    void load();
  };

  const handleUpdate = async (data: Partial<NoticeRow>) => {
    if (!editing?.id) return;
    await noticesService.update(editing.id, data);
    setEditing(null);
    void load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this notice permanently?')) return;
    setDeletingId(id);
    try {
      await noticesService.delete(id);
      void load();
    } finally {
      setDeletingId(null);
    }
  };

  if (!isEditor) return <Navigate to="/admin/login" replace />;

  const totalPages = Math.ceil(total / 25);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Notices Management</h1>
          <p className={styles.pageSubtitle}>{total} total notices</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => { setShowForm(true); setEditing(null); }}>
          + New Notice
        </button>
      </div>

      {/* Create form */}
      {showForm && !editing && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Create Notice</h2>
          <NoticeForm onSave={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {/* Edit form */}
      {editing && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Edit Notice</h2>
          <NoticeForm
            initial={editing}
            onSave={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      {/* Filters */}
      <div className={styles.filterBar}>
        <input
          type="search"
          placeholder="Search notices…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className={styles.searchInput}
        />
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          className={styles.select}
        >
          <option value="">All Types</option>
          {NOTICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <button className={styles.btnSecondary} onClick={load}>Refresh</button>
      </div>

      {/* Table */}
      {loading ? (
        <div className={styles.loader}>Loading notices…</div>
      ) : (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Flags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((n) => (
                  <tr key={n.id}>
                    <td><span className={`${styles.typeBadge} ${styles[`type_${n.type}`]}`}>{n.type}</span></td>
                    <td className={styles.titleCell}>{n.title}</td>
                    <td className={styles.dateCell}>
                      {n.notice_date ?? n.published_at?.slice(0, 10) ?? '—'}
                    </td>
                    <td>
                      <button
                        className={n.is_published ? styles.statusActive : styles.statusInactive}
                        onClick={() => noticesService.togglePublish(n.id, !n.is_published).then(load)}
                        title="Click to toggle"
                      >
                        {n.is_published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td>
                      <div className={styles.flagRow}>
                        {n.is_pinned && <span className={styles.flagPin} title="Pinned">📌</span>}
                        {n.is_new    && <span className={styles.flagNew} title="New">🆕</span>}
                        {n.pdf_url   && <a href={n.pdf_url} target="_blank" rel="noreferrer" title="PDF">📄</a>}
                      </div>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <button
                          className={styles.btnEdit}
                          onClick={() => { setEditing(n); setShowForm(false); }}
                        >
                          Edit
                        </button>
                        <button
                          className={n.is_pinned ? styles.btnActive : styles.btnSecondary}
                          onClick={() => noticesService.togglePin(n.id, !n.is_pinned).then(load)}
                          title={n.is_pinned ? 'Unpin' : 'Pin'}
                        >
                          📌
                        </button>
                        <button
                          className={styles.btnDelete}
                          disabled={deletingId === n.id}
                          onClick={() => handleDelete(n.id)}
                        >
                          {deletingId === n.id ? '…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className={styles.btnPage}>← Prev</button>
              <span>Page {page} of {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className={styles.btnPage}>Next →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
