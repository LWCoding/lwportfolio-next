"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type WorkExperience = {
  id: string;
  dates: string;
  company: string;
  role: string;
  summary: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  /** Tailwind ring color shown on hover. */
  ringClassName: string;
};

const EXPERIENCES: WorkExperience[] = [
  {
    id: "nex",
    dates: "Jun 2026 – Sep 2026",
    company: "Nex Inc.",
    role: "Software Engineering Intern",
    summary: "Built motion games that get families moving together on Nex Playground.",
    href: "/projects/nex-playground",
    imageSrc: "/images/nex-img.webp",
    imageAlt: "Lucas holding Nex Playground box",
    ringClassName: "group-hover:ring-yellow-400 group-focus-visible:ring-yellow-400",
  },
  {
    id: "always-be-closing",
    dates: "Jun 2025 – Present",
    company: "Always Be Closing",
    role: "Game Developer",
    summary: "An AI-simulated sales negotiation game for practicing the art of the close.",
    href: "/projects/always-be-closing",
    imageSrc: "/images/alwaysbeclosing.png",
    imageAlt: "Always Be Closing game",
    ringClassName: "group-hover:ring-green-600 group-focus-visible:ring-green-600",
  },
  {
    id: "immersifyvr",
    dates: "Oct 2024 – Jun 2026",
    company: "ImmersifyVR",
    role: "Project Manager",
    summary: "Grant-funded VR exercise for older adults, tested in California retirement homes.",
    href: "/projects/immersifyvr",
    imageSrc: "/images/immersifyvr-bob.png",
    imageAlt: "ImmersifyVR virtual reality exercise",
    ringClassName: "group-hover:ring-blue-500 group-focus-visible:ring-blue-500",
  },
];

/** Delay between each card rising in (ms). Nex (first) is featured and drawn larger. */
const STAGGER_MS = 150;

export default function WorkExperienceCircles() {
  const rootRef = useRef<HTMLUListElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Rise the cards in once, the first time the row scrolls into view
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Timeline line through the circle centers (desktop); drawn left → right on reveal */}
      <span
        aria-hidden
        className={`hidden md:block absolute left-[16.667%] right-[16.667%] md:top-28 lg:top-36 h-[3px] -translate-y-1/2 rounded-full bg-gray-300 origin-left transition-transform duration-1000 ease-out motion-reduce:transition-none ${
          revealed ? "scale-x-100" : "scale-x-0"
        }`}
      />
      <ul ref={rootRef} className="relative grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-0" aria-label="Work experience">
        {EXPERIENCES.map((xp, i) => {
          const featured = i === 0;
          return (
            <li
              key={xp.id}
              className={`flex flex-col px-4 transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: revealed ? `${i * STAGGER_MS}ms` : "0ms" }}
            >
              {/* Timeline segment between stacked cards (mobile) */}
              {i > 0 && <span aria-hidden className="md:hidden block mx-auto mb-8 w-[3px] h-12 rounded-full bg-gray-300" />}
              <Link href={xp.href} className="group flex flex-1 flex-col items-center text-center outline-none">
                {/* Fixed-height slot so every circle's center sits on the timeline */}
                <div className="flex items-center justify-center md:h-56 lg:h-72">
                  <div
                    className={`relative ${featured ? "w-60 md:w-56 lg:w-72" : "w-44 md:w-40 lg:w-48"} aspect-square rounded-full overflow-hidden bg-white shadow-md ring-4 ring-transparent ring-offset-[6px] ring-offset-white transition-[box-shadow] duration-300 ${xp.ringClassName}`}
                  >
                    <Image
                      src={xp.imageSrc}
                      alt={xp.imageAlt}
                      fill
                      sizes={featured ? "288px" : "192px"}
                      className={`object-cover transition-transform duration-500 ease-out group-hover:scale-110 ${xp.imageClassName ?? ""}`}
                    />
                  </div>
                </div>
                <p className="pt-6 text-sm md:text-base font-medium text-black/75">{xp.dates}</p>
                <h3
                  className={`pt-1 ${featured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"} font-black text-black`}
                >
                  {xp.company}
                </h3>
                <p className="pt-1 text-base font-semibold text-gray-500">{xp.role}</p>
                <p className="pt-3 pb-5 text-base text-gray-700 leading-relaxed max-w-xs">{xp.summary}</p>
                {/* Same pill as the site's other "View Project" buttons; the whole card is the link */}
                <span className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 group-hover:bg-blue-600 text-white font-bold text-base rounded-full shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-[scale,background-color,box-shadow] duration-300">
                  View Project
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
