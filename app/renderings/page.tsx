"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type RenderProject = {
    slug: string;
    title: string;
    instructor: string;
    year: string;
    heroImage: string;
};

const projects: RenderProject[] = [
    {
        slug: "cinema",
        title: "CINEMA 4D",
        instructor: "Jeff Behm",
        year: "2024",
        heroImage: "/renderings/Cinema/Cinema1.png",
    },
    {
        slug: "twin",
        title: "TWIN MOTION",
        instructor: "Ellen King",
        year: "2025",
        heroImage: "/renderings/Twin/Twin1.jpg",
    },
];

export default function RenderingsPage() {
    const router = useRouter();
    const [hoveredProject, setHoveredProject] = useState<RenderProject | null>(null);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomData, setZoomData] = useState<{
        image: string;
        x: number;
        y: number;
        width: number;
        height: number;
    } | null>(null);

    const handleClick = (project: RenderProject, e: React.MouseEvent<HTMLDivElement>) => {
        if (isZooming) return;
        setIsZooming(true);

        const rect = e.currentTarget.getBoundingClientRect();

        setZoomData({
            image: project.heroImage,
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
        });

        setTimeout(() => {
            router.push(`/renderings/${project.slug}`);
        }, 1000);
    };

    return (
        <div className="renderings-page-container" style={{ color: "#E8DCC4" }}>
            <div className={`renderings-wrapper ${zoomData ? "opacity-0 transition-opacity duration-300" : ""}`}>
                <div className="renderings-grid">
{projects.map((project, index) => (
    <div
        key={project.slug}
        className="grid-tile"
        style={{ 
            animationDelay: `${index * 100}ms`,
            marginLeft: index === 1 ? '40px' : '0',  // Keep right tile shifted right
        }}
        onClick={(e) => handleClick(project, e)}
        onMouseEnter={() => setHoveredProject(project)}
        onMouseLeave={() => setHoveredProject(null)}
    >



                            <Image
                                src={project.heroImage}
                                alt={project.title}
                                width={800}
                                height={600}
                                className="grid-image"
                                priority={index < 3}
                                quality={90}
                                sizes="(max-width: 900px) 100vw, 50vw"
                            />
                            {/* Always visible title overlay */}
                            <div className="title-overlay">
                                <h3 className="text-lg md:text-xl font-bold mb-1">{project.title}</h3>
                                <p className="text-xs md:text-sm opacity-90">
                                    {project.year} • {project.instructor}
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
                .renderings-page-container {
                    min-height: 100vh;
                    background-color: black;
                }

                @media (min-width: 901px) {
                    .renderings-page-container {
                        position: fixed;
                        inset: 0;
                        overflow: hidden;
                    }
                }

.renderings-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 200px 40px 80px 40px;  /* Increased top padding */
}


.renderings-grid {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    align-items: center;  /* Re-add this for vertical alignment */
    justify-items: stretch;
}




                .grid-tile {
                    position: relative;
                    cursor: pointer;
                    overflow: hidden;
                    opacity: 0;
                    animation: fadeIn 0.8s ease-out forwards;
                    aspect-ratio: 16 / 9;
                }

                .grid-tile:hover {
                    z-index: 10;
                }

                .grid-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                /* Always visible title overlay */
                .title-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 20px;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, transparent 100%);
                    color: #E8DCC4;
                    pointer-events: none;
                }

                .zoom-overlay {
                    position: fixed;
                    z-index: 50;
                    animation: smoothZoom 1000ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

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

@media (max-width: 900px) {
    .renderings-wrapper {
        padding: 140px 20px 40px 20px;
    }

    .renderings-grid {
        grid-template-columns: 1fr;
        max-width: 500px;
        margin: 0 auto;
    }
    
    .grid-tile {
        margin-top: 0 !important;  /* Remove stagger on mobile */
    }
}

            `}</style>
        </div>
    );
}
