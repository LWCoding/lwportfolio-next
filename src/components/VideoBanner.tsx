"use client";

interface VideoBannerProps {
  videoSrc?: string;
  className?: string;
  minHeight?: string;
  height?: string;
  title?: string;
  subtitle?: string;
}

export default function VideoBanner({ 
  videoSrc = "/videos/GameShowcase.mp4",
  className = "",
  minHeight = "400px",
  height = "50vh",
  title,
  subtitle
}: VideoBannerProps) {
  return (
    <div 
      className={`relative bg-gray-800 overflow-hidden ${className}`}
      style={{ 
        height,
        minHeight: minHeight
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {/* Dark overlay to darken the video */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Text header with darker background */}
      {(title || subtitle) && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-black/70 px-8 py-6 rounded-lg backdrop-blur-sm">
            {title && (
              <h1 className="text-6xl font-bold text-white text-center mb-4">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-white/90 text-center">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

