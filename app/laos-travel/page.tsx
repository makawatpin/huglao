import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import Reveal from "@/components/Reveal";
import { DESTINATIONS } from "@/data/destinations";

export const metadata: Metadata = {
  title: "เที่ยวลาว: เวียงจันทน์ เมืองเฟือง วังเวียง หลวงพระบาง | Huglao Group",
  description:
    "รวมเมืองเที่ยวลาวยอดนิยม เวียงจันทน์ เมืองเฟือง วังเวียง หลวงพระบาง พร้อมรถตู้ VIP พร้อมคนขับ เลือกเมืองที่สนใจเพื่อดูสถานที่เที่ยว โปรแกรม และราคา",
  alternates: { canonical: "/laos-travel" },
  openGraph: {
    title: "เที่ยวลาว: เวียงจันทน์ เมืองเฟือง วังเวียง หลวงพระบาง",
    description: "รวมเมืองเที่ยวลาวยอดนิยมพร้อมรถตู้ VIP พร้อมคนขับ",
    type: "website",
  },
};

/** เฉพาะเมืองที่ต้องการโชว์ในหน้ารวมนี้ — ปากเซและเมืองอื่นที่ hidden ยังไม่โชว์ตรงนี้ */
const featuredOrder = ["vientiane", "muangfeuang", "vangvieng", "luangprabang"];

const ARTICLE_UPDATED = "2026-07-23";

export default function LaosTravelPage() {
  const featuredDestinations = featuredOrder
    .map((slug) => DESTINATIONS.find((d) => d.citySlug === slug))
    .filter((d): d is (typeof DESTINATIONS)[number] => !!d);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "คู่มือเที่ยวลาวฉบับสมบูรณ์ 2026: เวียงจันทน์ วังเวียง หลวงพระบาง",
            description:
              "คู่มือเที่ยวลาวจากทีม HUGLAO GROUP ผู้ให้บริการรถตู้ VIP เส้นทางไทย-ลาวมากว่า 10 ปี ครอบคลุมช่วงเวลาเที่ยว เอกสารข้ามแดน งบประมาณ และการเดินทางระหว่างเมือง",
            author: {
              "@type": "Organization",
              name: "HUGLAO GROUP",
              url: "https://huglao.com/about",
            },
            reviewedBy: { "@type": "Person", name: "ทีมงานปฏิบัติการ HUGLAO GROUP" },
            publisher: {
              "@type": "Organization",
              name: "บริษัท ฮักลาว กรุ๊ป จำกัด",
              logo: { "@type": "ImageObject", url: "https://huglao.com/assets/huglao-emblem.png" },
            },
            datePublished: "2025-01-10",
            dateModified: ARTICLE_UPDATED,
            mainEntityOfPage: "https://huglao.com/laos-travel",
          }),
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "หน้าแรก", href: "/" },
          { name: "เที่ยวลาว", href: "/laos-travel" },
        ]}
      />

      <section
        className="relative overflow-hidden py-16 md:py-[clamp(112px,15vw,152px)] px-[clamp(20px,5vw,48px)] pb-6 md:pb-[clamp(48px,7vw,72px)]"
        style={{ background: "linear-gradient(165deg,#0a1f14,#123524)", color: "#fbf7ec" }}
      >
        <div className="relative max-w-[1180px] mx-auto">
          <nav aria-label="breadcrumb" className="text-[.85rem] mb-[18px]" style={{ color: "#b7b29d" }}>
            <Link href="/" className="no-underline hover:text-gold-light" style={{ color: "#b7b29d" }}>
              หน้าแรก
            </Link>{" "}
            / <span className="text-gold-light">เที่ยวลาว</span>
          </nav>
          <div className="max-w-[820px]">
            <span className="inline-block text-gold-light font-bold tracking-[.2em] text-[.8rem] uppercase">
              เที่ยวลาว
            </span>
            <h1
              className="mt-4 font-serif-th font-bold leading-[1.2]"
              style={{ fontSize: "clamp(2rem,5.6vw,3.4rem)", letterSpacing: "-.01em" }}
            >
              เลือกเมืองที่อยากไปเที่ยวลาว
            </h1>
            <p className="mt-5 max-w-[64ch]" style={{ color: "#cfc9b6", fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.75 }}>
              เวียงจันทน์ เมืองเฟือง วังเวียง หลวงพระบาง — แต่ละเมืองมีรถตู้ VIP พร้อมคนขับ โปรแกรมแนะนำ และราคาให้เลือกดูก่อนตัดสินใจ
            </p>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-10 md:py-[clamp(64px,8vw,96px)] px-[clamp(20px,5vw,48px)]">
        <div className="max-w-[1180px] mx-auto">
          <Reveal className="max-w-[620px] mb-[clamp(30px,4vw,44px)]">
            <h2 className="m-0 font-serif-th font-bold text-deep-green-2 leading-tight" style={{ fontSize: "clamp(1.7rem,3.6vw,2.4rem)" }}>
              จุดหมายยอดนิยมที่เราพาคุณไป
            </h2>
          </Reveal>

          <div className="flex md:hidden flex-col gap-3">
            {featuredDestinations.map((dest) => (
              <Link
                key={dest.name}
                href={`/${dest.citySlug}`}
                className="flex items-center gap-3 bg-white border border-border rounded-2xl overflow-hidden no-underline"
              >
                <div className="relative w-[110px] h-[78px] flex-shrink-0 rounded-xl overflow-hidden" style={{ background: dest.gradient }}>
                  {dest.image && <Image src={dest.image} alt={dest.name} fill sizes="110px" className="object-cover" />}
                </div>
                <div className="py-2 pr-3 min-w-0">
                  <h3 className="m-0 font-serif-th font-semibold text-deep-green-2 text-[.98rem] truncate">{dest.name}</h3>
                  <p className="m-0 mt-1 text-text-muted text-[.82rem] leading-[1.4] line-clamp-2">{dest.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden md:grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
            {featuredDestinations.map((dest, i) => (
              <Reveal key={dest.name} delay={0.1 * (i % 4 + 1)}>
                <Link
                  href={`/${dest.citySlug}`}
                  className="relative rounded-[20px] overflow-hidden flex flex-col justify-end p-[26px] text-white no-underline shadow-[0_20px_44px_rgba(10,31,20,.16)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(10,31,20,.26)] transition-all"
                  style={{ minHeight: 340, background: dest.gradient }}
                >
                  {dest.image && (
                    <Image src={dest.image} alt={dest.name} fill sizes="(max-width: 900px) 100vw, 25vw" className="object-cover" />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top,rgba(8,22,13,.9),rgba(8,22,13,.2) 58%,rgba(8,22,13,.4))" }}
                  />
                  {dest.tag && (
                    <div
                      className="absolute top-5 left-5 z-[2] text-[.74rem] tracking-[.18em] rounded-full px-3 py-1.5"
                      style={{ color: "#e3bd63", background: "rgba(10,31,20,.5)", border: "1px solid rgba(227,189,99,.3)" }}
                    >
                      {dest.tag}
                    </div>
                  )}
                  <div className="relative">
                    <h3 className="m-0 font-serif-th font-semibold text-[1.5rem]">{dest.name}</h3>
                    <p className="mt-2 text-[#d8d2c0] text-[.94rem] leading-[1.6]">{dest.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[760px] mx-auto px-[clamp(20px,5vw,48px)] pb-14 md:pb-[clamp(80px,10vw,120px)]">
        <h2 className="m-0 mb-1 font-serif-th font-bold text-[1.6rem] md:text-[1.9rem] text-deep-green-2">
          คู่มือเที่ยวลาวฉบับสมบูรณ์: วางแผนทริปให้ไม่พลาด
        </h2>
        <div className="flex items-center gap-2.5 mt-3 pb-[22px] border-b border-border-2 text-[#8a8474] text-[.9rem]">
          <span className="text-gold-dark font-semibold">เขียนโดยทีมงาน HUGLAO GROUP</span>
          <span className="opacity-50">·</span>
          <span>ขับรถตู้เส้นทางไทย–ลาวมากว่า 10 ปี</span>
          <span className="opacity-50">·</span>
          <span>อัปเดตล่าสุด 23 ก.ค. 2026</span>
        </div>

        <p className="mt-6 mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">
          ทีม HUGLAO GROUP ขับรถตู้ VIP รับส่งนักท่องเที่ยวระหว่างไทย–ลาวและระหว่างเมืองต่าง ๆ ในลาวมาต่อเนื่องกว่า 10 ปี
          ผ่านเส้นทางเวียงจันทน์ เมืองเฟือง วังเวียง และหลวงพระบางแทบทุกสัปดาห์ บทความนี้รวบรวมข้อมูลจากประสบการณ์ตรงหน้างาน
          เพื่อให้คุณวางแผนทริปเที่ยวลาวได้ครบและตรงกับสถานการณ์จริงมากที่สุด
        </p>

        <h3 className="mt-7 mb-2.5 font-serif-th font-bold text-[1.2rem] text-deep-green-2">
          ช่วงเวลาที่ดีที่สุดในการเที่ยวลาว
        </h3>
        <p className="mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">
          ลาวมี 3 ฤดูหลัก: <strong>ฤดูหนาว (พ.ย.–ก.พ.)</strong> อากาศเย็นสบาย ท้องฟ้าโปร่ง เหมาะที่สุดสำหรับเที่ยววังเวียงและหลวงพระบาง
          แต่เช้ามืดอาจหนาวถึง 10–15°C โดยเฉพาะหลวงพระบาง ควรเตรียมเสื้อกันหนาว <strong>ฤดูร้อน (มี.ค.–พ.ค.)</strong> อากาศร้อนจัด
          เหมาะกับกิจกรรมทางน้ำ และ <strong>ฤดูฝน (มิ.ย.–ต.ค.)</strong> ฝนตกเป็นช่วง ๆ แม่น้ำเขียวขจีสวยงาม แต่บางเส้นทางภูเขาอาจล่าช้าจากดินถล่ม
        </p>

        <h3 className="mt-7 mb-2.5 font-serif-th font-bold text-[1.2rem] text-deep-green-2">
          เอกสารข้ามแดนที่คนไทยต้องเตรียม
        </h3>
        <p className="mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">
          นักท่องเที่ยวไทยใช้ <strong>บัตรประชาชนตัวจริง</strong> ข้ามแดนได้โดยไม่ต้องขอวีซ่า (พำนักได้ตามระยะเวลาที่ด่านตรวจคนเข้าเมืองกำหนด)
          หากเดินทางโดยรถยนต์ส่วนตัวข้ามแดนต้องมีเอกสารรถเพิ่มเติม แต่ถ้าเดินทางกับรถตู้ VIP ของผู้ให้บริการในพื้นที่ ไม่ต้องกังวลเรื่องนี้
          ควรพกบัตรประชาชนที่ไม่หมดอายุและสำเนาไว้เผื่อกรณีฉุกเฉินเสมอ
        </p>

        <h3 className="mt-7 mb-2.5 font-serif-th font-bold text-[1.2rem] text-deep-green-2">
          การเดินทางระหว่างเมือง
        </h3>
        <p className="mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">
          เส้นทางเวียงจันทน์–วังเวียง–หลวงพระบางเป็นเส้นทางท่องเที่ยวหลัก ปัจจุบันมีทั้ง <strong>รถไฟลาว–จีน</strong> ความเร็วสูงที่ร่นเวลาเดินทางเหลือ
          1–2 ชั่วโมงต่อช่วง และ <strong>รถตู้ VIP พร้อมคนขับ</strong> ที่สะดวกกว่าสำหรับกลุ่มที่มีสัมภาระเยอะ อยากแวะถ่ายรูประหว่างทาง
          หรือเดินทางเป็นครอบครัว/หมู่คณะ เนื่องจากกำหนดเวลาและจุดจอดยืดหยุ่นกว่ารถไฟ
        </p>

        <h3 className="mt-7 mb-2.5 font-serif-th font-bold text-[1.2rem] text-deep-green-2">
          งบประมาณคร่าว ๆ ต่อวัน
        </h3>
        <p className="mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">
          สายประหยัด (โฮสเทล + ทานข้าวข้างทาง) ราว 500–800 บาท/วัน, สายกลาง (โรงแรม 2–3 ดาว + กิจกรรมท่องเที่ยว) ราว
          1,500–2,500 บาท/วัน, และสายหรู (รีสอร์ตริมโขงหรือในตัวเมืองหลวงพระบาง) ตั้งแต่ 3,500 บาท/วันขึ้นไป
          ค่ารถตู้ VIP ระหว่างเมืองจะแตกต่างกันตามระยะทาง ดูราคาจริงได้ในหน้าแต่ละเมืองด้านบน
        </p>

        <div className="mt-8 p-5 md:p-6 rounded-2xl border border-border-2 bg-[#f4f0e6]">
          <p className="m-0 mb-1.5 font-bold text-deep-green-2 text-[1rem]">เกี่ยวกับผู้เขียน</p>
          <p className="m-0 text-[#5e6258] text-[.92rem] leading-[1.7]">
            บทความนี้เรียบเรียงและตรวจทานโดยทีมปฏิบัติการของ HUGLAO GROUP ผู้ให้บริการรถตู้ VIP เส้นทางไทย–ลาวโดยตรง
            ข้อมูลอ้างอิงจากประสบการณ์ขับรถและรับส่งผู้โดยสารจริงในเส้นทางที่กล่าวถึง ปรับปรุงข้อมูลเป็นระยะเมื่อสถานการณ์เส้นทางหรือด่านเปลี่ยนแปลง
            ดูข้อมูลบริษัทเพิ่มเติมได้ที่หน้า{" "}
            <Link href="/about" className="text-gold-dark font-semibold underline hover:text-gold">
              เกี่ยวกับเรา
            </Link>
            {" "}หรืออ่านบทความอื่น ๆ ได้ที่หน้า{" "}
            <Link href="/articles" className="text-gold-dark font-semibold underline hover:text-gold">
              บทความ & เรื่องเล่า
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
