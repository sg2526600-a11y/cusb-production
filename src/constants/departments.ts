import type { School } from '@/types';

export const SCHOOLS: School[] = [
  {
    icon: '📐',
    name: 'Mathematics, Statistics & Computer Science',
    departments: [
      { name: 'Dept. of Mathematics',     url: '/departments/mathematics' },
      { name: 'Department of Statistics', url: '/departments/statistics' },
      { name: 'Department of Computer Science', url: '/departments/computer-science' },
    ],
  },
  {
    icon: '🌿',
    name: 'Earth, Biological & Environmental Sciences',
    departments: [
      { name: 'Dept. of Bioinformatics',         url: '/departments/bioinformatics' },
      { name: 'Department of Geology',            url: '/departments/geology' },
      { name: 'Department of Geography',          url: '/departments/geography' },
      { name: 'Dept. of Life Science',            url: '/departments/life-science' },
      { name: 'Department of Biotechnology',      url: '/departments/biotechnology' },
      { name: 'Dept. of Environmental Sciences',  url: '/departments/environmental-sciences' },
    ],
  },
  {
    icon: '🏛️',
    name: 'Social Sciences & Policies',
    departments: [
      { name: 'Dept. of Historical Studies & Archaeology', url: '/departments/historical-studies-and-archaeology' },
      { name: 'Dept. of Economic Studies & Policy',        url: '/departments/economic-studies-and-policy' },
      { name: 'Development Studies',                        url: '/departments/development-studies' },
      { name: 'Dept. of Political Studies',                 url: '/departments/political-studies' },
      { name: 'Dept. of Sociological Studies',              url: '/departments/sociological-studies' },
      { name: 'Library & Information Science',              url: '/department/library-and-information-science' },
    ],
  },
  {
    icon: '⚗️',
    name: 'Physical & Chemical Sciences',
    departments: [
      { name: 'Department of Chemistry', url: '/departments/chemistry' },
      { name: 'Department of Physics',   url: '/departments/physics' },
    ],
  },
  {
    icon: '📖',
    name: 'Languages & Literature',
    departments: [
      { name: 'Department of English',                         url: '/departments/english' },
      { name: 'Dept. of Indian Languages (Hindi, Sanskrit etc.)', url: '/departments/indian-languages' },
    ],
  },
  {
    icon: '⚖️',
    name: 'Law & Governance',
    departments: [
      { name: 'Dept. of Law & Governance', url: '/departments/law-and-governance' },
    ],
  },
  {
    icon: '💼',
    name: 'Management & Commerce',
    departments: [
      { name: 'Dept. of Commerce & Business Studies', url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=141' },
    ],
  },
  {
    icon: '🎓',
    name: 'School of Education',
    departments: [
      { name: 'Department of Teacher Education', url: '/departments/teacher-education' },
      { name: 'Department of Physical Education', url: '/departments/physical-education' },
    ],
  },
  {
    icon: '📺',
    name: 'Mass Communication & Media',
    departments: [
      { name: 'Dept. of Mass Communication & Media Studies', url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=139' },
    ],
  },
  {
    icon: '💊',
    name: 'Pharmaceutical Sciences',
    departments: [
      { name: 'Department of Pharmacy', url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=37' },
    ],
  },
  {
    icon: '🌾',
    name: 'Agricultural Sciences',
    departments: [
      { name: 'Department of Agriculture', url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=44' },
    ],
  },
  {
    icon: '🧠',
    name: 'Psychological Sciences',
    departments: [
      { name: 'Department of Psychological Sciences', url: 'https://www.cusb.ac.in/index.php?option=com_content&view=article&id=38' },
    ],
  },
];
