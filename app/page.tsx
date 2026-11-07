import HomePlanningSteps from "@/components/HomePlanningSteps";
import HomeArticleCards from "@/components/HomeArticleCards";
import HomeServiceCards from "@/components/HomeServiceCards";
import JourneyCards from "@/components/JourneyCards";
import PlanChoices from "@/components/PlanChoices";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServicePriceOverview from "@/components/ServicePriceOverview";
import VehicleTypeCards from "@/components/VehicleTypeCards";
import { getAllArticles } from "@/lib/contentful";
import { mergeArticlePreviews } from "@/data/articles";
import { getMedia } from "@/data/media";
import { SITE } from "@/data/site";

const TITLE = "HUGLAO | เที่ยวลาว ทริปส่วนตัว และการเดินทางในแบบคุณ";
const DESCRIPTION = "เริ่มเที่ยวลาวจากเวียงจันทน์ วังเวียง หรือหลวงพระบาง เลือกเส้นทางแนะนำ วางแผนทริปส่วนตัว รถพร้อมคนขับ ตั๋วรถไฟ และบริการเสริมกับ HUGLAO";
export const metadata: Metadata = {
  title: { absolute: TITLE }, description: DESCRIPTION, alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/", type: "website", images: [{ url: getMedia("homeThatLuang").src, alt: getMedia("homeThatLuang").alt }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [getMedia("homeThatLuang").src] },
};

const CITIES = [
  { name: "เวียงจันทน์", image: getMedia("vientianePatuxai").src, alt: getMedia("vientianePatuxai").alt, href: "/vientiane/", pickup: "ด่าน · สนามบิน · สถานีรถไฟ · โรงแรม" },
  { name: "วังเวียง", image: getMedia("vangVieng").src, alt: getMedia("vangVieng").alt, href: "/vang-vieng/", pickup: "สถานีรถไฟ · โรงแรม" },
  { name: "หลวงพระบาง", image: "/assets/dest-luangprabang.webp", alt: "อาคารวัดและสวนในภาพประกอบหลวงพระบาง", href: "/luang-prabang/", pickup: "สนามบิน · สถานีรถไฟ · โรงแรม" },
];
const FAQS = [
  { q: "เริ่มเดินทางได้จากเมืองไหนบ้าง?", a: "มีบริการเริ่มรับในเวียงจันทน์ วังเวียง และหลวงพระบาง แต่ละเมืองมีประเภทรถ จุดรับ และขอบเขตบริการต่างกัน เลือกเมืองและแจ้งแผนให้ทีมตรวจสอบก่อนจอง" },
  { q: "มีแค่บริการรถพร้อมคนขับหรือไม่?", a: "HUGLAO ช่วยวางแผนทริปส่วนตัว เลือกเส้นทางและจุดแวะ พร้อมบริการรถ คนขับ ตั๋วรถไฟ ไกด์ และบริการเสริมตามรายการที่ตกลงกัน รายละเอียดและความพร้อมต้องยืนยันก่อนจอง" },
  { q: "ยังไม่มีแผนเที่ยว ติดต่อได้ไหม?", a: "ได้ บอกวันเดินทาง จำนวนวัน เมืองที่สนใจ จำนวนคน และสไตล์ที่ชอบ ทีมจะช่วยเรียบเรียงเส้นทางและตรวจบริการที่เหมาะกับแผน" },
  { q: "ราคาเส้นทางรวมทุกบริการแล้วหรือยัง?", a: "ราคาบนหน้ารถเป็นราคาบริการรถตามขอบเขตที่ระบุ บริการเสริม ค่าเข้าสถานที่ กิจกรรม อาหาร และที่พักให้ตรวจตามรายการที่ตกลง ไม่ได้รวมอยู่ในราคาทุกรายการโดยอัตโนมัติ" },
];

export default async function Home() {
  const articles = mergeArticlePreviews(await getAllArticles()).slice(0, 4);
  const hero = getMedia("homeThatLuang");
  return <main className="hl-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />
    <section className="relative isolate overflow-hidden bg-[#071d13] pb-14 pt-32 text-white sm:pb-20 sm:pt-40">
      <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="-z-20 object-cover object-[58%_center] sm:object-center" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,29,19,.96),rgba(7,29,19,.84)_55%,rgba(7,29,19,.70))]" />
      <div className="hl-shell relative max-w-[1240px]">
        <div className="max-w-[720px]"><p className="text-sm font-semibold tracking-[.15em] text-[#efd276]">HUGLAO · YOUR LAOS JOURNEY</p><h1 className="mt-6 font-serif-th text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[1.2]">เที่ยวลาว<br /><span className="text-[#efd276]">ในแบบที่คุณอยากไป</span></h1><p className="mt-6 max-w-2xl text-lg leading-9 text-[#d5ddd7]">จากเมืองที่อยากเริ่ม ไปสู่ประสบการณ์ที่อยากเจอ เลือกเส้นทางที่ชอบ หรือให้ HUGLAO ช่วยวางแผนทริปส่วนตัว พร้อมดูแลรายละเอียดการเดินทางให้เข้ากับคุณ</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#journeys" className="hl-button-primary">ค้นหาเส้นทางที่ชอบ</Link><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-secondary">คุยแผนเที่ยวผ่าน LINE</a></div><p className="mt-6 text-sm leading-7 text-[#b9c7be]">เวียงจันทน์ · วังเวียง · หลวงพระบาง</p></div>
      </div>
    </section>
    <VehicleTypeCards />
    <section id="pricing" className="scroll-mt-24 bg-[#efe8d9] py-12 sm:py-16"><div className="hl-shell grid items-start gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="hl-kicker">สำหรับคนที่มองหารถพร้อมคนขับ</p><h2 className="city-heading mt-4">ดูราคาเดินทาง<br />ก่อนเลือกบริการ</h2><p className="mt-4 leading-8 text-[#59645d]">ราคานี้สำหรับบริการรถพร้อมคนขับ ค่าใช้จ่ายอื่นให้ตรวจตามรายการที่เลือก</p></div><ServicePriceOverview light allPricesHref="/car-with-driver/#pricing" title="สรุปราคาเหมารถเต็มวัน แยกตามเมือง" /></div></section>
    <section id="start-city" className="scroll-mt-24 bg-white py-14 sm:py-20"><div className="hl-shell"><p className="hl-kicker">เริ่มจากเมืองที่สะดวกกับคุณ</p><div className="mt-4 flex flex-wrap items-end justify-between gap-5"><h2 className="city-heading">เที่ยวลาวได้หลายจุดเริ่มต้น</h2><Link href="/car-with-driver/#city-services" className="inline-flex min-h-11 items-center font-semibold text-[#86611a] underline">ดูบริการแยกเมือง →</Link></div><p className="mt-3 text-sm leading-7 text-[#59645d]">เลือกเมืองที่คุณจะเริ่มเดินทาง</p><div className="mt-5 grid gap-3 md:grid-cols-3">{CITIES.map(c => <Link key={c.name} href={c.href} className="group flex min-h-28 items-center gap-3 rounded-2xl border border-[#ddd4c1] bg-[#f7f3e9] p-3 transition md:flex-col md:items-stretch hover:border-[#d8af4a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#86611a]"><span className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-32 md:aspect-[16/10] md:h-auto md:w-full"><Image src={c.image} alt={c.alt} fill sizes="(max-width: 639px) 96px, (max-width: 767px) 128px, 30vw" className="object-cover" /></span><div className="min-w-0 flex-1"><h3 className="font-serif-th text-xl font-bold text-[#0a2d20]">{c.name}</h3><p className="mt-1 text-xs leading-6 text-[#59645d]">รับจาก{c.pickup}</p><span className="mt-2 block text-sm font-semibold text-[#86611a]">ดูรถและราคา</span></div><span aria-hidden="true" className="text-xl text-[#86611a]">→</span></Link>)}</div></div></section>
    <PlanChoices />

    <JourneyCards />
    <HomePlanningSteps />
    <HomeServiceCards />


    <HomeArticleCards articles={articles} />
    <section className="bg-[#f7f3e9] py-12 sm:py-16"><div className="hl-shell max-w-4xl"><h2 className="city-heading">ก่อนเริ่มวางแผนกับ HUGLAO</h2><div className="mt-6 divide-y divide-[#ddd4c1]">{FAQS.map(f => <details key={f.q} className="py-4"><summary className="min-h-11 cursor-pointer py-2 text-lg font-semibold text-[#0a2d20]">{f.q}</summary><p className="pb-4 pt-2 leading-8 text-[#59645d]">{f.a}</p></details>)}</div></div></section>
    <section className="bg-[#071d13] py-16 text-white sm:py-24"><div className="hl-shell text-center"><p className="text-sm font-semibold text-[#efd276]">เริ่มจากความอยากไปของคุณ</p><h2 className="mx-auto mt-5 max-w-3xl font-serif-th text-[clamp(2.3rem,5vw,4rem)] font-bold leading-tight">ลาวครั้งนี้<br />อยากให้เป็นการเดินทางแบบไหน?</h2><p className="mx-auto mt-5 max-w-2xl leading-8 text-[#d5ddd7]">ส่งเมืองที่สนใจ วันเดินทาง และจำนวนคน ให้เราช่วยต่อไอเดียเป็นแผนที่เหมาะกับคุณ</p><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-8">คุยกับ HUGLAO ผ่าน LINE</a><Link href="/about/" className="mt-6 block text-sm text-[#d5ddd7] underline">รู้จัก HUGLAO และทีมงาน</Link></div></section>
    <div className="hl-shell py-5 text-xs leading-6 text-[#687169]">ภาพภูมิทัศน์: <Link href="/image-credits/" className="underline">ดูที่มา ผู้สร้าง และใบอนุญาตภาพ</Link></div>
  </main>;
}
