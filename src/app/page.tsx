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
  const [activeTab, setActiveTab] = useState<'games' | 'other-projects' | null>(null);
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

  // Project positions - initialize with random positions
  const [projectPositions, setProjectPositions] = useState<Record<string, { x: number; y: number }>>({});

  // Initialize project positions in a circle around the center
  useEffect(() => {
    const getCurrentProjects = () => {
      if (activeTab === 'games') {
        // Show all games (featured + other games)
        const allGames = [
          ...(featuredGames || []),
          ...(otherGames || [])
        ];
        return allGames.map(game => ({ id: `game-${game.id}`, type: 'game' }));
      } else if (activeTab === 'other-projects') {
        return OTHER_PROJECTS_CONFIG.map(project => ({ id: `project-${project.id}`, type: 'project' }));
      }
      return [];
    };
    
    const currentProjects = getCurrentProjects();
    
    if (currentProjects.length > 0) {
      const newPositions: Record<string, { x: number; y: number }> = {};
      const totalProjects = currentProjects.length;
      const radius = 300; // Distance from center
      
      currentProjects.forEach((item, index) => {
        // Calculate position in circle
        const angle = (2 * Math.PI * index) / totalProjects;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        newPositions[item.id] = { x, y };
      });
      
      setProjectPositions(newPositions);
    }
  }, [activeTab, featuredGames, OTHER_PROJECTS_CONFIG]);

  // Drag handlers for individual elements
  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    const currentPositions = elementId.startsWith('game-') || elementId.startsWith('project-') 
      ? projectPositions 
      : positions;
    
    setDragOffset({
      x: e.clientX - currentPositions[elementId].x,
      y: e.clientY - currentPositions[elementId].y
    });
    setDraggedElement(elementId);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setHasDragged(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggedElement && dragStartPos) {
      // Only set hasDragged if we've moved more than 5 pixels
      const distance = Math.sqrt(
        Math.pow(e.clientX - dragStartPos.x, 2) + Math.pow(e.clientY - dragStartPos.y, 2)
      );
      
      if (distance > 5) {
        setHasDragged(true);
      }
      
      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      };
      
      if (draggedElement.startsWith('game-') || draggedElement.startsWith('project-')) {
        setProjectPositions(prev => ({
          ...prev,
          [draggedElement]: newPosition
        }));
      } else {
        setPositions(prev => ({
          ...prev,
          [draggedElement]: newPosition
        }));
      }
    }
  };

  const handleMouseUp = () => {
    setDraggedElement(null);
    setDragStartPos(null);
    // Reset hasDragged after a short delay to allow click events to be processed
    setTimeout(() => setHasDragged(false), 50);
  };

  // Check if we should prevent click events (if element was dragged)
  const [hasDragged, setHasDragged] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);

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
    
    // Reset project positions to circle around center based on active tab
    const getCurrentProjects = () => {
      if (activeTab === 'games') {
        // Show all games (featured + other games)
        const allGames = [
          ...(featuredGames || []),
          ...(otherGames || [])
        ];
        return allGames.map(game => `game-${game.id}`);
      } else if (activeTab === 'other-projects') {
        return OTHER_PROJECTS_CONFIG.map(project => `project-${project.id}`);
      }
      return [];
    };
    
    const currentProjects = getCurrentProjects();
    
    if (currentProjects.length > 0) {
      const newProjectPositions: Record<string, { x: number; y: number }> = {};
      const totalProjects = currentProjects.length;
      const radius = 300; // Distance from center
      
      currentProjects.forEach((id, index) => {
        // Calculate position in circle
        const angle = (2 * Math.PI * index) / totalProjects;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        newProjectPositions[id] = { x, y };
      });
      
      setProjectPositions(newProjectPositions);
    }
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

  // Small draggable project card component
  const DraggableProjectCard = ({ 
    id, 
    title, 
    href, 
    coverImage, 
    gradientClass,
    viewCount,
    isGame = false,
    description,
    tags,
    createdAt
  }: {
    id: string;
    title: string;
    href: string;
    coverImage?: string;
    gradientClass: string;
    viewCount?: number;
    isGame?: boolean;
    description?: string;
    tags?: string[];
    createdAt?: string;
  }) => {
    const position = projectPositions[id] || { x: 0, y: 0 };
    
    return (
      <div 
        className="group absolute cursor-move select-none"
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
          transition: draggedElement === id ? 'none' : 'transform 0.2s ease-out'
        }}
        onMouseDown={(e) => handleMouseDown(e, id)}
      >
        <div className="absolute -inset-1 border-0 group-hover:border group-hover:border-blue-400/50 rounded-lg"></div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 w-96 shadow-lg">
            <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
            {description && (
              <p className="text-xs text-gray-300 mb-2 line-clamp-3">{description}</p>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-blue-600/20 text-blue-300 px-2 py-0.5 rounded text-xs">
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="text-xs text-gray-400">+{tags.length - 3} more</span>
                )}
              </div>
            )}
            {viewCount && (
              <div className="text-xs text-gray-400">
                {viewCount > 1000 ? `${(viewCount/1000).toFixed(1)}K` : viewCount} views
              </div>
            )}
            {createdAt && (
              <div className="text-xs text-gray-400">
                {new Date(createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </div>
            )}
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
        </div>
        
        <div className="w-40 h-24 bg-gray-700/80 rounded-lg border border-gray-600 overflow-hidden shadow-lg relative z-10">
          <div className={`w-full h-full ${!coverImage ? `bg-gradient-to-br ${gradientClass} flex items-center justify-center` : ''}`}>
            {coverImage ? (
              <Image 
                src={coverImage} 
                alt={title}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-xs text-white font-medium text-center px-2 break-words leading-tight">{title}</span>
            )}
          </div>
          {viewCount && (
            <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm px-1 py-0.5 rounded text-xs">
              <span className="text-white text-xs">{viewCount > 1000 ? `${(viewCount/1000).toFixed(1)}K` : viewCount}</span>
            </div>
          )}
        </div>
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-20"
          onClick={(e) => {
            // Only prevent if we actually dragged (moved more than 5 pixels)
            if (hasDragged) {
              e.preventDefault();
              return;
            }
            // Allow the link to open normally
          }}
        />
      </div>
    );
  };

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
              {/* Introduction - Toggle Button */}
              <div 
                className={`border border-gray-600/50 rounded px-2 py-1 cursor-pointer transition-colors ${
                  activeTab === null && !showProjects
                    ? 'bg-blue-600/20 border-blue-500/30' 
                    : 'bg-gray-700/50 hover:bg-gray-600/50'
                }`}
                onClick={() => {
                  setActiveTab(null);
                  setShowProjects(false);
                }}
              >
                <span className={`text-sm font-medium ${
                  activeTab === null && !showProjects ? 'text-blue-300' : 'text-gray-300'
                }`}>
                  Introduction
                </span>
              </div>
              
              {/* Games Tab */}
              <div className="mt-2">
                <div 
                  className={`border border-gray-600/50 rounded px-2 py-1 cursor-pointer transition-colors ${
                    activeTab === 'games' 
                      ? 'bg-blue-600/20 border-blue-500/30' 
                      : 'bg-gray-700/50 hover:bg-gray-600/50'
                  }`}
                  onClick={() => {
                    setActiveTab(activeTab === 'games' ? null : 'games');
                    setShowProjects(activeTab === 'games' ? false : true);
                  }}
                >
                  <span className={`text-sm font-medium ${
                    activeTab === 'games' ? 'text-blue-300' : 'text-gray-300'
                  }`}>
                    Games
                  </span>
                </div>
              </div>

              {/* Other Projects Tab */}
              <div className="mt-2">
                <div 
                  className={`border border-gray-600/50 rounded px-2 py-1 cursor-pointer transition-colors ${
                    activeTab === 'other-projects' 
                      ? 'bg-blue-600/20 border-blue-500/30' 
                      : 'bg-gray-700/50 hover:bg-gray-600/50'
                  }`}
                  onClick={() => {
                    setActiveTab(activeTab === 'other-projects' ? null : 'other-projects');
                    setShowProjects(activeTab === 'other-projects' ? false : true);
                  }}
                >
                  <span className={`text-sm font-medium ${
                    activeTab === 'other-projects' ? 'text-blue-300' : 'text-gray-300'
                  }`}>
                    Other Projects
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

            {/* Scene Content - Conditional */}
            <div className="h-full p-8 relative z-10 overflow-y-auto">
              {!showProjects && activeTab === null ? (
                // Introduction Content
                <div className="h-full flex items-center justify-center">
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
              ) : activeTab === 'games' ? (
                // Games Content - Draggable Cards
                <div className="h-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400 mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">All Games</h2>
                      <p className="text-sm">Drag the cards around to explore!</p>
                    </div>
                  </div>
                  
                  {/* All Games Cards */}
                  {!loading && !error && (
                    <>
                      {/* Featured Games */}
                      {featuredGames && featuredGames.length > 0 && featuredGames.map((game, index) => (
                        <DraggableProjectCard
                          key={`game-${game.id}`}
                          id={`game-${game.id}`}
                          title={game.title}
                          href={game.url}
                          coverImage={game.cover_url || game.still_cover_url}
                          gradientClass={gradientClasses[index % gradientClasses.length]}
                          viewCount={game.views_count}
                          isGame={true}
                          description={game.short_text}
                          tags={game.tags}
                          createdAt={game.created_at}
                        />
                      ))}
                      
                      {/* Other Games */}
                      {otherGames && otherGames.length > 0 && otherGames.map((game, index) => (
                        <DraggableProjectCard
                          key={`game-${game.id}`}
                          id={`game-${game.id}`}
                          title={game.title}
                          href={game.url}
                          coverImage={game.cover_url || game.still_cover_url}
                          gradientClass={gradientClasses[(index + (featuredGames?.length || 0)) % gradientClasses.length]}
                          viewCount={game.views_count}
                          isGame={true}
                          description={game.short_text}
                          tags={game.tags}
                          createdAt={game.created_at}
                        />
                      ))}
                    </>
                  )}
                  
                  {/* Loading State */}
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
                        <p>Loading games...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Error State */}
                  {error && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-red-400">
                        <p>Error loading games: {error}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : activeTab === 'other-projects' ? (
                // Other Projects Content - Draggable Cards
                <div className="h-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400 mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Other Projects</h2>
                      <p className="text-sm">Drag the cards around to explore!</p>
                    </div>
                  </div>
                  
                  {/* Other Projects Cards */}
                  {OTHER_PROJECTS_CONFIG.map((project, index) => (
                    <DraggableProjectCard
                      key={`project-${project.id}`}
                      id={`project-${project.id}`}
                      title={project.title}
                      href={project.href}
                      coverImage={project.coverImage}
                      gradientClass={gradientClasses[index % gradientClasses.length]}
                      isGame={false}
                      description={project.description}
                      tags={project.tags}
                      createdAt={project.createdAt}
                    />
                  ))}
                </div>
              ) : null}
            </div>

        </div>
      </div>


      {/* Design Modal */}
      <DesignModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
      />
    </div>
  );
}