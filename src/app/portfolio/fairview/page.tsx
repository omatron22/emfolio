// src/app/portfolio/fairview/page.tsx
import ProjectDetail from '@/components/portfolio/ProjectDetail';

export default function FairviewProject() {
  const projectData = {
    title: 'FAIRVIEW',
    producer: 'UCLA, School of Theater, Film and Television',
    year: '2024',
    team: [
      { role: 'Director', name: 'David H. Parker' },
      { role: 'Set design', name: 'Rye Mandel' },
      { role: 'Costume design', name: 'Elena Gim' },
      { role: 'Sound design', name: 'Malick Ceesay' },
      { role: 'ALD', name: 'Antonia Yang' },
      { role: 'Lighting Advisor', name: 'Lap Chi Chu' },
      { role: 'Lighting Supervisor', name: 'Nikki Alday' },
    ],
    imageFolder: 'fairview',
    imageCount: 14, // fairview0.jpg to fairview13.jpg
  };

  return <ProjectDetail {...projectData} />;
}