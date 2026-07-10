"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface GalleryItem {
  src: string;
  caption: string;
}

const GALLERY_IMAGES: GalleryItem[] = [
  { src: "/gallery/temple-1.jpeg", caption: "Temple Heritage" },
  { src: "/gallery/temple-2.jpeg", caption: "Divine Darshan" },
  { src: "/gallery/temple-3.jpeg", caption: "Sacred Traditions" },
  { src: "/gallery/temple-4.jpeg", caption: "Festival Moments" },
  { src: "/gallery/temple-5.jpeg", caption: "Blessed Offerings" },
  { src: "/gallery/temple-6.jpeg", caption: "Temple Heritage" },
  { src: "/gallery/temple-7.jpeg", caption: "Divine Darshan" },
  { src: "/gallery/temple-8.jpeg", caption: "Sacred Traditions" },
  { src: "/gallery/temple-9.jpeg", caption: "Festival Moments" },
  { src: "/gallery/temple-10.jpeg", caption: "Blessed Offerings" },
];

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation & Esc to close
  useEffect(() => {
    if (activeIndex === null) return;

    // Focus the lightbox dialog on open
    lightboxRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight" || e.key === "Right") {
        nextImage();
      } else if (e.key === "ArrowLeft" || e.key === "Left") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const openLightbox = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setActiveIndex(index);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeLightbox = () => {
    setActiveIndex(null);
    document.body.style.overflow = ""; // Restore background scroll
    // Restore focus to the clicked item
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null));
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if user clicked directly on the backdrop container, not children
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <main className="min-h-screen bg-bg-deep text-ivory relative py-16 md:py-24 noise">
      
      {/* Dynamic Background elements to match the main site */}
      <div className="absolute inset-0 bg-gradient-vignette pointer-events-none" />

      <div className="max-w-7xl mx-auto px-[var(--gutter)] relative z-10">
        
        {/* Back Link */}
        <div className="mb-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-gold-primary hover:text-gold-light transition-colors duration-300"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-primary opacity-70">
            Sri Manakula Vinayagar Devasthanam
          </p>
          <h1 className="font-heading text-display-md text-ivory">
            The Divine Gallery
          </h1>
          <div className="flex items-center justify-center gap-2 py-1">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-primary/40" />
            <span className="text-gold-primary text-xs">✦</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-primary/40" />
          </div>
          <p className="font-body text-sm text-ivory-muted max-w-lg mx-auto leading-relaxed">
            Immerse yourself in the sacred archives, celebrations, and architectural grandeur of Ganesha&apos;s holy abode in Puducherry.
          </p>
        </div>

        {/* Polished Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => openLightbox(idx, e)}
              className="relative aspect-[4/3] w-full text-left overflow-hidden rounded-card border border-gold-primary/10 hover:border-gold-primary/30 shadow-card-elevated hover:shadow-gold-glow transition-all duration-500 group focus:outline-none focus:ring-2 focus:ring-gold-primary/50"
              aria-label={`Open large view of ${img.caption}`}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              />
              
              {/* Overlay with subtle gold accent */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-bg-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-primary mb-0.5">
                  {img.caption}
                </span>
                <span className="font-heading italic text-xs text-ivory opacity-80">
                  Sri Devasthanam
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Accessible Full-Screen Lightbox Modal */}
      {activeIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          tabIndex={-1}
          className="fixed inset-0 z-50 bg-bg-deep/98 backdrop-blur-md flex flex-col items-center justify-center p-4 focus:outline-none"
          onClick={handleBackdropClick}
        >
          {/* Top Panel: Title, Counter, and Close */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-50 max-w-7xl mx-auto w-full">
            <div className="flex flex-col">
              <span className="font-heading text-lg text-gold-primary leading-none">
                {GALLERY_IMAGES[activeIndex].caption}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-ivory-dim mt-1.5">
                Sri Manakula Vinayagar Devasthanam
              </span>
            </div>
            
            {/* Image Counter */}
            <div className="font-mono text-[10px] text-ivory-muted uppercase tracking-widest bg-bg-surface border border-gold-primary/10 px-3 py-1.5 rounded-full">
              {activeIndex + 1} / {GALLERY_IMAGES.length}
            </div>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="p-3 rounded-full border border-gold-primary/20 bg-bg-surface hover:bg-gold-primary/10 text-ivory-muted hover:text-gold-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-primary/50"
              aria-label="Close lightbox"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="relative w-full max-w-5xl h-[65vh] md:h-[75vh] flex items-center justify-center">
            
            {/* Previous Arrow */}
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 z-10 p-3 rounded-full border border-gold-primary/20 bg-bg-surface/80 hover:bg-gold-primary/10 text-ivory-muted hover:text-gold-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-primary/50"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Image Container with Elegant Golden Corners */}
            <div className="relative w-full h-full max-w-[85vw] max-h-[85%] md:max-h-full aspect-auto flex items-center justify-center select-none">
              
              {/* Outer frame borders */}
              <div className="absolute -inset-1.5 border border-gold-primary/15 pointer-events-none rounded-lg" />
              
              {/* Decorative Corner Accents */}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-gold-primary pointer-events-none rounded-tl-sm" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-gold-primary pointer-events-none rounded-tr-sm" />
              <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-gold-primary pointer-events-none rounded-bl-sm" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-gold-primary pointer-events-none rounded-br-sm" />
              
              {/* The Image */}
              <div className="relative w-full h-full">
                <Image
                  src={GALLERY_IMAGES[activeIndex].src}
                  alt={GALLERY_IMAGES[activeIndex].caption}
                  fill
                  sizes="90vw"
                  className="object-contain rounded-sm"
                  priority
                />
              </div>
            </div>

            {/* Next Arrow */}
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 z-10 p-3 rounded-full border border-gold-primary/20 bg-bg-surface/80 hover:bg-gold-primary/10 text-ivory-muted hover:text-gold-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-primary/50"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

          </div>

          {/* Bottom Panel / Subtitle & Keyboard Hint */}
          <div className="absolute bottom-6 text-center z-10">
            <span className="font-mono text-[9px] uppercase tracking-widest text-gold-dim">
              Use Left / Right Arrows or Swipes to Navigate
            </span>
          </div>

        </div>
      )}

    </main>
  );
}
