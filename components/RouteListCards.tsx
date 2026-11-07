import Image from "next/image";
import Link from "next/link";
import { getMedia } from "@/data/media";
import { ROUTE_GROUPS } from "@/data/site";

const CITY_TRIPS = [
  { href: "/vientiane/", name: "เที่ยวเวียงจันทน์", origin: "เวียงจันทน์", summary: "เลือกแวะวัด ย่านเมือง และสถานที่ที่สนใจ", media: getMedia("vientianePatuxai") },
  { href: "/vang-vieng/", name: "เที่ยววังเวียง", origin: "วังเวียง", summary: "เที่ยวธรรมชาติ บลูลากูน จุดชมวิว และคาเฟ่", media: getMedia("vangVieng") },
  { href: "/luang-prabang/", name: "เที่ยวหลวงพระบาง", origin: "หลวงพระบาง", summary: "เที่ยวในเมือง ตาดกวางสี และจุดแวะตามแผน", media: { src: "/assets/dest-luangprabang.webp", alt: "อาคารวัดและสวนในภาพประกอบหลวงพระบาง" } },
];
const TRIPS = [
  ...CITY_TRIPS,
  ...ROUTE_GROUPS.map(route => ({ href: `/routes/${route.slug}/`, name: route.name.replaceAll("–", " → "), origin: "เวียงจันทน์", summary: route.summary, media: getMedia(route.mediaId) })),
];

export default function RouteListCards() {
  return <section id="routes" className="scroll-mt-24 bg-[#0a2d20] py-9 text-white sm:py-14">
    <div className="hl-shell">
      <h2 className="font-serif-th text-2xl font-bold leading-snug text-[#fffaf0] sm:text-3xl">เลือกเส้นทาง แล้วปรับจังหวะให้เป็นของคุณ</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#c8d3cc]">เลือกเที่ยวจากเมืองที่คุณอยู่ หรือเดินทางต่อระหว่างเมือง ดูจุดเริ่มรับของแต่ละเส้นทาง แล้วเลือกแผนที่ตรงกับคุณ</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {TRIPS.map(route => {
          const media = route.media;
          return <Link key={route.href} href={route.href} className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/[.055] p-2.5 transition hover:border-[#d8af4a] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#efd276] sm:gap-4 sm:p-3">
            <div className="relative aspect-[16/10] w-[42%] shrink-0 overflow-hidden rounded-xl"><Image src={media.src} alt={media.alt} fill sizes="(max-width: 640px) 38vw, (max-width: 1023px) 35vw, 22vw" className="object-cover transition duration-300 group-hover:scale-105" /></div>
            <div className="min-w-0 flex-1 py-1"><h3 className="text-base font-semibold leading-snug text-[#fffaf0] sm:text-lg">{route.name}</h3><p className="mt-1 text-xs font-semibold leading-5 text-[#efd276]">เริ่มรับใน{route.origin}</p><p className="mt-1 line-clamp-1 text-xs leading-6 text-[#c8d3cc] sm:text-sm">{route.summary}</p><span className="mt-1 inline-flex min-h-9 items-center text-xs font-semibold text-[#efd276] sm:text-sm">ดูรายละเอียด →</span></div>
          </Link>;
        })}
      </div>
    </div>
  </section>;
}
