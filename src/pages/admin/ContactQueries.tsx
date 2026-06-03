// ─── Contact Queries Management ───────────────────────────────────────────────
// Route: /admin/queries
// View, filter, respond, and update status of all contact form submissions.

import { useState, useEffect, useCallback } from 'react';
import { contactService } from '@/services/contact.service';
import type { ContactQueryRow, QueryStatus } from '@/types/database';
import styles from './Admin.module.css';

const STATUS_LABELS: Record<QueryStatus, string> = {
  pending:   '🟡 Pending',
  read:      '🔵 Read',
  responded: '✅ Responded',
  spam:      '🔴 Spam',
};

const STATUS_ORDER: QueryStatus[] = ['pending', 'read', 'responded', 'spam'];

// ─── Row detail modal ─────────────────────────────────────────────────────────

function QueryModal({
  query,
  onClose,
  onUpdate,
}: {
  query: ContactQueryRow;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [response, setResponse] = useState(query.response_text ?? '');
  const [saving, setSaving]     = useState(false);

  async function handleSave(status: QueryStatus) {
    setSaving(true);
    await contactService.updateStatus(query.id, status, response || undefined);
    setSaving(false);
    onUpdate();
    onClose();
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalCard}>
        <h2 className={styles.modalTitle}>Query Detail</h2>

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <span className={styles.label}>From</span>
            <span>{query.name} &lt;{query.email}&gt;</span>
          </div>
          {query.phone && (
            <div className={styles.field}>
              <span className={styles.label}>Phone</span>
              <span>{query.phone}</span>
            </div>
          )}
          <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
            <span className={styles.label}>Subject</span>
            <span>{query.subject}</span>
          </div>
        </div>

        <div className={styles.field} style={{ marginTop: '1rem' }}>
          <span className={styles.label}>Message</span>
          <div style={{
            background: '#f9fafb', border: '1px solid #e5e7eb',
            borderRadius: '0.5rem', padding: '0.75rem',
            fontSize: '0.875rem', whiteSpace: 'pre-wrap', lineHeight: 1.6,
          }}>
            {query.message}
          </div>
        </div>

        <div className={styles.field} style={{ marginTop: '1rem' }}>
          <label className={styles.label} htmlFor="resp">Admin Response (optional)</label>
          <textarea
            id="resp"
            className={styles.textarea}
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Type a response to send (for your records)…"
          />
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnSecondary} onClick={onClose} disabled={saving}>Cancel</button>
          <button className={styles.btnEdit}    onClick={() => handleSave('read')}      disabled={saving}>Mark Read</button>
          <button className={styles.btnDelete}  onClick={() => handleSave('spam')}      disabled={saving}>Mark Spam</button>
          <button className={styles.btnPrimary} onClick={() => handleSave('responded')} disabled={saving}>
            {saving ? 'Saving…' : 'Mark Responded'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContactQueries() {
  const [items,       setItems]       = useState<ContactQueryRow[]>([]);
  const [total,       setTotal]       = useState(0);
  const [loading,     setLoading]     = useState(true);
  const [statusFilter, setStatusFilter] = useState<QueryStatus | ''>('');
  const [search,      setSearch]      = useState('');
  const [page,        setPage]        = useState(1);
  const [selected,    setSelected]    = useState<ContactQueryRow | null>(null);
  const limit = 25;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await contactService.listAdmin({
        status: statusFilter || undefined,
        search: search || undefined,
        page,
        limit,
      });
      setItems(result.items);
      setTotal(result.total);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search, page]);

  // Initial load + re-load on filter change
  useEffect(() => { void load(); }, [load]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Contact Queries</h1>
          <p className={styles.pageSubtitle}>{total} total submissions</p>
        </div>
        <button className={styles.btnSecondary} onClick={load}>↻ Refresh</button>
      </div>

      {/* Filters */}
      <div className={styles.filterBar}>
        <input
          type="search"
          placeholder="Search name, email, subject…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); load(); }}
          className={styles.searchInput}
        />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as QueryStatus | ''); setPage(1); load(); }}
          className={styles.select}
        >
          <option value="">All Statuses</option>
          {STATUS_ORDER.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className={styles.loader}>Loading queries…</div>
      ) : items.length === 0 ? (
        <div className={styles.loader}>No queries found.</div>
      ) : (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>From</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Received</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((q) => (
                  <tr key={q.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(q)}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{q.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{q.email}</div>
                    </td>
                    <td style={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {q.subject}
                    </td>
                    <td>
                      <span className={`${styles.typeBadge} ${styles[q.status]}`}>
                        {STATUS_LABELS[q.status]}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.8rem', color: '#6b7280' }}>
                      {new Date(q.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td>
                      <button className={styles.btnEdit} onClick={(e) => { e.stopPropagation(); setSelected(q); }}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button disabled={page === 1} onClick={() => { setPage((p) => p - 1); load(); }} className={styles.btnPage}>← Prev</button>
              <span>Page {page} of {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => { setPage((p) => p + 1); load(); }} className={styles.btnPage}>Next →</button>
            </div>
          )}
        </>
      )}

      {selected && (
        <QueryModal
          query={selected}
          onClose={() => setSelected(null)}
          onUpdate={load}
        />
      )}
    </div>
  );
}
