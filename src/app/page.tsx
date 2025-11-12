"use client";

import Button from "@/components/Button";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import DesignModal from "@/components/DesignModal";
import NewspaperGameCard from "@/components/NewspaperGameCard";
import GameSidePanel from "@/components/GameSidePanel";
import JourneyRow from "@/components/JourneyRow";
import { useGames, FEATURED_GAMES_CONFIG, GameData } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG, OtherProject } from "@/data/otherProjects";
import { useState, useEffect } from "react";
import { calculateNewspaperGridProps } from "@/utils/newspaperGrid";
import Image from "next/image";

export default function Home() {
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const { featuredGames, otherGames, loading, error } = useGames();
  const [animatedProjects, setAnimatedProjects] = useState(0);
  const [animatedViews, setAnimatedViews] = useState(0);
  const [selectedItem, setSelectedItem] = useState<GameData | OtherProject | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // Calculate totals
  const totalProjects = featuredGames.length + otherGames.length + OTHER_PROJECTS_CONFIG.length;
  const totalViews = [...featuredGames, ...otherGames].reduce((sum, game) => {
    return sum + (game.views_count || 0);
  }, 0);

  // Animate counters
  useEffect(() => {
    if (!loading && totalProjects > 0) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepTime = duration / steps;
      
      const projectsStep = totalProjects / steps;
      const viewsStep = totalViews / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setAnimatedProjects(Math.min(Math.floor(projectsStep * currentStep), totalProjects));
          setAnimatedViews(Math.min(Math.floor(viewsStep * currentStep), totalViews));
        } else {
          setAnimatedProjects(totalProjects);
          setAnimatedViews(totalViews);
          clearInterval(interval);
        }
      }, stepTime);
      
      return () => clearInterval(interval);
    }
  }, [loading, totalProjects, totalViews]);

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

      {/* Hero Section Container - Takes up 100vh minus navbar */}
      <div 
        className="flex flex-col"
        style={{ height: 'calc(100vh - 56px)' }}
      >
        {/* Hero Section - Left/Right Split */}
        <div 
          className="flex-1 flex flex-col md:flex-row relative overflow-hidden"
        >
          {/* Left Side - Text Content */}
          <div className="w-full md:w-2/5 flex items-center justify-center bg-gray-200 p-8 md:p-12">
            <div className="flex flex-col items-start text-left max-w-lg w-full space-y-6">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl font-bold text-black">
                lucas wang!
              </h1>

              {/* Descriptive Text */}
              <p className="text-base md:text-lg text-black font-medium">
                crafting interactive experiences through game development, incentive design, and education.
              </p>

              {/* Stats Counter */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-black">
                <div className="text-left">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-600">
                    {loading ? '...' : animatedProjects.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm font-medium mt-0.5">
                    Projects
                  </div>
                </div>
                <div className="hidden md:block w-px h-8 bg-black/20"></div>
                <div className="text-left">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-600">
                    {loading ? '...' : animatedViews.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm font-medium mt-0.5">
                    Total Views
                  </div>
                </div>
              </div>

              {/* Play Button */}
              <a 
                href="#featured-projects"
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                aria-label="View featured games"
              >
                <svg 
                  className="w-5 h-5 transition-transform group-hover:scale-110" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Play</span>
              </a>
            </div>
          </div>

          {/* Right Side - Video */}
          <div className="flex-1 relative bg-gray-800">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/GameShowcase.mp4" type="video/mp4" />
            </video>
            {/* Darker overlay on small devices */}
            <div className="absolute inset-0 bg-black/40 md:bg-transparent z-10"></div>
          </div>
        </div>

        {/* Bottom Yellow Bar */}
        <div id="featured-projects" className="w-full bg-yellow-400 py-4 flex-shrink-0 scroll-mt-[64px]">
          <div className="text-center text-black font-semibold">
            ▼ take a break, play a game ▼
          </div>
        </div>
      </div>

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
              {/* First row: 2 columns, subsequent rows: 3 columns */}
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

      {/* Divider */}
      <div className="w-full bg-blue-300 py-4">
        <div className="text-center text-black font-semibold">
          <span className="inline-block align-middle">▼</span> or instead, see one of my other projects <span className="inline-block align-middle">▼</span>
        </div>
      </div>

      {/* Other Projects Section */}
      <Section id="other-projects" separator={false} container={false} padding={false} className="px-0">
        <div className="bg-blue-950 flex">
          {/* Blue Strip with PROJECTS */}
          <div className="bg-blue-300 flex items-center justify-center w-12 md:w-16 flex-shrink-0">
            <div className="text-black font-bold text-lg md:text-xl whitespace-nowrap" style={{ transform: 'rotate(-90deg)' }}>
              PROJECTS
            </div>
          </div>
          
          <div className="flex-1">
            <div className="pt-6 md:pt-8 pb-12 md:pb-16">
              {/* Newspaper-style Projects Layout */}
              {/* First row: 2 columns, subsequent rows: 3 columns */}
              <div className="container mx-auto max-w-7xl px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-0">
            {OTHER_PROJECTS_CONFIG.map((project, index) => {
              const gridProps = calculateNewspaperGridProps(index, OTHER_PROJECTS_CONFIG.length);
              const size: 'large' | 'medium' | 'small' = 'medium';
              
              return (
                <div key={project.id} className={`${gridProps.columnSpan} p-2 md:p-3`} style={{ aspectRatio: '3/2' }}>
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
        </div>
      </Section>

      {/* Divider */}
      <div className="w-full bg-yellow-400 py-4">
        <div className="text-center text-black font-semibold">
          ▼ learn about my journey ▼
        </div>
      </div>

      {/* Journey Section */}
      <Section id="journey" separator={false} container={false} padding={false} className="px-0 scroll-mt-[64px]">
        
        {/* Journey Rows */}
        <div className="space-y-0">
          <JourneyRow
            title="starting from scratch:"
            description="i quickly fell in love with creating at an early age with the Scratch engine, getting several featured projects and over 1M cumulative views on the platform. inspired by how my work could reach and impact others, i continued to create and publish games across multiple platforms: Scratch, Python, C++, and now Unity."
            imageSrc="/images/scratchproject.png"
            imageAlt="Starting my journey"
            bgColor="bg-gray-100"
            layoutDirection="left"
          />
          <JourneyRow
            title="creating local communities:"
            description="dedicated to find game designers in my local communities, i started a high school game design club before eventually founding the Stanford Video Game Development club in college. in addition, i've established and currently teach the CS42SI intro game development course."
            imageSrc="/images/svgdmeeting.png"
            imageAlt="Learning and growing"
            bgColor="bg-gray-200"
            layoutDirection="right"
          />
          <JourneyRow
            title="building & sharing:"
            description="today, i continue to integrate games and fun into my day-to-day learning. i've created games for classes and jobs, regularly host game-playing events for clubs, and teach multiple classes on campus to share the passion of game design in Unity. i've also designed serious games aimed to educate and inform changes in behavior."
            imageSrc="/images/teachinggame.jpg"
            imageAlt="Building and sharing"
            bgColor="bg-gray-100"
            layoutDirection="left"
          />
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

      {/* Design Modal */}
      <DesignModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
      />

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
