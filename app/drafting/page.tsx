"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { drafts, type Draft } from "@/data/drafts";

export default function DraftingPage() {
  const [hoveredDraft, setHoveredDraft] = useState<Draft | null>(null);

  return (
    <div className="bg-black min-h-screen pt-24 md:pt-28 px-4 md:px-10 pb-6 text-cream flex flex-col items-center">
      {/* Title strip - right above images */}
      <div className="pointer-events-none hidden md:flex justify-center w-full mb-6 h-[50px] mt-8">
        <div className="text-center max-w-2xl flex flex-col justify-center">
          {hoveredDraft && (
            <h2 className="text-lg md:text-xl font-bold">
              {hoveredDraft.name}
            </h2>
          )}
        </div>
      </div>

      <div className="columns-2 md:columns-3 gap-2" style={{ maxWidth: "min(1100px, calc((100vh - 240px) * 1.6))" }}>
        {drafts.map((draft, index) => (
          <Link
            key={draft.slug}
            href={`/drafting/${draft.slug}`}
            className="group block relative overflow-hidden mb-2 break-inside-avoid"
            style={{
              opacity: 0,
              animation: `fadeIn 0.6s ease-out ${index * 80}ms forwards`,
            }}
            onMouseEnter={() => setHoveredDraft(draft)}
            onMouseLeave={() => setHoveredDraft(null)}
          >
            <Image
              src={draft.preview}
              alt={draft.name}
              width={1200}
              height={800}
              className="w-full h-auto block transition-transform duration-250 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/35 transition-all duration-500 group-hover:bg-black/10" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: "inset 0 0 0 1px rgba(232,220,196,0.3)" }}
            />
            {/* Mobile-only title */}
            <div className="md:hidden absolute inset-x-0 bottom-0 p-2 pt-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-[10px] font-semibold tracking-wide text-cream">
                {draft.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
