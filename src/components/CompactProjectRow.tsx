"use client";

import Image from "next/image";
import Link from "next/link";

interface CompactProjectRowProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  processUrl?: string;
  tags?: string[];
  date?: string;
  secondaryCtaLabel?: string;
  githubUrl?: string;
  /** When false, hides the external link (View Project / Play Game). Default true. */
  showExternalCta?: boolean;
}

function tagClassName(tag: string) {
  const base = "px-2 py-0.5 rounded-full text-[0.65rem] lg:text-xs font-medium whitespace-nowrap";
  if (tag === "Teaching") return `${base} bg-blue-500 text-white`;
  if (tag === "For Fun") return `${base} bg-yellow-400 text-black`;
  if (tag === "For Work") return `${base} bg-gray-700 text-white`;
  return `${base} bg-gray-200 text-black`;
}

const linkClass =
  "inline-flex items-center gap-1 whitespace-nowrap text-sm font-bold underline underline-offset-2 transition-colors";

/** Condensed list-view row for the projects page: small thumbnail on the left, details on the right. */
export default function CompactProjectRow({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  processUrl,
  tags = [],
  date,
  secondaryCtaLabel,
  githubUrl,
  showExternalCta = true,
}: CompactProjectRowProps) {
  const formattedDate =
    date && !Number.isNaN(new Date(date).getTime())
      ? new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : undefined;
  const hasExternalHref = Boolean(href?.trim());

  return (
    <div className="flex items-center gap-3 py-3 md:gap-4">
      <div className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-200 md:h-16 md:w-24">
        <Image src={imageSrc} alt={imageAlt} fill sizes="96px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-base font-bold text-black md:text-lg">{title}</h3>
          {formattedDate && <span className="text-xs text-black/60 md:text-sm">{formattedDate}</span>}
          {tags.length > 0 && (
            <div className="hidden flex-wrap gap-1.5 sm:flex">
              {tags.map((tag, i) => (
                <span key={i} className={tagClassName(tag)}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <p className="mt-0.5 line-clamp-1 text-sm text-black/70">{description}</p>
      </div>

      <div className="hidden flex-shrink-0 items-center gap-4 md:flex">
        {processUrl && (
          <Link href={processUrl} className={`${linkClass} text-blue-600 hover:text-blue-700`}>
            View Process
          </Link>
        )}
        {showExternalCta && hasExternalHref && (
          <Link
            href={href!}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} text-green-700 hover:text-green-800`}
          >
            {secondaryCtaLabel || "Open"}
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        )}
        {!hasExternalHref && !processUrl && (
          <Link href="/contact" className={`${linkClass} text-blue-600 hover:text-blue-700`}>
            Contact Me
          </Link>
        )}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub" className="opacity-80 transition-opacity hover:opacity-100">
            <Image src="/images/github.png" alt="GitHub" width={20} height={20} className="h-5 w-5 object-contain" />
          </a>
        )}
      </div>

      {/* On small screens the whole row's primary action is a single chevron link */}
      {(processUrl || (showExternalCta && hasExternalHref)) && (
        <Link
          href={processUrl ?? href!}
          {...(processUrl ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className="flex-shrink-0 p-1 text-black/50 hover:text-black md:hidden"
          aria-label={`Open ${title}`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      )}
    </div>
  );
}
