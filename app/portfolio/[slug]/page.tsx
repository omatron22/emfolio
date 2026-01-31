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
};

const shows: Show[] = [
    {
        slug: "great-comet",
        title: "Natasha, Pierre & The Great Comet of 1812",
        production: "UCLA School of Theater, Film and Television",
        year: "2025",
        director: "J. Ed Araiza",
        heroImage: "/portfolio/comet/comet1.jpg",
        images: [
            "/portfolio/comet/comet1.jpg",
            "/portfolio/comet/comet2.jpg",
            "/portfolio/comet/comet3.jpg",
            "/portfolio/comet/comet4.jpg",
            "/portfolio/comet/comet5.jpg",
            "/portfolio/comet/comet6.jpg",
            "/portfolio/comet/comet7.jpg",
            "/portfolio/comet/comet8.jpg",
            "/portfolio/comet/comet9.jpg",
            "/portfolio/comet/comet10.jpg",
            "/portfolio/comet/comet11.jpg",
            "/portfolio/comet/comet12.jpg",
            "/portfolio/comet/comet13.jpg",
            "/portfolio/comet/comet14.jpg",
            "/portfolio/comet/comet15.jpg",
            "/portfolio/comet/comet16.jpg",
            "/portfolio/comet/comet17.jpg",
            "/portfolio/comet/comet18.jpg",
            "/portfolio/comet/comet19.jpg",
            "/portfolio/comet/comet20.jpg",
            "/portfolio/comet/comet21.jpg",
            "/portfolio/comet/comet22.jpg",
            "/portfolio/comet/comet23.jpg",
            "/portfolio/comet/comet24.jpg",
        ],
    },
    {
        slug: "courage-to-right",
        title: "The Courage to Right a Woman's Wrongs",
        production: "UCLA School of Theater, Film and Television",
        year: "2024",
        director: "Michael Hackett",
        heroImage: "/portfolio/courage/courage1.jpg",
        images: [
            "/portfolio/courage/courage1.jpg",
            "/portfolio/courage/courage2.jpg",
            "/portfolio/courage/courage3.jpg",
            "/portfolio/courage/courage4.jpg",
            "/portfolio/courage/courage5.jpg",
            "/portfolio/courage/courage6.jpg",
            "/portfolio/courage/courage7.jpg",
            "/portfolio/courage/courage8.jpg",
            "/portfolio/courage/courage9.jpg",
            "/portfolio/courage/courage10.jpg",
        ],
    },
    {
        slug: "fairview",
        title: "Fairview",
        production: "UCLA School of Theater, Film and Television",
        year: "2023",
        director: "David H. Parker",
        heroImage: "/portfolio/fairview/fairview1.jpg",
        images: [
            "/portfolio/fairview/fairview1.jpg",
            "/portfolio/fairview/fairview2.jpg",
            "/portfolio/fairview/fairview3.jpg",
            "/portfolio/fairview/fairview4.jpg",
            "/portfolio/fairview/fairview5.jpg",
            "/portfolio/fairview/fairview6.jpg",
            "/portfolio/fairview/fairview7.jpg",
            "/portfolio/fairview/fairview8.jpg",
            "/portfolio/fairview/fairview9.jpg",
            "/portfolio/fairview/fairview10.jpg",
        ],
    },
    {
        slug: "keffiyeh-made-in-china",
        title: "Keffiyeh / Made in China",
        production: "UCLA School of Theater, Film and Television",
        year: "2023",
        director: "Yuval Zehavi",
        heroImage: "/portfolio/kmic/kmic1.jpg",
        images: [
            "/portfolio/kmic/kmic1.jpg",
            "/portfolio/kmic/kmic2.jpg",
            "/portfolio/kmic/kmic3.jpg",
            "/portfolio/kmic/kmic4.jpg",
            "/portfolio/kmic/kmic5.jpg",
            "/portfolio/kmic/kmic6.jpg",
        ],
    },
    {
        slug: "boxes",
        title: "BOXES",
        production: "The Academy - NYLA",
        year: "2024",
        director: "Michelle Stroffolino",
        heroImage: "/portfolio/boxes/box1.jpg",
        images: [
            "/portfolio/boxes/box1.jpg",
            "/portfolio/boxes/box2.jpg",
            "/portfolio/boxes/box3.jpg",
            "/portfolio/boxes/box4.jpg",
            "/portfolio/boxes/box5.jpg",
            "/portfolio/boxes/box6.jpg",
            "/portfolio/boxes/box7.jpg",
            "/portfolio/boxes/box8.jpg",
            "/portfolio/boxes/box9.jpg",
        ],
    },
    {
        slug: "acquaprofonda",
        title: "ACQUAPROFONDA",
        production: "Long Beach Opera",
        year: "2024",
        director: "Yekaterina Lynch",
        conductor: "Oliver Chan",
        heroImage: "/portfolio/aqua/aqua1.jpg",
        images: [
            "/portfolio/aqua/aqua1.jpg",
            "/portfolio/aqua/aqua2.jpg",
            "/portfolio/aqua/aqua3.jpg",
        ],
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
