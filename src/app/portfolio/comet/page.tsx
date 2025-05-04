// src/app/portfolio/comet/page.tsx
import ProjectDetail from '@/components/portfolio/ProjectDetail';

export default function CometProject() {
  const projectData = {
    title: 'NATASHA, PIERRE & THE GREAT COMET OF 1812',
    producer: 'UCLA, School of Theater, Film and Television',
    year: '2025',
    team: [
      { role: 'Director', name: 'J.ED Araiza' },
      { role: 'Music Direction', name: 'Dan Belzer' },
      { role: 'Choreography', name: 'Danielle Kay' },
      { role: 'Set design', name: 'You Chen Zhang' },
      { role: 'Costume design', name: 'Elena Gim' },
      { role: 'Sound design', name: 'Jonathan Burke' },
      { role: 'ALD', name: 'Gus Cohen & Hope Kozielski' },
      { role: 'Lighting Advisor', name: 'Lap Chi Chu' },
      { role: 'Lighting Supervisor', name: 'Randall Baptiste' },
    ],
    imageFolder: 'comet',
    imageCount: 35, // comet0.jpg to comet34.jpg
  };

  return <ProjectDetail {...projectData} />;
}