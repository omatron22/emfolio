"use client";

import { useEffect, useRef, useCallback } from "react";

interface EdgeBleedProps {
  children: React.ReactNode;
  bleedHeight?: number;
  className?: string;
}

export default function EdgeBleed({ children, bleedHeight = 80, className = "" }: EdgeBleedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topCanvasRef = useRef<HTMLCanvasElement>(null);
  const bottomCanvasRef = useRef<HTMLCanvasElement>(null);
  const samplerRef = useRef<HTMLCanvasElement | null>(null);

  const paint = useCallback((media: HTMLImageElement | HTMLVideoElement) => {
    const container = containerRef.current;
    const topCanvas = topCanvasRef.current;
    const bottomCanvas = bottomCanvasRef.current;
    if (!container || !topCanvas || !bottomCanvas) return;

    if (!samplerRef.current) {
      samplerRef.current = document.createElement("canvas");
    }
    const sampler = samplerRef.current;
    const sCtx = sampler.getContext("2d", { willReadFrequently: true });
    if (!sCtx) return;

    const srcW = (media as HTMLVideoElement).videoWidth || (media as HTMLImageElement).naturalWidth;
    const srcH = (media as HTMLVideoElement).videoHeight || (media as HTMLImageElement).naturalHeight;
    if (!srcW || !srcH) return;

    // Sample at a reasonable width for performance
    const sampleW = Math.min(srcW, 400);
    const scale = sampleW / srcW;
    const sampleH = Math.round(srcH * scale);

    sampler.width = sampleW;
    sampler.height = sampleH;

    try {
      sCtx.drawImage(media, 0, 0, sampleW, sampleH);
    } catch {
      return;
    }

    // Get the displayed width of the media element
    const displayW = media.getBoundingClientRect().width;
    const displayScale = displayW / sampleW;

    // Set canvas sizes to match displayed media width
    const canvasW = Math.round(displayW);
    const canvasH = bleedHeight;

    topCanvas.width = canvasW;
    topCanvas.height = canvasH;
    bottomCanvas.width = canvasW;
    bottomCanvas.height = canvasH;

    // Find actual content edges (skip letterbox black bars)
    const isRowBlack = (y: number) => {
      const row = sCtx.getImageData(0, y, sampleW, 1).data;
      let total = 0;
      for (let i = 0; i < row.length; i += 4) {
        total += row[i] + row[i + 1] + row[i + 2];
      }
      return (total / (sampleW * 3)) < 10; // avg brightness < 10 = black bar
    };

    // Scan from top to find first non-black row
    let topEdge = 0;
    for (let y = 0; y < sampleH / 2; y++) {
      if (!isRowBlack(y)) { topEdge = y; break; }
    }

    // Scan from bottom to find last non-black row
    let bottomEdge = sampleH - 1;
    for (let y = sampleH - 1; y > sampleH / 2; y--) {
      if (!isRowBlack(y)) { bottomEdge = y; break; }
    }

    const topData = sCtx.getImageData(0, topEdge, sampleW, 3).data;
    const bottomData = sCtx.getImageData(0, Math.max(0, bottomEdge - 2), sampleW, 3).data;

    const topCtx = topCanvas.getContext("2d");
    const bottomCtx = bottomCanvas.getContext("2d");
    if (!topCtx || !bottomCtx) return;

    // Draw top bleed: for each column, get the avg color of top 3 rows,
    // then draw a vertical gradient from that color to black
    for (let x = 0; x < sampleW; x++) {
      let r = 0, g = 0, b = 0;
      for (let row = 0; row < 3; row++) {
        const i = (row * sampleW + x) * 4;
        r += topData[i];
        g += topData[i + 1];
        b += topData[i + 2];
      }
      r = Math.round(r / 3);
      g = Math.round(g / 3);
      b = Math.round(b / 3);

      const dx = Math.round(x * displayScale);
      const dw = Math.max(Math.ceil(displayScale), 1);

      const grad = topCtx.createLinearGradient(0, canvasH, 0, 0);
      grad.addColorStop(0, `rgb(${r},${g},${b})`);
      grad.addColorStop(0.4, `rgba(${r},${g},${b},0.6)`);
      grad.addColorStop(0.7, `rgba(${r},${g},${b},0.2)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      topCtx.fillStyle = grad;
      topCtx.fillRect(dx, 0, dw, canvasH);
    }

    // Draw bottom bleed
    for (let x = 0; x < sampleW; x++) {
      let r = 0, g = 0, b = 0;
      for (let row = 0; row < 3; row++) {
        const i = (row * sampleW + x) * 4;
        r += bottomData[i];
        g += bottomData[i + 1];
        b += bottomData[i + 2];
      }
      r = Math.round(r / 3);
      g = Math.round(g / 3);
      b = Math.round(b / 3);

      const dx = Math.round(x * displayScale);
      const dw = Math.max(Math.ceil(displayScale), 1);

      const grad = bottomCtx.createLinearGradient(0, 0, 0, canvasH);
      grad.addColorStop(0, `rgb(${r},${g},${b})`);
      grad.addColorStop(0.4, `rgba(${r},${g},${b},0.6)`);
      grad.addColorStop(0.7, `rgba(${r},${g},${b},0.2)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      bottomCtx.fillStyle = grad;
      bottomCtx.fillRect(dx, 0, dw, canvasH);
    }

    topCanvas.style.opacity = "1";
    bottomCanvas.style.opacity = "1";
  }, [bleedHeight]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const img = container.querySelector("img") as HTMLImageElement | null;
    const video = container.querySelector("video") as HTMLVideoElement | null;

    if (img) {
      if (img.complete && img.naturalWidth > 0) {
        paint(img);
      } else {
        img.addEventListener("load", () => paint(img), { once: true });
      }
    }

    if (video) {
      const handleVideo = () => paint(video);
      video.addEventListener("loadeddata", handleVideo, { once: true });

      let frameId: number;
      let lastSample = 0;
      const videoLoop = () => {
        const now = Date.now();
        if (now - lastSample > 400 && !video.paused) {
          paint(video);
          lastSample = now;
        }
        frameId = requestAnimationFrame(videoLoop);
      };
      video.addEventListener("play", videoLoop);
      video.addEventListener("pause", () => cancelAnimationFrame(frameId));
      video.addEventListener("seeked", handleVideo);

      if (!video.paused && video.readyState >= 2) {
        paint(video);
        videoLoop();
      }

      return () => {
        cancelAnimationFrame(frameId);
        video.removeEventListener("play", videoLoop);
        video.removeEventListener("seeked", handleVideo);
      };
    }
  }, [paint]);

  return (
    <div ref={containerRef} className={`edge-bleed-wrap ${className}`}>
      <canvas
        ref={topCanvasRef}
        className="edge-bleed-canvas edge-bleed-top"
      />
      {children}
      <canvas
        ref={bottomCanvasRef}
        className="edge-bleed-canvas edge-bleed-bottom"
      />
      <style jsx global>{`
        .edge-bleed-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .edge-bleed-canvas {
          display: block;
          width: 100%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .edge-bleed-top {
          height: ${bleedHeight}px;
        }

        .edge-bleed-bottom {
          height: ${bleedHeight}px;
        }
      `}</style>
    </div>
  );
}
