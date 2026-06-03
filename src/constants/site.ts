// ─── CUSB Design Tokens ──────────────────────────────────────────────────────
// Single source of truth for all colours, spacing, and typography scales.
// These mirror the CSS custom properties in globals.css.

export const TOKENS = {
  color: {
    maroon:      '#7B1D1D',
    maroonDark:  '#5A1313',
    maroonLight: '#A52A2A',
    gold:        '#C8922A',
    goldLight:   '#E8B84B',
    cream:       '#FAF7F2',
    creamDark:   '#F0EBE1',
    stone:       '#E8E0D5',
    ink:         '#1C1C1C',
    inkMid:      '#3D3530',
    inkSoft:     '#6B5E55',
    white:       '#FFFFFF',
  },
  navHeight: {
    topBar:  40,   // px
    mainBar: 72,   // px
    total:   112,  // px
  },
} as const;

// ─── Site Configuration ───────────────────────────────────────────────────────
export const SITE_CONFIG = {
  name:       'Central University of South Bihar',
  nameHi:     'दक्षिण बिहार केन्द्रीय विश्वविद्यालय',
  shortName:  'CUSB',
  motto:      'ज्ञान सेवा विमुक्तये',
  mottoEn:    'Knowledge, Service & Liberation',
  naac:       'A++ (CGPA 3.58)',
  estYear:    2009,
  location:   'NH-120, Panchanpur, Gaya – 824236, Bihar',
  phone:      '+91-631-2229530',
  email:      'admission@cusb.ac.in',
  website:    'https://www.cusb.ac.in',
  samarth:    'https://cusbadm.samarth.edu.in',
  cuet:       'https://cuet.samarth.ac.in',
  socialLinks: {
    facebook:  'https://www.facebook.com/cusbgaya',
    twitter:   'https://twitter.com/cusb_official',
    youtube:   'https://www.youtube.com/@CUSBGaya',
    instagram: 'https://www.instagram.com/cusb_gaya',
  },
  stats: [
    { value: '2009',  labelEn: 'Est. by Parliament', labelHi: 'संसद द्वारा स्थापित' },
    { value: '300',   labelEn: 'Acres Campus',       labelHi: 'एकड़ परिसर' },
    { value: '26',    labelEn: 'Departments',        labelHi: 'विभाग' },
    { value: '5K+',   labelEn: 'Students',           labelHi: 'छात्र' },
  ],
} as const;

// ─── API Endpoint Stubs ───────────────────────────────────────────────────────
// Replace values with real endpoints once backend is ready.
export const API_ENDPOINTS = {
  notices:     '/api/v1/notices',
  results:     '/api/v1/results',
  events:      '/api/v1/events',
  faculty:     '/api/v1/faculty',
  departments: '/api/v1/departments',
  admissions:  '/api/v1/admissions',
  research:    '/api/v1/research',
} as const;

// ─── Academic Calendar (static, swap with API later) ─────────────────────────
export const ACADEMIC_CALENDAR = [
  { date: 'Jul 1, 2025', label: 'Odd Semester Begins' },
  { date: 'Aug 2025',    label: 'CUET Admissions' },
  { date: 'Nov 2025',    label: 'Mid-Semester Exams' },
  { date: 'Dec 2025',    label: 'End Semester Exams' },
  { date: 'Jan 2026',    label: 'Even Semester Begins' },
  { date: 'May 2026',    label: 'Annual Examinations' },
] as const;
