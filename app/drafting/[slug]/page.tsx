"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import Link from "next/link";

type Draft = {
    slug: string;
    number: number;
    name: string;
    pdf: string;
};

const drafts: Draft[] = [
    { 
        slug: "1", 
        number: 1, 
        name: "Groundplan", 
        pdf: "/drafting/1_Emma_Groundplan_24x36_260130_Final_EFM.pdf"
    },
    { 
        slug: "2", 
        number: 2, 
        name: "Electric Groundplan", 
        pdf: "/drafting/2_Emma_ElectricGroundplan_24x36_260130_Final_EFM.pdf"
    },
    { 
        slug: "3", 
        number: 3, 
        name: "FOH Groundplan", 
        pdf: "/drafting/3_Emma_FOHGroundplan_24x36_260130_Final_EFM.pdf"
    },
    { 
        slug: "4", 
        number: 4, 
        name: "Deck Groundplan", 
        pdf: "/drafting/4_Emma_DeckGroundplan_24x36_260130_Final_EFM.pdf"
    },
    { 
        slug: "5", 
        number: 5, 
        name: "Added Positions", 
        pdf: "/drafting/5_Emma_AddedPositions_24x36_260130_Final_EFM.pdf"
    },
    { 
        slug: "6", 
        number: 6, 
        name: "Set Electrics", 
        pdf: "/drafting/6_Emma_SetElectrics_24x36_260130_Final_EFM.pdf"
    },
    { 
        slug: "7", 
        number: 7, 
        name: "Set Electrics (Alt)", 
        pdf: "/drafting/7_Emma_SetElectrics_24x36_260130_Final_EFM.pdf"
    },
    { 
        slug: "8", 
        number: 8, 
        name: "SR Section", 
        pdf: "/drafting/8_Emma_SRSection_24x36_260130_Final_EFM.pdf"
    },
    { 
        slug: "9", 
        number: 9, 
        name: "SR Section Detailed", 
        pdf: "/drafting/9_Emma_SRSectionDetailed_24x36_260130_Final_EFM.pdf"
    },
];

export default function DraftDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const router = useRouter();
    const { slug } = use(params);
    
    const currentIndex = drafts.findIndex((d) => d.slug === slug);
    const draft = drafts[currentIndex];

    if (!draft) {
        return null;
    }

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center py-16 md:py-20 px-2 md:px-3" style={{ color: "#E8DCC4" }}>
            <div className="w-full max-w-xl md:max-w-3xl mx-auto">
                {/* Header - Title centered only */}
                <div className="text-center mb-6">
                    <h1 className="text-base md:text-2xl font-bold" style={{ color: "#E8DCC4" }}>
                        {draft.name}
                    </h1>
                </div>

                {/* PDF Viewer - Fit to width to eliminate grey bars */}
                <div className="bg-black rounded overflow-hidden mb-6">
                    <iframe
                        src={`${draft.pdf}#view=FitH&toolbar=1&navpanes=0`}
                        className="w-full h-[40vh] md:h-[55vh]"
                        title={`${draft.name} - EMMA: NO ONE BUT HERSELF`}
                    />
                </div>

                {/* Navigation - All three on same level with absolute positioning */}
                <div className="relative flex justify-center items-center">
                    {/* Previous on left */}
                    {currentIndex > 0 ? (
                        <Link
                            href={`/drafting/${drafts[currentIndex - 1].slug}`}
                            className="absolute left-0 hover:opacity-70 transition-opacity text-sm md:text-base font-semibold"
                            style={{ color: "#E8DCC4" }}
                        >
                            ← Previous
                        </Link>
                    ) : null}

                    {/* Download centered */}
                    <a
                        href={draft.pdf}
                        download
                        className="hover:opacity-70 transition-opacity text-sm md:text-base font-semibold"
                        style={{ color: "#E8DCC4" }}
                    >
                        Download PDF
                    </a>

                    {/* Next on right */}
                    {currentIndex < drafts.length - 1 ? (
                        <Link
                            href={`/drafting/${drafts[currentIndex + 1].slug}`}
                            className="absolute right-0 hover:opacity-70 transition-opacity text-sm md:text-base font-semibold"
                            style={{ color: "#E8DCC4" }}
                        >
                            Next →
                        </Link>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
