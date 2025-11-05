"use client";

import { useState, useEffect } from 'react';

// Featured games with their custom tags and descriptions in display order
const FEATURED_GAMES_CONFIG = [
  { 
    id: 3766251, 
    tags: ["🏆 GMTK 2025: #722/9605", "Unity/C#"], 
    description: "An arcade game. Use new stylus technology to loop rats before they eat all of your cheese.",
    platforms: ['windows', 'apple', 'linux', 'html5'] as ('windows' | 'apple' | 'html5' | 'linux')[]
  },
  { 
    id: 2904867, 
    tags: ["🏆 GMTK 2024: #4266/7557", "Unity/C#"], 
    description: "An arcade game. Cook food, serve customers, and manage a kitchen that gets larger every night.",
    platforms: ['windows', 'apple', 'linux', 'html5'] as ('windows' | 'apple' | 'html5' | 'linux')[]
  },
  { 
    id: 1940212, 
    tags: ["🏆 Wonderjam 4: #2/25 entries", "Unity/C#"], 
    description: "A top-down shooter game. Destroy enemy ships, get XP, and unlock upgrades to prolong your run.",
    platforms: ['windows', 'html5'] as ('windows' | 'apple' | 'html5' | 'linux')[]
  },
  { 
    id: 2741477, 
    tags: ["Unity/C#"], 
    description: "A course project for CS247G: Design for Play where you play as a critter exploring a large, unfamiliar, damaged world.",
    platforms: ['windows', 'html5'] as ('windows' | 'apple' | 'html5' | 'linux')[]
  },
  { 
    id: 1865877, 
    tags: ["Unity/C#"], 
    description: "Named after our team's online initials, a card-battler RPG made for fun over 2 years! Build a deck of cards and fight enemies.",
    platforms: ['windows', 'apple', 'linux', 'html5'] as ('windows' | 'apple' | 'html5' | 'linux')[]
  },
  { 
    id: 1149440, 
    tags: ["Unity/C#"], 
    description: "An experimental 3D game made for fun! Inspired by Papers Please, screen potentially malicious boxes going through a warehouse.",
    platforms: ['windows', 'html5'] as ('windows' | 'apple' | 'html5' | 'linux')[]
  }
];

// Other games to show in the horizontal gallery (just IDs, we'll use itch.io data)
const OTHER_GAMES_IDS: number[] = [
  2027811, 1659614, 2835382, 1089240, 2607625, 2393708, 2193616
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
  platforms?: ('windows' | 'apple' | 'html5' | 'linux')[];
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
              game.platforms = config.platforms; // Add platforms from config
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
