"use client";

// ─── Notices Banner ───────────────────────────────────────────────────────────
// Mirrors backend: types = emergency | banner | homepage | announcement | scheduled

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface Notice {
  id: string;
  type: "emergency" | "banner" | "homepage" | "announcement" | "scheduled";
  title: string;
  body: string;
  priority: number;
}

// Mock notices — will be fetched from /api/v1/notices once backend is connected
const MOCK_NOTICES: Notice[] = [
  {
    id: "1",
    type: "banner",
    title: "Online Booking Open",
    body: "Book Moolavar Abishegam and other services online. Advance booking required.",
    priority: 2,
  },
  {
    id: "2",
    type: "announcement",
    title: "Vinayagar Chaturthi Special Schedule",
    body: "Extended darshan timings during Vinayagar Chaturthi celebrations. Click for details.",
    priority: 3,
  },
];

export default function NoticesBanner() {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate
  useEffect(() => {
    if (MOCK_NOTICES.length <= 1) return;
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % MOCK_NOTICES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Entrance
  useEffect(() => {
    if (bannerRef.current) {
      gsap.fromTo(bannerRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    }
  }, []);

  if (dismissed || MOCK_NOTICES.length === 0) return null;

  const notice = MOCK_NOTICES[current];
  const isEmergency = notice.type === "emergency";

  return (
    <div
      ref={bannerRef}
      className={`relative z-[60] flex items-center justify-between gap-4 px-[var(--gutter)] py-2.5 text-sm ${
        isEmergency
          ? "bg-maroon border-b border-maroon-deep"
          : "bg-gold-dim/30 border-b border-gold-primary/10 backdrop-blur-sm"
      }`}
    >
      {/* Left content */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className={`shrink-0 w-1.5 h-1.5 rounded-full animate-pulse ${isEmergency ? "bg-red-400" : "bg-gold-primary"}`} />
        <p className="font-body text-ivory truncate text-xs">
          <strong className="text-gold-light font-semibold">{notice.title}:</strong>{" "}
          <span className="text-ivory-muted">{notice.body}</span>
        </p>
      </div>

      {/* Right: dot indicators + close */}
      <div className="flex items-center gap-3 shrink-0">
        {MOCK_NOTICES.length > 1 && (
          <div className="flex gap-1.5">
            {MOCK_NOTICES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${i === current ? "bg-gold-primary w-3" : "bg-white/20"}`}
              />
            ))}
          </div>
        )}
        <button
          onClick={() => setDismissed(true)}
          className="text-ivory-dim hover:text-ivory transition-colors duration-200 p-1"
          aria-label="Dismiss notice"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
