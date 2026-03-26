"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const pathname = usePathname();

  // Don't show on home page (has its own spotlight) or programming (video page)
  const isDisabled = pathname === "/" || pathname === "/programming";

  const animate = useCallback(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Smooth lerp towards target
    posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.08;
    posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.08;

    glow.style.background = `radial-gradient(circle 350px at ${posRef.current.x}px ${posRef.current.y}px, rgba(232, 220, 196, 0.04) 0%, transparent 60%)`;

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isDisabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isDisabled, animate]);

  if (isDisabled) return null;

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 pointer-events-none z-[5] hidden md:block"
      aria-hidden="true"
    />
  );
}
