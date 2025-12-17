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
  secondaryCtaLabel?: string;
  githubUrl?: string;
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
  secondaryCtaLabel,
  githubUrl,
}: GalleryCardProps) {
  const formattedDate =
    date && !Number.isNaN(new Date(date).getTime())
      ? new Date(date)
          .toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : undefined;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Image Section - Top */}
      <div className="relative w-full aspect-[4/3] bg-gray-200">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section - Bottom */}
      <div className="flex flex-col gap-2 md:gap-1.5 lg:gap-3 p-4 pt-6 md:pt-6 lg:pt-8 justify-center">
        {/* Title with Platform Logos */}
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-lg md:text-base lg:text-xl font-bold text-black">
            {title}
          </h3>
          {/* Platform Logos */}
          {platforms && platforms.length > 0 && (
            <div className="flex items-center gap-1.5">
              {platforms.includes('windows') && (
                <Image 
                  src="/images/windows.png" 
                  alt="Windows" 
                  width={18} 
                  height={18} 
                  className="opacity-80"
                />
              )}
              {platforms.includes('apple') && (
                <Image 
                  src="/images/apple.png" 
                  alt="Apple" 
                  width={18} 
                  height={18} 
                  className="opacity-80"
                />
              )}
              {platforms.includes('html5') && (
                <Image 
                  src="/images/html5.png" 
                  alt="HTML5" 
                  width={18} 
                  height={18} 
                  className="opacity-80"
                />
              )}
              {platforms.includes('linux') && (
                <Image 
                  src="/images/linux.png" 
                  alt="Linux" 
                  width={18} 
                  height={18} 
                  className="opacity-80"
                />
              )}
              {platforms.includes('figma') && (
                <Image 
                  src="/images/figma.png" 
                  alt="Figma" 
                  width={18} 
                  height={18} 
                  className="opacity-80"
                />
              )}
            </div>
          )}
        </div>

        {/* Date + Tags */}
        {(formattedDate || (tags && tags.length > 0)) && (
          <div className="flex flex-wrap gap-2 items-center text-xs md:text-xs lg:text-sm text-black/80">
            {formattedDate && (
              <span className="text-xs md:text-xs lg:text-sm text-black/80">
                {formattedDate}
              </span>
            )}
            {formattedDate && tags && tags.length > 0 && (
              <span className="text-black/30">
                |
              </span>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => {
                  const isFirstTag = index === 0;
                  const isForWork = tag === "For Work";
                  const isForFun = tag === "For Fun";
                  const tagClassName = isFirstTag && (isForWork || isForFun)
                    ? isForFun
                      ? "bg-yellow-400 text-black px-2 py-1 rounded-full text-[0.65rem] md:text-[0.65rem] lg:text-xs font-medium"
                      : "bg-gray-700 text-white px-2 py-1 rounded-full text-[0.65rem] md:text-[0.65rem] lg:text-xs font-medium"
                    : "bg-gray-200 px-2 py-1 rounded-full text-[0.65rem] md:text-[0.65rem] lg:text-xs font-medium text-black";
                  
                  return (
                    <span key={index} className={tagClassName}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-xs md:text-xs lg:text-sm text-black/80 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 md:gap-1.5 lg:gap-2 mt-auto">
          <button
            onClick={onClick}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 md:px-3 md:py-2 lg:px-4 lg:py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>View Process</span>
          </button>

          {href && (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 md:px-3 md:py-2 lg:px-4 lg:py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>{secondaryCtaLabel || 'Open'}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center px-2.5 py-2.5 md:px-2 md:py-2 lg:px-2.5 lg:py-2.5 bg-white rounded-full shadow-md hover:scale-105 transition-transform cursor-pointer ml-auto"
              aria-label="View source on GitHub"
            >
              <Image
                src="/images/github.png"
                alt="GitHub"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

