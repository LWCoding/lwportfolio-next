"use client";

import Button from "@/components/Button";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import DesignModal from "@/components/DesignModal";
import ProjectCard from "@/components/ProjectCard";
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
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <Section className="pt-24 pb-16" container={false}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-1">
              <Image 
                src="/images/stanfordlogo.avif" 
                alt="Stanford University Logo" 
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
              <h1 className="text-5xl md:text-7xl font-bold text-foreground">
                Lucas Wang
              </h1>
            </div>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Game Developer & Design Student
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hey there! I&apos;m an undergraduate at Stanford University who loves bringing silly ideas to life through games. I also love nerding out and teaching game development to others. :)
            </p>
                        <div className="flex justify-center gap-8 pt-4">
              {/* Itch.io */}
              <a 
                href="https://lwcoding.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
                className="w-16 h-16 bg-gray-100 hover:bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center"
                aria-label="Visit my Itch.io profile"
              >
                <Image 
                  src="/images/itchio.png" 
                  alt="Itch.io" 
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/LWCoding"
            target="_blank"
            rel="noopener noreferrer"
                className="w-16 h-16 bg-gray-100 hover:bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center"
                aria-label="Visit my GitHub profile"
              >
                <Image 
                  src="/images/github.png" 
                  alt="GitHub" 
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/lucas-wang-3160b720a/"
          target="_blank"
          rel="noopener noreferrer"
                className="w-16 h-16 bg-gray-100 hover:bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center"
                aria-label="Visit my LinkedIn profile"
              >
                <Image 
                  src="/images/linkedin.png" 
                  alt="LinkedIn" 
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </a>
            </div>
            <div className="pt-1">
              <button
                onClick={() => setIsDesignModalOpen(true)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-2 cursor-pointer"
              >
                Wait, what is design..?
              </button>
            </div>
          </div>
        </div>
      </Section>



      {/* Featured Projects Gallery */}
              <Section id="featured-projects" background="secondary" separator={true}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Games</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            An assortment of my favorite games from the last few years! All published on Itch.io.
          </p>

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
            {/* Dynamic Games Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {featuredGames.map((game, index) => (
              <ProjectCard
                key={game.id}
                title={game.title}
                description={game.short_text || "An exciting game experience awaits!"}
                tags={game.tags || []}
                href={game.url}
                gradientClasses={gradientClasses[index % gradientClasses.length]}
                displayText="Game"
                coverImage={game.cover_url || game.still_cover_url}
                viewCount={game.views_count}
                createdAt={game.created_at}
              />
            ))}
            </div>
            
            {/* More Projects Gallery - Integrated */}
                          {otherGames.length > 0 && (
                <div className="mt-12">
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
      </Section>

      {/* Other Projects Section */}
      <Section id="other-projects" separator={true}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Other Projects</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Beyond games, I&apos;ve worked on various websites, applications, and tools. 
          Here&apos;s a showcase of my other development work.
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
              gradientClasses={project.gradientClasses}
              createdAt={project.createdAt}
            />
          ))}
        </div>
      </Section>





      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 bg-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Lucas Wang.
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
