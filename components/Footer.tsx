// ─── Footer ───────────────────────────────────────────────────────────────────

import Link from "next/link";

const FOOTER_LINKS = {
  "Services": [
    { label: "Moolavar Abishegam",    href: "#services" },
    { label: "Ganapathy Homam",       href: "#services" },
    { label: "Kaapu Services",        href: "#services" },
    { label: "Chariot Services",      href: "#services" },
    { label: "Annadhanam",            href: "#services" },
  ],
  "Devotee": [
    { label: "Book a Service",        href: "#booking" },
    { label: "E-Undiyal Donation",    href: "#donate" },
    { label: "My Bookings",           href: "#my-bookings" },
    { label: "Booking Status",        href: "#my-bookings" },
    { label: "Download Receipt",      href: "#my-bookings" },
  ],
  "Temple": [
    { label: "History & Heritage",    href: "#history" },
    { label: "Architecture",          href: "#history" },
    { label: "Festivals",             href: "#history" },
    { label: "Gallery",               href: "#gallery" },
    { label: "Notices",               href: "#" },
  ],
};

const TIMINGS = [
  { label: "Morning",   time: "5:45 AM – 12:30 PM" },
  { label: "Evening",   time: "4:00 PM – 9:30 PM" },
  { label: "Friday",    time: "Extended hours" },
];

export default function Footer() {
  return (
    <footer className="relative bg-bg-surface border-t border-white/5">
      {/* Ornamental top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent" />

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-[var(--gutter)] pt-16 md:pt-20 pb-10 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Temple seal/logo */}
            <div>
              <p className="font-heading text-2xl text-gold-primary font-semibold">
                Sri Manakula Vinayagar
              </p>
              <p className="font-heading italic text-base text-saffron-light mt-0.5">
                Devasthanam
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory-dim mt-1">
                Puducherry · India
              </p>
            </div>

            <p className="font-body text-sm text-ivory-muted leading-relaxed md:leading-[1.75] max-w-xs md:max-w-sm">
              One of the oldest and most revered temples in Puducherry, dedicated to Lord Manakula Vinayagar, the sacred form of Lord Ganesha.
            </p>

            {/* Temple timings */}
            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold-dim mb-3">
                Darshan Timings
              </p>
              {TIMINGS.map(({ label, time }) => (
                <div key={label} className="flex justify-between text-xs">
                  <span className="text-ivory-dim">{label}</span>
                  <span className="text-ivory font-medium">{time}</span>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="space-y-1 text-xs text-ivory-dim">
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold-dim mb-2">Address</p>
              <p>Manakula Vinayagar Koil Street,</p>
              <p>Puducherry – 605 001, India</p>
              <p className="mt-1.5 text-gold-primary">📞 +91 413 222 5563</p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dim">
                {category}
              </p>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="font-body text-sm text-ivory-muted hover:text-gold-primary transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Marquee ticker strip */}
        <div className="mt-12 border-t border-white/5 pt-6 overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
            {[...Array(3)].map((_, repeat) => (
              <span key={repeat} className="font-heading italic text-[13vw] text-white/4 leading-none mr-12 select-none">
                ஓம் ஸ்ரீ கணேஷாய நமஃ &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-2 border-t border-white/5">
          <p className="font-mono text-[10px] text-ivory-dim uppercase tracking-wide">
            © 2026 Sri Manakula Vinayagar Devasthanam. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[10px] font-mono text-ivory-dim uppercase tracking-wide">
            <Link href="#" className="hover:text-gold-primary transition-colors duration-200">Privacy</Link>
            <span className="opacity-30">·</span>
            <Link href="#" className="hover:text-gold-primary transition-colors duration-200">Terms</Link>
            <span className="opacity-30">·</span>
            <Link href="#" className="hover:text-gold-primary transition-colors duration-200">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
