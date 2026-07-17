"use client";

import { useEffect, useRef } from "react";

export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sky = root.querySelector<HTMLElement>("[data-layer='sky']");
    const hills = root.querySelector<HTMLElement>("[data-layer='hills']");
    const temple = root.querySelector<HTMLElement>("[data-layer='temple']");
    const text = root.querySelector<HTMLElement>("[data-layer='text']");

    const coarse =
      window.matchMedia &&
      window.matchMedia("(hover:none),(pointer:coarse),(max-width:820px)").matches;
    const K = coarse ? 0.5 : 1;

    let mx = 0;
    let my = 0;
    let ticking = false;

    const render = () => {
      ticking = false;
      const y = window.scrollY || window.pageYOffset || 0;
      if (y > (window.innerHeight || 800) + 80) return;

      if (sky) sky.style.transform = `translate3d(${mx * 5}px, ${y * 0.72 * K + my * 4}px, 0) scale(1.08)`;
      if (temple) temple.style.transform = `translate3d(${mx * 14}px, ${y * -0.04 * K + my * 5}px, 0)`;
      if (hills) hills.style.transform = `translate3d(${mx * 30}px, ${y * 0.34 * K + my * 15}px, 0) scale(1.05)`;
      if (text) {
        text.style.transform = `translate3d(0, ${y * 0.32}px, 0)`;
        text.style.opacity = String(Math.max(0, 1 - y / 560));
      }
    };

    const requestTick = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    let onMove: ((e: MouseEvent) => void) | null = null;
    if (!coarse) {
      onMove = (e: MouseEvent) => {
        const w = window.innerWidth || 1;
        const h = window.innerHeight || 1;
        mx = (e.clientX / w - 0.5) * 2;
        my = (e.clientY / h - 0.5) * 2;
        requestTick();
      };
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    requestTick();

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      if (onMove) window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
