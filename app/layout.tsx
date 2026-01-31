import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Em Moore – Lighting Designer",
  description: "Portfolio of lighting designer Em Moore, specializing in theater, dance, and live music productions. MFA candidate at UCLA.",
  keywords: ["lighting design", "theater", "Em Moore", "UCLA", "stage design", "live events"],
  authors: [{ name: "Em Moore" }],
  openGraph: {
    title: "Em Moore – Lighting Designer",
    description: "Portfolio of lighting designer Em Moore, specializing in theater, dance, and live music productions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Em Moore – Lighting Designer",
    description: "Portfolio of lighting designer Em Moore, specializing in theater, dance, and live music productions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased bg-black`}
        style={{ color: "#E8DCC4" }}
      >
        <header className="fixed top-0 left-0 right-0 z-50">
          <div className="flex items-center justify-between px-4 md:px-8 py-6">
            <Link
              href="/"
              className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-[0.32em] uppercase transition-colors hover:brightness-110"
              style={{
                color: "#E8DCC4",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
              }}
              aria-label="Em Moore - Home"
            >
              Em M
              <span className="inline-block relative">
                oo
                <span
                  className="absolute left-1/2"
                  style={{
                    top: "1.7em",
                    fontSize: "0.6em",
                    transform: "translateX(-75%) rotate(90deg)",
                  }}
                  aria-hidden="true"
                >
                  )
                </span>
              </span>
              re
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-xs md:text-sm font-semibold uppercase tracking-[0.3em]">
              <Link
                href="/portfolio"
                className="transition-colors hover:brightness-110"
                style={{
                  color: "#D4C5A9",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
                }}
              >
                Portfolio
              </Link>
              <Link
                href="/programming"
                className="transition-colors hover:brightness-110"
                style={{
                  color: "#D4C5A9",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
                }}
              >
                Programming
              </Link>
              <Link
                href="/renderings"
                className="transition-colors hover:brightness-110"
                style={{
                  color: "#D4C5A9",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
                }}
              >
                Renderings
              </Link>
              <Link
                href="/drafting"
                className="transition-colors hover:brightness-110"
                style={{
                  color: "#D4C5A9",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
                }}
              >
                Drafting
              </Link>
              <Link
                href="/about"
                className="transition-colors hover:brightness-110"
                style={{
                  color: "#D4C5A9",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
                }}
              >
                About
              </Link>
              <a
                href="/resume/Em_Moore_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:brightness-110"
                style={{
                  color: "#D4C5A9",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
                }}
              >
                Resume
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              style={{ color: "#E8DCC4" }}
              aria-label="Toggle menu"
              aria-expanded="false"
            >
              <span className="block w-6 h-0.5 transition-all" style={{ backgroundColor: "#E8DCC4" }}></span>
              <span className="block w-6 h-0.5 transition-all" style={{ backgroundColor: "#E8DCC4" }}></span>
              <span className="block w-6 h-0.5 transition-all" style={{ backgroundColor: "#E8DCC4" }}></span>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            id="mobile-menu"
            className="md:hidden absolute top-full right-4 opacity-0 pointer-events-none transition-opacity duration-300"
          >
            <nav className="flex flex-col gap-3 py-2">
              <Link
                href="/portfolio"
                className="text-sm font-semibold uppercase tracking-[0.3em] transition-colors hover:brightness-110"
                style={{
                  color: "#D4C5A9",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
                }}
              >
                Portfolio
              </Link>
              <Link
                href="/programming"
                className="text-sm font-semibold uppercase tracking-[0.3em] transition-colors hover:brightness-110"
                style={{
                  color: "#D4C5A9",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
                }}
              >
                Programming
              </Link>
              <Link
                href="/renderings"
                className="text-sm font-semibold uppercase tracking-[0.3em] transition-colors hover:brightness-110"
                style={{
                  color: "#D4C5A9",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
                }}
              >
                Renderings
              </Link>
              <Link
                href="/drafting"
                className="text-sm font-semibold uppercase tracking-[0.3em] transition-colors hover:brightness-110"
                style={{
                  color: "#D4C5A9",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
                }}
              >
                Drafting
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold uppercase tracking-[0.3em] transition-colors hover:brightness-110"
                style={{
                  color: "#D4C5A9",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
                }}
              >
                About
              </Link>
              <a
                href="/resume/Em_Moore_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold uppercase tracking-[0.3em] transition-colors hover:brightness-110"
                style={{
                  color: "#D4C5A9",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
                }}
              >
                Resume
              </a>
            </nav>
          </div>
        </header>

        <main className="bg-black">{children}</main>

        <script dangerouslySetInnerHTML={{
          __html: `
          (function() {
            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            let isOpen = false;

            if (btn && menu) {
              btn.addEventListener('click', function(e) {
                e.stopPropagation();
                isOpen = !isOpen;
                
                btn.setAttribute('aria-expanded', isOpen.toString());
                
                if (isOpen) {
                  menu.style.opacity = '1';
                  menu.style.pointerEvents = 'auto';
                  btn.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translateY(8px)';
                  btn.querySelectorAll('span')[1].style.opacity = '0';
                  btn.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translateY(-8px)';
                } else {
                  menu.style.opacity = '0';
                  menu.style.pointerEvents = 'none';
                  btn.querySelectorAll('span')[0].style.transform = '';
                  btn.querySelectorAll('span')[1].style.opacity = '1';
                  btn.querySelectorAll('span')[2].style.transform = '';
                }
              });

              document.addEventListener('click', function(e) {
                if (isOpen && !menu.contains(e.target) && !btn.contains(e.target)) {
                  isOpen = false;
                  btn.setAttribute('aria-expanded', 'false');
                  menu.style.opacity = '0';
                  menu.style.pointerEvents = 'none';
                  btn.querySelectorAll('span')[0].style.transform = '';
                  btn.querySelectorAll('span')[1].style.opacity = '1';
                  btn.querySelectorAll('span')[2].style.transform = '';
                }
              });

              menu.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                  isOpen = false;
                  btn.setAttribute('aria-expanded', 'false');
                  menu.style.opacity = '0';
                  menu.style.pointerEvents = 'none';
                  btn.querySelectorAll('span')[0].style.transform = '';
                  btn.querySelectorAll('span')[1].style.opacity = '1';
                  btn.querySelectorAll('span')[2].style.transform = '';
                });
              });
            }
          })();
        ` }} />
      </body>
    </html>
  );
}
