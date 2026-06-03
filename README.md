# CUSB Web — v2.0 (Supabase Production Build)

**Central University of South Bihar** — Official Website  
Frontend: React 18 + Vite + TypeScript + CSS Modules  
Backend: Supabase (PostgreSQL + Auth + Storage + Realtime)

---

## Quick Start

```bash
# 1. Install
npm install

# 2. Environment
cp .env.example .env.local
# Fill VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY + VITE_ANTHROPIC_API_KEY

# 3. Dev server
npm run dev          # http://localhost:5173

# 4. Production build
npm run build
npm run preview
```

---

## Supabase Setup

### Step 1 — Create Project
1. Go to [app.supabase.com](https://app.supabase.com) → New Project
2. Choose a strong database password and save it
3. Select region closest to India (e.g. ap-south-1)

### Step 2 — Get API Keys
Dashboard → Settings → API:
- Copy **Project URL** → `VITE_SUPABASE_URL`
- Copy **anon / public** key → `VITE_SUPABASE_ANON_KEY`
- Copy **Project ID** → `SUPABASE_PROJECT_ID`

### Step 3 — Run SQL (in order)
Dashboard → SQL Editor → New Query — paste and run each file:

```
1. supabase/schema.sql   ← tables, enums, functions, triggers
2. supabase/rls.sql      ← row level security policies
3. supabase/storage.sql  ← storage buckets + policies
4. supabase/seed.sql     ← schools, departments, FAQ, default settings
```

### Step 4 — Create Admin User
Dashboard → Authentication → Users → Invite User  
After signup, run in SQL Editor:
```sql
UPDATE profiles SET role = 'super_admin' WHERE id = '<YOUR_USER_UUID>';
```

### Step 5 — Configure Auth
Dashboard → Authentication → URL Configuration:
- **Site URL**: `https://your-domain.com`
- **Redirect URLs**: `https://your-domain.com/admin/dashboard`

---

## Vercel Deployment

```bash
npm install -g vercel
vercel --prod
```

**Environment Variables** (Vercel Dashboard → Project → Settings → Environment Variables):

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` |
| `VITE_ANTHROPIC_API_KEY` | `sk-ant-...` |

**vercel.json** (already present — handles SPA routing):
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

---

## Admin Panel

| Route | Description |
|---|---|
| `/admin/login` | Admin login (Supabase Auth) |
| `/admin/dashboard` | Stats: faculty, notices, queries, chats |
| `/admin/faculty` | List, create, edit, deactivate faculty |
| `/admin/faculty/new` | Add new faculty member |
| `/admin/faculty/:id` | Edit existing faculty |
| `/admin/notices` | Create/archive/pin notices |
| `/admin/queries` | View & respond to contact form submissions |
| `/admin/departments` | Department management (stub) |
| `/admin/news` | News articles (stub) |
| `/admin/events` | Events management (stub) |
| `/admin/settings` | Site settings (stub) |

---

## Project Structure

```
src/
├── api/              ← Public API layer (notices shim)
├── components/
│   ├── chatbot/      ← Setu AI chatbot (Supabase-backed)
│   ├── layout/       ← Navbar, Footer, PageHero
│   ├── shared/       ← ErrorBoundary, LoadingSpinner
│   └── ui/           ← NoticeRow, cards, scroll reveals
├── config/env.ts     ← Typed env var access
├── constants/        ← Static data (notices, faculty, site config)
├── context/          ← LangContext (Hindi/English toggle)
├── hooks/            ← useAuth, useFaculty, useNotices, + 3 original hooks
├── layouts/          ← RootLayout shell
├── lib/
│   ├── supabase.ts   ← Supabase client + subscribeToTable helper
│   ├── http.ts       ← Fetch wrapper (non-Supabase calls)
│   └── validations.ts← Zod schemas
├── pages/
│   ├── admin/        ← Login, AdminLayout, Dashboard, Faculty, Notices, Queries
│   └── *.tsx         ← Public pages (Home, About, Academics…)
├── routes/index.ts   ← All route config (public + admin)
├── services/         ← auth, faculty, notices, contact, chatbot services
├── styles/           ← Global CSS variables + resets
├── types/
│   ├── index.ts      ← App-level types
│   └── database.ts   ← Supabase Row/Insert/Update types
└── App.tsx           ← BrowserRouter + lazy route tree
```

---

## Environment Variables Reference

```env
# Required
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Optional (Setu chatbot AI responses)
VITE_ANTHROPIC_API_KEY=sk-ant-...

# Dev-only (for supabase gen types)
SUPABASE_PROJECT_ID=your_project_id
```
