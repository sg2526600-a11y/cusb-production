// ─── Database Types ────────────────────────────────────────────────────────────
// Auto-generated from Supabase schema. Regenerate with:
//   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

// ─── Enums ────────────────────────────────────────────────────────────────────
export type UserRole         = 'super_admin' | 'university_admin' | 'dept_admin' | 'faculty' | 'editor' | 'student' | 'guest';
export type FacultyDesignation = 'Professor' | 'Associate Professor' | 'Assistant Professor' | 'Guest Faculty' | 'Visiting Professor' | 'Adjunct Faculty';
export type NoticeType       = 'exam' | 'result' | 'notice' | 'scholar' | 'hostel' | 'placement' | 'download';
export type QueryStatus      = 'pending' | 'read' | 'responded' | 'spam';
export type ProgrammeType    = 'UG' | 'PG' | 'PhD' | 'Diploma' | 'Certificate';
export type ChatRole         = 'user' | 'assistant';
export type ResearchStatus   = 'ongoing' | 'completed' | 'submitted' | 'approved';

// ─── Row types (DB → App) ─────────────────────────────────────────────────────

export interface ProfileRow {
  id:            string;
  full_name:     string | null;
  avatar_url:    string | null;
  role:          UserRole;
  department_id: string | null;
  phone:         string | null;
  bio:           string | null;
  is_active:     boolean;
  created_at:    string;
  updated_at:    string;
}

export interface SchoolRow {
  id:         string;
  name:       string;
  slug:       string;
  icon:       string;
  sort_order: number;
  is_active:  boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

export interface DepartmentRow {
  id:               string;
  name:             string;
  slug:             string;
  school_id:        string;
  external_url:     string | null;
  description:      string | null;
  vision:           string | null;
  mission:          string | null;
  established_year: number | null;
  head_faculty_id:  string | null;
  is_active:        boolean;
  sort_order:       number;
  created_at:       string;
  updated_at:       string;
  created_by:       string | null;
  updated_by:       string | null;
}

export interface FacultyMemberRow {
  id:             string;
  profile_id:     string | null;
  name:           string;
  designation:    FacultyDesignation;
  department_id:  string;
  specialisation: string | null;
  email:          string | null;
  phone:          string | null;
  profile_url:    string | null;
  image_url:      string | null;
  cv_url:         string | null;
  google_scholar: string | null;
  orcid:          string | null;
  is_head:        boolean;
  is_active:      boolean;
  sort_order:     number;
  joined_year:    number | null;
  created_at:     string;
  updated_at:     string;
  created_by:     string | null;
  updated_by:     string | null;
}

export interface FacultyQualificationRow {
  id:             string;
  faculty_id:     string;
  degree:         string;
  institution:    string;
  year:           number | null;
  specialisation: string | null;
  created_at:     string;
}

export interface FacultyPublicationRow {
  id:         string;
  faculty_id: string;
  title:      string;
  journal:    string | null;
  year:       number | null;
  doi:        string | null;
  url:        string | null;
  type:       string;
  created_at: string;
  updated_at: string;
}

export interface FacultyResearchAreaRow {
  id:         string;
  faculty_id: string;
  area:       string;
  created_at: string;
}

export interface FacultyAchievementRow {
  id:          string;
  faculty_id:  string;
  title:       string;
  description: string | null;
  year:        number | null;
  created_at:  string;
}

export interface NoticeRow {
  id:             string;
  type:           NoticeType;
  title:          string;
  body:           string | null;
  url:            string | null;
  pdf_url:        string | null;
  attachment_url: string | null;
  department_id:  string | null;
  is_pinned:      boolean;
  is_new:         boolean;
  is_published:   boolean;
  published_at:   string | null;
  expires_at:     string | null;
  notice_date:    string | null;
  created_at:     string;
  updated_at:     string;
  created_by:     string | null;
  updated_by:     string | null;
}

export interface NewsRow {
  id:           string;
  title:        string;
  slug:         string | null;
  excerpt:      string | null;
  body:         string | null;
  image_url:    string | null;
  category:     string;
  tags:         string[] | null;
  is_featured:  boolean;
  is_published: boolean;
  published_at: string | null;
  created_at:   string;
  updated_at:   string;
  created_by:   string | null;
  updated_by:   string | null;
}

export interface EventRow {
  id:               string;
  title:            string;
  slug:             string | null;
  description:      string | null;
  image_url:        string | null;
  event_date:       string;
  event_time:       string | null;
  end_date:         string | null;
  venue:            string | null;
  category:         string;
  registration_url: string | null;
  is_featured:      boolean;
  is_published:     boolean;
  created_at:       string;
  updated_at:       string;
  created_by:       string | null;
  updated_by:       string | null;
}

export interface ProgramRow {
  id:                 string;
  name:               string;
  type:               ProgrammeType;
  department_id:      string;
  duration:           string | null;
  total_seats:        number | null;
  eligibility:        string | null;
  fee_per_semester:   number | null;
  cuet_required:      boolean;
  description:        string | null;
  is_active:          boolean;
  created_at:         string;
  updated_at:         string;
  created_by:         string | null;
  updated_by:         string | null;
}

export interface ResearchProjectRow {
  id:                string;
  title:             string;
  description:       string | null;
  pi_faculty_id:     string | null;
  co_investigators:  string[] | null;
  funding_agency:    string | null;
  amount:            number | null;
  start_date:        string | null;
  end_date:          string | null;
  status:            ResearchStatus;
  department_id:     string | null;
  created_at:        string;
  updated_at:        string;
  created_by:        string | null;
  updated_by:        string | null;
}

export interface ContactQueryRow {
  id:            string;
  name:          string;
  email:         string;
  phone:         string | null;
  subject:       string;
  message:       string;
  status:        QueryStatus;
  response_text: string | null;
  responded_at:  string | null;
  responded_by:  string | null;
  ip_address:    string | null;
  user_agent:    string | null;
  created_at:    string;
}

export interface FaqRow {
  id:           string;
  question:     string;
  answer:       string;
  category:     string;
  sort_order:   number;
  is_published: boolean;
  created_at:   string;
  updated_at:   string;
  created_by:   string | null;
  updated_by:   string | null;
}

export interface ChatLogRow {
  id:         string;
  session_id: string;
  role:       ChatRole;
  content:    string;
  user_id:    string | null;
  created_at: string;
}

export interface SiteSettingRow {
  id:          string;
  key:         string;
  value:       Json;
  description: string | null;
  updated_at:  string;
  updated_by:  string | null;
}

export interface HeroSlideRow {
  id:         string;
  title:      string | null;
  subtitle:   string | null;
  image_url:  string;
  cta_text:   string | null;
  cta_url:    string | null;
  sort_order: number;
  is_active:  boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
}

export interface AnnouncementRow {
  id:         string;
  text:       string;
  url:        string | null;
  is_active:  boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface IqacDocumentRow {
  id:           string;
  title:        string;
  type:         string;
  file_url:     string | null;
  year:         number | null;
  is_published: boolean;
  sort_order:   number;
  created_at:   string;
  updated_at:   string;
  created_by:   string | null;
  updated_by:   string | null;
}

// ─── Insert types (App → DB) ──────────────────────────────────────────────────

export type InsertFaculty = Omit<FacultyMemberRow,
  'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'
>;

export type InsertNotice = Omit<NoticeRow,
  'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'
>;

export type InsertContactQuery = Omit<ContactQueryRow,
  'id' | 'created_at' | 'status' | 'response_text' | 'responded_at' | 'responded_by'
>;

export type InsertChatLog = Omit<ChatLogRow, 'id' | 'created_at'>;

// ─── Full Database type for Supabase client generics ─────────────────────────

// ─── Database type (used only for documentation purposes) ────────────────────
// supabase client is typed as 'any' for DX simplicity.
// All runtime types come from the Row/Insert/Update interfaces above.
export type Database = Record<string, unknown>;
