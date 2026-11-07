import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import RouteListCards from "@/components/RouteListCards";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "เที่ยวลาวกับเรา | เส้นทางเที่ยวลาวแบบส่วนตัว",
  description: "เลือกเที่ยวเวียงจันทน์ วังเวียง หรือหลวงพระบางจากเมืองที่เริ่มรับ หรือเลือกเส้นทางระหว่างเมือง วางจุดแวะและจังหวะเดินทางในแบบของคุณกับ HUGLAO",
  alternates: { canonical: "/travel-with-us/" },
};

export default function TravelWithUsPage() {
  return <main>
    <PageHero eyebrow="Travel your way" title="เที่ยวลาวด้วยตัวเอง ให้คนท้องถิ่นพาไป" description="เลือกเส้นทางที่อยากไป แวะธรรมชาติ คาเฟ่ หรือสถานที่ที่สนใจ แล้ววางจังหวะการเดินทางให้เหมาะกับวันหยุดของคุณ" breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "เที่ยวลาวกับเรา" }]} />
    <RouteListCards />
    <section className="bg-[#f7f3e9] py-10 sm:py-14"><div className="hl-shell"><h2 className="font-serif-th text-2xl font-bold text-[#0a2d20] sm:text-3xl">มีเส้นทางที่อยากไปแล้ว?</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[#59645d]">บอกจุดหมาย วันเดินทาง และเวลาที่มี ให้ HUGLAO ช่วยเรียบเรียงจุดแวะและแผนเที่ยวในแบบคุณ</p><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-5">คุยแผนเที่ยวผ่าน LINE</a></div></section>
  </main>;
}
