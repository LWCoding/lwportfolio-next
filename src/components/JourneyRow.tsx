"use client";

import Image from "next/image";

interface JourneyRowProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bgColor: "bg-gray-100" | "bg-gray-200" | "bg-gray-300";
  layoutDirection: "left" | "right"; // "left" = text left/image right, "right" = image left/text right
}

export default function JourneyRow({
  title,
  description,
  imageSrc,
  imageAlt,
  bgColor,
  layoutDirection,
}: JourneyRowProps) {
  const isReversed = layoutDirection === "right";

  return (
    <div className={`w-full ${bgColor} relative overflow-hidden py-8 md:py-12`}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={`relative flex flex-col ${
            isReversed ? "md:flex-row-reverse" : "md:flex-row"
          } items-center`}
        >
          {/* Text Section */}
          <div
            className={`w-full md:w-[55%] space-y-4 md:space-y-6 ${
              isReversed ? "md:pl-8" : "md:pr-8"
            } relative z-10`}
          >
            <h3 className="text-2xl md:text-4xl font-bold text-black">
              {title}
            </h3>
            <p className="text-base md:text-xl text-gray-800 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Image Section with Diagonal Cut */}
          <div
            className={`w-full md:w-[45%] relative aspect-video md:aspect-auto md:h-[500px] mt-6 md:mt-0 ${
              isReversed ? "md:pr-8" : "md:pl-8"
            } overflow-hidden`}
          >
            <div className="absolute inset-0">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

