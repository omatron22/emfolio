"use client";

import { useEffect, useRef, useCallback } from "react";

interface EdgeBleedProps {
  children: React.ReactNode;
  bleedHeight?: number;
  className?: string;
}

export default function EdgeBleed({ children, bleedHeight = 60, className = "" }: EdgeBleedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sampleEdge = useCallback((media: HTMLImageElement | HTMLVideoElement) => {
    const container = containerRef.current;
    if (!container) return;

    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const w = (media as HTMLVideoElement).videoWidth || (media as HTMLImageElement).naturalWidth;
    const h = (media as HTMLVideoElement).videoHeight || (media as HTMLImageElement).naturalHeight;
    if (!w || !h) return;

    canvas.width = w;
    canvas.height = h;

    try {
      ctx.drawImage(media, 0, 0);
    } catch {
      return;
    }

    // Sample multiple rows near top and bottom for smoother average
    const sampleRows = 3;

    const avgColor = (startY: number, rows: number) => {
      let r = 0, g = 0, b = 0, count = 0;
      for (let row = 0; row < rows; row++) {
        const y = Math.min(Math.max(startY + row, 0), h - 1);
        const data = ctx.getImageData(0, y, w, 1).data;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
      }
      return `${Math.round(r / count)},${Math.round(g / count)},${Math.round(b / count)}`;
    };

    const topColor = avgColor(0, sampleRows);
    const bottomColor = avgColor(h - sampleRows, sampleRows);

    container.style.setProperty("--bleed-top", topColor);
    container.style.setProperty("--bleed-bottom", bottomColor);
    container.classList.add("bleed-ready");
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observe = () => {
      // Find img or video inside
      const img = container.querySelector("img") as HTMLImageElement | null;
      const video = container.querySelector("video") as HTMLVideoElement | null;

      if (img) {
        if (img.complete && img.naturalWidth > 0) {
          sampleEdge(img);
        } else {
          img.addEventListener("load", () => sampleEdge(img), { once: true });
        }
      }

      if (video) {
        const handleVideo = () => sampleEdge(video);
        video.addEventListener("loadeddata", handleVideo, { once: true });
        // Also update periodically for playing video
        let frameId: number;
        let lastSample = 0;
        const videoLoop = () => {
          const now = Date.now();
          if (now - lastSample > 1000 && !video.paused) {
            sampleEdge(video);
            lastSample = now;
          }
          frameId = requestAnimationFrame(videoLoop);
        };
        video.addEventListener("play", () => { videoLoop(); });
        video.addEventListener("pause", () => { cancelAnimationFrame(frameId); });
        if (!video.paused && video.readyState >= 2) {
          sampleEdge(video);
          videoLoop();
        }
        return () => cancelAnimationFrame(frameId);
      }
    };

    observe();
  }, [sampleEdge]);

  return (
    <div ref={containerRef} className={`edge-bleed-container ${className}`}>
      {children}
      <style jsx global>{`
        .edge-bleed-container {
          position: relative;
        }

        .edge-bleed-container::before,
        .edge-bleed-container::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: ${bleedHeight}px;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .edge-bleed-container.bleed-ready::before,
        .edge-bleed-container.bleed-ready::after {
          opacity: 1;
        }

        .edge-bleed-container::before {
          bottom: 100%;
          background: linear-gradient(to top, rgb(var(--bleed-top)), black);
        }

        .edge-bleed-container::after {
          top: 100%;
          background: linear-gradient(to bottom, rgb(var(--bleed-bottom)), black);
        }
      `}</style>
    </div>
  );
}
