import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { SITE } from "@/data/site";

const TITLE = "เช่ารถบัสเที่ยวลาว 45 ที่นั่ง VIP 28 และมินิบัส 20 ที่นั่ง";
const DESCRIPTION = "รถบัสและมินิบัสพร้อมคนขับเที่ยวลาว 45 ที่นั่ง VIP 28 ที่นั่ง และ 20 ที่นั่ง เริ่มต้น 5,000 บาท/วัน ประสานผ่าน HUGLAO จองล่วงหน้าอย่างน้อย 30 วัน";
const PATH = "/car-with-driver/minibus-bus/";
const ROOT = "/assets/partner-bus";

export const busFleetMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  robots: { index: false, follow: false },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website", images: [{ url: `${ROOT}/bus-8.webp`, width: 1536, height: 1024, alt: "รถบัสพาร์ตเนอร์ HUGLAO สีแดงและส้ม" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${ROOT}/bus-8.webp`] },
};

const fleet = [
  { capacity: "45", title: "รถบัส 45 ที่นั่ง", label: "สำหรับคณะเดินทาง", body: "ตัวเลือกสำหรับคณะหรือกลุ่มใหญ่ที่ต้องการเดินทางร่วมกัน แจ้งจำนวนผู้โดยสารและสัมภาระเพื่อให้ทีมตรวจรถและจัดแผนรับ–ส่งให้เหมาะสม" },
  { capacity: "28", title: "รถบัสเบาะ VIP 28 ที่นั่ง", label: "สำหรับกลุ่มที่เลือกเบาะ VIP", body: "ตัวเลือกรถบัสแบบเบาะ VIP จำนวน 28 ที่นั่ง ให้ทีมส่งรายละเอียดรถและภาพห้องโดยสารของคันที่ว่างเพื่อประกอบการตัดสินใจก่อนยืนยัน" },
  { capacity: "20", title: "มินิบัส 20 ที่นั่ง", label: "สำหรับกลุ่มขนาดกลาง", body: "ตัวเลือกสำหรับกลุ่มที่ต้องการมินิบัส 20 ที่นั่ง ประสานจุดรับ ปลายทาง จำนวนวัน และความต้องการของคณะกับ HUGLAO ได้ล่วงหน้า" },
] as const;

const exterior = [
  { id: 8, alt: "รถบัสพาร์ตเนอร์ HUGLAO สีแดงและส้ม มุมด้านหน้าและด้านข้าง", caption: "รถบัสพาร์ตเนอร์ มุมด้านหน้าและด้านข้าง" },
  { id: 9, alt: "รถบัสพาร์ตเนอร์ HUGLAO สีฟ้า มุมด้านหน้าและด้านข้าง", caption: "รถบัสพาร์ตเนอร์สีฟ้า" },
  { id: 7, alt: "รถบัสพาร์ตเนอร์ HUGLAO มุมด้านหน้ารถ", caption: "มุมด้านหน้ารถบัสพาร์ตเนอร์" },
  { id: 1, alt: "รถมินิบัสพาร์ตเนอร์ HUGLAO สีขาวและเขียว มุมด้านหน้า", caption: "มุมด้านหน้ามินิบัสพาร์ตเนอร์" },
] as const;

const interior = [
  { id: 6, alt: "ห้องโดยสารรถบัสพาร์ตเนอร์ เบาะสีแดงและไฟเพดานสีม่วง", caption: "ตัวอย่างห้องโดยสาร เบาะนั่งและทางเดินกลาง" },
  { id: 4, alt: "ภายในรถพาร์ตเนอร์ เบาะสีแดง ทางเดินกลาง และช่องเก็บของเหนือศีรษะ", caption: "อีกมุมของเบาะนั่งและพื้นที่ภายในรถ" },
  { id: 2, alt: "ห้องโดยสารรถพาร์ตเนอร์ เบาะลายสีส้มและม่านสีน้ำเงิน", caption: "ตัวอย่างห้องโดยสารอีกแบบจากพาร์ตเนอร์" },
] as const;

const faqs = [
  { q: "มีรถบัสและมินิบัสกี่ขนาด?", a: "ปัจจุบันมีรถจากพาร์ตเนอร์ 3 ตัวเลือก ได้แก่ รถบัส 45 ที่นั่ง รถบัสเบาะ VIP 28 ที่นั่ง และมินิบัส 20 ที่นั่ง โดยต้องตรวจรถว่างตามวันเดินทางก่อนยืนยัน" },
  { q: "ราคาเริ่มต้น 5,000 บาทต่อวันเป็นราคาของรถแบบไหน?", a: "เป็นราคาเริ่มต้นของบริการรถบัสและมินิบัสโดยรวม ไม่ใช่ราคาเดียวสำหรับทุกขนาดรถและทุกเส้นทาง ทีมงานจะเสนอราคาตามรถ วันเดินทาง เส้นทาง จำนวนวัน และรายละเอียดบริการ พร้อมแจ้งสิ่งที่รวมก่อนจอง" },
  { q: "ต้องจองรถล่วงหน้ากี่วัน?", a: "กรุณาแจ้งแผนและจองล่วงหน้าอย่างน้อย 30 วัน เนื่องจากรถพาร์ตเนอร์มีจำนวนจำกัด ทั้งนี้การแจ้งล่วงหน้ายังต้องรอทีมตรวจรถว่างและยืนยันข้อเสนอ" },
  { q: "รถในภาพเป็นคันที่จะได้รับหรือไม่?", a: "ภาพเป็นรถและห้องโดยสารจากพาร์ตเนอร์ที่ HUGLAO ใช้ประกอบการเลือกบริการ ทีมงานจะยืนยันรถคันที่ว่าง รูปแบบเบาะ จำนวนที่นั่ง และพื้นที่สัมภาระก่อนลูกค้าตกลงจอง" },
  { q: "แจ้งรายละเอียดเพื่อขอราคาอะไรบ้าง?", a: "แจ้งวันเดินทาง จำนวนวัน จำนวนผู้โดยสารและสัมภาระ ประเภทรถที่ต้องการ จุดรับ–ส่ง เส้นทาง และเวลาที่ต้องการใช้รถ ทีม HUGLAO จะประสานพาร์ตเนอร์และส่งข้อเสนอให้ตรวจสอบ" },
] as const;

function BusPhoto({ photo }: { photo: { id: number; alt: string; caption: string } }) {
  return <figure className="bus-album-photo"><a href={`${ROOT}/bus-${photo.id}.webp`} data-bus-photo data-caption={photo.caption} aria-label={`เปิดอัลบั้ม: ${photo.caption}`}><div className="bus-album-image"><Image src={`${ROOT}/bus-${photo.id}.webp`} alt={photo.alt} fill sizes="(max-width: 767px) 85vw, 50vw" className="object-contain" /><span className="bus-photo-zoom" aria-hidden="true">↗</span></div></a><figcaption>{photo.caption}</figcaption></figure>;
}

export default function BusFleetPage() {
  return (
    <main className="bus-fleet-page bg-white">
      <Script src="/bus-album.js" strategy="afterInteractive" />
      <BreadcrumbStructuredData items={[{ name: "หน้าแรก", href: "/" }, { name: "จองรถพร้อมคนขับ", href: "/car-with-driver/" }, { name: "รถบัสและมินิบัสเที่ยวลาว", href: PATH }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: TITLE, description: DESCRIPTION, url: `${SITE.website}${PATH}`, image: `${SITE.website}${ROOT}/bus-8.webp`, provider: { "@type": "Organization", name: SITE.legalName, url: SITE.website }, areaServed: "Laos", offers: { "@type": "Offer", priceSpecification: { "@type": "UnitPriceSpecification", minPrice: 5000, priceCurrency: "THB", unitText: "วัน" }, description: "บริการเริ่มต้น 5,000 บาทต่อวัน ราคาจริงขึ้นกับรถและแผนเดินทาง จองล่วงหน้าอย่างน้อย 30 วัน" } }) }} />
      <header className="bus-fleet-hero bg-[#071d13] pb-10 pt-28 text-white sm:pb-16 sm:pt-36">
        <div className="hl-shell">
          <nav aria-label="เส้นทางหน้าเว็บ" className="mb-6 flex flex-wrap gap-2 text-sm text-[#c8d3cc]"><Link href="/">หน้าแรก</Link><span>/</span><Link href="/car-with-driver/">จองรถพร้อมคนขับ</Link><span>/</span><span>รถบัสและมินิบัส</span></nav>
          <p className="text-sm font-semibold tracking-wide text-[#efd276]">เดินทางเป็นคณะกับ HUGLAO</p>
          <div className="mt-5 grid items-start gap-8 lg:grid-cols-[1.35fr_.65fr]">
            <div><h1 className="font-serif-th text-[clamp(2rem,5vw,4.3rem)] font-bold leading-tight">รถบัสและมินิบัส<br /><span className="text-[#efd276]">พร้อมคนขับเที่ยวลาว</span></h1><p className="mt-6 max-w-[760px] text-base leading-8 text-[#d5ddd6] sm:text-lg">เลือกขนาดรถให้เหมาะกับคณะ ทั้งรถบัส 45 ที่นั่ง รถบัสเบาะ VIP 28 ที่นั่ง และมินิบัส 20 ที่นั่ง โดย HUGLAO ช่วยประสานรถจากพาร์ตเนอร์และยืนยันรายละเอียดก่อนเดินทาง</p></div>
            <div className="rounded-2xl border border-[#efd276]/40 bg-[#0a2d20] p-6"><p className="text-sm text-[#d5ddd6]">บริการเริ่มต้น</p><p className="mt-2 text-4xl font-bold text-[#efd276]">5,000 <span className="text-lg font-normal">บาท/วัน</span></p><p className="mt-4 border-t border-white/15 pt-4 font-semibold">แจ้งแผนและจองล่วงหน้า<br /><span className="text-2xl text-[#efd276]">อย่างน้อย 30 วัน</span></p><p className="mt-3 text-sm leading-7 text-[#c8d3cc]">รถมีจำนวนจำกัด กรุณารอทีมตรวจรถว่างและยืนยันก่อนจอง</p><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-5 w-full text-center">ตรวจรถและขอราคาผ่าน LINE</a></div>
          </div>
          
        </div>
      </header>

      <nav className="bus-section-nav hl-shell" aria-label="หัวข้อบริการรถบัส"><a href="#fleet">เลือกรถ</a><a href="#bus-price">ราคาและการจอง</a><a href="#bus-gallery">อัลบั้มภาพ</a><a href="#bus-booking">ขั้นตอนขอราคา</a></nav>

      <section id="bus-booking" className="scroll-mt-24 py-10 sm:py-14"><div className="hl-shell"><p className="hl-kicker">วางแผนก่อนเดินทาง</p><h2 className="mt-3 font-serif-th text-3xl font-bold text-[#071d13]">จองรถบัสเที่ยวลาวกับ HUGLAO อย่างไร?</h2><p className="mt-4 max-w-[900px] leading-8 text-[#59645d]">เริ่มจากจำนวนผู้เดินทาง วันที่ใช้รถ และเส้นทางของคณะ จากนั้นเลือกประเภทรถที่สนใจ HUGLAO จะประสานพาร์ตเนอร์เพื่อตรวจรถว่างและสรุปรายละเอียดให้พิจารณา กรุณาติดต่อและจองล่วงหน้าอย่างน้อย 30 วัน เนื่องจากรถมีจำนวนจำกัด</p><ol className="mt-6 grid gap-4 md:grid-cols-3">{[{title:"1. ส่งแผนเดินทาง",body:"แจ้งวันเดินทาง จำนวนวัน จำนวนคน สัมภาระ จุดรับ–ส่ง และขนาดรถที่ต้องการผ่าน LINE"},{title:"2. ตรวจรถและใบเสนอราคา",body:"ทีมงานตรวจรถว่าง ส่งรายละเอียดรถ ราคา และรายการที่รวมในบริการให้ตรวจสอบก่อนตัดสินใจ"},{title:"3. ยืนยันรายละเอียดการจอง",body:"ตรวจคันรถ จำนวนที่นั่ง กำหนดการ และเงื่อนไขที่ได้รับ แล้วรอการยืนยันจากทีม HUGLAO ก่อนนัดหมายเดินทาง"}].map(step => <li key={step.title} className="rounded-2xl border border-[#ddd4c1] p-5"><h3 className="text-lg font-bold text-[#0a2d20]">{step.title}</h3><p className="mt-3 leading-8 text-[#59645d]">{step.body}</p></li>)}</ol><details className="mt-6 rounded-2xl bg-[#f7f3e9] p-5"><summary className="cursor-pointer font-bold leading-7 text-[#0a2d20]">ควรตรวจสอบอะไรในใบเสนอราคา?</summary><p className="mt-3 leading-8 text-[#59645d]">ขอให้ทีมระบุชั่วโมงใช้รถ เส้นทาง จุดแวะ ค่าน้ำมัน ค่าทางด่วนหรือค่าจอด และค่าใช้จ่ายของคนขับหากพักค้างคืน รวมถึงเงื่อนไขเปลี่ยนแผนหรือยกเลิก รายการเหล่านี้ให้ยึดตามข้อเสนอที่ได้รับสำหรับทริปของคุณ</p></details><p className="mt-5 leading-8 text-[#59645d]">ดูข้อมูลเพิ่มเติมเกี่ยวกับ <Link className="underline underline-offset-4" href="/car-with-driver/">บริการรถพร้อมคนขับเที่ยวลาว</Link> หรือเปรียบเทียบ <Link className="underline underline-offset-4" href="/van-laos/">รถตู้เที่ยวลาวสำหรับกลุ่มขนาดเล็ก</Link></p></div></section>

      <section id="fleet" className="scroll-mt-24 bg-[#f7f3e9] py-12 sm:py-16"><div className="hl-shell"><p className="hl-kicker">ประเภทรถที่ให้บริการ</p><h2 className="mt-4 font-serif-th text-3xl font-bold leading-snug text-[#071d13]">3 ตัวเลือกสำหรับแผนเดินทางของคณะ</h2><div className="mt-7 grid gap-5 md:grid-cols-3">{fleet.map(item => <div key={item.capacity} className="rounded-2xl border border-[#ddd4c1] bg-white p-6"><p className="text-5xl font-bold text-[#0a2d20]">{item.capacity}<span className="ml-2 text-base font-normal">ที่นั่ง</span></p><h3 className="mt-4 text-xl font-bold text-[#0a2d20]">{item.title}</h3><p className="mt-2 text-sm font-semibold text-[#86611a]">{item.label}</p><p className="mt-4 leading-8 text-[#59645d]">{item.body}</p></div>)}</div><p className="mt-5 text-sm leading-7 text-[#687169]">แจ้งจำนวนและขนาดสัมภาระพร้อมจำนวนผู้โดยสาร เพื่อให้ทีมตรวจว่ารถและพื้นที่เก็บของเหมาะกับการเดินทางจริง</p></div></section>

      <section id="bus-price" className="scroll-mt-24 py-12 sm:py-16"><div className="hl-shell grid gap-8 lg:grid-cols-2"><div><p className="hl-kicker">ราคาและการจอง</p><h2 className="mt-4 font-serif-th text-3xl font-bold leading-snug text-[#071d13]">เริ่มต้น 5,000 บาทต่อวัน<br />เสนอราคาตามรถและแผนทริป</h2><p className="mt-5 leading-8 text-[#59645d]">ราคาเริ่มต้นเป็นราคาของบริการโดยรวม ราคาจริงขึ้นอยู่กับขนาดรถและแผนเดินทาง ทีม HUGLAO จะตรวจวันเดินทาง จำนวนวัน จุดรับ–ส่ง เส้นทาง และรายละเอียดการใช้รถ แล้วแจ้งราคาและสิ่งที่รวมให้ตรวจสอบก่อนยืนยัน</p></div><div className="rounded-2xl border border-[#d8af4a] bg-[#fff9e9] p-6 sm:p-8"><h3 className="text-2xl font-bold text-[#0a2d20]">จองล่วงหน้าอย่างน้อย 30 วัน</h3><p className="mt-4 leading-8 text-[#59645d]">รถบัสและมินิบัสจากพาร์ตเนอร์มีจำนวนจำกัด กรุณาแจ้งแผนและจองล่วงหน้าอย่างน้อย 30 วัน เพื่อให้มีเวลาประสานรถและรายละเอียดของคณะ</p><p className="mt-4 leading-8 text-[#59645d]">การส่งรายละเอียดหรือแจ้งล่วงหน้ายังไม่ถือเป็นการยืนยันรถ ต้องรอทีมตรวจรถว่าง สรุปข้อเสนอ และได้รับการยืนยันการจองเรียบร้อยก่อน</p></div></div></section>
<section id="bus-gallery" className="scroll-mt-24 bg-[#f7f3e9] py-12 sm:py-16"><div className="hl-shell"><p className="hl-kicker">ภาพรถจากพาร์ตเนอร์</p><h2 className="mt-4 font-serif-th text-3xl font-bold text-[#071d13]">ดูรถภายนอกและห้องโดยสาร</h2><p className="mt-5 max-w-[900px] leading-8 text-[#59645d]">ภาพชุดนี้ใช้ประกอบการเลือกบริการ รถคันที่จัดให้ สีรถ รูปแบบเบาะ ผังที่นั่ง และพื้นที่สัมภาระจะยืนยันอีกครั้งตามรถที่ว่าง แตะภาพเพื่อเปิดอัลบั้ม เลื่อนดูภาพถัดไปหรือเลือกจากภาพย่อได้</p><h3 className="mt-8 text-2xl font-bold text-[#0a2d20]">ภายนอกรถบัสและมินิบัส</h3><p className="mt-2 text-sm text-[#687169]">4 ภาพ · เลื่อนดูภาพหรือแตะเพื่อขยาย</p><div data-bus-album className="bus-album-grid bus-album-exterior">{exterior.map(photo => <BusPhoto key={photo.id} photo={photo} />)}</div><h3 className="mt-10 text-2xl font-bold text-[#0a2d20]">ตัวอย่างห้องโดยสาร</h3><p className="mt-2 text-sm text-[#687169]">3 ภาพ · เลื่อนดูห้องโดยสารหรือแตะเพื่อขยาย</p><div data-bus-album className="bus-album-grid bus-album-interior">{interior.map(photo => <BusPhoto key={photo.id} photo={photo} />)}</div><p className="mt-4 text-sm leading-7 text-[#687169]">สีรถและรูปแบบห้องโดยสารขึ้นอยู่กับคันที่ว่าง ทีมงานจะส่งภาพและยืนยันจำนวนที่นั่งของรถที่จัดให้ก่อนจอง</p></div></section>

      

      <section className="py-12 sm:py-16"><div className="hl-shell max-w-[960px]"><h2 className="font-serif-th text-3xl font-bold text-[#071d13]">เตรียมข้อมูลเพื่อให้ทีมตรวจรถได้ตรงแผน</h2><ul className="mt-6 grid list-disc gap-x-10 gap-y-3 pl-5 leading-8 text-[#59645d] sm:grid-cols-2"><li>วันเดินทางและจำนวนวันที่ใช้รถ</li><li>จำนวนผู้โดยสารและสัมภาระ</li><li>รถ 45 ที่นั่ง, VIP 28 ที่นั่ง หรือมินิบัส 20 ที่นั่ง</li><li>จุดรับ–ส่งและเส้นทางที่ต้องการ</li><li>เวลานัดหมายและจุดแวะของคณะ</li><li>ความต้องการเพิ่มเติมสำหรับผู้เดินทาง</li></ul><p className="mt-5 leading-8 text-[#59645d]">HUGLAO ทำหน้าที่จัดหาและประสานรถจากพาร์ตเนอร์ ให้ทั้งลูกค้าและผู้ให้บริการเห็นรายละเอียดรถ ราคา และแผนเดินทางตรงกันก่อนยืนยัน</p></div></section>

      <section className="bg-[#f7f3e9] py-12 sm:py-16"><div className="hl-shell max-w-[960px]"><h2 className="font-serif-th text-3xl font-bold text-[#071d13]">คำถามที่พบบ่อย</h2><div className="mt-6 divide-y divide-[#ddd4c1]">{faqs.map(faq => <details key={faq.q} className="py-5"><summary className="cursor-pointer text-lg font-bold leading-8 text-[#0a2d20]">{faq.q}</summary><p className="mt-3 leading-8 text-[#59645d]">{faq.a}</p></details>)}</div></div></section>
      <section className="bg-[#0a2d20] py-12 text-white sm:py-16"><div className="hl-shell max-w-[960px]"><h2 className="font-serif-th text-3xl font-bold leading-snug">มีแผนเดินทางเป็นคณะแล้ว?<br />ให้ HUGLAO ช่วยประสานรถล่วงหน้า</h2><p className="mt-5 leading-8 text-[#d5ddd6]">ส่งวันเดินทาง จำนวนคน ประเภทรถ และเส้นทางที่ต้องการ กรุณาเผื่อเวลาจองล่วงหน้าอย่างน้อย 30 วัน เพื่อให้ทีมตรวจรถพาร์ตเนอร์และสรุปข้อเสนอให้เหมาะกับคณะของคุณ</p><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-7">ส่งแผนและขอราคาผ่าน LINE</a></div></section>
    </main>
  );
}


