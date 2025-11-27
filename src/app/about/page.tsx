"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import JourneyRow from "@/components/JourneyRow";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col pt-[56px]">
      <Navigation />

      {/* Journey Section */}
      <Section id="journey" separator={false} container={false} padding={false} className="px-0 scroll-mt-[64px]">
        
        {/* Journey Rows */}
        <div className="space-y-0">
          <JourneyRow
            title="starting from scratch:"
            description="i quickly fell in love with creating at an early age with the Scratch engine, getting several featured projects and over 1M cumulative views on the platform. inspired by how my work could reach and impact others, i continued to create and publish games across multiple platforms: Scratch, Python, C++, and now Unity."
            imageSrc="/images/scratchproject.png"
            imageAlt="Starting my journey"
            bgColor="bg-gray-100"
            layoutDirection="left"
          />
          <JourneyRow
            title="creating local communities:"
            description="dedicated to find game designers in my local communities, i started a high school game design club before eventually founding the Stanford Video Game Development club in college. in addition, i've established and currently teach the CS42SI intro game development course."
            imageSrc="/images/svgdmeeting.png"
            imageAlt="Learning and growing"
            bgColor="bg-gray-200"
            layoutDirection="right"
          />
          <JourneyRow
            title="building & sharing:"
            description="today, i continue to integrate games and fun into my day-to-day learning. i've created games for classes and jobs, regularly host game-playing events for clubs, and teach multiple classes on campus to share the passion of game design in Unity. i've also designed serious games aimed to educate and inform changes in behavior."
            imageSrc="/images/teachinggame.jpg"
            imageAlt="Building and sharing"
            bgColor="bg-gray-100"
            layoutDirection="left"
          />
        </div>
      </Section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-6 px-4 border-t border-black/20 bg-yellow-400 mt-auto scroll-mt-[64px]">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-black font-bold">
            lucas wang © {new Date().getFullYear()}
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
    </div>
  );
}

