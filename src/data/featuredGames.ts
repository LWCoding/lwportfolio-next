import type { ReactNode } from 'react';

export interface FeaturedGameConfig {
  id: number;
  tags: string[];
  description: string;
  tools: ('unity' | 'csharp' | 'react' | 'figma' | 'python' | 'cplusplus' | 'nextjs' | 'html')[];
  // Optional GitHub repository link for this game
  githubUrl?: string;
  // Optional rich detail content rendered inside the detail side panel
  detailComponent?: ReactNode;
}

// Featured games with their custom tags and descriptions in display order
export const FEATURED_GAMES_CONFIG: FeaturedGameConfig[] = [
  { 
    id: 3766251, 
    tags: ["🏆 GMTK 2025: #722/9605"], 
    description: "An arcade game. Use new stylus technology to loop rats before they eat all of your cheese.",
    tools: ['unity', 'csharp'],
    detailComponent: 'documentation section in progress',
    githubUrl: 'https://github.com/LWCoding/aw-rats'
  },
  { 
    id: 2904867, 
    tags: ["🏆 GMTK 2024: #4266/7557"], 
    description: "An arcade game. Cook food, serve customers, and manage a kitchen that gets larger every night.",
    tools: ['unity', 'csharp'],
    detailComponent: 'documentation section in progress',
    githubUrl: 'https://github.com/LWCoding/kitchen-nightmare'
  },
  { 
    id: 1940212, 
    tags: ["🏆 Wonderjam 4: #2/25"], 
    description: "A top-down shooter game. Destroy enemy ships, get XP, and unlock upgrades.",
    tools: ['unity', 'csharp'],
    detailComponent: 'documentation section in progress',
    githubUrl: 'https://github.com/LWCoding/attack-on-atliz'
  },
  {
    id: 4028688,
    tags: [],
    description: "Play as a kangaroo rat in Southern California. Find food, avoid predators, and repopulate.",
    tools: ['unity', 'csharp'],
  },
  { 
    id: 2741477, 
    tags: [], 
    description: "Play as a critter and explore the mystery of a large, unfamiliar, damaged world.",
    tools: ['unity', 'csharp']
  },
  {
    id: 2393708,
    tags: ['Unity/C#'],
    description: "A course project for PHIL26Q. Explore Gibson's theory of affordances through puzzles.",
    tools: ['unity', 'csharp']
  },
  { 
    id: 1865877, 
    tags: [], 
    description: "A card-battler RPG named after our team's online initials! Build a deck and fight enemies.",
    tools: ['unity', 'csharp']
  },
  { 
    id: 1149440, 
    tags: [], 
    description: "An experimental 3D game. Inspired by Papers Please, screen malicious boxes in a warehouse.",
    tools: ['unity', 'csharp']
  },
  {
    id: 2193616,
    tags: [],
    description: "A multiplayer game. Play as a Pokémon and fight other players in a 2D arena.",
    tools: ['unity', 'csharp']
  }
];
