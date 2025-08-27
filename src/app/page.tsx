"use client";

import Button from "@/components/Button";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import DesignModal from "@/components/DesignModal";
import ProjectCard from "@/components/ProjectCard";
import CategoryLegend from "@/components/CategoryLegend";
import HorizontalGallery from "@/components/HorizontalGallery";
import { useGames } from "@/hooks/useFeaturedGames";
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
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              Lucas Wang
            </h1>
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
              <Section id="featured-projects" background="secondary">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Featured Games</h2>

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
            {/* Category Legend */}
            <CategoryLegend />
            
            {/* Dynamic Games Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                category={game.category}
              />
            ))}
            </div>
            
            {/* More Projects Gallery - Integrated */}
            {otherGames.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">More Game Projects</h2>
                                  <p className="text-center text-muted-foreground mb-6">
                   Here&apos;s a few other smaller things I&apos;ve worked on! Experimental, silly, satire.
                  </p>
                <HorizontalGallery games={otherGames} />
              </div>
            )}
          </>
        )}
      </Section>

      {/* Programming Timeline */}
      <Section id="timeline">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Programming Journey</h2>
        <div className="max-w-4xl mx-auto">
          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-4">
              {/* Scratch - Middle School - LEFT SIDE */}
              <div className="relative flex items-center md:mb-0">
                <div className="flex items-center w-full md:w-5/12">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10 relative">
                    <span className="text-primary-foreground font-bold text-sm">S</span>
                  </div>
                  <div className="ml-6">
                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">Middle School</div>
                      <h3 className="text-xl font-semibold mb-2">Scratch</h3>
                      <p className="text-muted-foreground text-sm">
                        First programming language. Created interactive games and animations 
                        that gained <span className="font-semibold text-foreground">500K+ views</span>. 
                        Learned fundamental programming concepts through visual blocks.
                      </p>
                      <div className="mt-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Visual Programming</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Game Logic</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HTML/CSS - RIGHT SIDE */}
              <div className="relative flex items-center md:justify-end md:-mt-8">
                <div className="flex items-center w-full md:w-5/12 md:flex-row-reverse">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10 relative md:ml-6 md:mr-0">
                    <span className="text-primary-foreground font-bold text-sm">W</span>
                  </div>
                  <div className="ml-6 md:ml-0 md:mr-6 md:text-right">
                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">Early High School</div>
                      <h3 className="text-xl font-semibold mb-2">HTML & CSS</h3>
                      <p className="text-muted-foreground text-sm">
                        Transitioned to web development to create interactive websites and simple web games. 
                        Learned responsive design and modern CSS techniques.
                      </p>
                      <div className="mt-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Web Development</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Responsive Design</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Python - LEFT SIDE */}
              <div className="relative flex items-center md:-mt-8">
                <div className="flex items-center w-full md:w-5/12">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10 relative">
                    <span className="text-primary-foreground font-bold text-sm">Py</span>
                  </div>
                  <div className="ml-6">
                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">High School</div>
                      <h3 className="text-xl font-semibold mb-2">Python</h3>
                      <p className="text-muted-foreground text-sm">
                        Dove into Python for game development using Pygame. Built text-based adventures, 
                        simple 2D games, and automation scripts. Learned object-oriented programming.
                      </p>
                      <div className="mt-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Pygame</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">OOP</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Automation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* C++ - RIGHT SIDE */}
              <div className="relative flex items-center md:justify-end md:-mt-8">
                <div className="flex items-center w-full md:w-5/12 md:flex-row-reverse">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10 relative md:ml-6 md:mr-0">
                    <span className="text-primary-foreground font-bold text-sm">C++</span>
                  </div>
                  <div className="ml-6 md:ml-0 md:mr-6 md:text-right">
                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">Late High School</div>
                      <h3 className="text-xl font-semibold mb-2">C++</h3>
                      <p className="text-muted-foreground text-sm">
                        Learned systems programming and performance optimization. Built console games, 
                        data structures, and algorithms. Gained deep understanding of memory management.
                      </p>
                      <div className="mt-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Systems Programming</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Performance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* C# - LEFT SIDE */}
              <div className="relative flex items-center md:-mt-8">
                <div className="flex items-center w-full md:w-5/12">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10 relative">
                    <span className="text-primary-foreground font-bold text-sm">C#</span>
                  </div>
                  <div className="ml-6">
                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">Early Stanford</div>
                      <h3 className="text-xl font-semibold mb-2">C#</h3>
                      <p className="text-muted-foreground text-sm">
                        Transitioned to C# for Unity game development. Created sophisticated 2D and 3D games 
                        with complex mechanics, UI systems, and cross-platform deployment.
                      </p>
                      <div className="mt-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Unity Integration</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Cross-platform</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unity - Current - RIGHT SIDE */}
              <div className="relative flex items-center md:justify-end md:-mt-8">
                <div className="flex items-center w-full md:w-5/12 md:flex-row-reverse">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full border-4 border-background flex items-center justify-center z-10 shadow-lg relative md:ml-6 md:mr-0">
                    <span className="text-primary-foreground font-bold text-sm">U</span>
                  </div>
                  <div className="ml-6 md:ml-0 md:mr-6 md:text-right">
                    <div className="bg-background p-6 rounded-lg border border-primary/50 shadow-lg">
                      <div className="text-sm text-primary mb-1 font-medium">Current Focus</div>
                      <h3 className="text-xl font-semibold mb-2">Unity Engine</h3>
                      <p className="text-muted-foreground text-sm">
                        Primary development environment for creating immersive games. Working with VR/AR, 
                        advanced rendering, networking, and AI integration. Teaching others through Stanford courses.
                      </p>
                      <div className="mt-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">VR/AR</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Advanced Rendering</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Networking</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">AI Integration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities, collaborations, and connecting 
            with fellow game developers and creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="https://itch.io/profile/lwcoding"
              variant="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
              View My Games
            </Button>
            <Button 
              href="mailto:contact@example.com"
              variant="outline"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
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
