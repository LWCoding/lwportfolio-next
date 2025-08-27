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
    title: 'Personal Portfolio',
    description: 'A modern, responsive portfolio website built with Next.js and Tailwind CSS showcasing my work and skills.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    href: 'https://yourportfolio.com',
    createdAt: '2024-01-15'
  },
  {
    id: 'task-manager',
    title: 'Task Manager App',
    description: 'A full-stack task management application with real-time updates and collaborative features.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    href: 'https://github.com/yourusername/task-manager',
    createdAt: '2023-11-20'
  },
  {
    id: 'design-system',
    title: 'UI Design System',
    description: 'A comprehensive design system with reusable components and design tokens for consistent branding.',
    tags: ['Figma', 'Storybook', 'Design Tokens', 'CSS'],
    href: 'https://figma.com/your-design-system',
    createdAt: '2023-09-10'
  },
  {
    id: 'build-tool',
    title: 'Development Tool',
    description: 'A CLI tool that automates common development workflows and improves developer productivity.',
    tags: ['Node.js', 'CLI', 'Automation', 'JavaScript'],
    href: 'https://github.com/yourusername/dev-tool',
    createdAt: '2023-07-05'
  },
  // Add more projects here...
];