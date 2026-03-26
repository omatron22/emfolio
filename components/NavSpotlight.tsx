"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

export function NavSpotlight() {
  const pathname = usePathname();
  const [targetX, setTargetX] = useState<number | null>(null);
  const rafRef = useRef<number>(0);

  const updateTarget = useCallback(() => {
    const activeLink = document.querySelector<HTMLElement>('[data-nav-active="true"]');
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      setTargetX(rect.left + rect.width / 2);
    } else {
      setTargetX(null);
    }
  }, []);

  useEffect(() => {
    // Wait for DOM to settle
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(updateTarget);
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, [pathname, updateTarget]);

  useEffect(() => {
    window.addEventListener("resize", updateTarget);
    return () => window.removeEventListener("resize", updateTarget);
  }, [updateTarget]);

  if (targetX === null) return null;

  // Light source is at center-top of the viewport
  const sourceX = typeof window !== "undefined" ? window.innerWidth / 2 : 720;
  const sourceY = -40; // slightly above viewport
  const targetY = 48; // vertical center of nav text area
  const poolHalf = 60; // half-width of beam where it hits the text

  // Triangle points for clip-path (in px, we'll convert to % of the container)
  // Container is full viewport width, 100px tall
  const w = typeof window !== "undefined" ? window.innerWidth : 1440;
  const h = 100;

  const sx = ((sourceX / w) * 100).toFixed(2);
  const sy = ((Math.max(sourceY, 0) / h) * 100).toFixed(2);
  const lx = (((targetX - poolHalf) / w) * 100).toFixed(2);
  const rx = (((targetX + poolHalf) / w) * 100).toFixed(2);
  const ty = ((targetY / h) * 100).toFixed(2);
  const by = "100";

  return (
    <div
      className="hidden md:block"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: 100,
        pointerEvents: "none",
        zIndex: 49,
        // Beam shape: triangle from source point to pool at target
        clipPath: `polygon(${sx}% ${sy}%, ${lx}% ${by}%, ${rx}% ${by}%)`,
        // Gradient: bright at bottom (where it hits text), fading up to source
        background: `linear-gradient(to bottom, rgba(232,220,196,0) 0%, rgba(232,220,196,0.04) 30%, rgba(232,220,196,0.14) 70%, rgba(232,220,196,0.22) 100%)`,
        transition: "clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    />
  );
}
