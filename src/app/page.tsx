"use client";

import Button from "@/components/Button";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import DesignModal from "@/components/DesignModal";
import ProjectCard from "@/components/ProjectCard";
import NewspaperGameCard from "@/components/NewspaperGameCard";
import { useGames } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG } from "@/data/otherProjects";
import { useState, useEffect } from "react";
import Image from "next/image";

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
        {/* Hero Section - Flexible, takes remaining space */}
        <div 
          className="flex-1 flex items-start justify-center relative overflow-hidden"
        >
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/GameShowcase.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-white/60 z-[2]" />
          
          {/* Text Content - Closer to top */}
          <div className="relative z-[3] container mx-auto px-4 pt-12 md:pt-16">
            <div className="flex flex-col items-center justify-start text-center">
              {/* Combined backdrop for all content */}
              <div className="px-8 py-6 md:px-12 md:py-8 rounded-2xl bg-white/80 backdrop-blur-sm space-y-4 md:space-y-5">
                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold text-black drop-shadow-sm">
                  lucas wang!
                </h1>

                {/* Descriptive Text */}
                <div className="max-w-2xl mx-auto">
                  <p className="text-lg md:text-xl text-black font-medium">
                    Crafting interactive experiences through game development, thoughtful incentive design, and educational innovation.
                  </p>
                </div>

                {/* Stats Counter */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-black">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-yellow-600">
                      {loading ? '...' : animatedProjects.toLocaleString()}
                    </div>
                    <div className="text-xs md:text-sm font-medium mt-0.5">
                      Projects
                    </div>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-black/20"></div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-yellow-600">
                      {loading ? '...' : animatedViews.toLocaleString()}
                    </div>
                    <div className="text-xs md:text-sm font-medium mt-0.5">
                      Total Views
                    </div>
                  </div>
                </div>

                {/* Play Button CTA */}
                <div className="flex justify-center pt-2">
                  <a 
                    href="#featured-projects"
                    className="group flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl cursor-pointer"
                    aria-label="View featured games"
                  >
                    <svg 
                      className="w-6 h-6 transition-transform group-hover:scale-110" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>Play Games</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Yellow Bar */}
        <div className="w-full bg-yellow-400 py-4 flex-shrink-0">
          <div className="text-center text-black font-semibold">
            ▼ take a break, play a game ▼
          </div>
        </div>
      </div>

      {/* Games Gallery */}
      <Section id="featured-projects" separator={false} container={false} padding={false} className="px-0">
        <div className="bg-gray-800">
          <div className="py-8">
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
              // Create alternating colors for newspaper effect
              const variants: Array<'white' | 'grey'> = ['white', 'grey'];
              
              // Determine which row this game is in
              // First 2 games: row 1 (2 columns)
              // Games 2+ (index 2+): row 2+ (3 columns each)
              const isFirstRow = index < 2;
              
              // Calculate if this is the last item in its row
              let isLastInRow = false;
              if (isFirstRow) {
                // First row: last item is at index 1
                isLastInRow = index === 1;
              } else {
                // Subsequent rows: 3 items per row
                // Row 2: indices 2, 3, 4 (last at 4)
                // Row 3: indices 5, 6, 7 (last at 7)
                // Row 4: indices 8, 9, 10 (last at 10)
                const rowIndex = index - 2; // 0-based row index for rows after first
                const positionInRow = rowIndex % 3;
                isLastInRow = positionInRow === 2; // Last position in a 3-item row
              }
              
              // First row: each item spans 3 columns (6/2 = 3)
              // Subsequent rows: each item spans 2 columns (6/3 = 2)
              const columnSpan = isFirstRow 
                ? 'md:col-span-1 lg:col-span-3' 
                : 'md:col-span-1 lg:col-span-2';
              
              // All items are medium size for consistency
              const size: 'large' | 'medium' | 'small' = 'medium';
              
              const variant = variants[index % variants.length] as 'white' | 'grey';
              
              // Calculate if this is in the last row
              const totalGames = featuredGames.length;
              const isLastRow = isFirstRow 
                ? false 
                : index >= totalGames - 3; // Last 3 items are in the last row
              
              return (
                <div key={game.id} className={`${columnSpan}`} style={{ aspectRatio: '3/2' }}>
                  <NewspaperGameCard
                    title={game.title}
                    description={game.short_text || "An exciting game experience awaits!"}
                    tags={game.tags || []}
                    href={game.url}
                    gradientClasses={gradientClasses[index % gradientClasses.length]}
                    displayText="Game"
                    coverImage={game.cover_url || game.still_cover_url}
                    viewCount={game.views_count}
                    createdAt={game.created_at}
                    variant={variant}
                    size={size}
                    isLastInRow={isLastInRow}
                    isLastRow={isLastRow}
                    borderColor="border-gray-800"
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
      </Section>

      {/* Divider */}
      <div className="w-full bg-white py-4">
        <div className="text-center text-black">
          <span className="inline-block align-middle">▼</span> or, see my other projects <span className="inline-block align-middle">▼</span>
        </div>
      </div>

      {/* Other Projects Section */}
      <Section id="other-projects" separator={false} container={false} padding={false} className="px-0">
        <div className="bg-white">
          <div className="py-8">
            {/* Newspaper-style Projects Layout */}
            {/* First row: 2 columns, subsequent rows: 3 columns */}
            <div className="container mx-auto max-w-7xl px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-0">
            {OTHER_PROJECTS_CONFIG.map((project, index) => {
              // Create alternating colors for newspaper effect
              const variants: Array<'white' | 'grey'> = ['white', 'grey'];
              
              // Determine which row this project is in
              // First 2 projects: row 1 (2 columns)
              // Projects 2+ (index 2+): row 2+ (3 columns each)
              const isFirstRow = index < 2;
              
              // Calculate if this is the last item in its row
              let isLastInRow = false;
              if (isFirstRow) {
                // First row: last item is at index 1
                isLastInRow = index === 1;
              } else {
                // Subsequent rows: 3 items per row
                const rowIndex = index - 2; // 0-based row index for rows after first
                const positionInRow = rowIndex % 3;
                isLastInRow = positionInRow === 2; // Last position in a 3-item row
              }
              
              // First row: each item spans 3 columns (6/2 = 3)
              // Subsequent rows: each item spans 2 columns (6/3 = 2)
              const columnSpan = isFirstRow 
                ? 'md:col-span-1 lg:col-span-3' 
                : 'md:col-span-1 lg:col-span-2';
              
              // All items are medium size for consistency
              const size: 'large' | 'medium' | 'small' = 'medium';
              
              const variant = variants[index % variants.length] as 'white' | 'grey';
              
              // Calculate if this is in the last row
              const totalProjects = OTHER_PROJECTS_CONFIG.length;
              const isLastRow = isFirstRow 
                ? false 
                : index >= totalProjects - 3; // Last 3 items are in the last row
              
              return (
                <div key={project.id} className={`${columnSpan}`} style={{ aspectRatio: '3/2' }}>
                  <NewspaperGameCard
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    href={project.href}
                    gradientClasses={gradientClasses[index % gradientClasses.length]}
                    displayText="Project"
                    coverImage={project.coverImage}
                    createdAt={project.createdAt}
                    variant={variant}
                    size={size}
                    isLastInRow={isLastInRow}
                    isLastRow={isLastRow}
                    borderColor="border-white"
                  />
                </div>
              );
            })}
              </div>
            </div>
          </div>
        </div>
      </Section>





      {/* Journey Section - Placeholder */}
      <Section id="journey" separator={true}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Journey</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Coming soon...
        </p>
      </Section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-12 px-4 border-t border-border/50 bg-secondary/10 mt-auto">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Lucas Wang
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            <a 
              href="mailto:lswang05@stanford.edu"
              className="hover:text-primary transition-colors"
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
