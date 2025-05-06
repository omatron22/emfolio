'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Update the Theme type to include 'system' as a valid option
type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps) {
  // We'll use the defaultTheme as the initial state
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);
  
  // Once mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    // For applying the theme class, we only want to use 'light' or 'dark'
    // not 'system', so we need to calculate the actual theme to apply
    const resolvedTheme = theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : theme;
    
    // Remove the old theme classes and add the new theme class
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    
    // Store the user's preference
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // When the component is mounted on the client
  useEffect(() => {
    // Check for the saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  const value = {
    theme,
    setTheme,
  };
  
  // Prevent hydration mismatch by rendering only after mounted on client
  if (!mounted) {
    return <>{children}</>;
  }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}