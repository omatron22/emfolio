'use client';

import "./globals.css";
import AppBar from "@/components/layout/AppBar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { 
  geistSans, 
  geistMono, 
  playfairDisplay, 
  oswald,
  poppins
} from "./fonts";

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
          className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${oswald.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}
        >
          <AppBar />
          <main className="flex-grow page-transition">{children}</main>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}