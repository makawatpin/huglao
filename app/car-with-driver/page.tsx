import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import PublishedPriceTable from "@/components/PublishedPriceTable";
import { BOOKING_STEPS, HOME_FAQS, VEHICLE_GROUPS } from "@/data/site";
import { getMedia } from "@/data/media";
import { getCurrentPriceRows, getPriceVehicle } from "@/data/pricing";

export const metadata: Metadata = {
  title: "จองรถพร้อมคนขับเที่ยวลาว",
  description: "เลือกรถเก๋ง SUV MPV รถตู้ VIP มินิบัส หรือรถบัส พร้อมคนขับ",
  alternates: { canonical: "/car-with-driver" },
};

export default function CarWithDriverPage() {
  return (
    <main>
      <PageHero
        eyebrow="Private car with driver"
        title="จองรถพร้อมคนขับ เที่ยวลาวตามแผนของคุณ"
        description="เลือกประเภทรถตามจำนวนผู้โดยสาร สัมภาระ และรูปแบบทริป โดยทีม HUGLAO ช่วยจัดหาและประสานรถจากพาร์ตเนอร์"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "จองรถพร้อมคนขับ" }]}
      />

      <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,120px)]">
        <div className="hl-shell">
          <div className="max-w-[800px]">
            <span className="hl-kicker">ประเภทรถที่ให้บริการ</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">เลือกรถให้เหมาะกับคน สัมภาระ และระยะทาง</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {VEHICLE_GROUPS.map((vehicle, index) => {
              const media = getMedia(vehicle.mediaIds[0]);
              return <article id={vehicle.slug} key={vehicle.slug} className="hl-mobile-media-card scroll-mt-28 overflow-hidden rounded-[28px] border border-[#ddd4c1] bg-white shadow-[0_20px_60px_rgba(27,49,37,.06)]">
                <div className="hl-mobile-media relative aspect-[4/3] bg-[#e8e3d6] sm:aspect-[16/10]">
                  <Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 112px, 50vw" className="object-cover" />
                </div>
                <div className="hl-mobile-content p-6 sm:p-8">
                  <span className="text-xs font-bold tracking-[.18em] text-[#9b711c]">0{index + 1}</span>
                  <h2 className="mt-5 font-serif-th text-3xl font-bold text-[#0a2d20]">{vehicle.name}</h2>
                  <p className="mt-4 leading-8 text-[#59645d]">{vehicle.description}</p>
                  <p className="mt-6 border-t border-[#ece6d9] pt-5 text-sm font-semibold text-[#0a2d20]">{getPriceVehicle(vehicle.slug) ? "มีราคายืนยันแล้วในตารางด้านล่าง" : "ขอราคาแยกตามรายละเอียดทริป"}</p>
                  <Link href={`/car-with-driver/${vehicle.slug}`} className="mt-6 inline-flex font-bold text-[#9b711c]">ดูรายละเอียด{vehicle.name} →</Link>
                </div>
              </article>;
            })}
          </div>
          <p className="mt-5 text-xs leading-6 text-[#687169]">ภาพประกอบใช้เพื่ออธิบายหมวดรถเท่านั้น รุ่น ปีรถ สี ผังที่นั่ง และพื้นที่สัมภาระจริงจะยืนยันตามรถพาร์ตเนอร์ที่ว่าง</p>
        </div>
      </section>

      <section id="pricing" className="bg-[#efe8d9] py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell">
          <span className="hl-kicker">ตารางราคาปัจจุบัน</span>
          <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">ราคารถพร้อมคนขับที่ยืนยันแล้ว</h2>
          <p className="mb-8 mt-5 max-w-[820px] leading-8 text-[#59645d]">แสดงราคาครบทั้งเที่ยวเดียว รับ–ส่ง และเหมาทริปสำหรับเก๋ง/SUV, MPV และรถตู้ ส่วนรถตู้ VIP มินิบัส และรถบัสต้องขอราคาแยกตามงาน</p>
          <PublishedPriceTable rows={getCurrentPriceRows()} />
        </div>
      </section>

      <section className="bg-white py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell">
          <span className="hl-kicker">เปรียบเทียบประเภทรถ</span>
          <div className="mt-8 grid gap-4 md:hidden">
            {VEHICLE_GROUPS.map((vehicle) => (
              <article key={vehicle.slug} className="rounded-[22px] border border-[#ddd4c1] p-5">
                <h3 className="font-bold text-[#0a2d20]">{vehicle.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[#59645d]">{vehicle.description}</p>
                <p className="mt-4 text-sm font-semibold text-[#9b711c]">{getPriceVehicle(vehicle.slug) ? "มีราคายืนยันแล้ว" : "ขอราคาตามทริป"}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 hidden overflow-x-auto rounded-[24px] border border-[#ddd4c1] md:block">
            <table className="min-w-[760px] w-full border-collapse text-left">
              <thead className="bg-[#0a2d20] text-white">
                <tr><th className="p-5">กลุ่มรถ</th><th className="p-5">เหมาะกับ</th><th className="p-5">การเสนอราคา</th></tr>
              </thead>
              <tbody>
                {VEHICLE_GROUPS.map((vehicle) => (
                  <tr key={vehicle.slug} className="border-b border-[#ece6d9] last:border-0">
                    <th className="p-5 text-[#0a2d20]">{vehicle.name}</th>
                    <td className="p-5 text-[#59645d]">{vehicle.description}</td>
                    <td className="p-5 font-semibold text-[#9b711c]">{getPriceVehicle(vehicle.slug) ? "มีราคายืนยันแล้ว" : "ขอราคาตามทริป"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-[#687169]">MPV แยกจาก SUV และแสดงราคาในคอลัมน์ของตัวเอง ส่วนรถตู้ VIP มินิบัส และรถบัสยังต้องขอราคาแยกตามงาน</p>
        </div>
      </section>

      <section className="bg-[#efe8d9] py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell">
          <span className="hl-kicker">ขั้นตอนการจอง</span>
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {BOOKING_STEPS.map((step) => (
              <article key={step.number} className="rounded-[24px] bg-white p-7">
                <span className="font-serif-th text-4xl text-[#d8af4a]">{step.number}</span>
                <h2 className="mt-6 text-lg font-bold text-[#0a2d20]">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#59645d]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell max-w-[900px]">
          <span className="hl-kicker">คำถามเรื่องรถและการจอง</span>
          <div className="mt-8 divide-y divide-[#ddd4c1] border-y border-[#ddd4c1]">
            {HOME_FAQS.map((faq) => (
              <details key={faq.question} className="py-1">
                <summary className="cursor-pointer py-5 font-semibold text-[#0a2d20]">{faq.question}</summary>
                <p className="pb-6 leading-8 text-[#59645d]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <LineCta />
    </main>
  );
}
