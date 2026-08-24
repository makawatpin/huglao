import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import PublishedPriceTable from "@/components/PublishedPriceTable";
import { getMedia } from "@/data/media";
import { getCurrentPriceRows } from "@/data/pricing";
import { PICKUP_POINTS, ROUTE_GROUPS } from "@/data/site";

export const metadata: Metadata = {
  title: "เที่ยวลาวกับเรา | เส้นทางจากเวียงจันทน์",
  description: "เที่ยวลาวด้วยตัวเอง ให้คนท้องถิ่นพาไป เลือกเส้นทางจากเวียงจันทน์ เวลา จุดแวะ และจังหวะการเดินทางตามแบบของคุณ",
  alternates: { canonical: "/travel-with-us/" },
};

const QUOTE_DETAILS = [
  "จุดหมายและจุดแวะที่สนใจ",
  "วัน เวลา และระยะเวลาบริการ",
  "จำนวนผู้โดยสาร เด็ก และผู้สูงอายุ",
  "จำนวนและขนาดสัมภาระ",
  "ประเภทรถที่สนใจ",
  "ที่พักหรือจุดรับ–ส่งในแต่ละวัน",
  "บริการเสริมที่ต้องการ",
  "ข้อจำกัดหรือความต้องการพิเศษ",
] as const;

export default function TravelWithUsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Travel your way"
        title="เที่ยวลาวด้วยตัวเอง ให้คนท้องถิ่นพาไป"
        description="HUGLAO ช่วยจัดหาและประสานรถพร้อมคนขับจากพาร์ตเนอร์ สำหรับทริปส่วนตัวที่เริ่มจากเวียงจันทน์"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "เที่ยวลาวกับเรา" }]}
      />

      <section id="routes" className="bg-[#0a2d20] py-[clamp(72px,9vw,120px)] text-white">
        <div className="hl-shell">
          <div className="max-w-[820px]">
            <span className="hl-kicker !text-[#efd276]">เส้นทางจากเวียงจันทน์</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.3rem,5vw,4.4rem)] font-bold leading-tight">เลือกเส้นทาง แล้วปรับจังหวะให้เป็นของคุณ</h2>
            <p className="mt-5 text-lg leading-8 text-[#c8d3cc]">ทุกเส้นทางเริ่มบริการจากจุดรับฝั่งเวียงจันทน์ แสดงเฉพาะกลุ่มเส้นทางที่ HUGLAO กำหนดไว้ และยังต้องตรวจรถว่าง ระยะเวลา และราคาจริงก่อนยืนยัน</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ROUTE_GROUPS.map((route) => {
              const media = getMedia(route.mediaId);
              return (
                <Link key={route.slug} href={`/routes/${route.slug}`} className="hl-mobile-media-card group overflow-hidden rounded-[26px] border border-white/10 bg-white/[.06] transition hover:-translate-y-1 hover:border-[#d8af4a]/70">
                  <div className="hl-mobile-media relative aspect-[4/3] overflow-hidden bg-white/5 sm:aspect-[16/10]">
                    <Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 112px, (max-width: 1024px) 50vw, 33vw" className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100" />
                  </div>
                  <div className="hl-mobile-content p-7">
                    <h3 className="font-serif-th text-2xl font-bold">{route.name}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#c8d3cc]">{route.summary}</p>
                    <span className="mt-6 block text-sm font-bold text-[#efd276]">ดูรายละเอียดเส้นทาง →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-[#f7f3e9] py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell">
          <span className="hl-kicker">ราคาปัจจุบัน</span>
          <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">ราคารถรับ–ส่งและเหมาทริปจากเวียงจันทน์</h2>
          <p className="mb-8 mt-5 max-w-[820px] leading-8 text-[#59645d]">รวมราคาที่ HUGLAO ยืนยันแล้วสำหรับรถเก๋ง/SUV, MPV และรถตู้ โดยราคาของ MPV แสดงแยกจาก SUV อย่างชัดเจน</p>
          <PublishedPriceTable rows={getCurrentPriceRows()} />
        </div>
      </section>

      <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <span className="hl-kicker">เตรียมข้อมูลก่อนขอราคา</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">รายละเอียดครบ ช่วยให้เลือกรถและเสนอราคาได้ตรงขึ้น</h2>
            <p className="mt-5 leading-8 text-[#59645d]">ไม่จำเป็นต้องมีแผนสมบูรณ์ตั้งแต่ครั้งแรก ส่งข้อมูลที่ทราบก่อน แล้วทีมงานจะช่วยตรวจรายการที่ยังต้องยืนยัน</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {QUOTE_DETAILS.map((item, index) => (
              <article key={item} className="rounded-[22px] border border-[#ddd4c1] bg-white p-6">
                <span className="text-xs font-bold text-[#d8af4a]">0{index + 1}</span>
                <h3 className="mt-4 font-semibold text-[#0a2d20]">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[clamp(64px,8vw,100px)]">
        <div className="hl-shell">
          <span className="hl-kicker">จุดรับหลักฝั่งเวียงจันทน์</span>
          <h2 className="mt-5 max-w-[760px] font-serif-th text-[clamp(2.1rem,4.5vw,3.7rem)] font-bold leading-tight text-[#071d13]">เลือกจุดนัดหมายให้ตรงกับการเดินทางของคุณ</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {PICKUP_POINTS.map((point) => {
              const media = getMedia(point.mediaId);
              return (
                <article key={point.slug} className="hl-mobile-media-card overflow-hidden rounded-[24px] border border-[#ddd4c1] bg-white">
                  <div className="hl-mobile-media relative aspect-[16/10] overflow-hidden bg-[#e8e1d2]">
                    <Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 112px, 33vw" className="object-cover" />
                  </div>
                  <div className="hl-mobile-content p-6">
                    <h3 className="font-semibold text-[#0a2d20]">{point.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#59645d]">{point.detail}</p>
                    <p className="mt-4 text-xs leading-6 text-[#9b711c]">ทีมงานจะยืนยันตำแหน่งและเวลานัดพบในข้อเสนอก่อนเดินทาง</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <LineCta title="พร้อมวางแผนเที่ยวลาวในแบบของคุณ?" description="ส่งวันเดินทาง จำนวนคน สัมภาระ จุดรับ และเส้นทางที่สนใจผ่าน LINE เพื่อให้ทีมงานตรวจรถและจัดทำข้อเสนอ" />
    </main>
  );
}
