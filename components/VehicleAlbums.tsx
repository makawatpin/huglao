import Link from "next/link";
import VanAlbum from "@/components/VanAlbum";
import { getMedia } from "@/data/media";
import { VEHICLE_GROUPS, getVehicleHref } from "@/data/site";

export default function VehicleAlbums({ vehicleSlug }: { vehicleSlug?: string }) {
  const vehicles = vehicleSlug ? VEHICLE_GROUPS.filter(v => v.slug === vehicleSlug) : [...VEHICLE_GROUPS].sort((a, b) => Number(b.slug === "van") - Number(a.slug === "van"));
  return <section id="vehicle-albums" className="city-section scroll-mt-24 bg-[#f7f3e9]"><div className="hl-shell"><h2 className="city-heading">อัลบั้มรถและตัวเลือกการเดินทาง</h2><p className="mt-4 leading-8">เลือกตามจำนวนคนและสัมภาระ เลื่อนดูรูปบนมือถือ แตะภาพเพื่อขยาย แล้วปัดซ้าย–ขวาหรือใช้ปุ่มเพื่อดูภาพถัดไป</p><div className="mt-8 space-y-8">{vehicles.map(vehicle => <article key={vehicle.slug} id={`album-${vehicle.slug}`} className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#ddd4c1] bg-white">
  <header className="bg-[#0a2d20] px-4 py-4 sm:px-6"><h3 className="font-serif-th text-xl font-bold leading-snug text-[#fffaf0] sm:text-2xl">{vehicle.name}</h3></header>
  <div className="p-4 sm:p-6">
    <p className="text-sm leading-[1.6] text-[#46534a]">{vehicle.description}</p>
    <dl className="mt-4 space-y-2 rounded-xl bg-[#f7f3e9] p-3 text-sm leading-[1.6]">
      <div className="flex items-baseline gap-3"><dt className="shrink-0 text-[#59645d]">จำนวนที่นั่ง</dt><dd className="font-semibold text-[#0a2d20]">{vehicle.capacity}</dd></div>
      <div className="flex items-baseline gap-3"><dt className="shrink-0 text-[#59645d]">สัมภาระ</dt><dd className="text-[#46534a]">{vehicle.luggage}</dd></div>
    </dl>
    <VanAlbum compact imageFit="contain" label={`อัลบั้ม${vehicle.shortName}`} groups={[{ title: "ภาพรถในทีมและพาร์ตเนอร์", items: vehicle.mediaIds.map(id => { const p = getMedia(id); return { src: p.src, alt: p.alt, caption: p.alt }; }) }]} />
  </div>
  <footer className="border-t border-[#e8e4db] bg-[#faf8f2] px-4 py-2 sm:px-6"><Link href={getVehicleHref(vehicle.slug)} className="inline-flex min-h-11 items-center text-sm font-semibold text-[#0a2d20] underline underline-offset-4">ดูรายละเอียด{vehicle.shortName} →</Link></footer>
</article>)}</div><p className="mt-6 text-sm leading-7 text-[#59645d]">ภาพตัวอย่างรถในทีมและพาร์ตเนอร์ ยืนยันรถคันจริง รุ่น สี ผังเบาะ และจำนวน/ขนาดกระเป๋าก่อนจอง</p></div></section>;
}
