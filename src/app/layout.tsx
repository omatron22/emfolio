'use client';

import "./globals.css";
import AppBar from "@/components/layout/AppBar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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
        <body className="antialiased min-h-screen flex flex-col">
          <AppBar />
          <main className="flex-grow page-transition">{children}</main>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}