"use client";

import { useRef, useCallback } from "react";

const samples = [
  { category: "Clicks (hover / button)", sounds: [
    { name: "Tiny Tap", file: "click-tiny-tap.wav" },
    { name: "Soft Pop", file: "click-soft-pop.wav" },
    { name: "Crisp Snap", file: "click-crisp-snap.wav" },
    { name: "Wooden Tick", file: "click-wooden-tick.wav" },
    { name: "Typewriter Key", file: "click-typewriter.wav" },
    { name: "Tongue Click", file: "click-tongue.wav" },
    { name: "Bubble Pop", file: "click-bubble-pop.wav" },
    { name: "Light Switch", file: "click-light-switch.wav" },
    { name: "Pen Click", file: "click-pen.wav" },
    { name: "Marble Drop", file: "click-marble.wav" },
  ]},
  { category: "Transitions (navigate / zoom)", sounds: [
    { name: "Page Turn", file: "trans-page-turn.wav" },
    { name: "Soft Whoosh", file: "trans-soft-whoosh.wav" },
    { name: "Quick Swipe", file: "trans-quick-swipe.wav" },
    { name: "Card Flick", file: "trans-card-flick.wav" },
    { name: "Paper Slide", file: "trans-paper-slide.wav" },
    { name: "Drawer", file: "trans-drawer.wav" },
  ]},
  { category: "Special (logo / open / close)", sounds: [
    { name: "Wooden Knock", file: "special-knock.wav" },
    { name: "Double Tap", file: "special-double-tap.wav" },
    { name: "Thock (mech kb)", file: "special-thock.wav" },
    { name: "Chirp", file: "special-chirp.wav" },
    { name: "Pluck", file: "special-pluck.wav" },
    { name: "Cork Pop", file: "special-cork-pop.wav" },
    { name: "Snap", file: "special-snap.wav" },
    { name: "Boing", file: "special-boing.wav" },
  ]},
];

export default function SoundPage() {
  const ctxRef = useRef<AudioContext | null>(null);
  const cacheRef = useRef<Record<string, AudioBuffer>>({});

  const playSound = useCallback(async (file: string) => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") await ctx.resume();

    if (!cacheRef.current[file]) {
      const res = await fetch(`/sounds/samples/${file}`);
      const buf = await res.arrayBuffer();
      cacheRef.current[file] = await ctx.decodeAudioData(buf);
    }

    const source = ctx.createBufferSource();
    source.buffer = cacheRef.current[file];
    source.connect(ctx.destination);
    source.start(0);
  }, []);

  return (
    <div style={{ background: "black", minHeight: "100vh", padding: "100px 24px 40px", color: "#E8DCC4" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: 8 }}>Sound Board</h1>
        <p style={{ color: "#c4b89a", fontSize: "0.85rem", marginBottom: 32 }}>
          Click any sound to preview. Pick your favorites for hover, click, navigate, zoom, logo, and open/close.
        </p>

        {samples.map((cat) => (
          <div key={cat.category} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: 12, color: "#D4A853", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {cat.category}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
              {cat.sounds.map((s) => (
                <button
                  key={s.file}
                  onClick={() => playSound(s.file)}
                  style={{
                    background: "rgba(232,220,196,0.05)",
                    border: "1px solid rgba(232,220,196,0.15)",
                    borderRadius: 6,
                    padding: "12px 8px",
                    color: "#E8DCC4",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(232,220,196,0.12)";
                    e.currentTarget.style.borderColor = "rgba(232,220,196,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(232,220,196,0.05)";
                    e.currentTarget.style.borderColor = "rgba(232,220,196,0.15)";
                  }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
