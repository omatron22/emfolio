"use client";

import Link from "next/link";
import { LogoEyes } from "./LogoEyes";
import { useSounds } from "@/components/SoundProvider";

export function LogoLink() {
  const { play } = useSounds();

  return (
    <Link
      href="/"
      className="text-2xl md:text-2xl lg:text-4xl xl:text-5xl font-extrabold tracking-[0.32em] uppercase transition-opacity hover:opacity-80 text-cream whitespace-nowrap"
      style={{
        textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
      }}
      aria-label="Em Moore - Home"
      onMouseEnter={() => { window.dispatchEvent(new Event("logo-hover")); play("logo-hover"); }}
      onMouseLeave={() => window.dispatchEvent(new Event("logo-leave"))}
      onClick={() => play("logo-click")}
    >
      Em M
      <LogoEyes />
      re
    </Link>
  );
}
