import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-6 px-4 border-t border-black/20 bg-yellow-400 mt-auto scroll-mt-[64px]"
    >
      <div className="container mx-auto max-w-[1024px] text-center">
        <p className="text-black font-bold">
          lucas wang! © {new Date().getFullYear()}
        </p>
        <p className="text-sm text-black font-bold mt-1">
          <a
            href="mailto:lswang05@stanford.edu"
            className="hover:text-gray-800 transition-colors"
          >
            lswang05@stanford.edu
          </a>
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-3 mt-4">
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
    </footer>
  );
}


