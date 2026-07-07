"use client";

// ─── Booking Section ──────────────────────────────────────────────────────────
// Multi-step form: Service → Date → Person Details → Review

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES_LIST = [
  { value: "moolavar_abishegam",   label: "Moolavar Abishegam",          category: "Abhisegam" },
  { value: "ganapathy_homam",       label: "Ganapathy Homam",              category: "Homam" },
  { value: "sandhana_kaapu",        label: "Moolavar Sandhana Kaapu",     category: "Kaapu" },
  { value: "vennai_kaapu",          label: "Moolavar Vennai Kaapu",       category: "Kaapu" },
  { value: "kavasam",               label: "Kavasam",                      category: "Kavasam" },
  { value: "gold_chariot",          label: "Gold Chariot",                 category: "Chariot" },
  { value: "silver_chariot",        label: "Silver Chariot",               category: "Chariot" },
  { value: "thirukalyanam",         label: "Urchavar Thirukalyanam",       category: "Thirukalyanam" },
  { value: "annadhanam_thonnai",    label: "Annadhanam Prasadha Thonnai", category: "Annadhanam" },
  { value: "annadhanam_meals",      label: "Annadhanam Meals",             category: "Annadhanam" },
];

const STEPS = ["Service", "Date & Time", "Devotee Details", "Review"];

type Person = { name: string; star: string; gothram: string };

interface BookingState {
  service:    string;
  date:       string;
  session:    string;
  numPersons: number;
  persons:    Person[];
}

const DEFAULT_PERSON: Person = { name: "", star: "", gothram: "" };

export default function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BookingState>({
    service:    "",
    date:       "",
    session:    "morning",
    numPersons: 1,
    persons:    [{ ...DEFAULT_PERSON }],
  });

  // GSAP reveal on scroll
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal-item");
    if (!els) return;
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const updatePerson = (index: number, field: keyof Person, value: string) => {
    const updated = [...form.persons];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, persons: updated });
  };

  const setNumPersons = (n: number) => {
    const clamped = Math.max(1, Math.min(5, n));
    const persons = Array.from({ length: clamped }, (_, i) => form.persons[i] || { ...DEFAULT_PERSON });
    setForm({ ...form, numPersons: clamped, persons });
  };

  const getTodayPlus = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  };

  const selectedService = SERVICES_LIST.find(s => s.value === form.service);

  return (
    <section ref={sectionRef} id="booking" className="relative py-[var(--section-pad)] px-[var(--gutter)]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="reveal-item text-center mb-12 md:mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-primary opacity-70 mb-3">
            Online Booking
          </p>
          <h2 className="font-heading text-display-lg text-ivory">
            Book a <span className="text-gold-gradient italic">sacred</span> service
          </h2>
          <p className="font-body text-ivory-muted mt-3 max-w-lg mx-auto text-base">
            All bookings require minimum advance notice. Slots are first-come, first-served.
          </p>
        </div>

        {/* Step indicator */}
        <div className="reveal-item flex items-center justify-center gap-0 mb-10 md:mb-12">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <button
                onClick={() => i < step + 1 && setStep(i)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  i === step
                    ? "bg-gold-primary text-bg-deep shadow-gold-glow"
                    : i < step
                    ? "text-gold-primary cursor-pointer hover:text-gold-light"
                    : "text-ivory-dim cursor-default"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs border ${
                  i === step ? "border-bg-deep bg-bg-deep text-gold-primary" :
                  i < step   ? "border-gold-primary bg-gold-primary/20 text-gold-primary" :
                               "border-ivory-dim/30 text-ivory-dim"
                }`}>
                  {i < step ? "✓" : i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`w-8 h-px mx-1 transition-colors duration-300 ${i < step ? "bg-gold-primary" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="reveal-item glass rounded-card p-6 md:p-8 shadow-card-elevated">
          {/* ── Step 0: Choose Service ── */}
          {step === 0 && (
            <div className="space-y-6 md:space-y-8">
              <h3 className="font-heading text-xl text-ivory">Select a service</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES_LIST.map((svc) => (
                  <button
                    key={svc.value}
                    onClick={() => setForm({ ...form, service: svc.value })}
                    className={`text-left p-4 rounded-card border transition-all duration-200 ${
                      form.service === svc.value
                        ? "border-gold-primary bg-gold-primary/10 shadow-gold-glow"
                        : "border-white/8 bg-bg-raised hover:border-gold-dim"
                    }`}
                  >
                    <span className="block font-semibold text-sm text-ivory">{svc.label}</span>
                    <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wide ${
                      form.service === svc.value ? "bg-gold-primary text-bg-deep" : "bg-white/10 text-ivory-dim"
                    }`}>
                      {svc.category}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => form.service && setStep(1)}
                  disabled={!form.service}
                  className="btn-primary px-8 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 1: Date & Session ── */}
          {step === 1 && (
            <div className="space-y-6 md:space-y-8">
              <h3 className="font-heading text-xl text-ivory">
                Choose a date & session
              </h3>
              {selectedService && (
                <div className="flex items-center gap-3 p-3 bg-gold-primary/10 rounded-card border border-gold-primary/20">
                  <span className="text-gold-primary text-sm font-semibold">{selectedService.label}</span>
                  <span className="text-ivory-dim text-xs">·</span>
                  <span className="text-ivory-dim text-xs">{selectedService.category}</span>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block font-body text-sm text-ivory-muted mb-2">
                    Preferred Date
                    <span className="ml-2 font-mono text-[10px] text-gold-dim">(min. {form.service === "ganapathy_homam" ? 5 : 3} days advance)</span>
                  </label>
                  <input
                    type="date"
                    min={getTodayPlus(form.service === "ganapathy_homam" ? 5 : 3)}
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="input-divine w-full px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm text-ivory-muted mb-2">Session</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["morning", "evening", "all_day"].map(s => (
                      <button
                        key={s}
                        onClick={() => setForm({ ...form, session: s })}
                        className={`py-2.5 rounded-card text-sm capitalize transition-all duration-200 border ${
                          form.session === s
                            ? "border-gold-primary bg-gold-primary/10 text-gold-primary"
                            : "border-white/8 text-ivory-dim hover:border-gold-dim"
                        }`}
                      >
                        {s.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-between">
                <button onClick={() => setStep(0)} className="btn-ghost px-6 py-2.5 text-sm">← Back</button>
                <button
                  onClick={() => form.date && setStep(2)}
                  disabled={!form.date}
                  className="btn-primary px-8 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Person Details ── */}
          {step === 2 && (
            <div className="space-y-6 md:space-y-8">
              <h3 className="font-heading text-xl text-ivory">Devotee details</h3>

              {/* Number of persons */}
              <div>
                <label className="block font-body text-sm text-ivory-muted mb-2">
                  Number of persons <span className="text-gold-dim font-mono text-xs">(max 5)</span>
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setNumPersons(form.numPersons - 1)}
                    className="w-10 h-10 rounded-full border border-white/15 text-ivory-muted hover:border-gold-primary hover:text-gold-primary transition-all duration-200"
                  >
                    −
                  </button>
                  <span className="font-heading text-3xl text-ivory w-8 text-center">{form.numPersons}</span>
                  <button
                    onClick={() => setNumPersons(form.numPersons + 1)}
                    className="w-10 h-10 rounded-full border border-white/15 text-ivory-muted hover:border-gold-primary hover:text-gold-primary transition-all duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Person cards */}
              <div className="space-y-4 md:space-y-5">
                {form.persons.map((person, i) => (
                  <div key={i} className="p-4 md:p-5 bg-bg-raised rounded-card border border-white/5 space-y-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-gold-dim">
                      Person {i + 1}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-ivory-dim mb-1">Full Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Rajan Kumar"
                          value={person.name}
                          onChange={e => updatePerson(i, "name", e.target.value)}
                          className="input-divine w-full px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-ivory-dim mb-1">Birth Star (Nakshatra) *</label>
                        <input
                          type="text"
                          placeholder="e.g. Ashwini"
                          value={person.star}
                          onChange={e => updatePerson(i, "star", e.target.value)}
                          className="input-divine w-full px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-ivory-dim mb-1">Gothram</label>
                        <input
                          type="text"
                          placeholder="e.g. Bharadwaja"
                          value={person.gothram}
                          onChange={e => updatePerson(i, "gothram", e.target.value)}
                          className="input-divine w-full px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-between">
                <button onClick={() => setStep(1)} className="btn-ghost px-6 py-2.5 text-sm">← Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={form.persons.some(p => !p.name || !p.star)}
                  className="btn-primary px-8 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Review Booking →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Review ── */}
          {step === 3 && (
            <div className="space-y-6 md:space-y-8">
              <h3 className="font-heading text-xl text-ivory">Review your booking</h3>

              <div className="space-y-3">
                {[
                  { label: "Service",    value: selectedService?.label },
                  { label: "Date",       value: form.date },
                  { label: "Session",    value: form.session.replace("_", " ") },
                  { label: "Persons",    value: `${form.numPersons} devotee${form.numPersons > 1 ? "s" : ""}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="font-mono text-xs uppercase tracking-wide text-ivory-dim">{label}</span>
                    <span className="font-body text-sm text-ivory font-medium capitalize">{value}</span>
                  </div>
                ))}
              </div>

              {/* Person summary */}
              <div className="p-4 bg-bg-raised rounded-card border border-white/5 space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-gold-dim mb-3">Devotees</p>
                {form.persons.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-5 h-5 rounded-full bg-gold-primary/20 text-gold-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-ivory">{p.name}</span>
                    <span className="text-ivory-dim">·</span>
                    <span className="text-ivory-muted">{p.star}</span>
                    {p.gothram && <><span className="text-ivory-dim">·</span><span className="text-ivory-dim">{p.gothram}</span></>}
                  </div>
                ))}
              </div>

              {/* Notice about payment */}
              <div className="flex gap-3 p-4 bg-saffron/10 border border-saffron/20 rounded-card">
                <span className="text-saffron shrink-0">⚡</span>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  You will be redirected to our secure payment gateway. Your slot will be held for <strong className="text-ivory">15 minutes</strong> during payment.
                </p>
              </div>

              <div className="flex gap-3 justify-between">
                <button onClick={() => setStep(2)} className="btn-ghost px-6 py-2.5 text-sm">← Back</button>
                <button
                  onClick={() => alert("This is a UI demo. Payment integration coming soon!")}
                  className="btn-primary px-8 py-3 text-base font-semibold"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sign-in nudge */}
        <p className="reveal-item text-center mt-6 md:mt-8 text-xs text-ivory-dim">
          Already booked?{" "}
          <a href="#my-bookings" className="text-gold-primary hover:text-gold-light transition-colors duration-200">
            View your bookings →
          </a>
        </p>
      </div>
    </section>
  );
}
