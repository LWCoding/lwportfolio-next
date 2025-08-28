"use client";

import Button from './Button';
import Image from 'next/image';
import { useState } from 'react';


interface OtherProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
  coverImage?: string;
  gradientClasses?: string;
  displayText?: string;
  createdAt?: string;
}

export default function OtherProjectCard({
  title,
  description,
  tags,
  href,
  coverImage,
  gradientClasses = "from-primary/20 to-accent/20",
  displayText = "Project",
  createdAt
}: OtherProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatCreatedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };



  return (
    <div className="bg-secondary/30 rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors flex flex-col h-full">
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
      </div>
      
      <div className="p-3 lg:p-4 text-center flex flex-col flex-grow">
        <h3 className="text-lg lg:text-xl font-semibold mb-1">
          {title}
        </h3>
        {createdAt && (
          <p className="text-sm text-muted-foreground mb-2">
            Published {formatCreatedDate(createdAt)}
          </p>
        )}
        <p className="text-sm lg:text-base text-muted-foreground mb-2 lg:mb-3 flex-grow">
          {description}
        </p>
        <div className="flex flex-wrap gap-1 lg:gap-2 mb-2 lg:mb-3 justify-center">
          {tags.map((tag) => (
            <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-center mt-auto">
          <Button href={href} variant="outline" size="sm" target="_blank" rel="noopener noreferrer">
            View Project →
          </Button>
        </div>
      </div>
    </div>
  );
}
