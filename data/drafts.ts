export type Draft = {
  slug: string;
  number: number;
  name: string;
  preview: string;
  pdf: string;
  show?: string;
  venue?: string;
};

const EMMA_SHOW = "Emma: No One But Herself";
const EMMA_VENUE = "Ralph Freud Playhouse";

export const drafts: Draft[] = [
  {
    slug: "1",
    number: 1,
    name: "Groundplan",
    preview: "/drafting/1.jpg",
    pdf: "/drafting/1_Emma_Groundplan_24x36_260130_Final_EFM.pdf",
    show: EMMA_SHOW,
    venue: EMMA_VENUE,
  },
  {
    slug: "2",
    number: 2,
    name: "Electric Groundplan",
    preview: "/drafting/2.jpg",
    pdf: "/drafting/2_Emma_ElectricGroundplan_24x36_260130_Final_EFM.pdf",
    show: EMMA_SHOW,
    venue: EMMA_VENUE,
  },
  {
    slug: "3",
    number: 3,
    name: "FOH Groundplan",
    preview: "/drafting/3.jpg",
    pdf: "/drafting/3_Emma_FOHGroundplan_24x36_260130_Final_EFM.pdf",
    show: EMMA_SHOW,
    venue: EMMA_VENUE,
  },
  {
    slug: "4",
    number: 4,
    name: "Deck Groundplan",
    preview: "/drafting/4.jpg",
    pdf: "/drafting/4_Emma_DeckGroundplan_24x36_260130_Final_EFM.pdf",
    show: EMMA_SHOW,
    venue: EMMA_VENUE,
  },
  {
    slug: "5",
    number: 5,
    name: "Added Positions",
    preview: "/drafting/5.jpg",
    pdf: "/drafting/5_Emma_AddedPositions_24x36_260130_Final_EFM.pdf",
    show: EMMA_SHOW,
    venue: EMMA_VENUE,
  },
  {
    slug: "6",
    number: 6,
    name: "Set Electrics",
    preview: "/drafting/6.jpg",
    pdf: "/drafting/6_Emma_SetElectrics_24x36_260130_Final_EFM.pdf",
    show: EMMA_SHOW,
    venue: EMMA_VENUE,
  },
  {
    slug: "7",
    number: 7,
    name: "Set Electrics (Alt)",
    preview: "/drafting/7.jpg",
    pdf: "/drafting/7_Emma_SetElectrics_24x36_260130_Final_EFM.pdf",
    show: EMMA_SHOW,
    venue: EMMA_VENUE,
  },
  {
    slug: "8",
    number: 8,
    name: "SR Section",
    preview: "/drafting/8.jpg",
    pdf: "/drafting/8_Emma_SRSection_24x36_260130_Final_EFM.pdf",
    show: EMMA_SHOW,
    venue: EMMA_VENUE,
  },
  {
    slug: "9",
    number: 9,
    name: "SR Section Detailed",
    preview: "/drafting/9.jpg",
    pdf: "/drafting/9_Emma_SRSectionDetailed_24x36_260130_Final_EFM.pdf",
    show: EMMA_SHOW,
    venue: EMMA_VENUE,
  },
  {
    slug: "emma-final",
    number: 10,
    name: "Light Plot (Final)",
    preview: "/drafting/emma-final.jpg",
    pdf: "/drafting/EMMA_LXPlot_24x36_260316_FINALV3_EFM.pdf",
    show: EMMA_SHOW,
    venue: EMMA_VENUE,
  },
  {
    slug: "courage-light-plot",
    number: 11,
    name: "Light Plot",
    preview: "/drafting/courage-light-plot.jpg",
    pdf: "/drafting/HEMSLEY_LX_COURAGE_v2026_PRINT.pdf",
    show: "The Courage to Right a Woman's Wrongs",
    venue: "1340 Blackbox Theater, UCLA",
  },
];
