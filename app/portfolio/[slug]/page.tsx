"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { shows } from "@/data/shows";
import EdgeBleed from "@/components/EdgeBleed";
import { useSounds } from "@/components/SoundProvider";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { play } = useSounds();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const { slug } = use(params);
  const show = shows.find((s) => s.slug === slug);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Hide scroll indicator after user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setHasScrolled(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev + 1) % (show?.images.length || 1));
      }
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex(
          (prev) => (prev - 1 + (show?.images.length || 1)) % (show?.images.length || 1)
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [show]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50 && show) {
      setCurrentImageIndex((prev) => (prev + 1) % show.images.length);
    } else if (distance < -50 && show) {
      setCurrentImageIndex((prev) => (prev - 1 + show.images.length) % show.images.length);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-cream">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/portfolio" className="text-cream-muted hover:opacity-70 transition-opacity underline">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const shouldRenderCarouselImage = (index: number) => {
    const total = show.images.length;
    const prev = (currentImageIndex - 1 + total) % total;
    const next = (currentImageIndex + 1) % total;
    return index === currentImageIndex || index === prev || index === next;
  };

  return (
    <div className="min-h-screen bg-black text-cream">
      {/* Back button */}
      <Link
        href="/portfolio"
        className="fixed top-8 left-4 md:left-8 z-30 text-sm font-semibold uppercase tracking-[0.2em] transition-opacity opacity-60 hover:opacity-100"
        style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)", marginTop: "52px" }}
        onMouseEnter={() => play("hover")}
        onClick={() => play("navigate")}
      >
        &larr; Back
      </Link>

      {/* Full screen image carousel */}
      <div
        className="relative w-full h-screen"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0">
          {show.images.map((image, index) => {
            if (!shouldRenderCarouselImage(index)) return null;

            const isBox4 = show.slug === "boxes" && image.includes("/portfolio/boxes/box4.jpg");
            const isAqua2 = show.slug === "acquaprofonda" && image.includes("/portfolio/aqua/aqua2.jpg");
            const useContain = isBox4 || isAqua2;

            return (
              <div
                key={image}
                className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: index === currentImageIndex ? 1 : 0,
                  zIndex: index === currentImageIndex ? 1 : 0,
                  pointerEvents: index === currentImageIndex ? "auto" : "none",
                }}
              >
                {/* Desktop */}
                <div className="hidden md:block w-full h-full relative">
                  <Image
                    src={image}
                    alt={`${show.title} - Image ${index + 1}`}
                    fill
                    className={useContain ? "object-contain" : "object-cover"}
                    priority={index === 0}
                    quality={90}
                    sizes="100vw"
                  />
                </div>

                {/* Mobile */}
                <div className="md:hidden w-full h-full flex items-center justify-center">
                  <EdgeBleed bleedHeight={80}>
                    <img
                      src={image}
                      alt={`${show.title} - Image ${index + 1}`}
                      style={{ width: "100%", height: "auto", maxHeight: "100vh", objectFit: "contain", display: "block" }}
                    />
                  </EdgeBleed>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side arrows - desktop only */}
        {show.images.length > 1 && (
          <div
            className={`hidden md:block transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={() =>
                setCurrentImageIndex(
                  (prev) => (prev - 1 + show.images.length) % show.images.length
                )
              }
              className="absolute left-8 top-1/2 -translate-y-1/2 z-20 text-4xl transition-opacity opacity-60 hover:opacity-100"
              style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
              aria-label="Previous image"
            >
              &lsaquo;
            </button>
            <button
              onClick={() =>
                setCurrentImageIndex((prev) => (prev + 1) % show.images.length)
              }
              className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-4xl transition-opacity opacity-60 hover:opacity-100"
              style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
              aria-label="Next image"
            >
              &rsaquo;
            </button>
          </div>
        )}

        {/* Dot indicators */}
        {show.images.length > 1 && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 z-20 flex gap-2 transition-opacity duration-300 bottom-40 md:bottom-8 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            {show.images.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentImageIndex(index); play("click"); }}
                className="transition-all"
                aria-label={`Go to image ${index + 1}`}
                style={{
                  width: index === currentImageIndex ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  backgroundColor:
                    index === currentImageIndex ? "#E8DCC4" : "rgba(232, 220, 196, 0.4)",
                }}
              />
            ))}
          </div>
        )}

        {/* Scroll indicator - hides after scrolling */}
        {!hasScrolled && (
          <div
            className={`hidden md:block absolute bottom-8 right-8 text-sm animate-bounce transition-opacity duration-300 z-20 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
            style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
          >
            Scroll for details &darr;
          </div>
        )}
      </div>

      {/* Project details */}
      <div className="relative bg-black px-8 py-8 -mt-35 md:mt-0 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{show.title}</h1>
            <div className="text-xl md:text-2xl mb-6 text-cream-muted">
              <p className="mb-2">{show.production}</p>
              <p>{show.year}</p>
            </div>
          </div>

          {/* Credits */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-3 text-center md:text-left max-w-7xl mx-auto text-base text-cream-muted">
              {show.credits.map((credit, index) => (
                <div key={index} className="md:whitespace-nowrap">
                  <span className="font-semibold">{credit.role}:</span> <span>{credit.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Thumbnail gallery */}
          {show.images.length > 1 && (
            <div className="masonry-container">
              {show.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className="masonry-item transition-opacity hover:opacity-70 cursor-pointer"
                  style={{ opacity: index === currentImageIndex ? 0.5 : 1 }}
                >
                  <Image
                    src={image}
                    alt={`${show.title} - Thumbnail ${index + 1}`}
                    width={600}
                    height={800}
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
