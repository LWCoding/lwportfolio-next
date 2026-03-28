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
  /** Shown beside title: "Ongoing" if still active, else the year (e.g. shipped or jam year). */
  status: "ongoing" | number;
};

function PillBadge({ pill, onDark }: { pill: ShowcasePill; onDark?: boolean }) {
  const isFun = pill === "For Fun";
  if (onDark) {
    const className = isFun
      ? "bg-yellow-400 px-2.5 py-0.5 text-xs font-medium text-black shadow-sm sm:px-3 sm:py-1 sm:text-sm rounded-full"
      : "rounded-full border border-white/35 bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white sm:px-3 sm:py-1 sm:text-sm";
    return <span className={className}>{pill}</span>;
  }
  const className = isFun
    ? "bg-yellow-400 px-2.5 py-0.5 text-xs font-medium text-black shadow-sm sm:px-3 sm:py-1 sm:text-sm rounded-full"
    : "rounded-full bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-white sm:px-3 sm:py-1 sm:text-sm";
  return <span className={className}>{pill}</span>;
}

function ShowcaseCard({
  title,
  description,
  pills,
  href,
  imageSrc,
  imageAlt,
  status,
}: HomeShowcaseCardItem) {
  const statusLabel = status === "ongoing" ? "Ongoing" : String(status);
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full min-h-0 w-full min-w-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2"
      aria-label={`Open project: ${title}, ${statusLabel} (opens in new tab)`}
    >
      {/* Mobile: image 1/3 left, copy 2/3 right. md+: stacked card (image top) in 3-up grid. */}
      <div className="flex min-h-[120px] w-full flex-row items-stretch overflow-hidden sm:min-h-[128px] md:aspect-[4/3] md:min-h-0 md:flex-col">
        <div className="relative w-1/3 min-w-0 shrink-0 overflow-hidden rounded-l-xl md:w-full md:flex-1 md:rounded-l-none md:rounded-t-xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 767px) 33vw, 33vw"
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-black/20 transition-all duration-500 ease-out group-hover:bg-black/60 group-hover:scale-[1.04]"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-0 z-[6] flex items-center justify-center px-2 md:px-4"
            aria-hidden
          >
            <span className="text-center text-sm font-bold tracking-wide text-white opacity-0 shadow-black/40 drop-shadow-md transition-all duration-300 ease-out translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 sm:text-base md:text-xl lg:text-2xl">
              View Project
            </span>
          </div>

          <div
            className="pointer-events-none absolute right-1 top-1 z-[11] flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md ring-1 ring-black/10 sm:right-2 sm:top-2 sm:h-8 sm:w-8 md:right-3 md:top-3 md:h-9 md:w-9"
            aria-hidden
          >
            <svg
              className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 flex w-2/3 min-w-0 flex-col justify-center rounded-r-xl bg-gray-900/90 px-5 py-2.5 sm:px-3 sm:py-3 md:w-full md:shrink-0 md:rounded-r-none md:rounded-b-xl md:px-4 md:py-3.5">
          <div className="flex flex-col gap-y-1 text-left sm:gap-y-2.5 md:gap-y-1.5">
            <div className="flex min-w-0 flex-col gap-y-2 md:flex-row md:items-baseline md:justify-between md:gap-x-3 md:gap-y-0">
              <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5 text-left md:min-w-0 md:flex-1">
                <h4 className="text-base font-bold leading-snug text-white text-lg">
                  {title}
                </h4>
                <span className="text-sm font-medium tabular-nums text-white/70">
                  {statusLabel}
                </span>
              </div>
              <div className="hidden flex-wrap items-center justify-end gap-x-2 gap-y-1 md:flex md:shrink-0">
                {pills.map((pill, index) => (
                  <PillBadge key={`${pill}-${index}`} pill={pill} onDark />
                ))}
              </div>
            </div>
            <p className="text-base leading-relaxed text-white/80 text-sm">
              {description}
            </p>
          </div>
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
    <div className="w-full">
      <div className={gridClass}>
        {cards.map((card) => (
          <ShowcaseCard key={`${card.href}-${card.title}`} {...card} />
        ))}
      </div>
    </div>
  );
}
