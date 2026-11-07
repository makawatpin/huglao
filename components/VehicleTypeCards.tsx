import Image from "next/image";
import Link from "next/link";
import { getMedia } from "@/data/media";
import { VEHICLE_GROUPS, getVehicleHref } from "@/data/site";
import { formatPrice, getPriceVehicle, getStartingPrice } from "@/data/pricing";
const VEHICLES = [...VEHICLE_GROUPS].sort((a, b) => Number(b.slug === "van") - Number(a.slug === "van"));
export default function VehicleTypeCards({ title = "เลือกประเภทรถเที่ยวลาว" }: { title?: string }) {
  return <section id="vehicle-types" className="city-section scroll-mt-24 bg-[#f7f3e9]"><div className="hl-shell"><h2 className="city-heading">{title}</h2><p className="mt-4 leading-8">แตะการ์ดเพื่อดูรายละเอียดรถที่เหมาะกับกลุ่มของคุณ</p>
        <nav aria-label={title} className="mt-6 grid max-w-4xl gap-3">
          {VEHICLES.map(vehicle => {
            const media = getMedia(vehicle.mediaIds[0]);
            const name = vehicle.shortName.replace("เที่ยวลาว", "").trim();
            const priceVehicle = getPriceVehicle(vehicle.slug);
            const price = priceVehicle ? `ราคาเริ่ม ${formatPrice(getStartingPrice(priceVehicle.key))}` : "ขอราคาตามทริป";
            return (
              <Link key={vehicle.slug} href={getVehicleHref(vehicle.slug)} aria-label={`ดูรายละเอียด${name}`} className="group flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-[#ddd4c1] bg-white p-2.5 transition hover:border-[#d8af4a] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#86611a] sm:gap-5 sm:p-3">
                <div className="relative aspect-[4/3] w-[38%] shrink-0 overflow-hidden rounded-xl sm:w-44">
                  <Image src={media.src} alt={media.alt} fill sizes="(max-width: 640px) 34vw, 176px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold leading-snug text-[#0a2d20] sm:text-xl">{vehicle.name}</h3>
                  <p className="mt-1 line-clamp-1 text-xs leading-6 text-[#59645d] sm:text-sm">{vehicle.suitableFor}</p>
                  <div className="mt-2 flex items-center justify-between gap-2"><span className="rounded-full bg-[#edf3ee] px-2.5 py-1 text-xs font-semibold text-[#0a2d20] sm:text-sm">{price}</span><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#ddd4c1] text-[#86611a]">→</span></div>
                </div>
              </Link>
            );
          })}
        </nav>
</div></section>;
}
