"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Volume2, VolumeX } from "lucide-react";

export default function ProgrammingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0);

  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(true), 150);
    // Set initial volume to 0
    if (videoRef.current) videoRef.current.volume = 0;
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true);
        return;
      }
      const video = videoRef.current as HTMLVideoElement & { webkitDisplayingFullscreen?: boolean };
      if (video && typeof video.webkitDisplayingFullscreen !== "undefined") {
        setIsFullscreen(!!video.webkitDisplayingFullscreen);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    const video = videoRef.current as HTMLVideoElement & {
      webkitDisplayingFullscreen?: boolean;
      addEventListener(type: string, listener: () => void): void;
      removeEventListener(type: string, listener: () => void): void;
    };
    if (video) {
      video.addEventListener("webkitbeginfullscreen", handleFullscreenChange);
      video.addEventListener("webkitendfullscreen", handleFullscreenChange);
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (video) {
        video.removeEventListener("webkitbeginfullscreen", handleFullscreenChange);
        video.removeEventListener("webkitendfullscreen", handleFullscreenChange);
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (isMuted) {
      // Unmute and smoothly ramp volume to 1
      video.muted = false;
      setIsMuted(false);
      let vol = video.volume;
      const ramp = () => {
        vol = Math.min(vol + 0.05, 1);
        video.volume = vol;
        setVolume(vol);
        if (vol < 1) requestAnimationFrame(ramp);
      };
      requestAnimationFrame(ramp);
    } else {
      // Mute and set volume to 0
      video.muted = true;
      video.volume = 0;
      setIsMuted(true);
      setVolume(0);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    try {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const videoAny = video as HTMLVideoElement & {
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
    if (!videoRef.current) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black overflow-hidden text-cream"
    >
      <div className="absolute inset-0 flex items-center justify-center" style={{ top: "80px", bottom: "110px" }}>
        {/* Blurred background copy for real-time bleed */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: "radial-gradient(ellipse 70% 60% at center, transparent 40%, black 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at center, transparent 40%, black 70%)",
          }}
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ filter: "blur(60px) brightness(0.6)", transform: "scale(1.2)" }}
            aria-hidden="true"
          >
            <source src="/program.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Main video */}
        <video
          ref={videoRef}
          className="relative max-w-full max-h-full cursor-pointer z-[1]"
          style={{ display: "block" }}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onClick={handleVideoClick}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source
            src="/program.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 bg-black pb-12 px-8 transition-opacity duration-500 ${
          showControls ? "opacity-100" : "opacity-0"
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
                onClick={togglePlayPause}
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
                onClick={toggleMute}
                className="hover:opacity-70 transition-opacity"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX size={16} strokeWidth={1.5} />
                ) : (
                  <Volume2 size={16} strokeWidth={1.5} />
                )}
              </button>

              {/* Volume slider - desktop only */}
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
                onClick={toggleFullscreen}
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
                ODESZA &ldquo;Behind The Sun&rdquo;
              </p>
              <p className="text-[11px] md:text-xs mb-1 flex flex-wrap items-center gap-x-1 gap-y-0.5 md:justify-end text-gold">
                <Star size={14} strokeWidth={1.5} className="flex-shrink-0" color="#E0CD67" />
                <span className="font-semibold">Runner Up, 2025 ACT Entertainment</span>
                <span className="font-semibold">grandMA3 Programming Contest</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
