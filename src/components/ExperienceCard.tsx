import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";

type ExperienceCardProps = {
  href: string;
  ariaLabel: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  ringColorClassName: string;
  subButtonLabel?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export default function ExperienceCard({
  href,
  ariaLabel,
  imageSrc,
  imageAlt,
  title,
  description,
  subButtonLabel,
  onClick,
}: ExperienceCardProps) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-default"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row min-h-[220px] md:min-h-[280px]">
        <div className="relative w-full md:w-1/3 bg-gray-200 aspect-[4/3] max-h-60 md:max-h-none md:aspect-auto md:h-auto">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-4 justify-center">
          <h3 className="text-2xl font-bold text-black">
            {title}
          </h3>
          <p className="text-base text-black/80">
            {description}
          </p>

          {subButtonLabel && (
            <div className="mt-2">
              <Link
                href={href}
                aria-label={ariaLabel}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>{subButtonLabel}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
