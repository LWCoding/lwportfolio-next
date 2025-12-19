"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface MonitorVideoProps {
  src: string;
  type?: 'image' | 'video' | 'auto';
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  objectFit?: 'contain' | 'cover';
  className?: string;
}

export default function MonitorVideo({
  src,
  type = 'auto',
  title,
  subtitle,
  autoPlay = true,
  loop = true,
  muted = true,
  objectFit = 'contain',
  className = ''
}: MonitorVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Determine if the source is a video or image
  const isVideo = type === 'auto' 
    ? /\.(mp4|webm|ogg|mov)$/i.test(src)
    : type === 'video';

  useEffect(() => {
    if (videoRef.current && autoPlay && isVideo) {
      // Attempt to play the video
      videoRef.current.play().catch(err => {
        console.log('Auto-play was prevented:', err);
      });
    }
  }, [autoPlay, isLoaded, isVideo]);

  // Positioning to fit within the monitor screen area
  // The monitor has bezels on all sides
  const contentStyle = {
    top: '3.5%',
    left: '1.5%',
    width: '97%',
    height: '68%',
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Text Header */}
      {(title || subtitle) && (
        <div className="text-center mb-8 md:mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl text-black/70">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Monitor Container */}
      <div className="relative w-full max-w-xl mx-auto">
        {/* Aspect ratio container to maintain proportions */}
        <div className="relative w-full" style={{ paddingBottom: '75%' }}>
          {/* Content Element - positioned absolutely within the screen area */}
          <div className="absolute inset-0">
            {isVideo ? (
              <>
                <video
                  ref={videoRef}
                  className="absolute"
                  style={{
                    ...contentStyle,
                    objectFit,
                  }}
                  autoPlay={autoPlay}
                  loop={loop}
                  muted={muted}
                  playsInline
                  onLoadedData={() => setIsLoaded(true)}
                >
                  <source src={src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Loading State for Video */}
                {!isLoaded && (
                  <div 
                    className="absolute bg-gray-100 flex items-center justify-center"
                    style={contentStyle}
                  >
                    <div className="text-gray-400">Loading video...</div>
                  </div>
                )}
              </>
            ) : (
              <div 
                className="absolute"
                style={contentStyle}
              >
                <Image
                  src={src}
                  alt={title || 'Monitor content'}
                  fill
                  className="object-contain"
                  style={{ objectFit }}
                  onLoadingComplete={() => setIsLoaded(true)}
                />
              </div>
            )}
          </div>

          {/* Monitor Frame - overlaid on top */}
          <Image
            src="/images/computer.png"
            alt="Monitor frame"
            fill
            className="relative z-10 pointer-events-none"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
