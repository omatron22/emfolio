"use client";

import { useEffect, useRef, useState } from "react";

type MouthShape = "smile" | "open" | "kiss" | "squirm";

// SVG mouth shapes - all drawn at a consistent scale
function MouthSVG({ shape }: { shape: MouthShape }) {
  switch (shape) {
    case "smile":
      return null; // We use the original ")" character for this
    case "open":
      return (
        <svg width="0.35em" height="0.35em" viewBox="0 0 18 18" fill="none">
          <ellipse
            cx="9"
            cy="9"
            rx="6.5"
            ry="7"
            stroke="#E8DCC4"
            strokeWidth="2.8"
            fill="none"
          />
        </svg>
      );
    case "kiss":
      return (
        <svg width="0.3em" height="0.4em" viewBox="0 0 16 22" fill="none">
          <path
            d="M4 2 C12 2, 14 6, 8 11 C14 16, 12 20, 4 20"
            stroke="#E8DCC4"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "squirm":
      return (
        <svg width="0.65em" height="0.45em" viewBox="0 0 36 20" fill="none">
          <path
            d="M2 10 C7 2, 12 18, 18 10 C24 2, 29 18, 34 10"
            stroke="#E8DCC4"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
  }
}

export function LogoEyes() {
  const ooRef = useRef<HTMLSpanElement>(null);
  const [mouth, setMouth] = useState<MouthShape>("smile");
  const [visible, setVisible] = useState(true);
  const pendingMouth = useRef<MouthShape>("smile");

  // Smooth mouth transition: fade out -> swap -> fade in
  const changeMouth = (newMouth: MouthShape) => {
    if (newMouth === pendingMouth.current) return;
    pendingMouth.current = newMouth;
    setVisible(false);
    setTimeout(() => {
      setMouth(newMouth);
      setVisible(true);
    }, 150);
  };

  const squirmTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSquirm = () => {
    changeMouth("squirm");
    // Shake the eyes
    const el = ooRef.current;
    if (el) {
      el.style.transition = "none";
      el.style.animation = "logoShake 0.4s ease-in-out 2";
      el.addEventListener("animationend", () => {
        el.style.animation = "";
      }, { once: true });
    }
    if (squirmTimeout.current) clearTimeout(squirmTimeout.current);
    squirmTimeout.current = setTimeout(() => {
      changeMouth("smile");
    }, 1200);
  };

  useEffect(() => {
    const handleNavHover = () => changeMouth("open");
    const handleNavLeave = () => changeMouth("smile");
    const handleLogoHover = () => changeMouth("kiss");
    const handleLogoLeave = () => changeMouth("smile");
    const handleLogoClick = () => doSquirm();

    window.addEventListener("nav-hover", handleNavHover);
    window.addEventListener("nav-leave", handleNavLeave);
    window.addEventListener("logo-hover", handleLogoHover);
    window.addEventListener("logo-leave", handleLogoLeave);
    window.addEventListener("logo-click", handleLogoClick);

    return () => {
      window.removeEventListener("nav-hover", handleNavHover);
      window.removeEventListener("nav-leave", handleNavLeave);
      window.removeEventListener("logo-hover", handleLogoHover);
      window.removeEventListener("logo-leave", handleLogoLeave);
      window.removeEventListener("logo-click", handleLogoClick);
    };
  }, []);

  // Random blinking
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      timeout = setTimeout(() => {
        const el = ooRef.current;
        if (el) {
          el.style.transition = "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)";
          el.style.transform = "scaleY(0.2)";
          setTimeout(() => {
            if (el) {
              el.style.transform = "scaleY(1)";
              setTimeout(() => {
                if (el) el.style.transition = "";
              }, 300);
            }
          }, 200);
        }
        scheduleBlink();
      }, 5000 + Math.random() * 5000);
    };
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="inline-block relative">
      <span
        ref={ooRef}
        className="inline-block"
        style={{ transformOrigin: "center 55%" }}
      >
        oo
      </span>
      {/* Original ")" smile - shown by default */}
      <span
        className="absolute left-1/2"
        style={{
          top: "1.7em",
          fontSize: "0.6em",
          transform: "translateX(-75%) rotate(90deg)",
          opacity: mouth === "smile" && visible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
        aria-hidden="true"
      >
        )
      </span>
      {/* SVG mouths for other expressions */}
      <span
        className="absolute left-1/2 flex items-center justify-center"
        style={{
          top: "0.95em",
          transform: "translateX(-55%)",
          opacity: mouth !== "smile" && visible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
        aria-hidden="true"
      >
        <MouthSVG shape={mouth} />
      </span>
    </span>
  );
}
