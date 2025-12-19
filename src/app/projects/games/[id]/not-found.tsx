import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col pt-[56px]">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Game Not Found
          </h1>
          <p className="text-lg text-black/80 mb-8">
            Sorry, we couldn&apos;t find the game you&apos;re looking for.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
