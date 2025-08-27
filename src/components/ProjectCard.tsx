"use client";

import Button from './Button';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
  gradientClasses?: string;
  displayText?: string;
  coverImage?: string;
  viewCount?: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
  gradientClasses = "from-primary/20 to-accent/20",
  displayText = "Game Project",
  coverImage,
  viewCount
}: ProjectCardProps) {

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="bg-secondary/30 rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
      <div className={`aspect-video relative overflow-hidden ${!coverImage ? `bg-gradient-to-br ${gradientClasses} flex items-center justify-center` : ''}`}>
        {coverImage ? (
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient background if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.className = `aspect-video relative overflow-hidden bg-gradient-to-br ${gradientClasses} flex items-center justify-center`;
                const fallbackText = document.createElement('span');
                fallbackText.className = 'text-primary font-semibold';
                fallbackText.textContent = displayText;
                parent.appendChild(fallbackText);
              }
            }}
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
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground mb-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3 justify-center">
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
