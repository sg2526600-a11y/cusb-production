// ─── Faculty Management ───────────────────────────────────────────────────────
// Route: /admin/faculty
// Features: list, search, filter, add, edit, delete, image upload

import { useState, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useFaculty, useDepartments, useAuth } from '@/hooks';
import { facultyService } from '@/services/faculty.service';
import type { FacultyMemberRow, FacultyDesignation } from '@/types/database';
import styles from './Admin.module.css';

// ─── Component ────────────────────────────────────────────────────────────────

export default function FacultyManagement() {
  const { isEditor } = useAuth();
  const [search, setSearch]             = useState('');
  const [deptFilter, setDeptFilter]     = useState('');
  const [designFilter, setDesignFilter] = useState('');
  const [page, setPage]                 = useState(1);
  const [deletingId, setDeletingId]     = useState<string | null>(null);

  const { faculty, total, loading, error, refetch } = useFaculty({
    search:        search || undefined,
    departmentId:  deptFilter || undefined,
    designation:   designFilter || undefined,
    page,
    limit: 30,
  });

  const { data: departments } = useDepartments();

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Deactivate this faculty member?')) return;
    setDeletingId(id);
    try {
      await facultyService.deactivate(id);
      refetch();
    } finally {
      setDeletingId(null);
    }
  }, [refetch]);

  const handleImageUpload = useCallback(async (id: string, file: File) => {
    try {
      await facultyService.uploadProfileImage(id, file);
      refetch();
    } catch (e) {
      alert('Upload failed: ' + (e as Error).message);
    }
  }, [refetch]);

  if (!isEditor) return <Navigate to="/admin/login" replace />;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Faculty Management</h1>
          <p className={styles.pageSubtitle}>{total} faculty members</p>
        </div>
        <Link to="/admin/faculty/new" className={styles.btnPrimary}>
          + Add Faculty
        </Link>
      </div>

      {/* Filters */}
      <div className={styles.filterBar}>
        <input
          type="search"
          placeholder="Search by name…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className={styles.searchInput}
        />
        <select
          value={deptFilter}
          onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }}
          className={styles.select}
        >
          <option value="">All Departments</option>
          {(departments ?? []).map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <select
          value={designFilter}
          onChange={(e) => { setDesignFilter(e.target.value); setPage(1); }}
          className={styles.select}
        >
          <option value="">All Designations</option>
          {(['Professor', 'Associate Professor', 'Assistant Professor', 'Guest Faculty'] as FacultyDesignation[]).map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Table */}
      {loading ? (
        <div className={styles.loader}>Loading faculty…</div>
      ) : (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Specialisation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((f) => (
                  <tr key={f.id}>
                    <td>
                      <div className={styles.facultyName}>
                        {f.image_url ? (
                          <img src={f.image_url} alt={f.name} className={styles.thumbSmall} />
                        ) : (
                          <div className={styles.avatarPlaceholder}>👤</div>
                        )}
                        <div>
                          <div>{f.name}</div>
                          {f.is_head && <span className={styles.badge}>HOD</span>}
                          {f.email && <div className={styles.emailSmall}>{f.email}</div>}
                        </div>
                      </div>
                    </td>
                    <td><span className={styles.designBadge}>{f.designation}</span></td>
                    <td>{(f as FacultyMemberRow & { departments?: { name: string } }).departments?.name ?? '—'}</td>
                    <td className={styles.specCell}>{f.specialisation?.split(',')[0] ?? '—'}</td>
                    <td>
                      <span className={f.is_active ? styles.statusActive : styles.statusInactive}>
                        {f.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <Link to={`/admin/faculty/${f.id}`} className={styles.btnEdit}>Edit</Link>
                        <label className={styles.btnImg} title="Upload photo">
                          📷
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(f.id, file);
                            }}
                          />
                        </label>
                        <button
                          className={styles.btnDelete}
                          onClick={() => handleDelete(f.id)}
                          disabled={deletingId === f.id}
                        >
                          {deletingId === f.id ? '…' : 'Deactivate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {total > 30 && (
            <div className={styles.pagination}>
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className={styles.btnPage}>← Prev</button>
              <span>Page {page} of {Math.ceil(total / 30)}</span>
              <button disabled={page >= Math.ceil(total / 30)} onClick={() => setPage((p) => p + 1)} className={styles.btnPage}>Next →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
