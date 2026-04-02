"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { projects } from "@/data/renderings";
import EdgeBleed from "@/components/EdgeBleed";
import { useSounds } from "@/components/SoundProvider";

export default function RenderingProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { play } = useSounds();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(true), 50);
    return () => clearTimeout(timer);
  }, []);

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
        setCurrentImageIndex((prev) => (prev + 1) % (project?.images.length || 1));
      }
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex(
          (prev) => (prev - 1 + (project?.images.length || 1)) % (project?.images.length || 1)
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50 && project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    } else if (distance < -50 && project) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-cream">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/renderings" className="text-cream-muted hover:opacity-70 transition-opacity underline">
            Back to Renderings
          </Link>
        </div>
      </div>
    );
  }

  const shouldRenderCarouselImage = (index: number) => {
    const total = project.images.length;
    const prev = (currentImageIndex - 1 + total) % total;
    const next = (currentImageIndex + 1) % total;
    return index === currentImageIndex || index === prev || index === next;
  };

  return (
    <div className="min-h-screen bg-black text-cream">
      {/* Back button */}
      <Link
        href="/renderings"
        className="fixed left-4 md:left-8 z-40 text-sm font-semibold uppercase tracking-[0.2em] transition-opacity opacity-60 hover:opacity-100 py-2 px-3"
        style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)", top: "80px" }}
        onMouseEnter={() => play("hover")}
        onClick={() => play("navigate")}
      >
        Back
      </Link>

      {/* Full screen image carousel */}
      <div
        className="relative w-full h-screen"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0">
          {project.images.map((image, index) => {
            if (!shouldRenderCarouselImage(index)) return null;
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
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover hidden md:block"
                  priority={index === 0}
                  quality={90}
                  sizes="100vw"
                />
                <div className="md:hidden w-full h-full flex items-center justify-center">
                  <EdgeBleed bleedHeight={80}>
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      style={{ width: "100%", height: "auto", maxHeight: "100vh", objectFit: "contain", display: "block" }}
                    />
                  </EdgeBleed>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side arrows */}
        {project.images.length > 1 && (
          <div
            className={`transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={() => {
                setCurrentImageIndex(
                  (prev) => (prev - 1 + project.images.length) % project.images.length
                );
                play("click");
              }}
              onMouseEnter={() => play("hover")}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 text-5xl md:text-6xl transition-opacity opacity-50 hover:opacity-100 p-2"
              style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
              aria-label="Previous image"
            >
              &lsaquo;
            </button>
            <button
              onClick={() => {
                setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
                play("click");
              }}
              onMouseEnter={() => play("hover")}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 text-5xl md:text-6xl transition-opacity opacity-50 hover:opacity-100 p-2"
              style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
              aria-label="Next image"
            >
              &rsaquo;
            </button>
          </div>
        )}

        {/* Scroll indicator */}
        <div
          className={`hidden md:block absolute bottom-8 right-8 text-sm transition-opacity duration-300 z-20 text-cream/40 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
          style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
        >
          Scroll for details
        </div>
      </div>

      {/* Project details */}
      <div className="relative bg-black px-8 py-8 -mt-35 md:mt-0 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{project.title}</h1>
            <div className="text-xl md:text-2xl mb-6 text-cream-muted">
              <p>
                {project.year} &bull; {project.instructor}
              </p>
            </div>
          </div>

          {/* Videos */}
          {project.videos && project.videos.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Videos</h2>
              <div className="space-y-8">
                {project.videos.map((video, index) => (
                  <div key={index} className="w-full max-w-3xl mx-auto">
                    <EdgeBleed bleedHeight={60}>
                      <video className="w-full h-auto block" controls preload="auto">
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </EdgeBleed>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {project.images.length > 1 && (
            <div className="masonry-container">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className="masonry-item transition-opacity hover:opacity-70 cursor-pointer"
                  style={{ opacity: index === currentImageIndex ? 0.5 : 1 }}
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Thumbnail ${index + 1}`}
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
