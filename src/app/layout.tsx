// src/app/layout.tsx
import "./globals.css";
import AppBar from "@/components/layout/AppBar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata = {
  title: "Em Moore • Lighting Design",
  description: "Portfolio and resume of Em Moore, lighting designer for theater and live events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="keywords" content="lighting design, theater, dance, performance, UCLA, MFA, lighting designer" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider defaultTheme="light">
          <AppBar />
          <main className="flex-grow page-transition">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}