import Image from 'next/image';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-yellow-400 z-50 border-b-2 border-black/20">
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-3 items-center">
          {/* Name - Left */}
          <div>
            <h1 className="text-xl font-bold text-black">lucas wang!</h1>
          </div>

          {/* Navigation Links - Center */}
          <div className="flex items-center justify-center gap-8">
            <a 
              href="#featured-projects"
              className="text-black font-medium underline transition-colors duration-300 hover:text-gray-800 cursor-pointer"
            >
              projects
            </a>
            <a 
              href="#journey"
              className="text-black font-medium underline transition-colors duration-300 hover:text-gray-800 cursor-pointer"
            >
              journey
            </a>
            <a 
              href="#contact"
              className="text-black font-medium underline transition-colors duration-300 hover:text-gray-800 cursor-pointer"
            >
              contact
            </a>
          </div>

          {/* Social Icons - Right */}
          <div className="flex items-center justify-end gap-3">
            <a 
              href="https://www.linkedin.com/in/lucas-wang-3160b720a/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Visit my LinkedIn profile"
            >
              <Image 
                src="/images/linkedin.png" 
                alt="LinkedIn" 
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </a>
            <a 
              href="https://github.com/LWCoding"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Visit my GitHub profile"
            >
              <Image 
                src="/images/github.png" 
                alt="GitHub" 
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </a>
            <a 
              href="https://lwcoding.itch.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Visit my Itch.io profile"
            >
              <Image 
                src="/images/itchio.png" 
                alt="Itch.io" 
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </a>
            <a 
              href="https://scratch.mit.edu/users/LWCoding/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
              aria-label="Visit my Scratch profile"
            >
              <Image 
                src="/images/scratch.svg" 
                alt="Scratch" 
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
