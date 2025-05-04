// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image (we'll use a key image from one of the shows) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10" />
        <Image
          src="/images/comet/comet1.jpg" 
          alt="Lighting design by Em Moore"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
          Em Moore
        </h1>
        <h2 className="text-xl md:text-3xl text-white/90 mb-12 font-light tracking-wider">
          Lighting Design
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl w-full">
          <Link
            href="/portfolio"
            className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-colors text-white group"
          >
            <span className="text-xl font-medium block mb-2">Portfolio</span>
            <span className="opacity-80 group-hover:opacity-100 transition-opacity">
              View my lighting design projects
            </span>
          </Link>
          
          <Link
            href="/resume"
            className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-colors text-white group"
          >
            <span className="text-xl font-medium block mb-2">Resume</span>
            <span className="opacity-80 group-hover:opacity-100 transition-opacity">
              My experience and qualifications
            </span>
          </Link>
          
          <Link
            href="/about"
            className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-colors text-white group"
          >
            <span className="text-xl font-medium block mb-2">About</span>
            <span className="opacity-80 group-hover:opacity-100 transition-opacity">
              Learn more about me and my approach
            </span>
          </Link>
          
          <Link
            href="/upcoming"
            className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-colors text-white group"
          >
            <span className="text-xl font-medium block mb-2">What&apos;s Next</span>
            <span className="opacity-80 group-hover:opacity-100 transition-opacity">
              Upcoming projects and performances
            </span>
          </Link>
        </div>
        
        <div className="mt-12">
          <Link 
            href="mailto:efmoore0610@g.ucla.edu"
            className="text-white/90 hover:text-white transition-colors"
          >
            efmoore0610@g.ucla.edu
          </Link>
        </div>
      </div>
    </div>
  );
}