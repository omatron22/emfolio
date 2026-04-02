"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

type SoundName = "hover" | "click" | "navigate" | "open" | "close" | "zoom";

interface SoundContextType {
  play: (name: SoundName) => void;
  enabled: boolean;
  toggle: () => void;
}

const SoundContext = createContext<SoundContextType>({
  play: () => {},
  enabled: false,
  toggle: () => {},
});

export function useSounds() {
  return useContext(SoundContext);
}

const SOUND_FILES: Record<SoundName, string> = {
  hover: "/sounds/hover.wav",
  click: "/sounds/click.wav",
  navigate: "/sounds/navigate.wav",
  open: "/sounds/open.wav",
  close: "/sounds/close.wav",
  zoom: "/sounds/zoom.wav",
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audioCache = useRef<Record<string, AudioBuffer>>({});
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Lazy init AudioContext (must be after user interaction)
  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Preload all sounds
  useEffect(() => {
    if (!enabled) return;
    const ctx = getCtx();
    Object.entries(SOUND_FILES).forEach(async ([name, url]) => {
      if (audioCache.current[name]) return;
      try {
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        audioCache.current[name] = await ctx.decodeAudioData(buf);
      } catch {
        // silently fail
      }
    });
  }, [enabled, getCtx]);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      const ctx = getCtx();
      const buffer = audioCache.current[name];
      if (!buffer) return;
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.value = 0.6;
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(0);
    },
    [enabled, getCtx]
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      if (!prev) {
        // First enable — init AudioContext with user gesture
        getCtx();
      }
      return !prev;
    });
  }, [getCtx]);

  return (
    <SoundContext.Provider value={{ play, enabled, toggle }}>
      {children}
    </SoundContext.Provider>
  );
}
