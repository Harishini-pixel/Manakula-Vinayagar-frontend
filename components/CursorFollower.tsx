"use client";

import { useEffect, useRef } from "react";

type TrailItem = {
  id: number;
  element: HTMLSpanElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  startSize: number;
  age: number;
  life: number;
  kind: "petal" | "sparkle";
};

export default function CursorFollower() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isFinePointer || reducedMotion) return;

    const layer = layerRef.current;
    if (!layer) return;

    document.documentElement.classList.add("temple-cursor-active");

    let animationFrame = 0;
    let id = 0;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let headX = mouseX;
    let headY = mouseY;

    let previousX = mouseX;
    let previousY = mouseY;

    let lastSpawnX = mouseX;
    let lastSpawnY = mouseY;

    let lastTime = performance.now();

    const items: TrailItem[] = [];

    function addItem(
      kind: "petal" | "sparkle",
      x: number,
      y: number,
      speedX: number,
      speedY: number
    ) {
      const element = document.createElement("span");
      element.className =
        kind === "petal" ? "temple-cursor-petal" : "temple-cursor-sparkle";

      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      layer.appendChild(element);

      const isPetal = kind === "petal";

      items.push({
        id: id++,
        element,
        x,
        y,
        vx: -speedX * (0.22 + Math.random() * 0.24) + (Math.random() - 0.5) * 28,
        vy:
          -speedY * (0.22 + Math.random() * 0.24) +
          (Math.random() - 0.5) * 22 +
          12,
        rotation: Math.random() * 360,
        startSize: isPetal
          ? 8 + Math.random() * 10
          : 2 + Math.random() * 3.5,
        age: 0,
        life: isPetal
          ? 0.5 + Math.random() * 0.42
          : 0.32 + Math.random() * 0.32,
        kind,
      });

      // Prevents too many elements and keeps scrolling smooth.
      if (items.length > 42) {
        const oldest = items.shift();
        oldest?.element.remove();
      }
    }

    function onMouseMove(event: MouseEvent) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }

    function animate() {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.04);
      lastTime = now;

      // Smooth, slightly delayed cursor head.
      headX += (mouseX - headX) * 0.3;
      headY += (mouseY - headY) * 0.3;

      const moveX = headX - previousX;
      const moveY = headY - previousY;
      const speed = Math.hypot(moveX, moveY);

      previousX = headX;
      previousY = headY;

      const distance = Math.hypot(headX - lastSpawnX, headY - lastSpawnY);

      /*
        Uneven gaps:
        Faster movement creates more trail.
        Slow movement creates only occasional petals.
      */
      if (distance > 4.5 && speed > 0.45) {
        const petalCount = speed > 8 ? 2 : 1;

        for (let i = 0; i < petalCount; i++) {
          addItem(
            "petal",
            headX + (Math.random() - 0.5) * 7,
            headY + (Math.random() - 0.5) * 7,
            moveX,
            moveY
          );
        }

        // Random sparkle burst: not every petal has a sparkle.
        if (Math.random() > 0.35) {
          const sparkleCount = speed > 8 ? 2 : 1;

          for (let i = 0; i < sparkleCount; i++) {
            addItem(
              "sparkle",
              headX + (Math.random() - 0.5) * 14,
              headY + (Math.random() - 0.5) * 14,
              moveX,
              moveY
            );
          }
        }

        lastSpawnX = headX;
        lastSpawnY = headY;
      }

      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.age += dt;

        const progress = Math.min(item.age / item.life, 1);

        item.x += item.vx * dt;
        item.y += item.vy * dt;

        // Slow down naturally as the petal fades.
        item.vx *= 0.965;
        item.vy *= 0.965;

        const fade = Math.pow(1 - progress, 1.35);

        /*
          Descending order:
          new item = visibly larger
          older item = smaller and softer
          final item = tiny fading speck
        */
        const size =
          item.kind === "petal"
            ? item.startSize * (1 - progress * 0.72)
            : item.startSize * (1 - progress * 0.42);

        const opacity =
          item.kind === "petal"
            ? fade * 0.95
            : fade * 0.9;

        item.element.style.left = `${item.x}px`;
        item.element.style.top = `${item.y}px`;
        item.element.style.width = `${Math.max(size, 1)}px`;
        item.element.style.height =
          item.kind === "petal"
            ? `${Math.max(size * (0.8 + Math.sin(item.id) * 0.22), 1)}px`
            : `${Math.max(size, 1)}px`;

        item.element.style.opacity = `${opacity}`;
        item.element.style.filter = `blur(${progress * 0.55}px)`;

        item.element.style.transform = `
          translate(-50%, -50%)
          rotate(${item.rotation + progress * 130}deg)
          scale(${1 - progress * 0.12})
        `;

        if (progress >= 1) {
          item.element.remove();
          items.splice(i, 1);
        }
      }

      animationFrame = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.classList.remove("temple-cursor-active");
      layer.replaceChildren();
    };
  }, []);

  return (
    <>
      <div
        ref={layerRef}
        className="temple-cursor-layer"
        aria-hidden="true"
      />

      <style jsx global>{`
        /*
          Hides the original laptop pointer throughout the WEBSITE.
          It does not affect Windows, browser tabs, or the address bar.
        */
        :root.temple-cursor-active,
        :root.temple-cursor-active body,
        :root.temple-cursor-active body * {
          cursor: none !important;
        }

        .temple-cursor-layer {
          position: fixed;
          inset: 0;
          z-index: 2147483647;
          pointer-events: none;
          overflow: hidden;
        }

        /*
          Uneven organic gold petal — deliberately not a circle.
        */
        .temple-cursor-petal {
          position: fixed;
          pointer-events: none;
          transform-origin: center;

          clip-path: polygon(
            50% 0%,
            73% 8%,
            96% 35%,
            87% 66%,
            58% 100%,
            28% 88%,
            3% 58%,
            15% 24%
          );

          border-radius: 58% 42% 66% 34%;

          background: radial-gradient(
            ellipse at 30% 22%,
            #fff8c8 0%,
            #ffe17a 19%,
            #e9b632 50%,
            #b97009 78%,
            #7d4300 100%
          );

          box-shadow:
            0 0 3px rgba(255, 241, 170, 0.95),
            0 0 8px rgba(243, 186, 53, 0.62),
            0 0 16px rgba(208, 139, 14, 0.28);

          will-change: transform, opacity, width, height, filter;
        }

        /*
          Tiny four-point light particles mixed randomly into the petal trail.
        */
        .temple-cursor-sparkle {
          position: fixed;
          pointer-events: none;
          transform-origin: center;

          clip-path: polygon(
            50% 0%,
            61% 39%,
            100% 50%,
            61% 61%,
            50% 100%,
            39% 61%,
            0% 50%,
            39% 39%
          );

          background: #fff6b2;

          box-shadow:
            0 0 4px rgba(255, 245, 181, 1),
            0 0 10px rgba(247, 195, 61, 0.85),
            0 0 18px rgba(223, 154, 18, 0.42);

          will-change: transform, opacity, width, height, filter;
        }

        /*
          No custom cursor on phone/tablet or for people who disable motion.
        */
        @media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
          .temple-cursor-layer {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}