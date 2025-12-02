"use client";

import Image from 'next/image';
import Link from 'next/link';
import { GameData, FEATURED_GAMES_CONFIG } from '@/hooks/useFeaturedGames';
import { OtherProject } from '@/data/otherProjects';
import { useEffect } from 'react';

type PanelItem = GameData | OtherProject;

interface DetailSidePanelProps {
  item: PanelItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailSidePanel({ item, isOpen, onClose }: DetailSidePanelProps) {
  // Prevent body scroll when panel is open and compensate for scrollbar width
  useEffect(() => {
    if (isOpen) {
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Add padding to compensate for scrollbar width to prevent layout shift
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Restore body scroll and remove padding
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      // Cleanup: restore body scroll and remove padding
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
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
          className={`fixed inset-0 h-full z-[70] transition-transform duration-200 ease-out ${
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
          <div className="h-full w-screen bg-white shadow-2xl" />
        </div>
      </>
    );
  }

  // Check if it's a game or project
  const isGame = 'id' in item && typeof item.id === 'number';
  const game = isGame ? (item as GameData) : null;
  const project = !isGame ? (item as OtherProject) : null;

  const gameConfig = game ? FEATURED_GAMES_CONFIG.find((c) => c.id === game.id) : null;
  const tags = game?.tags || project?.tags || [];

  const formatCreatedDate = (dateString: string) => {
    const date = new Date(dateString);
    // Match featured cards: short month + year, but keep lowercase for site theming
    return date
      .toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
      .toLowerCase();
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
        className={`fixed inset-0 h-full z-[70] transition-transform duration-200 ease-out ${
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
          className="h-full w-screen bg-white shadow-2xl"
          style={{
            overflowY: 'auto',
          }}
        >
          {/* Content */}
          <div className="h-full flex flex-col">
            {/* Hero Section with Cover Image */}
            <div className="relative w-full" style={{ height: '30vh', minHeight: '220px' }}>
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
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 flex items-end">
                <div className="w-full px-6 pb-6 z-10">
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                      {game?.title || project?.title}
                    </h1>
                    {(game?.platforms || project?.platforms) &&
                      (game?.platforms || project?.platforms || []).length > 0 && (
                        <div className="flex items-center gap-1.5">
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
                          {(game?.platforms || project?.platforms || []).includes('figma') && (
                            <Image
                              src="/images/figma.png"
                              alt="Figma"
                              width={24}
                              height={24}
                              className="opacity-80"
                            />
                          )}
                        </div>
                      )}
                  </div>
                  {(game?.created_at || project?.createdAt || game?.views_count || tags.length > 0) && (
                    <div className="mt-1 flex flex-wrap gap-2 items-center text-sm text-white/90 drop-shadow-md">
                      {/* Date */}
                      {(game?.created_at || project?.createdAt) && (
                        <span>
                          published {formatCreatedDate(game?.created_at || project?.createdAt || '')}
                        </span>
                      )}

                      {/* Divider between date and views */}
                      {(game?.created_at || project?.createdAt) && game?.views_count && (
                        <span className="text-white/60">|</span>
                      )}

                      {/* Views with dotted underline and tooltip */}
                      {game?.views_count && (
                        <span className="relative group cursor-help">
                          <span className="underline underline-offset-2 decoration-dotted">
                            {formatNumber(game.views_count)} views
                          </span>
                          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 rounded bg-black/85 text-[0.7rem] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30">
                            view count is live-loaded from itch.io
                          </span>
                        </span>
                      )}

                      {/* Divider between views and tags */}
                      {game?.views_count && tags.length > 0 && (
                        <span className="text-white/60">|</span>
                      )}

                      {/* Tags */}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[0.7rem] md:text-xs font-medium text-black"
                            >
                              {tag.toLowerCase()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Play/View Button - absolute on larger screens only */}
              <div className="hidden md:block md:absolute md:bottom-4 md:right-4 z-20">
                <Link
                  href={game?.url || project?.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm md:text-base rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg cursor-pointer"
                >
                  {game ? (
                    <>
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>play on itch.io</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>view project</span>
                    </>
                  )}
                </Link>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 bg-white px-6 py-8 pb-24">
              {/* Description */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-base md:text-lg text-black leading-relaxed">
                  {game?.short_text ||
                    gameConfig?.description ||
                    project?.description ||
                    'an exciting experience awaits!'}
                </p>
              </div>

              {/* Optional rich detail content for games/projects */}
              {(gameConfig?.detailComponent || project?.detailComponent) && (
                <div className="mt-10 pt-8 border-t border-gray-200 text-base md:text-lg text-black leading-relaxed space-y-4">
                  {typeof (gameConfig?.detailComponent || project?.detailComponent) === 'string' ? (
                    <em>{gameConfig?.detailComponent || project?.detailComponent}</em>
                  ) : (
                    gameConfig?.detailComponent || project?.detailComponent
                  )}
                </div>
              )}
            </div>

            {/* Mobile action + close stack */}
            <div className="fixed bottom-0 left-0 right-0 w-full md:hidden">
              <Link
                href={game?.url || project?.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-4 bg-green-500 hover:bg-green-600 text-white text-base font-semibold tracking-wide shadow-[0_-2px_8px_rgba(0,0,0,0.25)] cursor-pointer"
              >
                {game ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>play on itch.io</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>view project</span>
                  </>
                )}
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-4 bg-gray-900 text-white text-base font-semibold tracking-wide flex items-center justify-center gap-2 shadow-[0_-4px_12px_rgba(0,0,0,0.25)] cursor-pointer"
                aria-label="close panel"
              >
                <span>close</span>
              </button>
            </div>

            {/* Large Bottom Close Bar (desktop) */}
            <button
              type="button"
              onClick={onClose}
              className="hidden md:flex fixed bottom-0 left-0 right-0 w-full py-5 bg-gray-900 text-white text-base md:text-lg font-semibold tracking-wide items-center justify-center gap-2 shadow-[0_-4px_12px_rgba(0,0,0,0.25)] cursor-pointer"
              aria-label="close panel"
            >
              <span>close</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


