export type RenderProject = {
  slug: string;
  title: string;
  instructor: string;
  year: string;
  heroImage: string;
  images: string[];
  videos?: string[];
  // "presentation" renders the images as a single ordered vertical scroll
  // (cover hero -> details -> stacked full-width pages), no carousel/masonry.
  layout?: "gallery" | "presentation";
};

export const projects: RenderProject[] = [
  {
    slug: "depence",
    title: "DEPENCE",
    instructor: "Six the Musical, UCLA Thesis Project",
    year: "2026",
    layout: "presentation",
    heroImage: "/renderings/six/cover.png",
    images: [
      "/renderings/six/page-01.jpg",
      "/renderings/six/page-02.jpg",
      "/renderings/six/page-03.jpg",
      "/renderings/six/page-04.jpg",
      "/renderings/six/page-05.jpg",
      "/renderings/six/page-06.jpg",
      "/renderings/six/page-07.jpg",
      "/renderings/six/page-08.jpg",
      "/renderings/six/page-09.jpg",
      "/renderings/six/page-10.jpg",
      "/renderings/six/page-11.jpg",
      "/renderings/six/page-12.jpg",
      "/renderings/six/page-13.jpg",
      "/renderings/six/page-14.jpg",
      "/renderings/six/page-15.jpg",
      "/renderings/six/page-16.jpg",
      "/renderings/six/page-17.jpg",
      "/renderings/six/page-18.jpg",
      "/renderings/six/page-19.jpg",
      "/renderings/six/page-20.jpg",
      "/renderings/six/page-21.jpg",
      "/renderings/six/page-22.jpg",
      "/renderings/six/page-23.jpg",
      "/renderings/six/page-24.jpg",
      "/renderings/six/page-25.jpg",
      "/renderings/six/page-26.jpg",
      "/renderings/six/page-27.jpg",
      "/renderings/six/page-28.jpg",
      "/renderings/six/page-29.jpg",
      "/renderings/six/page-30.jpg",
      "/renderings/six/page-31.jpg",
      "/renderings/six/page-32.jpg",
      "/renderings/six/page-33.jpg",
      "/renderings/six/page-34.jpg",
      "/renderings/six/page-35.jpg",
      "/renderings/six/page-36.jpg",
      "/renderings/six/page-37.jpg",
      // Emma: No One But Herself renders, moved to the bottom
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
