"use client";

import { useEffect, useRef, useState } from "react";

export default function RenderingsPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // For single vs double tap on mobile / desktop
    const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowControls(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            const currentProgress = (video.currentTime / video.duration) * 100;
            setProgress(currentProgress);
        };

        const updateDuration = () => {
            setDuration(video.duration);
        };

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

            const video = videoRef.current as any;
            if (video && typeof video.webkitDisplayingFullscreen !== "undefined") {
                setIsFullscreen(!!video.webkitDisplayingFullscreen);
            } else {
                setIsFullscreen(false);
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        const video = videoRef.current as any;
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

    const toggleFullscreen = async () => {
        const container = containerRef.current;
        const video = videoRef.current;
        if (!container || !video) return;

        try {
            const isMobile =
                typeof window !== "undefined" && window.innerWidth < 768;

            const videoAny = video as any;

            // iOS / mobile Safari: prefer native video fullscreen
            if (
                isMobile &&
                typeof videoAny.webkitEnterFullscreen === "function"
            ) {
                if (videoAny.webkitDisplayingFullscreen) {
                    if (typeof videoAny.webkitExitFullscreen === "function") {
                        videoAny.webkitExitFullscreen();
                    }
                } else {
                    videoAny.webkitEnterFullscreen();
                }
                return;
            }

            // Desktop / other browsers: container fullscreen
            if (!document.fullscreenElement) {
                await container.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (err) {
            console.error("Error toggling fullscreen:", err);
        }
    };

    // Click handler that distinguishes single vs double click on all devices
    const handleVideoClick = () => {
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
            clickTimeoutRef.current = null;
            // Double tap/click → fullscreen
            toggleFullscreen();
        } else {
            clickTimeoutRef.current = setTimeout(() => {
                // Single tap/click → play/pause
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
        videoRef.current.currentTime =
            percentage * videoRef.current.duration;
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black overflow-hidden"
            style={{ color: "#E8DCC4" }}
        >
            {/* Video container - pushed down to avoid logo overlap */}
            <div className="absolute top-28 bottom-32 left-0 right-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-contain cursor-pointer"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        onClick={handleVideoClick}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    >
                        <source src="/renderings/render.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            {/* Controls bar */}
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
                            className="absolute top-0 left-0 h-full transition-all"
                            style={{
                                width: `${progress}%`,
                                backgroundColor: "#E8DCC4",
                            }}
                        />
                        {/* Hover indicator */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                                left: `${progress}%`,
                                backgroundColor: "#E8DCC4",
                                marginLeft: "-6px",
                            }}
                        />
                    </div>

                    {/* Status and description with controls */}
<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs">
                        <div className="flex items-center gap-4">
                            {/* Play/Pause button */}
                            <button
                                onClick={togglePlayPause}
                                className="hover:opacity-70 transition-opacity flex items-center gap-2"
                                style={{ color: "#E8DCC4" }}
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
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

                            <div
                                className="flex items-center gap-2"
                                style={{ color: "#E8DCC4" }}
                            >
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{
                                        backgroundColor: isPlaying
                                            ? "#E8DCC4"
                                            : "rgba(232, 220, 196, 0.4)",
                                    }}
                                />
                                <span className="uppercase tracking-wider">
                                    {isPlaying ? "Playing" : "Paused"}
                                </span>
                            </div>

                            {/* Fullscreen button */}
                            <button
                                onClick={toggleFullscreen}
                                className="hover:opacity-70 transition-opacity"
                                style={{ color: "#E8DCC4" }}
                                aria-label={
                                    isFullscreen
                                        ? "Exit fullscreen"
                                        : "Enter fullscreen"
                                }
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

<div className="text-left md:text-right">
  <p
    className="text-xs mb-1"
    style={{ color: "#D4C5A9" }}
  >
    ODESZA “Behind The Sun”
  </p>

  <p
    className="text-xs mb-1 flex items-center gap-1 md:justify-end"
    style={{ color: "#E0CD67" }} // soft gold accent
  >
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="inline-block flex-shrink-0"
      style={{ fill: "#E0CD67" }}
    >
      <path d="M7 4v3a5 5 0 0 0 10 0V4h-2V2H9v2H7zm2 0h6v3a3 3 0 0 1-6 0V4zm-4 1v2a4 4 0 0 0 4 4v-2a2 2 0 0 1-2-2V5H5zm14 0h-2v2a2 2 0 0 1-2 2v2a4 4 0 0 0 4-4V5zm-9 9v2.5L8 18v2h8v-2l-2-1.5V14h-4z" />
    </svg>
    <span className="font-semibold tracking-wide">
      Winner, 2025 ACT Entertainment grandMA3 Programming Contest
    </span>
  </p>

</div>


                    </div>
                </div>
            </div>
        </div>
    );
}
