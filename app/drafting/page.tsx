import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { drafts } from "@/data/drafts";

export const metadata: Metadata = {
  title: "Drafting",
  description:
    "Technical drafting portfolio for EMMA: NO ONE BUT HERSELF by lighting designer Em Moore.",
};

export default function DraftingPage() {
  return (
    <div className="bg-black min-h-screen pt-28 md:pt-36 px-6 pb-16 text-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            EMMA: NO ONE BUT HERSELF
          </h1>
          <p className="text-sm md:text-base text-cream-muted tracking-[0.2em] uppercase">
            Technical Drawings
          </p>
        </div>

        {/* Unified grid - 3 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
          {drafts.map((draft, index) => (
            <Link
              key={draft.slug}
              href={`/drafting/${draft.slug}`}
              className="group block"
              style={{
                opacity: 0,
                animation: `fadeIn 0.6s ease-out ${index * 80}ms forwards`,
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950 border border-neutral-800/50 transition-all duration-300 group-hover:border-cream/20">
                <Image
                  src={draft.preview}
                  alt={draft.name}
                  fill
                  className="object-cover transition-all duration-300 group-hover:opacity-80 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Subtle gradient at bottom for readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-center mt-3">
                <h3 className="text-[11px] md:text-sm font-semibold tracking-wide text-cream-muted group-hover:text-cream transition-colors duration-300">
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
