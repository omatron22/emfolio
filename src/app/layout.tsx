// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/layout/AppBar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Em Moore • Lighting Design",
  description: "Portfolio of Em Moore, Lighting Designer specializing in theater, dance, and live events",
  keywords: ["lighting design", "theater", "dance", "performance", "UCLA", "MFA", "lighting designer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AppBar />
        <main className="flex-grow page-transition">{children}</main>
        <Footer />
      </body>
    </html>
  );
}