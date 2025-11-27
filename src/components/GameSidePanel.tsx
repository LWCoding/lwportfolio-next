"use client";

import Image from 'next/image';
import Link from 'next/link';
import { GameData } from '@/hooks/useFeaturedGames';
import { FEATURED_GAMES_CONFIG } from '@/hooks/useFeaturedGames';
import { OtherProject } from '@/data/otherProjects';
import { useEffect } from 'react';

type PanelItem = GameData | OtherProject;

interface GameSidePanelProps {
  item: PanelItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GameSidePanel({ item, isOpen, onClose }: GameSidePanelProps) {
  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Don't render if no item is selected and panel is not open (allows animation to complete)
  if (!item && !isOpen) return null;
  
  // If item is null but panel is still animating, show empty panel
  if (!item) {
    return (
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={onClose}
          aria-hidden="true"
        />
        {/* Wrapper container for panel and arrow - moves together */}
        <div
          className={`fixed right-0 top-0 h-full z-[70] transition-transform duration-200 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close Arrow Tab - positioned outside panel on desktop */}
          <button
            onClick={onClose}
            className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-full bg-white border-2 border-r-0 border-gray-300 rounded-l-lg px-3 py-8 hover:bg-gray-50 transition-opacity duration-300 cursor-pointer shadow-lg hidden md:block"
            style={{
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? 'auto' : 'none',
            }}
            aria-label="Close panel"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {/* Side Panel - empty during close animation */}
          <div className="h-full w-full md:w-[500px] lg:w-[600px] bg-white shadow-2xl" />
        </div>
      </>
    );
  }

  // Check if it's a game or project
  const isGame = 'id' in item && typeof item.id === 'number';
  const game = isGame ? item as GameData : null;
  const project = !isGame ? item as OtherProject : null;
  
  const gameConfig = game ? FEATURED_GAMES_CONFIG.find(c => c.id === game.id) : null;

  const formatCreatedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric' 
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
    <>
      {/* Backdrop - darkens the webpage */}
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

        {/* Wrapper container for panel and arrow - moves together */}
        <div
          className={`fixed right-0 top-0 h-full z-[70] transition-transform duration-200 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close Arrow Tab - positioned outside panel on desktop */}
          <button
            onClick={onClose}
            className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-full bg-white border-2 border-r-0 border-gray-300 rounded-l-lg px-3 py-8 hover:bg-gray-50 transition-opacity duration-200 cursor-pointer shadow-lg hidden md:block"
          style={{
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
          }}
          aria-label="Close panel"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Side Panel */}
        <div
          className="h-full w-full md:w-[500px] lg:w-[600px] bg-white shadow-2xl"
          style={{
            overflowY: 'auto',
          }}
        >
        {/* Close Button for Mobile - inside panel */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden bg-white/90 backdrop-blur-sm border-2 border-gray-300 rounded-full p-2 hover:bg-white transition-colors cursor-pointer z-10 shadow-lg"
          aria-label="Close panel"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="h-full flex flex-col">
          {/* Hero Section with Cover Image */}
          <div className="relative w-full" style={{ height: '40vh', minHeight: '300px' }}>
            {(game?.still_cover_url || game?.cover_url || project?.coverImage) ? (
              <Image
                src={game?.still_cover_url || game?.cover_url || project?.coverImage || ''}
                alt={game?.title || project?.title || ''}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
            )}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-end">
              <div className="w-full px-6 pb-6 z-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
                  {game?.title || project?.title}
                </h1>
                {(game?.created_at || project?.createdAt) && (
                  <p className="text-base text-white/90 drop-shadow-md">
                    Published {formatCreatedDate(game?.created_at || project?.createdAt || '')}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 bg-white px-6 py-8">
            {/* Tags */}
            {((game?.tags || project?.tags) && (game?.tags || project?.tags || []).length > 0) || (game?.created_at || project?.createdAt) ? (
              <div className="flex flex-wrap gap-2 mb-6">
                {(game?.tags || project?.tags || []).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium text-black"
                  >
                    {tag}
                  </span>
                ))}
                {(game?.created_at || project?.createdAt) && (
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-sm font-medium text-black">
                    {new Date(game?.created_at || project?.createdAt || '').getFullYear()}
                  </span>
                )}
              </div>
            ) : null}

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              {game?.views_count && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 mr-2">Views:</span>
                  <div className="text-2xl font-bold text-yellow-600">
                    {formatNumber(game.views_count)}
                  </div>
                </div>
              )}
              {(game?.platforms || project?.platforms) && (game?.platforms || project?.platforms || []).length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 mr-2">Platforms:</span>
                  <div className="flex items-center gap-2">
                    {(game?.platforms || project?.platforms || []).includes('windows') && (
                      <Image 
                        src="/images/windows.png" 
                        alt="Windows" 
                        width={24} 
                        height={24} 
                        className="opacity-80"
                      />
                    )}
                    {(game?.platforms || project?.platforms || []).includes('apple') && (
                      <Image 
                        src="/images/apple.png" 
                        alt="Apple" 
                        width={24} 
                        height={24} 
                        className="opacity-80"
                      />
                    )}
                    {(game?.platforms || project?.platforms || []).includes('html5') && (
                      <Image 
                        src="/images/html5.png" 
                        alt="HTML5" 
                        width={24} 
                        height={24} 
                        className="opacity-80"
                      />
                    )}
                    {(game?.platforms || project?.platforms || []).includes('linux') && (
                      <Image 
                        src="/images/linux.png" 
                        alt="Linux" 
                        width={24} 
                        height={24} 
                        className="opacity-80"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">About</h2>
              <p className="text-base md:text-lg text-black leading-relaxed">
                {game?.short_text || gameConfig?.description || project?.description || "An exciting experience awaits!"}
              </p>
            </div>

            {/* Play/View Button */}
            <div className="mt-8">
              <Link
                href={game?.url || project?.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
              >
                {game ? (
                  <>
                    <svg 
                      className="w-6 h-6" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>Play on Itch.io</span>
                  </>
                ) : (
                  <>
                    <svg 
                      className="w-6 h-6" 
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>View Project</span>
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

