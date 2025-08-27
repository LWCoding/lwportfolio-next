"use client";

import { useState, useEffect } from 'react';

// Featured games with their custom tags and descriptions in display order
const FEATURED_GAMES_CONFIG = [
  { 
    id: 3766251, 
    tags: ["Unity", "GMTK 2025"], 
    description: "A creative puzzle game made for GMTK Game Jam 2025. Features innovative mechanics and engaging gameplay."
  },
  { 
    id: 2904867, 
    tags: ["Unity", "GMTK 2024"], 
    description: "My entry for GMTK Game Jam 2024, exploring unique game design concepts within the jam's theme."
  },
  { 
    id: 2741477, 
    tags: ["Unity", "CS247G"], 
    description: "A course project for CS247G focusing on game design principles and user experience."
  },
  { 
    id: 1940212, 
    tags: ["Unity", "Wonderjam 3"], 
    description: "Created for Wonderjam 3, this game showcases creative problem-solving and artistic vision."
  },
  { 
    id: 1865877, 
    tags: ["Unity", "Passion Project"], 
    description: "A personal passion project where I experimented with new gameplay mechanics and visual styles."
  },
  { 
    id: 1149440, 
    tags: ["Unity", "3D Test"], 
    description: "An experimental 3D game used to test new development techniques and 3D gameplay concepts."
  }
];

// Other games to show in the horizontal gallery (just IDs, we'll use itch.io data)
const OTHER_GAMES_IDS: number[] = [
  2027811, 1659614, 2835382, 1089240, 2607625, 2193616
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
