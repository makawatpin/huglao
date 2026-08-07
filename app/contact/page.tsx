import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ติดต่อ HUGLAO เพื่อขอราคารถพร้อมคนขับจากเวียงจันทน์ผ่าน LINE OA โทรศัพท์ หรืออีเมล",
  alternates: { canonical: "/contact" },
};

const TRIP_DETAILS = ["วันเดินทาง", "จำนวนผู้โดยสาร", "จำนวนและขนาดสัมภาระ", "ปลายทาง", "ระยะเวลาที่ใช้รถ", "ประเภทรถที่สนใจ"] as const;

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact HUGLAO"
        title="ส่งรายละเอียดทริป แล้วให้เราช่วยประสานรถ"
        description="LINE OA เป็นช่องทางหลักสำหรับขอราคา ส่งข้อมูลให้ครบเพื่อช่วยให้ทีมตรวจรถและจัดทำข้อเสนอได้เร็วขึ้น"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "ติดต่อเรา" }]}
      />
      <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,120px)]">
        <div className="hl-shell grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[30px] bg-[#0a2d20] p-[clamp(28px,5vw,52px)] text-white">
            <span className="text-xs font-bold uppercase tracking-[.18em] text-[#efd276]">ข้อมูลที่ควรส่ง</span>
            <h2 className="mt-5 font-serif-th text-3xl font-bold">ช่วยให้เราเสนอรถได้ตรงทริป</h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {TRIP_DETAILS.map((detail, index) => (
                <li key={detail} className="rounded-[18px] border border-white/10 bg-white/[.05] p-5">
                  <span className="mr-3 text-[#efd276]">0{index + 1}</span>{detail}
                </li>
              ))}
            </ol>
          </div>
          <div className="grid content-start gap-4">
            <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-card hl-card-hover p-7">
              <span className="text-xs font-bold tracking-[.15em] text-[#9b711c]">ช่องทางหลัก</span>
              <strong className="mt-3 block text-xl text-[#0a2d20]">LINE OA — ส่งรายละเอียดและขอราคา</strong>
            </a>
            <a href={SITE.phoneHref} className="hl-card hl-card-hover p-7">
              <span className="text-sm text-[#687169]">โทรศัพท์</span><strong className="mt-2 block text-xl text-[#0a2d20]">{SITE.phoneDisplay}</strong>
            </a>
            <a href={`mailto:${SITE.email}`} className="hl-card hl-card-hover p-7">
              <span className="text-sm text-[#687169]">อีเมล</span><strong className="mt-2 block text-xl text-[#0a2d20]">{SITE.email}</strong>
            </a>
            <div className="hl-card p-7">
              <span className="text-sm text-[#687169]">ข้อมูลบริษัท</span>
              <p className="mt-3 text-sm text-[#0a2d20] font-semibold">{SITE.legalName}</p>
              <p className="mt-2 text-sm leading-7 text-[#59645d]">{SITE.registeredAddress}</p>
              <p className="mt-3 text-sm text-[#59645d]">เลขนิติบุคคล {SITE.registrationNumber}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
