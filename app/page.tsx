"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import EdgeBleed from "@/components/EdgeBleed";

type HeroImg = {
  src: string;
  alt: string;
  play: string;
};

const heroImages: HeroImg[] = [
  { src: "/portfolio/emma/emma1.jpg", alt: "Emma: No One But Herself", play: "Emma" },
  { src: "/portfolio/comet/comet1.jpg", alt: "Great Comet production", play: "Great Comet" },
  { src: "/portfolio/emma/emma6.jpg", alt: "Emma: No One But Herself", play: "Emma" },
  { src: "/portfolio/comet/comet10.jpg", alt: "Great Comet production", play: "Great Comet" },
  { src: "/portfolio/courage/courage1.jpg", alt: "The Courage to Right a Woman's Wrongs", play: "Courage" },
  { src: "/portfolio/kmic/kmic4.jpg", alt: "Keffiyeh / Made in China production", play: "Keffiyeh / Made in China" },
  { src: "/portfolio/fairview/fairview6.jpg", alt: "Fairview production", play: "Fairview" },
  { src: "/portfolio/kmic/kmic7.jpg", alt: "Keffiyeh / Made in China production", play: "Keffiyeh / Made in China" },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Auto-advance slideshow
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

  // Mouse spotlight - direct DOM update to avoid rerenders
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(circle 500px at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,1.00) 0%, transparent 40%)`;
    }
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
    if (distance > 50) {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    } else if (distance < -50) {
      setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Only render current and adjacent slides
  const shouldRender = (index: number) => {
    const total = heroImages.length;
    const prev = (currentIndex - 1 + total) % total;
    const next = (currentIndex + 1) % total;
    return index === currentIndex || index === prev || index === next;
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black overflow-hidden text-cream"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-screen images with crossfade */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => {
          if (!shouldRender(index)) return null;
          return (
            <div
              key={image.src}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                zIndex: index === currentIndex ? 1 : 0,
              }}
            >
              {/* Mobile: edge bleed effect */}
              <div className="md:hidden w-full h-full flex items-center justify-center">
                <EdgeBleed bleedHeight={80}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{ width: "100%", height: "auto", maxHeight: "100vh", objectFit: "contain", display: "block" }}
                  />
                </EdgeBleed>
              </div>

              {/* Desktop: full cover with Next Image */}
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
          );
        })}
      </div>

      {/* Spotlight effect - direct DOM ref for performance */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay hidden md:block"
      />

      {/* Indicator dots */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="transition-all"
            aria-label={`Go to image ${index + 1}`}
            style={{
              width: index === currentIndex ? "48px" : "12px",
              height: "12px",
              borderRadius: "999px",
              backgroundColor:
                index === currentIndex ? "#E8DCC4" : "rgba(232, 220, 196, 0.4)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
