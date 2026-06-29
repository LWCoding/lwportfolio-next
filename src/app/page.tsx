"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ResumeButton from "@/components/ResumeButton";
import { type HomeShowcaseCardItem } from "@/components/HomeShowcaseCards";
import { getListingPillsForProject } from "@/data/projectListingPills";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Thin gray wave between experience blocks (same cubic rhythm: 200→600→1000).
 * Stronger vertical swings than before while keeping a slim ribbon (parallel edges).
 */
function CarouselImage({ cards }: { cards: HomeShowcaseCardItem[] }) {
  const n = cards.length;
  const items = [cards[n - 1], ...cards, cards[0]];
  const total = items.length;

  const [vIdx, setVIdx] = useState(1);
  const [animated, setAnimated] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const vIdxRef = useRef(1);
  const lockRef = useRef(false);

  vIdxRef.current = vIdx;

  const moveTo = (newVIdx: number) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setAnimated(true);
    setVIdx(newVIdx);
    setTimeout(() => {
      if (newVIdx === 0) {
        setAnimated(false); setVIdx(n); vIdxRef.current = n;
      } else if (newVIdx === total - 1) {
        setAnimated(false); setVIdx(1); vIdxRef.current = 1;
      }
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimated(true);
        lockRef.current = false;
      }));
    }, 510);
  };
  const moveToRef = useRef(moveTo);
  moveToRef.current = moveTo;

  // Recursive schedule: advances after `delay` ms then resets to 4 s
  const scheduleRef = useRef<(delay?: number) => void>(() => {});
  scheduleRef.current = (delay = 4000) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isVisibleRef.current && !lockRef.current) moveToRef.current(vIdxRef.current + 1);
      scheduleRef.current(4000);
    }, delay);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !wasVisible) {
          // Scrolled into center — hold current slide 4× longer before first advance
          scheduleRef.current(16000);
        } else if (!entry.isIntersecting) {
          if (timerRef.current) clearTimeout(timerRef.current);
        }
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    );
    observer.observe(el);
    scheduleRef.current(4000);
    return () => { observer.disconnect(); if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const go = (dir: 1 | -1) => { moveToRef.current(vIdxRef.current + dir); scheduleRef.current(4000); };

  const realIdx = Math.min(Math.max(vIdx - 1, 0), n - 1);
  const currentCard = cards[realIdx];

  return (
    <div ref={containerRef} className="relative aspect-[2/1] w-full md:aspect-[3/2] md:w-1/2 [@media(max-height:700px)]:aspect-[16/7] rounded-lg overflow-hidden">
      <div
        className={animated ? 'transition-transform duration-500 ease-in-out' : ''}
        style={{ display: 'flex', height: '100%', width: `${total * 100}%`, transform: `translateX(${-vIdx * 100 / total}%)` }}
      >
        {items.map((card, i) => (
          <div key={i} className="relative flex-shrink-0" style={{ width: `${100 / total}%`, height: '100%' }}>
            <Image src={card.imageSrc} alt={card.imageAlt} fill className="object-cover" />
          </div>
        ))}
      </div>
      <div className="hidden md:block absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-28 pb-4 px-5 text-center">
        {currentCard.href ? (
          <Link href={currentCard.href} className="block text-white font-bold text-xl md:text-2xl leading-tight hover:underline underline-offset-2">
            {currentCard.title}{typeof currentCard.status === 'number' ? ` (${currentCard.status})` : currentCard.status === 'ongoing' ? ' (Ongoing)' : ''}
          </Link>
        ) : (
          <p className="text-white font-bold text-xl md:text-2xl leading-tight">{currentCard.title}{typeof currentCard.status === 'number' ? ` (${currentCard.status})` : currentCard.status === 'ongoing' ? ' (Ongoing)' : ''}</p>
        )}
        <p className="text-white/80 text-sm md:text-base mt-1 leading-snug">{currentCard.description}</p>
      </div>
      <button onClick={() => go(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer" aria-label="Previous project">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button onClick={() => go(1)} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer" aria-label="Next project">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

function ExperienceWaveDivider() {
  return (
    <div className="bg-gray-50 py-6 md:py-8" aria-hidden>
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
  const panelRef = useRef<HTMLDivElement>(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!panelRef.current) return;
      // Activate once the panel's top has reached the nav — panel covers full viewport, switch is invisible
      setShowContact(panelRef.current.getBoundingClientRect().top <= 56);
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, []);

  const handleSmoothNav = (href: string) => {
    const sectionId = href.split('#')[1];
    if (typeof window !== 'undefined' && sectionId) {
      sessionStorage.setItem('smoothScrollTarget', sectionId);
    }
  };

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
        prefixText: "My work is user-centered. I'm",
        title: "Designing Interactive Systems",
        description:
          "If you're going to make a game, why not make it solve a problem, too? At work and through independent research, I design user-centered experiences like virtual reality products for the elderly and multiplayer games to bring people together. ",
        ringColorClassName: "focus:ring-green-500",
        subButtonLabel: "View All Projects",
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
        imageSrc: "/images/cs42si_fa2025.png",
        imageAlt: "stanford game development club meeting",
        badgeLabel: "Game Development",
        badgeClassName: "bg-yellow-400",
        badgeTextClassName: "text-black",
        prefixText: "I find strong community important. I'm",
        title: "Promoting Game Design at Stanford",
        description:
          "Stanford students don't play enough games, let alone make them. As the founder of our game development club, I've hosted tens of events with hundreds of participants, including jams, socials, and playtests that help game designers find community. I also make lots of games!",
        ringColorClassName: "focus:ring-yellow-400",
        subButtonLabel: "View All Games",
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
          imageSrc: "/images/cs42siwebsite.png",
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
        prefixText: "I love teaching! I'm also",
        title: "Teaching Playful CS Courses",
        description:
          "Outside of lecturing for CS11SI, CS42SI, CS106A/B, and CS247G as an *undergraduate* at Stanford, I've taught game design internationally in South Korea. I love using interactive narratives to make programming intuitive, joyful, and collaborative.",
        ringColorClassName: "focus:ring-blue-500",
        subButtonLabel: "View All Teaching",
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
          <div className="relative z-30 flex w-full flex-1 flex-col items-center justify-center bg-transparent p-8 md:p-12 lg:w-2/5 lg:flex-none lg:items-end lg:justify-center lg:bg-gray-200 lg:py-12 [@media(max-height:700px)]:py-4 lg:pl-[calc(1rem+((100vw-2rem)-min(1280px,100vw-2rem))/2)] lg:pr-6 xl:pr-8">
            <div className="flex w-full max-w-lg flex-col items-start space-y-6 [@media(max-height:700px)]:space-y-2 text-left">
              {/* Main Heading */}
              <h1 className="text-6xl font-bold text-white lg:text-black leading-tight space-y-1">
                <span className="block text-base md:text-lg font-medium text-white lg:text-black">
                  Hey there! I&apos;m
                </span>
                <span className="block text-5xl xl:text-6xl [@media(max-height:700px)]:text-4xl font-black">
                  lucas wang,
                </span>
              </h1>

              {/* Descriptive Text */}
              <p className="text-base md:text-lg text-white lg:text-black font-medium">
                a full-stack game designer invested in human-computer interaction and AI. I've deployed projects played by 1M+ people as LWCoding!
              </p>

              {/* Basic demographics / education */}
              <div className="w-full -mt-2 mb-4 [@media(max-height:700px)]:mb-0 [@media(max-height:700px)]:-mt-1">
                <p className="text-sm md:text-base [@media(max-height:700px)]:text-xs text-white lg:text-black font-medium">
                M.S. Computer Science (4.0 GPA) • Stanford '28
                </p>
                <p className="text-sm md:text-base [@media(max-height:700px)]:text-xs text-white lg:text-black font-medium">
                 B.S. Design (4.0 GPA) • Stanford '27
                </p>
              </div>

              {/* Tools Row */}
              <div className="grid grid-cols-4 [@media(max-height:700px)]:grid-cols-8 gap-3 md:gap-4 [@media(max-height:700px)]:gap-2 items-center justify-items-center tools-row-wrap [@media(max-height:700px)]:mt-4">
                {tools.map((tool, index) => (
                  <div
                    key={index}
                     className="group relative w-12 h-12 md:w-14 md:h-14 [@media(max-height:700px)]:w-10 [@media(max-height:700px)]:h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300 p-2"
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
              <div className="flex flex-wrap gap-3 [@media(max-height:700px)]:mt-4">
                <Link
                  href="/projects#projects"
                  scroll={false}
                  onClick={() => handleSmoothNav('/projects#projects')}
                  className="group flex items-center justify-center gap-2 px-6 py-3 [@media(max-height:700px)]:py-2 bg-green-600 hover:bg-green-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
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
                  className="group flex items-center justify-center gap-2 px-6 py-3 [@media(max-height:700px)]:py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
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
            <div className="relative mr-2 bg-white px-3 py-2 shadow-md md:mr-3 md:px-4 md:py-2.5 rounded-lg">
              <div
                className="absolute right-0 top-1/2 w-3 h-3 bg-white rotate-45 translate-x-1/2 -translate-y-1/2 shadow-[1px_-1px_3px_rgba(0,0,0,0.08)]"
                aria-hidden
              />
              <p className="relative text-sm font-medium whitespace-nowrap text-black md:text-base">
                Welcome! Most of my work is digital and playable here!
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
      <div ref={panelRef} className="relative z-20 bg-white">
        {/* Yellow Bar - visible at bottom of viewport */}
        <div className="w-full bg-yellow-400 py-4">
          <div className="text-center text-black font-semibold">
            ▼ Explore What I&apos;m Doing ▼
          </div>
        </div>
        {/* Work Experience Section */}
        <div className="bg-white py-14 md:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-[1280px] px-4">

            {/* Nex Inc. */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 mb-14 md:mb-20">
              <div className="relative w-full md:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                <Image src="/images/nex-img.webp" alt="Lucas holding Nex Playground box" fill className="object-cover object-top" />
              </div>
              <div className="w-full md:w-1/2 space-y-2">
                <p className="text-sm font-black tracking-[0.2em] text-yellow-500 uppercase">Jun 2026 - Present</p>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-none tracking-tight">
                  Nex Inc.
                </h2>
                <p className="text-xl md:text-2xl font-semibold text-gray-500 pt-1">
                  Software Engineering Intern
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed pt-3">
                  Working in the Party Cell to develop games to get families moving together through the Nex Playground platform. Working at the intersection of game design and health tech to create interactive experiences that make exercise fun for all ages.
                </p>
                <div className="pt-4 flex justify-center md:justify-start">
                  <Link href="/projects/nex-playground" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                    <span>View Project</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 mb-14 md:mb-20" />

            {/* Always Be Closing */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
              <div className="relative w-full md:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/alwaysbeclosing.png"
                  alt="Always Be Closing game"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-2">
                <p className="text-sm font-black tracking-[0.2em] text-yellow-500 uppercase">Jun 2025 – Present</p>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-none tracking-tight">
                  Always Be Closing
                </h2>
                <p className="text-xl md:text-2xl font-semibold text-gray-500 pt-1">
                  Solo Game Programmer
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed pt-3">
                  Building a game that AI-simulates sales deal negotiations, helping players practice persuasion and closing techniques in a high-stakes, fast-paced environment.
                </p>
                <div className="pt-4 flex justify-center md:justify-start">
                  <Link href="/projects/always-be-closing" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                    <span>View Project</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 mb-14 md:mb-20 mt-14 md:mt-20" />

            {/* ImmersifyVR */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="relative w-full md:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/immersifyvr-bob.png"
                  alt="ImmersifyVR virtual reality exercise"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-2">
                <p className="text-sm font-black tracking-[0.2em] text-yellow-500 uppercase">Oct 2024 – Present</p>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-none tracking-tight">
                  ImmersifyVR
                </h2>
                <p className="text-xl md:text-2xl font-semibold text-gray-500 pt-1">
                  Project Manager
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed pt-3">
                  A grant-funded virtual reality exercise application designed to motivate older adults to exercise. Deployed and tested in several retirement homes across California.
                </p>
                <div className="pt-4 flex justify-center md:justify-start">
                  <Link href="/projects/immersifyvr" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                    <span>View Project</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yellow closing bar — end of elevated panel */}
        <div className="w-full bg-yellow-400 py-4">
          <div className="text-center text-black font-semibold">
            ▼ Summary of My Interests ▼
          </div>
        </div>

        {/* Experience overview — regular content, no panel feel */}
        <div className="bg-gray-50">
          {experienceHighlights.map(
            ({ id, card, showcaseCards }, index) => {
            const isEven = index % 2 === 0;
            const isProjectsPageLink = card.href.startsWith("/projects");
            return (
              <div key={id} className="w-full">
                <section
                  aria-labelledby={`${id}-heading`}
                  className="bg-gray-50"
                >
                  <div className={`mx-auto w-full max-w-[1280px] px-4 [@media(max-height:700px)]:py-5 ${index === 0 ? "pt-14 pb-8 md:pt-20 md:pb-10 lg:pt-24 lg:pb-12" : "py-8 md:py-10 lg:py-12"}`}>
                    <div
                      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}
                    >
                      <CarouselImage cards={showcaseCards} />
                      <div className="w-full space-y-4 md:w-1/2 md:mx-0">
                        <div className="space-y-1">
                          {card.prefixText && (
                            <span className="block text-base font-medium text-black/75 md:text-lg">
                              {card.prefixText}
                            </span>
                          )}
                          <h3
                            id={`${id}-heading`}
                            className="text-2xl font-black text-black md:text-3xl"
                          >
                            {card.title}
                          </h3>
                        </div>
                        <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                          {card.description}
                        </p>
                        {card.subButtonLabel && (
                          <div className="flex justify-center pt-2 md:justify-start">
                            <Link
                              href={card.href}
                              scroll={isProjectsPageLink ? false : undefined}
                              onClick={isProjectsPageLink ? () => handleSmoothNav(card.href) : undefined}
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
                  </div>
                </section>
                {index < experienceHighlights.length - 1 && (
                  <ExperienceWaveDivider />
                )}
              </div>
            );
          })}
        </div>
        {/* Yellow closing strip — mirrors opening yellow bar */}
        <div className="w-full bg-yellow-400 py-4">
          <div className="text-center text-black font-semibold">
            ▲ lucas wang ▲
          </div>
        </div>
      </div>

      {/* Contact background — fixed z-[5], above hero (z-0), below white panel (z-20).
          Invisible until the white panel scrolls fully off the top, then snaps in. */}
      <div className={`fixed top-[56px] left-0 right-0 bottom-0 z-[5] overflow-hidden ${showContact ? '' : 'hidden'}`}>
        <Image src="/images/meinkorea.jpg" alt="Lucas Wang" fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white pb-16">
          <p className="text-xs font-black tracking-[0.25em] text-yellow-400 uppercase mb-4">Get in Touch</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-3">
            Let&apos;s Deliberate!
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-md mb-6">
            I love chatting about games, interactive learning, and product design. Feel free to reach out!
          </p>
          <a href="mailto:lswang05@stanford.edu" className="text-xl md:text-2xl font-semibold underline underline-offset-4 hover:text-yellow-400 transition-colors mb-6">
            lswang05@stanford.edu
          </a>
          <div className="flex gap-3 mb-8">
            <a href="https://www.linkedin.com/in/lucas-wang-3160b720a/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow">
              <Image src="/images/linkedin.png" alt="LinkedIn" width={28} height={28} className="w-7 h-7 object-contain" />
            </a>
            <a href="https://github.com/LWCoding" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow">
              <Image src="/images/github.png" alt="GitHub" width={28} height={28} className="w-7 h-7 object-contain" />
            </a>
            <a href="https://lwcoding.itch.io/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow">
              <Image src="/images/itchio.png" alt="itch.io" width={28} height={28} className="w-7 h-7 object-contain" />
            </a>
          </div>
          <ResumeButton />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <Footer />
        </div>
      </div>

      {/* Scroll spacer — lets the white panel continue sliding off before contact is revealed */}
      <div style={{ height: '100vh' }} />
    </div>
  );
}
