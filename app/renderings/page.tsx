"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { projects, type RenderProject } from "@/data/renderings";

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
    <div className="renderings-page-container text-cream">
      {/* Hover info strip - like portfolio */}
      {!isZooming && (
        <div className="pointer-events-none fixed left-0 right-0 top-[100px] lg:top-[140px] z-10 justify-center px-8 hidden md:flex">
          <div className="text-center max-w-2xl min-h-[50px] flex flex-col justify-center">
            {hoveredProject && (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-1">
                  {hoveredProject.title}
                </h2>
                <p className="text-sm text-cream-muted">
                  {hoveredProject.year} &bull; {hoveredProject.instructor}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <div className={`renderings-wrapper ${zoomData ? "opacity-0 transition-opacity duration-300" : ""}`}>
        <div className="renderings-grid">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="grid-tile"
              style={{
                animationDelay: `${index * 100}ms`,
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
              {/* Mobile-only title overlay */}
              <div className="title-overlay md:hidden">
                <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                <p className="text-xs opacity-90">
                  {project.year} &bull; {project.instructor}
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
            ["--start-x" as string]: `${zoomData.x}px`,
            ["--start-y" as string]: `${zoomData.y}px`,
            ["--start-width" as string]: `${zoomData.width}px`,
            ["--start-height" as string]: `${zoomData.height}px`,
          }}
        >
          <Image
            src={zoomData.image}
            alt="Zooming"
            fill
            className="object-cover hidden md:block"
            priority
            quality={95}
          />
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

        @media (min-width: 768px) {
          .renderings-page-container {
            position: fixed;
            inset: 0;
            overflow: auto;
          }
        }

        .renderings-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 120px 30px 60px 30px;
          box-sizing: border-box;
        }

        @media (min-width: 1024px) {
          .renderings-wrapper {
            padding: 140px 40px 60px 40px;
          }
        }

        .renderings-grid {
          max-width: 1300px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          align-items: stretch;
        }

        @media (min-width: 1024px) {
          .renderings-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .grid-tile:first-child {
          grid-row: auto;
        }

        .grid-tile {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }

        .grid-tile:hover {
          z-index: 10;
        }

        .grid-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 0.3s ease;
        }

        .grid-tile:hover .grid-image {
          opacity: 0.8;
        }

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
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
        }

        .mobile-zoom-faded-image {
          width: 100%;
          height: auto;
          max-height: 100vh;
          object-fit: contain;
        }

        @media (max-width: 767px) {
          .renderings-wrapper {
            padding: 120px 20px 40px 20px;
          }

          .renderings-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            max-width: 500px;
            margin: 0 auto;
          }

          .grid-tile:first-child {
            grid-row: auto;
          }
        }
      `}</style>
    </div>
  );
}
