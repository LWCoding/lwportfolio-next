"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HomeShowcaseCards, {
  type HomeShowcaseCardItem,
} from "@/components/HomeShowcaseCards";
import { getListingPillsForProject } from "@/data/projectListingPills";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Thin gray wave between experience blocks (same cubic rhythm: 200→600→1000).
 * Stronger vertical swings than before while keeping a slim ribbon (parallel edges).
 */
function ExperienceWaveDivider() {
  return (
    <div className="-my-1 bg-white md:-my-1.5" aria-hidden>
      <div className="mx-auto w-full max-w-[1280px] px-4">
        <svg
          viewBox="0 0 1200 34"
          className="block h-4 w-full text-gray-300 md:h-5"
          preserveAspectRatio="none"
          role="presentation"
        >
          <path
            fill="currentColor"
            d="M0,17 C20,17 40,9 72,9 C232,1 400,25 600,8 C800,0 968,29 1128,11 C1162,8 1190,16 1200,21 C1194,24 1176,27 1128,27 C968,31 800,17 600,27 C400,32 232,22 72,23 C40,24 22,22 0,17 Z"
          />
        </svg>
      </div>
    </div>
  );
}

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

  const experienceHighlights: {
    id: string;
    showcaseCards: HomeShowcaseCardItem[];
    card: {
      href: string;
      ariaLabel: string;
      imageSrc: string;
      imageAlt: string;
      badgeLabel: string;
      badgeClassName: string;
      badgeTextClassName: string;
      prefixText: string;
      title: string;
      description: string;
      ringColorClassName: string;
      subButtonLabel: string;
      /** Shown as underlined link below showcase cards; uses same href as the section CTA. */
      viewAllLabel: string;
    };
  }[] = [
    {
      id: "experience-product-research",
      showcaseCards: [
        {
          title: "Always Be Closing",
          description: "Be a salesperson and close simulated deals.",
          status: "ongoing",
          pills: ["For Work"],
          href: "/projects/always-be-closing",
          imageSrc: "/images/alwaysbeclosing.png",
          imageAlt: "Always Be Closing — product simulation interface",
        },
        {
          title: "ImmersifyVR",
          description: "VR fitness built for older adults.",
          status: "ongoing",
          pills: ["For Work"],
          href: "/projects/immersifyvr",
          imageSrc: "/images/immersifyvr.png",
          imageAlt: "ImmersifyVR virtual reality exercise product",
        },
        {
          title: "Planet",
          description: "Strengthen connections with your friends.",
          status: 2024,
          pills: ["For Work"],
          href: "/projects/planet",
          imageSrc: "/images/planet.png",
          imageAlt: "Planet mental health app project",
        },
      ],
      card: {
        href: "/projects#projects",
        viewAllLabel: "View All Projects",
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
      showcaseCards: [
        {
          title: "Aw, Rats",
          description: "GMTK 2025: Loop rats, protect the cheese.",
          status: 2025,
          pills: ["For Fun"],
          href: "/projects/3766251",
          imageSrc:
            "https://img.itch.zone/aW1hZ2UvMzc2NjI1MS8yMjQ5MDkzNy5wbmc=/original/0wOyqM.png",
          imageAlt: "Aw, Rats game cover art",
        },
        {
          title: "Kitchen Nightmares",
          description: "GMTK 2024: Manage a kitchen that keeps growing.",
          status: 2024,
          pills: ["For Fun"],
          href: "/projects/2904867",
          imageSrc:
            "https://img.itch.zone/aW1hZ2UvMjkwNDg2Ny8xNzQxNjgwNi5wbmc=/original/LTw9Sl.png",
          imageAlt: "Kitchen Nightmare game cover art",
        },
        {
          title: "Attack on Atliz",
          description: "Wonderjam 4: Every kill buys your next power spike.",
          status: 2024,
          pills: ["For Fun"],
          href: "/projects/1940212",
          imageSrc:
            "https://img.itch.zone/aW1hZ2UvMTk0MDIxMi8xMTU3Nzk0OC5wbmc=/original/wjcDW0.png",
          imageAlt: "Attack on Atliz game cover art",
        },
      ],
      card: {
        href: "/projects#games",
        viewAllLabel: "View All Games",
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
      showcaseCards: [
        {
          title: "CS42SI Course",
          description: "Teaching 2D Unity at Stanford. I founded the course!",
          status: "ongoing",
          pills: getListingPillsForProject("cs42si"),
          href: "/projects/cs42si",
          imageSrc: "/images/cs42si_fa2025.png",
          imageAlt: "CS42SI From Player to Maker course materials",
        },
        {
          title: "CS11SI Course",
          description: "Teaching XR with 3D Unity at Stanford.",
          status: "ongoing",
          pills: getListingPillsForProject("cs11si"),
          href: "/projects/cs11si",
          imageSrc: "/images/cs11si.png",
          imageAlt: "CS11SI Unity XR course website",
        },
        {
          title: "CS247G Course",
          description: "Teaching graduate-level game design at Stanford (SL).",
          status: "ongoing",
          pills: getListingPillsForProject("cs247g-course-sl"),
          href: "/projects/cs247g-course-sl",
          imageSrc: "/images/cs247g-syllabus.png",
          imageAlt: "CS247G graduate game design course",
        },
      ],
      card: {
        href: "/projects#teaching",
        viewAllLabel: "View All Teaching",
        ariaLabel: "Explore my teaching and course projects",
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
        subButtonLabel: "View Teaching",
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
        {/* Full-bleed mobile background (behind constrained hero content) */}
        <div className="absolute inset-0 z-0 block lg:hidden">
          <Image
            src="/images/cs377g-playtest.png"
            alt="Game development showcase background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Hero: full-viewport split — gray to the left edge, image to the right edge; text aligns with Section inner column */}
        <div className="relative z-10 flex h-full w-full flex-col overflow-hidden lg:flex-row">
          {/* Left Side - Text Content (pulls toward the split on wide viewports) */}
          <div className="relative z-30 flex w-full flex-1 flex-col items-center justify-center bg-transparent p-8 md:p-12 lg:w-2/5 lg:flex-none lg:items-end lg:justify-center lg:bg-gray-200 lg:py-12 lg:pl-[calc(1rem+((100vw-2rem)-min(1280px,100vw-2rem))/2)] lg:pr-6 xl:pr-8">
            <div className="flex w-full max-w-lg flex-col items-start space-y-6 text-left">
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
                a designer with a background in computer science designing systems thinking about human-computer interaction and AI. I've deployed projects played by 900K+ people under the alias "LWCoding"!
              </p>

              {/* Basic demographics / education */}
              <div className="w-full -mt-2 mb-8">
                <p className="text-sm md:text-base text-white lg:text-black font-medium">
                  B.S. Design • 4.015 GPA • Stanford ’27
                </p>
              </div>

              {/* Tools Row */}
              <div className="grid grid-cols-4 gap-3 md:gap-4 items-center justify-items-center tools-row-wrap -mt-3">
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
                <Link 
                  href="/about"
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                  aria-label="About me"
                >
                  <span>About Me</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Image (full remaining viewport width on lg+) */}
          <div className="relative hidden min-h-0 min-w-0 flex-1 bg-gray-800 lg:block">
            <Image
              src="/images/cs377g-playtest.png"
              alt="Game development showcase background"
              fill
              priority
              className="object-cover"
            />
            {/* Dark overlay to keep background very subdued */}
            <div className="absolute inset-0 bg-black/15"></div>
          </div>
        </div>

        {/* Headshot + quote — aligned with page content column (same as Section) */}
        <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-20 hidden px-4 md:bottom-6 lg:block">
          <div className="mx-auto flex w-full max-w-[1280px] items-center justify-end gap-3 md:gap-4 pointer-events-auto">
            <div className="relative mr-2 bg-white/95 px-3 py-2 shadow-lg md:mr-3 md:px-4 md:py-2.5 rounded-lg">
              <div
                className="absolute right-0 top-1/2 h-0 w-0 translate-x-full -translate-y-1/2 border-y-[8px] border-l-[10px] border-y-transparent border-l-[rgba(255,255,255,0.95)]"
                aria-hidden
              />
              <p className="text-sm font-medium whitespace-nowrap text-black md:text-base">
                <i>Welcome! Most of my work is digital and playable here!</i>
              </p>
            </div>
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full shadow-lg md:h-20 md:w-20">
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
        {/* Experience overview — white sections; yellow-400 waves only between the three */}
        <div className="bg-white">
          {experienceHighlights.map(({ id, card, showcaseCards }, index) => {
            const isEven = index % 2 === 0;
            const isProjectsPageLink = card.href.startsWith("/projects");
            return (
              <div key={id} className="w-full">
                <section
                  aria-labelledby={`${id}-heading`}
                  className="bg-white"
                >
                  <div className="mx-auto w-full max-w-[1280px] px-4 py-8 md:py-10 lg:py-12">
                    <div
                      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}
                    >
                      <div className="relative aspect-[4/3] w-full md:aspect-[3/2] md:w-1/2">
                        <Image
                          src={card.imageSrc}
                          alt={card.imageAlt}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-full space-y-4 md:w-1/2">
                        <div className="space-y-1">
                          {card.prefixText && (
                            <span className="block text-base font-medium text-black/70 md:text-lg">
                              {card.prefixText}
                            </span>
                          )}
                          <h3
                            id={`${id}-heading`}
                            className="text-3xl font-bold text-black md:text-4xl"
                          >
                            {card.title}
                          </h3>
                        </div>
                        <p className="text-base leading-relaxed text-black/80 md:text-lg">
                          {card.description}
                        </p>
                        {card.subButtonLabel && (
                          <div className="pt-2">
                            <Link
                              href={card.href}
                              aria-label={card.ariaLabel}
                              className={`group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                                isProjectsPageLink
                                  ? "bg-green-600 hover:bg-green-600"
                                  : "bg-blue-500 hover:bg-blue-600"
                              }`}
                            >
                              {isProjectsPageLink && (
                                <svg
                                  className="h-5 w-5 transition-transform group-hover:scale-110"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              )}
                              <span>{card.subButtonLabel}</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                    <HomeShowcaseCards cards={showcaseCards} />
                    <div className="mt-4 flex justify-center">
                      <Link
                        href={card.href}
                        aria-label={card.ariaLabel}
                        className={`inline-flex items-center gap-1.5 text-base font-semibold underline underline-offset-2 transition-colors ${
                          isProjectsPageLink
                            ? "text-green-700 hover:text-green-800"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        <span>{card.viewAllLabel}</span>
                        <svg
                          className="h-4 w-4 shrink-0 translate-y-px"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </section>
                {index < experienceHighlights.length - 1 && (
                  <ExperienceWaveDivider />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer - Higher z-index to appear above content */}
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
}
