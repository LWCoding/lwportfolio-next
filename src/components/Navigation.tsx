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
    const baseClasses = "text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer whitespace-nowrap px-3 py-1.5 rounded-full relative overflow-hidden";
    const activeClasses = isActive(path)
      ? "text-white bg-black shadow-lg font-bold"
      : "text-black bg-yellow-400 hover:bg-white hover:text-black hover:shadow-md hover:font-semibold active:scale-95";
    return `${baseClasses} ${activeClasses}`;
  };

  // Helper function for mobile link classes with darker yellow active state
  const getMobileLinkClasses = (path: string) => {
    const baseClasses = "text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer whitespace-nowrap px-3 py-1.5 relative overflow-hidden";
    const activeClasses = isActive(path)
      ? "text-black/80 bg-yellow-500 shadow-md font-bold"
      : "text-black/80 bg-yellow-400 hover:bg-white hover:text-black hover:shadow-md hover:font-semibold active:scale-95 rounded-full";
    return `${baseClasses} ${activeClasses}`;
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-yellow-400 z-50 border-b-2 border-black/20">
      <div className="mx-auto px-3 sm:px-4 py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:relative">
          {/* Name - Left */}
          <div className="mr-4 flex-shrink-0">
            <Link href="/" className="cursor-pointer">
              <h1 className={`text-lg sm:text-xl font-bold whitespace-nowrap transition-colors ${
                isActive('/') 
                  ? 'text-black' 
                  : 'text-black/80 hover:text-black'
              }`}>
                lucas wang
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
          <div className="hidden md:flex items-center justify-center gap-3 lg:gap-5 flex-1 min-w-0 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
            <Link 
              href="/"
              className={getLinkClasses('/')}
            >
              home
            </Link>
            <Link 
              href="/projects"
              className={getLinkClasses('/projects')}
            >
              projects
            </Link>
            <Link 
              href="/about"
              className={getLinkClasses('/about')}
            >
              about
            </Link>
            <Link 
              href="/contact"
              className={getLinkClasses('/contact')}
            >
              contact
            </Link>
          </div>

          {/* Mobile Menu - Slides down when open */}
          <div 
            className={`md:hidden absolute top-full left-0 right-0 bg-yellow-400 border-b-2 border-black/20 overflow-hidden transition-all duration-300 ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col text-center">
              <Link 
                href="/"
                onClick={handleLinkClick}
                className={`${getMobileLinkClasses('/')} py-4 px-4 bg-yellow-400`}
              >
                home
              </Link>
              <Link 
                href="/projects"
                onClick={handleLinkClick}
                className={`${getMobileLinkClasses('/projects')} py-4 px-4 bg-yellow-400`}
              >
                projects
              </Link>
              <Link 
                href="/about"
                onClick={handleLinkClick}
                className={`${getMobileLinkClasses('/about')} py-4 px-4 bg-yellow-400`}
              >
                about
              </Link>
              <Link 
                href="/contact"
                onClick={handleLinkClick}
                className={`${getMobileLinkClasses('/contact')} py-4 px-4 bg-yellow-400`}
              >
                contact
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
