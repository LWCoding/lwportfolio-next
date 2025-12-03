"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Helper function to get link classes with active state
  const getLinkClasses = (path: string) => {
    const baseClasses = "text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer whitespace-nowrap";
    const activeClasses = isActive(path)
      ? "text-black font-bold underline decoration-2 underline-offset-4"
      : "text-black/70 underline hover:text-black hover:font-semibold";
    return `${baseClasses} ${activeClasses}`;
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-yellow-400 z-50 border-b-2 border-black/20">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Name - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="cursor-pointer">
              <h1 className={`text-lg sm:text-xl font-bold whitespace-nowrap transition-colors ${
                isActive('/') 
                  ? 'text-black' 
                  : 'text-black/80 hover:text-black'
              }`}>
                Lucas Wang
              </h1>
            </Link>
          </div>

          {/* Hamburger Menu Button - Mobile Only */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Navigation Links - Hidden on mobile, shown on medium+ */}
          <div className="hidden md:flex items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-1 min-w-0 md:flex-1">
            <Link 
              href="/"
              className={getLinkClasses('/')}
            >
              Home
            </Link>
            <Link 
              href="/projects"
              className={getLinkClasses('/projects')}
            >
              Projects
            </Link>
            <Link 
              href="/games"
              className={getLinkClasses('/games')}
            >
              Games
            </Link>
            <Link 
              href="/about"
              className={getLinkClasses('/about')}
            >
              About
            </Link>
            <Link 
              href="/contact"
              className="text-xs sm:text-sm text-black/70 font-medium underline transition-colors duration-300 hover:text-black hover:font-semibold cursor-pointer whitespace-nowrap"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu - Slides down when open */}
          <div 
            className={`md:hidden absolute top-full left-0 right-0 bg-yellow-400 border-b-2 border-black/20 overflow-hidden transition-all duration-300 ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col py-4 px-4 space-y-4">
              <Link 
                href="/"
                onClick={handleLinkClick}
                className={getLinkClasses('/')}
              >
                Home
              </Link>
              <Link 
                href="/projects"
                onClick={handleLinkClick}
                className={getLinkClasses('/projects')}
              >
                Projects
              </Link>
              <Link 
                href="/games"
                onClick={handleLinkClick}
                className={getLinkClasses('/games')}
              >
                Games
              </Link>
              <Link 
                href="/about"
                onClick={handleLinkClick}
                className={getLinkClasses('/about')}
              >
                About
              </Link>
              <Link 
                href="/contact"
                onClick={handleLinkClick}
                className="text-xs sm:text-sm text-black/70 font-medium underline transition-colors duration-300 hover:text-black hover:font-semibold cursor-pointer whitespace-nowrap"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social Icons - Right, hidden on mobile */}
          <div className="hidden md:flex items-center justify-end gap-2 md:gap-3 flex-shrink-0">
            <a 
              href="https://www.linkedin.com/in/lucas-wang-3160b720a/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Visit my LinkedIn profile"
            >
              <Image 
                src="/images/linkedin.png" 
                alt="LinkedIn" 
                width={32}
                height={32}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
              />
            </a>
            <a 
              href="https://github.com/LWCoding"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Visit my GitHub profile"
            >
              <Image 
                src="/images/github.png" 
                alt="GitHub" 
                width={32}
                height={32}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
              />
            </a>
            <a 
              href="https://lwcoding.itch.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Visit my Itch.io profile"
            >
              <Image 
                src="/images/itchio.png" 
                alt="Itch.io" 
                width={32}
                height={32}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
              />
            </a>
            <a 
              href="https://scratch.mit.edu/users/LWCoding/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Visit my Scratch profile"
            >
              <Image 
                src="/images/scratch.svg" 
                alt="Scratch" 
                width={32}
                height={32}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
