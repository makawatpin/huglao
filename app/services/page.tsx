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
      <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,120px)]">
        <div className="hl-shell">
          <span className="hl-kicker">พร้อมเปิดให้บริการ</span>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_GROUPS.map((service) => {
              const media = getMedia(service.mediaId);
              return <article key={service.slug} className="hl-mobile-media-card hl-card-hover overflow-hidden rounded-[26px] border border-[#ddd4c1] bg-white shadow-[0_16px_45px_rgba(7,29,19,.06)]">
                <div className="hl-mobile-media relative aspect-[4/3] bg-[#e8e3d6] sm:aspect-[16/10]">
                  <Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 112px, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                </div>
                <div className="hl-mobile-content p-6 sm:p-7">
                  <span className="text-xs font-bold tracking-[.15em] text-[#9b711c]">พร้อมประสาน</span>
                  <h2 className="mt-5 font-serif-th text-2xl font-bold text-[#0a2d20]">{service.name}</h2>
                  <p className="mt-4 text-sm leading-7 text-[#59645d]">{service.summary}</p>
                  <Link href={`/services/${service.slug}`} className="mt-6 inline-flex text-sm font-bold text-[#9b711c]">ดูรายละเอียด →</Link>
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
