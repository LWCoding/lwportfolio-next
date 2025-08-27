"use client";

import { useState, useEffect } from 'react';

// Game categories with their symbols
export type GameCategory = 'fun' | 'work' | 'competition';

export const CATEGORY_CONFIG = {
  fun: { symbol: '🎮', label: 'For Fun' },
  work: { symbol: '💼', label: 'For School/Work' },
  competition: { symbol: '🏆', label: 'For Competition' }
} as const;

// Featured games with their custom tags, categories, and descriptions in display order
const FEATURED_GAMES_CONFIG = [
  { 
    id: 3766251, 
    tags: ["Unity", "GMTK 2025"], 
    category: 'competition' as GameCategory,
    description: "A creative puzzle game made for GMTK Game Jam 2025. Features innovative mechanics and engaging gameplay."
  },
  { 
    id: 2904867, 
    tags: ["Unity", "GMTK 2024"], 
    category: 'competition' as GameCategory,
    description: "My entry for GMTK Game Jam 2024, exploring unique game design concepts within the jam's theme."
  },
  { 
    id: 2741477, 
    tags: ["Unity", "CS247G"], 
    category: 'work' as GameCategory,
    description: "A course project for CS247G focusing on game design principles and user experience."
  },
  { 
    id: 1940212, 
    tags: ["Unity", "Wonderjam 3"], 
    category: 'competition' as GameCategory,
    description: "Created for Wonderjam 3, this game showcases creative problem-solving and artistic vision."
  },
  { 
    id: 1865877, 
    tags: ["Unity", "Passion Project"], 
    category: 'fun' as GameCategory,
    description: "A personal passion project where I experimented with new gameplay mechanics and visual styles."
  },
  { 
    id: 1149440, 
    tags: ["Unity", "3D Test"], 
    category: 'fun' as GameCategory,
    description: "An experimental 3D game used to test new development techniques and 3D gameplay concepts."
  }
];

// Other games to show in the horizontal gallery (just IDs, we'll use itch.io data)
const OTHER_GAMES_IDS: number[] = [
  // Add game IDs here for games you want to show in the scrolling gallery
  // These will use the original itch.io titles, descriptions, and images
  // If empty, will show all non-featured games (up to 8)
];

export interface GameData {
  id: number;
  title: string;
  url: string;
  short_text?: string;
  views_count?: number;
  cover_url?: string;
  still_cover_url?: string;
  tags?: string[];
  created_at?: string;
  category?: GameCategory;
  classification?: string;
}

interface GamesState {
  featuredGames: GameData[];
  otherGames: GameData[];
  loading: boolean;
  error?: string;
}

export function useGames() {
  const [gamesState, setGamesState] = useState<GamesState>({
    featuredGames: [],
    otherGames: [],
    loading: true,
    error: undefined,
  });

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        setGamesState(prev => ({ ...prev, loading: true }));

        const response = await fetch('/api/itch-games', {
          cache: 'no-store',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch games');
        }

        const data = await response.json();
        
        if (data.games && Array.isArray(data.games)) {
          // Process featured games with custom overrides
          const featuredGames = FEATURED_GAMES_CONFIG.map(config => {
            const game = data.games.find((g: GameData) => g.id === config.id);
            if (game) {
              game.tags = config.tags;  // Override the tags with our own, screw those :)
              game.category = config.category;
              game.short_text = config.description; // Override description too!
            }
            return game || null;
          }).filter((game): game is GameData => game !== null);

          // Get other games (excluding featured ones)
          const featuredIds = FEATURED_GAMES_CONFIG.map(config => config.id);
          const otherGames = data.games
            .filter((game: GameData) => !featuredIds.includes(game.id))
            .filter((game: GameData) => OTHER_GAMES_IDS.length === 0 || OTHER_GAMES_IDS.includes(game.id))
            .slice(0, 8); // Limit to 8 games for the horizontal gallery
          
          setGamesState(prev => ({
            ...prev,
            featuredGames,
            otherGames,
            loading: false,
            error: undefined,
          }));
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching games:', error);
        setGamesState(prev => ({
          ...prev,
          featuredGames: [],
          otherGames: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        }));
      }
    };

    fetchAllGames();
  }, []);

  return gamesState;
}
