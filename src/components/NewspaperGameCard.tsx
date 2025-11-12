"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface NewspaperGameCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
  infoUrl?: string;
  gradientClasses?: string;
  displayText?: string;
  coverImage?: string;
  viewCount?: number;
  createdAt?: string;
  variant?: 'white' | 'grey';
  size?: 'large' | 'medium' | 'small';
  isLastInRow?: boolean;
  isLastRow?: boolean;
  borderColor?: string;
  platforms?: ('windows' | 'apple' | 'html5' | 'linux' | 'figma')[];
  onClick?: () => void;
  fadeOpacity?: number; // Controls fade amount: 0-1, where 1 is default (full fade), lower values = less fade
}

export default function NewspaperGameCard({
  title,
  description,
  tags,
  href,
  infoUrl,
  gradientClasses = "from-primary/20 to-accent/20",
  displayText = "Game Project",
  coverImage,
  viewCount,
  createdAt,
  variant = 'white',
  size = 'medium',
  isLastInRow = false,
  isLastRow = false,
  borderColor = "border-gray-300",
  platforms = [],
  onClick,
  fadeOpacity = 1
}: NewspaperGameCardProps) {
  const [imageError, setImageError] = useState(false);
  const [hoverTranslateY, setHoverTranslateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const hoverContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateTranslate = () => {
      if (titleRef.current && hoverContentRef.current && containerRef.current) {
        // Temporarily make hover content visible to measure
        const originalDisplay = hoverContentRef.current.style.display;
        hoverContentRef.current.style.display = 'block';
        hoverContentRef.current.style.opacity = '1';
        hoverContentRef.current.style.visibility = 'hidden';
        hoverContentRef.current.style.position = 'absolute';
        
        const titleHeight = titleRef.current.offsetHeight;
        const tagsHeight = tagsRef.current?.offsetHeight || 0;
        const hoverHeight = hoverContentRef.current.offsetHeight;
        const totalHeight = titleHeight + tagsHeight + hoverHeight;
        
        // Reset hover content
        hoverContentRef.current.style.display = originalDisplay;
        hoverContentRef.current.style.opacity = '';
        hoverContentRef.current.style.visibility = '';
        
        // Set the translate value for hover state
        setHoverTranslateY(-totalHeight * 0.65);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(calculateTranslate, 100);
    window.addEventListener('resize', calculateTranslate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateTranslate);
    };
  }, [title, description, createdAt, tags]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const listener = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop('matches' in e ? e.matches : (e as MediaQueryList).matches);
    };
    // Initialize
    listener(mediaQuery);
    // Listen for changes
    if ('addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', listener as (ev: Event) => void);
    } else {
      // @ts-expect-error Safari fallback
      mediaQuery.addListener(listener);
    }
    return () => {
      if ('removeEventListener' in mediaQuery) {
        mediaQuery.removeEventListener('change', listener as (ev: Event) => void);
      } else {
        // @ts-expect-error Safari fallback
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  // No border color mapping needed; borders removed in favor of margins

  // Determine the link destination - prefer infoUrl, fallback to href
  const cardLink = infoUrl || href;

  // If onClick is provided, use a div instead of Link
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const commonClassName = "relative h-full w-full overflow-hidden block cursor-pointer";
  const commonStyle = { borderRadius: '1rem' };
  const commonAriaLabel = infoUrl ? `View devlog for ${title}` : `View ${title}`;

  // If onClick is provided, render a div; otherwise render a Link
  if (onClick) {
    return (
      <div
        className={commonClassName}
        style={commonStyle}
        onMouseEnter={() => isDesktop && setIsHovered(true)}
        onMouseLeave={() => isDesktop && setIsHovered(false)}
        onClick={handleClick}
        aria-label={commonAriaLabel}
      >
      {/* Background Image - covers entire card */}
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '1rem' }}>
        {coverImage && !imageError ? (
          <Image 
            src={coverImage} 
            alt={title}
            fill
            className="object-cover"
            onError={() => {
              setImageError(true);
            }}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClasses} flex items-center justify-center`}>
            <span className="text-primary font-semibold">{displayText}</span>
          </div>
        )}
      </div>

      {/* Ambient Dark Background Overlay - always visible */}
      <div 
        className="absolute inset-0 z-[1]" 
        style={{ 
          borderRadius: '1rem',
          backgroundColor: `rgba(0, 0, 0, ${0.2 * fadeOpacity})`
        }} 
      />

      {/* View Count Badge */}
      {viewCount && (
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs z-10">
          <span className="text-primary font-medium">{formatNumber(viewCount)}</span>
          <span className="text-gray-600 ml-1">views</span>
        </div>
      )}

      {/* Gradient Overlay for text readability - extends upward on hover */}
      <div 
        className="absolute inset-0 z-[2] transition-all duration-300" 
        style={{ 
          borderRadius: '1rem',
          background: isDesktop && isHovered
            ? `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, ${0.4 * fadeOpacity}) 50%, rgba(0, 0, 0, ${0.9 * fadeOpacity}) 100%)`
            : `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, ${0.3 * fadeOpacity}) 50%, rgba(0, 0, 0, ${0.85 * fadeOpacity}) 100%)`
        }}
      />

      {/* Text Content Container - starts higher up, moves up on hover */}
      <div 
        ref={containerRef}
        className="absolute left-0 right-0 px-4 md:px-6 lg:px-8 pb-3 z-10 transition-transform duration-300"
        style={{
          bottom: '0.5rem',
          transform: `translateY(${isDesktop && isHovered ? hoverTranslateY : 0}px)`,
        }}
      >
        {/* Title - Always visible, starts at bottom left */}
        <div className="flex items-center gap-2 flex-wrap">
          <h3 ref={titleRef} className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg leading-tight">
            {title}
          </h3>
          {/* Platform Logos */}
          {platforms && platforms.length > 0 && (
            <div className="flex items-center gap-1.5 self-center">
              {platforms.includes('windows') && (
                <img 
                  src="/images/windows.png" 
                  alt="Windows" 
                  width={20} 
                  height={20} 
                  className="opacity-90 drop-shadow-md align-middle"
                  style={{ verticalAlign: 'middle' }}
                />
              )}
              {platforms.includes('apple') && (
                <img 
                  src="/images/apple.png" 
                  alt="Apple" 
                  width={20} 
                  height={20} 
                  className="opacity-90 drop-shadow-md align-middle"
                  style={{ verticalAlign: 'middle', filter: 'brightness(0) invert(1)' }}
                />
              )}
              {platforms.includes('html5') && (
                <img 
                  src="/images/html5.png" 
                  alt="HTML5" 
                  width={20} 
                  height={20} 
                  className="opacity-90 drop-shadow-md align-middle"
                  style={{ verticalAlign: 'middle' }}
                />
              )}
              {platforms.includes('linux') && (
                <img 
                  src="/images/linux.png" 
                  alt="Linux" 
                  width={20} 
                  height={20} 
                  className="opacity-90 drop-shadow-md align-middle"
                  style={{ verticalAlign: 'middle' }}
                />
              )}
              {platforms.includes('figma') && (
                <img 
                  src="/images/figma.png" 
                  alt="Figma" 
                  width={20} 
                  height={20} 
                  className="opacity-90 drop-shadow-md align-middle"
                  style={{ verticalAlign: 'middle' }}
                />
              )}
            </div>
          )}
        </div>

        {/* Tags - below title, above description (includes year if available) */}
        <div ref={tagsRef} className="flex flex-wrap gap-2 mt-2">
          {tags && tags.map((tag, index) => (
            <span
              key={index}
              className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-black w-fit whitespace-normal break-words"
            >
              {tag}
            </span>
          ))}
          {createdAt && (
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-black w-fit whitespace-normal break-words">
              {getYear(createdAt)}
            </span>
          )}
        </div>

        {/* Hover Content - Description only - Absolutely positioned below title */}
        <div 
          ref={hoverContentRef}
          className="absolute left-0 top-full mt-1 w-full px-4 md:px-6 lg:px-8 opacity-100 md:opacity-0 transition-opacity duration-300 delay-75"
          style={{
            opacity: isDesktop ? (isHovered ? 1 : 0) : 1
          }}
        >
          <p className="text-sm md:text-base text-white drop-shadow-md">
            {description}
          </p>
        </div>
      </div>
      </div>
    );
  }

  return (
    <Link
      href={cardLink}
      target={infoUrl ? undefined : "_blank"}
      rel={infoUrl ? undefined : "noopener noreferrer"}
      className={commonClassName}
      style={commonStyle}
      onMouseEnter={() => isDesktop && setIsHovered(true)}
      onMouseLeave={() => isDesktop && setIsHovered(false)}
      aria-label={commonAriaLabel}
    >
      {/* Background Image - covers entire card */}
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '1rem' }}>
        {coverImage && !imageError ? (
          <Image 
            src={coverImage} 
            alt={title}
            fill
            className="object-cover"
            onError={() => {
              setImageError(true);
            }}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClasses} flex items-center justify-center`}>
            <span className="text-primary font-semibold">{displayText}</span>
          </div>
        )}
      </div>

      {/* Ambient Dark Background Overlay - always visible */}
      <div 
        className="absolute inset-0 z-[1]" 
        style={{ 
          borderRadius: '1rem',
          backgroundColor: `rgba(0, 0, 0, ${0.2 * fadeOpacity})`
        }} 
      />

      {/* View Count Badge */}
      {viewCount && (
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs z-10">
          <span className="text-primary font-medium">{formatNumber(viewCount)}</span>
          <span className="text-gray-600 ml-1">views</span>
        </div>
      )}

      {/* Gradient Overlay for text readability - extends upward on hover */}
      <div 
        className="absolute inset-0 z-[2] transition-all duration-300" 
        style={{ 
          borderRadius: '1rem',
          background: isDesktop && isHovered
            ? `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, ${0.4 * fadeOpacity}) 50%, rgba(0, 0, 0, ${0.9 * fadeOpacity}) 100%)`
            : `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, ${0.3 * fadeOpacity}) 50%, rgba(0, 0, 0, ${0.85 * fadeOpacity}) 100%)`
        }}
      />

      {/* Text Content Container - starts higher up, moves up on hover */}
      <div 
        ref={containerRef}
        className="absolute left-0 right-0 px-4 md:px-6 lg:px-8 pb-3 z-10 transition-transform duration-300"
        style={{
          bottom: '0.5rem',
          transform: `translateY(${isDesktop && isHovered ? hoverTranslateY : 0}px)`,
        }}
      >
        {/* Title - Always visible, starts at bottom left */}
        <div className="flex items-center gap-2 flex-wrap">
          <h3 ref={titleRef} className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg leading-tight">
            {title}
          </h3>
          {/* Platform Logos */}
          {platforms && platforms.length > 0 && (
            <div className="flex items-center gap-1.5 self-center">
              {platforms.includes('windows') && (
                <img 
                  src="/images/windows.png" 
                  alt="Windows" 
                  width={20} 
                  height={20} 
                  className="opacity-90 drop-shadow-md align-middle"
                  style={{ verticalAlign: 'middle' }}
                />
              )}
              {platforms.includes('apple') && (
                <img 
                  src="/images/apple.png" 
                  alt="Apple" 
                  width={20} 
                  height={20} 
                  className="opacity-90 drop-shadow-md align-middle"
                  style={{ verticalAlign: 'middle', filter: 'brightness(0) invert(1)' }}
                />
              )}
              {platforms.includes('html5') && (
                <img 
                  src="/images/html5.png" 
                  alt="HTML5" 
                  width={20} 
                  height={20} 
                  className="opacity-90 drop-shadow-md align-middle"
                  style={{ verticalAlign: 'middle' }}
                />
              )}
              {platforms.includes('linux') && (
                <img 
                  src="/images/linux.png" 
                  alt="Linux" 
                  width={20} 
                  height={20} 
                  className="opacity-90 drop-shadow-md align-middle"
                  style={{ verticalAlign: 'middle' }}
                />
              )}
              {platforms.includes('figma') && (
                <img 
                  src="/images/figma.png" 
                  alt="Figma" 
                  width={20} 
                  height={20} 
                  className="opacity-90 drop-shadow-md align-middle"
                  style={{ verticalAlign: 'middle' }}
                />
              )}
            </div>
          )}
        </div>

        {/* Tags - below title, above description (includes year if available) */}
        <div ref={tagsRef} className="flex flex-wrap gap-2 mt-2">
          {tags && tags.map((tag, index) => (
            <span
              key={index}
              className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-black w-fit whitespace-normal break-words"
            >
              {tag}
            </span>
          ))}
          {createdAt && (
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-black w-fit whitespace-normal break-words">
              {getYear(createdAt)}
            </span>
          )}
        </div>

        {/* Hover Content - Description only - Absolutely positioned below title */}
        <div 
          ref={hoverContentRef}
          className="absolute left-0 top-full mt-1 w-full px-4 md:px-6 lg:px-8 opacity-100 md:opacity-0 transition-opacity duration-300 delay-75"
          style={{
            opacity: isDesktop ? (isHovered ? 1 : 0) : 1
          }}
        >
          <p className="text-sm md:text-base text-white drop-shadow-md">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

