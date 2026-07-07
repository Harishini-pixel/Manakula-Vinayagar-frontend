"use client";

// ─── History Section — Sticky Stack ──────────────────────────────────────────
// Skill: design-taste-frontend §5.A StickyStack pattern

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HISTORY_CARDS = [
  {
    period: "Before 1742",
    headline: "Divine origins",
    body: "The sacred deity of Sri Manakula Vinayagar was worshipped by French and local Tamil devotees long before the formal temple existed. The idol, facing the sea, has been a constant presence in Puducherry's spiritual life for centuries.",
    accent: "gold-primary",
  },
  {
    period: "1742 CE",
    headline: "Temple consecrated",
    body: "The French colonial government officially recognized and consecrated the Manakula Vinayagar Temple, making it one of the earliest Hindu temples to receive formal recognition during the colonial era in India.",
    accent: "saffron",
  },
  {
    period: "19th Century",
    headline: "Rajagopuram built",
    body: "The iconic gopuram (tower) was constructed, adorned with 45 breathtaking sculptures, becoming the visual centerpiece of the temple and a landmark of Puducherry's skyline.",
    accent: "gold-light",
  },
  {
    period: "Modern Era",
    headline: "A living heritage",
    body: "Today, the temple welcomes over a million devotees annually. Sri Aurobindo and The Mother of Pondicherry are said to have often visited and meditated here, further cementing its spiritual significance.",
    accent: "gold-primary",
  },
];

export default function HistorySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".history-card");

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Last card doesn't get pinned

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });

        // Scale down previous card as next enters
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="history" className="relative bg-bg-surface">
      {/* Section header */}
      <div className="py-16 md:py-24 px-[var(--gutter)] max-w-7xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-primary opacity-70 mb-3">
          Heritage
        </p>
        <h2 className="font-heading text-display-md text-ivory max-w-xl">
          Centuries of devotion
        </h2>
      </div>

      <div ref={ref} className="relative">
        {HISTORY_CARDS.map((card, i) => (
          <div
            key={card.period}
            className="history-card sticky top-0 min-h-[100dvh] flex items-center px-[var(--gutter)] py-20 md:py-28 bg-bg-surface"
          >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: text */}
              <div className="space-y-5 md:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-gold-primary opacity-50" />
                  <span className="font-mono text-xs text-gold-primary uppercase tracking-widest">{card.period}</span>
                </div>
                <h3 className="font-heading text-display-lg text-ivory">
                  {card.headline}
                </h3>
                <p className="font-body text-ivory-muted leading-relaxed text-base max-w-lg">
                  {card.body}
                </p>
                <div className="font-mono text-[10px] text-ivory-dim uppercase tracking-widest">
                  Chapter {String(i + 1).padStart(2, "0")} / {String(HISTORY_CARDS.length).padStart(2, "0")}
                </div>
              </div>

              {/* Right: decorative block */}
              <div className="relative hidden md:flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Rotating ring */}
                  <div
                    className="absolute inset-0 rounded-full border border-gold-primary/20"
                    style={{ animation: "spin 20s linear infinite" }}
                  />
                  <div
                    className="absolute inset-4 rounded-full border border-saffron/10"
                    style={{ animation: "spin 15s linear infinite reverse" }}
                  />
                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-heading text-6xl text-gold-primary opacity-30 leading-none">{i + 1}</p>
                      <p className="font-mono text-[10px] text-gold-dim uppercase tracking-widest mt-2">{card.period}</p>
                    </div>
                  </div>
                  {/* Orbit dots */}
                  {[0, 90, 180, 270].map(deg => (
                    <div
                      key={deg}
                      className="absolute w-2 h-2 rounded-full bg-gold-primary/40"
                      style={{
                        top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 120}px - 4px)`,
                        left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 120}px - 4px)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
