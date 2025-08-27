"use client";

import Button from './Button';
import Image from 'next/image';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
  gradientClasses?: string;
  displayText?: string;
  coverImage?: string;
  viewCount?: number;
  createdAt?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
  gradientClasses = "from-primary/20 to-accent/20",
  displayText = "Game Project",
  coverImage,
  viewCount,
  createdAt
}: ProjectCardProps) {
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

  return (
    <div className="bg-secondary/30 rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
      <div className={`aspect-[3/2] lg:aspect-video relative overflow-hidden ${!coverImage || imageError ? `bg-gradient-to-br ${gradientClasses} flex items-center justify-center` : ''}`}>
        {coverImage && !imageError ? (
          <Image 
            src={coverImage} 
            alt={title}
            fill
            className="object-cover"
            onError={() => {
              setImageError(true);
            }}
            priority
          />
        ) : (
          <span className="text-primary font-semibold">{displayText}</span>
        )}
        {viewCount && (
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
            <span className="text-primary font-medium">{formatNumber(viewCount)}</span>
            <span className="text-muted-foreground ml-1">views</span>
          </div>
        )}
      </div>
      <div className="p-3 lg:p-4 text-center">
        <h3 className="text-lg lg:text-xl font-semibold mb-1">
          {title}
        </h3>
        {createdAt && (
          <p className="text-sm text-muted-foreground mb-2">
            Published {formatCreatedDate(createdAt)}
          </p>
        )}
        <p className="text-sm lg:text-base text-muted-foreground mb-2 lg:mb-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-1 lg:gap-2 mb-2 lg:mb-3 justify-center">
          {tags.map((tag) => (
            <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-center">
          <Button href={href} variant="outline" size="sm" target="_blank" rel="noopener noreferrer">
            Play Game →
          </Button>
        </div>
      </div>
    </div>
  );
}
