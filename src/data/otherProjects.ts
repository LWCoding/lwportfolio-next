export interface OtherProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  coverImage?: string;
  createdAt?: string;
  platforms?: ('windows' | 'apple' | 'html5' | 'linux')[];
}

// Configure your other projects here
export const OTHER_PROJECTS_CONFIG: OtherProject[] = [
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'You\'re here now! A modern, responsive portfolio website showcasing my favorite projects and skills.',
    tags: ['Website', 'Next.js'],
    href: '/',
    coverImage: '/images/portfoliosite.png',
    createdAt: '2025-08-26',
    platforms: ['html5']
  },
  {
    id: 'always-be-closing',
    title: 'Always Be Closing',
    description: 'A simulation of customer management software designed to train salespeople to be more effective in their sales calls.',
    tags: ['Tool', 'Unity'],
    href: 'https://sale-prod.s3.amazonaws.com/Build_Prod/index.html',
    coverImage: '/images/alwaysbeclosing.png',
    createdAt: '2025-06-15',
    platforms: ['html5']
  },
  {
    id: 'cs11si',
    title: 'CS11SI Website',
    description: 'Course website for CS11SI at Stanford University, a course teaching virtual reality development.',
    tags: ['Website', 'Next.js'],
    href: 'https://web.stanford.edu/class/cs11si/',
    coverImage: '/images/cs11si.png',
    createdAt: '2025-09-05',
    platforms: ['html5']
  },
  {
    id: 'cs42si',
    title: 'CS42SI Website',
    description: 'Course website for CS42SI at Stanford University, a course teaching Unity and introductory game development.',
    tags: ['Website', 'Next.js'],
    href: 'https://web.stanford.edu/class/cs42si/',
    coverImage: '/images/cs42si.png',
    createdAt: '2025-09-03',
    platforms: ['html5']
  },
  {
    id: 'planet',
    title: 'Planet Mobile App',
    description: 'A mental health application designed to help people more easily connect with pre-existing friends.',
    tags: ['App', 'React Native'],
    href: 'https://hci.stanford.edu/courses/cs147/2024/au/projects/Technology-for-Mental-Health/Planet/',
    coverImage: '/images/planet.png',
    createdAt: '2024-12-09',
    platforms: ['apple', 'html5']
  },
  {
    id: 'obscure-courses',
    title: 'Obscure Courses',
    description: 'A gamified website that allows users to guess the names of obscure courses at Stanford University.',
    tags: ['Website', 'Svelte'],
    href: 'https://obscure-courses.vercel.app/',
    coverImage: '/images/obscurecourses.png',
    createdAt: '2024-02-10',
    platforms: ['html5']
  },
  // Add more projects here...
];