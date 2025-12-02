"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Button from "@/components/Button";
import NewspaperGameCard from "@/components/NewspaperGameCard";
import GameSidePanel from "@/components/GameSidePanel";
import VideoBanner from "@/components/VideoBanner";
import Footer from "@/components/Footer";
import FeaturedItemCard from "@/components/FeaturedItemCard";
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

      {/* Featured Games Section */}
      {!loading && !error && featuredGames.length > 0 && (
        <Section separator={false} container={true} padding={true} className="bg-white">
          <div className="space-y-8 md:space-y-12">
            {featuredGames.slice(0, 3).map((game) => (
              <FeaturedItemCard
                key={game.id}
                title={game.title}
                description={game.short_text || "An exciting game experience awaits!"}
                imageSrc={game.still_cover_url || game.cover_url || "/images/scratchproject.png"}
                imageAlt={`${game.title} cover image`}
                onClick={() => {
                  setSelectedItem(game);
                  setIsSidePanelOpen(false);
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      setIsSidePanelOpen(true);
                    });
                  });
                }}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Error State */}
      {error && (
        <Section separator={false} container={true} padding={true} className="bg-white">
          <div className="text-center py-12">
            <p className="text-gray-800 mb-4">
              Oops! Couldn&apos;t load games from Itch.io right now.
            </p>
            <p className="text-sm text-gray-600 mb-4">
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
        </Section>
      )}

      {/* Empty State */}
      {!loading && !error && featuredGames.length === 0 && (
        <Section separator={false} container={true} padding={true} className="bg-white">
          <div className="text-center py-12">
            <p className="text-gray-800 mb-4">
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
        </Section>
      )}

      {/* Games Gallery - Only show if there are more than 3 games */}
      {!loading && !error && featuredGames.length > 3 && (
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
                {/* Newspaper-style Games Layout */}
                <div className="container mx-auto max-w-[1024px] px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-0">
                    {featuredGames.slice(3).map((game, index) => {
                      const gridProps = calculateNewspaperGridProps(index, featuredGames.length - 3);
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
              </div>
            </div>
          </div>
        </Section>
      )}

      <Footer />

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

