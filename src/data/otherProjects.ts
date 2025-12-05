import type { ReactNode } from 'react';

export interface OtherProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  coverImage?: string;
  createdAt?: string;
  platforms?: ('windows' | 'apple' | 'html5' | 'linux' | 'figma')[];
  fadeOpacity?: number; // Controls fade amount: 0-1, where 1 is default (full fade), lower values = less fade
  // Optional GitHub repository link for this project
  githubUrl?: string;
  // Optional rich detail content rendered inside the detail side panel
  detailComponent?: ReactNode;
}

// Configure your other projects here
export const OTHER_PROJECTS_CONFIG: OtherProject[] = [
  {
    id: 'always-be-closing',
    title: 'Always Be Closing',
    description: 'A simulation of customer management software designed to train salespeople to be more effective in sales calls. Used to teach STRAMGT351 at Stanford.',
    tags: ['Simulation', 'Unity/C#'],
    href: 'https://sale-prod.s3.amazonaws.com/Build_Prod/index.html',
    coverImage: '/images/alwaysbeclosing.png',
    createdAt: '2025-06-15',
    platforms: ['html5'],
    detailComponent: 'documentation section in progress',
    githubUrl: 'https://github.com/banasse/ABCSALE'
  },
  {
    id: 'immersifyvr',
    title: 'ImmersifyVR',
    description: 'A virtual reality exercise application designed to motivate older adults to exercise.',
    tags: ['Virtual Reality', 'Unity/C#'],
    href: 'https://www.immersifyvr.org/',
    coverImage: '/images/immersifyvr.png',
    createdAt: '2024-10-24',
    platforms: ['html5'],
    detailComponent: 'documentation section in progress',
    githubUrl: 'https://github.com/JLee-003/ImmersifyVR'
  },
  {
    id: 'serendipi-tea',
    title: 'Serendipi-Tea',
    description: 'A card game and pop-up cafe connecting startup founders together, officially prototyped and tested at the StartX accelerator program.',
    tags: ['In-Person', 'Experience'],
    href: 'https://www.figma.com/design/it91COfADt2hqakFp3oiHu/Serendipi-tea-Print-and-Play?node-id=2284-2&t=yr4TKOw8Vh5lL8rz-1',
    coverImage: '/images/serendipitea.JPG',
    createdAt: '2025-04-10',
    platforms: ['figma'],
    fadeOpacity: 0.7,
    detailComponent: 'documentation section in progress'
  },
  {
    id: 'cs42si',
    title: 'CS42SI Course',
    description: 'Original curriculum and website for CS42SI at Stanford, a course teaching Unity and game development.',
    tags: ['Website', 'Next.js'],
    href: 'https://web.stanford.edu/class/cs42si/',
    coverImage: '/images/cs42si.png',
    createdAt: '2025-09-03',
    platforms: ['html5']
  },
  {
    id: 'cs11si',
    title: 'CS11SI Course',
    description: 'Original curriculum and website for CS11SI at Stanford, a course teaching Unity\'s XR interaction toolkit.',
    tags: ['Website', 'Next.js'],
    href: 'https://web.stanford.edu/class/cs11si/',
    coverImage: '/images/cs11si.png',
    createdAt: '2025-09-05',
    platforms: ['html5']
  },
  {
    id: 'timesync',
    title: 'Timesync',
    description: 'A schedule-syncing app designed to help people easily coordinate their schedules with friends.',
    tags: ['App', 'Figma'],
    href: 'https://www.figma.com/design/Ng5ndVHBaIS4g86iEHsXzR/TimeSync-App?node-id=42-2988&t=WRYz7MBidzvsda76-1',
    coverImage: '/images/timesync.png',
    createdAt: '2025-04-10',
    platforms: ['figma']
  },
  {
    id: 'planet',
    title: 'Planet',
    description: 'A mental health mobile application designed to help people easily connect with pre-existing friends.',
    tags: ['App', 'React Native'],
    href: 'https://hci.stanford.edu/courses/cs147/2024/au/projects/Technology-for-Mental-Health/Planet/',
    coverImage: '/images/planet.png',
    createdAt: '2024-12-09',
    platforms: ['apple', 'figma', 'html5']
  },
  {
    id: 'obscure-courses',
    title: 'Obscure Courses',
    description: 'A gamified website that allows users to guess the names of obscure courses at Stanford.',
    tags: ['Website', 'Svelte'],
    href: 'https://obscure-courses.vercel.app/',
    coverImage: '/images/obscurecourses.png',
    createdAt: '2024-02-10',
    platforms: ['html5']
  },
  {
    id: 'malaysian-club-chicago',
    title: 'Malaysian Club Website',
    description: 'A website for the Malaysian Club of Chicago, a club that promotes Malaysian culture and heritage.',
    tags: ['Website', 'HTML/CSS/JS'],
    href: 'https://malaysianclubchicago.com/',
    coverImage: '/images/mcc-website.png',
    createdAt: '2021-01-07',
    fadeOpacity: 0.7,
    platforms: ['html5']
  },
  // Add more projects here...
];