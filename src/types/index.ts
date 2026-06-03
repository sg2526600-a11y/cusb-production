// ─── Language ───────────────────────────────────────────────────────────────
export type Lang = 'en' | 'hi';

// ─── Pages / Routing ────────────────────────────────────────────────────────
export type PageId =
  | 'home'
  | 'about'
  | 'academics'
  | 'departments'
  | 'research'
  | 'admissions'
  | 'students'
  | 'news'
  | 'infrastructure'
  | 'iqac'
  | 'contact'
  | 'faculty';

// ─── Navigation ─────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  labelHi?: string;
  href?: string;
  pageId?: PageId;
  external?: boolean;
}

// NavDropdownItem: label is optional because divider/sectionLabel rows have no label
export type NavDropdownItem =
  | { divider: true; sectionLabel?: never; label?: never; href?: never; pageId?: never; external?: never; labelHi?: never }
  | { sectionLabel: string; divider?: never; label?: never; href?: never; pageId?: never; external?: never; labelHi?: never }
  | (NavLink & { divider?: never; sectionLabel?: never });

export interface NavDropdown {
  type: 'dropdown';
  label: string;
  labelHi?: string;
  pageId?: PageId;
  items: NavDropdownItem[];
}

export interface NavMegaMenu {
  type: 'mega';
  label: string;
  labelHi?: string;
  pageId?: PageId;
  columns: MegaColumn[];
  footer?: NavLink[];
}

export interface MegaColumn {
  heading: string;
  items: NavLink[];
}

export type NavItem =
  | { type: 'link'; label: string; labelHi?: string; pageId: PageId }
  | NavDropdown
  | NavMegaMenu;

// ─── Departments ─────────────────────────────────────────────────────────────
export interface Department {
  name: string;
  url: string;
}

export interface School {
  icon: string;
  name: string;
  departments: Department[];
}

// ─── News & Notices ──────────────────────────────────────────────────────────
export type NoticeTag =
  | 'exam'
  | 'result'
  | 'notice'
  | 'scholar'
  | 'hostel'
  | 'placement'
  | 'download';

export interface Notice {
  id: number;
  type: NoticeTag;
  title: string;
  body: string;
  url: string;
  pdfUrl?: string;
  date: string;
  isNew: boolean;
}

export interface NewsCard {
  id: number;
  tag: string;
  title: string;
  excerpt?: string;
  date: string;
  image?: string;
  color?: string;
  emoji?: string;
  featured?: boolean;
}

// ─── Research ────────────────────────────────────────────────────────────────
export interface ResearchArea {
  icon: string;
  title: string;
  description: string;
}

export interface ResearchStat {
  value: string;
  label: string;
}

// ─── Faculty ─────────────────────────────────────────────────────────────────
export interface FacultyMember {
  name: string;
  role: string;
  department: string;
  emoji?: string;
}

// ─── Chatbot ─────────────────────────────────────────────────────────────────
export interface ChatMessage {
  id:        string;
  role:      'user' | 'assistant';
  content:   string;
  timestamp: Date;
}

export interface SetuNoticeItem {
  t: NoticeTag;
  ti: string;
  b: string;
  u: string;
  p?: string;
  d: string;
  n: boolean;
}

// ─── Forms (React Hook Form + Zod ready) ─────────────────────────────────────
export interface ContactFormValues {
  name:    string;
  email:   string;
  phone?:  string;
  subject: string;
  message: string;
}

export interface AdmissionEnquiryValues {
  name:        string;
  email:       string;
  phone:       string;
  programme:   string;
  department?: string;
  message?:    string;
}

// ─── API ──────────────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page:  number;
  limit: number;
}

export interface ApiErrorShape {
  status:   number;
  message:  string;
  code?:    string;
}
