"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/programming", label: "Programming" },
  { href: "/renderings", label: "Renderings" },
  { href: "/drafting", label: "Drafting" },
  { href: "/about", label: "About" },
];

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-8 text-xs md:text-sm font-semibold uppercase tracking-[0.3em]">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-opacity ${isActive ? "opacity-100" : "opacity-60 hover:opacity-90"}`}
            style={{
              color: "#E8DCC4",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
            }}
          >
            {item.label}
          </Link>
        );
      })}
      <a
        href="/resume/Em_Moore_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity opacity-60 hover:opacity-90"
        style={{
          color: "#E8DCC4",
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
        }}
      >
        Resume
      </a>
    </nav>
  );
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span
          className="block w-6 h-0.5 bg-cream transition-all duration-300"
          style={{
            transform: isOpen ? "rotate(45deg) translateY(8px)" : "none",
          }}
        />
        <span
          className="block w-6 h-0.5 bg-cream transition-all duration-300"
          style={{ opacity: isOpen ? 0 : 1 }}
        />
        <span
          className="block w-6 h-0.5 bg-cream transition-all duration-300"
          style={{
            transform: isOpen ? "rotate(-45deg) translateY(-8px)" : "none",
          }}
        />
      </button>

      <div
        className={`md:hidden absolute top-full right-4 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-3 py-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-semibold uppercase tracking-[0.3em] transition-opacity ${
                  isActive ? "opacity-100" : "opacity-60 hover:opacity-90"
                }`}
                style={{
                  color: "#E8DCC4",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="/resume/Em_Moore_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold uppercase tracking-[0.3em] transition-opacity opacity-60 hover:opacity-90"
            style={{
              color: "#E8DCC4",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
            }}
          >
            Resume
          </a>
        </nav>
      </div>

      {/* Backdrop to close menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
