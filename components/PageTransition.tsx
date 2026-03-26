"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [displayChildren, setDisplayChildren] = useState(children);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== previousPathname.current) {
      // New route - fade in
      setIsVisible(false);
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsVisible(true);
        previousPathname.current = pathname;
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  return (
    <div
      className="page-transition-wrapper"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {displayChildren}
    </div>
  );
}
