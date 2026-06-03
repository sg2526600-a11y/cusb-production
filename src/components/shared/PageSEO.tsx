// ─── SEO Component ────────────────────────────────────────────────────────────
// Reusable head-tag manager using react-helmet-async.
// Wrap any page with <PageSEO> to inject title, description, Open Graph, etc.

import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '@/constants/site';

interface PageSEOProps {
  title?:       string;
  description?: string;
  canonical?:   string;
  ogImage?:     string;
  noIndex?:     boolean;
}

export default function PageSEO({
  title,
  description,
  canonical,
  ogImage       = 'https://www.cusb.ac.in/images/cusb/banner1.jpg',
  noIndex       = false,
}: PageSEOProps) {
  const resolvedTitle = title
    ? `${title} | ${SITE_CONFIG.shortName}`
    : `${SITE_CONFIG.name} – ${SITE_CONFIG.motto}`;

  const resolvedDesc =
    description ??
    `${SITE_CONFIG.name} (${SITE_CONFIG.shortName}), ${SITE_CONFIG.location}. NAAC ${SITE_CONFIG.naac}. Admissions via CUET.`;

  const resolvedCanonical = canonical ?? SITE_CONFIG.website;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={resolvedCanonical} />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:url"         content={resolvedCanonical} />
      <meta property="og:title"       content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:site_name"   content={SITE_CONFIG.name} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image"       content={ogImage} />
    </Helmet>
  );
}
