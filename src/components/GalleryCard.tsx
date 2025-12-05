"use client";

import Image from "next/image";
import Link from "next/link";

interface GalleryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  onClick?: () => void;
  tags?: string[];
  platforms?: ('windows' | 'apple' | 'html5' | 'linux' | 'figma')[];
  date?: string;
}

export default function GalleryCard({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  onClick,
  tags = [],
  platforms = [],
  date,
}: GalleryCardProps) {
  const formattedDate =
    date && !Number.isNaN(new Date(date).getTime())
      ? new Date(date)
          .toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : undefined;

  const content = (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Thumbnail Image - Top */}
      <div className="relative w-full aspect-[16/9] bg-gray-200 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section - Bottom */}
      <div className="flex-1 flex flex-col gap-2 p-4">
        {/* Title with Platform Logos */}
        <div className="flex items-start gap-2 flex-wrap">
          <h3 className="text-lg md:text-xl font-bold text-black flex-1">
            {title}
          </h3>
          {/* Platform Logos */}
          {platforms && platforms.length > 0 && (
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {platforms.includes('windows') && (
                <Image 
                  src="/images/windows.png" 
                  alt="Windows" 
                  width={16} 
                  height={16} 
                  className="opacity-80"
                />
              )}
              {platforms.includes('apple') && (
                <Image 
                  src="/images/apple.png" 
                  alt="Apple" 
                  width={16} 
                  height={16} 
                  className="opacity-80"
                />
              )}
              {platforms.includes('html5') && (
                <Image 
                  src="/images/html5.png" 
                  alt="HTML5" 
                  width={16} 
                  height={16} 
                  className="opacity-80"
                />
              )}
              {platforms.includes('linux') && (
                <Image 
                  src="/images/linux.png" 
                  alt="Linux" 
                  width={16} 
                  height={16} 
                  className="opacity-80"
                />
              )}
              {platforms.includes('figma') && (
                <Image 
                  src="/images/figma.png" 
                  alt="Figma" 
                  width={16} 
                  height={16} 
                  className="opacity-80"
                />
              )}
            </div>
          )}
        </div>

        {/* Date + Tags */}
        {(formattedDate || (tags && tags.length > 0)) && (
          <div className="flex flex-wrap gap-2 items-center text-xs text-black/80">
            {formattedDate && (
              <span className="text-xs text-black/80">
                {formattedDate}
              </span>
            )}
            {formattedDate && tags && tags.length > 0 && (
              <span className="text-black/30">
                |
              </span>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-2 py-0.5 rounded-full text-[0.65rem] font-medium text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-black/80 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick}>
        {content}
      </div>
    );
  }

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}

