"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Button from "@/components/Button";
import NewspaperGameCard from "@/components/NewspaperGameCard";
import GameSidePanel from "@/components/GameSidePanel";
import VideoBanner from "@/components/VideoBanner";
import { useGames, FEATURED_GAMES_CONFIG, GameData } from "@/hooks/useFeaturedGames";
import { useState } from "react";
import { calculateNewspaperGridProps } from "@/utils/newspaperGrid";
import Image from "next/image";

export default function Games() {
  const { featuredGames, loading, error } = useGames();
  const [selectedItem, setSelectedItem] = useState<GameData | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // Simple gradient classes for variety
  const gradientClasses = [
    "from-red-500/20 to-orange-500/20",
    "from-blue-500/20 to-purple-500/20", 
    "from-green-500/20 to-teal-500/20",
    "from-purple-500/20 to-pink-500/20",
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col pt-[56px]">
      <Navigation />

      {/* Hero Video Banner */}
      <VideoBanner title="games" subtitle="take a break, play a game" />

      {/* Games Gallery */}
      <Section separator={false} container={false} padding={false} className="px-0">
        <div className="bg-yellow-600 flex">
          {/* Yellow Strip with GAMES */}
          <div className="bg-yellow-400 flex items-center justify-center w-12 md:w-16 flex-shrink-0">
            <div className="text-black font-bold text-lg md:text-xl whitespace-nowrap" style={{ transform: 'rotate(-90deg)' }}>
              GAMES
            </div>
          </div>
          
          <div className="flex-1">
            <div className="py-12 md:py-16 pb-6 md:pb-8">
              {/* Loading State */}
              {loading ? (
                <div className="container mx-auto max-w-7xl px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-0">
                    {[...Array(FEATURED_GAMES_CONFIG.length)].map((_: unknown, i: number) => {
                      const gridProps = calculateNewspaperGridProps(i, FEATURED_GAMES_CONFIG.length);
                      return (
                        <div key={i} className={`${gridProps.columnSpan} p-2 md:p-3`} style={{ aspectRatio: '3/2' }}>
                          <div 
                            className="relative h-full w-full overflow-hidden animate-pulse"
                            style={{ 
                              borderRadius: '1rem'
                            }}
                          >
                            <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '1rem' }}>
                              <div className={`w-full h-full bg-gradient-to-br ${gradientClasses[i % gradientClasses.length]}`}></div>
                            </div>
                            <div className="absolute inset-0 bg-black/10 z-[1]"></div>
                            <div className="absolute left-0 bottom-0 right-0 px-4 md:px-6 lg:px-8 pb-3 z-10">
                              <div className="h-6 md:h-8 lg:h-10 bg-white/30 rounded w-3/4 mb-2"></div>
                              <div className="h-4 bg-white/20 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-gray-300 mb-4">
                    Oops! Couldn&apos;t load games from Itch.io right now.
                  </p>
                  <p className="text-sm text-gray-300">
                    Error: {error}
                  </p>
                  <Button 
                    href="https://lwcoding.itch.io/" 
                    variant="outline" 
                    className="mt-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Itch.io →
                  </Button>
                </div>
              ) : featuredGames.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-300 mb-4">
                    No games found in your Itch.io account.
                  </p>
                  <Button 
                    href="https://lwcoding.itch.io/" 
                    variant="outline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Itch.io →
                  </Button>
                </div>
              ) : (
                <>
                  {/* Newspaper-style Games Layout */}
                  <div className="container mx-auto max-w-7xl px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-0">
                      {featuredGames.map((game, index) => {
                        const gridProps = calculateNewspaperGridProps(index, featuredGames.length);
                        const size: 'large' | 'medium' | 'small' = 'medium';
                        const isFirstCard = index === 0;
                        
                        return (
                          <div 
                            key={game.id} 
                            className={`${gridProps.columnSpan} p-2 md:p-3 ${isFirstCard ? 'relative' : ''}`} 
                            style={{ aspectRatio: '3/2' }}
                          >
                            {/* Development Process Callout - Positioned above first card */}
                            {isFirstCard && (
                              <div className="absolute -top-10 md:-top-12 left-6 lg:left-1/2 lg:-translate-x-1/2 z-10 pointer-events-none" style={{ maxWidth: 'calc(100vw - 4rem)', minWidth: 'max-content' }}>
                                <div className="flex items-center gap-3 md:gap-4">
                                  {/* Curved Arrow pointing down to first card */}
                                  <Image 
                                    src="/images/curvedarrow.png"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 mt-8"
                                  />
                                  {/* Text */}
                                  <p className="text-white text-sm md:text-base font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] whitespace-nowrap">
                                    click to view more info!
                                  </p>
                                </div>
                              </div>
                            )}
                            <NewspaperGameCard
                              title={game.title}
                              description={game.short_text || "An exciting game experience awaits!"}
                              tags={game.tags || []}
                              href={game.url}
                              infoUrl={`/games/${game.id}`}
                              gradientClasses={gradientClasses[index % gradientClasses.length]}
                              displayText="Game"
                              coverImage={game.still_cover_url || game.cover_url}
                              viewCount={game.views_count}
                              createdAt={game.created_at}
                              variant={gridProps.variant}
                              size={size}
                              isLastInRow={gridProps.isLastInRow}
                              isLastRow={gridProps.isLastRow}
                              platforms={game.platforms}
                              onClick={() => {
                                // First set the game, then trigger the open animation
                                setSelectedItem(game);
                                setIsSidePanelOpen(false);
                                // Use requestAnimationFrame to ensure the panel renders in closed state first
                                requestAnimationFrame(() => {
                                  requestAnimationFrame(() => {
                                    setIsSidePanelOpen(true);
                                  });
                                });
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-6 px-4 border-t border-black/20 bg-yellow-400 mt-auto scroll-mt-[64px]">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-black font-bold">
            lucas wang © {new Date().getFullYear()}
          </p>
          <p className="text-sm text-black font-bold mt-1">
            <a 
              href="mailto:lswang05@stanford.edu"
              className="hover:text-gray-800 transition-colors"
            >
              lswang05@stanford.edu
            </a>
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <a 
              href="https://www.linkedin.com/in/lucas-wang-3160b720a/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Visit my LinkedIn profile"
            >
              <Image 
                src="/images/linkedin.png" 
                alt="LinkedIn" 
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </a>
            <a 
              href="https://github.com/LWCoding"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Visit my GitHub profile"
            >
              <Image 
                src="/images/github.png" 
                alt="GitHub" 
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </a>
            <a 
              href="https://lwcoding.itch.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Visit my Itch.io profile"
            >
              <Image 
                src="/images/itchio.png" 
                alt="Itch.io" 
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </a>
            <a 
              href="https://scratch.mit.edu/users/LWCoding/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Visit my Scratch profile"
            >
              <Image 
                src="/images/scratch.svg" 
                alt="Scratch" 
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </a>
          </div>
        </div>
      </footer>

      {/* Game/Project Side Panel */}
      <GameSidePanel
        item={selectedItem}
        isOpen={isSidePanelOpen}
        onClose={() => {
          setIsSidePanelOpen(false);
          // Delay clearing selected item to allow animation to complete
          setTimeout(() => setSelectedItem(null), 200);
        }}
      />
    </div>
  );
}

