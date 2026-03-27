"use client";

import Image from "next/image";
import Link from "next/link";

export type ShowcasePill = "For Work" | "For Fun";

export type HomeShowcaseCardItem = {
  title: string;
  description: string;
  pills: ShowcasePill[];
  href: string;
  imageSrc: string;
  imageAlt: string;
};

function PillBadge({ pill, onDark }: { pill: ShowcasePill; onDark?: boolean }) {
  const isFun = pill === "For Fun";
  if (onDark) {
    const className = isFun
      ? "bg-yellow-400 text-black px-3 py-1 rounded-full text-[0.7rem] sm:text-xs font-medium shadow-sm"
      : "rounded-full border border-white/35 bg-white/15 px-3 py-1 text-[0.7rem] font-medium text-white sm:text-xs";
    return <span className={className}>{pill}</span>;
  }
  const className = isFun
    ? "bg-yellow-400 text-black px-3 py-1 rounded-full text-[0.7rem] sm:text-xs font-medium shadow-sm"
    : "bg-gray-700 text-white px-3 py-1 rounded-full text-[0.7rem] sm:text-xs font-medium shadow-sm";
  return <span className={className}>{pill}</span>;
}

function ShowcaseCard({
  title,
  description,
  pills,
  href,
  imageSrc,
  imageAlt,
}: HomeShowcaseCardItem) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full min-h-0 w-full min-w-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2"
      aria-label={`Open project: ${title} (opens in new tab)`}
    >
      <div className="relative aspect-[4/3] w-full min-h-[120px] overflow-hidden sm:min-h-[128px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-black/20 transition-all duration-500 ease-out group-hover:bg-black/5 group-hover:scale-[1.04]"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute right-2 top-2 z-[11] flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md ring-1 ring-black/10 sm:right-3 sm:top-3 sm:h-9 sm:w-9"
          aria-hidden
        >
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 rounded-b-xl bg-gray-900/90 px-3 py-3 sm:px-4 sm:py-3.5">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
            <h4 className="min-w-0 flex-1 text-left text-base font-bold leading-snug text-white sm:text-lg md:text-xl">
              {title}
            </h4>
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5 sm:gap-2">
              {pills.map((pill, index) => (
                <PillBadge key={`${pill}-${index}`} pill={pill} onDark />
              ))}
            </div>
          </div>
          <p className="mt-2 text-left text-xs leading-snug text-white sm:text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function HomeShowcaseCards({ cards }: { cards: HomeShowcaseCardItem[] }) {
  const gridClass =
    cards.length === 2
      ? "grid grid-cols-1 gap-3 md:grid-cols-2"
      : "grid grid-cols-1 gap-3 md:grid-cols-3";

  return (
    <div className="mt-5 w-full md:mt-6">
      <div className={gridClass}>
        {cards.map((card) => (
          <ShowcaseCard key={`${card.href}-${card.title}`} {...card} />
        ))}
      </div>
    </div>
  );
}
