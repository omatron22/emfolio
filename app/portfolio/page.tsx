"use client";

import { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { shows, type Show } from "@/data/shows";
import { useSounds } from "@/components/SoundProvider";

const GAP = 16;
const PER_ROW = 4;

// Run layout measurement before paint on the client (avoids a first-paint flash),
// while falling back to useEffect during SSR to avoid the hook warning.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function PortfolioPage() {
  const router = useRouter();
  const { play } = useSounds();
  const [hoveredShow, setHoveredShow] = useState<Show | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomData, setZoomData] = useState<{
    image: string;
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const masonryRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  // Default landscape aspect so first paint is already close; corrected on image load.
  const [aspects, setAspects] = useState<number[]>(() => shows.map(() => 1.5));

  const showTitle = !!hoveredShow && !isZooming;

  useIsomorphicLayoutEffect(() => {
    const el = masonryRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setBox((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
      setIsDesktop(window.innerWidth >= 768);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const updateAspect = useCallback((index: number, ratio: number) => {
    if (!ratio || !isFinite(ratio)) return;
    setAspects((prev) => {
      if (Math.abs(prev[index] - ratio) < 0.001) return prev;
      const next = [...prev];
      next[index] = ratio;
      return next;
    });
  }, []);

  // Fixed rows of 4. Each row keeps true aspect ratios and fills the width;
  // the whole stack is scaled down only if needed to fit the height. No cropping.
  const sizeByIndex = useMemo(() => {
    const W = box.w - 1; // epsilon so a full row never wraps early
    const H = box.h;
    if (!W || !H || W <= 0) return null;

    const rows: number[][] = [];
    for (let i = 0; i < aspects.length; i += PER_ROW) {
      const row: number[] = [];
      for (let j = i; j < Math.min(i + PER_ROW, aspects.length); j++) row.push(j);
      rows.push(row);
    }

    const rowHeights = rows.map((row) => {
      const sum = row.reduce((a, i) => a + aspects[i], 0);
      return (W - GAP * (row.length - 1)) / sum;
    });

    const total = rowHeights.reduce((a, h) => a + h, 0) + GAP * (rows.length - 1);
    const scale = total > H ? H / total : 1;

    const sizes: { w: number; h: number }[] = [];
    rows.forEach((row, ri) => {
      const h = rowHeights[ri] * scale;
      for (const i of row) sizes[i] = { w: h * aspects[i], h };
    });
    return sizes;
  }, [box, aspects]);

  const openShow = (show: Show, el: HTMLElement) => {
    if (isZooming) return;
    setIsZooming(true);
    play("zoom");

    const rect = el.getBoundingClientRect();
    setZoomData({
      image: show.heroImage,
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });

    setTimeout(() => {
      router.push(`/portfolio/${show.slug}`);
    }, 600);
  };

  const showTiles = !isDesktop || !!sizeByIndex;

  return (
    <div className="portfolio-page-container text-cream">
      <div className={`portfolio-wrapper ${zoomData ? "opacity-0 transition-opacity duration-300" : ""}`}>
        {/* Title strip - always rendered (fixed height) so hover never shifts layout */}
        <div className="pointer-events-none hidden md:flex justify-center w-full mb-5 h-[56px]">
          <div className="text-center max-w-2xl flex flex-col justify-center">
            <h2
              className={`text-xl md:text-2xl font-bold mb-1 transition-opacity duration-200 ${
                showTitle ? "opacity-100" : "opacity-0"
              }`}
            >
              {hoveredShow?.title ?? " "}
            </h2>
            <p
              className={`text-sm text-cream-muted transition-opacity duration-200 ${
                showTitle ? "opacity-100" : "opacity-0"
              }`}
            >
              {hoveredShow
                ? `${hoveredShow.year} • Director: ${hoveredShow.director}`
                : " "}
            </p>
          </div>
        </div>
        <div className="portfolio-masonry" ref={masonryRef}>
          {showTiles &&
            shows.map((show, index) => {
              const size = isDesktop && sizeByIndex ? sizeByIndex[index] : null;
              return (
                <div
                  key={show.slug}
                  className="masonry-tile"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${show.title} (${show.year})`}
                  style={
                    size
                      ? { width: `${size.w}px`, height: `${size.h}px`, animationDelay: `${index * 60}ms` }
                      : { animationDelay: `${index * 60}ms` }
                  }
                  onClick={(e) => openShow(show, e.currentTarget)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openShow(show, e.currentTarget);
                    }
                  }}
                  onMouseEnter={() => { setHoveredShow(show); play("hover"); }}
                  onFocus={() => setHoveredShow(show)}
                  onMouseLeave={() => setHoveredShow(null)}
                  onBlur={() => setHoveredShow(null)}
                >
                  <Image
                    src={show.heroImage}
                    alt={show.title}
                    width={800}
                    height={1200}
                    className="masonry-image"
                    priority={index < 4}
                    quality={90}
                    sizes="(max-width: 767px) 100vw, 25vw"
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      updateAspect(index, img.naturalWidth / img.naturalHeight);
                    }}
                  />
                  {/* Mobile title overlay */}
                  <div className="mobile-title-overlay">
                    <h3 className="text-lg font-bold mb-1">{show.title}</h3>
                    <p className="text-xs opacity-90">
                      {show.year} &bull; {show.director}
                    </p>
                  </div>
                </div>
              );
            })}
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

        @media (min-width: 768px) {
          .portfolio-page-container {
            position: fixed;
            inset: 0;
            overflow: hidden;
          }
        }

        .portfolio-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 100px 40px 60px 40px;
        }

        @media (min-width: 1024px) {
          .portfolio-wrapper {
            padding: 104px 60px 48px 60px;
          }
        }

        .portfolio-masonry {
          max-width: 1400px;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
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
          opacity: 0.85;
        }

        .mobile-title-overlay {
          display: none;
        }

        .zoom-overlay {
          position: fixed;
          z-index: 50;
          animation: smoothZoom 650ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

        /* Desktop/tablet: 4-up rows that keep true aspect ratios and fit one screen */
        @media (min-width: 768px) {
          .portfolio-wrapper {
            height: 100vh;
            min-height: 0;
            justify-content: flex-start;
          }

          .portfolio-masonry {
            flex: 1 1 auto;
            min-height: 0;
            width: 100%;
            max-width: 1500px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
            gap: ${GAP}px;
          }

          .portfolio-masonry .masonry-tile {
            min-width: 0;
            min-height: 0;
          }

          .portfolio-masonry .masonry-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        @media (max-width: 767px) {
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

          .portfolio-masonry .masonry-tile {
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
