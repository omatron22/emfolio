"use client";

import Link from "next/link";
import { LogoEyes } from "./LogoEyes";

export function LogoLink() {
  return (
    <Link
      href="/"
      className="text-2xl md:text-2xl lg:text-4xl xl:text-5xl font-extrabold tracking-[0.32em] uppercase transition-opacity hover:opacity-80 text-cream whitespace-nowrap"
      style={{
        textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
      }}
      aria-label="Em Moore - Home"
      onMouseEnter={() => window.dispatchEvent(new Event("logo-hover"))}
      onMouseLeave={() => window.dispatchEvent(new Event("logo-leave"))}
    >
      Em M
      <LogoEyes />
      re
    </Link>
  );
}
