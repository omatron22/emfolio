"use client";

import { use, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { drafts } from "@/data/drafts";

export default function DraftDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const currentIndex = drafts.findIndex((d) => d.slug === slug);
  const draft = drafts[currentIndex];

  const prevDraft = drafts[(currentIndex - 1 + drafts.length) % drafts.length];
  const nextDraft = drafts[(currentIndex + 1) % drafts.length];

  // Zoom/pan state
  const [zoomed, setZoomed] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panStartOffset = useRef({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const resetZoom = useCallback(() => {
    setZoomed(false);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const toggleZoom = useCallback(() => {
    if (zoomed) {
      resetZoom();
    } else {
      setZoomed(true);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [zoomed, resetZoom]);

  // Mouse panning when zoomed
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!zoomed) return;
      e.preventDefault();
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY };
      panStartOffset.current = { ...panOffset };
    },
    [zoomed, panOffset]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning || !zoomed) return;
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setPanOffset({
        x: panStartOffset.current.x + dx,
        y: panStartOffset.current.y + dy,
      });
    },
    [isPanning, zoomed]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Touch panning when zoomed
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!zoomed || e.touches.length !== 1) return;
      setIsPanning(true);
      panStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      panStartOffset.current = { ...panOffset };
    },
    [zoomed, panOffset]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isPanning || !zoomed || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - panStart.current.x;
      const dy = e.touches[0].clientY - panStart.current.y;
      setPanOffset({
        x: panStartOffset.current.x + dx,
        y: panStartOffset.current.y + dy,
      });
    },
    [isPanning, zoomed]
  );

  const handleTouchEnd = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        resetZoom();
        router.push(`/drafting/${prevDraft.slug}`);
      } else if (e.key === "ArrowRight") {
        resetZoom();
        router.push(`/drafting/${nextDraft.slug}`);
      } else if (e.key === "Escape") {
        if (zoomed) {
          resetZoom();
        } else {
          router.push("/drafting");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevDraft, nextDraft, router, zoomed, resetZoom]);

  // Reset zoom on slug change
  useEffect(() => {
    resetZoom();
  }, [slug, resetZoom]);

  if (!draft) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-cream">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Drawing Not Found</h1>
          <Link
            href="/drafting"
            className="text-cream-muted hover:text-cream transition-colors underline"
          >
            Back to Drafting
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col text-cream">
      {/* Top bar */}
      <div
        className="pt-24 md:pt-28 px-4 md:px-8 pb-2"
        style={{ opacity: 0, animation: "fadeIn 0.5s ease-out forwards" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Mobile: stacked centered layout */}
          <div className="md:hidden flex flex-col items-center gap-2">
            <h1 className="text-base font-bold tracking-wide text-center">
              {draft.name}
            </h1>
            <div className="flex items-center gap-4">
              <Link
                href="/drafting"
                className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cream-muted hover:text-cream transition-colors"
              >
                &larr; All Drawings
              </Link>
              <a
                href={draft.pdf}
                download
                className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cream-muted hover:text-cream transition-colors"
              >
                &darr; PDF
              </a>
            </div>
          </div>

          {/* Desktop: original row layout */}
          <div className="hidden md:flex items-center justify-between">
            <Link
              href="/drafting"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream-muted hover:text-cream transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 12L6 8l4-4" /></svg>
              All Drawings
            </Link>
            <div className="text-center flex-1 mx-4">
              <h1 className="text-xl font-bold tracking-wide">{draft.name}</h1>
            </div>
            <a
              href={draft.pdf}
              download
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cream-muted hover:text-cream transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v9M4 8l4 4 4-4M2 14h12" /></svg>
              Download PDF
            </a>
          </div>
        </div>
      </div>

      {/* Main image viewer - lightbox style */}
      <div
        className="flex-1 flex items-center justify-center px-4 md:px-12 py-2 md:py-3 min-h-0"
        style={{ opacity: 0, animation: "fadeIn 0.6s ease-out 100ms forwards" }}
      >
        <div
          ref={imageContainerRef}
          className="relative w-full max-w-6xl overflow-hidden rounded-sm select-none"
          style={{
            height: "clamp(40vh, 55vh, 60vh)",
            cursor: zoomed ? (isPanning ? "grabbing" : "grab") : "zoom-in",
          }}
          onClick={(e) => {
            // Only toggle zoom if not panning (mouse didn't move significantly)
            if (!isPanning) toggleZoom();
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="relative w-full h-full transition-transform ease-out"
            style={{
              transitionDuration: isPanning ? "0ms" : "300ms",
              transform: zoomed
                ? `scale(2.5) translate(${panOffset.x / 2.5}px, ${panOffset.y / 2.5}px)`
                : "scale(1)",
            }}
          >
            <Image
              src={draft.preview}
              alt={draft.name}
              fill
              className="object-contain"
              sizes="100vw"
              priority
              draggable={false}
            />
          </div>

          {/* Zoom hint */}
          {!zoomed && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] text-cream/30 pointer-events-none">
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="7" cy="7" r="5" />
                <path d="M11 11l3 3M7 5v4M5 7h4" />
              </svg>
              Click to zoom
            </div>
          )}

          {/* Zoomed state hint */}
          {zoomed && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] text-cream/30 pointer-events-none">
              Drag to pan &middot; Click to exit
            </div>
          )}
        </div>
      </div>

      {/* Bottom navigation - prev name, thumbnails, next name all in one row */}
      <div
        className="px-4 md:px-8 pt-2 pb-4"
        style={{ opacity: 0, animation: "fadeIn 0.5s ease-out 200ms forwards" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Mobile: just centered thumbnails */}
          <div className="md:hidden flex gap-1.5 justify-center overflow-x-auto scrollbar-hide">
            {drafts.map((d, i) => (
              <Link
                key={d.slug}
                href={`/drafting/${d.slug}`}
                className={`flex-shrink-0 relative w-10 h-7 overflow-hidden rounded-sm transition-all duration-300 ${
                  i === currentIndex
                    ? "opacity-100 ring-1 ring-cream/40"
                    : "opacity-30 hover:opacity-60"
                }`}
              >
                <Image src={d.preview} alt={d.name} fill className="object-cover" sizes="40px" />
              </Link>
            ))}
          </div>

          {/* Desktop: full row with prev/next names */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={`/drafting/${prevDraft.slug}`}
              className="flex-shrink-0 text-xs text-cream-muted hover:text-cream transition-colors tracking-wide"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="inline -mt-px"><path d="M10 12L6 8l4-4" /></svg> {prevDraft.name}
            </Link>
            <div className="flex-1 flex gap-1.5 justify-center overflow-x-auto scrollbar-hide">
              {drafts.map((d, i) => (
                <Link
                  key={d.slug}
                  href={`/drafting/${d.slug}`}
                  className={`flex-shrink-0 relative w-16 h-11 overflow-hidden rounded-sm transition-all duration-300 ${
                    i === currentIndex
                      ? "opacity-100 ring-1 ring-cream/40"
                      : "opacity-30 hover:opacity-60"
                  }`}
                >
                  <Image src={d.preview} alt={d.name} fill className="object-cover" sizes="64px" />
                </Link>
              ))}
            </div>
            <Link
              href={`/drafting/${nextDraft.slug}`}
              className="flex-shrink-0 text-xs text-cream-muted hover:text-cream transition-colors tracking-wide"
            >
              {nextDraft.name} <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="inline -mt-px"><path d="M6 4l4 4-4 4" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
