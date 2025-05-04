// src/app/portfolio/page.tsx
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    id: 'comet',
    title: 'NATASHA, PIERRE & THE GREAT COMET OF 1812',
    coverImage: '/images/comet/comet0.jpg',
    href: '/portfolio/comet',
    producer: 'UCLA, School of Theater, Film and Television',
    year: '2025',
  },
  {
    id: 'courage',
    title: 'THE COURAGE TO RIGHT A WOMAN\'S WRONGS',
    coverImage: '/images/courage/courage0.jpg',
    href: '/portfolio/courage',
    producer: 'UCLA, School of Theater, Film and Television',
    year: '2024',
  },
  {
    id: 'fairview',
    title: 'FAIRVIEW',
    coverImage: '/images/fairview/fairview0.jpg',
    href: '/portfolio/fairview',
    producer: 'UCLA, School of Theater, Film and Television',
    year: '2024',
  },
  {
    id: 'kmic',
    title: 'KEFFIYEH / MADE IN CHINA',
    coverImage: '/images/kmic/kmic0.jpg',
    href: '/portfolio/kmic',
    producer: 'UCLA, School of Theater, Film and Television',
    year: '2023',
  },
];

export default function Portfolio() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link 
            href={project.href} 
            key={project.id}
            className="group block overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-all duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-xl md:text-2xl font-bold mb-2">{project.title}</h2>
                <p className="text-sm opacity-90">{project.producer}</p>
                <p className="text-sm opacity-90">{project.year}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}