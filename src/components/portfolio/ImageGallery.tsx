'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  folder: string;
  initialIndex?: number;
}

export default function ImageGallery({
  images,
  folder,
  initialIndex = 0
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFullscreen]);
  
  // Navigate between images
  const navigateImage = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
    setIsLoading(true);
  };
  
  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  return (
    <div className="image-gallery-container relative">
      {/* Main Image Display */}
      <div 
        className={`relative ${
          isFullscreen 
            ? 'fixed inset-0 z-50 bg-black flex items-center justify-center p-4'
            : 'w-full aspect-video bg-black mb-4'
        }`}
      >
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <Image
          src={`/images/${folder}/${images[currentIndex]}`}
          alt={`Image ${currentIndex + 1}`}
          fill
          className={`object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          priority={currentIndex === initialIndex}
        />
        
        {/* Navigation buttons */}
        <button 
          onClick={() => navigateImage('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <button 
          onClick={() => navigateImage('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        
        {/* Fullscreen toggle button */}
        <button 
          onClick={toggleFullscreen}
          className="absolute right-4 bottom-4 h-10 w-10 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          )}
        </button>
        
        {/* Image counter */}
        <div className="absolute left-4 bottom-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mt-6">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsLoading(true);
            }}
            className={`aspect-square overflow-hidden relative ${
              currentIndex === index 
                ? 'ring-2 ring-accent' 
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={`/images/${folder}/${image}`}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="(max-width: 768px) 20vw, 10vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Fullscreen overlay close button (visible only in fullscreen mode) */}
      {isFullscreen && (
        <button 
          onClick={() => setIsFullscreen(false)}
          className="fixed top-4 right-4 z-50 h-10 w-10 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label="Close fullscreen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}