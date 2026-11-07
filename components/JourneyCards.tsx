import Image from "next/image";
import Link from "next/link";
import { getMedia } from "@/data/media";
import { ROUTE_GROUPS } from "@/data/site";

const JOURNEYS = [
  { slug: "vientiane-city", title: "เวียงจันทน์", tag: "เมืองและวัด" },
  { slug: "vientiane-vang-vieng", title: "วังเวียง", tag: "ภูเขาและธรรมชาติ" },
  { slug: "vientiane-muang-feuang", title: "เมืองเฟือง", tag: "พักสายตากับวิวเขา" },
  { slug: "vientiane-nam-ngum", title: "น้ำงึม", tag: "วิวอ่างเก็บน้ำ" },
] as const;

export default function JourneyCards({ allRoutes = false, id = "journeys", title = "เลือกเส้นทาง แล้วเติมสไตล์ของคุณ" }: { allRoutes?: boolean; id?: string; title?: string }) {
  const journeys = allRoutes ? ROUTE_GROUPS.map(route => JOURNEYS.find(j => j.slug === route.slug) ?? { slug: route.slug, title: route.name.replace(/^เวียงจันทน์–/, ""), tag: route.highlights[0] }) : JOURNEYS;
  return <section id={id} className="scroll-mt-24 bg-[#0a2d20] py-14 text-white sm:py-20"><div className="hl-shell">
    <p className="text-xs font-bold tracking-widest text-[#efd276]">ไอเดียสำหรับทริปครั้งต่อไป</p>
    <h2 className="city-heading mt-3 text-white">{title}</h2>
    <p className="mt-3 text-sm leading-7 text-[#d5ddd7]">เริ่มรับจากเวียงจันทน์ เลือกจุดหมายที่ชอบ แล้วคุยแผนและจุดแวะกับเรา</p>
    <div className="mt-6 grid gap-4 lg:grid-cols-2">{journeys.map(j => {
      const route = ROUTE_GROUPS.find(r => r.slug === j.slug)!;
      const media = getMedia(route.mediaId);
      return <Link key={j.slug} href={`/routes/${j.slug}/`} className="group flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-white/15 bg-white/[.055] p-2.5 transition hover:border-[#efd276] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#efd276] sm:gap-4 sm:p-3" aria-label={`ดูเส้นทาง${route.name}`}>
        <div className="relative aspect-[16/10] w-[42%] shrink-0 overflow-hidden rounded-xl"><Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 38vw, (max-width: 1023px) 35vw, 22vw" className="object-cover transition duration-300 group-hover:scale-105" /></div>
        <div className="min-w-0 flex-1 py-1"><h3 className="text-base font-semibold leading-snug text-[#fffaf0] sm:text-lg">{route.name}</h3><p className="mt-1 text-xs font-semibold leading-5 text-[#efd276]">เริ่มรับในเวียงจันทน์</p><p className="mt-1 line-clamp-1 text-xs leading-6 text-[#c8d3cc] sm:text-sm">{route.highlights.slice(0, 2).join(" · ")}</p><span className="mt-1 inline-flex min-h-9 items-center text-xs font-semibold text-[#efd276] sm:text-sm">ดูรายละเอียด →</span></div>
      </Link>;
    })}</div>
    {!allRoutes && <Link href="/travel-with-us/" className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[#efd276] underline underline-offset-4">ดูเส้นทางทั้งหมด <span aria-hidden="true">→</span></Link>}
  </div></section>;
}
