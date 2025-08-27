"use client";

import { useState, useEffect } from 'react';

// Featured game IDs in the order they should appear
const FEATURED_GAME_IDS = [
  3766251,
  1940212,
  1149440,
  2741477,
  1865877,
  2904867,
];

interface GameData {
  id: number;
  title: string;
  views_count?: number;
  downloads_count?: number;
  url: string;
  short_text?: string;
  type?: string;
  classification?: string;
  cover_url?: string;
  still_cover_url?: string;
  tags?: string[];
}

interface FeaturedGamesState {
  games: GameData[];
  loading: boolean;
  error?: string;
}

export function useFeaturedGames() {
  const [gamesState, setGamesState] = useState<FeaturedGamesState>({
    games: [],
    loading: true,
    error: undefined,
  });

  useEffect(() => {
    const fetchFeaturedGames = async () => {
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
          // Filter to only include featured games and maintain the specified order
          const featuredGames = FEATURED_GAME_IDS.map(gameId => {
            const game = data.games.find((g: GameData) => g.id === gameId);
            return game || null;
          }).filter((game): game is GameData => game !== null);
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`🎮 Loaded ${featuredGames.length} featured games`);
          }
          
          setGamesState(prev => ({
            ...prev,
            games: featuredGames,
            loading: false,
            error: undefined,
          }));
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching featured games:', error);
        setGamesState(prev => ({
          ...prev,
          games: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        }));
      }
    };

    fetchFeaturedGames();
  }, []);

  return gamesState;
}
