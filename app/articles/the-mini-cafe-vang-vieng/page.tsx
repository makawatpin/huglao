import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import VanAlbum from "@/components/VanAlbum";
import { SITE } from "@/data/site";

const PATH = "/articles/the-mini-cafe-vang-vieng/";
const TITLE = "The Mini Cafe & Restaurant วังเวียง คาเฟ่วิวภูเขาและทุ่งนา";
const DESCRIPTION = "แวะ The Mini Cafe & Restaurant วังเวียง คาเฟ่และร้านอาหารวิวภูเขา มีทางเดินไม้และที่นั่งกลางแจ้ง พร้อมภาพบรรยากาศ เวลาเปิด และแผนที่";
const MAP = "https://maps.app.goo.gl/mmSPzJSrGsrPMrtu6";
const FACEBOOK = "https://www.facebook.com/minicafeandrestaurant";
const LISTING = "https://es.restaurantguru.com/The-Mini-Cafe-and-Restaurant-Vang-Vieng";
const PHOTOS = [
  { file: "cafe-exterior", alt: "อาคารหน้าจั่วกระจกพร้อมป้าย The Mini Cafe & Restaurant" },
  { file: "mountain-boardwalk", alt: "ทางเดินไม้ผ่านทุ่งหญ้าสู่วิวภูเขาหินปูนหลังร้าน The Mini วังเวียง" },
  { file: "garden-seating", alt: "โต๊ะกลางแจ้งใต้ร่มและต้นไม้บริเวณสวนหน้าร้าน" },
  { file: "covered-terrace", alt: "โต๊ะที่นั่งใต้ชายคาริมหน้าต่างไม้ของร้าน The Mini" },
  { file: "wooden-deck", alt: "เก้าอี้พักผ่อนเรียงบนลานไม้กลางแจ้งข้างสวน" },
  { file: "cafe-interior", alt: "ที่นั่งภายในร้าน ตกแต่งด้วยต้นไม้แขวนและโคมไฟสาน" },
].map(photo => ({ src: `/images/mini-cafe-vang-vieng/${photo.file}.webp`, alt: photo.alt, caption: photo.alt }));

export const metadata: Metadata = {
  title: TITLE, description: DESCRIPTION, alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article", url: PATH, images: [{ url: PHOTOS[0].src, alt: PHOTOS[0].alt }] },
};

export default function MiniCafeArticle() {
  const heading = "font-serif-th text-2xl font-bold leading-snug text-[#0a2d20] sm:text-3xl";
  const schemas = [
    { "@context": "https://schema.org", "@type": "Article", headline: TITLE, description: DESCRIPTION, image: PHOTOS.map(p => `${SITE.website}${p.src}`), author: { "@type": "Organization", name: "HUGLAO" }, publisher: { "@id": `${SITE.website}/#organization` }, mainEntityOfPage: `${SITE.website}${PATH}` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE.website}/` }, { "@type": "ListItem", position: 2, name: "บทความ", item: `${SITE.website}/articles/` }, { "@type": "ListItem", position: 3, name: "The Mini วังเวียง", item: `${SITE.website}${PATH}` }] },
  ];
  return <main>
    {schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
    <PageHero eyebrow="HUGLAO แนะนำ · วังเวียง" title="The Mini Cafe & Restaurant วังเวียง" description="คาเฟ่วิวภูเขาและทุ่งนา พร้อมมุมถ่ายรูปทางเดินไม้" breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ", href: "/articles/" }, { label: "The Mini วังเวียง" }]} />
    <article className="bg-[#f7f3e9] py-8 sm:py-14">
      <div className="hl-shell max-w-[1000px]">
        <figure><Image src={PHOTOS[0].src} alt={PHOTOS[0].alt} width={1280} height={960} priority sizes="(max-width: 1024px) 92vw, 960px" className="h-auto w-full rounded-2xl" /><figcaption className="mt-2 text-xs leading-6 text-[#59645d]">ด้านหน้าร้าน The Mini Cafe & Restaurant วังเวียง</figcaption></figure>
        <div className="mt-6 flex flex-wrap gap-2"><a href={MAP} target="_blank" rel="noopener noreferrer" className="hl-button-primary">เปิดแผนที่ร้าน ↗</a><a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-[#cfc7b5] bg-white px-5 text-sm font-semibold text-[#0a2d20]">Facebook ร้าน ↗</a></div>
        <p className="mt-7 text-sm leading-7 text-[#46534a] sm:text-base sm:leading-8">The Mini เป็นทั้งคาเฟ่และร้านอาหารในวังเวียง มีที่นั่งภายในและกลางแจ้ง จุดเด่นคือวิวภูเขาหินปูนและทางเดินไม้ด้านหลังร้าน เหมาะแวะพัก ดื่มกาแฟ รับประทานอาหาร และถ่ายรูป ระหว่างเที่ยวโซนบลูลากูนและจุดชมวิว อีกหนึ่งจุดแวะที่ HUGLAO แนะนำสำหรับคนที่อยากให้ทริปมีเวลานั่งชมวิวสบาย ๆ</p>

        <section className="mt-10" aria-labelledby="mini-highlights"><h2 id="mini-highlights" className={heading}>พักจิบกาแฟ แล้วเดินไปชมวิว</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">{[{ title: "ภูเขาและทางเดินไม้", text: "เดินเล่น ถ่ายรูป และชมทุ่งนาที่เปลี่ยนไปตามฤดูกาล" }, { title: "เลือกนั่งได้หลายมุม", text: "ภายในร้าน ใต้ชายคา สวน และลานไม้กลางแจ้ง" }].map(item => <div key={item.title} className="rounded-2xl border border-[#ddd4c1] bg-white p-4"><h3 className="text-base font-semibold text-[#0a2d20]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#59645d]">{item.text}</p></div>)}</div>
        </section>

        <section className="mt-10" aria-labelledby="mini-gallery"><h2 id="mini-gallery" className={heading}>บรรยากาศ The Mini วังเวียง</h2><p className="mt-3 text-sm leading-6 text-[#59645d]">เลื่อนดูภาพและแตะเพื่อขยาย</p><VanAlbum label="อัลบั้ม The Mini Cafe วังเวียง" imageFit="contain" groups={[{ title: "วิวและมุมนั่งพักในร้าน", items: PHOTOS }]} /></section>

        <section className="mt-10" aria-labelledby="mini-menu"><h2 id="mini-menu" className={heading}>อาหารและเครื่องดื่ม</h2><p className="mt-4 text-sm leading-7 text-[#46534a]">มีทั้งอาหารคาว ขนม กาแฟ และเครื่องดื่มผลไม้ เมนูที่พบในรีวิว เช่น มัทฉะปั่น ชาพีช สมูทตี้ และปลาทอดสมุนไพร สอบถามเมนูที่มีและราคาจากร้านก่อนสั่ง</p><p className="mt-4 rounded-xl border border-[#ddd4c1] bg-white p-4 text-sm leading-7 text-[#59645d]">ข้อมูลรีวิวเดือนพฤษภาคม 2569 ที่นำมาประกอบบทความระบุมัทฉะปั่น 83,000 กีบ เป็นราคาในวันที่รีวิว ไม่ใช่ราคาปัจจุบันที่ร้านยืนยัน</p></section>

        <section className="mt-10" aria-labelledby="mini-plan"><h2 id="mini-plan" className={heading}>เผื่อเวลาแวะเท่าไรดี?</h2><div className="mt-5 grid grid-cols-2 gap-3">{[{ time: "45–60 นาที", label: "เครื่องดื่มและถ่ายรูป" }, { time: "60–90 นาที", label: "แวะรับประทานอาหาร" }].map(item => <div key={item.time} className="rounded-2xl border border-[#ddd4c1] bg-white p-4"><p className="text-lg font-bold text-[#0a2d20]">{item.time}</p><p className="mt-1 text-sm leading-6 text-[#59645d]">{item.label}</p></div>)}</div><ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-[#46534a]"><li>วันหยุดหรือช่วงกลางวันอาจมีคนเยอะ ควรเผื่อเวลารออาหาร</li><li>วิวทุ่งนาเปลี่ยนตามฤดูกาล ภาพในวันเดินทางอาจต่างจากภาพตัวอย่าง</li><li>มีข้อมูลว่ามีที่จอดรถ แต่รถมินิบัสหรือรถบัสควรสอบถามพื้นที่จอดก่อน</li><li>ยังไม่มีข้อมูลยืนยันเรื่องค่าเข้าหรือค่าถ่ายรูป ควรสอบถามร้านก่อนใช้พื้นที่</li></ul></section>

        <section id="mini-contact" className="mt-10 rounded-2xl border border-[#ddd4c1] bg-white p-5 sm:p-7"><h2 className={heading}>เวลาเปิดและการเดินทาง</h2><dl className="mt-4 divide-y divide-[#e8e4db] text-sm">{[["เวลาเปิดตามรายการออนไลน์", "ทุกวัน 07.10–21.00 น."], ["ก่อนเดินทาง", "ตรวจเวลาเปิด เมนู และการใช้พื้นที่กับร้านอีกครั้ง"]].map(([label, value]) => <div key={label} className="py-3"><dt className="font-semibold text-[#0a2d20]">{label}</dt><dd className="mt-1 leading-6 text-[#59645d]">{value}</dd></div>)}</dl><div className="mt-4 flex flex-wrap gap-3"><a href={MAP} target="_blank" rel="noopener noreferrer" className="hl-button-primary">แผนที่ร้าน ↗</a><a href="tel:+8562077672190" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#0a2d20] underline">โทรร้าน +856 20 77 672 190</a></div><a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#0a2d20] underline">Facebook: The Mini Cafe & Restaurant ↗</a></section>

        <section className="mt-10 rounded-2xl bg-[#0a2d20] p-5 text-white sm:p-7"><h2 className="font-serif-th text-2xl font-bold">เพิ่ม The Mini ไว้ในแผนเที่ยววังเวียง</h2><p className="mt-3 text-sm leading-7 text-[#d5ddd7]">เลือกเป็นจุดพักระหว่างเที่ยวบลูลากูนหรือจุดชมวิว โดยตกลงจุดแวะและเวลากับทีมก่อนเดินทาง ค่าอาหาร เครื่องดื่ม และกิจกรรมไม่รวมในค่ารถ</p><Link href="/vang-vieng/" className="hl-button-primary mt-5">ดูรถพร้อมคนขับในวังเวียง</Link><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-11 items-center text-sm font-semibold text-[#efd276] underline">คุยแผนเที่ยวกับ HUGLAO ผ่าน LINE ↗</a></section>
        <footer className="mt-8 space-y-2 text-xs leading-6 text-[#687169]"><p>ภาพประกอบทั้ง 6 ภาพ: ภาพที่เจ้าของ HUGLAO ส่งสำหรับบทความนี้</p><p>ข้อมูลเวลาเปิดและโทรศัพท์: <a href={LISTING} target="_blank" rel="noopener noreferrer" className="underline">รายการร้านบน Restaurant Guru</a> · ข้อมูลเมนูและรีวิวประกอบจากข้อมูลที่ส่งให้ HUGLAO รายละเอียดอาจเปลี่ยนแปลง โปรดตรวจสอบกับร้านก่อนเดินทาง</p></footer>
      </div>
    </article>
  </main>;
}
