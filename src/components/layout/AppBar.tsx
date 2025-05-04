// src/components/layout/AppBar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Resume', href: '/resume' },
  { name: 'About', href: '/about' },
  { name: "What's Next", href: '/upcoming' },
];

export default function AppBar() {
  const pathname = usePathname();
  
  return (
    <header className="py-4 px-6 w-full">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Em Moore • Lighting Design
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'text-black dark:text-white'
                  : 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Mobile menu button (to be implemented later) */}
        <button className="md:hidden">
          <span className="sr-only">Open menu</span>
          {/* Icon will go here */}
        </button>
      </div>
    </header>
  );
}