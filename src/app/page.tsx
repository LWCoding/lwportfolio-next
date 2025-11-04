"use client";

import Button from "@/components/Button";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import DesignModal from "@/components/DesignModal";
import ProjectCard from "@/components/ProjectCard";
import NewspaperGameCard from "@/components/NewspaperGameCard";
import HorizontalGallery from "@/components/HorizontalGallery";
import OtherProjectCard from "@/components/OtherProjectCard";
import { useGames } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG } from "@/data/otherProjects";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const { featuredGames, otherGames, loading, error } = useGames();

  // Simple gradient classes for variety
  const gradientClasses = [
    "from-red-500/20 to-orange-500/20",
    "from-blue-500/20 to-purple-500/20", 
    "from-green-500/20 to-teal-500/20",
    "from-purple-500/20 to-pink-500/20",
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />

      {/* Hero Section - Takes up remaining viewport height */}
      <div className="flex-1 bg-white flex items-center" style={{ minHeight: 'calc(100vh - 64px - 56px)', height: 'calc(100vh - 64px - 56px)' }}>
        <div className="w-full h-full">
          <div className="container mx-auto px-4 h-full">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 h-full items-center">
              {/* Left Section - Text Content */}
              <div className="flex-1 flex flex-col justify-center space-y-4 md:space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold text-black">
                  lucas wang,
                </h1>
                
                {/* Profession Lines */}
                <div className="space-y-2 text-2xl md:text-3xl pl-6 md:pl-10">
                  <p className="text-red-600">a game developer,</p>
                  <p className="text-green-600">incentive designer,</p>
                  <p className="text-orange-600">educator</p>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 pt-4">
                  {/* LinkedIn */}
                  <a 
                    href="https://www.linkedin.com/in/lucas-wang-3160b720a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white hover:bg-gray-100 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer border border-gray-200"
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

                  {/* GitHub */}
                  <a 
                    href="https://github.com/LWCoding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white hover:bg-gray-100 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer border border-gray-200"
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

                  {/* Itch.io */}
                  <a 
                    href="https://lwcoding.itch.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white hover:bg-gray-100 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer border border-gray-200"
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
                </div>
              </div>

              {/* Right Section - Placeholder */}
              <div className="flex-1 md:max-w-[40%] bg-gray-200 rounded-lg flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                {/* Placeholder content - can be replaced with image later */}
                <div className="text-gray-400 text-sm">Image placeholder</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gray Bar */}
      <div className="w-full bg-gray-800 py-4">
        <div className="text-center text-white">
          ▼ take a break, play a game ▼
        </div>
      </div>

      {/* Games Gallery */}
      <Section id="featured-projects" background="secondary" separator={true} container={false} padding={false}>
        <div className="container mx-auto px-4 max-w-7xl">
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
            <p className="text-muted-foreground mb-4">
              Oops! Couldn&apos;t load games from Itch.io right now.
            </p>
            <p className="text-sm text-muted-foreground">
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
            <p className="text-muted-foreground mb-4">
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
                  />
                </div>
              );
              })}
            </div>
              
              {/* More Projects Gallery - Integrated - Hidden on small devices */}
              {otherGames.length > 0 && (
                <div className="mt-12 hidden md:block">
                  <HorizontalGallery games={otherGames} />
                  <div className="text-center mt-4">
                    <a 
                      href="https://lwcoding.itch.io/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
                    >
                      View all my games on Itch.io →
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Section>

      {/* Other Projects Section */}
      <Section id="other-projects" separator={true}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Other Projects</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Beyond games, I&apos;ve worked on various websites, applications, and tools!
        </p>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {OTHER_PROJECTS_CONFIG.map((project) => (
            <OtherProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              href={project.href}
              coverImage={project.coverImage}
              createdAt={project.createdAt}
            />
          ))}
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
