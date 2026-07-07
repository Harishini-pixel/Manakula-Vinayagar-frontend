"use client";

// ─── E-Undiyal Donation Section ───────────────────────────────────────────────
// Completely independent from Bookings — matching backend's E-Undiyal architecture

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRESET_AMOUNTS = [108, 501, 1001, 2001, 5001, 10001];

export default function DonationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [amount, setAmount]  = useState<number | "">(501);
  const [custom, setCustom]  = useState(false);
  const [name, setName]      = useState("");
  const [phone, setPhone]    = useState("");
  const [email, setEmail]    = useState("");
  const [want80G, setWant80G] = useState(false);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal-item");
    if (!els) return;
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        stagger: 0.07,
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

  const handlePreset = (val: number) => {
    setAmount(val);
    setCustom(false);
  };

  const displayAmount = amount === "" ? "₹0" : `₹${Number(amount).toLocaleString("en-IN")}`;

  return (
    <section ref={sectionRef} id="donate" className="relative py-[var(--section-pad)] px-[var(--gutter)]">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-saffron/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — description */}
          <div className="space-y-6 md:space-y-8">
            <div className="reveal-item">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-saffron opacity-80 mb-3">
                E-Undiyal
              </p>
              <h2 className="font-heading text-display-md text-ivory">
                Offer your <span className="text-gold-gradient italic">devotion</span> digitally
              </h2>
            </div>

            <p className="reveal-item font-body text-ivory-muted leading-relaxed md:leading-[1.75] text-base max-w-lg">
              E-Undiyal is the temple&apos;s sacred digital donation system. Contribute to the divine welfare of Sri Manakula Vinayagar and receive an official donation receipt directly to your email.
            </p>

            {/* Benefits */}
            <div className="reveal-item space-y-3 md:space-y-4">
              {[
                { icon: "📜", label: "80G Tax Certificate",      desc: "Eligible for income tax exemption under Section 80G" },
                { icon: "📧", label: "Instant Digital Receipt",  desc: "PDF receipt delivered to your email immediately" },
                { icon: "🙏", label: "Guest Donations Welcome",  desc: "No account required to make a donation" },
                { icon: "🔐", label: "Secure Payment Gateway",   desc: "Razorpay-powered encrypted transactions" },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="flex gap-3 items-start">
                  <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-ivory">{label}</p>
                    <p className="text-xs text-ivory-dim mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider with ornament */}
            <div className="reveal-item divider-ornament text-xs text-gold-dim font-mono tracking-widest uppercase">
              ॐ श्री गणेशाय नमः
            </div>
          </div>

          {/* Right — donation form */}
          <div className="reveal-item glass rounded-card p-6 md:p-8 shadow-card-elevated">
            {/* Amount display */}
            <div className="text-center mb-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ivory-dim mb-1">Donation Amount</p>
              <p className="font-heading text-5xl text-gold-primary font-light">
                {displayAmount}
              </p>
              {amount && Number(amount) > 0 && (
                <p className="text-xs text-ivory-dim mt-1 font-mono">
                  {Number(amount).toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                </p>
              )}
            </div>

            {/* Preset amounts */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {PRESET_AMOUNTS.map((val) => (
                <button
                  key={val}
                  onClick={() => handlePreset(val)}
                  className={`py-2.5 rounded-card text-sm font-medium transition-all duration-200 border ${
                    amount === val && !custom
                      ? "border-gold-primary bg-gold-primary/15 text-gold-primary shadow-gold-glow"
                      : "border-white/8 text-ivory-dim hover:border-gold-dim"
                  }`}
                >
                  ₹{val.toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <button
              onClick={() => { setCustom(true); setAmount(""); }}
              className={`w-full mb-5 py-2.5 rounded-card text-sm border transition-all duration-200 ${
                custom
                  ? "border-saffron bg-saffron/10 text-saffron"
                  : "border-white/8 text-ivory-dim hover:border-saffron/50"
              }`}
            >
              {custom ? "Enter custom amount below" : "Enter custom amount"}
            </button>

            {custom && (
              <div className="mb-5">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory-muted font-heading text-lg">₹</span>
                  <input
                    type="number"
                    min={1}
                    placeholder="Enter amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value ? Number(e.target.value) : "")}
                    className="input-divine w-full pl-9 pr-4 py-3 text-base"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Donor details */}
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs text-ivory-dim mb-1.5">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Anand Krishnamurthy"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-divine w-full px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-ivory-dim mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="input-divine w-full px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-ivory-dim mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="for receipt delivery"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-divine w-full px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            {/* 80G toggle */}
            <label className="flex items-center gap-3 cursor-pointer mb-6 md:mb-8 p-3 md:p-4 bg-bg-raised rounded-card border border-white/5">
              <div
                onClick={() => setWant80G(!want80G)}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${want80G ? "bg-gold-primary" : "bg-white/10"}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${want80G ? "translate-x-5" : ""}`} />
              </div>
              <div>
                <p className="text-xs font-semibold text-ivory">Request 80G Tax Certificate</p>
                <p className="text-[10px] text-ivory-dim mt-0.5">PAN details required for certificate issuance</p>
              </div>
            </label>

            {/* Submit */}
            <button
              disabled={!amount || Number(amount) < 1 || !name || !phone}
              onClick={() => alert("This is a UI demo. Payment integration coming soon!")}
              className="btn-primary w-full py-3.5 text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Donate {amount ? `₹${Number(amount).toLocaleString("en-IN")}` : ""} →
            </button>

            <p className="text-center text-[10px] text-ivory-dim mt-3 font-mono">
              Secure · Encrypted · Instant Receipt
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
