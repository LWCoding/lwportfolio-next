import Image from "next/image";
import Link from "next/link";

type ExperienceCardProps = {
  href: string;
  ariaLabel: string;
  imageSrc: string;
  imageAlt: string;
  badgeLabel: string;
  badgeSecondary: string;
  badgeClassName: string;
  badgeTextClassName?: string;
  title: string;
  description: string;
  ringColorClassName: string;
};

export default function ExperienceCard({
  href,
  ariaLabel,
  imageSrc,
  imageAlt,
  badgeLabel,
  badgeSecondary,
  badgeClassName,
  badgeTextClassName = "",
  title,
  description,
  ringColorClassName,
}: ExperienceCardProps) {
  return (
    <Link
      href={href}
      className={`group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-black/5 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 ${ringColorClassName} focus:ring-offset-2 focus:ring-offset-white`}
      aria-label={ariaLabel}
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
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${badgeClassName} ${badgeTextClassName}`}
            >
              {badgeLabel}
            </span>
            <span className="text-xs font-semibold tracking-wide text-black/60">
              {badgeSecondary}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-black">
            {title}
          </h3>
          <p className="text-sm md:text-base text-black/80">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}


