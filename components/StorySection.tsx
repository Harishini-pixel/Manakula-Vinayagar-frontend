"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Each story "chapter" overlays the scrolling canvas
const CHAPTERS = [
  {
    id: "arrival",
    headline: "Manakula\nVinayagar",
    subhead: "The remover of obstacles.",
    body: "For centuries, a beacon of faith, wisdom, and blessings in the heart of Puducherry.",
    align: "center",
    verticalAlign: "center",
  },
  {
    id: "devotion",
    headline: "A masterpiece\nof devotion.",
    subhead: null,
    body: "Every ornament tells a story. Every carving reflects generations of craftsmanship. Every offering carries centuries of faith.",
    align: "left",
    verticalAlign: "bottom",
  },
  {
    id: "traditions",
    headline: "Living\ntraditions.",
    subhead: null,
    body: "Daily rituals continue an unbroken legacy — a timeless connection between the divine and the devoted.",
    align: "right",
    verticalAlign: "center",
  },
  {
    id: "heritage",
    headline: "Centuries\nof heritage.",
    subhead: null,
    body: "A living monument of spirituality where architecture, culture, and devotion become one.",
    align: "center",
    verticalAlign: "center",
  },
  {
    id: "cta",
    headline: "Experience\nthe divine.",
    subhead: "Plan your visit to the sacred Manakula Vinayagar Temple.",
    body: null,
    align: "center",
    verticalAlign: "center",
    hasCTA: true,
  },
];

const ALIGN_CLASSES: Record<string, string> = {
  left:   "items-start text-left",
  right:  "items-end text-right",
  center: "items-center text-center",
};

const VERTICAL_CLASSES: Record<string, string> = {
  top:    "justify-start pt-40",
  center: "justify-center",
  bottom: "justify-end pb-20",
};

export default function StorySection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 768;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const sections = gsap.utils.toArray<HTMLElement>(".story-chapter");

      sections.forEach((section, idx) => {
        const headline = section.querySelectorAll(".chapter-headline");
        const body     = section.querySelectorAll(".chapter-body");

        if (idx === 0 && isDesktop && !prefersReducedMotion) {
          // First chapter — gentle load stagger, then scroll-out only
          gsap.set([headline, body], { opacity: 0, y: 20, scale: 1 });
          gsap.to([headline, body], {
            opacity: 1, y: 0, scale: 1,
            duration: 0.9, ease: "power2.out",
            stagger: 0.15, delay: 0.6,
          });

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom 30%",
            onLeave: () => {
              gsap.to([headline, body], {
                opacity: 0, y: -20, scale: 0.98,
                duration: 0.4, ease: "power2.in",
                stagger: 0.04,
              });
            },
            onEnterBack: () => {
              gsap.to([headline, body], {
                opacity: 1, y: 0, scale: 1,
                duration: 0.7, ease: "power3.out",
                stagger: 0.05,
              });
            },
            onLeaveBack: () => {
              gsap.to([headline, body], {
                opacity: 0, y: 40, scale: 0.96,
                duration: 0.35, ease: "power2.in",
                stagger: 0.04,
              });
            },
          });
        } else {
          // Existing behavior for other chapters (and all on mobile)
          gsap.set([headline, body], { opacity: 0, y: 40, scale: 0.96 });

          ScrollTrigger.create({
            trigger: section,
            start: "top 65%",
            end: "bottom 30%",
            onEnter: () => {
              gsap.to(headline, {
                opacity: 1, y: 0, scale: 1,
                duration: 1.1, ease: "power3.out",
                stagger: 0.08,
              });
              gsap.to(body, {
                opacity: 1, y: 0, scale: 1,
                duration: 0.9, ease: "power3.out",
                delay: 0.25, stagger: 0.07,
              });
            },
            onLeave: () => {
              gsap.to([headline, body], {
                opacity: 0, y: -20, scale: 0.98,
                duration: 0.4, ease: "power2.in",
                stagger: 0.04,
              });
            },
            onEnterBack: () => {
              gsap.to([headline, body], {
                opacity: 1, y: 0, scale: 1,
                duration: 0.7, ease: "power3.out",
                stagger: 0.05,
              });
            },
            onLeaveBack: () => {
              gsap.to([headline, body], {
                opacity: 0, y: 40, scale: 0.96,
                duration: 0.35, ease: "power2.in",
                stagger: 0.04,
              });
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    // This div overlays the sticky canvas section (500vh)
    // It must be 500vh tall to provide the scroll distance
    <div ref={wrapperRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
      {CHAPTERS.map((chapter, idx) => (
        <section
          key={chapter.id}
          className={`story-chapter h-[100vh] flex flex-col px-[var(--gutter)] py-8 ${ALIGN_CLASSES[chapter.align]} ${VERTICAL_CLASSES[chapter.verticalAlign]}`}
          style={{ marginTop: idx === 0 ? "0" : undefined }}
        >
          <div className={`max-w-2xl ${chapter.align === "right" ? "ml-auto" : chapter.align === "center" ? "mx-auto" : ""}`}>
            {/* Ornamental line */}
            <div className={`chapter-body mb-4 md:mb-6 flex items-center gap-3 ${chapter.align === "right" ? "flex-row-reverse" : chapter.align === "center" ? "justify-center" : ""}`}>
              <div className="h-px w-12 bg-gradient-to-r from-gold-primary to-transparent opacity-70" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-primary opacity-70">
                Sri Manakula Vinayagar
              </span>
            </div>

            {/* Headline — split into lines for stagger */}
            {chapter.headline.split("\n").map((line, i) => (
              <h2
                key={i}
                className="chapter-headline font-heading text-display-xl text-ivory leading-[0.92] tracking-tight"
                style={{
                  textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)",
                }}
              >
                {i === 1 ? (
                  <span className="text-gold-gradient">{line}</span>
                ) : line}
              </h2>
            ))}

            {/* Subhead */}
            {chapter.subhead && (
              <p className="chapter-body mt-4 font-heading italic text-2xl md:text-3xl text-gold-light opacity-90">
                {chapter.subhead}
              </p>
            )}

            {/* Body copy */}
            {chapter.body && (
              <p className="chapter-body mt-5 md:mt-6 font-body text-base md:text-lg text-ivory-muted leading-relaxed md:leading-[1.75] max-w-lg md:max-w-xl"
                style={{ textShadow: "0 1px 20px rgba(0,0,0,0.9)" }}>
                {chapter.body}
              </p>
            )}

            {/* CTA row */}
            {(chapter as any).hasCTA && (
              <div className="chapter-body mt-8 md:mt-12 flex flex-wrap gap-4 md:gap-6 justify-center pointer-events-auto">
                <a href="#booking" className="btn-primary px-8 py-3.5 text-base font-semibold">
                  Book a Service
                </a>
                <a href="#donate" className="btn-ghost px-8 py-3.5 text-base font-semibold">
                  Donate (E-Undiyal)
                </a>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
