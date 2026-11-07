import Link from "next/link";
import Image from "next/image";
import { getMedia } from "@/data/media";
import { PICKUP_POINTS } from "@/data/site";

export default function VientianePickupPoints() {
  return (
      <section className="bg-[#f7f3e9] py-[clamp(48px,8vw,100px)]">
        <div className="hl-shell">
          <span className="hl-kicker">จุดรับหลักฝั่งเวียงจันทน์</span>
          <h2 className="mt-5 max-w-[760px] font-serif-th text-[clamp(2.1rem,4.5vw,3.7rem)] font-bold leading-tight text-[#071d13]">เลือกจุดนัดหมายให้ตรงกับการเดินทางของคุณ</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PICKUP_POINTS.map((point) => {
              const media = getMedia(point.mediaId);
              return (
                <article key={point.slug} className="hl-mobile-media-card overflow-hidden rounded-[24px] border border-[#ddd4c1] bg-white">
                  <div className="hl-mobile-media relative aspect-[16/10] overflow-hidden bg-[#e8e1d2]">
                    <Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 44vw, (max-width: 1023px) 50vw, 25vw" className="object-cover" />
                  </div>
                  <div className="hl-mobile-content p-5">
                    <h3 className="font-semibold text-[#0a2d20]"><Link href={`/articles/${point.slug}/`} className="underline decoration-[#d8af4a] underline-offset-4">{point.name} →</Link></h3>
                    <p className="mt-2 text-sm leading-6 text-[#59645d]">{point.detail}</p>
                    <p className="mt-3 text-xs leading-6 text-[#59645d]">ทีมงานจะยืนยันตำแหน่งและเวลานัดพบในข้อเสนอก่อนเดินทาง</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
  );
}
