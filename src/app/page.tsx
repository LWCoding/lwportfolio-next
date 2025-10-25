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

      {/* Hero Section - Full Viewport Height */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
          {/* You can replace this with your actual background image */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-orange-100/20 to-blue-200/30"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto max-w-6xl px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Text content */}
              <div className="space-y-8 order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Image 
                      src="/images/stanfordlogo.avif" 
                      alt="Stanford University Logo" 
                      width={60}
                      height={60}
                      className="w-12 h-12 md:w-16 md:h-16 object-contain"
                    />
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                      Lucas Wang
                    </h1>
                  </div>
                  <p className="text-xl md:text-2xl text-accent font-semibold">
                    Game Developer & Design Student
                  </p>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    Hey there! I&apos;m an undergraduate at Stanford University who loves bringing silly ideas to life through games. I also love nerding out and teaching game development to others. :)
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {/* Itch.io */}
                  <a 
                    href="https://lwcoding.itch.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/20 hover:from-primary/20 hover:to-primary/30 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center border border-primary/20 cursor-pointer"
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

                  {/* GitHub */}
                  <a 
                    href="https://github.com/LWCoding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gradient-to-br from-accent/10 to-accent/20 hover:from-accent/20 hover:to-accent/30 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center border border-accent/20 cursor-pointer"
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

                  {/* LinkedIn */}
                  <a 
                    href="https://www.linkedin.com/in/lucas-wang-3160b720a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/20 hover:from-primary/20 hover:to-primary/30 rounded-full overflow-hidden transition-all duration-300 hover:scale-110 shadow-lg flex items-center justify-center border border-primary/20 cursor-pointer"
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
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={() => setIsDesignModalOpen(true)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-2 cursor-pointer"
                  >
                    Wait, what is design..?
                  </button>
                </div>
              </div>

              {/* Right side - Floating headshot bubble */}
              <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                <div className="relative">
                  {/* Floating bubble with headshot */}
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/30 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/50 relative overflow-hidden">
                    {/* Headshot placeholder using Stanford logo */}
                    <div className="w-48 h-48 md:w-60 md:h-60 bg-gradient-to-br from-white/80 to-white/60 rounded-full flex items-center justify-center shadow-inner">
                      <Image 
                        src="/images/stanfordlogo.avif" 
                        alt="Lucas Wang Headshot Placeholder" 
                        width={120}
                        height={120}
                        className="w-24 h-24 md:w-32 md:h-32 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* About Section */}
      <Section id="about" background="secondary" separator={true}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">About Me</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">My Journey</h3>
              <p className="text-muted-foreground">
                I&apos;m currently pursuing my undergraduate degree at Stanford University, where I&apos;m diving deep into the world of game development and design. My passion for creating interactive experiences started when I was young, and it&apos;s only grown stronger over the years.
              </p>
              <p className="text-muted-foreground">
                What I love most about game development is the unique blend of creativity and technical problem-solving. Every project is a new adventure, whether I&apos;m crafting silly puzzle games or building tools that help other developers.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">Teaching & Community</h3>
              <p className="text-muted-foreground">
                One of my favorite parts of being a game developer is sharing knowledge with others. I love teaching game development concepts and helping fellow students discover the joy of creating interactive experiences.
              </p>
              <p className="text-muted-foreground">
                Whether it&apos;s through workshops, one-on-one mentoring, or collaborative projects, I believe that the best way to learn is by doing and sharing with others.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              href="/projects" 
              variant="primary"
              className="text-lg px-8 py-4"
            >
              View My Projects →
            </Button>
          </div>
        </div>
      </Section>

      {/* Skills & Interests Section */}
      <Section id="skills" separator={true}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Skills & Interests</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Game Development</h3>
              <p className="text-muted-foreground">
                Unity, C#, game design, prototyping, and bringing creative ideas to life through interactive experiences.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Web Development</h3>
              <p className="text-muted-foreground">
                React, Next.js, TypeScript, and building modern web applications that are both functional and beautiful.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Design Thinking</h3>
              <p className="text-muted-foreground">
                User research, prototyping, iteration, and creating solutions that truly meet people&apos;s needs.
              </p>
            </div>
          </div>
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

      {/* Design Modal */}
      <DesignModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
      />
    </div>
  );
}
