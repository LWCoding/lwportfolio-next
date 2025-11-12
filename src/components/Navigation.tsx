import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-yellow-400 z-50 border-b-2 border-black/20">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Name - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="cursor-pointer">
              <h1 className="text-lg sm:text-xl font-bold text-black whitespace-nowrap hover:text-gray-800 transition-colors">lucas wang!</h1>
            </Link>
          </div>

          {/* Navigation Links - Right on mobile, Center on medium+ */}
          <div className="flex items-center justify-end md:justify-center gap-3 sm:gap-6 md:gap-8 flex-1 min-w-0 md:flex-1">
            <Link 
              href="/#journey"
              className="text-sm sm:text-base text-black font-medium underline transition-colors duration-300 hover:text-gray-800 cursor-pointer whitespace-nowrap"
            >
              journey
            </Link>
            <Link 
              href="/#featured-projects"
              className="text-sm sm:text-base text-black font-medium underline transition-colors duration-300 hover:text-gray-800 cursor-pointer whitespace-nowrap"
            >
              projects
            </Link>
            <Link 
              href="/#contact"
              className="text-sm sm:text-base text-black font-medium underline transition-colors duration-300 hover:text-gray-800 cursor-pointer whitespace-nowrap"
            >
              contact
            </Link>
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
