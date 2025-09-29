"use client";

import { useState, useEffect } from 'react';

// Featured games with their custom tags and descriptions in display order
const FEATURED_GAMES_CONFIG = [
  { 
    id: 3766251, 
    tags: ["Placed #722 (9605 entries)"], 
    description: "An arcade game made for the GMTK Jam 2025. Use new stylus technology to loop rats before they eat all of your cheese."
  },
  { 
    id: 2904867, 
    tags: ["Placed #4266 (7557 entries)"], 
    description: "An arcade game made for the GMTK Jam 2024. Cook food, serve customers, and manage a kitchen that gets larger every night."
  },
  { 
    id: 1940212, 
    tags: ["Placed #2 (25 entries)"], 
    description: "A top-down shooter game made for the Wonderjam 4. Destroy enemy ships, get XP, and unlock upgrades to prolong your run."
  },
  { 
    id: 2741477, 
    tags: [], 
    description: "A course project for CS247G: Design for Play where you play as a critter exploring a large, unfamiliar, damaged world."
  },
  { 
    id: 1865877, 
    tags: [], 
    description: "Named after our team's online initials, a card-battler RPG made for fun over 2 years! Build a deck of cards and fight enemies."
  },
  { 
    id: 1149440, 
    tags: [], 
    description: "An experimental 3D game made for fun! Inspired by Papers Please, screen potentially malicious boxes going through a warehouse."
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
