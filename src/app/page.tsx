"use client";

import Button from "@/components/Button";
import Section from "@/components/Section";
import DesignModal from "@/components/DesignModal";
import ProjectCard from "@/components/ProjectCard";
import HorizontalGallery from "@/components/HorizontalGallery";
import OtherProjectCard from "@/components/OtherProjectCard";
import { useGames } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG } from "@/data/otherProjects";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

      {/* Unity Editor Style Hero Section */}
      <div className="h-screen flex bg-gray-900">
          {/* Left Sidebar - Hierarchy */}
          <div className="w-1/4 bg-gray-800 border-r border-gray-700 flex flex-col">
            {/* Hierarchy Header */}
            <div className="bg-gray-700 px-3 py-2 border-b border-gray-600">
              <span className="text-sm font-semibold text-gray-200">Hierarchy</span>
            </div>
            
            {/* Hierarchy Items */}
            <div className="flex-1 p-2 space-y-1">
              {/* Introduction - Selected */}
              <div className="bg-blue-600/20 border border-blue-500/30 rounded px-2 py-1 cursor-pointer">
                <span className="text-sm text-blue-300 font-medium">Introduction</span>
              </div>
            </div>
          </div>

          {/* Center Area - Scene View */}
          <div className="flex-1 bg-gray-900 relative">
            {/* Scene View Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-400 font-medium">Scene</span>
              </div>
            </div>
            
            {/* Unity Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            
            
            {/* Scene Content - Introduction */}
            <div className="h-full flex items-center justify-center p-8 relative z-10">
              <div className="max-w-4xl text-center space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="group relative cursor-pointer">
                      <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                      <Image 
                        src="/images/stanfordlogo.avif" 
                        alt="Stanford University Logo" 
                        width={60}
                        height={60}
                        className="w-12 h-12 md:w-16 md:h-16 object-contain relative z-10"
                      />
                    </div>
                    <div className="group relative cursor-pointer">
                      <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                      <h1 className="text-4xl md:text-6xl font-bold text-white relative z-10">
                        Lucas Wang
                      </h1>
                    </div>
                  </div>
                  <div className="group relative cursor-pointer">
                    <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                    <p className="text-xl md:text-2xl text-blue-400 font-semibold relative z-10">
                      Game Designer & Lifelong Learner
                    </p>
                  </div>
                  <div className="group relative cursor-pointer">
                    <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto relative z-10">
                      Hey there! I&apos;m an undergraduate at Stanford University who loves bringing silly ideas to life through games. I also love nerding out and teaching game development to others. :)
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4">
                  {/* Itch.io */}
                  <div className="group relative cursor-pointer">
                    <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                    <a 
                      href="https://lwcoding.itch.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-gray-700 rounded-full overflow-hidden shadow-lg flex items-center justify-center border border-gray-600 cursor-pointer relative z-10"
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

                  {/* GitHub */}
                  <div className="group relative cursor-pointer">
                    <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                    <a 
                      href="https://github.com/LWCoding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-gray-700 rounded-full overflow-hidden shadow-lg flex items-center justify-center border border-gray-600 cursor-pointer relative z-10"
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
                  </div>

                  {/* LinkedIn */}
                  <div className="group relative cursor-pointer">
                    <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                    <a 
                      href="https://www.linkedin.com/in/lucas-wang-3160b720a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-gray-700 rounded-full overflow-hidden shadow-lg flex items-center justify-center border border-gray-600 cursor-pointer relative z-10"
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
                </div>
                
                <div className="pt-2">
                  <div className="group relative cursor-pointer inline-block">
                    <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                    <button
                      onClick={() => setIsDesignModalOpen(true)}
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors underline underline-offset-2 cursor-pointer relative z-10"
                    >
                      Wait, what is design..?
                    </button>
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
