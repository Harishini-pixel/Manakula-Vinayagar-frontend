"use client";

// ─── My Bookings Section ─────────────────────────────────────────────────────
// Shows user's booking history — mock data until backend connected

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Status = "confirmed" | "pending_payment" | "pending_approval" | "cancelled" | "refunded";

const MOCK_BOOKINGS = [
  {
    id: "1",
    reference: "SMV-20260710-0042",
    service: "Moolavar Abishegam",
    date: "2026-07-15",
    session: "Morning",
    persons: 2,
    status: "confirmed" as Status,
    amount: 2500,
  },
  {
    id: "2",
    reference: "SMV-20260712-0018",
    service: "Ganapathy Homam",
    date: "2026-07-20",
    session: "Morning",
    persons: 3,
    status: "pending_approval" as Status,
    amount: 5000,
  },
  {
    id: "3",
    reference: "SMV-20260705-0007",
    service: "Moolavar Sandhana Kaapu",
    date: "2026-07-10",
    session: "Morning",
    persons: 1,
    status: "cancelled" as Status,
    amount: 1500,
  },
];

const STATUS_MAP: Record<Status, { label: string; chipClass: string }> = {
  confirmed:        { label: "Confirmed",        chipClass: "chip-confirmed" },
  pending_payment:  { label: "Pending Payment",  chipClass: "chip-pending" },
  pending_approval: { label: "Pending Approval", chipClass: "chip-pending" },
  cancelled:        { label: "Cancelled",        chipClass: "chip-cancelled" },
  refunded:         { label: "Refunded",         chipClass: "chip-refunded" },
};

export default function MyBookingsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phone, setPhone]  = useState("");
  const [authed, setAuthed] = useState(false); // Mock auth state

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal-item");
    if (!els) return;
    gsap.fromTo(els,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        stagger: 0.07,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="my-bookings" className="relative py-[var(--section-pad)] px-[var(--gutter)]">
      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="reveal-item mb-10 md:mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-primary opacity-70 mb-3">
            My Account
          </p>
          <h2 className="font-heading text-display-md text-ivory">Your bookings</h2>
          <p className="text-ivory-muted text-sm mt-2">Track, manage, and download receipts for all your temple services.</p>
        </div>

        {!authed ? (
          /* Login gate */
          <div className="reveal-item glass rounded-card p-8 max-w-md">
            <h3 className="font-heading text-xl text-ivory mb-2">Sign in to view your bookings</h3>
            <p className="text-sm text-ivory-muted mb-6">Enter your registered phone number to receive an OTP.</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-ivory-dim mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="input-divine w-full px-4 py-2.5 text-sm"
                />
              </div>
              <button
                onClick={() => setAuthed(true)} // Mock — will send OTP
                disabled={!phone}
                className="btn-primary w-full py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send OTP
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-ivory-dim">Or sign in with email &amp; password</p>
              <button className="btn-ghost w-full mt-2 py-2.5 text-sm">Sign in with Email</button>
            </div>
          </div>
        ) : (
          /* Bookings list */
          <div className="space-y-4">
            {MOCK_BOOKINGS.map((booking) => {
              const statusInfo = STATUS_MAP[booking.status];
              return (
                <div key={booking.id} className="reveal-item glass rounded-card p-5 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-5 items-start sm:items-center">
                  {/* Left */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-ivory text-sm">{booking.service}</h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusInfo.chipClass}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-ivory-dim font-mono">
                      <span>{booking.reference}</span>
                      <span>·</span>
                      <span>{booking.date}</span>
                      <span>·</span>
                      <span>{booking.session}</span>
                      <span>·</span>
                      <span>{booking.persons} person{booking.persons > 1 ? "s" : ""}</span>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-heading text-gold-primary text-lg">
                      ₹{booking.amount.toLocaleString("en-IN")}
                    </span>
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => alert("Receipt download — coming soon!")}
                        className="btn-ghost text-xs px-3 py-1.5"
                      >
                        Receipt ↓
                      </button>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => alert("Cancellation — coming soon!")}
                        className="text-xs text-ivory-dim hover:text-maroon transition-colors duration-200 px-2"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="reveal-item text-center pt-4">
              <button className="btn-ghost px-6 py-2.5 text-sm">Load more bookings</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
