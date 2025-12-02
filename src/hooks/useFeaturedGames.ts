"use client";

import { useState, useEffect, type ReactNode } from 'react';

export interface FeaturedGameConfig {
  id: number;
  tags: string[];
  description: string;
  platforms: ('windows' | 'apple' | 'html5' | 'linux')[];
  // Optional rich detail content rendered inside the detail side panel
  detailComponent?: ReactNode;
}

// Featured games with their custom tags and descriptions in display order
export const FEATURED_GAMES_CONFIG: FeaturedGameConfig[] = [
  { 
    id: 3766251, 
    tags: ["🏆 GMTK 2025: #722/9605", "Unity/C#"], 
    description: "an arcade game. use new stylus technology to loop rats before they eat all of your cheese.",
    platforms: ['windows', 'apple', 'linux', 'html5'],
    detailComponent: 'documentation section in progress'
  },
  { 
    id: 2904867, 
    tags: ["🏆 GMTK 2024: #4266/7557", "Unity/C#"], 
    description: "an arcade game. cook food, serve customers, and manage a kitchen that gets larger every night.",
    platforms: ['windows', 'apple', 'linux', 'html5'],
    detailComponent: 'documentation section in progress'
  },
  { 
    id: 1940212, 
    tags: ["🏆 Wonderjam 4: #2/25", "Unity/C#"], 
    description: "a top-down shooter game. destroy enemy ships, get XP, and unlock upgrades.",
    platforms: ['windows', 'html5'],
    detailComponent: 'documentation section in progress'
  },
  {
    id: 4028688,
    tags: ["Unity/C#"],
    description: "play as a kangaroo rat in southern california. find food, avoid predators, and repopulate.",
    platforms: ['html5'],
  },
  { 
    id: 2741477, 
    tags: ["Unity/C#"], 
    description: "play as a critter and explore the mystery of a large, unfamiliar, damaged world.",
    platforms: ['windows', 'html5']
  },
  {
    id: 2393708,
    tags: ['Unity/C#'],
    description: "a course project for PHIL26Q. explore gibson's theory of affordances through puzzles.",
    platforms: ['windows', 'html5']
  },
  { 
    id: 1865877, 
    tags: ["Unity/C#"], 
    description: "a card-battler RPG named after our team's online initials! build a deck and fight enemies.",
    platforms: ['windows', 'apple', 'linux', 'html5']
  },
  { 
    id: 1149440, 
    tags: ["Unity/C#"], 
    description: "an experimental 3D game. inspired by papers please, screen malicious boxes in a warehouse.",
    platforms: ['windows', 'html5']
  },
  {
    id: 2193616,
    tags: ["Unity/C#"],
    description: "a multiplayer game. play as a pokémon and fight other players in a 2D arena.",
    platforms: ['html5']
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

const CACHE_KEY = 'itch-games-cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface CachedData {
  data: { games: GameData[] };
  timestamp: number;
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
        let hasValidCache = false;
        
        // Check localStorage cache first (only available in browser)
        try {
          if (typeof window === 'undefined' || !window.localStorage) {
            throw new Error('localStorage not available');
          }
          
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const cachedData: CachedData = JSON.parse(cached);
            const now = Date.now();
            
            // Use cached data if it's less than 1 hour old
            if (now - cachedData.timestamp < CACHE_DURATION) {
              const data = cachedData.data;
              
              if (data.games && Array.isArray(data.games)) {
                // Process featured games with custom overrides
                const featuredGames = FEATURED_GAMES_CONFIG.map(config => {
                  const game = data.games.find((g: GameData) => g.id === config.id);
                  if (game) {
                    game.tags = config.tags;
                    game.short_text = config.description;
                    game.platforms = config.platforms;
                  }
                  return game || null;
                }).filter((game): game is GameData => game !== null);

                // Get other games (excluding featured ones)
                const featuredIds = FEATURED_GAMES_CONFIG.map(config => config.id);
                const otherGames = data.games
                  .filter((game: GameData) => !featuredIds.includes(game.id))
                  .filter((game: GameData) => OTHER_GAMES_IDS.length === 0 || OTHER_GAMES_IDS.includes(game.id))
                  .slice(0, 8);
                
                setGamesState({
                  featuredGames,
                  otherGames,
                  loading: false,
                  error: undefined,
                });
                
                hasValidCache = true;
                // Still fetch fresh data in the background to update cache
                // but don't show loading state
              }
            }
          }
        } catch (e) {
          // Invalid cache, continue to fetch
          console.warn('Failed to parse cached games data:', e);
        }

        // Only show loading if we don't have valid cache
        if (!hasValidCache) {
          setGamesState(prev => ({ ...prev, loading: true }));
        }

        const response = await fetch('/api/itch-games');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch games');
        }

        const data = await response.json();
        
        if (data.games && Array.isArray(data.games)) {
          // Cache the raw data (only in browser)
          if (typeof window !== 'undefined' && window.localStorage) {
            try {
              const cacheData: CachedData = {
                data: data,
                timestamp: Date.now(),
              };
              localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
            } catch (e) {
              // localStorage might be full or unavailable, continue anyway
              console.warn('Failed to cache games data:', e);
            }
          }
          
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
