'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export interface ProjectMember {
  role: string;
  name: string;
}

export interface ProjectProps {
  title: string;
  producer: string;
  year: string;
  team: ProjectMember[];
  imageFolder: string;
  imageCount: number;
}

export default function ProjectDetail({
  title,
  producer,
  year,
  team,
  imageFolder,
  imageCount,
}: ProjectProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageCount);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  // Group team members by role category
  const roleCategories = {
    leadership: ['Director', 'Music Direction', 'Choreography'],
    design: ['Set design', 'Costume design', 'Sound design'],
    lighting: ['ALD', 'Lighting Advisor', 'Lighting Supervisor'],
  };

  // Filter and group team members
  const teamByCategory = {
    leadership: team.filter(member => 
      roleCategories.leadership.includes(member.role)),
    design: team.filter(member => 
      roleCategories.design.includes(member.role)),
    lighting: team.filter(member => 
      roleCategories.lighting.includes(member.role)),
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/portfolio" 
        className="inline-block mb-6 text-sm hover:underline"
      >
        ← Back to Portfolio
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
      <p className="text-xl mb-8">{producer}, {year}</p>
      
      {/* Image Gallery */}
      <div className="relative w-full aspect-video mb-12 bg-black">
        <Image
          src={`/images/${imageFolder}/${imageFolder}${currentImageIndex}.jpg`}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
        
        {/* Navigation arrows */}
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label="Previous image"
        >
          ←
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label="Next image"
        >
          →
        </button>
        
        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {imageCount}
        </div>
      </div>
      
      {/* Team credits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-bold mb-4">Leadership</h2>
          <ul className="space-y-2">
            {teamByCategory.leadership.map((member, index) => (
              <li key={index}>
                <span className="font-medium">{member.role}:</span> {member.name}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Design</h2>
          <ul className="space-y-2">
            {teamByCategory.design.map((member, index) => (
              <li key={index}>
                <span className="font-medium">{member.role}:</span> {member.name}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Lighting Team</h2>
          <ul className="space-y-2">
            {teamByCategory.lighting.map((member, index) => (
              <li key={index}>
                <span className="font-medium">{member.role}:</span> {member.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Thumbnail gallery */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mt-8">
        {Array.from({ length: imageCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`aspect-square overflow-hidden relative ${
              currentImageIndex === index 
                ? 'ring-2 ring-black dark:ring-white' 
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={`/images/${imageFolder}/${imageFolder}${index}.jpg`}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="(max-width: 768px) 25vw, 16vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}