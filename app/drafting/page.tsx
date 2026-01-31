"use client";

import Link from "next/link";
import Image from "next/image";

type Draft = {
    slug: string;
    number: number;
    name: string;
    preview: string;
};

const drafts: Draft[] = [
    { slug: "1", number: 1, name: "Groundplan", preview: "/drafting/1.png" },
    { slug: "2", number: 2, name: "Electric Groundplan", preview: "/drafting/2.png" },
    { slug: "3", number: 3, name: "FOH Groundplan", preview: "/drafting/3.png" },
    { slug: "4", number: 4, name: "Deck Groundplan", preview: "/drafting/4.png" },
    { slug: "5", number: 5, name: "Added Positions", preview: "/drafting/5.png" },
    { slug: "6", number: 6, name: "Set Electrics", preview: "/drafting/6.png" },
    { slug: "7", number: 7, name: "Set Electrics (Alt)", preview: "/drafting/7.png" },
    { slug: "8", number: 8, name: "SR Section", preview: "/drafting/8.png" },
    { slug: "9", number: 9, name: "SR Section Detailed", preview: "/drafting/9.png" },
];

export default function DraftingPage() {
    return (
        <div className="bg-black min-h-screen pt-32 px-6 pb-16" style={{ color: "#E8DCC4" }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold" style={{ color: "#E8DCC4" }}>
                        EMMA: NO ONE BUT HERSELF
                    </h1>
                </div>

                {/* Top Row - 4 items centered using grid column span */}
                <div className="mb-12">
                    <div className="grid grid-cols-10 gap-12">
                        <div className="col-span-1"></div>
                        {drafts.slice(0, 4).map((draft) => (
                            <Link
                                key={draft.slug}
                                href={`/drafting/${draft.slug}`}
                                className="group col-span-2"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden mb-3">
                                    <Image
                                        src={draft.preview}
                                        alt={draft.name}
                                        fill
                                        className="object-cover group-hover:opacity-70 transition-opacity duration-300"
                                        sizes="20vw"
                                    />
                                </div>
                                
                                {/* Title below */}
                                <div className="text-center">
                                    <h3 className="text-xs font-bold" style={{ color: "#E8DCC4" }}>
                                        {draft.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                        <div className="col-span-1"></div>
                    </div>
                </div>

                {/* Bottom Row - 5 items */}
                <div className="grid grid-cols-10 gap-12">
                    {drafts.slice(4, 9).map((draft) => (
                        <Link
                            key={draft.slug}
                            href={`/drafting/${draft.slug}`}
                            className="group col-span-2"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden mb-3">
                                <Image
                                    src={draft.preview}
                                    alt={draft.name}
                                    fill
                                    className="object-cover group-hover:opacity-70 transition-opacity duration-300"
                                    sizes="20vw"
                                />
                            </div>
                            
                            {/* Title below */}
                            <div className="text-center">
                                <h3 className="text-xs font-bold" style={{ color: "#E8DCC4" }}>
                                    {draft.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
