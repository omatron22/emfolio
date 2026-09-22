"use client";

import { usePathname } from "next/navigation";

// Keying on pathname remounts the wrapper on navigation, replaying the fade-in.
// Opacity only: a transform here would break position: fixed descendants.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="page-transition-wrapper"
      style={{ animation: "pageFade 0.25s cubic-bezier(0.4, 0, 0.2, 1) both" }}
    >
      {children}
    </div>
  );
}
