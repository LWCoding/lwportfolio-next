"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
  borderColor = "border-gray-300"
}: NewspaperGameCardProps) {
  const [imageError, setImageError] = useState(false);

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
      className="relative h-full w-full overflow-hidden cursor-pointer block group border-4"
      style={{ borderColor: getBorderColorValue(borderColor) }}
    >
      {/* Background Image - covers entire card */}
      <div className="absolute inset-0">
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
      <div className="absolute inset-0 bg-black/10 z-[1]" />

      {/* Tags - top left, shown on hover */}
      {tags && tags.length > 0 && (
        <div className="absolute top-2 left-2 flex flex-wrap gap-2 z-10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
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

      {/* Gradient Overlay for text readability - transparent at top, black at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]" />

      {/* Text Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 lg:p-8 z-10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        {/* Title and Play Button Row */}
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
            {title}
          </h3>
          <div className="inline-flex items-center justify-center font-medium rounded-lg transition-colors bg-green-500 hover:bg-green-600 px-3 py-1.5 text-xs text-white gap-1">
            <span>Play</span>
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        
        {createdAt && (
          <p className="text-sm text-white/90 mb-2 drop-shadow-md">
            Published {formatCreatedDate(createdAt)}
          </p>
        )}
        
        <p className="text-sm md:text-base text-white drop-shadow-md">
          {description}
        </p>
      </div>
    </Link>
  );
}

