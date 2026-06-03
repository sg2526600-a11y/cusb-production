-- ═══════════════════════════════════════════════════════════════════════════
-- CUSB Web — Row Level Security Policies
-- Run AFTER schema.sql
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools             ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments         ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_members     ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_publications   ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_research_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_achievements   ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices             ENABLE ROW LEVEL SECURITY;
ALTER TABLE news                ENABLE ROW LEVEL SECURITY;
ALTER TABLE events              ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs            ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_projects   ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_queries     ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs           ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides         ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements       ENABLE ROW LEVEL SECURITY;
ALTER TABLE iqac_documents      ENABLE ROW LEVEL SECURITY;

-- ─── Profiles ────────────────────────────────────────────────────────────────
CREATE POLICY "Public profiles viewable" ON profiles FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Own profile editable"     ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin full access"        ON profiles FOR ALL   USING (is_admin());

-- ─── Schools & Departments (public read, admin write) ────────────────────────
CREATE POLICY "Public read schools"      ON schools     FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin write schools"      ON schools     FOR ALL    USING (is_editor_or_above());
CREATE POLICY "Public read departments"  ON departments FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin write departments"  ON departments FOR ALL    USING (is_editor_or_above());

-- ─── Faculty (public read active, admin write) ───────────────────────────────
CREATE POLICY "Public read faculty"         ON faculty_members     FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin write faculty"         ON faculty_members     FOR ALL    USING (is_editor_or_above());
CREATE POLICY "Public read qualifications"  ON faculty_qualifications FOR SELECT USING (TRUE);
CREATE POLICY "Admin write qualifications"  ON faculty_qualifications FOR ALL    USING (is_editor_or_above());
CREATE POLICY "Public read publications"    ON faculty_publications   FOR SELECT USING (TRUE);
CREATE POLICY "Admin write publications"    ON faculty_publications   FOR ALL    USING (is_editor_or_above());
CREATE POLICY "Public read research_areas"  ON faculty_research_areas FOR SELECT USING (TRUE);
CREATE POLICY "Admin write research_areas"  ON faculty_research_areas FOR ALL    USING (is_editor_or_above());
CREATE POLICY "Public read achievements"    ON faculty_achievements   FOR SELECT USING (TRUE);
CREATE POLICY "Admin write achievements"    ON faculty_achievements   FOR ALL    USING (is_editor_or_above());

-- ─── Notices (public read published, admin write) ────────────────────────────
CREATE POLICY "Public read notices"  ON notices FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admin write notices"  ON notices FOR ALL    USING (is_editor_or_above());

-- ─── News / Events / Programs / Research (public read) ───────────────────────
CREATE POLICY "Public read news"      ON news              FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admin write news"      ON news              FOR ALL    USING (is_editor_or_above());
CREATE POLICY "Public read events"    ON events            FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admin write events"    ON events            FOR ALL    USING (is_editor_or_above());
CREATE POLICY "Public read programs"  ON programs          FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin write programs"  ON programs          FOR ALL    USING (is_editor_or_above());
CREATE POLICY "Public read research"  ON research_projects FOR SELECT USING (TRUE);
CREATE POLICY "Admin write research"  ON research_projects FOR ALL    USING (is_editor_or_above());

-- ─── Contact Queries (anyone can insert, admin reads) ────────────────────────
CREATE POLICY "Anyone can submit query"  ON contact_queries FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin reads queries"      ON contact_queries FOR SELECT USING (is_editor_or_above());
CREATE POLICY "Admin updates queries"    ON contact_queries FOR UPDATE USING (is_editor_or_above());
CREATE POLICY "Admin deletes queries"    ON contact_queries FOR DELETE USING (is_admin());

-- ─── FAQ (public read published, admin write) ────────────────────────────────
CREATE POLICY "Public read faq"   ON faq FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admin write faq"   ON faq FOR ALL    USING (is_editor_or_above());

-- ─── Chat Logs (anyone inserts, admin reads) ─────────────────────────────────
CREATE POLICY "Anyone logs chat"  ON chat_logs FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin reads chat"  ON chat_logs FOR SELECT USING (is_admin());

-- ─── Site Settings / Hero / Announcements / IQAC (public read, admin write) ──
CREATE POLICY "Public read settings"      ON site_settings   FOR SELECT USING (TRUE);
CREATE POLICY "Admin write settings"      ON site_settings   FOR ALL    USING (is_admin());
CREATE POLICY "Public read hero"          ON hero_slides     FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin write hero"          ON hero_slides     FOR ALL    USING (is_editor_or_above());
CREATE POLICY "Public read announcements" ON announcements   FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin write announcements" ON announcements   FOR ALL    USING (is_editor_or_above());
CREATE POLICY "Public read iqac"          ON iqac_documents  FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admin write iqac"          ON iqac_documents  FOR ALL    USING (is_editor_or_above());
