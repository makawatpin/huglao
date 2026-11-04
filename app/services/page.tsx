import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import { SERVICE_GROUPS } from "@/data/site";
import { getMedia } from "@/data/media";

export const metadata: Metadata = {
  title: "บริการอื่น ๆ",
  description: "บริการเสริมที่พร้อมตรวจและประสานสำหรับทริปลาว ได้แก่ รถไฟ ไกด์ท้องถิ่น วางแผนทริป และบัตรผ่านแดนชั่วคราว",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Additional services"
        title="บริการเสริมที่ช่วยให้ทริปต่อกันง่ายขึ้น"
        description="เลือกใช้เฉพาะบริการที่ต้องการ HUGLAO จะช่วยประสานให้เข้ากับแผนส่วนตัวของคุณ โดยไม่ขายเกินบริการที่พร้อมดำเนินงาน"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บริการอื่น ๆ" }]}
      />
      <section className="bg-[#f7f3e9] py-[clamp(52px,9vw,120px)]">
        <div className="hl-shell">
          <span className="hl-kicker">พร้อมเปิดให้บริการ</span>
          <div className="mt-7 grid gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {SERVICE_GROUPS.map((service) => {
              const media = getMedia(service.mediaId);
              return <article key={service.slug} className="hl-mobile-media-card hl-card-hover relative flex flex-col overflow-hidden rounded-[22px] border border-[#ddd4c1] bg-white shadow-[0_16px_45px_rgba(7,29,19,.06)]">
                <div className="hl-mobile-media relative aspect-[16/10] bg-[#e8e3d6]">
                  <Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 44vw, (max-width: 1023px) 50vw, 25vw" className="object-cover" />
                </div>
                <div className="hl-mobile-content flex flex-1 flex-col p-5">
                  <span className="text-[.7rem] font-bold tracking-[.15em] text-[#86611a]">พร้อมประสาน</span>
                  <h2 className="mt-2 font-serif-th text-xl font-bold leading-snug text-[#0a2d20]">{service.name}</h2>
                  <p className="mt-2 text-sm sm:line-clamp-3 leading-6 text-[#59645d]">{service.summary}</p>
                  <Link href={`/services/${service.slug}`} className="mt-auto inline-flex min-h-11 items-center text-sm sm:pt-2 font-bold text-[#86611a] after:absolute after:inset-0 after:content-['']">ดูรายละเอียด →</Link>
                </div>
              </article>;
            })}
          </div>
        </div>
      </section>
      <LineCta title="ต้องการเพิ่มบริการใดในทริป?" />
    </main>
  );
}
