"use client";

import { useRef, useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  Flame,
  Shield,
  ShieldCheck,
  Crown,
  Heart,
  Utensils,
} from "lucide-react";

const SERVICES = [
  {
    id: 1,
    name: "Moolavar Abishegam",
    category: "Abhisegam",
    tamil: "மூலவர் அபிஷேகம்",
    description: "Sacred bathing ritual of the presiding deity with milk, curd, honey, and more.",
    session: "Morning",
    maxFamilies: 10,
    personsPerFamily: 3,
    advanceDays: 3,
    color: "from-gold-primary to-saffron",
  },
  {
    id: 2,
    name: "Ganapathy Homam",
    category: "Homam",
    tamil: "கணபதி ஹோமம்",
    description: "Vedic fire ritual offered to Lord Ganesha for prosperity, removal of obstacles, and blessings.",
    session: "Morning",
    maxPersons: 5,
    advanceDays: 5,
    color: "from-saffron to-maroon",
  },
  {
    id: 3,
    name: "Moolavar Sandhana Kaapu",
    category: "Kaapu",
    tamil: "மூலவர் சந்தன காப்பு",
    description: "Sacred sandalwood paste applied to the deity, a deeply auspicious offering.",
    session: "Morning",
    maxPersons: 5,
    advanceDays: 3,
    color: "from-gold-deep to-gold-primary",
  },
  {
    id: 4,
    name: "Moolavar Vennai Kaapu",
    category: "Kaapu",
    tamil: "மூலவர் வெண்ணை காப்பு",
    description: "Butter offering to the deity — a traditional gesture of devotion and coolness.",
    session: "Morning",
    maxPersons: 5,
    advanceDays: 3,
    color: "from-gold-light to-gold-primary",
  },
  {
    id: 5,
    name: "Kavasam",
    category: "Kavasam",
    tamil: "கவசம்",
    description: "Armour prayers and ceremonial dressing of the deity for all auspicious events.",
    session: "All Day",
    maxPersons: 5,
    advanceDays: 3,
    color: "from-maroon to-maroon-deep",
  },
  {
    id: 6,
    name: "Gold Chariot",
    category: "Chariot",
    tamil: "தங்கத் தேர்",
    description: "The magnificent gold-plated chariot procession through the temple streets.",
    session: "Morning / Evening",
    maxPersons: 5,
    advanceDays: 3,
    color: "from-gold-primary to-gold-deep",
  },
  {
    id: 7,
    name: "Silver Chariot",
    category: "Chariot",
    tamil: "வெள்ளித் தேர்",
    description: "The silver chariot procession — a divine spectacle of devotion.",
    session: "Morning / Evening",
    maxPersons: 5,
    advanceDays: 3,
    color: "from-ivory-dim to-ivory-muted",
  },
  {
    id: 8,
    name: "Urchavar Thirukalyanam",
    category: "Thirukalyanam",
    tamil: "உற்சவர் திருக்கல்யாணம்",
    description: "The celestial wedding ceremony of the processional deity — a grand and auspicious event.",
    session: "Morning",
    maxPersons: 5,
    advanceDays: 3,
    color: "from-gold-primary to-maroon",
  },
  {
    id: 9,
    name: "Annadhanam Prasadha Thonnai",
    category: "Annadhanam",
    tamil: "அன்னதானம் பிரசாத தொன்னை",
    description: "Sponsor holy leaf-cup food offerings distributed to devotees as divine prasadham.",
    session: "Session 1 / 2 / 3",
    maxPersons: 5,
    advanceDays: 3,
    color: "from-maroon to-saffron",
  },
  {
    id: 10,
    name: "Annadhanam Meals",
    category: "Annadhanam",
    tamil: "அன்னதான சாப்பாடு",
    description: "Sponsor a complete sacred meal served to devotees at the temple.",
    session: "Single Session",
    maxPersons: 1,
    advanceDays: 3,
    color: "from-saffron to-gold-primary",
  },
];

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Abhisegam: Droplets,
  Homam: Flame,
  Kaapu: Shield,
  Kavasam: ShieldCheck,
  Chariot: Crown,
  Thirukalyanam: Heart,
  Annadhanam: Utensils,
};

export default function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 20;
    el.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 20;
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setCurrentIndex(Math.max(0, Math.min(idx, SERVICES.length - 1)));
  }, []);

  return (
    <section id="services" className="relative overflow-hidden py-[var(--section-pad)]">
      <div className="px-[var(--gutter)] mb-8 md:mb-12">
        <p className="font-mono text-[10px] text-gold-primary uppercase tracking-[0.2em] mb-2 opacity-70">
          Sacred Services
        </p>
        <h2 className="font-heading text-display-md text-ivory">
          Book a service
        </h2>
        <p className="font-body text-sm text-ivory-dim mt-1">
          Scroll to explore all 10 temple services →
        </p>
      </div>

      <div className="relative">
        <button
          onClick={() => scrollTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-gold-primary hover:text-gold-light disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Previous service"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-5 px-[var(--gutter)] pb-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {SERVICES.map((svc, i) => {
            const Icon = CATEGORY_ICONS[svc.category] || Droplets;
            return (
              <div
                key={svc.id}
                className="snap-start shrink-0 w-[280px] md:w-[300px] glass rounded-card p-6 md:p-8 flex flex-col gap-4 md:gap-5 group cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:border-gold-primary/25 hover:-translate-y-1"
              >
                <span className="font-mono text-[10px] text-gold-dim tracking-widest uppercase">
                  {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-gold-primary shrink-0" />
                  <span className={`text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${svc.color} text-bg-deep font-semibold uppercase tracking-wide`}>
                    {svc.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-ivory font-semibold leading-snug group-hover:text-gold-light transition-colors duration-300">
                    {svc.name}
                  </h3>
                  <p className="font-heading italic text-sm text-gold-primary opacity-70 mt-0.5">
                    {svc.tamil}
                  </p>
                </div>

                <p className="font-body text-sm text-ivory-muted leading-relaxed flex-1">
                  {svc.description}
                </p>

                <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                  <div className="flex justify-between text-xs">
                    <span className="text-ivory-dim font-mono uppercase tracking-wide">Session</span>
                    <span className="text-ivory font-medium">{svc.session}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-ivory-dim font-mono uppercase tracking-wide">Advance</span>
                    <span className="text-ivory font-medium">{svc.advanceDays} days</span>
                  </div>
                  {svc.maxPersons && (
                    <div className="flex justify-between text-xs">
                      <span className="text-ivory-dim font-mono uppercase tracking-wide">Max persons</span>
                      <span className="text-ivory font-medium">{svc.maxPersons}</span>
                    </div>
                  )}
                  {svc.maxFamilies && (
                    <div className="flex justify-between text-xs">
                      <span className="text-ivory-dim font-mono uppercase tracking-wide">Max families</span>
                      <span className="text-ivory font-medium">{svc.maxFamilies} × {svc.personsPerFamily} persons</span>
                    </div>
                  )}
                </div>

                <a
                  href="#booking"
                  className="block w-full text-center text-sm py-2.5 mt-1 rounded-pill border border-gold-primary/35 text-gold-primary font-semibold transition-all duration-200 hover:bg-gold-primary/10 hover:border-gold-primary"
                >
                  Book This Service
                </a>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scrollTo(currentIndex + 1)}
          disabled={currentIndex === SERVICES.length - 1}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-gold-primary hover:text-gold-light disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Next service"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center mt-6 px-[var(--gutter)]">
        <span className="font-mono text-xs text-gold-primary/70 tracking-wider">
          {currentIndex + 1} of {SERVICES.length}
        </span>
      </div>
    </section>
  );
}
