// ─── App Root ─────────────────────────────────────────────────────────────────
// Configures providers and React Router.
// Route definitions live in src/routes/index.ts.
// Layout shell lives in src/layouts/RootLayout.tsx.

import { Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { LangProvider } from '@/context/LangContext';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import RootLayout, { PageSkeleton } from '@/layouts/RootLayout';
import {
  ROUTES,
  AdminLogin,
  AdminLayout,
  AdminDashboard,
  AdminFaculty,
  AdminFacultyForm,
  AdminNotices,
  AdminQueries,
  AdminDepts,
  AdminNews,
  AdminEvents,
  AdminFaq,
  AdminSettings,
  AdminAdmissions,
  AdminIqac,
} from '@/routes';

// ─── Loading fallback ─────────────────────────────────────────────────────────

function AdminSkeleton() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'system-ui, sans-serif',
      color: '#64748b',
    }}>
      Loading…
    </div>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────

function AppRouter() {
  return (
    <Routes>
      {/* ── Public pages — all share RootLayout shell ── */}
      <Route element={<RootLayout />}>
        {ROUTES.map(({ path, component: Page }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<PageSkeleton />}>
                <Page />
              </Suspense>
            }
          />
        ))}

        {/* Catch-all: redirect unknown public paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* ── Admin: login (no layout shell) ── */}
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<AdminSkeleton />}>
            <AdminLogin />
          </Suspense>
        }
      />

      {/* ── Admin: protected pages wrapped in AdminLayout ── */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={<AdminSkeleton />}>
            <AdminLayout />
          </Suspense>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />

        <Route
          path="dashboard"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminDashboard />
            </Suspense>
          }
        />

        <Route
          path="faculty"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminFaculty />
            </Suspense>
          }
        />
        <Route
          path="faculty/new"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminFacultyForm />
            </Suspense>
          }
        />
        <Route
          path="faculty/:id"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminFacultyForm />
            </Suspense>
          }
        />

        <Route
          path="notices"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminNotices />
            </Suspense>
          }
        />
        <Route
          path="notices/new"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminNotices />
            </Suspense>
          }
        />

        <Route
          path="queries"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminQueries />
            </Suspense>
          }
        />

        <Route
          path="departments"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminDepts />
            </Suspense>
          }
        />

        <Route
          path="news"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminNews />
            </Suspense>
          }
        />
        <Route
          path="news/new"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminNews />
            </Suspense>
          }
        />

        <Route
          path="events"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminEvents />
            </Suspense>
          }
        />
        <Route
          path="events/new"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminEvents />
            </Suspense>
          }
        />

        <Route
          path="faq"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminFaq />
            </Suspense>
          }
        />

        <Route
          path="settings"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminSettings />
            </Suspense>
          }
        />

        <Route
          path="admissions"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminAdmissions />
            </Suspense>
          }
        />

        <Route
          path="iqac"
          element={
            <Suspense fallback={<AdminSkeleton />}>
              <AdminIqac />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <HelmetProvider>
      <LangProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ErrorBoundary>
      </LangProvider>
    </HelmetProvider>
  );
}
