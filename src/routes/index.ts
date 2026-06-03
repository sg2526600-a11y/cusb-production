// ─── Route Configuration ──────────────────────────────────────────────────────
// Single source of truth for all application routes.
// Lazy load every page to enable route-based code splitting.

import { lazy, type ComponentType } from 'react';

export interface RouteConfig {
  path:      string;
  label:     string;
  labelHi?:  string;
  component: ReturnType<typeof lazy>;
  meta: {
    title:       string;
    description: string;
  };
}

// ─── Public page imports (lazy) ───────────────────────────────────────────────

const Home           = lazy(() => import('@/pages/Home'));
const About          = lazy(() => import('@/pages/About'));
const Academics      = lazy(() => import('@/pages/Academics'));
const Departments    = lazy(() => import('@/pages/Departments'));
const Research       = lazy(() => import('@/pages/Research'));
const Admissions     = lazy(() => import('@/pages/Admissions'));
const StudentCorner  = lazy(() => import('@/pages/StudentCorner'));
const News           = lazy(() => import('@/pages/News'));
const Infrastructure = lazy(() => import('@/pages/Infrastructure'));
const IQAC           = lazy(() => import('@/pages/IQAC'));
const Contact        = lazy(() => import('@/pages/Contact'));
const Faculty        = lazy(() => import('@/pages/Faculty'));

// ─── Admin page imports (lazy) ────────────────────────────────────────────────

export const AdminLogin        = lazy(() => import('@/pages/admin/Login'));
export const AdminLayout       = lazy(() => import('@/pages/admin/AdminLayout'));
export const AdminDashboard    = lazy(() => import('@/pages/admin/Dashboard'));
export const AdminFaculty      = lazy(() => import('@/pages/admin/FacultyManagement'));
export const AdminFacultyForm  = lazy(() => import('@/pages/admin/FacultyForm'));
export const AdminNotices      = lazy(() => import('@/pages/admin/NoticesManagement'));
export const AdminQueries      = lazy(() => import('@/pages/admin/ContactQueries'));
export const AdminDepts        = lazy(() => import('@/pages/admin/DepartmentsStub'));
export const AdminNews         = lazy(() => import('@/pages/admin/NewsStub'));
export const AdminEvents       = lazy(() => import('@/pages/admin/EventsStub'));
export const AdminFaq          = lazy(() => import('@/pages/admin/FaqStub'));
export const AdminSettings     = lazy(() => import('@/pages/admin/SettingsStub'));
export const AdminAdmissions   = lazy(() => import('@/pages/admin/AdmissionsStub'));
export const AdminIqac         = lazy(() => import('@/pages/admin/IqacStub'));

// ─── Public routes ────────────────────────────────────────────────────────────

export const ROUTES: RouteConfig[] = [
  {
    path:      '/',
    label:     'Home',
    component: Home,
    meta: {
      title:       'Central University of South Bihar – ज्ञान सेवा विमुक्तये',
      description: 'Central University of South Bihar (CUSB), Gaya — NAAC A++ accredited central university established by Parliament in 2009.',
    },
  },
  {
    path:      '/about',
    label:     'About',
    component: About,
    meta: {
      title:       'About CUSB | Central University of South Bihar',
      description: 'History, vision, mission, statutory bodies, and leadership of Central University of South Bihar.',
    },
  },
  {
    path:      '/academics',
    label:     'Academics',
    labelHi:   'शैक्षणिक',
    component: Academics,
    meta: {
      title:       'Academics | CUSB',
      description: 'UG, PG and Ph.D. programmes across 26 departments at Central University of South Bihar.',
    },
  },
  {
    path:      '/departments',
    label:     'Departments',
    component: Departments,
    meta: {
      title:       'Departments | CUSB',
      description: 'All 26 academic departments of Central University of South Bihar.',
    },
  },
  {
    path:      '/research',
    label:     'Research',
    labelHi:   'अनुसंधान',
    component: Research,
    meta: {
      title:       'Research | CUSB',
      description: 'Research programmes, facilities, publications and Ph.D. opportunities at CUSB.',
    },
  },
  {
    path:      '/admissions',
    label:     'Admissions',
    component: Admissions,
    meta: {
      title:       'Admissions | CUSB',
      description: 'Admissions to UG, PG and Ph.D. programmes at CUSB via CUET and URET.',
    },
  },
  {
    path:      '/students',
    label:     'Student Corner',
    labelHi:   'छात्र कोना',
    component: StudentCorner,
    meta: {
      title:       'Student Corner | CUSB',
      description: 'Student resources, notices, scholarships, hostel, and services at CUSB.',
    },
  },
  {
    path:      '/news',
    label:     'News & Events',
    component: News,
    meta: {
      title:       'News & Events | CUSB',
      description: 'Latest news, events, and announcements from Central University of South Bihar.',
    },
  },
  {
    path:      '/infrastructure',
    label:     'Infrastructure',
    component: Infrastructure,
    meta: {
      title:       'Infrastructure | CUSB',
      description: 'Campus infrastructure, facilities, hostels, library, and sports at CUSB.',
    },
  },
  {
    path:      '/iqac',
    label:     'IQAC',
    component: IQAC,
    meta: {
      title:       'IQAC | CUSB',
      description: 'Internal Quality Assurance Cell — NAAC accreditation, quality benchmarks, reports.',
    },
  },
  {
    path:      '/contact',
    label:     'Contact',
    component: Contact,
    meta: {
      title:       'Contact Us | CUSB',
      description: 'Contact Central University of South Bihar — phone, email, address, and campus map.',
    },
  },
  {
    path:      '/faculty',
    label:     'Faculty',
    labelHi:   'शिक्षक',
    component: Faculty,
    meta: {
      title:       'Faculty & Staff | CUSB',
      description: 'Meet the 150+ dedicated faculty members across 26 departments at Central University of South Bihar.',
    },
  },
];

// ─── Utility: look up route by path ───────────────────────────────────────────

export function getRouteByPath(path: string): RouteConfig | undefined {
  return ROUTES.find((r) => r.path === path);
}

// ─── Legacy pageId → path mapping ─────────────────────────────────────────────

export const PAGE_ID_TO_PATH: Record<string, string> = {
  home:           '/',
  about:          '/about',
  academics:      '/academics',
  departments:    '/departments',
  research:       '/research',
  admissions:     '/admissions',
  students:       '/students',
  news:           '/news',
  infrastructure: '/infrastructure',
  iqac:           '/iqac',
  contact:        '/contact',
  faculty:        '/faculty',
};

export type { ComponentType };
