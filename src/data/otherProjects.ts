// Other project categories with their symbols
export type OtherProjectCategory = 'website' | 'application' | 'tool' | 'design';

export const OTHER_PROJECT_CATEGORY_CONFIG = {
  website: { symbol: '🌐', label: 'Website' },
  application: { symbol: '📱', label: 'Application' },
  tool: { symbol: '🛠️', label: 'Tool' },
  design: { symbol: '🎨', label: 'Design' }
} as const;

export interface OtherProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  category: OtherProjectCategory;
  coverImage?: string;
  gradientClasses?: string;
  createdAt?: string;
}

// Configure your other projects here
export const OTHER_PROJECTS_CONFIG: OtherProject[] = [
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio',
    description: 'A modern, responsive portfolio website built with Next.js and Tailwind CSS showcasing my work and skills.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    href: 'https://yourportfolio.com',
    category: 'website',
    gradientClasses: 'from-blue-500/20 to-purple-500/20',
    createdAt: '2024-01-15'
  },
  {
    id: 'task-manager',
    title: 'Task Manager App',
    description: 'A full-stack task management application with real-time updates and collaborative features.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    href: 'https://github.com/yourusername/task-manager',
    category: 'application',
    gradientClasses: 'from-green-500/20 to-teal-500/20',
    createdAt: '2023-11-20'
  },
  {
    id: 'design-system',
    title: 'UI Design System',
    description: 'A comprehensive design system with reusable components and design tokens for consistent branding.',
    tags: ['Figma', 'Storybook', 'Design Tokens', 'CSS'],
    href: 'https://figma.com/your-design-system',
    category: 'design',
    gradientClasses: 'from-pink-500/20 to-rose-500/20',
    createdAt: '2023-09-10'
  },
  {
    id: 'build-tool',
    title: 'Development Tool',
    description: 'A CLI tool that automates common development workflows and improves developer productivity.',
    tags: ['Node.js', 'CLI', 'Automation', 'JavaScript'],
    href: 'https://github.com/yourusername/dev-tool',
    category: 'tool',
    gradientClasses: 'from-yellow-500/20 to-orange-500/20',
    createdAt: '2023-07-05'
  },
  // Add more projects here...
];
