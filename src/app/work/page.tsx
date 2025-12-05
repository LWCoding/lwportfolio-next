"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Button from "@/components/Button";
import NewspaperGameCard from "@/components/NewspaperGameCard";
import DetailSidePanel from "@/components/DetailSidePanel";
import VideoBanner from "@/components/VideoBanner";
import Footer from "@/components/Footer";
import FeaturedItemCard from "@/components/FeaturedItemCard";
import { useGames, GameData, FEATURED_GAMES_CONFIG } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG, OtherProject } from "@/data/otherProjects";
import { useState } from "react";
import { calculateNewspaperGridProps } from "@/utils/newspaperGrid";
import Image from "next/image";

type SelectedItem = GameData | OtherProject | null;

export default function Work() {
  const { featuredGames, loading, error } = useGames();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
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
      <VideoBanner 
        title="Work" 
        subtitle="Projects and games I've created!" 
        height="33vh"
        minHeight="200px"
      />

      {/* Projects Section */}
      <Section separator={true} container={true} padding={true} className="bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">Projects</h2>
        <div className="space-y-8 md:space-y-12">
          {OTHER_PROJECTS_CONFIG.slice(0, 3).map((project) => (
            <FeaturedItemCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageSrc={project.coverImage || "/images/scratchproject.png"}
              imageAlt={`${project.title} cover image`}
              tags={project.tags}
              platforms={project.platforms}
              date={project.createdAt}
              href={project.href}
              secondaryCtaLabel="View Project"
              githubUrl={project.githubUrl}
              onClick={() => {
                setSelectedItem(project);
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

      {/* Other Projects Section - Only show if there are more than 3 projects */}
      {OTHER_PROJECTS_CONFIG.length > 3 && (
        <Section id="other-projects" separator={false} container={false} padding={false} className="px-0">
          <div className="bg-blue-950">
            <div className="pt-6 md:pt-8 pb-6 md:pb-8">
              {/* Newspaper-style Projects Layout */}
              <div className="container mx-auto max-w-[1024px] px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 md:mb-4 text-center">Other Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0">
                    {OTHER_PROJECTS_CONFIG.slice(3).map((project, index) => {
                    const gridProps = calculateNewspaperGridProps(index, OTHER_PROJECTS_CONFIG.length - 3);
                    const size: 'large' | 'medium' | 'small' = 'medium';
                    const isFirstCard = index === 0;
                    
                    return (
                      <div key={project.id} className={`${gridProps.columnSpan} p-2 md:p-3 ${isFirstCard ? 'relative' : ''}`} style={{ aspectRatio: '3/2' }}>
                        {/* Development Process Callout - Positioned above first card - Mobile only */}
                        {isFirstCard && (
                          <div className="md:hidden absolute -top-10 left-6 z-10 pointer-events-none" style={{ maxWidth: 'calc(100vw - 4rem)', minWidth: 'max-content' }}>
                            <div className="flex items-center gap-3">
                              {/* Curved Arrow pointing down to first card */}
                              <Image 
                                src="/images/curvedarrow.png"
                                alt=""
                                width={40}
                                height={40}
                                className="w-8 h-8 flex-shrink-0 mt-8"
                              />
                              {/* Text */}
                              <p className="text-white text-sm font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] whitespace-nowrap">
                                Click to view more info!
                              </p>
                            </div>
                          </div>
                        )}
                        <NewspaperGameCard
                          title={project.title}
                          description={project.description}
                          tags={project.tags}
                          href={project.href}
                          gradientClasses={gradientClasses[index % gradientClasses.length]}
                          displayText="Project"
                          coverImage={project.coverImage}
                          createdAt={project.createdAt}
                          variant={gridProps.variant}
                          size={size}
                          isLastInRow={gridProps.isLastInRow}
                          isLastRow={gridProps.isLastRow}
                          platforms={project.platforms}
                          fadeOpacity={project.fadeOpacity}
                          onClick={() => {
                            // First set the project, then trigger the open animation
                            setSelectedItem(project);
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
        </Section>
      )}

      {/* Games Section */}
      <Section separator={true} container={true} padding={true} className="bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">Games</h2>
        
        {/* Featured Games Section */}
        {!loading && !error && featuredGames.length > 0 && (
          <div className="space-y-8 md:space-y-12">
            {featuredGames.slice(0, 3).map((game) => (
              <FeaturedItemCard
                key={game.id}
                title={game.title}
                description={game.short_text || "An exciting game experience awaits!"}
                imageSrc={game.still_cover_url || game.cover_url || "/images/scratchproject.png"}
                imageAlt={`${game.title} cover image`}
                tags={game.tags}
                platforms={game.platforms}
                date={game.created_at}
                href={game.url}
                secondaryCtaLabel="Play Game"
                githubUrl={FEATURED_GAMES_CONFIG.find((cfg) => cfg.id === game.id)?.githubUrl || game.githubUrl}
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
        )}

        {/* Error State */}
        {error && (
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
        )}

        {/* Empty State */}
        {!loading && !error && featuredGames.length === 0 && (
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
        )}
      </Section>

      {/* Games Gallery - Only show if there are more than 3 games */}
      {!loading && !error && featuredGames.length > 3 && (
        <Section separator={false} container={false} padding={false} className="px-0">
          <div className="bg-yellow-600">
            <div className="pt-6 md:pt-8 pb-6 md:pb-8">
              {/* Newspaper-style Games Layout */}
              <div className="container mx-auto max-w-[1024px] px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 md:mb-4 text-center">Other Games</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0">
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
                          {/* Development Process Callout - Positioned above first card - Mobile only */}
                          {isFirstCard && (
                            <div className="md:hidden absolute -top-10 left-6 z-10 pointer-events-none" style={{ maxWidth: 'calc(100vw - 4rem)', minWidth: 'max-content' }}>
                              <div className="flex items-center gap-3">
                                {/* Curved Arrow pointing down to first card */}
                                <Image 
                                  src="/images/curvedarrow.png"
                                  alt=""
                                  width={40}
                                  height={40}
                                  className="w-8 h-8 flex-shrink-0 mt-8"
                                />
                                {/* Text */}
                                <p className="text-white text-sm font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] whitespace-nowrap">
                                  Click to view more info!
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
        </Section>
      )}

      <Footer />

      {/* Game/Project Detail Panel */}
      <DetailSidePanel
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

