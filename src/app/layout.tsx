// src/app/layout.tsx
'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/layout/AppBar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider defaultTheme="system">
      <html lang="en" className="scroll-smooth">
        <head>
          <meta name="keywords" content="lighting design, theater, dance, performance, UCLA, MFA, lighting designer" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
          <AppBar />
          <main className="flex-grow page-transition">{children}</main>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});