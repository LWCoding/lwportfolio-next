"use client";

import Button from "@/components/Button";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import DesignModal from "@/components/DesignModal";
import NewspaperGameCard from "@/components/NewspaperGameCard";
import JourneyRow from "@/components/JourneyRow";
import { useGames } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG } from "@/data/otherProjects";
import { useState, useEffect } from "react";
import { calculateNewspaperGridProps } from "@/utils/newspaperGrid";

export default function Home() {
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const { featuredGames, otherGames, loading, error } = useGames();
  const [animatedProjects, setAnimatedProjects] = useState(0);
  const [animatedViews, setAnimatedViews] = useState(0);

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
                crafting interactive experiences through game development, thoughtful incentive design, and educational innovation.
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
        <div className="bg-gray-800 flex">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(4)].map((_: unknown, i: number) => (
              <div key={i} className="bg-secondary/30 rounded-lg border border-border overflow-hidden animate-pulse">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10"></div>
                <div className="p-6">
                  <div className="h-6 bg-muted/20 rounded mb-2"></div>
                  <div className="h-4 bg-muted/20 rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-muted/20 rounded"></div>
                    <div className="h-6 w-20 bg-muted/20 rounded"></div>
                  </div>
                  <div className="h-8 bg-muted/20 rounded"></div>
                </div>
              </div>
            ))}
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
              
              return (
                <div key={game.id} className={gridProps.columnSpan} style={{ aspectRatio: '3/2' }}>
                  <NewspaperGameCard
                    title={game.title}
                    description={game.short_text || "An exciting game experience awaits!"}
                    tags={game.tags || []}
                    href={game.url}
                    gradientClasses={gradientClasses[index % gradientClasses.length]}
                    displayText="Game"
                    coverImage={game.still_cover_url || game.cover_url}
                    viewCount={game.views_count}
                    createdAt={game.created_at}
                    variant={gridProps.variant}
                    size={size}
                    isLastInRow={gridProps.isLastInRow}
                    isLastRow={gridProps.isLastRow}
                    borderColor="border-gray-800"
                    platforms={game.platforms}
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
      <div className="w-full bg-gray-300 py-4">
        <div className="text-center text-black font-semibold">
          <span className="inline-block align-middle">▼</span> or instead, see one of my other projects <span className="inline-block align-middle">▼</span>
        </div>
      </div>

      {/* Other Projects Section */}
      <Section id="other-projects" separator={false} container={false} padding={false} className="px-0">
        <div className="bg-gray-800 flex">
          {/* Gray Strip with PROJECTS */}
          <div className="bg-gray-300 flex items-center justify-center w-12 md:w-16 flex-shrink-0">
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
                <div key={project.id} className={gridProps.columnSpan} style={{ aspectRatio: '3/2' }}>
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
                    borderColor="border-gray-800"
                    platforms={project.platforms}
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
      {/* Journey Section */}
      <Section id="journey" separator={false} container={false} padding={false} className="px-0 scroll-mt-[64px]">
        <div className="bg-yellow-400 py-8 md:py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black">
              Journey
            </h2>
          </div>
        </div>
        
        {/* Journey Rows */}
        <div className="space-y-0">
          <JourneyRow
            title="Starting Out"
            description="My journey in game development began with a curiosity about how games bring people together and create meaningful experiences."
            imageSrc="/images/dschoolheadshot.jpg"
            imageAlt="Starting my journey"
            bgColor="bg-gray-100"
            layoutDirection="left"
          />
          <JourneyRow
            title="Learning & Growing"
            description="Through courses, projects, and experimentation, I've learned to combine design thinking with technical skills to create engaging interactive experiences."
            imageSrc="/images/dschoolheadshot.jpg"
            imageAlt="Learning and growing"
            bgColor="bg-gray-200"
            layoutDirection="right"
          />
          <JourneyRow
            title="Building & Sharing"
            description="Today, I continue to create games and projects that explore new ideas, pushing the boundaries of what interactive experiences can be."
            imageSrc="/images/dschoolheadshot.jpg"
            imageAlt="Building and sharing"
            bgColor="bg-gray-300"
            layoutDirection="left"
          />
        </div>
      </Section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-6 px-4 border-t border-black/20 bg-yellow-400 mt-auto scroll-mt-[64px]">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-black font-bold">
            © {new Date().getFullYear()} Lucas Wang
          </p>
          <p className="text-sm text-black font-bold mt-1">
            <a 
              href="mailto:lswang05@stanford.edu"
              className="hover:text-gray-800 transition-colors"
            >
              lswang05@stanford.edu
            </a>
          </p>
        </div>
      </footer>

      {/* Design Modal */}
      <DesignModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
      />
    </div>
  );
}
