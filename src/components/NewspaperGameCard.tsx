"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface NewspaperGameCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
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
  platforms?: ('windows' | 'apple' | 'html5' | 'linux')[];
}

export default function NewspaperGameCard({
  title,
  description,
  tags,
  href,
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
  platforms = []
}: NewspaperGameCardProps) {
  const [imageError, setImageError] = useState(false);
  const [hoverTranslateY, setHoverTranslateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const publishedDateRef = useRef<HTMLParagraphElement>(null);
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
        const publishedHeight = publishedDateRef.current?.offsetHeight || 0;
        const hoverHeight = hoverContentRef.current.offsetHeight;
        const totalHeight = titleHeight + publishedHeight + hoverHeight;
        
        // Reset hover content
        hoverContentRef.current.style.display = originalDisplay;
        hoverContentRef.current.style.opacity = '';
        hoverContentRef.current.style.visibility = '';
        
        // Set the translate value for hover state
        setHoverTranslateY(-totalHeight * 0.7);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(calculateTranslate, 100);
    window.addEventListener('resize', calculateTranslate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateTranslate);
    };
  }, [title, description, createdAt]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCreatedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Map border color class to actual color value
  const getBorderColorValue = (colorClass: string): string => {
    const colorMap: Record<string, string> = {
      'border-gray-800': '#1f2937',
      'border-white': '#ffffff',
    };
    return colorMap[colorClass] || '#e5e7eb'; // default to gray-300
  };

  return (
    <Link 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="relative h-full w-full overflow-hidden cursor-pointer block group border-[12px]"
      style={{ 
        borderColor: getBorderColorValue(borderColor),
        borderRadius: '1rem'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      <div className="absolute inset-0 bg-black/20 z-[1]" style={{ borderRadius: '1rem' }} />

      {/* Tags - top left, always visible */}
      {tags && tags.length > 0 && (
        <div className="absolute top-2 left-2 flex flex-wrap gap-2 z-10">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* View Count Badge */}
      {viewCount && (
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs z-10">
          <span className="text-primary font-medium">{formatNumber(viewCount)}</span>
          <span className="text-gray-600 ml-1">views</span>
        </div>
      )}

      {/* Gradient Overlay for text readability - extends upward on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/85 z-[2] group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:via-black/40 group-hover:to-black/90 transition-all duration-300" style={{ borderRadius: '1rem' }} />

      {/* Text Content Container - starts at bottom, moves up on hover */}
      <div 
        ref={containerRef}
        className="absolute left-0 bottom-0 right-0 px-4 md:px-6 lg:px-8 pb-3 z-10 transition-transform duration-300"
        style={{
          transform: `translateY(${isHovered ? hoverTranslateY : 0}px)`,
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
            </div>
          )}
        </div>

        {/* Published Date - Always visible, below title */}
        {createdAt && (
          <p ref={publishedDateRef} className="text-sm text-white/90 drop-shadow-md mt-1">
            Published {formatCreatedDate(createdAt)}
          </p>
        )}

        {/* Hover Content - Description only - Absolutely positioned below title */}
        <div 
          ref={hoverContentRef}
          className="absolute left-0 top-full mt-1 w-full px-4 md:px-6 lg:px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75"
        >
          <p className="text-sm md:text-base text-white drop-shadow-md">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

