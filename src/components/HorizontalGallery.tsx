import { useEffect, useRef, useState } from 'react';
import MiniProjectCard from './MiniProjectCard';
import { GameData } from '@/hooks/useFeaturedGames';

interface HorizontalGalleryProps {
  games: GameData[];
}

export default function HorizontalGallery({ games }: HorizontalGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0.5); // Base speed
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for right, -1 for left
  const [isBursting, setIsBursting] = useState(false);
  const [hoveredDirection, setHoveredDirection] = useState<number | null>(null);

  if (games.length === 0) return null;

  // Simple gradient classes for variety
  const gradientClasses = [
    "from-red-500/20 to-orange-500/20",
    "from-blue-500/20 to-purple-500/20", 
    "from-green-500/20 to-teal-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-yellow-500/20 to-red-500/20",
    "from-indigo-500/20 to-cyan-500/20",
    "from-pink-500/20 to-rose-500/20",
    "from-emerald-500/20 to-lime-500/20",
  ];

  // Double the games array for seamless looping
  const duplicatedGames = [...games, ...games];

  // Burst effect handler
  const handleBurst = (direction: number) => {
    setScrollDirection(direction);
    setScrollSpeed(10.0); // Very fast burst speed
    setIsBursting(true);
    
    // Reset after burst duration
    setTimeout(() => {
      setIsBursting(false);
      // Check if user is still hovering and return to appropriate state
      if (hoveredDirection !== null) {
        setScrollDirection(hoveredDirection);
        setScrollSpeed(2.0); // Back to hover speed
      } else {
        setScrollDirection(1);
        setScrollSpeed(0.5); // Back to normal speed
      }
    }, 250); // Burst time
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const maxScroll = scrollWidth / 2; // Half because we duplicated the content

    let animationId: number;

    const scroll = () => {
      if (!isPaused) {
        const currentScrollLeft = scrollContainer.scrollLeft;
        const newScroll = currentScrollLeft + (scrollSpeed * scrollDirection);
        
        // Handle looping for both directions
        if (scrollDirection > 0) {
          // Scrolling right
          if (newScroll >= maxScroll) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft = newScroll;
          }
        } else {
          // Scrolling left
          if (newScroll <= 0) {
            scrollContainer.scrollLeft = maxScroll - 1;
          } else {
            scrollContainer.scrollLeft = newScroll;
          }
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused, scrollSpeed, scrollDirection, isBursting, hoveredDirection]);

  return (
    <div className="w-full relative">
      {/* Left fade overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      
      {/* Right fade overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* Left arrow control */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-16 z-20 flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80"
        onMouseEnter={() => {
          setHoveredDirection(-1);
          if (!isBursting) {
            setScrollDirection(-1);
            setScrollSpeed(2.0); // Faster when hovering arrow
          }
        }}
        onMouseLeave={() => {
          setHoveredDirection(null);
          if (!isBursting) {
            setScrollDirection(1);
            setScrollSpeed(0.5); // Back to normal speed
          }
        }}
        onClick={() => handleBurst(-1)}
      >
        <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7z" />
        </svg>
      </div>
      
      {/* Right arrow control */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-16 z-20 flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80"
        onMouseEnter={() => {
          setHoveredDirection(1);
          if (!isBursting) {
            setScrollDirection(1);
            setScrollSpeed(2.0); // Faster when hovering arrow
          }
        }}
        onMouseLeave={() => {
          setHoveredDirection(null);
          if (!isBursting) {
            setScrollDirection(1);
            setScrollSpeed(0.5); // Back to normal speed
          }
        }}
        onClick={() => handleBurst(1)}
      >
        <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7z" />
        </svg>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden"
      >
        {duplicatedGames.map((game, index) => (
          <MiniProjectCard
            key={`${game.id}-${index}`}
            title={game.title}
            href={game.url}
            coverImage={game.cover_url || game.still_cover_url}
            gradientClasses={gradientClasses[index % gradientClasses.length]}
            viewCount={game.views_count}
            onHover={setIsPaused}
          />
        ))}
      </div>
    </div>
  );
}
