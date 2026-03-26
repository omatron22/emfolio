"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { shows, type Show } from "@/data/shows";

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
    <div className="portfolio-page-container text-cream">
      {/* Info strip - desktop only */}
      {!isZooming && (
        <div className="pointer-events-none fixed left-0 right-0 top-28 z-10 justify-center px-8 hidden md:flex">
          <div className="text-center max-w-2xl min-h-[60px] flex flex-col justify-center">
            {hoveredShow && (
              <>
                <h2 className="text-xl md:text-2xl font-bold mb-1">
                  {hoveredShow.title}
                </h2>
                <p className="text-sm text-cream-muted">
                  {hoveredShow.year} &bull; Director: {hoveredShow.director}
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
                priority={index < 3}
                quality={90}
                sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Mobile title overlay */}
              <div className="mobile-title-overlay">
                <h3 className="text-lg font-bold mb-1">{show.title}</h3>
                <p className="text-xs opacity-90">
                  {show.year} &bull; {show.director}
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
        .portfolio-page-container {
          min-height: 100vh;
          background-color: black;
        }

        @media (min-width: 901px) {
          .portfolio-page-container {
            position: fixed;
            inset: 0;
            overflow: auto;
          }
        }

        .portfolio-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 140px 60px 60px 60px;
        }

        .portfolio-masonry {
          max-width: 1400px;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        .portfolio-masonry .masonry-tile:nth-child(-n+3) {
          width: calc(33.333% - 14px);
        }

        .portfolio-masonry .masonry-tile:nth-child(n+4) {
          width: calc(25% - 15px);
        }

        .masonry-tile {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }

        .masonry-tile:hover {
          z-index: 10;
        }

        .masonry-image {
          width: 100%;
          height: auto;
          display: block;
          transition: opacity 0.3s ease;
        }

        .masonry-tile:hover .masonry-image {
          opacity: 0.8;
        }

        .mobile-title-overlay {
          display: none;
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

        @media (max-width: 1200px) {
          .portfolio-masonry {
            gap: 16px;
          }

          .portfolio-masonry .masonry-tile:nth-child(-n+3),
          .portfolio-masonry .masonry-tile:nth-child(n+4) {
            width: calc(50% - 8px);
          }
        }

        @media (max-width: 900px) {
          .portfolio-page-container {
            position: relative;
            overflow: visible;
          }

          .portfolio-wrapper {
            padding: 120px 16px 60px 16px;
            align-items: flex-start;
            min-height: auto;
          }

          .portfolio-masonry {
            max-width: 500px;
            margin: 0 auto;
            gap: 24px;
            flex-direction: column;
            flex-wrap: nowrap;
            align-items: center;
          }

          .portfolio-masonry .masonry-tile:nth-child(-n+3),
          .portfolio-masonry .masonry-tile:nth-child(n+4) {
            width: 100%;
          }

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
