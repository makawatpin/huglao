"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type VanAlbumGroup = {
  title: string;
  items: { src: string; alt: string; caption: string }[];
};

export default function VanAlbum({ groups }: { groups: VanAlbumGroup[] }) {
  const flat = groups.flatMap((group) => group.items);
  const [active, setActive] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const step = useCallback(
    (delta: number) => setActive((current) => (current === null ? current : (current + delta + flat.length) % flat.length)),
    [flat.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, step]);

  const starts = groups.map((_, i) => groups.slice(0, i).reduce((total, g) => total + g.items.length, 0));
  const current = active === null ? null : flat[active];

  return (
    <>
      <div className="mt-8 space-y-9">
        {groups.map((group, groupIndex) => {
          const start = starts[groupIndex];
          return (
            <div key={group.title}>
              <h3 className="flex items-baseline justify-between text-sm font-bold tracking-[.12em] text-[#9b711c]">
                {group.title}
                <span className="text-xs font-semibold tracking-normal text-[#59645d] sm:hidden">{group.items.length} ภาพ · เลื่อนดู →</span>
              </h3>
              <div className="-mx-1 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
                {group.items.map((item, i) => (
                  <figure key={item.src} className="w-[64%] shrink-0 snap-start overflow-hidden rounded-[18px] border border-[#ddd4c1] bg-[#f9f6ef] sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setActive(start + i)}
                      className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden"
                      aria-label={`ขยายภาพ: ${item.caption}`}
                    >
                      <Image src={item.src} alt={item.alt} fill sizes="(max-width: 639px) 64vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
                    </button>
                    <figcaption className="px-3 py-2 text-xs font-semibold leading-5 text-[#0a2d20] sm:px-4 sm:py-3 sm:text-sm sm:leading-normal">{item.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {current && active !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="อัลบั้มรถตู้"
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 text-white"
          onClick={() => setActive(null)}
          onTouchStart={(event) => {
            touchX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchX.current === null) return;
            const dx = event.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-sm" onClick={(event) => event.stopPropagation()}>
            <span>{active + 1} / {flat.length}</span>
            <button type="button" onClick={() => setActive(null)} className="rounded-full border border-white/30 px-4 py-1.5 font-semibold" aria-label="ปิด">
              ปิด ✕
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" priority />
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 rounded-full bg-black/50 text-xl sm:block"
              aria-label="ภาพก่อนหน้า"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 rounded-full bg-black/50 text-xl sm:block"
              aria-label="ภาพถัดไป"
            >
              ›
            </button>
          </div>
          <p className="px-4 py-4 text-center text-sm font-semibold" onClick={(event) => event.stopPropagation()}>
            {current.caption}
            <span className="mt-1 block text-xs font-normal text-white/60 sm:hidden">ปัดซ้าย-ขวาเพื่อดูภาพถัดไป</span>
          </p>
        </div>
      ) : null}
    </>
  );
}
