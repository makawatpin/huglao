"use client";

import { useSyncExternalStore, type ReactNode, type KeyboardEvent } from "react";

const subscribe = (notify: () => void) => { window.addEventListener("hashchange", notify); return () => window.removeEventListener("hashchange", notify); };
const getHash = () => window.location.hash;
const serverHash = () => "";

export default function CityPriceTabs({ cities, panels }: { cities: { slug: string; name: string }[]; panels: ReactNode[] }) {
  const hash = useSyncExternalStore(subscribe, getHash, serverHash);
  const active = cities.find(c => hash === `#city-price-${c.slug}`)?.slug ?? cities[0]?.slug;
  function select(slug: string) {
    window.history.replaceState(null, "", `#city-price-${slug}`);
    window.dispatchEvent(new Event("hashchange"));
  }
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % cities.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + cities.length) % cities.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = cities.length - 1;
    else return;
    event.preventDefault(); select(cities[next].slug); document.getElementById(`price-tab-${cities[next].slug}`)?.focus();
  }
  return <>
    {cities.length > 1 && <div role="tablist" aria-label="เลือกเมืองในตารางราคา" className="mb-5 grid grid-cols-3 gap-1 rounded-2xl border border-[#ddd4c1] bg-[#eee8da] p-1">{cities.map((c, index) => <button key={c.slug} type="button" role="tab" id={`price-tab-${c.slug}`} aria-controls={`price-panel-${c.slug}`} aria-selected={active === c.slug} tabIndex={active === c.slug ? 0 : -1} onClick={() => select(c.slug)} onKeyDown={event => onKey(event, index)} className={`min-h-12 rounded-xl px-2 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b18a2f] ${active === c.slug ? "bg-[#0a2d20] text-white shadow-sm" : "text-[#59645d] hover:bg-white/70"}`}>{c.name}</button>)}</div>}
    {cities.map((c, index) => <div key={c.slug} data-city-price-panel id={`price-panel-${c.slug}`} role={cities.length > 1 ? "tabpanel" : undefined} aria-labelledby={cities.length > 1 ? `price-tab-${c.slug}` : undefined} hidden={active !== c.slug}>{panels[index]}</div>)}
    <noscript><style>{"[data-city-price-panel]{display:block!important;margin-bottom:24px}"}</style></noscript>
  </>;
}
