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

  // Pre-fetch games data to warm up the cache for faster load on /games page
  useEffect(() => {
    // Prefetch the /games route for faster navigation
    router.prefetch('/games');
    
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
            } catch (e) {
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
  }, []);

  // Tools I know how to use
  const tools = [
    { name: 'Figma', image: '/images/figma.png' },
    { name: 'Unity', image: '/images/unity-logo.png' },
    { name: 'Python', image: '/images/python-logo.png' },
    { name: 'React', image: '/images/react-logo.png' },
    { name: 'C#', image: '/images/csharp-logo.png' },
    { name: 'C++', image: '/images/cplusplus-logo.png' },
    { name: 'Cursor', image: '/images/cursor.png' },
    { name: 'HTML5', image: '/images/html5.png' },
  ];

  const leadershipAchievements = [
    {
      id: "leadership-svgd",
      title: "Founder & President, Stanford Game Development (SVGD)",
      period: "2022 — Present",
      location: "Stanford University",
      description:
        "I started and lead Stanford's game development club to make it easier for students to find collaborators, showcase work, and learn in the open.",
      highlights: [
        "Plan and run jams, socials, and showcase events with hundreds of participants each quarter.",
        "Build onboarding pathways so newcomers can ship a playable prototype in under a week.",
        "Coordinate mentorship and critique sessions pairing student teams with industry guests.",
      ],
    },
    {
      id: "leadership-teaching",
      title: "Course Designer & Teaching Staff for Playful CS Courses",
      period: "2021 — Present",
      location: "Stanford & International Programs",
      description:
        "I design and teach courses that use interactive narratives and prototyping to make programming intuitive, joyful, and collaborative.",
      highlights: [
        "Develop curricula that blend storytelling, rapid prototyping, and core CS concepts.",
        "Teach workshops and courses in South Korea and Silicon Valley focused on creative coding.",
        "Mentor teaching teams on how to run project-based critiques with both kindness and rigor.",
      ],
    },
    {
      id: "leadership-product-research",
      title: "Product & Research Work on Incentive-Driven Learning",
      period: "Ongoing",
      location: "Industry & Independent Research",
      description:
        "I prototype systems that explore how incentives and game-like structures influence learning, collaboration, and behavior.",
      highlights: [
        "Design simulation-style tools, including a customer-management game used in STRAMGT 351.",
        "Run longitudinal experiments that measure how different incentive structures shape group dynamics.",
        "Translate research findings into product specs and service blueprints for partners.",
      ],
    },
  ];

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
          className="flex-1 flex flex-col lg:flex-row relative overflow-hidden"
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
          <div className="relative z-10 w-full lg:w-2/5 flex-1 lg:flex-none flex items-center justify-center bg-transparent lg:bg-gray-200 p-8 md:p-12">
            <div className="flex flex-col items-start text-left max-w-lg w-full space-y-6">
              {/* Main Heading */}
              <h1 className="text-6xl font-bold text-white lg:text-black">
                lucas wang!
              </h1>

              {/* Descriptive Text */}
              <p className="text-base md:text-lg text-white lg:text-black font-medium">
                I&apos;m a product designer crafting interactive experiences through game development, incentive design, and education!
              </p>

              {/* Tools Row */}
              <div className="inline-grid grid-cols-4 gap-3 md:gap-4">
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
                  href="/games"
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer min-w-[160px]"
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
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer min-w-[160px]"
                  aria-label="View projects"
                >
                  <span>View Projects</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Video (only on large screens and up) */}
          <div className="hidden lg:block flex-1 relative bg-gray-800">
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
                  <i>Hi! These are games I&apos;ve worked on! :)</i>
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
            ▼ Explore What I&apos;m Working On ▼
          </div>
        </div>
      </div>

      {/* Leadership & Achievements Section */}
      <Section separator={false} container={true} padding={true} className="bg-white">
        <div className="space-y-8 md:space-y-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Leadership &amp; Achievements
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-700">
              A few of the roles and projects that shape how I design, teach, and build communities
              around games and creative technology.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {leadershipAchievements.map((item) => (
              <article
                key={item.id}
                className="flex flex-col h-full rounded-2xl border border-gray-200 bg-white shadow-sm px-5 py-5 md:px-6 md:py-6"
              >
                <header className="flex flex-col gap-1 mb-3">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-600">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 font-medium">
                      {item.period}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span>{item.location}</span>
                  </div>
                </header>

                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {item.description}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-3 md:mt-4 space-y-1.5 text-sm md:text-sm text-gray-700 list-disc pl-5">
                    {item.highlights.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
