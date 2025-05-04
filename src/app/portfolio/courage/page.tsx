// src/app/portfolio/courage/page.tsx
import ProjectDetail from '@/components/portfolio/ProjectDetail';

export default function CourageProject() {
  const projectData = {
    title: 'THE COURAGE TO RIGHT A WOMAN\'S WRONGS',
    producer: 'UCLA, School of Theater, Film and Television',
    year: '2024',
    team: [
      { role: 'Director', name: 'Michael Hackett' },
      { role: 'Set design', name: 'Cayla Baughns' },
      { role: 'Costume design', name: 'Taylor Aragon' },
      { role: 'Sound design', name: 'Jonathan Snipes' },
      { role: 'ALD', name: 'Hope Kozielski' },
      { role: 'Lighting Advisor', name: 'Lap Chi Chu' },
      { role: 'Lighting Supervisor', name: 'Nikki Alday' },
    ],
    imageFolder: 'courage',
    imageCount: 16, // courage0.jpg to courage15.jpg
  };

  return <ProjectDetail {...projectData} />;
}