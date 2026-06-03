// ─── Faculty Form ─────────────────────────────────────────────────────────────
// Route: /admin/faculty/new  and  /admin/faculty/:id
// Create or edit a faculty member with all sub-profile fields

import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useAuth, useDepartments } from '@/hooks';
import { facultyService } from '@/services/faculty.service';
import type { FacultyMemberRow, FacultyDesignation, FacultyQualificationRow } from '@/types/database';
import styles from './Admin.module.css';

const DESIGNATIONS: FacultyDesignation[] = [
  'Professor', 'Associate Professor', 'Assistant Professor', 'Guest Faculty', 'Visiting Professor', 'Adjunct Faculty',
];

type FormState = Omit<FacultyMemberRow, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by' | 'profile_id'>;

const EMPTY: FormState = {
  name:           '',
  designation:    'Assistant Professor',
  department_id:  '',
  specialisation: '',
  email:          '',
  phone:          '',
  profile_url:    '',
  image_url:      '',
  cv_url:         '',
  google_scholar: '',
  orcid:          '',
  is_head:        false,
  is_active:      true,
  sort_order:     0,
  joined_year:    null,
};

export default function FacultyFormPage() {
  const { id }        = useParams<{ id?: string }>();
  const isEdit        = !!id;
  const { isEditor }  = useAuth();
  const navigate      = useNavigate();

  const { data: departments, loading: deptsLoading } = useDepartments();

  const [form,    setForm]    = useState<FormState>(EMPTY);
  const [quals,   setQuals]   = useState<Omit<FacultyQualificationRow, 'id' | 'created_at' | 'faculty_id'>[]>([]);
  const [newQual, setNewQual] = useState({ degree: '', institution: '', year: '' });
  const [loading, setLoading] = useState(isEdit);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState('');
  const [imgFile, setImgFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;
    facultyService.getById(id).then((data) => {
      if (!data) { navigate('/admin/faculty'); return; }
      const { faculty_qualifications, ...rest } = data;
      setForm({
        name:           rest.name,
        designation:    rest.designation,
        department_id:  rest.department_id,
        specialisation: rest.specialisation ?? '',
        email:          rest.email ?? '',
        phone:          rest.phone ?? '',
        profile_url:    rest.profile_url ?? '',
        image_url:      rest.image_url ?? '',
        cv_url:         rest.cv_url ?? '',
        google_scholar: rest.google_scholar ?? '',
        orcid:          rest.orcid ?? '',
        is_head:        rest.is_head,
        is_active:      rest.is_active,
        sort_order:     rest.sort_order,
        joined_year:    rest.joined_year,
      });
      setQuals(
        (faculty_qualifications ?? []).map((q) => ({
          degree: q.degree, institution: q.institution, year: q.year ?? null, specialisation: q.specialisation,
        }))
      );
      setLoading(false);
    });
  }, [id, navigate]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim())        { setError('Name is required'); return; }
    if (!form.department_id)      { setError('Department is required'); return; }
    setSaving(true);
    setError('');

    try {
      let saved: FacultyMemberRow;
      if (isEdit && id) {
        saved = await facultyService.update(id, form);
      } else {
        saved = await facultyService.create(form as any);
      }

      // Upload image if selected
      if (imgFile) await facultyService.uploadProfileImage(saved.id, imgFile);

      // Save new qualifications (only for create — edit UI handles individually)
      if (!isEdit) {
        await Promise.all(
          quals.map((q) =>
            facultyService.addQualification({ ...q, faculty_id: saved.id })
          )
        );
      }

      navigate('/admin/faculty');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const addQual = () => {
    if (!newQual.degree || !newQual.institution) return;
    setQuals((prev) => [...prev, { degree: newQual.degree, institution: newQual.institution, year: newQual.year ? +newQual.year : null, specialisation: null }]);
    setNewQual({ degree: '', institution: '', year: '' });
  };

  if (!isEditor) return <Navigate to="/admin/login" replace />;
  if (loading || deptsLoading) return <div className={styles.loader}>Loading…</div>;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{isEdit ? 'Edit Faculty' : 'Add Faculty Member'}</h1>
        <button className={styles.btnSecondary} onClick={() => navigate('/admin/faculty')}>← Back</button>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* Basic info */}
        <h2 className={styles.formSection}>Basic Information</h2>
        <div className={styles.formGrid}>
          <div className={`${styles.field} ${styles.spanFull}`}>
            <label className={styles.label}>Full Name *</label>
            <input className={styles.input} required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Prof. / Dr. Full Name" />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Designation *</label>
            <select className={styles.select} value={form.designation} onChange={(e) => set('designation', e.target.value as FacultyDesignation)}>
              {DESIGNATIONS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Department *</label>
            <select className={styles.select} required value={form.department_id} onChange={(e) => set('department_id', e.target.value)}>
              <option value="">Select department…</option>
              {(departments ?? []).map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>

          <div className={`${styles.field} ${styles.spanFull}`}>
            <label className={styles.label}>Specialisation</label>
            <input className={styles.input} value={form.specialisation ?? ''} onChange={(e) => set('specialisation', e.target.value)} placeholder="Area1, Area2, Area3…" />
          </div>
        </div>

        {/* Contact */}
        <h2 className={styles.formSection}>Contact & Links</h2>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" value={form.email ?? ''} onChange={(e) => set('email', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Phone</label>
            <input className={styles.input} type="tel" value={form.phone ?? ''} onChange={(e) => set('phone', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Profile URL (Samarth)</label>
            <input className={styles.input} type="url" value={form.profile_url ?? ''} onChange={(e) => set('profile_url', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Google Scholar URL</label>
            <input className={styles.input} type="url" value={form.google_scholar ?? ''} onChange={(e) => set('google_scholar', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>ORCID</label>
            <input className={styles.input} value={form.orcid ?? ''} onChange={(e) => set('orcid', e.target.value)} placeholder="0000-0000-0000-0000" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Joined Year</label>
            <input className={styles.input} type="number" min={1990} max={new Date().getFullYear()} value={form.joined_year ?? ''} onChange={(e) => set('joined_year', e.target.value ? +e.target.value : null)} />
          </div>
        </div>

        {/* Profile image */}
        <h2 className={styles.formSection}>Profile Image</h2>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.label}>Upload Photo (JPEG/PNG, max 5 MB)</label>
            <input type="file" accept="image/jpeg,image/png,image/webp" className={styles.fileInput} onChange={(e) => setImgFile(e.target.files?.[0] ?? null)} />
            {form.image_url && <img src={form.image_url} alt="Current" className={styles.thumbMedium} />}
          </div>
        </div>

        {/* Flags */}
        <h2 className={styles.formSection}>Flags</h2>
        <div className={styles.toggleRow}>
          <label className={styles.toggleLabel}>
            <input type="checkbox" checked={form.is_head} onChange={(e) => set('is_head', e.target.checked)} />
            Head of Department
          </label>
          <label className={styles.toggleLabel}>
            <input type="checkbox" checked={form.is_active} onChange={(e) => set('is_active', e.target.checked)} />
            Active
          </label>
        </div>

        {/* Qualifications (create only — edit has individual row management) */}
        {!isEdit && (
          <>
            <h2 className={styles.formSection}>Qualifications</h2>
            {quals.map((q, i) => (
              <div key={i} className={styles.qualRow}>
                <span>{q.degree} — {q.institution} {q.year ? `(${q.year})` : ''}</span>
                <button type="button" className={styles.btnDelete} onClick={() => setQuals((qs) => qs.filter((_, j) => j !== i))}>✕</button>
              </div>
            ))}
            <div className={styles.addQualRow}>
              <input className={styles.input} placeholder="Degree (e.g. Ph.D.)" value={newQual.degree} onChange={(e) => setNewQual((q) => ({ ...q, degree: e.target.value }))} />
              <input className={styles.input} placeholder="Institution" value={newQual.institution} onChange={(e) => setNewQual((q) => ({ ...q, institution: e.target.value }))} />
              <input className={styles.input} type="number" placeholder="Year" value={newQual.year} onChange={(e) => setNewQual((q) => ({ ...q, year: e.target.value }))} style={{ width: 90 }} />
              <button type="button" className={styles.btnSecondary} onClick={addQual}>+ Add</button>
            </div>
          </>
        )}

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formActions}>
          <button type="button" className={styles.btnSecondary} onClick={() => navigate('/admin/faculty')}>Cancel</button>
          <button type="submit" className={styles.btnPrimary} disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Update Faculty' : 'Create Faculty'}
          </button>
        </div>
      </form>
    </div>
  );
}
