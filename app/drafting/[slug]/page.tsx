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
        <div className="bg-black min-h-screen pt-28 px-3 pb-4" style={{ color: "#E8DCC4" }}>
            <div className="max-w-7xl mx-auto">
                {/* Header - Title centered only */}
                <div className="text-center mb-2">
                    <h1 className="text-xl font-bold" style={{ color: "#E8DCC4" }}>
                        {draft.name}
                    </h1>
                </div>

                {/* PDF Viewer - Fit to page view, taller */}
                <div className="bg-neutral-900 rounded-lg overflow-hidden mb-2">
                    <iframe
                        src={`${draft.pdf}#view=FitV&toolbar=1&navpanes=0`}
                        className="w-full h-[calc(100vh-180px)]"
                        title={`${draft.name} - EMMA: NO ONE BUT HERSELF`}
                    />
                </div>

                {/* Navigation - All on same level, no cards */}
                <div className="flex justify-between items-center gap-4">
                    {currentIndex > 0 ? (
                        <Link
                            href={`/drafting/${drafts[currentIndex - 1].slug}`}
                            className="hover:opacity-70 transition-opacity text-sm font-semibold"
                            style={{ color: "#E8DCC4" }}
                        >
                            ← Previous
                        </Link>
                    ) : (
                        <div className="w-[90px]"></div>
                    )}

                    <a
                        href={draft.pdf}
                        download
                        className="hover:opacity-70 transition-opacity text-sm font-semibold"
                        style={{ color: "#E8DCC4" }}
                    >
                        Download PDF
                    </a>

                    {currentIndex < drafts.length - 1 ? (
                        <Link
                            href={`/drafting/${drafts[currentIndex + 1].slug}`}
                            className="hover:opacity-70 transition-opacity text-sm font-semibold"
                            style={{ color: "#E8DCC4" }}
                        >
                            Next →
                        </Link>
                    ) : (
                        <div className="w-[90px]"></div>
                    )}
                </div>
            </div>
        </div>
    );
}
