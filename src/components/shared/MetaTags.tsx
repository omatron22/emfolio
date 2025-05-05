// src/components/shared/MetaTags.tsx
import Head from 'next/head';

interface MetaTagsProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
}

export default function MetaTags({
  title,
  description,
  url = 'https://emmoore.lighting', // Replace with your actual domain
  image = '/images/og-image.jpg', // Replace with your actual OG image
  type = 'website',
}: MetaTagsProps) {
  const fullTitle = `${title} | Em Moore • Lighting Design`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
}