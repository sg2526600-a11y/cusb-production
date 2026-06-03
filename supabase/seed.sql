-- ═══════════════════════════════════════════════════════════════════════════
-- CUSB Web — Seed Data (Schools & Departments)
-- Run AFTER schema.sql + rls.sql
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── Schools ─────────────────────────────────────────────────────────────────
INSERT INTO schools (id, name, slug, icon, sort_order) VALUES
  ('a0000001-0000-0000-0000-000000000001','School of Earth, Ecological & Environmental Sciences','seees','🌍',1),
  ('a0000001-0000-0000-0000-000000000002','School of Humanities & Social Sciences','shss','📚',2),
  ('a0000001-0000-0000-0000-000000000003','School of Sciences','sci','🔬',3),
  ('a0000001-0000-0000-0000-000000000004','School of Management Studies','sms','📊',4),
  ('a0000001-0000-0000-0000-000000000005','School of Education & Physical Education','sepe','🎓',5),
  ('a0000001-0000-0000-0000-000000000006','School of Engineering & Technology','set','💻',6),
  ('a0000001-0000-0000-0000-000000000007','School of Buddhist Studies & Civilization','sbsc','☸️',7)
ON CONFLICT (id) DO NOTHING;

-- ─── Departments ─────────────────────────────────────────────────────────────
INSERT INTO departments (name, slug, school_id, sort_order) VALUES
  -- SEEES
  ('Environmental Science',          'environmental-science',   'a0000001-0000-0000-0000-000000000001', 1),
  ('Geography',                      'geography',               'a0000001-0000-0000-0000-000000000001', 2),
  -- SHSS
  ('History',                        'history',                 'a0000001-0000-0000-0000-000000000002', 1),
  ('Hindi',                          'hindi',                   'a0000001-0000-0000-0000-000000000002', 2),
  ('English',                        'english',                 'a0000001-0000-0000-0000-000000000002', 3),
  ('Social Work',                    'social-work',             'a0000001-0000-0000-0000-000000000002', 4),
  ('Mass Communication',             'mass-communication',      'a0000001-0000-0000-0000-000000000002', 5),
  ('Political Science',              'political-science',       'a0000001-0000-0000-0000-000000000002', 6),
  ('Economics',                      'economics',               'a0000001-0000-0000-0000-000000000002', 7),
  -- Sciences
  ('Physics',                        'physics',                 'a0000001-0000-0000-0000-000000000003', 1),
  ('Chemistry',                      'chemistry',               'a0000001-0000-0000-0000-000000000003', 2),
  ('Mathematics',                    'mathematics',             'a0000001-0000-0000-0000-000000000003', 3),
  ('Computer Science',               'computer-science',        'a0000001-0000-0000-0000-000000000003', 4),
  ('Life Sciences',                  'life-sciences',           'a0000001-0000-0000-0000-000000000003', 5),
  -- SMS
  ('Management Studies',             'management-studies',      'a0000001-0000-0000-0000-000000000004', 1),
  ('Commerce & Financial Studies',   'commerce',                'a0000001-0000-0000-0000-000000000004', 2),
  -- SEPE
  ('Education',                      'education',               'a0000001-0000-0000-0000-000000000005', 1),
  ('Physical Education',             'physical-education',      'a0000001-0000-0000-0000-000000000005', 2),
  -- SET
  ('Engineering & Technology',       'engineering',             'a0000001-0000-0000-0000-000000000006', 1),
  -- SBSC
  ('Buddhist Studies & Civilization','buddhist-studies',        'a0000001-0000-0000-0000-000000000007', 1)
ON CONFLICT (slug) DO NOTHING;

-- ─── FAQ seed ─────────────────────────────────────────────────────────────────
INSERT INTO faq (question, answer, category, sort_order) VALUES
  ('How do I apply to CUSB?','Apply through the official portal at cusbadm.samarth.edu.in using CUET-PG scores for PG programmes, or URET for Ph.D. programmes.','admissions',1),
  ('What is the anti-ragging helpline?','1800-180-5522 (toll-free, 24×7). Ragging is a criminal offence.','campus',2),
  ('Where is CUSB located?','NH-120, Panchanpur, Gaya – 824236, Bihar. About 22 km from Gaya Railway Station.','campus',3),
  ('What scholarships are available?','NSP (scholarships.gov.in), Bihar e-Kalyan, INSPIRE, UGC-JRF, CSIR-NET and more.','academics',4),
  ('Does CUSB have hostel facilities?','Yes. Separate hostels for boys and girls on campus.','campus',5),
  ('What is the NAAC grade of CUSB?','CUSB is accredited A++ by NAAC with a CGPA of 3.58.','about',6),
  ('How do I contact the Admissions Office?','Email admission@cusb.ac.in or call +91-631-2229530.','admissions',7)
ON CONFLICT DO NOTHING;

-- ─── Default site settings ────────────────────────────────────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('maintenance_mode',        'false'),
  ('notice_ticker_enabled',   'true'),
  ('chatbot_enabled',         'true'),
  ('admissions_open',         'true'),
  ('current_academic_year',   '"2025-26"')
ON CONFLICT (key) DO NOTHING;

-- ─── Sample notice ────────────────────────────────────────────────────────────
INSERT INTO notices (title, type, is_new, is_pinned, is_published) VALUES
  ('Admissions 2025-26: UG/PG applications open via CUET — visit cusbadm.samarth.edu.in', 'notice', TRUE, TRUE, TRUE),
  ('Ph.D. URET 2025 notification released — check eligibility and dates', 'notice', TRUE, FALSE, TRUE)
ON CONFLICT DO NOTHING;
