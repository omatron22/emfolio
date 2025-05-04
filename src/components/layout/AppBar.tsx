'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Resume', href: '/resume' },
  { name: 'About', href: '/about' },
  { name: "What's Next", href: '/upcoming' },
];

export default function AppBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scrolling effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('#mobile-menu') && !target.closest('#menu-button')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);
  
  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  const isHomePage = pathname === '/';
  
  // Determine navbar styling based on whether it's home page and scrolled status
  const navbarClasses = `
    py-4 px-6 w-full z-50 transition-all duration-300
    ${isHomePage && !scrolled 
      ? 'absolute top-0 left-0 bg-transparent' 
      : 'sticky top-0 bg-background/80 backdrop-blur-sm shadow-sm'}
  `;
  
  const logoTextClasses = `
    text-xl font-bold transition-colors
    ${isHomePage && !scrolled ? 'text-white' : 'text-foreground'}
  `;
  
  const linkBaseClasses = `
    text-sm font-medium transition-colors relative nav-link
  `;
  
  const linkActiveClasses = `
    ${isHomePage && !scrolled 
      ? 'text-white' 
      : 'text-black dark:text-white'}
  `;
  
  const linkInactiveClasses = `
    ${isHomePage && !scrolled 
      ? 'text-white/80 hover:text-white' 
      : 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white'}
  `;
  
  // Mobile menu button colors
  const menuButtonClasses = `
    md:hidden border rounded-md p-2 transition-colors
    ${isHomePage && !scrolled 
      ? 'border-white/30 text-white' 
      : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'}
  `;
  
  return (
    <header className={navbarClasses}>
      <div className="flex items-center justify-between">
        <Link href="/" className={logoTextClasses}>
          Em Moore • Lighting Design
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${linkBaseClasses} ${
                pathname === item.href
                  ? linkActiveClasses
                  : linkInactiveClasses
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Mobile menu button */}
        <button 
          id="menu-button"
          className={menuButtonClasses}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">
            {isMenuOpen ? 'Close menu' : 'Open menu'}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 p-4 mt-2 bg-background/95 backdrop-blur-md shadow-lg dark:shadow-gray-900/30 rounded-b-lg border-t dark:border-gray-800 z-50"
        >
          <nav className="flex flex-col space-y-4 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  pathname === item.href
                    ? 'text-black dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-300'
                } block px-3 py-2 text-base hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}