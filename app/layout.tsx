import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { DesktopNav, MobileMenu } from "@/components/NavLinks";
import { LogoLink } from "@/components/LogoLink";
import { PageTransition } from "@/components/PageTransition";
import { CursorGlow } from "@/components/CursorGlow";
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
  title: {
    default: "Em Moore – Lighting Designer",
    template: "%s | Em Moore",
  },
  description:
    "Portfolio of lighting designer Em Moore, specializing in theater, dance, and live music productions. MFA candidate at UCLA.",
  keywords: [
    "lighting design",
    "theater",
    "Em Moore",
    "UCLA",
    "stage design",
    "live events",
  ],
  authors: [{ name: "Em Moore" }],
  openGraph: {
    title: "Em Moore – Lighting Designer",
    description:
      "Portfolio of lighting designer Em Moore, specializing in theater, dance, and live music productions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Em Moore – Lighting Designer",
    description:
      "Portfolio of lighting designer Em Moore, specializing in theater, dance, and live music productions.",
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased bg-black text-cream`}
      >
        <CursorGlow />

        <header className="fixed top-0 left-0 right-0 z-50 overflow-visible">
          <div className="flex items-center justify-between px-4 md:px-8 py-6 overflow-visible">
            <LogoLink />

            <DesktopNav />
            <MobileMenu />
          </div>
        </header>

        <main className="bg-black">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
