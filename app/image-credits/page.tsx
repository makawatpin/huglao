import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { MEDIA_LIBRARY } from "@/data/media";

export const metadata: Metadata = {
  title: "ที่มาและใบอนุญาตภาพ",
  description: "ที่มา ผู้สร้าง และใบอนุญาตของภาพประกอบที่ HUGLAO นำมาใช้บนเว็บไซต์",
  alternates: { canonical: "/image-credits" },
};

export default function ImageCreditsPage() {
  const images = Object.values(MEDIA_LIBRARY);

  return (
    <main>
      <PageHero
        eyebrow="Image Credits"
        title="ที่มาและใบอนุญาตภาพ"
        description="เราใช้ภาพที่มีหน้าต้นฉบับและเงื่อนไขการนำกลับมาใช้ชัดเจน พร้อมระบุผู้สร้าง ใบอนุญาต และการปรับไฟล์"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "ที่มาและใบอนุญาตภาพ" }]}
      />

      <section className="bg-[#f7f3e9] py-[clamp(64px,8vw,105px)]">
        <div className="hl-shell">
          <div className="mb-10 max-w-[820px] rounded-[24px] border border-[#ddd4c1] bg-white p-7 leading-8 text-[#59645d]">
            <p>
              “Public Domain” หมายถึงภาพที่ผู้สร้างสละสิทธิ์หรือไม่มีข้อจำกัดด้านลิขสิทธิ์ตามที่หน้าต้นฉบับระบุ ส่วนภาพ Creative Commons ยังมีลิขสิทธิ์ แต่เจ้าของอนุญาตให้นำไปใช้ได้เมื่อปฏิบัติตามเงื่อนไขของใบอนุญาต
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {images.map((item) => (
              <article key={item.src} className="hl-mobile-media-card overflow-hidden rounded-[26px] border border-[#ddd4c1] bg-white shadow-[0_18px_45px_rgba(27,49,37,.06)]">
                <div className="hl-mobile-media relative aspect-[4/3] bg-[#dfe8df] sm:aspect-[16/10]">
                  <Image src={item.src} alt={item.alt} fill sizes="(max-width: 639px) 112px, 50vw" className="object-cover" />
                </div>
                <div className="hl-mobile-content p-7">
                  <h2 className="font-serif-th text-2xl font-bold text-[#0a2d20]">{item.title}</h2>
                  <dl className="mt-5 grid gap-x-4 gap-y-2 text-sm leading-6 sm:grid-cols-[auto_1fr] sm:gap-y-3">
                    <dt className="font-semibold text-[#0a2d20]">ผู้สร้าง</dt>
                    <dd className="text-[#59645d]">{item.author}</dd>
                    <dt className="font-semibold text-[#0a2d20]">ใบอนุญาต</dt>
                    <dd><a href={item.licenseUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#9b711c] hover:underline">{item.license}</a></dd>
                    <dt className="font-semibold text-[#0a2d20]">การปรับไฟล์</dt>
                    <dd className="text-[#59645d]">{item.changes}</dd>
                  </dl>
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex text-sm font-bold text-[#9b711c] hover:text-[#0a2d20]">เปิดหน้าภาพต้นฉบับ →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
