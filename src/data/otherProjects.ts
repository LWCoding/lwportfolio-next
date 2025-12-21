import type { ReactNode } from 'react';

export type DisplayType = 'monitor' | 'plain' | 'mobile' | 'none';

export interface OtherProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  coverImage?: string;
  createdAt?: string;
  tools?: ('unity' | 'csharp' | 'react' | 'figma' | 'python' | 'cplusplus' | 'nextjs' | 'html')[];
  fadeOpacity?: number; // Controls fade amount: 0-1, where 1 is default (full fade), lower values = less fade
  // Optional GitHub repository link for this project
  githubUrl?: string;
  // Optional rich detail content rendered inside the detail side panel
  detailComponent?: ReactNode;
  // Display type for the project detail page: 'monitor' (default), 'plain', 'mobile', or 'none'
  displayType?: DisplayType;
  // Optional image to display in the mobile/desktop/plain frame, defaults to coverImage if not provided
  displayImage?: string;
  // Optional type of content (e.g., 'Website', 'Game', 'App') - button will display as "View {type}"
  type?: string;
}

// Configure your other projects here
export const OTHER_PROJECTS_CONFIG: OtherProject[] = [
  {
    id: 'always-be-closing',
    title: 'Always Be Closing',
    description: 'A simulation of customer management software designed to train salespeople to be more effective in sales calls. Used to teach STRAMGT351 at Stanford.',
    tags: ['Simulation'],
    href: 'https://sale-prod.s3.amazonaws.com/Build_Prod/index.html',
    type: 'Project',
    coverImage: '/images/alwaysbeclosing.png',
    createdAt: '2025-06-15',
    tools: ['figma', 'html', 'unity', 'csharp'],
    detailComponent: 'documentation section in progress',
    githubUrl: 'https://github.com/banasse/ABCSALE',
    displayType: 'monitor'
  },
  {
    id: 'immersifyvr',
    title: 'ImmersifyVR',
    description: 'A virtual reality exercise application designed to motivate older adults to exercise.',
    tags: ['Virtual Reality'],
    href: 'https://www.immersifyvr.org/',
    type: 'Website',
    coverImage: '/images/immersifyvr.png',
    createdAt: '2024-10-24',
    tools: ['figma', 'unity', 'csharp'],
    detailComponent: 'documentation section in progress',
    githubUrl: 'https://github.com/JLee-003/ImmersifyVR',
    displayType: 'plain'
  },
  {
    id: 'cs42si',
    title: 'CS42SI Course',
    description: 'Original curriculum and website for CS42SI at Stanford, a course teaching Unity and game development.',
    tags: ['Website', 'Next.js'],
    href: 'https://web.stanford.edu/class/cs42si/',
    type: 'Website',
    coverImage: '/images/cs42si_fa2025.png',
    createdAt: '2025-09-03',
    tools: ['html', 'react'],
    displayType: 'monitor'
  },
  {
    id: 'serendipi-tea',
    title: 'Serendipi-Tea',
    description: 'A card game café cultivating connection among startup founders, prototyped for the StartX accelerator program.',
    tags: ['In-Person', 'Experience'],
    href: 'https://www.figma.com/design/it91COfADt2hqakFp3oiHu/Serendipi-tea-Print-and-Play?node-id=2284-2&t=yr4TKOw8Vh5lL8rz-1',
    type: 'Figma',
    coverImage: '/images/serendipitea.JPG',
    createdAt: '2025-04-10',
    tools: ['figma'],
    fadeOpacity: 0.7,
    detailComponent: 'documentation section in progress',
    displayType: 'plain'
  },
  {
    id: 'cs11si',
    title: 'CS11SI Course',
    description: 'Original curriculum and website for CS11SI at Stanford, a course teaching Unity\'s XR interaction toolkit.',
    tags: ['Website', 'Next.js'],
    type: 'Website',
    href: 'https://web.stanford.edu/class/cs11si/',
    coverImage: '/images/cs11si.png',
    createdAt: '2025-09-05',
    tools: ['html', 'react'],
    displayType: 'monitor'
  },
  {
    id: 'timesync',
    title: 'Timesync',
    description: 'A schedule-syncing app designed to help people easily coordinate their schedules with friends.',
    tags: ['App', 'Figma'],
    type: 'Figma',
    href: 'https://www.figma.com/design/Ng5ndVHBaIS4g86iEHsXzR/TimeSync-App?node-id=42-2988&t=WRYz7MBidzvsda76-1',
    coverImage: '/images/timesync.png',
    createdAt: '2025-04-10',
    tools: ['figma'],
    displayType: 'mobile'
  },
  {
    id: 'planet',
    title: 'Planet',
    description: 'A mental health mobile application designed to help people easily connect with pre-existing friends.',
    tags: ['App', 'React Native'],
    type: 'Website',
    href: 'https://hci.stanford.edu/courses/cs147/2024/au/projects/Technology-for-Mental-Health/Planet/',
    coverImage: '/images/planet.png',
    createdAt: '2024-12-09',
    tools: ['html', 'react', 'figma'],
    displayType: 'mobile'
  },
  {
    id: 'obscure-courses',
    title: 'Obscure Courses',
    description: 'A gamified website that allows users to guess the names of obscure courses at Stanford.',
    tags: ['Website', 'Svelte'],
    type: 'Website',
    href: 'https://obscure-courses.vercel.app/',
    coverImage: '/images/obscurecourses.png',
    createdAt: '2024-02-10',
    tools: ['html'],
    displayType: 'monitor'
  },
  {
    id: 'malaysian-club-chicago',
    title: 'Malaysian Club Website',
    description: 'A website for the Malaysian Club of Chicago, a club that promotes Malaysian culture and heritage.',
    tags: ['Website', 'HTML/CSS/JS'],
    type: 'Website',
    href: 'https://malaysianclubchicago.com/',
    coverImage: '/images/mcc-website.png',
    createdAt: '2021-01-07',
    fadeOpacity: 0.7,
    tools: ['html'],
    displayType: 'monitor'
  },
];