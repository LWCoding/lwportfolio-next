export interface OtherProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  coverImage?: string;
  createdAt?: string;
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
    createdAt: '2025-08-26'
  },
  {
    id: 'always-be-closing',
    title: 'Always Be Closing',
    description: 'A simulation of customer management software designed to train salespeople to be more effective in their sales calls.',
    tags: ['Tool', 'Unity'],
    href: 'https://sale-prod.s3.amazonaws.com/Build_Prod/index.html',
    coverImage: '/images/alwaysbeclosing.png',
    createdAt: '2025-06-15'
  },
  {
    id: 'obscure-courses',
    title: 'Obscure Courses',
    description: 'A gamified website that allows users to guess the names of obscure courses at Stanford University.',
    tags: ['Website', 'Svelte'],
    href: 'https://obscure-courses.vercel.app/',
    coverImage: '/images/obscurecourses.png',
    createdAt: '2024-02-10'
  },
  // Add more projects here...
];