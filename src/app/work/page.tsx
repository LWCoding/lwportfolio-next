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

export default function Work() {
  const { featuredGames, loading, error } = useGames();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'games'>('projects');

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

      {/* Tab Navigation */}
      <Section separator={true} container={true} padding={true} className="bg-white relative">
        <div className="flex justify-center gap-8 md:gap-12 mb-0 relative">
          {/* Projects Tab */}
          <div 
            onClick={() => setActiveTab('projects')}
            className="flex flex-col items-center gap-2 cursor-pointer group relative"
          >
            <div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 ${
                activeTab === 'projects'
                  ? 'bg-blue-500 text-white shadow-lg scale-110'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
              }`}
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <span className={`text-sm md:text-base font-medium transition-colors relative z-10 ${
              activeTab === 'projects' ? 'text-blue-500' : 'text-gray-700'
            }`}>
              Projects
            </span>
            {/* Connecting line for Projects */}
            {activeTab === 'projects' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-24 md:h-28 bg-blue-500 z-0" style={{ marginTop: '0.5rem' }}></div>
            )}
          </div>

          {/* Games Tab */}
          <div 
            onClick={() => setActiveTab('games')}
            className="flex flex-col items-center gap-2 cursor-pointer group relative"
          >
            <div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 ${
                activeTab === 'games'
                  ? 'bg-green-600 text-white shadow-lg scale-110'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
              }`}
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className={`text-sm md:text-base font-medium transition-colors relative z-10 ${
              activeTab === 'games' ? 'text-green-600' : 'text-gray-700'
            }`}>
              Games
            </span>
            {/* Connecting line for Games */}
            {activeTab === 'games' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-24 md:h-28 bg-green-600 z-0" style={{ marginTop: '0.5rem' }}></div>
            )}
          </div>
        </div>
      </Section>

      {/* Projects Tab Content */}
      {activeTab === 'projects' && (
        <>
          {/* Projects Section */}
          <Section separator={false} container={true} padding={true} className={`pt-8 md:pt-12 ${activeTab === 'projects' ? 'bg-blue-500' : 'bg-white'}`}>
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
            <Section id="other-projects" separator={false} container={true} padding={true} className={activeTab === 'projects' ? 'bg-blue-500' : 'bg-gray-200'}>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">Other Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {OTHER_PROJECTS_CONFIG.slice(3).map((project) => (
                  <GalleryCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    imageSrc={project.coverImage || "/images/scratchproject.png"}
                    imageAlt={`${project.title} cover image`}
                    tags={project.tags}
                    platforms={project.platforms}
                    date={project.createdAt}
                    href={project.href}
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
        </>
      )}

      {/* Games Tab Content */}
      {activeTab === 'games' && (
        <>
          {/* Games Section */}
          <Section separator={false} container={true} padding={true} className={`pt-8 md:pt-12 ${activeTab === 'games' ? 'bg-green-600' : 'bg-white'}`}>
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
            <Section separator={false} container={true} padding={true} className={activeTab === 'games' ? 'bg-green-600' : 'bg-gray-200'}>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">Other Games</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {featuredGames.slice(3).map((game) => (
                  <GalleryCard
                    key={game.id}
                    title={game.title}
                    description={game.short_text || "An exciting game experience awaits!"}
                    imageSrc={game.still_cover_url || game.cover_url || "/images/scratchproject.png"}
                    imageAlt={`${game.title} cover image`}
                    tags={game.tags}
                    platforms={game.platforms}
                    date={game.created_at}
                    href={game.url}
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
        </>
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

