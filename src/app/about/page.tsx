"use client";

import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import VideoBanner from "@/components/VideoBanner";
import Footer from "@/components/Footer";
import Image from "next/image";
import SectionDoodles from "@/components/SectionDoodles";
import { RESUME_URL } from "@/components/ResumeButton";
import type { ReactNode } from "react";

/** A chapter of the story, headed Past / Present / Future. */
function StoryPart({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 inline-flex flex-col">
        <span className="text-2xl font-black text-black md:text-3xl">{label}</span>
        <span aria-hidden className="mt-2 h-1 rounded-full bg-yellow-400" />
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function ResumeLink() {
  return (
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
    >
      View my Resume
    </a>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col pt-[56px]">
      <Navigation />

      {/* hero video banner */}
      <VideoBanner title="About" height="33vh" minHeight="200px" />

      <Section
        id="journey"
        separator={false}
        container={false}
        padding={false}
        className="px-0 scroll-mt-[64px]"
      >
        <div className="relative w-full bg-white py-10 md:py-14">
          <SectionDoodles theme="mixed" count={8} seed={71} contentWidth={1180} />
          <div className="relative container mx-auto max-w-[1000px] px-4 md:px-6">
            <div className="space-y-12 text-base text-black/80 md:text-lg">
              <div className="text-center">
                <ResumeLink />
              </div>
              <StoryPart label="Past">
                <p>
                  I was born in Chicago to immigrant parents from Malaysia. Since I was young, I&apos;ve been drawn to creativity, having drawn over 200 pages of hand-drawn comics in elementary school alone.
                </p>
                <p>
                  I went to high school during the COVID-19 pandemic, and, suddenly having an abundance of free time, fell in love with programming as a creative outlet. At a young age, I created a viral Scratch game that achieved over 1 million views, motivating me to continue designing games under the alias &quot;LWCoding&quot;. I&apos;ve made 30+ games with many different people since then.
                </p>
              </StoryPart>
              <StoryPart label="Present">
                <p>
                  That path eventually led me to Stanford, where I now lead the game development club and spend most of my time bettering the world through play. Officially, I&apos;m a product designer who loves talking with people, building things collaboratively, and shipping good user experiences.
                </p>
                <p>
                  Along the way, I&apos;ve discovered how much I enjoy teaching. I started off making silly, satire Python
                  tutorials, before eventually finding myself teaching for organizations like the Applied Computing Foundation and Stanford Splash. I now
                  teach official courses at Stanford like CS11SI and CS42SI, as well as assist with other intro and graduate-level game design courses like CS106A/B and CS247G!
                </p>
              </StoryPart>
              <StoryPart label="Future">
                <p>
                  Next, I&apos;m finishing my B.S. in Design and M.S. in Computer Science at Stanford, and I plan to keep designing games and teaching along the way.
                </p>
              </StoryPart>
              {/* Five photos of me spliced into vertical strips: many hats */}
              <div className="relative aspect-[127/75] w-full overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/images/manyhats.jpg"
                  alt="Five photos of Lucas spliced side by side: in Chicago, teaching, leading a club, traveling, and volunteering"
                  fill
                  sizes="(min-width: 1000px) 1000px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="pt-4 text-center">
                <ResumeLink />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
