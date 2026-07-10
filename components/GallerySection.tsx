"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  src: string;
  caption: string;
  heightClass: string;
}

const GALLERY_IMAGES: GalleryItem[] = [
  { src: "/gallery/temple-1.jpeg", caption: "Temple Heritage", heightClass: "h-[160px] md:h-[200px]" },
  { src: "/gallery/temple-2.jpeg", caption: "Divine Darshan", heightClass: "h-[240px] md:h-[330px]" },
  { src: "/gallery/temple-3.jpeg", caption: "Sacred Traditions", heightClass: "h-[180px] md:h-[230px]" },
  { src: "/gallery/temple-4.jpeg", caption: "Festival Moments", heightClass: "h-[200px] md:h-[280px]" },
  { src: "/gallery/temple-5.jpeg", caption: "Blessed Offerings", heightClass: "h-[140px] md:h-[180px]" },
  { src: "/gallery/temple-6.jpeg", caption: "Temple Heritage", heightClass: "h-[260px] md:h-[340px]" },
  { src: "/gallery/temple-7.jpeg", caption: "Divine Darshan", heightClass: "h-[170px] md:h-[220px]" },
  { src: "/gallery/temple-8.jpeg", caption: "Sacred Traditions", heightClass: "h-[220px] md:h-[300px]" },
  { src: "/gallery/temple-9.jpeg", caption: "Festival Moments", heightClass: "h-[150px] md:h-[190px]" },
  { src: "/gallery/temple-10.jpeg", caption: "Blessed Offerings", heightClass: "h-[190px] md:h-[260px]" },
  { src: "/gallery/temple-11.jpeg", caption: "Temple Deity", heightClass: "h-[230px] md:h-[190px]" },
  { src: "/gallery/temple-12.jpeg", caption: "Temple Inner Sanctum", heightClass: "h-[150px] md:h-[290px]" },
  { src: "/gallery/temple-13.jpeg", caption: "Golden Shine Interior", heightClass: "h-[210px] md:h-[300px]" },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if prefers-reduced-motion is true
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header scroll animation
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Grid items scroll animation (staggered entrance)
      const items = gsap.utils.toArray(".gallery-item");
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-bg-deep border-t border-white/5 py-20 md:py-28 overflow-hidden noise"
    >
      <div className="max-w-7xl mx-auto px-[var(--gutter)]">

        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-primary opacity-70">
            Gallery
          </p>
          <h2 className="font-heading text-display-md text-ivory">
            Sacred Moments
          </h2>
          <div className="flex items-center justify-center gap-2 py-1">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold-primary/40" />
            <span className="text-gold-primary text-xs">✦</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold-primary/40" />
          </div>
          <p className="font-body text-sm text-ivory-muted max-w-lg mx-auto leading-relaxed">
            A glimpse into the divine heritage of Sri Manakula Vinayagar Devasthanam.
          </p>
        </div>

        {/* Asymmetric Responsive Grid */}
        <div
          ref={gridRef}
          className="columns-1 min-[450px]:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="gallery-item break-inside-avoid relative group overflow-hidden rounded-card border border-gold-primary/10 hover:border-gold-primary/30 shadow-card-elevated hover:shadow-gold-glow-lg transition-all duration-500 block cursor-pointer"
            >
              {/* Outer container with fixed responsive heights */}
              <div className={`relative w-full ${img.heightClass}`}>
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  priority={idx < 3}
                />

                {/* Premium Golden Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-primary mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out-expo">
                    {img.caption}
                  </span>
                  <span className="font-heading italic text-sm text-ivory transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out-expo">
                    Sri Devasthanam
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link / Button */}
        <div className="mt-16 text-center">
          <Link
            href="/gallery"
            className="btn-ghost px-8 py-3 text-xs uppercase font-mono tracking-widest inline-flex items-center gap-3"
          >
            <span>View All Gallery</span>
            <svg
              className="w-4 h-4 text-gold-primary group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
