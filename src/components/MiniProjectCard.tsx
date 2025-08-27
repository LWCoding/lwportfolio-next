"use client";

import Image from 'next/image';
import { useState } from 'react';
import { GameCategory } from '@/hooks/useFeaturedGames';

interface MiniProjectCardProps {
  title: string;
  href: string;
  coverImage?: string;
  gradientClasses?: string;
  viewCount?: number;
  onHover?: (isHovering: boolean) => void;
}

export default function MiniProjectCard({
  title,
  href,
  coverImage,
  gradientClasses = "from-primary/20 to-accent/20",
  viewCount,
  onHover
}: MiniProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex-shrink-0 w-48 bg-secondary/30 rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors group"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <div className={`aspect-video relative overflow-hidden ${!coverImage || imageError ? `bg-gradient-to-br ${gradientClasses} flex items-center justify-center` : ''}`}>
        {coverImage && !imageError ? (
          <Image 
            src={coverImage} 
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => {
              setImageError(true);
            }}
          />
        ) : (
          <span className="text-primary font-semibold text-sm">Game</span>
        )}
        {viewCount && (
          <div className="absolute top-1 right-1 bg-background/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-xs">
            <span className="text-primary font-medium">{formatNumber(viewCount)}</span>
            <span className="text-muted-foreground ml-0.5">views</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
          {title}
        </h4>
      </div>
    </a>
  );
}
