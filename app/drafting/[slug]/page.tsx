"use client";

import { use, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { drafts } from "@/data/drafts";
import { useSounds } from "@/components/SoundProvider";

export default function DraftDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const { play } = useSounds();

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
      {/* Back link */}
      <Link
        href="/drafting"
        className="fixed left-4 md:left-8 z-40 text-sm font-semibold uppercase tracking-[0.2em] transition-opacity opacity-60 hover:opacity-100 py-2 px-3"
        style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)", top: "80px" }}
        onMouseEnter={() => play("hover")}
        onClick={() => play("navigate")}
      >
        Back
      </Link>

      {/* Main image viewer */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-4 md:px-12 pt-24 md:pt-20 pb-4 min-h-0"
        style={{ opacity: 0, animation: "fadeIn 0.6s ease-out forwards" }}
      >
        {/* Title with PDF underneath */}
        <div className="text-center mb-3">
          <h1 className="text-lg md:text-xl font-bold tracking-wide">{draft.name}</h1>
          <a
            href={draft.pdf}
            download
            className="inline-block mt-1 text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] text-cream-muted hover:text-cream transition-colors"
            onMouseEnter={() => play("hover")}
            onClick={() => play("click")}
          >
            Download PDF
          </a>
        </div>
        <div
          ref={imageContainerRef}
          className="relative w-full max-w-6xl overflow-hidden rounded-sm select-none"
          style={{
            height: "clamp(50vh, 70vh, 80vh)",
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
            <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(200, 180, 140, 0.15)", mixBlendMode: "color" }} />
          </div>


          {/* Zoomed state hint */}
          {zoomed && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] text-cream/30 pointer-events-none">
              Drag to pan &middot; Click to exit
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
