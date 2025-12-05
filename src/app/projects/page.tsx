"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Button from "@/components/Button";
import DetailSidePanel from "@/components/DetailSidePanel";
import VideoBanner from "@/components/VideoBanner";
import Footer from "@/components/Footer";
import WorkItemCard from "@/components/WorkItemCard";
import GalleryCard from "@/components/GalleryCard";
import { useGames, GameData, FEATURED_GAMES_CONFIG } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG, OtherProject } from "@/data/otherProjects";
import { useState } from "react";

type SelectedItem = GameData | OtherProject | null;

export default function Projects() {
  const { featuredGames, loading, error } = useGames();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [showOtherProjects, setShowOtherProjects] = useState(false);
  const [showOtherGames, setShowOtherGames] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col pt-[56px]">
      <Navigation />

      {/* Hero Video Banner */}
      <VideoBanner 
        title="Projects" 
        subtitle="My projects, categorized into work and fun!"
        height="33vh"
        minHeight="200px"
      />

      {/* Featured Projects Section */}
      <div id="for-work">
        <Section separator={false} container={true} padding={true} className="pt-8 md:pt-12 pb-4 md:pb-6">
          <div className="space-y-8 md:space-y-6">
          {OTHER_PROJECTS_CONFIG.slice(0, 3).map((project) => (
            <WorkItemCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageSrc={project.coverImage || "/images/scratchproject.png"}
              imageAlt={`${project.title} cover image`}
              tags={["For Work", ...(project.tags || [])]}
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
        {/* Show More Button for Projects */}
        {OTHER_PROJECTS_CONFIG.length > 3 && (
          <div className="flex justify-center mt-4 md:mt-6">
            <button
              onClick={() => setShowOtherProjects(!showOtherProjects)}
              className="px-3 py-1.5 text-sm text-black/80 hover:text-black underline transition-colors duration-200 cursor-pointer"
            >
              {showOtherProjects ? 'Show Less Work' : 'Show More Work'}
            </button>
          </div>
        )}

        {/* Other Projects Section - Only show if there are more than 3 projects and showOtherProjects is true */}
        {OTHER_PROJECTS_CONFIG.length > 3 && (
          <div 
            id="other-projects" 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showOtherProjects 
                ? 'max-h-[5000px] opacity-100 mt-8 md:mt-12' 
                : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
              {OTHER_PROJECTS_CONFIG.slice(3).map((project) => (
                <GalleryCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  imageSrc={project.coverImage || "/images/scratchproject.png"}
                  imageAlt={`${project.title} cover image`}
                  tags={["For Work", ...(project.tags || [])]}
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
          </div>
        )}
        </Section>
      </div>

      {/* Featured Games Section */}
      <div id="for-fun">
        <Section separator={false} container={true} padding={true} className="pt-4 md:pt-6">
          {/* Featured Games Section */}
          {!loading && !error && featuredGames.length > 0 && (
            <div className="space-y-8 md:space-y-6">
              {featuredGames.slice(0, 3).map((game) => (
                <WorkItemCard
                  key={game.id}
                  title={game.title}
                  description={game.short_text || "An exciting game experience awaits!"}
                  imageSrc={game.still_cover_url || game.cover_url || "/images/scratchproject.png"}
                  imageAlt={`${game.title} cover image`}
                  tags={["For Fun", ...(game.tags || [])]}
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
              <p className="text-black mb-4">
                Oops! Couldn&apos;t load games from Itch.io right now.
              </p>
              <p className="text-sm text-black/80 mb-4">
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
              <p className="text-black mb-4">
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

        {/* Show More Button for Games */}
        {!loading && !error && featuredGames.length > 3 && (
          <div className="flex justify-center mt-4 md:mt-6">
            <button
              onClick={() => setShowOtherGames(!showOtherGames)}
              className="px-3 py-1.5 text-sm text-black/80 hover:text-black underline transition-colors duration-200 cursor-pointer"
            >
              {showOtherGames ? 'Show Less Games' : 'Show More Games'}
            </button>
          </div>
        )}

        {/* Other Games Section - Only show if there are more than 3 games and showOtherGames is true */}
        {!loading && !error && featuredGames.length > 3 && (
          <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showOtherGames 
                ? 'max-h-[5000px] opacity-100 mt-8 md:mt-12' 
                : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
              {featuredGames.slice(3).map((game) => (
                <GalleryCard
                  key={game.id}
                  title={game.title}
                  description={game.short_text || "An exciting game experience awaits!"}
                  imageSrc={game.still_cover_url || game.cover_url || "/images/scratchproject.png"}
                  imageAlt={`${game.title} cover image`}
                  tags={["For Fun", ...(game.tags || [])]}
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
          </div>
        )}
        </Section>
      </div>

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
