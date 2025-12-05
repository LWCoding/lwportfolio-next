"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import VideoBanner from "@/components/VideoBanner";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col pt-[56px]">
      <Navigation />

      {/* hero video banner */}
      <VideoBanner
        title="About"
        subtitle="My story so far..."
        height="33vh"
        minHeight="200px"
      />

      {/* about story section */}
      <Section
        id="journey"
        separator={false}
        container={false}
        padding={false}
        className="px-0 scroll-mt-[64px]"
      >
        <div className="w-full bg-white py-8 md:py-12">
          <div className="container mx-auto max-w-[1024px] px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-10">
              {/* story text */}
              <div className="w-full md:w-[55%] space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-black">
                  Where I&apos;m Coming From
                </h1>
                <p className="text-base md:text-lg text-black/80">
                  I was born in Chicago to immigrant parents from Malaysia. Since I was young, I&apos;ve been drawn to creativity, having drawn over 200 pages of hand-drawn comics in elementary school alone.</p>
                <p className="text-base md:text-lg text-black/80">
                 I went to high school during the COVID-19 pandemic, and, suddenly having an abundance of free time, fell in love with programming as a creative outlet. At a young age, I created a viral Scratch game that achieved over 1 million views, motivating me to continue designing games under the alias &quot;LWCoding&quot;. I&apos;ve made 30+ games with many different people since then.
                </p>
                <p className="text-base md:text-lg text-black/80">
                  That path eventually led me to Stanford, where I now lead the game development club and spend most of my time bettering the world through play. Officially, I&apos;m a product designer who loves talking with people, building things collaboratively, and shipping good user experiences.
                </p>
                <p className="text-base md:text-lg text-black/80">
                  Along the way, I&apos;ve discovered how much I enjoy teaching. I started off making silly, satire Python
                  tutorials, before eventually finding myself teaching for organizations like the Applied Computing Foundation and Stanford Splash. I now
                  teach official courses at Stanford like CS11SI and CS42SI, as well as assist with other intro and graduate-level game design courses like CS106A/B and CS247G!
                </p>
                <div className="pt-2">
                  <a
                    href="https://drive.google.com/file/d/1bhDVCsNctAiE20Tlae4XgHOV9VD2KVeh/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                    aria-label="View my Resume"
                  >
                    View my Resume
                  </a>
                </div>
              </div>

              {/* main image */}
              <div className="w-full md:w-[45%] relative mt-4 md:mt-0 overflow-hidden rounded-xl shadow-md min-h-[220px] md:min-h-0">
                <Image
                  src="/images/meinchicago.jpg"
                  alt="Lucas in Chicago"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

