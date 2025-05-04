// src/app/upcoming/page.tsx
import Link from 'next/link';

const upcomingProjects = [
  {
    id: 'hamlet-internship',
    title: 'Hamlet',
    role: 'Lighting Design Intern',
    director: 'Robert O Hara',
    venue: 'Mark Taper Forum',
    dates: 'May - July 2025',
    description: 'Working with the lighting design team on this production at the Mark Taper Forum.'
  },
  {
    id: 'thesis-project',
    title: 'MFA Thesis Project',
    role: 'Lighting Designer',
    director: 'TBA',
    venue: 'UCLA',
    dates: 'Fall 2025',
    description: 'Currently in development for my MFA thesis project at UCLA.'
  },
  {
    id: 'dance-collaboration',
    title: 'Dance Collaboration',
    role: 'Lighting Designer',
    director: 'Various Choreographers',
    venue: 'UCLA Little Theatre',
    dates: 'Winter 2025',
    description: 'Upcoming collaboration with the UCLA Dance department featuring work from multiple choreographers.'
  }
];

export default function Upcoming() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">What&apos;s Next</h1>
      
      <div className="max-w-4xl">
        <p className="text-lg mb-8">
          Check back here for updates on my upcoming projects and performances. 
          I&apos;m constantly working on new designs and collaborations.
        </p>
        
        <div className="space-y-12">
          {upcomingProjects.map((project) => (
            <div key={project.id} className="border-l-4 border-black dark:border-white pl-6 py-2">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-lg font-medium mb-1">{project.role}</p>
              <p className="mb-1">Director: {project.director}</p>
              <p className="mb-1">Venue: {project.venue}</p>
              <p className="mb-3">Dates: {project.dates}</p>
              <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-gray-100 dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-4">Interested in Collaboration?</h2>
          <p className="mb-4">
            I&apos;m always open to discussing new projects and collaborations. If you&apos;re looking for a 
            lighting designer for your upcoming production, please reach out!
          </p>
          <Link 
            href="mailto:efmoore0610@g.ucla.edu" 
            className="inline-block px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-opacity-80 dark:hover:bg-opacity-80 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}