"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Pre-fetch games data to warm up the cache for faster load on /projects page
  useEffect(() => {
    // Prefetch the /projects route for faster navigation
    router.prefetch('/projects');
    
    const prefetchGames = async () => {
      try {
        // Check if we already have valid cached data
        const CACHE_KEY = 'itch-games-cache';
        const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
        
        if (typeof window !== 'undefined' && window.localStorage) {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            try {
              const cachedData = JSON.parse(cached);
              const now = Date.now();
              
              // If cache is still valid, no need to prefetch
              if (now - cachedData.timestamp < CACHE_DURATION) {
                return;
              }
            } catch {
              // Invalid cache, continue to fetch
            }
          }
        }

        // Fetch games data in the background
        const response = await fetch('/api/itch-games');
        
        if (response.ok) {
          const data = await response.json();
          
          // Cache the data using the same format as useGames hook
          if (typeof window !== 'undefined' && window.localStorage) {
            try {
              const cacheData = {
                data: data,
                timestamp: Date.now(),
              };
              localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
            } catch (e) {
              // localStorage might be full, continue anyway
              console.warn('Failed to cache games data during prefetch:', e);
            }
          }
        }
      } catch (error) {
        // Silently fail - prefetching shouldn't break the page
        console.warn('Failed to prefetch games data:', error);
      }
    };

    // Prefetch after a short delay to not block initial render
    const timeoutId = setTimeout(prefetchGames, 100);
    
    return () => clearTimeout(timeoutId);
  }, [router]);

  // Tools I know how to use
  const tools = [
    { name: 'Figma', image: '/images/figma.png' },
    { name: 'Unity', image: '/images/unity-logo.png' },
    { name: 'Python', image: '/images/python-logo.png' },
    { name: 'React', image: '/images/react-logo.png' },
    { name: 'C#', image: '/images/csharp-logo.png' },
    { name: 'C++', image: '/images/cplusplus-logo.png' },
    { name: 'HTML5', image: '/images/html5.png' },
    { name: 'Cursor', image: '/images/cursor.png' },
  ];

  const experienceHighlights = [
    {
      id: "experience-product-research",
      card: {
        href: "/projects",
        ariaLabel: "Explore projects from my product design and research work",
        imageSrc: "/images/alwaysbeclosing.png",
        imageAlt: "simulation and product design interface",
        badgeLabel: "Product & Research",
        badgeClassName: "bg-green-600",
        badgeTextClassName: "text-white",
        prefixText: "My work is mission-first and user-centered. I'm",
        title: "Designing Interactive Systems",
        description:
          "If you're going to make a game, why not make it solve a problem, too? At work and through independent research, I design user-centered experiences like virtual reality products for the elderly and multiplayer games to bring people together. ",
        ringColorClassName: "focus:ring-green-500",
        subButtonLabel: "View Projects",
      },
    },
    {
      id: "experience-community-clubs",
      card: {
        href: "/projects",
        ariaLabel: "Explore my experience with games",
        imageSrc: "/images/svgdmeeting.png",
        imageAlt: "stanford game development club meeting",
        badgeLabel: "Game Development",
        badgeClassName: "bg-yellow-400",
        badgeTextClassName: "text-black",
        prefixText: "I also find strong community important. I'm",
        title: "Promoting Game Design at Stanford",
        description:
          "Stanford students don't play enough games, let alone make them. As the founder of our game development club, I've hosted tens of events with hundreds of participants, including jams, socials, and playtests that help game designers find community. I also make lots of games!",
        ringColorClassName: "focus:ring-yellow-400",
        subButtonLabel: "View Games",
      },
    },
    {
      id: "experience-teaching",
      card: {
        href: "/about",
        ariaLabel: "Learn more about my teaching at Stanford",
        imageSrc: "/images/meteaching.jpg",
        imageAlt: "lucas teaching playful coding projects in class",
        badgeLabel: "Teaching",
        badgeClassName: "bg-blue-500",
        badgeTextClassName: "text-white",
        prefixText: "Did I mention, I also love teaching? I'm also",
        title: "Teaching Playful CS Courses",
        description:
          "Outside of lecturing for CS11SI, CS42SI, CS106A/B, and CS247G as an *undergraduate* at Stanford, I've taught game design internationally in South Korea. I love using interactive narratives to make programming intuitive, joyful, and collaborative.",
        ringColorClassName: "focus:ring-blue-500",
        subButtonLabel: "View About Me",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col pt-[56px] relative">
      <Navigation />

      {/* Hero Section - Fixed Static Container */}
      <div 
        className="fixed top-[56px] left-0 right-0 z-0"
        style={{ 
          height: 'calc(100vh - 56px - 64px)',
        }}
      >
        {/* Hero Section - Left/Right Split */}
        <div 
          className="h-full flex flex-col lg:flex-row relative overflow-hidden"
        >
          {/* Background Image for small and medium screens */}
          <div className="absolute inset-0 block lg:hidden">
            <Image
              src="/images/teachinggame.jpg"
              alt="Game development showcase background"
              fill
              priority
              className="object-cover"
            />
            {/* Dark overlay to keep background very subdued */}
            <div className="absolute inset-0 bg-black/70"></div>
          </div>

          {/* Left Side - Text Content */}
          <div className="relative z-30 w-full lg:w-2/5 flex-1 lg:flex-none flex items-center justify-center bg-transparent lg:bg-gray-200 p-8 md:p-12">
            <div className="flex flex-col items-start text-left max-w-lg w-full space-y-6">
              {/* Main Heading */}
              <h1 className="text-6xl font-bold text-white lg:text-black leading-tight space-y-1">
                <span className="block text-base md:text-lg font-medium text-white lg:text-black">
                  Hey there! I&apos;m
                </span>
                <span className="block text-5xl xl:text-6xl font-bold">
                  lucas wang,
                </span>
              </h1>

              {/* Descriptive Text */}
              <p className="text-base md:text-lg text-white lg:text-black font-medium">
                a UI/UX designer crafting interactive experiences through game development, incentive design, and education!
              </p>

              {/* Tools Row */}
              <div className="grid grid-cols-4 gap-3 md:gap-4 items-center justify-items-center tools-row-wrap">
                {tools.map((tool, index) => (
                  <div
                    key={index}
                     className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300 p-2"
                  >
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      {tool.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/about"
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                  aria-label="About me"
                >
                  <span>About Me</span>
                </Link>
                <Link 
                  href="/projects"
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                  aria-label="View work"
                >
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:scale-110" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>View Projects</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Image (only on large screens and up) */}
          <div className="hidden lg:block flex-1 relative bg-gray-800">
            <Image
              src="/images/teachinggame.jpg"
              alt="Game development showcase background"
              fill
              priority
              className="object-cover"
            />
            {/* Dark overlay to keep background very subdued */}
            <div className="absolute inset-0 bg-black/20"></div>
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
                  <i>Welcome! Most of my work is digital and playable here!</i>
                </p>
              </div>
              {/* Headshot Circle */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src="/images/dschoolheadshot.png"
                  alt="Lucas Wang"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to push content - positioned so yellow bar appears at bottom of viewport */}
      <div style={{ height: 'calc(100vh - 56px - 64px)' }} className="relative z-20 pointer-events-none" />

      {/* Content Section - Scrolls over hero */}
      <div className="relative z-20 bg-white">
        {/* Yellow Bar - visible at bottom of viewport */}
        <div className="w-full bg-yellow-400 py-4">
          <div className="text-center text-black font-semibold">
            ▼ Explore What I&apos;m Doing ▼
          </div>
        </div>
        {/* Experience Overview Section */}
        <Section separator={false} container={true} padding={true} className="bg-white">
        <div className="space-y-16 md:space-y-20">
          {experienceHighlights.map(({ id, card }, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={id}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}
              >
                {/* Image */}
                <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-[3/2]">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                
                {/* Text Content */}
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="space-y-1">
                    {card.prefixText && (
                      <span className="block text-base md:text-lg font-medium text-black/70">
                        {card.prefixText}
                      </span>
                    )}
                    <h3 className="text-3xl md:text-4xl font-bold text-black">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-black/80 leading-relaxed">
                    {card.description}
                  </p>
                  {card.subButtonLabel && (
                    <div className="pt-2">
                      <Link
                        href={card.href}
                        aria-label={card.ariaLabel}
                        className={`group inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer ${
                          card.href === '/projects' 
                            ? 'bg-green-600 hover:bg-green-600' 
                            : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                        {card.href === '/projects' && (
                          <svg 
                            className="w-5 h-5 transition-transform group-hover:scale-110" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                        <span>{card.subButtonLabel}</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        </Section>
      </div>

      {/* Footer - Higher z-index to appear above content */}
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
}
