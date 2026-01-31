"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Show = {
    slug: string;
    title: string;
    production: string;
    year: string;
    director: string;
    heroImage: string;
};

const shows: Show[] = [
    {
        slug: "great-comet",
        title: "Natasha, Pierre & The Great Comet of 1812",
        production: "UCLA School of Theater, Film and Television",
        year: "2025",
        director: "J. Ed Araiza",
        heroImage: "/portfolio/comet/comet1.jpg",
    },
    {
        slug: "courage-to-right",
        title: "The Courage to Right a Woman's Wrongs",
        production: "UCLA School of Theater, Film and Television",
        year: "2024",
        director: "Michael Hackett",
        heroImage: "/portfolio/courage/courage1.jpg",
    },
    {
        slug: "fairview",
        title: "Fairview",
        production: "UCLA School of Theater, Film and Television",
        year: "2023",
        director: "David H. Parker",
        heroImage: "/portfolio/fairview/fairview1.jpg",
    },
    {
        slug: "keffiyeh-made-in-china",
        title: "Keffiyeh / Made in China",
        production: "UCLA School of Theater, Film and Television",
        year: "2023",
        director: "Yuval Zehavi",
        heroImage: "/portfolio/kmic/kmic1.jpg",
    },
    {
        slug: "boxes",
        title: "BOXES",
        production: "The Academy - NYLA",
        year: "2024",
        director: "Michelle Stroffolino",
        heroImage: "/portfolio/boxes/box1.jpg",
    },
    {
        slug: "acquaprofonda",
        title: "ACQUAPROFONDA",
        production: "Long Beach Opera",
        year: "2024",
        director: "Yekaterina Lynch",
        heroImage: "/portfolio/aqua/aqua1.jpg",
    },
];

export default function PortfolioPage() {
    const router = useRouter();
    const [hoveredShow, setHoveredShow] = useState<Show | null>(null);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomData, setZoomData] = useState<{
        image: string;
        x: number;
        y: number;
        width: number;
        height: number;
    } | null>(null);

    const handleClick = (show: Show, e: React.MouseEvent<HTMLDivElement>) => {
        if (isZooming) return;
        setIsZooming(true);

        const rect = e.currentTarget.getBoundingClientRect();

        setZoomData({
            image: show.heroImage,
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
        });

        setTimeout(() => {
            router.push(`/portfolio/${show.slug}`);
        }, 1000);
    };

    return (
        <div className="portfolio-page-container" style={{ color: "#E8DCC4" }}>
            {/* CENTERED INFO STRIP – below nav, above images - DESKTOP ONLY */}
            {!isZooming && (
                <div className="pointer-events-none fixed left-0 right-0 top-28 z-10 justify-center px-8 hidden md:flex">
                    <div className="text-center max-w-2xl min-h-[60px] flex flex-col justify-center">
                        {hoveredShow && (
                            <>
                                <h2 className="text-xl md:text-2xl font-bold mb-1">
                                    {hoveredShow.title}
                                </h2>
                                <p className="text-sm" style={{ color: "#D4C5A9" }}>
                                    {hoveredShow.year} • Director: {hoveredShow.director}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className={`portfolio-wrapper ${zoomData ? "opacity-0 transition-opacity duration-300" : ""}`}>
                <div className="portfolio-masonry">
                    {shows.map((show, index) => (
                        <div
                            key={show.slug}
                            className="masonry-tile"
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={(e) => handleClick(show, e)}
                            onMouseEnter={() => setHoveredShow(show)}
                            onMouseLeave={() => setHoveredShow(null)}
                        >
                            <Image
                                src={show.heroImage}
                                alt={show.title}
                                width={800}
                                height={1200}
                                className="masonry-image"
                                priority={index < 3} // First 3 images above the fold
                                quality={90}
                                sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {/* Mobile title overlay */}
                            <div className="mobile-title-overlay">
                                <h3 className="text-lg font-bold mb-1">{show.title}</h3>
                                <p className="text-xs opacity-90">
                                    {show.year} • {show.director}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {zoomData && (
                <div
                    className="zoom-overlay"
                    style={{
                        ["--start-x" as any]: `${zoomData.x}px`,
                        ["--start-y" as any]: `${zoomData.y}px`,
                        ["--start-width" as any]: `${zoomData.width}px`,
                        ["--start-height" as any]: `${zoomData.height}px`,
                    }}
                >
                    {/* Desktop: full cover */}
                    <Image
                        src={zoomData.image}
                        alt="Zooming"
                        fill
                        className="object-cover hidden md:block"
                        priority
                        quality={95}
                    />

                    {/* Mobile: centered with fade - optimized */}
                    <div className="md:hidden w-full h-full flex items-center justify-center mobile-zoom-container">
                        <Image
                            src={zoomData.image}
                            alt="Zooming"
                            width={1200}
                            height={1600}
                            className="mobile-zoom-faded-image"
                            priority
                            quality={90}
                        />
                    </div>
                </div>
            )}

            <style jsx global>{`
                .portfolio-page-container {
                    min-height: 100vh;
                    background-color: black;
                }

                @media (min-width: 901px) {
                    .portfolio-page-container {
                        position: fixed;
                        inset: 0;
                        overflow: hidden;
                    }
                }

                .portfolio-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    padding: 220px 60px 60px 60px;
                }

                .portfolio-masonry {
                    max-width: 1400px;
                    width: 100%;
                    column-count: 3;
                    column-gap: 20px;
                }

                .masonry-tile {
                    position: relative;
                    cursor: pointer;
                    overflow: hidden;
                    opacity: 0;
                    animation: fadeIn 0.8s ease-out forwards;
                    break-inside: avoid;
                    margin-bottom: 20px;
                }

                .masonry-tile:hover {
                    z-index: 10;
                }

                .masonry-image {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                /* Mobile title overlay - hidden on desktop */
                .mobile-title-overlay {
                    display: none;
                }

                .zoom-overlay {
                    position: fixed;
                    z-index: 50;
                    animation: smoothZoom 1000ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                /* Mobile zoom container with fade mask */
                .mobile-zoom-container {
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

                .mobile-zoom-faded-image {
                    width: 100%;
                    height: auto;
                    max-height: 100vh;
                    object-fit: contain;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes smoothZoom {
                    from {
                        left: var(--start-x);
                        top: var(--start-y);
                        width: var(--start-width);
                        height: var(--start-height);
                    }
                    to {
                        left: 0;
                        top: 0;
                        width: 100vw;
                        height: 100vh;
                    }
                }

                @media (max-width: 1200px) {
                    .portfolio-masonry {
                        column-count: 2;
                    }
                }

                @media (max-width: 900px) {
                    .portfolio-wrapper {
                        padding: 140px 20px 40px 20px;
                    }

                    .portfolio-masonry {
                        column-count: 1;
                        max-width: 500px;
                        margin: 0 auto;
                    }

                    /* Show title overlay on mobile */
                    .mobile-title-overlay {
                        display: block;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        padding: 20px;
                        background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%);
                        color: #E8DCC4;
                        pointer-events: none;
                    }
                }
            `}</style>
        </div>
    );
}
