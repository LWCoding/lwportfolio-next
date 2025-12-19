"use client";

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FEATURED_GAMES_CONFIG, GameData } from '@/hooks/useFeaturedGames';
import { notFound } from 'next/navigation';

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [game, setGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const gameId = parseInt(id);
  const gameConfig = FEATURED_GAMES_CONFIG.find((c) => c.id === gameId);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch('/api/itch-games');
        if (!response.ok) {
          throw new Error('Failed to fetch game');
        }
        const data = await response.json();
        const foundGame = data.games.find((g: GameData) => g.id === gameId);
        
        if (foundGame && gameConfig) {
          // Apply config overrides
          foundGame.tags = gameConfig.tags;
          foundGame.short_text = gameConfig.description;
          foundGame.tools = gameConfig.tools;
          foundGame.githubUrl = gameConfig.githubUrl;
          setGame(foundGame);
        } else if (foundGame) {
          setGame(foundGame);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game:', error);
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId, gameConfig]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-[56px]">
        <Navigation />
        <div className="text-center">
          <p className="text-black text-lg">Loading game...</p>
        </div>
      </div>
    );
  }

  if (!game) {
    notFound();
  }

  const formatCreatedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pt-[56px]">
      <Navigation />

      {/* Hero Section with Cover Image */}
      <div className="relative w-full" style={{ height: '30vh', minHeight: '220px' }}>
        {(game.still_cover_url || game.cover_url) ? (
          <Image
            src={game.still_cover_url || game.cover_url || ''}
            alt={game.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
        )}
        <div className="absolute inset-0 bg-black/75" />
        
        {/* Back Button */}
        <Link
          href="/projects"
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-all duration-200 cursor-pointer shadow-lg"
          aria-label="Back to projects"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 pb-6 z-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 flex-wrap mb-3">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                {game.title}
              </h1>
              {game.tools && game.tools.length > 0 && (
                <div className="flex items-center gap-2">
                  {game.tools.includes('unity') && (
                    <div className="group relative">
                      <Image
                        src="/images/unity-logo.png"
                        alt="Unity"
                        width={28}
                        height={28}
                        className="drop-shadow-lg brightness-0 invert"
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg">
                        Unity
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                      </div>
                    </div>
                  )}
                  {game.tools.includes('csharp') && (
                    <div className="group relative">
                      <Image
                        src="/images/csharp-logo.png"
                        alt="C#"
                        width={28}
                        height={28}
                        className="drop-shadow-lg"
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg">
                        C#
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                      </div>
                    </div>
                  )}
                  {game.tools.includes('react') && (
                    <div className="group relative">
                      <Image
                        src="/images/react-logo.png"
                        alt="React"
                        width={28}
                        height={28}
                        className="drop-shadow-lg"
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg">
                        React
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {(game.created_at || game.views_count || (game.tags && game.tags.length > 0)) && (
              <div className="mt-1 flex flex-wrap gap-2 items-center text-sm text-white/90 drop-shadow-md">
                {game.created_at && (
                  <span>Published {formatCreatedDate(game.created_at)}</span>
                )}
                {game.created_at && game.views_count && (
                  <span className="text-white/60">|</span>
                )}
                {game.created_at && !game.views_count && game.tags && game.tags.length > 0 && (
                  <span className="text-white/60">|</span>
                )}
                {game.views_count && (
                  <span className="relative group cursor-help">
                    <span className="underline underline-offset-2 decoration-dotted">
                      {formatNumber(game.views_count)} views
                    </span>
                    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 rounded bg-black/85 text-[0.7rem] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30">
                      View count is live-loaded from itch.io
                    </span>
                  </span>
                )}
                {game.views_count && game.tags && game.tags.length > 0 && (
                  <span className="text-white/60">|</span>
                )}
                {game.tags && game.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[0.7rem] md:text-xs font-medium text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* GitHub Button - visible on mobile */}
        {(game.githubUrl || gameConfig?.githubUrl) && (
          <div className="md:hidden absolute bottom-4 right-4 z-20">
            <a
              href={game.githubUrl || gameConfig?.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
              aria-label="View source on GitHub"
            >
              <Image
                src="/images/github.png"
                alt="GitHub"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
            </a>
          </div>
        )}

        {/* Action Buttons - desktop */}
        <div className="hidden md:block absolute inset-x-0 bottom-4 z-20">
          <div className="max-w-4xl mx-auto px-6 flex justify-end">
            <div className="flex items-center gap-3">
              {(game.githubUrl || gameConfig?.githubUrl) && (
                <a
                  href={game.githubUrl || gameConfig?.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  aria-label="View source on GitHub"
                >
                  <Image
                    src="/images/github.png"
                    alt="GitHub"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                </a>
              )}
              <Link
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Play on itch.io</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-white px-6 py-8 pb-24 max-w-4xl mx-auto w-full">
        {/* Description */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-base md:text-lg text-black leading-relaxed">
            {game.short_text || gameConfig?.description || 'An exciting game experience awaits!'}
          </p>
        </div>

        {/* Optional rich detail content */}
        {gameConfig?.detailComponent && (
          <div className="mt-10 pt-8 border-t border-gray-200 text-base md:text-lg text-black leading-relaxed space-y-4">
            {typeof gameConfig.detailComponent === 'string' ? (
              <em>{gameConfig.detailComponent}</em>
            ) : (
              gameConfig.detailComponent
            )}
          </div>
        )}
      </div>

      {/* Mobile action button */}
      <div className="fixed bottom-0 left-0 right-0 w-full md:hidden">
        <Link
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-4 bg-green-600 hover:bg-green-600 text-white text-base font-semibold tracking-wide shadow-[0_-2px_8px_rgba(0,0,0,0.25)] cursor-pointer"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>Play on itch.io</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
