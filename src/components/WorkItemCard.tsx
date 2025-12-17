"use client";

import Image from "next/image";
import Link from "next/link";

interface WorkItemCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  onClick?: () => void;
  tags?: string[];
  tools?: ('unity' | 'csharp' | 'react' | 'figma' | 'python' | 'cplusplus' | 'nextjs' | 'html')[];
  date?: string;
  secondaryCtaLabel?: string;
  githubUrl?: string;
}

export default function WorkItemCard({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  onClick,
  tags = [],
  tools = [],
  date,
  secondaryCtaLabel,
  githubUrl,
}: WorkItemCardProps) {
  const formattedDate =
    date && !Number.isNaN(new Date(date).getTime())
      ? new Date(date)
          .toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : undefined;

  const content = (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-center md:items-center">
      {/* Image Section - Left Side */}
      <div className="relative w-full md:w-[36%] bg-gray-200 aspect-[5/2] md:aspect-[4/3] flex-shrink-0 rounded overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section - Right Side */}
      <div className="flex-1 flex flex-col gap-3 md:gap-2 lg:gap-4 items-center md:items-start text-center md:text-left">
        {/* Title with Tool Logos */}
        <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
          <h3 className="text-2xl md:text-2xl lg:text-4xl font-bold text-black">
            {title}
          </h3>
          {/* Tool Logos */}
          {tools && tools.length > 0 && (
            <div className="flex items-center gap-2 ml-2">
              {tools.includes('unity') && (
                <div className="group relative">
                  <Image 
                    src="/images/unity-logo.png" 
                    alt="Unity" 
                    width={24} 
                    height={24} 
                    className="opacity-80"
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    Unity
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              )}
              {tools.includes('csharp') && (
                <div className="group relative">
                  <Image 
                    src="/images/csharp-logo.png" 
                    alt="C#" 
                    width={24} 
                    height={24} 
                    className="opacity-80"
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    C#
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              )}
              {tools.includes('react') && (
                <div className="group relative">
                  <Image 
                    src="/images/react-logo.png" 
                    alt="React" 
                    width={24} 
                    height={24} 
                    className="opacity-80"
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    React
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              )}
              {tools.includes('nextjs') && (
                <div className="group relative">
                  <Image 
                    src="/images/react-logo.png" 
                    alt="Next.js" 
                    width={24} 
                    height={24} 
                    className="opacity-80"
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    Next.js
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              )}
              {tools.includes('figma') && (
                <div className="group relative">
                  <Image 
                    src="/images/figma.png" 
                    alt="Figma" 
                    width={24} 
                    height={24} 
                    className="opacity-80"
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    Figma
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              )}
              {tools.includes('python') && (
                <div className="group relative">
                  <Image 
                    src="/images/python-logo.png" 
                    alt="Python" 
                    width={24} 
                    height={24} 
                    className="opacity-80"
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    Python
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              )}
              {tools.includes('cplusplus') && (
                <div className="group relative">
                  <Image 
                    src="/images/cplusplus-logo.png" 
                    alt="C++" 
                    width={24} 
                    height={24} 
                    className="opacity-80"
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    C++
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              )}
              {tools.includes('html') && (
                <div className="group relative">
                  <Image 
                    src="/images/html5.png" 
                    alt="HTML/CSS/JS" 
                    width={24} 
                    height={24} 
                    className="opacity-80"
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    HTML/CSS/JS
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Date + Tags */}
        {(formattedDate || (tags && tags.length > 0)) && (
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start text-xs md:text-sm text-black/80">
            {formattedDate && (
              <span className="text-sm md:text-sm lg:text-base text-black/80">
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
                      ? "bg-yellow-400 text-black px-3 py-1 rounded-full text-[0.7rem] md:text-[0.7rem] lg:text-xs font-medium"
                      : "bg-gray-700 text-white px-3 py-1 rounded-full text-[0.7rem] md:text-[0.7rem] lg:text-xs font-medium"
                    : "bg-gray-200 px-3 py-1 rounded-full text-[0.7rem] md:text-[0.7rem] lg:text-xs font-medium text-black";
                  
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
        <p className="text-base md:text-base lg:text-lg text-black/80 leading-relaxed text-center md:text-left px-4 md:px-0">
          {description}
        </p>

        {/* Actions: view process + direct play/view + optional GitHub */}
        <div className="flex flex-wrap items-center gap-3 md:gap-2 lg:gap-3 mt-2 md:mt-1 lg:mt-2 mx-auto md:mx-0">
          <button
            onClick={onClick}
            className="inline-flex items-center justify-center gap-2 px-3 py-3 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm md:text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <span>View the Process</span>
          </button>

          {href && (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-3 py-3 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-sm md:text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            >
              <span>{secondaryCtaLabel || 'Open link'}</span>
              <svg
                className="w-5 h-5"
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
              className="hidden md:inline-flex items-center justify-center px-3 py-3 md:px-2.5 md:py-2.5 lg:px-3 lg:py-3 bg-white rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer ml-2"
              aria-label="View source on GitHub"
            >
              <Image
                src="/images/github.png"
                alt="GitHub"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return content;
}

