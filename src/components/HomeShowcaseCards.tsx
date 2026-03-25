"use client";

import Image from "next/image";
import Link from "next/link";

export type ShowcasePill = "For Work" | "For Fun";

export type HomeShowcaseCardItem = {
  title: string;
  description: string;
  pill: ShowcasePill;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

function PillBadge({ pill }: { pill: ShowcasePill }) {
  const isFun = pill === "For Fun";
  const className = isFun
    ? "bg-yellow-400 text-black px-3 py-1 rounded-full text-[0.7rem] sm:text-xs font-medium shadow-sm"
    : "bg-gray-700 text-white px-3 py-1 rounded-full text-[0.7rem] sm:text-xs font-medium shadow-sm";
  return <span className={className}>{pill}</span>;
}

function ShowcaseCard({
  title,
  description,
  pill,
  href,
  imageSrc,
  imageAlt,
}: HomeShowcaseCardItem) {
  return (
    <Link
      href={href}
      className="group relative block h-full min-h-0 w-full min-w-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2"
      aria-label={`Open project: ${title}`}
    >
      <div className="relative aspect-[4/3] w-full min-h-[140px] sm:min-h-[148px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/65"
          aria-hidden
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-3 py-4 text-center sm:px-4 md:px-5">
          <h4 className="max-w-full text-xl font-bold leading-tight text-white drop-shadow-md sm:text-2xl md:text-[1.65rem]">
            {title}
          </h4>
          <div className="mt-2.5 flex justify-center">
            <PillBadge pill={pill} />
          </div>
          <p className="mt-2.5 max-w-[95%] text-xs leading-snug text-white/90 drop-shadow-md sm:text-sm md:max-w-[90%]">
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
