// src/app/page.tsx (replacing the existing one)
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center p-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Em Moore</h1>
      <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
        Lighting Design
      </h2>
      <Link
        href="/portfolio"
        className="px-6 py-3 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
      >
        View Portfolio
      </Link>
    </div>
  );
}