// src/app/portfolio/layout.tsx
export default function PortfolioLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }