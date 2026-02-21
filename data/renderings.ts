export type RenderProject = {
  slug: string;
  title: string;
  instructor: string;
  year: string;
  heroImage: string;
  images: string[];
  videos?: string[];
};

export const projects: RenderProject[] = [
  {
    slug: "cinema",
    title: "CINEMA 4D",
    instructor: "Jeff Behm",
    year: "2024",
    heroImage: "/renderings/Cinema/Cinema1.png",
    images: ["/renderings/Cinema/Cinema1.png"],
  },
  {
    slug: "twin",
    title: "TWIN MOTION",
    instructor: "Ellen King",
    year: "2025",
    heroImage: "/renderings/Twin/Twin1.jpg",
    images: [
      "/renderings/Twin/Twin1.jpg",
      "/renderings/Twin/Twin2.jpg",
      "/renderings/Twin/Twin3.jpg",
      "/renderings/Twin/Twin4.jpg",
      "/renderings/Twin/Twin5.jpg",
      "/renderings/Twin/Twin6.jpg",
      "/renderings/Twin/Twin7.jpg",
      "/renderings/Twin/Twin8.jpg",
      "/renderings/Twin/Twin9.jpg",
      "/renderings/Twin/Twin10.jpg",
    ],
    videos: [
      "https://zqp0elledhhfswkn.public.blob.vercel-storage.com/Twin11.MP4",
    ],
  },
];
