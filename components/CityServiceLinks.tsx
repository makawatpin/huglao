import Image from "next/image";
import Link from "next/link";
import { CITY_SERVICES, type CitySlug } from "@/data/city-services";

const PICKUPS: Record<CitySlug, string> = {
  vientiane: "ด่าน · สนามบิน · สถานีรถไฟ · โรงแรม",
  "vang-vieng": "สถานีรถไฟ · โรงแรม",
  "luang-prabang": "สนามบิน · สถานีรถไฟ · โรงแรม",
};

export default function CityServiceLinks({ expanded = false }: { expanded?: boolean }) {
  if (!expanded) return <nav aria-label="เหมารถตามเมือง" className="bg-[#f7f3e9] py-8"><div className="hl-shell"><Link href="/car-with-driver/#city-services" className="inline-flex min-h-12 items-center font-bold text-[#0a2d20] underline">เลือกบริการรถตามเมืองที่เริ่มรับ →</Link></div></nav>;
  return <section id="city-services" className="scroll-mt-24 bg-[#f7f3e9] py-12"><div className="hl-shell">
    <h2 className="font-serif-th text-2xl font-bold text-[#0a2d20]">เหมารถเที่ยวลาว เลือกตามเมืองที่เริ่มรับ</h2>
    <p className="mt-3 text-sm leading-7 text-[#59645d]">เลือกเมือง ดูรถและจุดรับ แล้ววางแผนเที่ยวส่วนตัวของคุณ</p>
    <div className="mt-5 grid gap-3 md:grid-cols-3 md:gap-5">{Object.values(CITY_SERVICES).map(c => <Link key={c.slug} href={`/${c.slug}/`} className="group grid min-w-0 grid-cols-[38%_minmax(0,1fr)] overflow-hidden rounded-[22px] border border-[#e4ddcd] bg-white shadow-[0_4px_18px_rgba(10,45,32,.04)] transition duration-200 hover:border-[#b18a2f] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b18a2f] md:flex md:flex-col">
      <div className="relative min-h-36 bg-[#efeadf] md:aspect-[16/10]"><Image src={c.photos[0].src} alt={c.photos[0].alt} fill sizes="(max-width: 767px) 35vw, 30vw" className="object-contain p-2 transition duration-500 group-hover:scale-[1.03] md:p-4" /><span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-[#0a2d20]">ภาพรถในทีม</span></div>
      <div className="flex min-w-0 flex-1 flex-col p-4 md:p-5"><h3 className="font-serif-th text-xl font-bold text-[#0a2d20] md:text-2xl">{c.name}</h3><p className="mt-1 text-xs font-medium leading-6 text-[#86611a]">{c.slug === "vientiane" ? "เก๋ง/SUV · รถตู้ · มินิบัส/รถบัส" : "รถตู้พร้อมคนขับ"}</p><p className="mt-2 text-xs leading-6 text-[#687169]">รับจาก{PICKUPS[c.slug]}</p><span className="mt-auto flex min-h-11 items-center justify-between gap-2 pt-3 text-sm font-bold text-[#0a2d20]">ดูรถและราคา<span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f4e9ca] text-[#86611a] transition-transform group-hover:translate-x-1">→</span></span></div>
    </Link>)}</div>
    <p className="mt-4 text-xs leading-6 text-[#687169]">ภาพตัวอย่างรถในทีม ยืนยันรถคันจริงและรายละเอียดก่อนจอง</p>
    <p className="mt-5 text-sm leading-7 text-[#59645d]">เริ่มจากเวียงจันทน์ไปวังเวียง? <Link className="font-semibold text-[#86611a] underline" href="/routes/vientiane-vang-vieng/">ดูบริการรับจากเวียงจันทน์ → วังเวียง</Link></p>
  </div></section>;
}
