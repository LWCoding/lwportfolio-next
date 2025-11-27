"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import NewspaperGameCard from "@/components/NewspaperGameCard";
import GameSidePanel from "@/components/GameSidePanel";
import VideoBanner from "@/components/VideoBanner";
import { OTHER_PROJECTS_CONFIG, OtherProject } from "@/data/otherProjects";
import { useState } from "react";
import { calculateNewspaperGridProps } from "@/utils/newspaperGrid";
import Image from "next/image";

export default function Projects() {
  const [selectedItem, setSelectedItem] = useState<OtherProject | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

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

      {/* Hero Video Banner */}
      <VideoBanner title="projects" subtitle="some fun things i've designed" />

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

