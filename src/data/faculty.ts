// ─── Faculty Data ─────────────────────────────────────────────────────────────
// Faculty data for Mathematics, Computer Science and Statistics departments is
// sourced from the official CUSB website (https://www.cusb.ac.in).
// All other department entries are placeholder data pending official verification.

export interface FacultyMember {
  id: number;
  name: string;
  designation: 'Professor' | 'Associate Professor' | 'Assistant Professor';
  department: string;
  school: string;
  specialisation: string;
  email?: string;
  profileUrl?: string;
  emoji: string;
  isHead?: boolean;
}

export const SCHOOLS = [
  'All Schools',
  'Mathematics & Computer Science',
  'Earth, Biological & Environmental Sciences',
  'Social Sciences & Policy Studies',
  'Physical & Chemical Sciences',
  'Languages & Literature',
  'Pharmaceutical & Agricultural Sciences',
  'Law, Governance & Public Policy',
  'Commerce & Management',
  'Education & Humanities',
] as const;

export const FACULTY_DATA: FacultyMember[] = [

  // ─── Department of Mathematics ─────────────────────────────────────────────
  // Source: https://cusb.ac.in/index.php?option=com_content&view=article&id=337&Itemid=425
  {
    id: 1,
    name: 'Prof. H.K. Nigam',
    designation: 'Professor',
    department: 'Department of Mathematics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Approximation Theory, Fourier Analysis, Summability Theory',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/u3',
    emoji: '👨‍🏫',
  },
  {
    id: 2,
    name: 'Prof. Roushan Kumar',
    designation: 'Professor',
    department: 'Department of Mathematics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Wave Propagation in Thermoelastic Medium, Thermoelastic Diffusion, Mechanical Vibrations',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/d',
    emoji: '👨‍🏫',
    isHead: true,
  },
  {
    id: 3,
    name: 'Prof. Jay Prakash Singh',
    designation: 'Professor',
    department: 'Department of Mathematics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Manifolds Theory, Geometrical Flows, Computational Geometry, Cosmology',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/k9',
    emoji: '👨‍🏫',
  },
  {
    id: 4,
    name: 'Dr. Vivek Kumar Jain',
    designation: 'Associate Professor',
    department: 'Department of Mathematics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Group Theory',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/uf',
    emoji: '👨‍🔬',
  },
  {
    id: 5,
    name: 'Dr. Rajesh Pratap Singh',
    designation: 'Associate Professor',
    department: 'Department of Mathematics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Finite Fields, Combinatorics, Cryptography',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/n5',
    emoji: '👨‍🔬',
  },
  {
    id: 6,
    name: 'Dr. Shubh Narayan Singh',
    designation: 'Assistant Professor',
    department: 'Department of Mathematics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Semigroup Theory, Graph Theory, Automata Theory, Coding Theory',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/uo',
    emoji: '👨‍💻',
  },
  {
    id: 7,
    name: 'Dr. Pankaj Mishra',
    designation: 'Assistant Professor',
    department: 'Department of Mathematics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Heat Mass Transport, Magnetohydrodynamics, Numerical Methods for Boundary Layer Flow, Applied Differential Equation',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/ao',
    emoji: '👨‍💻',
  },
  {
    id: 8,
    name: 'Dr. Chandra Shekher Singh',
    designation: 'Assistant Professor',
    department: 'Department of Mathematics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Fractional Differential Equations, Numerical Methods, Integral Equations, Mathematical Modeling',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/',
    emoji: '👨‍💻',
  },

  // ─── Department of Computer Science ───────────────────────────────────────
  // Source: https://cusb.ac.in/index.php?option=com_content&view=article&id=353&Itemid=443
  {
    id: 9,
    name: 'Prof. Prabhat Ranjan',
    designation: 'Professor',
    department: 'Department of Computer Science',
    school: 'Mathematics & Computer Science',
    specialisation: 'Big Data, Distributed System, Software Engineering',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/a4',
    emoji: '👨‍💻',
    isHead: true,
  },
  {
    id: 10,
    name: 'Prof. Jainath Yadav',
    designation: 'Professor',
    department: 'Department of Computer Science',
    school: 'Mathematics & Computer Science',
    specialisation: 'Speech Signal Processing, Machine Learning, Image and Audio Watermarking',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/custom-profile/CUSB/nl',
    emoji: '👨‍🏫',
  },
  {
    id: 11,
    name: 'Dr. Nemi Chandra Rathore',
    designation: 'Associate Professor',
    department: 'Department of Computer Science',
    school: 'Mathematics & Computer Science',
    specialisation: 'Security and Privacy in Online Social Networks',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/ah',
    emoji: '👨‍🔬',
  },
  {
    id: 12,
    name: 'Dr. Piyush Kumar Singh',
    designation: 'Assistant Professor',
    department: 'Department of Computer Science',
    school: 'Mathematics & Computer Science',
    specialisation: 'Image Processing, Parallel Computing, Wavelet Transform',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/a9',
    emoji: '👨‍💻',
  },
  {
    id: 13,
    name: 'Dr. Mrityunjay Singh',
    designation: 'Assistant Professor',
    department: 'Department of Computer Science',
    school: 'Mathematics & Computer Science',
    specialisation: 'Theoretical Computer Science, Discrete Mathematics, Algorithms, Cryptography and Security',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/ea',
    emoji: '👨‍💻',
  },
  {
    id: 14,
    name: 'Dr. Prakash Kumar',
    designation: 'Assistant Professor',
    department: 'Department of Computer Science',
    school: 'Mathematics & Computer Science',
    specialisation: 'Network Security, Data Communication and Computer Networks',
    emoji: '👨‍💻',
  },

  // ─── Department of Statistics ──────────────────────────────────────────────
  // Source: https://cusb.ac.in/index.php?option=com_content&view=article&id=346&Itemid=434
  {
    id: 15,
    name: 'Prof. Sunit Kumar',
    designation: 'Professor',
    department: 'Department of Statistics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Data Mining, Demography, Steganography, Project Planning and Management',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/ab',
    emoji: '👩‍🏫',
    isHead: true,
  },
  {
    id: 16,
    name: 'Dr. Richa Vatsa',
    designation: 'Assistant Professor',
    department: 'Department of Statistics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Bayesian Statistical Modeling, Climatology, Demography, Big Data Analytics',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/u',
    emoji: '👩‍🔬',
  },
  {
    id: 17,
    name: 'Dr. Kamlesh Kumar',
    designation: 'Assistant Professor',
    department: 'Department of Statistics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Sampling Theory, Demography, Biostatistics',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/a3',
    emoji: '👨‍🔬',
  },
  {
    id: 18,
    name: 'Dr. Indrajeet Kumar',
    designation: 'Assistant Professor',
    department: 'Department of Statistics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Data Science, Quality Control, Reliability Testing, Survival Analysis, Information Theory, Bayesian Inference',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/en',
    emoji: '👨‍💻',
  },
  {
    id: 19,
    name: 'Dr. Sandeep Kumar Maurya',
    designation: 'Assistant Professor',
    department: 'Department of Statistics',
    school: 'Mathematics & Computer Science',
    specialisation: 'Statistical Inference, Lifetime Models, Bayesian Methods in Reliability Estimation',
    profileUrl: 'https://people.samarth.edu.in/index.php/profile/user/index/CUSB/ne',
    emoji: '👨‍🔬',
  },

  // ─── Earth, Biological & Environmental ────────────────────────────────────
  {
    id: 20,
    name: 'Prof. S. N. Mishra',
    designation: 'Professor',
    department: 'Department of Environmental Science',
    school: 'Earth, Biological & Environmental Sciences',
    specialisation: 'Climate Change, Biodiversity, Ecology',
    profileUrl: 'https://www.cusb.ac.in',
    emoji: '👩‍🔬',
    isHead: true,
  },
  {
    id: 21,
    name: 'Dr. Rajiv Prasad',
    designation: 'Associate Professor',
    department: 'Department of Botany',
    school: 'Earth, Biological & Environmental Sciences',
    specialisation: 'Plant Molecular Biology, Ethnobotany',
    emoji: '👨‍🔬',
  },
  {
    id: 22,
    name: 'Dr. Sunita Kumari',
    designation: 'Assistant Professor',
    department: 'Department of Zoology',
    school: 'Earth, Biological & Environmental Sciences',
    specialisation: 'Wildlife Biology, Conservation Genetics',
    emoji: '👩‍🔬',
  },
  {
    id: 23,
    name: 'Dr. M. P. Yadav',
    designation: 'Associate Professor',
    department: 'Department of Geology',
    school: 'Earth, Biological & Environmental Sciences',
    specialisation: 'Remote Sensing, Geomorphology',
    emoji: '👨‍🏫',
    isHead: true,
  },
  // ─── Social Sciences & Policy Studies ─────────────────────────────────────
  {
    id: 24,
    name: 'Prof. A. K. Jha',
    designation: 'Professor',
    department: 'Department of Economics',
    school: 'Social Sciences & Policy Studies',
    specialisation: 'Development Economics, Public Finance',
    profileUrl: 'https://www.cusb.ac.in',
    emoji: '👨‍🏫',
    isHead: true,
  },
  {
    id: 25,
    name: 'Dr. Poonam Tiwari',
    designation: 'Associate Professor',
    department: 'Department of Political Science',
    school: 'Social Sciences & Policy Studies',
    specialisation: 'Comparative Politics, Indian Democracy',
    emoji: '👩‍🏫',
  },
  {
    id: 26,
    name: 'Dr. Rohit Sinha',
    designation: 'Assistant Professor',
    department: 'Department of Sociology',
    school: 'Social Sciences & Policy Studies',
    specialisation: 'Rural Sociology, Gender Studies',
    emoji: '👨‍🏫',
  },
  {
    id: 27,
    name: 'Dr. Kavita Gupta',
    designation: 'Associate Professor',
    department: 'Department of History',
    school: 'Social Sciences & Policy Studies',
    specialisation: 'Medieval Indian History, Heritage Studies',
    emoji: '👩‍🏫',
    isHead: true,
  },
  // ─── Physical & Chemical Sciences ─────────────────────────────────────────
  {
    id: 28,
    name: 'Prof. D. K. Srivastava',
    designation: 'Professor',
    department: 'Department of Physics',
    school: 'Physical & Chemical Sciences',
    specialisation: 'Condensed Matter Physics, Nanomaterials',
    profileUrl: 'https://www.cusb.ac.in',
    emoji: '👨‍🔬',
    isHead: true,
  },
  {
    id: 29,
    name: 'Dr. Anita Rani',
    designation: 'Associate Professor',
    department: 'Department of Chemistry',
    school: 'Physical & Chemical Sciences',
    specialisation: 'Organic Chemistry, Green Synthesis',
    emoji: '👩‍🔬',
    isHead: true,
  },
  // ─── Languages & Literature ────────────────────────────────────────────────
  {
    id: 30,
    name: 'Prof. M. K. Pandey',
    designation: 'Professor',
    department: 'Department of Hindi',
    school: 'Languages & Literature',
    specialisation: 'Hindi Literature, Comparative Literature',
    emoji: '👨‍🏫',
    isHead: true,
  },
  {
    id: 31,
    name: 'Dr. Sarah Thomas',
    designation: 'Associate Professor',
    department: 'Department of English',
    school: 'Languages & Literature',
    specialisation: 'Postcolonial Literature, ELT',
    emoji: '👩‍🏫',
  },
  // ─── Pharmaceutical & Agricultural Sciences ────────────────────────────────
  {
    id: 32,
    name: 'Prof. B. K. Singh',
    designation: 'Professor',
    department: 'Department of Pharmaceutical Sciences',
    school: 'Pharmaceutical & Agricultural Sciences',
    specialisation: 'Drug Delivery, Pharmacology',
    profileUrl: 'https://www.cusb.ac.in',
    emoji: '👨‍🔬',
    isHead: true,
  },
  {
    id: 33,
    name: 'Dr. Rekha Kumari',
    designation: 'Assistant Professor',
    department: 'Department of Agriculture',
    school: 'Pharmaceutical & Agricultural Sciences',
    specialisation: 'Agronomy, Soil Science',
    emoji: '👩‍🌾',
  },
  // ─── Law, Governance & Public Policy ──────────────────────────────────────
  {
    id: 34,
    name: 'Prof. V. K. Tripathi',
    designation: 'Professor',
    department: 'Department of Law',
    school: 'Law, Governance & Public Policy',
    specialisation: 'Constitutional Law, Human Rights',
    profileUrl: 'https://www.cusb.ac.in',
    emoji: '👨‍⚖️',
    isHead: true,
  },
  {
    id: 35,
    name: 'Dr. Nandita Roy',
    designation: 'Associate Professor',
    department: 'Centre for Policy Studies',
    school: 'Law, Governance & Public Policy',
    specialisation: 'Public Policy, Governance',
    emoji: '👩‍⚖️',
  },
  // ─── Commerce & Management ─────────────────────────────────────────────────
  {
    id: 36,
    name: 'Prof. R. C. Verma',
    designation: 'Professor',
    department: 'Department of Commerce',
    school: 'Commerce & Management',
    specialisation: 'Financial Management, Accounting',
    emoji: '👨‍🏫',
    isHead: true,
  },
  {
    id: 37,
    name: 'Dr. Meera Pal',
    designation: 'Assistant Professor',
    department: 'Department of Management Studies',
    school: 'Commerce & Management',
    specialisation: 'HR Management, Organisational Behaviour',
    emoji: '👩‍🏫',
  },
  // ─── Education & Humanities ────────────────────────────────────────────────
  {
    id: 38,
    name: 'Prof. S. K. Dubey',
    designation: 'Professor',
    department: 'Department of Education',
    school: 'Education & Humanities',
    specialisation: 'Educational Technology, Curriculum Design',
    profileUrl: 'https://www.cusb.ac.in',
    emoji: '👨‍🎓',
    isHead: true,
  },
  {
    id: 39,
    name: 'Dr. Archana Shukla',
    designation: 'Associate Professor',
    department: 'Department of Library & Information Science',
    school: 'Education & Humanities',
    specialisation: 'Digital Libraries, Knowledge Management',
    emoji: '👩‍🏫',
  },
  {
    id: 40,
    name: 'Dr. P. K. Tiwary',
    designation: 'Associate Professor',
    department: 'Department of Physical Education',
    school: 'Education & Humanities',
    specialisation: 'Sports Science, Athletic Training',
    emoji: '🏃',
  },
  {
    id: 41,
    name: 'Dr. Vijay Kumar',
    designation: 'Assistant Professor',
    department: 'Department of Mass Communication',
    school: 'Education & Humanities',
    specialisation: 'Digital Media, Journalism',
    emoji: '📡',
  },
];

// ─── Helper: group by school ──────────────────────────────────────────────────
export function groupBySchool(members: FacultyMember[]): Record<string, FacultyMember[]> {
  return members.reduce<Record<string, FacultyMember[]>>((acc, m) => {
    if (!acc[m.school]) acc[m.school] = [];
    acc[m.school].push(m);
    return acc;
  }, {});
}

// ─── Helper: filter ───────────────────────────────────────────────────────────
export function filterFaculty(
  members: FacultyMember[],
  school: string,
  query: string,
): FacultyMember[] {
  return members.filter((m) => {
    const matchSchool = school === 'All Schools' || m.school === school;
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.department.toLowerCase().includes(q) ||
      m.specialisation.toLowerCase().includes(q) ||
      m.designation.toLowerCase().includes(q);
    return matchSchool && matchQuery;
  });
}
