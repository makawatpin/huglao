import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { cities, type City } from "@/data/cities";

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

export default function LaosTravelPage() {
  const featuredCities = featuredOrder
    .map((slug) => cities.find((c) => c.slug === slug))
    .filter((c): c is City => !!c && !c.hidden);

  return (
    <div>
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

      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)] pb-14 md:pb-[clamp(80px,10vw,120px)]">
        <div className="grid gap-4 md:gap-[22px] md:grid-cols-2">
          {featuredCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="no-underline block bg-white border border-border rounded-2xl overflow-hidden hover:border-gold-light transition-colors"
            >
              <div className="relative aspect-[16/9]">
                <Image src={city.heroImage} alt={city.name} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-4 md:p-[26px]">
                <h2 className="m-0 mb-1.5 font-serif-th font-bold text-[1.2rem] text-deep-green-2">{city.name}</h2>
                <p className="m-0 text-text-muted text-[.9rem] leading-[1.7]">{city.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
