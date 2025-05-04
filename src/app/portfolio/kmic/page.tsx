// src/app/portfolio/kmic/page.tsx
import ProjectDetail from '@/components/portfolio/ProjectDetail';

export default function KMICProject() {
  const projectData = {
    title: 'KEFFIYEH / MADE IN CHINA',
    producer: 'UCLA, School of Theater, Film and Television',
    year: '2023',
    team: [
      { role: 'Director', name: 'Yuval Zehavi' },
      { role: 'Set design', name: 'You Chen Zhang' },
      { role: 'Costume design', name: 'Shoshi Brustin' },
      { role: 'Sound design', name: 'Ben Susskind' },
      { role: 'ALD', name: 'Antonia Yang' },
      { role: 'Lighting Advisor', name: 'Brian Gale' },
      { role: 'Lighting Supervisor', name: 'Nikki Alday' },
    ],
    imageFolder: 'kmic',
    imageCount: 12, // kmic0.jpg to kmic11.jpg
  };

  return <ProjectDetail {...projectData} />;
}