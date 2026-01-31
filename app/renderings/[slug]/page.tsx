"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, use } from "react";

type RenderProject = {
    slug: string;
    title: string;
    instructor: string;
    year: string;
    heroImage: string;
    images: string[];
    videos?: string[];
};

const projects: RenderProject[] = [
    {
        slug: "maya",
        title: "MAYA",
        instructor: "Nathan Schroeder",
        year: "2023",
        heroImage: "/renderings/Maya/Maya1.jpg",
        images: [
            "/renderings/Maya/Maya1.jpg",
            "/renderings/Maya/Maya2.jpg",
            "/renderings/Maya/Maya3.jpg",
        ],
    },
    {
        slug: "cinema",
        title: "CINEMA 4D",
        instructor: "Jeff Behm",
        year: "2024",
        heroImage: "/renderings/Cinema/Cinema1.png",
        images: [
            "/renderings/Cinema/Cinema1.png",
        ],
    },
    {
        slug: "twin",
        title: "TWIN MOTION",
        instructor: "Ellen King",
        year: "2025",
        heroImage: "/renderings/Twin/Twin1.jpg",
        images: [
            "/renderings/Twin/Twin1.jpg",
            "/renderings/Twin/Twin2.jpg",
            "/renderings/Twin/Twin3.jpg",
            "/renderings/Twin/Twin4.jpg",
            "/renderings/Twin/Twin5.jpg",
            "/renderings/Twin/Twin6.jpg",
            "/renderings/Twin/Twin7.jpg",
            "/renderings/Twin/Twin8.jpg",
            "/renderings/Twin/Twin9.jpg",
            "/renderings/Twin/Twin10.jpg",
        ],
        videos: [
            "/renderings/Twin/Twin11.MP4",
        ],
    },
];

export default function RenderingProjectPage({
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
    const project = projects.find((p) => p.slug === slug);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowControls(true);
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                setCurrentImageIndex((prev) => (prev + 1) % (project?.images.length || 1));
            }
            if (e.key === "ArrowLeft") {
                setCurrentImageIndex(
                    (prev) =>
                        (prev - 1 + (project?.images.length || 1)) % (project?.images.length || 1)
                );
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [project]);

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

        if (isLeftSwipe && project) {
            setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
        }
        if (isRightSwipe && project) {
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
        return null;
    }

    const shouldRenderCarouselImage = (index: number) => {
        const total = project.images.length;
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
                    {project.images.map((image, index) => {
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
                                    alt={`${project.title} - Image ${index + 1}`}
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
                                        alt={`${project.title} - Image ${index + 1}`}
                                        className="mobile-faded-image"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Side arrows - desktop only */}
                {project.images.length > 1 && (
                    <div
                        className={`hidden md:block transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <button
                            onClick={() =>
                                setCurrentImageIndex(
                                    (prev) => (prev - 1 + project.images.length) % project.images.length
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
                                setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
                            }
                            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-4xl hover:scale-110 transition-transform"
                            style={{ color: "#E8DCC4", textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
                            aria-label="Next image"
                        >
                            ›
                        </button>
                    </div>
                )}

                {/* Dot indicators */}
                {project.images.length > 1 && (
                    <div
                        className={`absolute left-1/2 -translate-x-1/2 z-20 flex gap-2 transition-opacity duration-300 bottom-40 md:bottom-8 ${showControls ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {project.images.map((_, index) => (
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

                {/* Desktop scroll indicator */}
                <div
                    className={`hidden md:block absolute bottom-8 right-8 text-sm animate-bounce transition-opacity duration-300 z-20 ${showControls ? "opacity-100" : "opacity-0"
                        }`}
                    style={{ color: "#E8DCC4", textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)" }}
                >
                    Scroll for details ↓
                </div>
            </div>

            {/* Project details below */}
            <div className="relative bg-black px-8 py-8 -mt-35 md:mt-0 md:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Title and info */}
                    <div className="mb-16">
                        <h1
                            className="text-5xl md:text-6xl font-bold mb-6"
                            style={{ color: "#E8DCC4" }}
                        >
                            {project.title}
                        </h1>
                        <div className="text-xl md:text-2xl mb-6" style={{ color: "#D4C5A9" }}>
                            <p className="mb-2">Rendering Class</p>
                            <p>
                                {project.year} • Instructor: {project.instructor}
                            </p>
                        </div>
                    </div>

                    {/* Videos Section */}
                    {project.videos && project.videos.length > 0 && (
                        <div className="mb-16">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#E8DCC4" }}>
                                Videos
                            </h2>
                            <div className="space-y-8">
                                {project.videos.map((video, index) => (
                                    <div key={index} className="w-full max-w-3xl mx-auto">
                                        <video
                                            className="w-full h-auto"
                                            controls
                                            preload="metadata"
                                        >
                                            <source src={video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
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
                                    style={{
                                        opacity: index === currentImageIndex ? 0.5 : 1,
                                    }}
                                >
                                    <Image
                                        src={image}
                                        alt={`${project.title} - Thumbnail ${index + 1}`}
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
