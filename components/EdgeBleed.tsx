"use client";

import { useEffect, useRef, useCallback } from "react";

interface EdgeBleedProps {
  children: React.ReactNode;
  bleedHeight?: number;
  className?: string;
  sides?: ("top" | "bottom" | "left" | "right")[];
}

export default function EdgeBleed({
  children,
  bleedHeight = 80,
  className = "",
  sides = ["top", "bottom"],
}: EdgeBleedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLCanvasElement>(null);
  const bottomRef = useRef<HTMLCanvasElement>(null);
  const leftRef = useRef<HTMLCanvasElement>(null);
  const rightRef = useRef<HTMLCanvasElement>(null);
  const samplerRef = useRef<HTMLCanvasElement | null>(null);

  const paint = useCallback(
    (media: HTMLImageElement | HTMLVideoElement) => {
      const container = containerRef.current;
      if (!container) return;

      if (!samplerRef.current) samplerRef.current = document.createElement("canvas");
      const sampler = samplerRef.current;
      const sCtx = sampler.getContext("2d", { willReadFrequently: true });
      if (!sCtx) return;

      const srcW = (media as HTMLVideoElement).videoWidth || (media as HTMLImageElement).naturalWidth;
      const srcH = (media as HTMLVideoElement).videoHeight || (media as HTMLImageElement).naturalHeight;
      if (!srcW || !srcH) return;

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

      const displayW = media.getBoundingClientRect().width;
      const displayH = media.getBoundingClientRect().height;
      const displayScaleX = displayW / sampleW;
      const displayScaleY = displayH / sampleH;

      // TOP bleed
      if (sides.includes("top") && topRef.current) {
        const c = topRef.current;
        const ctx = c.getContext("2d");
        if (ctx) {
          c.width = Math.round(displayW);
          c.height = bleedHeight;
          const row = sCtx.getImageData(0, 0, sampleW, 1).data;
          for (let x = 0; x < sampleW; x++) {
            const i = x * 4;
            const [r, g, b] = [row[i], row[i + 1], row[i + 2]];
            const dx = Math.round(x * displayScaleX);
            const dw = Math.max(Math.ceil(displayScaleX), 1);
            const grad = ctx.createLinearGradient(0, bleedHeight, 0, 0);
            grad.addColorStop(0, `rgb(${r},${g},${b})`);
            grad.addColorStop(0.5, `rgba(${r},${g},${b},0.4)`);
            grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
            ctx.fillStyle = grad;
            ctx.fillRect(dx, 0, dw, bleedHeight);
          }
          c.style.opacity = "1";
        }
      }

      // BOTTOM bleed
      if (sides.includes("bottom") && bottomRef.current) {
        const c = bottomRef.current;
        const ctx = c.getContext("2d");
        if (ctx) {
          c.width = Math.round(displayW);
          c.height = bleedHeight;
          const row = sCtx.getImageData(0, sampleH - 1, sampleW, 1).data;
          for (let x = 0; x < sampleW; x++) {
            const i = x * 4;
            const [r, g, b] = [row[i], row[i + 1], row[i + 2]];
            const dx = Math.round(x * displayScaleX);
            const dw = Math.max(Math.ceil(displayScaleX), 1);
            const grad = ctx.createLinearGradient(0, 0, 0, bleedHeight);
            grad.addColorStop(0, `rgb(${r},${g},${b})`);
            grad.addColorStop(0.5, `rgba(${r},${g},${b},0.4)`);
            grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
            ctx.fillStyle = grad;
            ctx.fillRect(dx, 0, dw, bleedHeight);
          }
          c.style.opacity = "1";
        }
      }

      // LEFT bleed
      if (sides.includes("left") && leftRef.current) {
        const c = leftRef.current;
        const ctx = c.getContext("2d");
        if (ctx) {
          c.width = bleedHeight;
          c.height = Math.round(displayH);
          const col = sCtx.getImageData(0, 0, 1, sampleH).data;
          for (let y = 0; y < sampleH; y++) {
            const i = y * 4;
            const [r, g, b] = [col[i], col[i + 1], col[i + 2]];
            const dy = Math.round(y * displayScaleY);
            const dh = Math.max(Math.ceil(displayScaleY), 1);
            const grad = ctx.createLinearGradient(bleedHeight, 0, 0, 0);
            grad.addColorStop(0, `rgb(${r},${g},${b})`);
            grad.addColorStop(0.5, `rgba(${r},${g},${b},0.4)`);
            grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
            ctx.fillStyle = grad;
            ctx.fillRect(0, dy, bleedHeight, dh);
          }
          c.style.opacity = "1";
        }
      }

      // RIGHT bleed
      if (sides.includes("right") && rightRef.current) {
        const c = rightRef.current;
        const ctx = c.getContext("2d");
        if (ctx) {
          c.width = bleedHeight;
          c.height = Math.round(displayH);
          const col = sCtx.getImageData(sampleW - 1, 0, 1, sampleH).data;
          for (let y = 0; y < sampleH; y++) {
            const i = y * 4;
            const [r, g, b] = [col[i], col[i + 1], col[i + 2]];
            const dy = Math.round(y * displayScaleY);
            const dh = Math.max(Math.ceil(displayScaleY), 1);
            const grad = ctx.createLinearGradient(0, 0, bleedHeight, 0);
            grad.addColorStop(0, `rgb(${r},${g},${b})`);
            grad.addColorStop(0.5, `rgba(${r},${g},${b},0.4)`);
            grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
            ctx.fillStyle = grad;
            ctx.fillRect(0, dy, bleedHeight, dh);
          }
          c.style.opacity = "1";
        }
      }
    },
    [bleedHeight, sides]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const img = container.querySelector("img") as HTMLImageElement | null;
    const video = container.querySelector("video") as HTMLVideoElement | null;

    if (img) {
      if (img.complete && img.naturalWidth > 0) paint(img);
      else img.addEventListener("load", () => paint(img), { once: true });
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
      {children}
      {sides.includes("top") && (
        <canvas ref={topRef} className="edge-bleed-canvas edge-bleed-top" />
      )}
      {sides.includes("bottom") && (
        <canvas ref={bottomRef} className="edge-bleed-canvas edge-bleed-bottom" />
      )}
      {sides.includes("left") && (
        <canvas ref={leftRef} className="edge-bleed-canvas edge-bleed-left" />
      )}
      {sides.includes("right") && (
        <canvas ref={rightRef} className="edge-bleed-canvas edge-bleed-right" />
      )}
      <style jsx global>{`
        .edge-bleed-wrap {
          position: relative;
        }

        .edge-bleed-canvas {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }

        .edge-bleed-top {
          bottom: 100%;
          left: 0;
          width: 100%;
          height: ${bleedHeight}px;
        }

        .edge-bleed-bottom {
          top: 100%;
          left: 0;
          width: 100%;
          height: ${bleedHeight}px;
        }

        .edge-bleed-left {
          right: 100%;
          top: 0;
          width: ${bleedHeight}px;
          height: 100%;
        }

        .edge-bleed-right {
          left: 100%;
          top: 0;
          width: ${bleedHeight}px;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
