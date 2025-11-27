"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { useGames } from "@/hooks/useFeaturedGames";
import { OTHER_PROJECTS_CONFIG } from "@/data/otherProjects";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { featuredGames, otherGames, loading } = useGames();
  const [animatedProjects, setAnimatedProjects] = useState(0);
  const [animatedViews, setAnimatedViews] = useState(0);

  // Calculate totals
  const totalProjects = featuredGames.length + otherGames.length + OTHER_PROJECTS_CONFIG.length;
  const totalViews = [...featuredGames, ...otherGames].reduce((sum, game) => {
    return sum + (game.views_count || 0);
  }, 0);

  // Get a few featured projects for preview (first 3)
  const previewProjects = OTHER_PROJECTS_CONFIG.slice(0, 3);
  const previewGames = featuredGames.slice(0, 3);

  // Animate counters
  useEffect(() => {
    if (!loading && totalProjects > 0) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepTime = duration / steps;
      
      const projectsStep = totalProjects / steps;
      const viewsStep = totalViews / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setAnimatedProjects(Math.min(Math.floor(projectsStep * currentStep), totalProjects));
          setAnimatedViews(Math.min(Math.floor(viewsStep * currentStep), totalViews));
        } else {
          setAnimatedProjects(totalProjects);
          setAnimatedViews(totalViews);
          clearInterval(interval);
        }
      }, stepTime);
      
      return () => clearInterval(interval);
    }
  }, [loading, totalProjects, totalViews]);


  return (
    <div className="min-h-screen bg-white flex flex-col pt-[56px]">
      <Navigation />

      {/* Hero Section Container - Takes up 100vh minus navbar */}
      <div 
        className="flex flex-col"
        style={{ height: 'calc(100vh - 56px)' }}
      >
        {/* Hero Section - Left/Right Split */}
        <div 
          className="flex-1 flex flex-col md:flex-row relative overflow-hidden"
        >
          {/* Left Side - Text Content */}
          <div className="w-full md:w-2/5 flex items-center justify-center bg-gray-200 p-8 md:p-12">
            <div className="flex flex-col items-start text-left max-w-lg w-full space-y-6">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl font-bold text-black">
                lucas wang!
              </h1>

              {/* Descriptive Text */}
              <p className="text-base md:text-lg text-black font-medium">
                crafting interactive experiences through game development, incentive design, and education.
              </p>

              {/* Stats Counter */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-black">
                <div className="text-left">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-600">
                    {loading ? '...' : animatedProjects.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm font-medium mt-0.5">
                    Projects
                  </div>
                </div>
                <div className="hidden md:block w-px h-8 bg-black/20"></div>
                <div className="text-left">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-600">
                    {loading ? '...' : animatedViews.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm font-medium mt-0.5">
                    Total Views
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/games"
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                  aria-label="View games"
                >
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:scale-110" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>Play Games</span>
                </Link>
                <Link 
                  href="/projects"
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                  aria-label="View projects"
                >
                  <span>View Projects</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Video */}
          <div className="flex-1 relative bg-gray-800">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/GameShowcase.mp4" type="video/mp4" />
            </video>
            {/* Darker overlay on small devices */}
            <div className="absolute inset-0 bg-black/40 md:bg-transparent z-10"></div>
            {/* Vignette overlay - darker at edges of entire video */}
            <div 
              className="absolute inset-0 z-15 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.5) 100%)'
              }}
            ></div>
            {/* Text and Headshot - Bottom Right */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20 flex items-center gap-3 md:gap-4">
              {/* Dialogue Box - Left of headshot */}
              <div className="relative bg-white/95 rounded-lg px-3 py-2 md:px-4 md:py-2.5 shadow-lg mr-2 md:mr-3">
                {/* Speech bubble tail pointing right */}
                <div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0"
                  style={{
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderLeft: '10px solid rgba(255, 255, 255, 0.95)'
                  }}
                ></div>
                <p className="text-black text-sm md:text-base font-medium whitespace-nowrap">
                  <i>hi! these are games i&apos;ve worked on! :)</i>
                </p>
              </div>
              {/* Headshot Circle */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src="/images/dschoolheadshot.png"
                  alt="Lucas Wang"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Yellow Bar */}
        <div className="w-full bg-yellow-400 py-4 flex-shrink-0">
          <div className="text-center text-black font-semibold">
            ▼ explore my work ▼
          </div>
        </div>
      </div>

      {/* Projects Preview Section */}
      <Section separator={false} container={true} padding={true} className="bg-white">
        <div className="space-y-12">
          {/* Projects Preview */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-black">Projects</h2>
              <Link 
                href="/projects"
                className="text-blue-600 hover:text-blue-800 font-semibold underline transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {previewProjects.map((project) => (
                <Link
                  key={project.id}
                  href="/projects"
                  className="group relative aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-teal-500/20"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                    <p className="text-white/90 text-sm line-clamp-2">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Games Preview */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-black">Games</h2>
              <Link 
                href="/games"
                className="text-blue-600 hover:text-blue-800 font-semibold underline transition-colors"
              >
                View All →
              </Link>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-video bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : previewGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {previewGames.map((game) => (
                  <Link
                    key={game.id}
                    href="/games"
                    className="group relative aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {(game.still_cover_url || game.cover_url) ? (
                      <Image
                        src={(game.still_cover_url || game.cover_url) as string}
                        alt={game.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-1">{game.title}</h3>
                      <p className="text-white/90 text-sm line-clamp-2">{game.short_text || "An exciting game experience awaits!"}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
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

    </div>
  );
}
