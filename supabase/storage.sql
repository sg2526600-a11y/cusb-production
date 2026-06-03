-- ═══════════════════════════════════════════════════════════════════════════
-- CUSB Web — Storage Buckets
-- Run AFTER rls.sql
-- ═══════════════════════════════════════════════════════════════════════════

-- Faculty profile images (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('faculty-images', 'faculty-images', TRUE, 5242880,
        ARRAY['image/jpeg','image/png','image/webp','image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Faculty CV/documents (private)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('faculty-documents', 'faculty-documents', FALSE, 10485760,
        ARRAY['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- Notice/IQAC attachments (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('notice-attachments', 'notice-attachments', TRUE, 10485760,
        ARRAY['application/pdf','image/jpeg','image/png','image/webp'])
ON CONFLICT (id) DO NOTHING;

-- News / event images (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('media', 'media', TRUE, 10485760,
        ARRAY['image/jpeg','image/png','image/webp','image/gif'])
ON CONFLICT (id) DO NOTHING;

-- ─── Storage policies ────────────────────────────────────────────────────────

-- faculty-images: public read, editor write
CREATE POLICY "Public read faculty images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'faculty-images');

CREATE POLICY "Editors upload faculty images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'faculty-images' AND is_editor_or_above());

CREATE POLICY "Editors delete faculty images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'faculty-images' AND is_editor_or_above());

-- faculty-documents: editor read/write
CREATE POLICY "Editors read faculty docs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'faculty-documents' AND is_editor_or_above());

CREATE POLICY "Editors upload faculty docs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'faculty-documents' AND is_editor_or_above());

-- notice-attachments: public read, editor write
CREATE POLICY "Public read notice attachments"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'notice-attachments');

CREATE POLICY "Editors upload notice attachments"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'notice-attachments' AND is_editor_or_above());

-- media: public read, editor write
CREATE POLICY "Public read media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

CREATE POLICY "Editors upload media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'media' AND is_editor_or_above());
