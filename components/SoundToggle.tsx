"use client";

import { useSounds } from "@/components/SoundProvider";

export function SoundToggle() {
  const { enabled, toggle } = useSounds();

  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 left-5 z-50 hidden md:block transition-opacity duration-200 hover:opacity-70"
      style={{
        color: "#E8DCC4",
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
      title={enabled ? "Mute sounds" : "Enable sounds"}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {enabled ? (
          <>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </>
        ) : (
          <>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        )}
      </svg>
    </button>
  );
}
