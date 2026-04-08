"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Volume2, VolumeX } from "lucide-react";
import { useSounds } from "@/components/SoundProvider";

type ProgrammingVideo = {
  src: string;
  songTitle: string;
  artist: string;
  accolade?: {
    icon: "star";
    line1: string;
    line2: string;
  };
  toolsLine?: string;
};

const videos: ProgrammingVideo[] = [
  {
    src: "/program.mp4",
    songTitle: "Behind The Sun",
    artist: "ODESZA",
    accolade: {
      icon: "star",
      line1: "Runner Up, 2025 ACT Entertainment",
      line2: "grandMA3 Programming Contest",
    },
  },
  {
    src: "/program-meels-out-west.mp4",
    songTitle: "Out West",
    artist: "MEELS",
    toolsLine: "Programmed in grandMA3 · Rendered in DepenceR4",
  },
];

export default function ProgrammingPage() {
  return (
    <div className="bg-black text-cream">
      {videos.map((v, i) => (
        <VideoBlock key={i} video={v} index={i} />
      ))}
    </div>
  );
}

function VideoBlock({ video, index }: { video: ProgrammingVideo; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const bleedTopRef = useRef<HTMLCanvasElement>(null);
  const bleedBottomRef = useRef<HTMLCanvasElement>(null);
  const bleedLeftRef = useRef<HTMLCanvasElement>(null);
  const bleedRightRef = useRef<HTMLCanvasElement>(null);

  const { play: playSound } = useSounds();

  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bleedFrameRef = useRef<number>(0);
  const bleedSamplerRef = useRef<HTMLCanvasElement | null>(null);

  // Real-time edge bleed (per-instance)
  useEffect(() => {
    const v = videoRef.current;
    const stage = stageRef.current;
    if (!v || !stage) return;

    const sampler = document.createElement("canvas");
    bleedSamplerRef.current = sampler;
    const sCtx = sampler.getContext("2d", { willReadFrequently: true });
    if (!sCtx) return;

    const SAMPLE_W = 200;

    const paintBleed = () => {
      if (!v.videoWidth || v.paused) {
        bleedFrameRef.current = requestAnimationFrame(paintBleed);
        return;
      }

      const stageRect = stage.getBoundingClientRect();
      const videoRect = v.getBoundingClientRect();

      // Position relative to the stage container (which is position: relative)
      const left = videoRect.left - stageRect.left;
      const top = videoRect.top - stageRect.top;
      const dW = videoRect.width;
      const dH = videoRect.height;

      // Bleed depth scales with the smaller of the two video dimensions for responsiveness
      const BLEED = Math.max(40, Math.min(120, Math.round(Math.min(dW, dH) * 0.12)));

      const vw = v.videoWidth;
      const vh = v.videoHeight;
      const scale = SAMPLE_W / vw;
      const sH = Math.max(1, Math.round(vh * scale));

      sampler.width = SAMPLE_W;
      sampler.height = sH;
      sCtx.drawImage(v, 0, 0, SAMPLE_W, sH);

      const sxRatio = dW / SAMPLE_W;
      const syRatio = dH / sH;

      const drawHorizontal = (
        canvas: HTMLCanvasElement | null,
        side: "top" | "bottom"
      ) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = Math.round(dW);
        canvas.height = BLEED;
        canvas.style.width = `${dW}px`;
        canvas.style.height = `${BLEED}px`;
        canvas.style.left = `${left}px`;
        canvas.style.top = side === "top" ? `${top - BLEED}px` : `${top + dH}px`;

        const row = sCtx.getImageData(0, side === "top" ? 0 : sH - 1, SAMPLE_W, 1).data;
        for (let x = 0; x < SAMPLE_W; x++) {
          const i = x * 4;
          const g =
            side === "top"
              ? ctx.createLinearGradient(0, BLEED, 0, 0)
              : ctx.createLinearGradient(0, 0, 0, BLEED);
          g.addColorStop(0, `rgb(${row[i]},${row[i + 1]},${row[i + 2]})`);
          g.addColorStop(0.5, `rgba(${row[i]},${row[i + 1]},${row[i + 2]},0.4)`);
          g.addColorStop(1, `rgba(${row[i]},${row[i + 1]},${row[i + 2]},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(Math.round(x * sxRatio), 0, Math.ceil(sxRatio), BLEED);
        }
      };

      const drawVertical = (
        canvas: HTMLCanvasElement | null,
        side: "left" | "right"
      ) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = BLEED;
        canvas.height = Math.round(dH);
        canvas.style.width = `${BLEED}px`;
        canvas.style.height = `${dH}px`;
        canvas.style.top = `${top}px`;
        canvas.style.left = side === "left" ? `${left - BLEED}px` : `${left + dW}px`;

        const col = sCtx.getImageData(side === "left" ? 0 : SAMPLE_W - 1, 0, 1, sH).data;
        for (let y = 0; y < sH; y++) {
          const i = y * 4;
          const g =
            side === "left"
              ? ctx.createLinearGradient(BLEED, 0, 0, 0)
              : ctx.createLinearGradient(0, 0, BLEED, 0);
          g.addColorStop(0, `rgb(${col[i]},${col[i + 1]},${col[i + 2]})`);
          g.addColorStop(0.5, `rgba(${col[i]},${col[i + 1]},${col[i + 2]},0.4)`);
          g.addColorStop(1, `rgba(${col[i]},${col[i + 1]},${col[i + 2]},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(0, Math.round(y * syRatio), BLEED, Math.ceil(syRatio));
        }
      };

      drawHorizontal(bleedTopRef.current, "top");
      drawHorizontal(bleedBottomRef.current, "bottom");
      drawVertical(bleedLeftRef.current, "left");
      drawVertical(bleedRightRef.current, "right");

      bleedFrameRef.current = requestAnimationFrame(paintBleed);
    };

    const onPlay = () => {
      cancelAnimationFrame(bleedFrameRef.current);
      paintBleed();
    };

    v.addEventListener("play", onPlay);
    if (!v.paused) paintBleed();

    return () => {
      v.removeEventListener("play", onPlay);
      cancelAnimationFrame(bleedFrameRef.current);
    };
  }, []);

  // Show controls after mount, init volume to 0
  useEffect(() => {
    const timer = setTimeout(() => setShowControls(true), 150);
    if (videoRef.current) videoRef.current.volume = 0;
    return () => clearTimeout(timer);
  }, []);

  // Progress tracking
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const updateProgress = () => {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    v.addEventListener("timeupdate", updateProgress);
    return () => v.removeEventListener("timeupdate", updateProgress);
  }, []);

  // Fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement === containerRef.current) {
        setIsFullscreen(true);
        return;
      }
      const v = videoRef.current as HTMLVideoElement & { webkitDisplayingFullscreen?: boolean };
      if (v && typeof v.webkitDisplayingFullscreen !== "undefined") {
        setIsFullscreen(!!v.webkitDisplayingFullscreen);
      } else if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    const v = videoRef.current as HTMLVideoElement & {
      webkitDisplayingFullscreen?: boolean;
      addEventListener(type: string, listener: () => void): void;
      removeEventListener(type: string, listener: () => void): void;
    };
    if (v) {
      v.addEventListener("webkitbeginfullscreen", handleFullscreenChange);
      v.addEventListener("webkitendfullscreen", handleFullscreenChange);
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (v) {
        v.removeEventListener("webkitbeginfullscreen", handleFullscreenChange);
        v.removeEventListener("webkitendfullscreen", handleFullscreenChange);
      }
    };
  }, []);

  // Hide the scroll indicator after the user scrolls (first video only)
  useEffect(() => {
    if (index !== 0) return;
    const onScroll = () => {
      if (window.scrollY > 60) setHasScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [index]);

  // IntersectionObserver — only the in-view video plays
  useEffect(() => {
    const el = containerRef.current;
    const v = videoRef.current;
    if (!el || !v) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            setIsInView(true);
            v.play().catch(() => {});
          } else {
            setIsInView(false);
            v.pause();
          }
        }
      },
      { threshold: [0, 0.25, 0.55, 0.75, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) v.pause();
    else v.play();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isMuted) {
      v.muted = false;
      setIsMuted(false);
      let vol = v.volume;
      const ramp = () => {
        vol = Math.min(vol + 0.05, 1);
        v.volume = vol;
        setVolume(vol);
        if (vol < 1) requestAnimationFrame(ramp);
      };
      requestAnimationFrame(ramp);
    } else {
      v.muted = true;
      v.volume = 0;
      setIsMuted(true);
      setVolume(0);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const newVolume = parseFloat(e.target.value);
    v.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      v.muted = false;
      setIsMuted(false);
    }
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    const v = videoRef.current;
    if (!container || !v) return;

    try {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const videoAny = v as HTMLVideoElement & {
        webkitEnterFullscreen?: () => void;
        webkitExitFullscreen?: () => void;
        webkitDisplayingFullscreen?: boolean;
      };

      if (isMobile && typeof videoAny.webkitEnterFullscreen === "function") {
        if (videoAny.webkitDisplayingFullscreen) {
          videoAny.webkitExitFullscreen?.();
        } else {
          videoAny.webkitEnterFullscreen();
        }
        return;
      }

      if (!document.fullscreenElement) {
        await container.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  const handleVideoClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      toggleFullscreen();
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        togglePlayPause();
        clickTimeoutRef.current = null;
      }, 250);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    v.currentTime = percentage * v.duration;
  };

  const isFirst = index === 0;

  return (
    <section
      ref={containerRef}
      className={`relative w-full bg-black overflow-hidden text-cream flex flex-col ${
        isFirst ? "min-h-screen pt-20 md:pt-24" : "min-h-screen pt-12 md:pt-16"
      } pb-32`}
    >
      {/* Video stage */}
      <div
        ref={stageRef}
        className="relative flex-1 flex items-center justify-center px-4 md:px-12"
      >
        {/* Bleed canvases sit absolutely inside the stage (which is the positioned ancestor) */}
        <canvas
          ref={bleedTopRef}
          className="prog-bleed pointer-events-none absolute z-0"
        />
        <canvas
          ref={bleedBottomRef}
          className="prog-bleed pointer-events-none absolute z-0"
        />
        <canvas
          ref={bleedLeftRef}
          className="prog-bleed pointer-events-none absolute z-0"
        />
        <canvas
          ref={bleedRightRef}
          className="prog-bleed pointer-events-none absolute z-0"
        />

        <div className="relative z-10 w-full max-w-6xl">
          <video
            ref={videoRef}
            className="w-full cursor-pointer block"
            style={{ height: "auto", maxHeight: "calc(100vh - 240px)" }}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            onClick={handleVideoClick}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Controls + caption */}
      <div
        className={`px-4 md:px-8 pt-4 transition-opacity duration-500 ${
          showControls && isInView ? "opacity-100" : "opacity-40"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Progress bar */}
          <div
            onClick={handleProgressClick}
            className="relative w-full h-1 bg-neutral-800 cursor-pointer mb-4 group"
          >
            <div
              className="absolute top-0 left-0 h-full bg-cream transition-all"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cream opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progress}%`, marginLeft: "-6px" }}
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button
                onClick={() => {
                  togglePlayPause();
                  playSound("click");
                }}
                onMouseEnter={() => playSound("hover")}
                className="hover:opacity-70 transition-opacity flex items-center gap-2"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  {isPlaying ? (
                    <>
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </>
                  ) : (
                    <path d="M8 5v14l11-7z" />
                  )}
                </svg>
              </button>

              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: isPlaying ? "#E8DCC4" : "rgba(232, 220, 196, 0.4)",
                  }}
                />
                <span className="uppercase tracking-wider">
                  {isPlaying ? "Playing" : "Paused"}
                </span>
              </div>

              {/* Mute */}
              <button
                onClick={() => {
                  toggleMute();
                  playSound("click");
                }}
                onMouseEnter={() => playSound("hover")}
                className="hover:opacity-70 transition-opacity"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX size={16} strokeWidth={1.5} />
                ) : (
                  <Volume2 size={16} strokeWidth={1.5} />
                )}
              </button>

              {/* Volume slider — desktop only */}
              <div className="hidden md:flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: "#E8DCC4" }}
                />
              </div>

              {/* Fullscreen */}
              <button
                onClick={() => {
                  toggleFullscreen();
                  playSound("click");
                }}
                onMouseEnter={() => playSound("hover")}
                className="hover:opacity-70 transition-opacity"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  {isFullscreen ? (
                    <>
                      <path d="M6 2 L6 6 L2 6" />
                      <path d="M10 2 L10 6 L14 6" />
                      <path d="M6 14 L6 10 L2 10" />
                      <path d="M10 14 L10 10 L14 10" />
                    </>
                  ) : (
                    <>
                      <path d="M2 6 L2 2 L6 2" />
                      <path d="M14 6 L14 2 L10 2" />
                      <path d="M2 10 L2 14 L6 14" />
                      <path d="M14 10 L14 14 L10 14" />
                    </>
                  )}
                </svg>
              </button>
            </div>

            <div className="w-full text-left md:text-right md:ml-auto">
              <p className="text-xs mb-1 text-cream-muted">
                {video.artist} &ldquo;{video.songTitle}&rdquo;
              </p>
              {video.accolade && (
                <p className="text-[11px] md:text-xs mb-1 flex flex-wrap items-center gap-x-1 gap-y-0.5 md:justify-end text-gold">
                  <Star
                    size={14}
                    strokeWidth={1.5}
                    className="flex-shrink-0"
                    color="#E0CD67"
                  />
                  <span className="font-semibold">{video.accolade.line1}</span>
                  <span className="font-semibold">{video.accolade.line2}</span>
                </p>
              )}
              {video.toolsLine && (
                <p className="text-[11px] md:text-xs text-cream-muted">
                  {video.toolsLine}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-down hint — first video only, fades out after first scroll */}
      {isFirst && (
        <div
          className={`pointer-events-none absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-700 ${
            hasScrolled || !isInView ? "opacity-0" : "opacity-50"
          }`}
          aria-hidden="true"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cream animate-bounce"
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      )}

      <style jsx global>{`
        .prog-bleed {
          z-index: 0;
        }
      `}</style>
    </section>
  );
}
