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
          {/* Left column: text with right-floated left half of image */}
          <div className="about-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/em-left.png"
              alt=""
              className="shape-img shape-left"
            />
            <p>
              <strong className="text-cream">Em Moore</strong> (they/them) is a queer, nonbinary lighting designer based in Los Angeles
              and originally from the San Francisco Bay Area. They are currently completing their
              MFA in Lighting Design for Theatre and Live Events at UCLA. Em began designing
              lighting in high school, shaped by early and sustained exposure to theatre, music,
              dance, and visual art across the Bay Area and Los Angeles.
            </p>
            <p>
              Em&apos;s work spans theatre, opera, dance, and live music, with a particular interest
              in how light shapes movement, time, and perception. They approach lighting as a
              system of ideas rather than a collection of tools, using structure, rhythm, and
              visual logic to support performance, clarify intention, and guide the audience&apos;s
              point of view.
            </p>
            <p>
              Alongside their design practice, Em has served as a Teaching Assistant in UCLA&apos;s
              lighting program for three years, supporting undergraduate instruction and studio
              work. Teaching has sharpened their interest in how lighting ideas are communicated,
              translated, and sustained across different levels of experience and across
              disciplines.
            </p>
          </div>

          {/* Right column: text with left-floated right half of image */}
          <div className="about-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/em-right.png"
              alt=""
              className="shape-img shape-right"
            />
            <p>
              After participating in the ACT grandMA3 programming competition, Em
              built a dedicated previsualization studio at UCLA using Depence software,
              integrating it into both EOS-based theatrical workflows and emerging MA-based
              concert workflows.
            </p>
            <p>
              Em has worked across a wide range of venues throughout Los Angeles, including
              academic and regional theatres, performance spaces, and live music environments.
              This breadth of experience has reinforced their interest in collaborative,
              process-driven work and in adapting lighting systems to the specific demands of
              each space.
            </p>
            <p>
              At the core of Em&apos;s practice is a belief that lighting functions best as a
              conversation, responsive to music, movement, architecture, and the people
              inhabiting the space. They are drawn to environments where observation, care, and
              long-term thinking shape the work, and where lighting serves not as singular
              authorship, but as an integral part of a larger artistic system.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="about-footer">
          <div className="about-education">
            <h2>M.F.A in Lighting Design for Theatre and Live Events</h2>
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
            overflow: hidden;
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

        /* Two-column grid - image halves meet in the middle */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin: 0 -1px;
        }

        .about-col {
          text-align: left;
        }

        .about-col p {
          font-size: 0.88rem;
          line-height: 1.8;
          color: #c4b89a;
          margin: 0 0 12px 0;
        }

        /* Left half floats RIGHT so text wraps on the left */
        .shape-left {
          float: right;
          width: 24%;
          height: auto;
          margin-top: 60px;
          margin-right: -2px;
          shape-outside: url('/about/em-left.png');
          shape-margin: 20px;
          shape-image-threshold: 0.01;
        }

        /* Right half floats LEFT so text wraps on the right */
        .shape-right {
          float: left;
          width: 24%;
          height: auto;
          margin-top: 60px;
          margin-left: -2px;
          shape-outside: url('/about/em-right.png');
          shape-margin: 20px;
          shape-image-threshold: 0.01;
        }

        .shape-img {
          display: block;
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
            grid-template-columns: 1fr;
            gap: 0;
          }

          .shape-left,
          .shape-right {
            display: none;
          }

          .about-col {
            text-align: left;
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
