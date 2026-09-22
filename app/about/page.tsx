"use client";

import { useEffect, useRef, useCallback } from "react";

export default function AboutPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  const updateScale = useCallback(() => {
    const el = contentRef.current;
    if (!el || window.innerWidth < 768) {
      if (el) {
        el.style.transform = "none";
        el.style.visibility = "visible";
      }
      return;
    }
    // Content is 1150px wide, scale down if viewport is smaller
    const scale = Math.min(1, window.innerWidth / 1250);
    el.style.transform = `scale(${scale})`;
    el.style.visibility = "visible";
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  return (
    <div className="about-page-container text-cream" style={{ position: "relative" }}>
      <div className="about-content" ref={contentRef} style={{ visibility: "hidden" }}>
        {/* Mobile-only full image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about/em-v3.png"
          alt="Em Moore"
          className="about-mobile-img"
        />

        <section className="about-grid">
          {/* Desktop: full photo centered in the column gutter */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/about/em-v3.png" alt="" className="about-center-img" />
          <div className="about-text">
            <p>
              <strong className="text-cream">Em Moore</strong> (they/them) is a Los Angeles–based
              lighting designer working across live music, theater, sports, and special events.
              They earned their MFA in Lighting Design from UCLA, where they studied with Lap Chi
              Chu. Em was a finalist for the 2026 Hemsley Internship Program and runner-up in the
              2025 ACT Entertainment grandMA3 Programming Contest.
            </p>
            <p>
              Em&apos;s practice bridges creative design and technical execution. As a drafting
              studio assistant for Wasted Potential, they supported concert and touring projects
              through Vectorworks drafting and design development. Following graduation, they
              joined Gray Matter Visual in New York, contributing to the US Open at Arthur Ashe
              Stadium and other large-scale live events.
            </p>
            <p>
              Working across Vectorworks, Depence, grandMA3, and EOS, Em is particularly
              interested in the role previsualization plays in carrying an idea from concept to
              production. This interest led them to build UCLA&apos;s dedicated Depence previs
              studio and develop workflows for both theatrical and concert lighting.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="about-footer">
          <div className="about-education">
            <h2>M.F.A. in Lighting Design</h2>
            <p>University of California, Los Angeles (UCLA)</p>
          </div>
          <div className="about-contact">
            <p>
              <span className="font-semibold text-cream">Cell:</span>{" "}
              <a href="tel:415-450-5798" className="hover:opacity-70 transition-opacity">
                415-450-5798
              </a>
            </p>
            <p>
              <span className="font-semibold text-cream">Email:</span>{" "}
              <a
                href="mailto:efmoore0610@gmail.com"
                className="hover:opacity-70 transition-opacity underline"
              >
                efmoore0610@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .about-page-container {
          background-color: black;
          min-height: 100vh;
        }

        @media (min-width: 768px) {
          .about-page-container {
            position: fixed;
            inset: 0;
            overflow: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .about-content {
          width: 1150px;
          margin: 0 auto;
          padding: 120px 24px 40px 24px;
          transform-origin: center center;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .about-content {
            padding: 40px 40px;
          }
        }

        @media (min-width: 1024px) {
          .about-content {
            padding: 40px 60px;
          }
        }

        @media (max-width: 767px) {
          .about-content {
            width: 100%;
          }
        }

        /* Two text columns flowing around a photo centered in the gutter */
        .about-grid {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 420px;
        }

        .about-text {
          column-count: 2;
          column-gap: 300px;
          column-fill: balance;
        }

        .about-text p {
          font-size: 1rem;
          line-height: 1.9;
          color: #c4b89a;
          margin: 0 0 12px 0;
        }

        .about-center-img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 250px;
          height: auto;
          pointer-events: none;
        }

        /* Mobile full image - hidden on desktop */
        .about-mobile-img {
          display: none;
        }

        @media (max-width: 767px) {
          .about-mobile-img {
            display: block;
            width: 200px;
            height: auto;
            margin: 0 auto 20px auto;
          }

          .about-grid {
            display: block;
            min-height: 0;
          }

          .about-text {
            column-count: 1;
          }

          .about-center-img {
            display: none;
          }
        }

        /* Footer */
        .about-footer {
          margin-top: 24px;
          padding-top: 16px;
          border-top: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: left;
        }

        @media (min-width: 768px) {
          .about-footer {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }

        .about-education h2 {
          font-size: 0.9rem;
          font-weight: bold;
          font-style: italic;
          color: #E8DCC4;
          margin-bottom: 2px;
        }

        .about-education p {
          font-size: 0.85rem;
          color: #c4b89a;
        }

        .about-contact {
          display: flex;
          gap: 20px;
          white-space: nowrap;
        }

        .about-contact p {
          font-size: 0.85rem;
          color: #c4b89a;
        }
      `}</style>
    </div>
  );
}
