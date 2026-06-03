-- ═══════════════════════════════════════════════════════════════════════════
-- CUSB Web — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── Extensions ─────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- fuzzy search

-- ─── Enums ──────────────────────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('super_admin','university_admin','dept_admin','faculty','editor','student','guest');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE faculty_designation AS ENUM ('Professor','Associate Professor','Assistant Professor','Guest Faculty','Visiting Professor','Adjunct Faculty');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE notice_type AS ENUM ('exam','result','notice','scholar','hostel','placement','download');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE query_status AS ENUM ('pending','read','responded','spam');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE programme_type AS ENUM ('UG','PG','PhD','Diploma','Certificate');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE chat_role AS ENUM ('user','assistant');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE research_status AS ENUM ('ongoing','completed','submitted','approved');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ─── Profiles ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT,
  avatar_url    TEXT,
  role          user_role NOT NULL DEFAULT 'guest',
  department_id UUID,
  phone         TEXT,
  bio           TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Schools ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS schools (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  icon       TEXT NOT NULL DEFAULT '🏛️',
  sort_order INT  NOT NULL DEFAULT 0,
  is_active  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- ─── Departments ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS departments (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  school_id        UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  external_url     TEXT,
  description      TEXT,
  vision           TEXT,
  mission          TEXT,
  established_year INT,
  head_faculty_id  UUID,
  is_active        BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order       INT     NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by       UUID REFERENCES auth.users(id),
  updated_by       UUID REFERENCES auth.users(id)
);

-- ─── Faculty Members ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faculty_members (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id      UUID REFERENCES auth.users(id),
  department_id   UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  designation     faculty_designation NOT NULL DEFAULT 'Assistant Professor',
  email           TEXT,
  phone           TEXT,
  image_url       TEXT,
  cv_url          TEXT,
  specialisation  TEXT,
  research_areas  TEXT[],
  bio             TEXT,
  is_head         BOOLEAN NOT NULL DEFAULT FALSE,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order      INT     NOT NULL DEFAULT 0,
  joined_year     INT,
  google_scholar  TEXT,
  orcid           TEXT,
  scopus          TEXT,
  linkedin        TEXT,
  personal_website TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by      UUID REFERENCES auth.users(id),
  updated_by      UUID REFERENCES auth.users(id)
);

-- ─── Faculty sub-tables ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faculty_qualifications (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  faculty_id     UUID NOT NULL REFERENCES faculty_members(id) ON DELETE CASCADE,
  degree         TEXT NOT NULL,
  institution    TEXT NOT NULL,
  year           INT,
  specialisation TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faculty_publications (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  faculty_id   UUID NOT NULL REFERENCES faculty_members(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  journal      TEXT,
  year         INT,
  doi          TEXT,
  url          TEXT,
  type         TEXT DEFAULT 'journal',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faculty_research_areas (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  faculty_id UUID NOT NULL REFERENCES faculty_members(id) ON DELETE CASCADE,
  area       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faculty_achievements (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  faculty_id   UUID NOT NULL REFERENCES faculty_members(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  year         INT,
  category     TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Notices ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notices (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  type          notice_type NOT NULL DEFAULT 'notice',
  url           TEXT,
  description   TEXT,
  department_id UUID REFERENCES departments(id),
  is_new        BOOLEAN NOT NULL DEFAULT TRUE,
  is_pinned     BOOLEAN NOT NULL DEFAULT FALSE,
  is_published  BOOLEAN NOT NULL DEFAULT TRUE,
  published_at  TIMESTAMPTZ DEFAULT NOW(),
  expires_at    TIMESTAMPTZ,
  view_count    INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by    UUID REFERENCES auth.users(id),
  updated_by    UUID REFERENCES auth.users(id)
);

-- ─── News ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS news (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  excerpt      TEXT,
  body         TEXT,
  image_url    TEXT,
  category     TEXT DEFAULT 'general',
  tags         TEXT[],
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by   UUID REFERENCES auth.users(id),
  updated_by   UUID REFERENCES auth.users(id)
);

-- ─── Events ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  description  TEXT,
  venue        TEXT,
  starts_at    TIMESTAMPTZ NOT NULL,
  ends_at      TIMESTAMPTZ,
  image_url    TEXT,
  category     TEXT DEFAULT 'general',
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  registration_url TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by   UUID REFERENCES auth.users(id)
);

-- ─── Programs ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS programs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  type          programme_type NOT NULL,
  department_id UUID REFERENCES departments(id),
  duration      TEXT,
  seats         INT,
  eligibility   TEXT,
  description   TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Research Projects ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS research_projects (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  faculty_id  UUID REFERENCES faculty_members(id),
  description TEXT,
  funding     TEXT,
  status      research_status NOT NULL DEFAULT 'ongoing',
  start_date  DATE,
  end_date    DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Contact Queries ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_queries (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name           TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT,
  subject        TEXT NOT NULL,
  message        TEXT NOT NULL,
  status         query_status NOT NULL DEFAULT 'pending',
  response_text  TEXT,
  responded_at   TIMESTAMPTZ,
  responded_by   UUID REFERENCES auth.users(id),
  ip_address     TEXT,
  user_agent     TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── FAQ ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faq (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question     TEXT NOT NULL,
  answer       TEXT NOT NULL,
  category     TEXT NOT NULL DEFAULT 'general',
  sort_order   INT  NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by   UUID REFERENCES auth.users(id)
);

-- ─── Chat Logs ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_logs (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  role       chat_role NOT NULL,
  content    TEXT NOT NULL,
  user_id    UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Site Settings ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- ─── Hero Slides ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hero_slides (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title      TEXT NOT NULL,
  subtitle   TEXT,
  image_url  TEXT NOT NULL,
  cta_label  TEXT,
  cta_url    TEXT,
  sort_order INT  NOT NULL DEFAULT 0,
  is_active  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Announcements ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS announcements (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text         TEXT NOT NULL,
  url          TEXT,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order   INT     NOT NULL DEFAULT 0,
  expires_at   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by   UUID REFERENCES auth.users(id)
);

-- ─── IQAC Documents ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS iqac_documents (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  category     TEXT NOT NULL DEFAULT 'report',
  file_url     TEXT NOT NULL,
  year         INT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order   INT     NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by   UUID REFERENCES auth.users(id)
);

-- ─── Updated-at triggers ──────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END $$;

DO $$ DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['profiles','schools','departments','faculty_members',
    'faculty_publications','notices','news','events','programs',
    'research_projects','faq','site_settings']
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_%s_updated_at ON %s;
       CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON %s
         FOR EACH ROW EXECUTE FUNCTION set_updated_at();',
      t, t, t, t
    );
  END LOOP;
END $$;

-- ─── Auto-create profile on signup ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'guest')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── Helper functions ─────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION current_user_role()
RETURNS user_role LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role IN ('super_admin','university_admin') FROM profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION is_editor_or_above()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role IN ('super_admin','university_admin','dept_admin','editor') FROM profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION is_faculty_or_above()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role IN ('super_admin','university_admin','dept_admin','editor','faculty') FROM profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION chat_stats_last_30_days()
RETURNS TABLE(date TEXT, count BIGINT) LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT to_char(created_at::date,'YYYY-MM-DD') AS date, COUNT(*) AS count
  FROM chat_logs
  WHERE created_at >= NOW() - INTERVAL '30 days'
  GROUP BY created_at::date
  ORDER BY created_at::date;
$$;

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_faculty_dept     ON faculty_members(department_id);
CREATE INDEX IF NOT EXISTS idx_faculty_active   ON faculty_members(is_active);
CREATE INDEX IF NOT EXISTS idx_notices_type     ON notices(type);
CREATE INDEX IF NOT EXISTS idx_notices_pub      ON notices(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_status   ON contact_queries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_session     ON chat_logs(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_faq_cat          ON faq(category, sort_order);

