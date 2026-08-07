import type { Metadata } from "next";
import Image from "next/image";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import { SITE } from "@/data/site";
import { getMedia } from "@/data/media";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description: "รู้จัก HUGLAO ผู้ช่วยจัดหาและประสานรถพร้อมคนขับ เพื่อให้คุณเที่ยวลาวในแบบของตัวเอง",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  ["ลูกค้าเป็นคนเลือก", "ปลายทาง เวลา จุดแวะ และจังหวะการเดินทางเริ่มจากความต้องการของลูกค้า"],
  ["เสนอข้อมูลอย่างตรงไปตรงมา", "ยืนยันประเภทรถ ราคา สิ่งที่รวม และเงื่อนไขก่อนการจอง"],
  ["ขายเท่าที่พร้อม", "บริการหรือเส้นทางที่ยังไม่มีข้อมูลและขั้นตอนชัดเจนจะไม่ถูกนำมาเสนอขาย"],
] as const;

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About HUGLAO"
        title="เชื่อมคนเดินทาง กับคนท้องถิ่นที่พร้อมพาไป"
        description="HUGLAO เป็นบริษัทตัวกลางจัดหาและประสานรถจากพาร์ตเนอร์ ไม่ใช่กรุ๊ปทัวร์ เราช่วยให้ลูกค้าเที่ยวลาวตามแผนของตัวเองได้ง่ายขึ้น"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "เกี่ยวกับเรา" }]}
      />
      <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,120px)]">
        <div className="hl-shell grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] min-h-[320px] overflow-hidden rounded-[30px] bg-[#0a2d20] sm:aspect-[16/10] lg:min-h-[540px]">
            <Image src={getMedia("vientianePatuxai").src} alt={getMedia("vientianePatuxai").alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071d13]/75 to-transparent" />
            <span className="absolute bottom-8 left-8 font-serif-th text-2xl font-semibold text-white">{SITE.slogan}</span>
          </div>
          <div>
            <span className="hl-kicker">เรื่องราวของเรา</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">จากคนที่อยากเที่ยวเอง สู่ผู้ช่วยประสานทริป</h2>
            <div className="mt-7 space-y-5 text-lg leading-9 text-[#59645d]">
              <p>เราอยากเที่ยวด้วยตัวเองโดยไม่ต้องซื้อทัวร์สำเร็จรูป — มีสถานที่มากมายให้สำรวจด้วยตัวเอง ดังนั้น HUGLAO จึงเกิดขึ้นมาเพื่อช่วยให้การเที่ยวลาวด้วยตัวเองเป็นเรื่องง่ายและสะดวกยิ่งขึ้น</p>
              <p>เราเชื่อว่าคนที่อยากเที่ยวลาวด้วยตัวเองควรมีทางเลือกที่ยืดหยุ่นกว่าการเดินทางตามกรุ๊ป</p>
              <p>HUGLAO ทำหน้าที่รับรายละเอียดทริป จัดหาและประสานรถจากพาร์ตเนอร์ พร้อมช่วยให้ข้อมูลระหว่างลูกค้ากับผู้ให้บริการชัดเจนก่อนวันเดินทาง</p>
              <p>บริการรถของเรา ลูกค้ายังคงเป็นคนกำหนดปลายทาง เวลา และจังหวะของทริป</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell">
          <span className="hl-kicker">หลักการทำงาน</span>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map(([title, description], index) => (
              <article key={title} className="hl-card hl-card-hover p-7">
                <span className="font-serif-th text-4xl text-[#d8af4a]">0{index + 1}</span>
                <h2 className="mt-6 text-xl font-bold text-[#0a2d20]">{title}</h2>
                <p className="mt-4 leading-8 text-[#59645d]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <LineCta title="อยากให้ HUGLAO ช่วยวางรถให้ทริปของคุณ?" />
    </main>
  );
}
