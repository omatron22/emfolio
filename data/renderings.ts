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
    slug: "depence",
    title: "DEPENCE R4",
    instructor: "Emma: No One But Herself",
    year: "2026",
    heroImage: "/renderings/emma/emma1.jpg",
    images: [
      "/renderings/emma/emma1.jpg",
      "/renderings/emma/emma2.jpg",
      "/renderings/emma/emma3.jpg",
      "/renderings/emma/emma4.jpg",
      "/renderings/emma/emma5.jpg",
      "/renderings/emma/emma6.jpg",
      "/renderings/emma/emma7.jpg",
      "/renderings/emma/emma8.jpg",
    ],
  },
  {
    slug: "cinema",
    title: "CINEMA 4D",
    instructor: "Jeff Behm",
    year: "2024",
    heroImage: "/renderings/Cinema/Cinema1.jpg",
    images: ["/renderings/Cinema/Cinema1.jpg"],
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
      "/renderings/twin.mp4",
    ],
  },
];
