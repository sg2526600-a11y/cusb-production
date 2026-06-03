// ─── Faculty Service ──────────────────────────────────────────────────────────
// All faculty-related DB operations. Replaces static src/data/faculty.ts

import { supabase, uploadFile, BUCKETS } from '@/lib/supabase';
import type {
  FacultyMemberRow,
  FacultyQualificationRow,
  FacultyPublicationRow,
  FacultyResearchAreaRow,
  FacultyAchievementRow,
  InsertFaculty,
} from '@/types/database';

// ─── Query params ─────────────────────────────────────────────────────────────

export interface FacultyListParams {
  departmentId?: string;
  departmentSlug?: string;
  designation?: string;
  schoolSlug?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface FacultyListResponse {
  items: FacultyWithDepartment[];
  total: number;
  page:  number;
  limit: number;
}

export interface FacultyWithDepartment extends FacultyMemberRow {
  departments: { name: string; slug: string; school_id: string } | null;
}

export interface FacultyDetail extends FacultyMemberRow {
  departments: { name: string; slug: string } | null;
  faculty_qualifications:  FacultyQualificationRow[];
  faculty_publications:    FacultyPublicationRow[];
  faculty_research_areas:  FacultyResearchAreaRow[];
  faculty_achievements:    FacultyAchievementRow[];
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const facultyService = {

  /** List faculty with optional filters and pagination */
  async list(params: FacultyListParams = {}): Promise<FacultyListResponse> {
    const { page = 1, limit = 50, departmentId, departmentSlug, designation, schoolSlug, search } = params;

    let query = supabase
      .from('faculty_members')
      .select(
        `*, departments!inner(name, slug, school_id,
          schools!inner(slug))`,
        { count: 'exact' }
      )
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true })
      .range((page - 1) * limit, page * limit - 1);

    if (departmentId)   query = query.eq('department_id', departmentId);
    if (departmentSlug) query = query.eq('departments.slug', departmentSlug);
    if (designation)    query = query.eq('designation', designation);
    if (schoolSlug)     query = query.eq('departments.schools.slug', schoolSlug);
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    return {
      items: (data ?? []) as unknown as FacultyWithDepartment[],
      total: count ?? 0,
      page,
      limit,
    };
  },

  /** Get single faculty by ID with full profile */
  async getById(id: string): Promise<FacultyDetail | null> {
    const { data, error } = await supabase
      .from('faculty_members')
      .select(`
        *,
        departments(name, slug),
        faculty_qualifications(*),
        faculty_publications(*),
        faculty_research_areas(*),
        faculty_achievements(*)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) return null;
    return data as unknown as FacultyDetail;
  },

  /** Get all heads of departments */
  async getDepartmentHeads(): Promise<FacultyWithDepartment[]> {
    const { data, error } = await supabase
      .from('faculty_members')
      .select('*, departments(name, slug, school_id)')
      .eq('is_head', true)
      .eq('is_active', true)
      .order('sort_order');

    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as FacultyWithDepartment[];
  },

  /** Create faculty member */
  async create(payload: InsertFaculty): Promise<FacultyMemberRow> {
    const { data, error } = await supabase
      .from('faculty_members')
      .insert(payload as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  /** Update faculty member */
  async update(id: string, payload: Partial<FacultyMemberRow>): Promise<FacultyMemberRow> {
    const { data, error } = await supabase
      .from('faculty_members')
      .update(payload as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  /** Soft delete */
  async deactivate(id: string): Promise<void> {
    const { error } = await supabase
      .from('faculty_members')
      .update({ is_active: false } as any)
      .eq('id', id);

    if (error) throw new Error(error.message);
  },

  /** Upload profile image and update record */
  async uploadProfileImage(facultyId: string, file: File): Promise<string> {
    const ext = file.name.split('.').pop();
    const path = `${facultyId}.${ext}`;
    const { url, error } = await uploadFile(BUCKETS.FACULTY_IMAGES, path, file, { upsert: true });
    if (error) throw new Error(error ?? 'Upload failed');

    await facultyService.update(facultyId, { image_url: url as string });
    return url as string;
  },

  /** Upload CV PDF */
  async uploadCV(facultyId: string, file: File): Promise<string> {
    const path = `${facultyId}/cv.pdf`;
    const { url, error } = await uploadFile(BUCKETS.FACULTY_CV, path, file, { upsert: true });
    if (error) throw new Error(error ?? 'Upload failed');

    await facultyService.update(facultyId, { cv_url: url as string });
    return url as string;
  },

  // ─── Sub-table helpers ─────────────────────────────────────────────────────

  async addQualification(payload: Omit<FacultyQualificationRow, 'id' | 'created_at'>): Promise<void> {
    const { error } = await supabase.from('faculty_qualifications').insert(payload as any);
    if (error) throw new Error(error.message);
  },

  async addPublication(payload: Omit<FacultyPublicationRow, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    const { error } = await supabase.from('faculty_publications').insert(payload as any);
    if (error) throw new Error(error.message);
  },

  async addResearchArea(facultyId: string, area: string): Promise<void> {
    const { error } = await supabase.from('faculty_research_areas').insert({ faculty_id: facultyId, area } as any);
    if (error) throw new Error(error.message);
  },

  async addAchievement(payload: Omit<FacultyAchievementRow, 'id' | 'created_at'>): Promise<void> {
    const { error } = await supabase.from('faculty_achievements').insert(payload as any);
    if (error) throw new Error(error.message);
  },

  async deleteQualification(id: string): Promise<void> {
    const { error } = await supabase.from('faculty_qualifications').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },

  async deletePublication(id: string): Promise<void> {
    const { error } = await supabase.from('faculty_publications').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },
};
