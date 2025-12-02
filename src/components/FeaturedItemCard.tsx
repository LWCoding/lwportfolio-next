"use client";

import Image from "next/image";
import Link from "next/link";

interface FeaturedItemCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
  onClick?: () => void;
}

export default function FeaturedItemCard({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  onClick,
}: FeaturedItemCardProps) {
  const content = (
    <div
      className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-start md:items-center"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      {/* Image Section - Left Side */}
      <div className="relative w-full md:w-2/5 bg-gray-200 aspect-[4/3] flex-shrink-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section - Right Side */}
      <div className="flex-1 flex flex-col gap-3 md:gap-4">
        {/* Title */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base md:text-lg text-black/80 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

