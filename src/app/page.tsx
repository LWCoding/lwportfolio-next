"use client";

import DesignModal from "@/components/DesignModal";
import ProjectCard from "@/components/ProjectCard";
import OtherProjectCard from "@/components/OtherProjectCard";
import HorizontalGallery from "@/components/HorizontalGallery";
import { useGames } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG } from "@/data/otherProjects";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const { featuredGames, otherGames, loading, error } = useGames();
  
  // Drag state for individual elements
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({
    stanfordLogo: { x: 0, y: 0 },
    name: { x: 0, y: 0 },
    title: { x: 0, y: 0 },
    description: { x: 0, y: 0 },
    itchIcon: { x: 0, y: 0 },
    githubIcon: { x: 0, y: 0 },
    linkedinIcon: { x: 0, y: 0 },
    designButton: { x: 0, y: 0 }
  });

  // Drag handlers for individual elements
  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    setDragOffset({
      x: e.clientX - positions[elementId].x,
      y: e.clientY - positions[elementId].y
    });
    setDraggedElement(elementId);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggedElement) {
      setHasDragged(true);
      setPositions(prev => ({
        ...prev,
        [draggedElement]: {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        }
      }));
    }
  };

  const handleMouseUp = () => {
    setDraggedElement(null);
    // Reset hasDragged after a short delay to allow click events to be processed
    setTimeout(() => setHasDragged(false), 10);
  };

  // Check if we should prevent click events (if element was dragged)
  const [hasDragged, setHasDragged] = useState(false);

  // Reset all positions to original
  const resetPositions = () => {
    setPositions({
      stanfordLogo: { x: 0, y: 0 },
      name: { x: 0, y: 0 },
      title: { x: 0, y: 0 },
      description: { x: 0, y: 0 },
      itchIcon: { x: 0, y: 0 },
      githubIcon: { x: 0, y: 0 },
      linkedinIcon: { x: 0, y: 0 },
      designButton: { x: 0, y: 0 }
    });
  };

  // Add event listeners for drag
  useEffect(() => {
    if (draggedElement) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedElement, dragOffset]);

  // Playful blue and orange gradient classes for variety
  const gradientClasses = [
    "from-blue-400/20 to-blue-600/20",
    "from-orange-400/20 to-orange-600/20", 
    "from-blue-300/20 to-orange-400/20",
    "from-orange-300/20 to-blue-500/20",
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* Unity Editor Style Hero Section */}
      <div className="h-screen flex bg-gray-900 overflow-x-hidden">
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
              
              {/* Projects - Toggle Button */}
              <div className="mt-2">
                <div 
                  className={`border border-gray-600/50 rounded px-2 py-1 cursor-pointer transition-colors ${
                    showProjects 
                      ? 'bg-blue-600/20 border-blue-500/30' 
                      : 'bg-gray-700/50 hover:bg-gray-600/50'
                  }`}
                  onClick={() => setShowProjects(!showProjects)}
                >
                  <span className={`text-sm font-medium ${
                    showProjects ? 'text-blue-300' : 'text-gray-300'
                  }`}>
                    Projects
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Area - Scene View */}
          <div className="flex-1 bg-gray-900 relative overflow-hidden">
            {/* Unity Grid Background */}
            <div className="absolute inset-0 opacity-40">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            
            
            {/* Reset Button */}
            <div className="absolute bottom-4 right-4 z-20">
              <button
                onClick={resetPositions}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-2 rounded border border-gray-600 text-sm font-medium transition-colors cursor-pointer"
                title="Reset all elements to original positions"
              >
                Reset Layout
              </button>
            </div>

            {/* Scene Content - Introduction */}
            <div className="h-full flex items-center justify-center p-8 relative z-10">
              <div className="max-w-4xl text-center space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <div 
                      className="group relative cursor-move select-none"
                      style={{
                        transform: `translate(${positions.stanfordLogo.x}px, ${positions.stanfordLogo.y}px)`,
                        transition: draggedElement === 'stanfordLogo' ? 'none' : 'transform 0.2s ease-out'
                      }}
                      onMouseDown={(e) => handleMouseDown(e, 'stanfordLogo')}
                    >
                      <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                      <Image 
                        src="/images/stanfordlogo.avif" 
                        alt="Stanford University Logo" 
                        width={60}
                        height={60}
                        className="w-12 h-12 md:w-16 md:h-16 object-contain relative z-10"
                      />
                    </div>
                    <div 
                      className="group relative cursor-move select-none"
                      style={{
                        transform: `translate(${positions.name.x}px, ${positions.name.y}px)`,
                        transition: draggedElement === 'name' ? 'none' : 'transform 0.2s ease-out'
                      }}
                      onMouseDown={(e) => handleMouseDown(e, 'name')}
                    >
                      <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                      <h1 className="text-4xl md:text-6xl font-bold text-white relative z-10">
                        Lucas Wang
                      </h1>
                    </div>
                  </div>
                  <div 
                    className="group relative cursor-move select-none"
                    style={{
                      transform: `translate(${positions.title.x}px, ${positions.title.y}px)`,
                      transition: draggedElement === 'title' ? 'none' : 'transform 0.2s ease-out'
                    }}
                    onMouseDown={(e) => handleMouseDown(e, 'title')}
                  >
                    <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                    <p className="text-xl md:text-2xl text-blue-400 font-semibold relative z-10">
                      Game Designer & Lifelong Learner
                    </p>
                  </div>
                  <div 
                    className="group relative cursor-move select-none"
                    style={{
                      transform: `translate(${positions.description.x}px, ${positions.description.y}px)`,
                      transition: draggedElement === 'description' ? 'none' : 'transform 0.2s ease-out'
                    }}
                    onMouseDown={(e) => handleMouseDown(e, 'description')}
                  >
                    <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto relative z-10">
                      Hey there! I&apos;m an undergraduate at Stanford University who loves bringing silly ideas to life through games. I also love nerding out and teaching game development to others. :)
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4">
                  {/* Itch.io */}
                  <div 
                    className="group relative cursor-move select-none"
                    style={{
                      transform: `translate(${positions.itchIcon.x}px, ${positions.itchIcon.y}px)`,
                      transition: draggedElement === 'itchIcon' ? 'none' : 'transform 0.2s ease-out'
                    }}
                    onMouseDown={(e) => handleMouseDown(e, 'itchIcon')}
                  >
                    <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                    <a 
                      href="https://lwcoding.itch.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-gray-700 rounded-full overflow-hidden shadow-lg flex items-center justify-center border border-gray-600 cursor-pointer relative z-10"
                      aria-label="Visit my Itch.io profile"
                      onClick={(e) => {
                        if (hasDragged) {
                          e.preventDefault();
                        }
                      }}
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
                  <div 
                    className="group relative cursor-move select-none"
                    style={{
                      transform: `translate(${positions.githubIcon.x}px, ${positions.githubIcon.y}px)`,
                      transition: draggedElement === 'githubIcon' ? 'none' : 'transform 0.2s ease-out'
                    }}
                    onMouseDown={(e) => handleMouseDown(e, 'githubIcon')}
                  >
                    <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                    <a 
                      href="https://github.com/LWCoding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-gray-700 rounded-full overflow-hidden shadow-lg flex items-center justify-center border border-gray-600 cursor-pointer relative z-10"
                      aria-label="Visit my GitHub profile"
                      onClick={(e) => {
                        if (hasDragged) {
                          e.preventDefault();
                        }
                      }}
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
                  <div 
                    className="group relative cursor-move select-none"
                    style={{
                      transform: `translate(${positions.linkedinIcon.x}px, ${positions.linkedinIcon.y}px)`,
                      transition: draggedElement === 'linkedinIcon' ? 'none' : 'transform 0.2s ease-out'
                    }}
                    onMouseDown={(e) => handleMouseDown(e, 'linkedinIcon')}
                  >
                    <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                    <a 
                      href="https://www.linkedin.com/in/lucas-wang-3160b720a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-gray-700 rounded-full overflow-hidden shadow-lg flex items-center justify-center border border-gray-600 cursor-pointer relative z-10"
                      aria-label="Visit my LinkedIn profile"
                      onClick={(e) => {
                        if (hasDragged) {
                          e.preventDefault();
                        }
                      }}
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
                
                <div 
                  className="pt-2 cursor-move select-none inline-block"
                  style={{
                    transform: `translate(${positions.designButton.x}px, ${positions.designButton.y}px)`,
                    transition: draggedElement === 'designButton' ? 'none' : 'transform 0.2s ease-out'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, 'designButton')}
                >
                  <div className="group relative cursor-pointer inline-block">
                    <div className="absolute inset-0 border-0 group-hover:border group-hover:border-blue-400/50"></div>
                    <button
                      onClick={(e) => {
                        if (hasDragged) {
                          e.preventDefault();
                        } else {
                          setIsDesignModalOpen(true);
                        }
                      }}
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

      {/* Projects Section */}
      {showProjects && (
        <div className="bg-gray-900 min-h-screen py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Featured Games Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Featured Games
              </h2>
              {loading ? (
                <div className="text-center text-gray-400">Loading games...</div>
              ) : error ? (
                <div className="text-center text-red-400">Error loading games: {error}</div>
              ) : featuredGames && featuredGames.length > 0 ? (
                <HorizontalGallery games={featuredGames} />
              ) : (
                <div className="text-center text-gray-400">No featured games available</div>
              )}
            </div>

            {/* Other Projects Section */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Other Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
          </div>
        </div>
      )}

      {/* Design Modal */}
      <DesignModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
      />
    </div>
  );
}