// src/components/shared/Metadata.tsx
export interface MetadataProps {
  title: string;
  description: string;
}

export default function generateMetadata({ title, description }: MetadataProps) {
  return {
    title: `${title} | Em Moore • Lighting Design`,
    description,
    openGraph: {
      title: `${title} | Em Moore • Lighting Design`,
      description,
      type: 'website',
    },
  };
}