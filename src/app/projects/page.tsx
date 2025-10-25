"use client";

import Button from "@/components/Button";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import HorizontalGallery from "@/components/HorizontalGallery";
import OtherProjectCard from "@/components/OtherProjectCard";
import { useGames } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG } from "@/data/otherProjects";

export default function Projects() {
  const { featuredGames, otherGames, loading, error } = useGames();

  // Playful blue and orange gradient classes for variety
  const gradientClasses = [
    "from-blue-400/20 to-blue-600/20",
    "from-orange-400/20 to-orange-600/20", 
    "from-blue-300/20 to-orange-400/20",
    "from-orange-300/20 to-blue-500/20",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <Section className="pt-24 pb-12" container={false}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              My Projects
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              A collection of games, websites, and other creative projects I&apos;ve worked on.
            </p>
          </div>
        </div>
      </Section>

      {/* Games Gallery */}
      <Section id="featured-projects" background="secondary" separator={true}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Games</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          An assortment of my favorite game projects from the last few years! All published on Itch.io.
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
            
            {/* More Projects Gallery - Integrated - Hidden on small devices */}
            {otherGames.length > 0 && (
              <div className="mt-12 hidden md:block">
                <HorizontalGallery games={otherGames} />
                <div className="text-center mt-4">
                  <a 
                    href="https://lwcoding.itch.io/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-2 cursor-pointer"
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

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 bg-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Lucas Wang
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            <a 
              href="mailto:lswang05@stanford.edu"
              className="hover:text-primary transition-colors cursor-pointer"
            >
              lswang05@stanford.edu
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
