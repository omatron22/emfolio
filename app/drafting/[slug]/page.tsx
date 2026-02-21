"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { drafts } from "@/data/drafts";

export default function DraftDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const currentIndex = drafts.findIndex((d) => d.slug === slug);
  const draft = drafts[currentIndex];

  if (!draft) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-cream">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Drawing Not Found</h1>
          <Link
            href="/drafting"
            className="text-cream-muted hover:opacity-70 transition-opacity underline"
          >
            Back to Drafting
          </Link>
        </div>
      </div>
    );
  }

  const prevDraft = currentIndex > 0 ? drafts[currentIndex - 1] : null;
  const nextDraft = currentIndex < drafts.length - 1 ? drafts[currentIndex + 1] : null;

  return (
    <div className="bg-black min-h-screen flex flex-col text-cream">
      {/* Top bar: back link + title */}
      <div className="pt-28 md:pt-32 px-4 md:px-8 pb-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/drafting"
            className="inline-block text-sm font-semibold uppercase tracking-[0.2em] transition-opacity opacity-60 hover:opacity-100 mb-4"
          >
            &larr; All Drawings
          </Link>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{draft.name}</h1>
            <p className="text-xs md:text-sm text-cream-muted tracking-wider">
              EMMA: NO ONE BUT HERSELF &bull; Drawing {draft.number} of {drafts.length}
            </p>
          </div>
        </div>
      </div>

      {/* PDF Viewer - much larger */}
      <div className="flex-1 px-2 md:px-8 pb-4">
        <div className="max-w-6xl mx-auto h-full">
          <div className="bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800/50">
            <iframe
              src={`${draft.pdf}#view=FitH&toolbar=1&navpanes=0`}
              className="w-full h-[55vh] md:h-[65vh]"
              title={`${draft.name} - EMMA: NO ONE BUT HERSELF`}
            />
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="px-4 md:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Previous */}
            <div className="w-1/3">
              {prevDraft ? (
                <Link
                  href={`/drafting/${prevDraft.slug}`}
                  className="group inline-flex items-center gap-2 transition-opacity opacity-60 hover:opacity-100"
                >
                  <span className="text-sm md:text-base font-semibold">&larr;</span>
                  <span className="hidden md:inline text-sm text-cream-muted group-hover:text-cream transition-colors">
                    {prevDraft.name}
                  </span>
                  <span className="md:hidden text-sm">Prev</span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Download */}
            <div className="w-1/3 text-center">
              <a
                href={draft.pdf}
                download
                className="inline-flex items-center gap-2 text-sm md:text-base font-semibold transition-opacity opacity-70 hover:opacity-100"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2v9M4 8l4 4 4-4M2 14h12" />
                </svg>
                Download PDF
              </a>
            </div>

            {/* Next */}
            <div className="w-1/3 text-right">
              {nextDraft ? (
                <Link
                  href={`/drafting/${nextDraft.slug}`}
                  className="group inline-flex items-center gap-2 transition-opacity opacity-60 hover:opacity-100"
                >
                  <span className="hidden md:inline text-sm text-cream-muted group-hover:text-cream transition-colors">
                    {nextDraft.name}
                  </span>
                  <span className="md:hidden text-sm">Next</span>
                  <span className="text-sm md:text-base font-semibold">&rarr;</span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-6 flex gap-2 justify-center overflow-x-auto pb-2">
            {drafts.map((d, i) => (
              <Link
                key={d.slug}
                href={`/drafting/${d.slug}`}
                className={`flex-shrink-0 relative w-16 h-12 md:w-20 md:h-14 overflow-hidden border transition-all duration-200 ${
                  i === currentIndex
                    ? "border-cream/60 opacity-100"
                    : "border-neutral-800/50 opacity-40 hover:opacity-70"
                }`}
              >
                <Image
                  src={d.preview}
                  alt={d.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
