"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Button from "@/components/Button";
import DetailSidePanel from "@/components/DetailSidePanel";
import VideoBanner from "@/components/VideoBanner";
import Footer from "@/components/Footer";
import WorkItemCard from "@/components/WorkItemCard";
import { useGames, GameData, FEATURED_GAMES_CONFIG } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG, OtherProject } from "@/data/otherProjects";
import { useState } from "react";

type SelectedItem = GameData | OtherProject | null;

export default function Work() {
  const { featuredGames, loading, error } = useGames();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

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
            <WorkItemCard
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
        <Section id="other-projects" separator={false} container={true} padding={true} className="bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">Other Projects</h2>
          <div className="space-y-8 md:space-y-12">
            {OTHER_PROJECTS_CONFIG.slice(3).map((project) => (
              <WorkItemCard
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
      )}

      {/* Games Section */}
      <Section separator={true} container={true} padding={true} className="bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">Games</h2>
        
        {/* Featured Games Section */}
        {!loading && !error && featuredGames.length > 0 && (
          <div className="space-y-8 md:space-y-12">
            {featuredGames.slice(0, 3).map((game) => (
              <WorkItemCard
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

      {/* Other Games Section - Only show if there are more than 3 games */}
      {!loading && !error && featuredGames.length > 3 && (
        <Section separator={false} container={true} padding={true} className="bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">Other Games</h2>
          <div className="space-y-8 md:space-y-12">
            {featuredGames.slice(3).map((game) => (
              <WorkItemCard
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

