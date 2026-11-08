import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import VanAlbum from "@/components/VanAlbum";
import { SITE } from "@/data/site";

const PATH = "/articles/bannam-cafe-vang-vieng/";
const TITLE = "BanNam Cafe & Restaurant บ้านน้ำคาเฟ่ วังเวียง";
const DESCRIPTION = "แวะ BanNam Cafe & Restaurant บ้านน้ำคาเฟ่ วังเวียง เลือกพักในร้านหรือมุมนั่งริมน้ำ พร้อมแผนที่และข้อแนะนำสำหรับจัดเวลาแวะ";
const MAP = "https://www.google.com/maps/search/?api=1&query=BanNam+Cafe+%26+Restaurant+Vang+Vieng";
const PHOTOS = [
  ["cafe-counter-sign", "เคาน์เตอร์กาแฟและป้าย BanNam cafe บนผนังสีเหลือง"],
  ["warm-interior", "บรรยากาศบ้านน้ำคาเฟ่ เห็นโคมไฟสานและโครงสร้างไม้"],
  ["window-seating", "โต๊ะริมกระจกบานสูง มองเห็นต้นไม้และภูเขาด้านนอก"],
  ["armchair-corner", "มุมเก้าอี้ไม้และต้นไม้ในร้านกับแสงแดดริมหน้าต่าง"],
  ["dining-table", "โต๊ะรับประทานอาหารตัวยาวกับเก้าอี้เบาะสีน้ำเงิน"],
  ["woven-lamps", "กลุ่มโคมไฟสานเหนือพื้นที่นั่งและของตกแต่งรูปทรงเครื่องดนตรี"],
  ["wall-art", "ภาพบุคคลและม้านั่งไม้บนผนังโทนเหลืองอบอุ่น"],
  ["riverside-terrace", "โต๊ะกลางแจ้งบนระเบียงไม้ใต้ร่มต้นไม้ริมน้ำ"],
  ["river-view", "วิวแม่น้ำและพื้นที่นั่งพักใต้ต้นไม้ข้างบ้านน้ำคาเฟ่"],
  ["iced-drink", "เครื่องดื่มสีเขียวในแก้ว BanNam Cafe พร้อมถาดและของตกแต่ง"],
].map(([file, alt]) => ({ src: `/images/bannam-cafe-vang-vieng/${file}.webp`, alt, caption: alt }));

const SECTIONS = [
  { id: "atmosphere", title: "แวะพักริมน้ำที่บ้านน้ำคาเฟ่", paragraphs: [
    "บ้านน้ำคาเฟ่มีทั้งมุมนั่งในอาคารและระเบียงริมน้ำ เลือกนั่งพักกับเครื่องดื่ม หรือแวะรับประทานอาหารระหว่างเที่ยววังเวียงได้ หากอยากนั่งด้านนอก ลองเลือกช่วงที่แดดไม่แรง จะได้ใช้เวลากับวิวริมน้ำได้นานขึ้น",
  ] },
  { id: "woven-lamps", title: "งานไม้และกลิ่นอายพื้นเมือง", paragraphs: [
    "ภายในร้านตกแต่งด้วยงานไม้ โคมไฟสาน และภาพบนผนัง โทนอบอุ่นต่างจากบรรยากาศริมน้ำด้านนอก ใครชอบถ่ายรูปสามารถเดินเลือกมุมได้ โดยเว้นพื้นที่ให้พนักงานและลูกค้าโต๊ะอื่นด้วย",
  ] },
  { id: "food-drinks", title: "กาแฟ เครื่องดื่ม และช่วงพักระหว่างวัน", paragraphs: [
    "แวะสั่งกาแฟหรือเครื่องดื่ม แล้วเลือกมุมนั่งตามชอบ ส่วนขนมและอาหารให้ดูรายการที่ร้านมีในวันนั้น หากจะจัดเป็นมื้อหลักของคณะ ควรสอบถามเมนูและเวลารออาหารล่วงหน้า",
  ] },
  { id: "who-for", title: "ไปกับครอบครัวหรือกลุ่มเพื่อน", paragraphs: [
    "ร้านนี้เหมาะจะเก็บไว้เป็นจุดพักของวันเที่ยว สำหรับคณะใหญ่ควรติดต่อเรื่องโต๊ะและที่จอดรถก่อน หากมีผู้สูงอายุหรือผู้ใช้รถเข็นร่วมเดินทาง ให้สอบถามทางเข้าและมุมนั่งที่สะดวกด้วย",
  ] },
  { id: "trip-plan", title: "เผื่อเวลาแวะให้พอดีกับแผน", paragraphs: [
    "เผื่อเวลาประมาณ 45–60 นาทีสำหรับเครื่องดื่มและนั่งพัก หากรับประทานอาหารด้วยควรเพิ่มเวลาอีกหน่อย เลือกจุดแวะให้ต่อกับที่พักและสถานที่เที่ยวอื่นได้สะดวก โดยเฉพาะวันที่ต้องไปขึ้นรถไฟต่อ",
  ] },
] as const;

export const metadata: Metadata = {
  title: TITLE, description: DESCRIPTION, alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article", url: PATH, images: [{ url: PHOTOS[0].src, alt: PHOTOS[0].alt }] },
};

export default function BanNamCafeArticle() {
  const heading = "font-serif-th text-2xl font-bold leading-snug text-[#0a2d20] sm:text-3xl";
  const schemas = [
    { "@context": "https://schema.org", "@type": "Article", headline: TITLE, description: DESCRIPTION, image: PHOTOS.map(p => `${SITE.website}${p.src}`), author: { "@type": "Organization", name: "HUGLAO" }, publisher: { "@id": `${SITE.website}/#organization` }, mainEntityOfPage: `${SITE.website}${PATH}` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE.website}/` }, { "@type": "ListItem", position: 2, name: "บทความ", item: `${SITE.website}/articles/` }, { "@type": "ListItem", position: 3, name: "บ้านน้ำคาเฟ่ วังเวียง", item: `${SITE.website}${PATH}` }] },
  ];
  return <main>
    {schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
    <PageHero eyebrow="HUGLAO แนะนำ · คาเฟ่วังเวียง" title={TITLE} description="แวะกาแฟและมื้ออาหาร เลือกนั่งในร้านหรือพักริมน้ำ" breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ", href: "/articles/" }, { label: "บ้านน้ำคาเฟ่ วังเวียง" }]} />
    <article className="bg-[#f7f3e9] py-8 sm:py-14"><div className="hl-shell max-w-[1000px]">
      <figure><Image src={PHOTOS[0].src} alt={PHOTOS[0].alt} width={1280} height={960} priority sizes="(max-width: 1024px) 92vw, 960px" className="h-auto w-full rounded-2xl" /><figcaption className="mt-2 text-xs leading-6 text-[#59645d]">ป้าย BanNam cafe และเคาน์เตอร์ในบรรยากาศโทนเหลืองอบอุ่น</figcaption></figure>
      <div className="mt-6 space-y-4 text-sm leading-7 text-[#46534a] sm:text-base sm:leading-8"><p>วันที่อยากพักจากกิจกรรมกลางแจ้ง บ้านน้ำคาเฟ่เป็นอีกจุดแวะในวังเวียงที่จัดไว้ในแผนได้ มีทั้งพื้นที่ในร้านและมุมนั่งริมน้ำ จะนัดเพื่อนมาดื่มกาแฟหรือพักก่อนออกเที่ยวต่อก็ได้</p><p>ค้นหาร้านด้วยชื่อ BanNam Cafe &amp; Restaurant, Vang Vieng และเลือกหมุดในวังเวียงให้ตรงก่อนนำทาง</p></div>
      <nav aria-label="หัวข้อในบทความ" className="mt-6 grid grid-cols-2 gap-2">{[{ href: "#atmosphere", text: "บรรยากาศร้าน" }, { href: "#bannam-gallery", text: "ภาพร้านทั้ง 10 รูป" }, { href: "#trip-plan", text: "วางแผนแวะพัก" }, { href: "#bannam-map", text: "แผนที่และเวลาเปิด" }].map(item => <a key={item.href} href={item.href} className="flex min-h-12 items-center justify-between gap-2 rounded-xl border border-[#ddd4c1] bg-white px-3 text-sm font-semibold text-[#0a2d20]">{item.text}<span aria-hidden="true">↓</span></a>)}</nav>
      {SECTIONS.map((section, index) => <section key={section.id} id={section.id} className="mt-10 scroll-mt-24"><h2 className={heading}>{section.title}</h2><div className="mt-4 space-y-4 text-sm leading-7 text-[#46534a] sm:text-base sm:leading-8">{section.paragraphs.map(text => <p key={text}>{text}</p>)}</div>{(index === 1 || index === 2) && <figure className="mt-5"><Image src={PHOTOS[index === 1 ? 5 : 9].src} alt={PHOTOS[index === 1 ? 5 : 9].alt} width={index === 1 ? 1280 : 720} height={index === 1 ? 960 : 1280} sizes="(max-width: 640px) 92vw, 640px" className={`h-auto rounded-2xl ${index === 1 ? "w-full" : "mx-auto w-full max-w-sm"}`} /><figcaption className="mt-2 text-center text-xs leading-6 text-[#59645d]">{PHOTOS[index === 1 ? 5 : 9].caption}</figcaption></figure>}</section>)}
      <section id="bannam-gallery" className="mt-10 scroll-mt-24"><h2 className={heading}>มุมร้านและบรรยากาศริมน้ำ</h2><p className="mt-3 text-sm leading-6 text-[#59645d]">เลื่อนดูภาพ แตะเพื่อขยาย ทั้งภายในร้านและมุมนั่งพักกลางแจ้ง</p><VanAlbum label="อัลบั้มบ้านน้ำคาเฟ่ วังเวียง" imageFit="contain" groups={[{ title: "บ้านน้ำคาเฟ่ ผ่านภาพบรรยากาศ 10 มุม", items: PHOTOS }]} /></section>

      <section id="bannam-map" className="mt-10 scroll-mt-24 rounded-2xl border border-[#ddd4c1] bg-white p-5 sm:p-7"><h2 className={heading}>แผนที่และเวลาเปิดบริการ</h2><p className="mt-4 text-sm leading-7 text-[#46534a]">ชื่อสำหรับค้นหา: BanNam Cafe &amp; Restaurant, Vang Vieng เลือกผลการค้นหาในวังเวียงและตรวจเส้นทางก่อนนำทาง</p><a href={MAP} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-4">ค้นหาบ้านน้ำคาเฟ่ในแผนที่ ↗</a><p className="mt-4 text-sm leading-7 text-[#59645d]">ตรวจเวลาเปิดและวันหยุดกับร้านก่อนออกเดินทาง โดยเฉพาะหากตั้งใจแวะแต่เช้าหรือไปเป็นคณะ</p></section>
      <section className="mt-10 rounded-2xl bg-[#0a2d20] p-5 text-white sm:p-7"><h2 className="font-serif-th text-2xl font-bold">แวะคาเฟ่วังเวียงในแบบของคุณกับ HUGLAO</h2><p className="mt-4 text-sm leading-7 text-[#d5ddd7]">บางคนชอบเริ่มวันด้วยกาแฟ บางคนอยากแวะหลังเที่ยวธรรมชาติ หรือมีเวลานั่งพักโดยไม่ต้องเร่งไปทุกจุด HUGLAO ช่วยจัดหาและประสานรถส่วนตัวพร้อมคนขับ รวมถึงวางเส้นทางให้เหมาะกับที่พัก จุดเที่ยว และเวลาของคุณ</p><p className="mt-4 font-semibold text-[#efd276]">เที่ยวลาวในแบบคุณ<br />คุณเลือกที่เที่ยว เราช่วยดูแลการเดินทาง</p><div className="mt-5 flex flex-wrap gap-3"><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary">คุยแผนเที่ยวผ่าน LINE</a><a href={SITE.phoneHref} className="inline-flex min-h-11 items-center text-sm font-semibold underline">โทร {SITE.phoneDisplay}</a></div><Link href="/vang-vieng/" className="mt-4 inline-flex min-h-11 items-center text-sm text-[#efd276] underline">ดูรถพร้อมคนขับในวังเวียง →</Link></section>
      <aside className="mt-6 rounded-2xl border border-[#ddd4c1] bg-white p-4"><Link href="/articles/the-mini-cafe-vang-vieng/" className="flex min-h-12 items-center justify-between gap-4 text-sm font-semibold text-[#0a2d20]">คาเฟ่วังเวียงอีกแห่ง: The Mini Cafe &amp; Restaurant <span aria-hidden="true">→</span></Link></aside>
      <footer className="mt-7 text-xs leading-6 text-[#687169]">ภาพ: HUGLAO · เมนู ราคา และเวลาเปิดอาจเปลี่ยนแปลง กรุณาตรวจสอบกับร้านก่อนเดินทาง</footer>
    </div></article>
  </main>;
}
