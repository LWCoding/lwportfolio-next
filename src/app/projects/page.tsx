"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import NewspaperGameCard from "@/components/NewspaperGameCard";
import DetailSidePanel from "@/components/DetailSidePanel";
import VideoBanner from "@/components/VideoBanner";
import Footer from "@/components/Footer";
import FeaturedItemCard from "@/components/FeaturedItemCard";
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
      <VideoBanner 
        title="projects" 
        subtitle="some fun things i've designed" 
        height="33vh"
        minHeight="200px"
      />

      {/* Featured Projects Section */}
      <Section separator={false} container={true} padding={true} className="bg-white">
        <div className="space-y-8 md:space-y-12">
          {OTHER_PROJECTS_CONFIG.slice(0, 3).map((project) => (
            <FeaturedItemCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageSrc={project.coverImage || "/images/scratchproject.png"}
              imageAlt={`${project.title} cover image`}
              tags={project.tags}
              platforms={project.platforms}
              date={project.createdAt}
              href={project.href}
              secondaryCtaLabel="view project"
              onClick={() => {
                setSelectedItem(project);
                setIsSidePanelOpen(false);
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    setIsSidePanelOpen(true);
                  });
                });
              }}
            />
          ))}
        </div>
      </Section>

      {/* Other Projects Section - Only show if there are more than 3 projects */}
      {OTHER_PROJECTS_CONFIG.length > 3 && (
        <Section id="other-projects" separator={false} container={false} padding={false} className="px-0">
          <div className="bg-blue-950">
            <div className="pt-6 md:pt-8 pb-6 md:pb-8">
              {/* Newspaper-style Projects Layout */}
              <div className="container mx-auto max-w-[1024px] px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 md:mb-4 text-center">other projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0">
                    {OTHER_PROJECTS_CONFIG.slice(3).map((project, index) => {
                    const gridProps = calculateNewspaperGridProps(index, OTHER_PROJECTS_CONFIG.length - 3);
                    const size: 'large' | 'medium' | 'small' = 'medium';
                    const isFirstCard = index === 0;
                    
                    return (
                      <div key={project.id} className={`${gridProps.columnSpan} p-2 md:p-3 ${isFirstCard ? 'relative' : ''}`} style={{ aspectRatio: '3/2' }}>
                        {/* Development Process Callout - Positioned above first card - Mobile only */}
                        {isFirstCard && (
                          <div className="md:hidden absolute -top-10 left-6 z-10 pointer-events-none" style={{ maxWidth: 'calc(100vw - 4rem)', minWidth: 'max-content' }}>
                            <div className="flex items-center gap-3">
                              {/* Curved Arrow pointing down to first card */}
                              <Image 
                                src="/images/curvedarrow.png"
                                alt=""
                                width={40}
                                height={40}
                                className="w-8 h-8 flex-shrink-0 mt-8"
                              />
                              {/* Text */}
                              <p className="text-white text-sm font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] whitespace-nowrap">
                                click to view more info!
                              </p>
                            </div>
                          </div>
                        )}
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
        </Section>
      )}

      <Footer />

      {/* Game/Project Detail Panel */}
      <DetailSidePanel
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

