"use client";

import { useSounds } from "@/components/SoundProvider";

export function SoundToggle() {
  const { enabled, toggle } = useSounds();

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 left-4 z-50 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200"
      style={{
        background: enabled ? "rgba(232,220,196,0.1)" : "rgba(255,255,255,0.05)",
        border: "1px solid rgba(232,220,196,0.15)",
        color: enabled ? "#E8DCC4" : "rgba(232,220,196,0.3)",
        fontSize: "0.7rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
      title={enabled ? "Mute sounds" : "Enable sounds"}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      {enabled ? "Sound on" : "Sound off"}
    </button>
  );
}
