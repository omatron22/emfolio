"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type HeroImg = {
  src: string;
  alt: string;
  play: string;
};

// Curated hero images
const heroImages: HeroImg[] = [
  { src: "/portfolio/comet/comet1.jpg", alt: "Great Comet production", play: "Great Comet" },
  { src: "/portfolio/comet/comet10.jpg", alt: "Great Comet production", play: "Great Comet" },
  { src: "/portfolio/courage/courage1.jpg", alt: "The Courage to Right a Woman's Wrongs", play: "Courage" },
  { src: "/portfolio/kmic/kmic4.jpg", alt: "Keffiyeh / Made in China production", play: "Keffiyeh / Made in China" },
  { src: "/portfolio/fairview/fairview6.jpg", alt: "Fairview production", play: "Fairview" },
  { src: "/portfolio/kmic/kmic7.jpg", alt: "Keffiyeh / Made in China production", play: "Keffiyeh / Made in China" },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-advance slideshow - restarts whenever currentIndex changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 12000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Track mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black overflow-hidden"
      style={{ color: "#E8DCC4" }}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-screen images with crossfade */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0,
            }}
          >
            {/* Mobile: Use native img with fade mask - keeps your effect! */}
            <div className="md:hidden w-full h-full flex items-center justify-center">
              <img
                src={image.src}
                alt={image.alt}
                className="mobile-faded-image"
              />
            </div>

            {/* Desktop: full cover with Next Image for optimization */}
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index < 2}
                quality={90}
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Spotlight effect - adds subtle brightness where mouse is */}
      <div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay hidden md:block"
        style={{
          background: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,1.00) 0%, transparent 40%)`,
        }}
      />

      {/* Centered indicator dots - beige color */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="transition-all hover:brightness-110"
            aria-label={`Go to image ${index + 1}`}
            style={{
              width: index === currentIndex ? "48px" : "12px",
              height: "12px",
              borderRadius: "999px",
              backgroundColor: index === currentIndex ? "#E8DCC4" : "rgba(232, 220, 196, 0.4)",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .mobile-faded-image {
          width: 100%;
          height: auto;
          max-height: 100vh;
          object-fit: contain;
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
        }
      `}</style>
    </div>
  );
}
