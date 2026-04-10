"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Volume2, VolumeX, X } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex]);

  return (
    <>
      <div className="min-h-screen bg-black text-cream flex items-center justify-center pt-20 md:pt-24 pb-12 px-4 md:px-10">
        <div className="w-full max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {videos.map((v, i) => (
              <VideoTile
                key={i}
                video={v}
                index={i}
                total={videos.length}
                paused={activeIndex !== null}
                onOpen={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {activeIndex !== null && (
        <VideoModal
          video={videos[activeIndex]}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}

function VideoTile({
  video,
  index,
  total,
  paused,
  onOpen,
}: {
  video: ProgrammingVideo;
  index: number;
  total: number;
  paused: boolean;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { play: playSound } = useSounds();

  // Pause tile video when the modal is open
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) {
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  }, [paused]);

  return (
    <button
      type="button"
      onClick={() => {
        playSound("click");
        onOpen();
      }}
      onMouseEnter={() => playSound("hover")}
      aria-label={`Open ${video.songTitle} by ${video.artist} in full view`}
      className="group relative w-full aspect-video overflow-hidden bg-black text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cream/50"
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        loop
        muted
        autoPlay
        playsInline
        preload="metadata"
      >
        <source src={video.src} type="video/mp4" />
      </video>

      {/* Bottom caption with gradient */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-20 pb-4 md:pb-5 px-4 md:px-5">
        <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-cream-muted mb-1">
          {video.artist}
        </p>
        <p className="text-base md:text-lg lg:text-xl font-semibold text-cream mb-1.5 leading-tight">
          &ldquo;{video.songTitle}&rdquo;
        </p>
        {video.accolade && (
          <p className="text-[10px] md:text-[11px] flex flex-wrap items-center gap-x-1 gap-y-0.5 text-gold">
            <Star
              size={11}
              strokeWidth={1.5}
              color="#E0CD67"
              className="flex-shrink-0"
            />
            <span className="font-semibold">{video.accolade.line1}</span>
            <span className="font-semibold">{video.accolade.line2}</span>
          </p>
        )}
        {video.toolsLine && (
          <p className="text-[10px] md:text-[11px] text-cream-muted">
            {video.toolsLine}
          </p>
        )}
      </div>

      {/* Hover: subtle darkening + bare expand icon */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/25">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cream drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          aria-hidden="true"
        >
          <path d="M15 3h6v6" />
          <path d="M9 21H3v-6" />
          <path d="M21 3l-7 7" />
          <path d="M3 21l7-7" />
        </svg>
      </div>
    </button>
  );
}

function VideoModal({
  video,
  onClose,
}: {
  video: ProgrammingVideo;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { play: playSound } = useSounds();

  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0);

  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Autoplay muted on mount
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = 0;
    v.play().catch(() => {});
  }, []);

  // Show controls after mount
  useEffect(() => {
    const timer = setTimeout(() => setShowControls(true), 150);
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

  const closeOnBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      playSound("click");
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col animate-[fadeIn_200ms_ease-out]"
      onClick={closeOnBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`${video.songTitle} by ${video.artist}`}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          playSound("click");
          onClose();
        }}
        onMouseEnter={() => playSound("hover")}
        aria-label="Close"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-30 flex items-center justify-center p-2 text-cream/80 hover:text-cream transition-colors"
      >
        <X size={26} strokeWidth={1.5} />
      </button>

      {/* Video stage — clicks on empty padding close modal */}
      <div
        ref={stageRef}
        className="relative flex-1 flex items-center justify-center px-4 md:px-12 pt-16 md:pt-20"
        onClick={closeOnBackdrop}
      >
        {/* Video wrapper — stop clicks from bubbling to the stage backdrop handler */}
        <div
          className="relative z-10 w-full max-w-6xl"
          onClick={(e) => e.stopPropagation()}
        >
          <video
            ref={videoRef}
            className="w-full cursor-pointer block"
            style={{ height: "auto", maxHeight: "calc(100vh - 220px)" }}
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
        className={`relative z-20 px-4 md:px-8 pt-4 pb-6 md:pb-8 transition-opacity duration-500 ${
          showControls ? "opacity-100" : "opacity-40"
        }`}
        onClick={(e) => e.stopPropagation()}
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

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
