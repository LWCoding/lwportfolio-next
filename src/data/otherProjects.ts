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
}

// Configure your other projects here
export const OTHER_PROJECTS_CONFIG: OtherProject[] = [
  {
    id: 'serendipi-tea',
    title: 'Serendipi-Tea',
    description: 'A card game and pop-up cafe connecting startup founders together, officially prototyped and tested at the StartX accelerator program.',
    tags: ['In-Person', 'Experience', 'Figma'],
    href: 'https://www.figma.com/design/it91COfADt2hqakFp3oiHu/Serendipi-tea-Print-and-Play?node-id=2284-2&t=yr4TKOw8Vh5lL8rz-1',
    coverImage: '/images/serendipitea.JPG',
    createdAt: '2025-04-10',
    platforms: ['figma'],
    fadeOpacity: 0.7
  },
  {
    id: 'always-be-closing',
    title: 'Always Be Closing',
    description: 'A simulation of customer management software designed to train salespeople to be more effective in their sales calls. Being used to teach STRAMGT351 at Stanford.',
    tags: ['Simulation', 'Unity/C#'],
    href: 'https://sale-prod.s3.amazonaws.com/Build_Prod/index.html',
    coverImage: '/images/alwaysbeclosing.png',
    createdAt: '2025-06-15',
    platforms: ['html5']
  },
  {
    id: 'immersifyvr',
    title: 'ImmersifyVR App',
    description: 'A VR exercise application designed to motivate older adults to exercise. Includes activities across a range of exercise intensities, as recommended by the World Health Organization.',
    tags: ['App', 'Virtual Reality', 'Unity/C#'],
    href: 'https://www.immersifyvr.org/',
    coverImage: '/images/immersifyvr.png',
    createdAt: '2024-10-24',
    platforms: ['html5']
  },
  {
    id: 'timesync',
    title: 'Timesync',
    description: 'A schedule-syncing app designed to help people easily coordinate their schedules with friends and family.',
    tags: ['App', 'Figma'],
    href: 'https://www.figma.com/design/Ng5ndVHBaIS4g86iEHsXzR/TimeSync-App?node-id=42-2988&t=WRYz7MBidzvsda76-1',
    coverImage: '/images/timesync.png',
    createdAt: '2025-04-10',
    platforms: ['figma']
  },
  {
    id: 'cs11si',
    title: 'CS11SI Website',
    description: 'Course website for CS11SI at Stanford University, a course teaching Unity\'s XR Interaction Toolkit.',
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