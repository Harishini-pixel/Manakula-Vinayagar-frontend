"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Services",   href: "#services" },
  { label: "Book",       href: "#booking" },
  { label: "Donate",     href: "#donate" },
  { label: "History",    href: "#history" },
  { label: "Gallery",    href: "#gallery" },
];

export default function Navbar() {
  const navRef  = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg-deep/95 border-b border-gold-primary/10 py-3"
            : "bg-bg-deep/20 py-5"
        }`}
        style={{ opacity: 0 }}
      >
        <div className="max-w-7xl mx-auto px-[var(--gutter)] flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-heading text-gold-primary text-xl font-semibold tracking-wide group-hover:text-gold-light transition-colors duration-300">
              Manakula Vinayagar
            </span>
            <span className="font-mono text-[10px] text-ivory-dim tracking-[0.2em] uppercase mt-0.5">
              Sri Devasthanam · Puducherry
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="relative font-body text-sm font-medium text-ivory-muted hover:text-ivory transition-colors duration-200
                    before:absolute before:-bottom-1 before:left-0 before:h-px before:w-0 before:bg-gold-primary
                    before:transition-all before:duration-300 before:ease-[var(--ease-out-expo)]
                    hover:before:w-full"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="#donate"
              className="btn-ghost hidden sm:flex items-center px-4 py-2.5 text-sm"
            >
              Donate
            </Link>
            <Link
              href="#booking"
              className="btn-primary hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              <span>Book Now</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-ivory-muted hover:text-gold-primary transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        <div className="absolute inset-0 bg-bg-deep/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-[var(--nav-h)] left-0 right-0 glass p-8 transition-all duration-500 max-h-[calc(100vh-var(--nav-h))] overflow-y-auto ${
          menuOpen ? "translate-y-0" : "-translate-y-4"
        }`}>
          <ul className="flex flex-col gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="font-heading text-3xl text-ivory hover:text-gold-primary transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-8 inline-flex px-6 py-3 text-base"
          >
            Book a Service
          </Link>
        </div>
      </div>
    </>
  );
}
