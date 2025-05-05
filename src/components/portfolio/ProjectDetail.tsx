'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery';

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
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Generate the image paths
    const imageList = Array.from({ length: imageCount }, (_, i) => 
      `${imageFolder}${i}.jpg`
    );
    setImages(imageList);
    setIsLoading(false);
  }, [imageFolder, imageCount]);

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
        className="inline-flex items-center mb-6 text-sm hover:underline gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
        Back to Portfolio
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
      <p className="text-xl mb-8">{producer}, {year}</p>
      
      {/* Image Gallery */}
      {isLoading ? (
        <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <div className="h-10 w-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ImageGallery images={images} folder={imageFolder} />
      )}
      
      {/* Team credits */}
      <div className="my-12">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Credits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Leadership</h3>
            <ul className="space-y-2">
              {teamByCategory.leadership.map((member, index) => (
                <li key={index} className="flex">
                  <span className="font-medium min-w-36">{member.role}:</span> 
                  <span>{member.name}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Design</h3>
            <ul className="space-y-2">
              {teamByCategory.design.map((member, index) => (
                <li key={index} className="flex">
                  <span className="font-medium min-w-36">{member.role}:</span> 
                  <span>{member.name}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Lighting Team</h3>
            <ul className="space-y-2">
              {teamByCategory.lighting.map((member, index) => (
                <li key={index} className="flex">
                  <span className="font-medium min-w-36">{member.role}:</span> 
                  <span>{member.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Design Notes/Statement (optional) */}
      <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Design Approach</h2>
        <p className="mb-4">
          For {title}, the lighting design focused on creating dramatic contrasts between intimate moments and grand ensemble scenes. The color palette draws from the emotional journey of the characters, using saturated tones and stark transitions to highlight pivotal moments in the narrative.
        </p>
        <p>
          Special attention was given to the way light shapes and defines the performance space, creating distinct environments while maintaining visual cohesion throughout the production.
        </p>
      </div>
    </div>
  );
}