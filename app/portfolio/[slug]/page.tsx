"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, use } from "react";

type Show = {
    slug: string;
    title: string;
    production: string;
    year: string;
    director: string;
    conductor?: string;
    heroImage: string;
    images: string[];
    description: string;
};

const shows: Show[] = [
    {
        slug: "great-comet",
        title: "Natasha, Pierre & The Great Comet of 1812",
        production: "UCLA School of Theater, Film and Television",
        year: "2025",
        director: "J. Ed Araiza",
        heroImage: "/portfolio/hero-1.12.jpg",
        images: [
            "/portfolio/hero-1.12.jpg",
            "/portfolio/hero-1.0.jpg",
            "/portfolio/hero-1.1.jpg",
            "/portfolio/hero-1.2.jpg",
            "/portfolio/hero-1.3.jpg",
            "/portfolio/hero-1.4.jpg",
            "/portfolio/hero-1.5.jpg",
            "/portfolio/hero-1.6.jpg",
            "/portfolio/hero-1.8.jpg",
            "/portfolio/hero-1.9.jpg",
            "/portfolio/hero-1.10.jpg",
            "/portfolio/hero-1.11.jpg",
            "/portfolio/hero-1.7.jpg",
            "/portfolio/hero-1.13.jpg",
            "/portfolio/hero-1.14.jpg",
            "/portfolio/hero-1.15.jpg",
            "/portfolio/hero-1.16.jpg",
            "/portfolio/hero-1.17.jpg",
            "/portfolio/hero-1.18.jpg",
        ],
        description:
            "An intimate, immersive production exploring themes of love, war, and redemption through innovative lighting techniques.",
    },
    {
        slug: "courage-to-right",
        title: "The Courage to Right a Woman's Wrongs",
        production: "UCLA School of Theater, Film and Television",
        year: "2024",
        director: "Michael Hackett",
        heroImage: "/portfolio/hero-2.1.jpg",
        images: [
            "/portfolio/hero-2.1.jpg",
            "/portfolio/hero-2.0.jpg",
            "/portfolio/hero-2.2.jpg",
            "/portfolio/hero-2.3.jpg",
            "/portfolio/hero-2.4.jpg",
            "/portfolio/hero-2.5.jpg",
            "/portfolio/hero-2.6.jpg",
            "/portfolio/hero-2.7.jpg",
            "/portfolio/hero-2.8.jpg",
            "/portfolio/hero-2.9.jpg",
            "/portfolio/hero-2.10.jpg",
            "/portfolio/hero-2.11.jpg",
        ],
        description: "Your description...",
    },
    {
        slug: "fairview",
        title: "Fairview",
        production: "UCLA School of Theater, Film and Television",
        year: "2023",
        director: "David H. Parker",
        heroImage: "/portfolio/hero-3.6.jpg",
        images: [
            "/portfolio/hero-3.6.jpg",
            "/portfolio/hero-3.0.jpg",
            "/portfolio/hero-3.1.jpg",
            "/portfolio/hero-3.2.jpg",
            "/portfolio/hero-3.3.jpg",
            "/portfolio/hero-3.4.jpg",
            "/portfolio/hero-3.5.jpg",
            "/portfolio/hero-3.7.jpg",
            "/portfolio/hero-3.8.jpg",
            "/portfolio/hero-3.10.jpg",
            "/portfolio/hero-3.11.jpg",
            "/portfolio/hero-3.12.jpg",
            "/portfolio/hero-3.13.jpg",
            "/portfolio/hero-3.14.jpg",
        ],
        description: "Your description...",
    },
    {
        slug: "keffiyeh-made-in-china",
        title: "Keffiyeh / Made in China",
        production: "UCLA School of Theater, Film and Television",
        year: "2023",
        director: "Yuval Zehavi",
        heroImage: "/portfolio/hero-4.2.jpg",
        images: [
            "/portfolio/hero-4.2.jpg",
            "/portfolio/hero-4.0.jpg",
            "/portfolio/hero-4.1.jpg",
            "/portfolio/hero-4.3.jpg",
            "/portfolio/hero-4.4.jpg",
        ],
        description: "Your description...",
    },
    {
        slug: "boxes",
        title: "BOXES",
        production: "The Academy - NYLA",
        year: "2024",
        director: "Michelle Stroffolino",
        heroImage: "/portfolio/hero-5.5.jpg",
        images: [
            "/portfolio/hero-5.5.jpg",
            "/portfolio/hero-5.1.jpg",
            "/portfolio/hero-5.2.jpg",
            "/portfolio/hero-5.3.jpg",
            "/portfolio/hero-5.0.jpg",
        ],
        description: "Your description...",
    },
    {
        slug: "acquaprofonda",
        title: "ACQUAPROFONDA",
        production: "Long Beach Opera",
        year: "2024",
        director: "Yekaterina Lynch",
        conductor: "Oliver Chan",
        heroImage: "/portfolio/hero-6.0.jpg",
        images: [
            "/portfolio/hero-6.0.jpg",
            "/portfolio/hero-6.1.jpg",
            "/portfolio/hero-6.2.jpg",
        ],
        description: "Your description...",
    },
];

export default function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const { slug } = use(params);
    const show = shows.find((s) => s.slug === slug);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowControls(true);
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                setCurrentImageIndex((prev) => (prev + 1) % (show?.images.length || 1));
            }
            if (e.key === "ArrowLeft") {
                setCurrentImageIndex(
                    (prev) =>
                        (prev - 1 + (show?.images.length || 1)) % (show?.images.length || 1)
                );
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [show]);

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

        if (isLeftSwipe && show) {
            setCurrentImageIndex((prev) => (prev + 1) % show.images.length);
        }
        if (isRightSwipe && show) {
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
        return null;
    }

    // Helper to determine which carousel images to render (current + adjacent for preloading)
    const shouldRenderCarouselImage = (index: number) => {
        const total = show.images.length;
        const prev = (currentImageIndex - 1 + total) % total;
        const next = (currentImageIndex + 1) % total;
        return index === currentImageIndex || index === prev || index === next;
    };

    return (
        <div className="min-h-screen bg-black" style={{ color: "#E8DCC4" }}>
            {/* Full screen image carousel */}
            <div
                className="relative w-full h-screen"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="absolute inset-0">
                    {/* Only render current + adjacent images for performance */}
                    {show.images.map((image, index) => {
                        if (!shouldRenderCarouselImage(index)) return null;

                        return (
                            <div
                                key={image}
                                className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                                style={{
                                    opacity: index === currentImageIndex ? 1 : 0,
                                    zIndex: index === currentImageIndex ? 1 : 0,
                                    pointerEvents: index === currentImageIndex ? 'auto' : 'none',
                                }}
                            >
                                {/* Desktop: object-cover with Next.js Image */}
                                <Image
                                    src={image}
                                    alt={`${show.title} - Image ${index + 1}`}
                                    fill
                                    className="object-cover hidden md:block"
                                    priority={index === 0}
                                    quality={90}
                                    sizes="100vw"
                                />

                                {/* Mobile: native img with fade effect */}
                                <div className="md:hidden w-full h-full flex items-center justify-center">
                                    <img
                                        src={image}
                                        alt={`${show.title} - Image ${index + 1}`}
                                        className="mobile-faded-image"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Side arrows - desktop only */}
                {show.images.length > 1 && (
                    <div
                        className={`hidden md:block transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <button
                            onClick={() =>
                                setCurrentImageIndex(
                                    (prev) => (prev - 1 + show.images.length) % show.images.length
                                )
                            }
                            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 text-4xl hover:scale-110 transition-transform"
                            style={{ color: "#E8DCC4", textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button
                            onClick={() =>
                                setCurrentImageIndex((prev) => (prev + 1) % show.images.length)
                            }
                            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-4xl hover:scale-110 transition-transform"
                            style={{ color: "#E8DCC4", textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
                            aria-label="Next image"
                        >
                            ›
                        </button>
                    </div>
                )}

                {/* Dot indicators - moved higher on mobile */}
                {show.images.length > 1 && (
                    <div
                        className={`absolute left-1/2 -translate-x-1/2 z-20 flex gap-2 transition-opacity duration-300 bottom-40 md:bottom-8 ${showControls ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {show.images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className="transition-all"
                                aria-label={`Go to image ${index + 1}`}
                                style={{
                                    width: index === currentImageIndex ? "32px" : "8px",
                                    height: "8px",
                                    borderRadius: "999px",
                                    backgroundColor:
                                        index === currentImageIndex
                                            ? "#E8DCC4"
                                            : "rgba(232, 220, 196, 0.4)",
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Desktop scroll indicator - increased z-index */}
                <div
                    className={`hidden md:block absolute bottom-8 right-8 text-sm animate-bounce transition-opacity duration-300 z-20 ${showControls ? "opacity-100" : "opacity-0"
                        }`}
                    style={{ color: "#E8DCC4", textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
                >
                    Scroll for details ↓
                </div>
            </div>

            {/* Project details below - use negative margin on mobile to pull it up */}
            <div className="relative bg-black px-8 py-8 -mt-35 md:mt-0 md:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Title and info */}
                    <div className="mb-16">
                        <h1
                            className="text-5xl md:text-6xl font-bold mb-6"
                            style={{ color: "#E8DCC4" }}
                        >
                            {show.title}
                        </h1>
                        <div className="text-xl md:text-2xl mb-6" style={{ color: "#D4C5A9" }}>
                            <p className="mb-2">{show.production}</p>
                            <p>
                                {show.year} • Director: {show.director}
                                {show.conductor && ` • Conductor: ${show.conductor}`}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div
                        className="text-lg md:text-xl leading-relaxed mb-16"
                        style={{ color: "#D4C5A9" }}
                    >
                        <p>{show.description}</p>
                    </div>

                    {/* Production Credits */}
                    <div className="mb-16">
                        <div
                            className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-base"
                            style={{ color: "#D4C5A9" }}
                        >
                            <div>
                                <span className="font-semibold">Director:</span> {show.director}
                            </div>
                            {show.conductor && (
                                <div>
                                    <span className="font-semibold">Conductor:</span> {show.conductor}
                                </div>
                            )}
                            <div>
                                <span className="font-semibold">Lighting Designer:</span> Em Moore
                            </div>
                        </div>
                    </div>

                    {/* Gallery - lazy loaded masonry with Next.js Image */}
                    {show.images.length > 1 && (
                        <div className="masonry-container">
                            {show.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleThumbnailClick(index)}
                                    className="masonry-item transition-opacity hover:opacity-70 cursor-pointer"
                                    style={{
                                        opacity: index === currentImageIndex ? 0.5 : 1,
                                    }}
                                >
                                    <Image
                                        src={image}
                                        alt={`${show.title} - Thumbnail ${index + 1}`}
                                        width={600}
                                        height={800}
                                        className="masonry-image"
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

                .masonry-container {
                    column-count: 2;
                    column-gap: 12px;
                }

                @media (min-width: 768px) {
                    .masonry-container {
                        column-count: 3;
                        column-gap: 12px;
                    }
                }

                .masonry-item {
                    break-inside: avoid;
                    margin-bottom: 12px;
                    display: block;
                }

                .masonry-image {
                    width: 100%;
                    height: auto;
                    display: block;
                }
            `}</style>
        </div>
    );
}
