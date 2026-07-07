"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  frameCount?: number;
}

export default function CanvasSequence({ frameCount = 151 }: Props) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas?.getContext("2d");
    if (!canvas || !ctx || !containerRef.current) return;

    // Resize canvas to fill viewport
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Draw cover-fit frame
    const drawFrame = (image: HTMLImageElement) => {
      if (!image.complete || !image.naturalWidth) return;
      const cw = canvas.width, ch = canvas.height;
      const ratio = Math.max(cw / image.naturalWidth, ch / image.naturalHeight);
      const dx = (cw - image.naturalWidth  * ratio) / 2;
      const dy = (ch - image.naturalHeight * ratio) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight,
                           dx, dy, image.naturalWidth * ratio, image.naturalHeight * ratio);
    };

    // Preload all frames
    const images: HTMLImageElement[] = [];
    let firstLoaded = false;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${padded}.jpg`;
      img.onload = () => {
        if (!firstLoaded) {
          firstLoaded = true;
          drawFrame(img);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    // GSAP scrub - scroll progress → frame index
    const proxy = { frame: 0 };
    const tl    = gsap.to(proxy, {
      frame: frameCount - 1,
      ease: "none",
      onUpdate: () => {
        const idx = Math.round(proxy.frame);
        const img = images[idx];
        if (img && img.complete) drawFrame(img);
      },
    });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=500%",
      pin: true,
      scrub: 1.5,
      animation: tl,
    });

    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      trigger.kill();
      tl.kill();
    };
  }, [frameCount]);

  // Desktop subtle fade-in + slow float
  useEffect(() => {
    const container = containerRef.current;
    let floatTl: gsap.core.Timeline | undefined;

    if (container) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(container, { opacity: 1, y: 0 });
      } else if (window.innerWidth >= 768) {
        floatTl = gsap.timeline({ delay: 0.15 });
        floatTl.fromTo(container,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }
        );
        floatTl.to(container, {
          y: -6,
          duration: 4.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }

    return () => { floatTl?.kill(); };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[100dvh] bg-bg-deep md:opacity-0">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Atmospheric vignette overlay */}
      <div className="absolute inset-0 bg-gradient-vignette pointer-events-none" />
      {/* Bottom gradient to blend into sections */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-overlay pointer-events-none" />
    </div>
  );
}
