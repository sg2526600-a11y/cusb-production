import type { NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  // ── About ──────────────────────────────────────────────────────────────────
  {
    type: 'dropdown',
    label: 'About',
    labelHi: 'परिचय',
    pageId: 'about',
    items: [
      { sectionLabel: 'University' },
      { label: 'About CUSB',            pageId: 'about' },
      { label: 'History & Development', pageId: 'about' },
      { label: 'Vision & Mission',      pageId: 'about' },
      { label: 'How to Reach CUSB',     pageId: 'contact' },
      { divider: true },
      { sectionLabel: 'Statutory Bodies' },
      { label: 'Executive Council', pageId: 'about' },
      { label: 'Academic Council',  pageId: 'about' },
      { label: 'Finance Committee', pageId: 'about' },
      { divider: true },
      { sectionLabel: 'Resources' },
      { label: 'Notices',      pageId: 'news' },
      { label: 'Photo Gallery', href: 'https://www.cusb.ac.in/index.php?option=com_phocagallery&view=category&id=2', external: true },
      { label: 'Tenders',      href: 'https://www.cusb.ac.in/index.php?option=com_content&view=category&id=13',     external: true },
      { label: 'RTI Portal',   href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=220',     external: true },
    ],
  },

  // ── Administration ─────────────────────────────────────────────────────────
  {
    type: 'dropdown',
    label: 'Administration',
    labelHi: 'प्रशासन',
    items: [
      { sectionLabel: 'Leadership' },
      { label: 'Visitor — Smt. Droupadi Murmu',      pageId: 'about' },
      { label: 'Chancellor — Dr. C. P. Thakur',       pageId: 'about' },
      { label: 'Vice-Chancellor — Prof. K. N. Singh', pageId: 'about' },
      { label: 'Pro-Vice Chancellor',                 pageId: 'about' },
      { label: 'Dean of Student Welfare',             pageId: 'about' },
      { label: 'Deans & Heads',                       pageId: 'about' },
      { label: 'Proctorial Board',                    pageId: 'about' },
      { divider: true },
      { sectionLabel: 'Officers' },
      { label: 'Registrar',                  pageId: 'about' },
      { label: 'Finance Officer',             pageId: 'about' },
      { label: 'Controller of Examinations', pageId: 'about' },
      { label: 'Librarian',                  pageId: 'about' },
      { divider: true },
      { sectionLabel: 'Structure' },
      { label: 'Sections & Staff',   pageId: 'about' },
      { label: 'Committees & Cells', pageId: 'about' },
      { label: 'Organogram',         pageId: 'about' },
      { divider: true },
      { sectionLabel: 'Faculty' },
      { label: 'Faculty & Staff', pageId: 'faculty' as const },
      { divider: true },
      { sectionLabel: 'Quality & Infrastructure' },
      { label: 'IQAC',           pageId: 'iqac' as const },
      { label: 'Infrastructure', pageId: 'infrastructure' as const },
    ],
  },

  // ── Academics (mega) ───────────────────────────────────────────────────────
  {
    type: 'mega',
    label: 'Academics',
    labelHi: 'शैक्षणिक',
    pageId: 'academics',
    columns: [
      {
        heading: '🌿 Earth, Biological & Environmental',
        items: [
          { label: 'Bioinformatics',        href: '/departments/bioinformatics'},
          { label: 'Geology',               href: '/department/geology'},
          { label: 'Geography',             href: '/department/geography'},
          { label: 'Life Science',          href: '/department/life-science'},
          { label: 'Biotechnology',         href: '/department/biotechnology'},
          { label: 'Environmental Sciences',href: '/department/environmental-sciences'},
        ],
      },
      {
        heading: '🏛️ Social Sciences & Policies',
        items: [
          { label: 'Historical Studies & Archaeology', href: '/department/historical-studies-and-archaeology'},
          { label: 'Economic Studies & Policy',        href: '/department/economic-studies-and-policy'},
          { label: 'Development Studies',              href: '/department/development-studies'},
          { label: 'Political Studies',                href: '/department/political-studies'},
          { label: 'Sociological Studies',             href: '/department/sociological-studies'},
          { label: 'Library & Information Science',    href: '/department/Library-and-Information-Science'},
        ],
      },
      {
        heading: '📐 Math, Stats & Computer Science', items: [
          { label: 'Mathematics',     href: '/department/Mathematics'},
          { label: 'Statistics',      href: '/department/Statistics'},
          { label: 'Computer Science',href: '/department/Computer-Science'},
          { label: 'Chemistry',       href: '/department/Chemistry'},
          { label: 'Physics',         href: '/department/Physics'},
        ],
      },
      {
        heading: '🎓 Education & Other Schools',
        items: [
          { label: 'Teacher Education',     href: '/department/Teacher-Education'},
          { label: 'Physical Education',    href: '/department/Physical-Education'},
          { label: 'English',               href: '/department/English'},
          { label: 'Indian Languages',      href: '/department/Indian-Languages'},
          { label: 'Commerce & Business',   href: '/department/Commerce-and-Business-Studies'},
          { label: 'Law & Governance',      href: '/department/Law-and-Governance'},
          { label: 'Mass Communication',    href: '/department/Mass-Communication'},
          { label: 'Pharmacy',              href: '/department/Pharmacy'},
          { label: 'Agriculture',           href: '/department/Agriculture'},
          { label: 'Psychological Sciences',href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=38', external: true },
        ],
      },
    ],
    footer: [
      { label: '📚 UG / PG / Ph.D. Programmes', pageId: 'academics' },
      { label: '🏛️ All 26 Departments',          pageId: 'departments' },
      { label: '🎓 Apply via Samarth Portal',    href: 'https://cusbadm.samarth.edu.in', external: true },
    ],
  },

  // ── Research ───────────────────────────────────────────────────────────────
  {
    type: 'dropdown',
    label: 'Research',
    labelHi: 'अनुसंधान',
    pageId: 'research',
    items: [
      { label: 'Research Overview', pageId: 'research' },
      { divider: true },
      { sectionLabel: 'Facilities' },
      { label: 'Central Instrumental Facility (CIF)', pageId: 'infrastructure' },
      { label: 'University Computer Centre (UCC)',    pageId: 'infrastructure' },
      { label: 'Rajarshi Janak Central Library',      pageId: 'infrastructure' },
      { divider: true },
      { sectionLabel: 'Programmes' },
      { label: 'Ph.D. Programmes (URET)', pageId: 'research' },
      { label: 'Seed Money Projects',     pageId: 'research' },
      { label: 'Sponsored Research',      pageId: 'research' },
      { divider: true },
      { sectionLabel: 'Publications' },
      { label: 'Faculty Publications',   pageId: 'faculty' },
      { label: 'Journals & Conferences', pageId: 'research' },
    ],
  },

  // ── Admissions ─────────────────────────────────────────────────────────────
  {
    type: 'dropdown',
    label: 'Admissions',
    labelHi: 'प्रवेश',
    pageId: 'admissions',
    items: [
      { label: 'Admissions Overview',  pageId: 'admissions' },
      { divider: true },
      { label: 'CUET Portal (NTA)',    href: 'https://cuet.samarth.ac.in', external: true },
      { label: 'CUSB Samarth Portal', href: 'https://cusbadm.samarth.edu.in', external: true },
      { label: 'Eligibility Criteria', pageId: 'admissions' },
      { label: 'Fee Structure',        pageId: 'admissions' },
      { label: 'Ph.D. via URET',       pageId: 'admissions' },
    ],
  },

  // ── Student Corner ─────────────────────────────────────────────────────────
  {
    type: 'dropdown',
    label: 'Student Corner',
    labelHi: 'छात्र कोना',
    pageId: 'students',
    items: [
      { label: 'Student Corner Overview', pageId: 'students' },
      { divider: true },
      { label: 'Samarth Portal',         href: 'https://cusbadm.samarth.edu.in', external: true },
      { label: 'Scholarships',           href: 'https://scholarships.gov.in', external: true },
      { label: 'Anti-Ragging',           href: 'https://antiragging.in', external: true },
      { label: 'Grievance — e-Samadhan', href: 'https://www.ugc.gov.in/e-samadhan', external: true },
      { label: 'SWAYAM / NPTEL',         href: 'https://swayam.gov.in', external: true },
    ],
  },

  // ── News & Events ──────────────────────────────────────────────────────────
  {
    type: 'link',
    label: 'News & Events',
    labelHi: 'समाचार व कार्यक्रम',
    pageId: 'news',
  },

  // ── Contact ────────────────────────────────────────────────────────────────
  {
    type: 'link',
    label: 'Contact',
    labelHi: 'संपर्क',
    pageId: 'contact',
  },
];

// ─── Top-bar quick links ──────────────────────────────────────────────────────
export const TOP_BAR_LINKS = [
  { label: '📢 Notices',    href: '/news',          external: false },
  { label: '🎓 Results',    href: 'https://cusb.ac.in/index.php?Itemid=194&id=79&option=com_content&view=article', external: true },
  { label: '📋 RTI Portal', href: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=220', external: true },
  { label: '📍 NH-120, Panchanpur, Gaya – 824236', href: '/contact', external: false },
];
