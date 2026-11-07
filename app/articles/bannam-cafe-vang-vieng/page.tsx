import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import VanAlbum from "@/components/VanAlbum";
import { SITE } from "@/data/site";

const PATH = "/articles/bannam-cafe-vang-vieng/";
const TITLE = "BanNam Cafe & Restaurant บ้านน้ำคาเฟ่ วังเวียง";
const DESCRIPTION = "แวะบ้านน้ำคาเฟ่ วังเวียง ชมงานไม้ โคมไฟสาน และบรรยากาศอบอุ่นสไตล์ลาว พร้อมภาพร้าน มุมถ่ายรูป และข้อแนะนำก่อนวางแผนเดินทาง";
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
  { id: "atmosphere", title: "บ้านน้ำคาเฟ่ วังเวียง มีบรรยากาศแบบไหน?", paragraphs: [
    "จากภาพภายในร้าน สิ่งที่สะดุดตาคือโทนสีเหลืองอบอุ่นร่วมกับงานไม้ ทำให้พื้นที่ดูมีชีวิตชีวา โครงสร้างหลังคาและคานไม้ช่วยเพิ่มความรู้สึกเป็นธรรมชาติ เมื่ออยู่ร่วมกับแสงไฟสีอุ่น บรรยากาศจึงดูนุ่มนวลและเป็นกันเอง",
    "บริเวณเคาน์เตอร์มีป้าย BanNam Cafe เป็นจุดเด่น เหมาะเก็บภาพบันทึกว่าได้แวะมาที่นี่ รอบเคาน์เตอร์ยังมีโคมไฟ ภาพบนผนัง และของตกแต่งที่ช่วยสร้างบุคลิกให้กับร้าน",
    "เสน่ห์ไม่ได้อยู่ที่ของตกแต่งชิ้นใดเพียงชิ้นเดียว แต่อยู่ที่วัสดุ สี และแสงที่มาอยู่ด้วยกัน คนชอบถ่ายภาพคาเฟ่จึงเก็บได้ทั้งบรรยากาศกว้าง ๆ และรายละเอียดเล็ก ๆ ภายในร้าน",
  ] },
  { id: "woven-lamps", title: "โคมไฟสานและงานไม้ที่ทำให้ร้านมีเอกลักษณ์", paragraphs: [
    "โคมไฟสานที่เรียงเหนือบริเวณเคาน์เตอร์เป็นองค์ประกอบที่เห็นชัดในภาพ รูปทรงและพื้นผิวช่วยเพิ่มมิติให้พื้นที่ ขณะที่แสงไฟด้านในขับโทนผนังและงานไม้ให้ดูอบอุ่นขึ้น",
    "สำหรับคนชอบการตกแต่งที่มีกลิ่นอายพื้นเมือง ลองใช้เวลามองวัสดุ รูปทรง และการจัดวาง หากถ่ายภาพ แนะนำเก็บมุมที่เห็นทั้งโคมไฟ โครงสร้างไม้ และเคาน์เตอร์ในภาพเดียว เพื่อถ่ายทอดบรรยากาศได้ครบกว่าการถ่ายเฉพาะป้ายร้าน",
  ] },
  { id: "local-details", title: "รายละเอียดพื้นเมืองที่ชวนให้หยุดมอง", paragraphs: [
    "ของตกแต่งรูปทรงเครื่องดนตรีที่มีลวดลายพื้นเมือง รวมถึงภาพบุคคลบนผนัง ช่วยสร้างเรื่องราวทางสายตาและฉากหลังที่ต่างจากคาเฟ่ตกแต่งเรียบทั่วไป",
    "คนสนใจงานศิลปะ งานไม้ หรือของตกแต่งพื้นเมืองน่าจะเพลิดเพลินกับมุมเหล่านี้ การเก็บภาพลวดลาย วัสดุ และแสงก็ช่วยเล่าความรู้สึกของการเดินทางได้ โดยไม่จำเป็นต้องถ่ายภาพตัวเองทุกมุม",
    "หากต้องการถ่ายภาพใกล้ของตกแต่งหรือขยับสิ่งของ ควรสอบถามพนักงานก่อน เพื่อให้สะดวกสำหรับทุกคน",
  ] },
  { id: "food-drinks", title: "กาแฟและขนมสำหรับช่วงพักระหว่างวัน", paragraphs: [
    "ภาพบริเวณเคาน์เตอร์เห็นเครื่องชงกาแฟ และข้อมูลภาพรายการร้านที่ส่งประกอบบทความมีตู้ขนม จึงน่าสนใจสำหรับคนที่อยากแวะหาเครื่องดื่มหรือขนมระหว่างเที่ยววังเวียง",
    "เลือกเมนูจากรายการที่ร้านให้บริการในวันเดินทาง ขนมอาจเปลี่ยนไปตามวัน หากแพ้นม แพ้ถั่ว มีข้อจำกัดเรื่องอาหาร หรือต้องการลดความหวาน ควรแจ้งพนักงานก่อนสั่ง",
    "ยังไม่มีเมนูและราคาปัจจุบันที่ตรวจสอบยืนยันได้ จึงไม่ระบุเมนูซิกเนเจอร์หรือราคาเริ่มต้น ภาพเครื่องดื่มและป้ายเมนูเป็นภาพบรรยากาศ ไม่ใช่รายการราคาปัจจุบัน",
  ] },
  { id: "who-for", title: "บ้านน้ำคาเฟ่เหมาะกับใคร?", paragraphs: [
    "คนที่ชอบโทนไม้ แสงไฟอบอุ่น และรายละเอียดพื้นเมือง สามารถเก็บร้านนี้ไว้เป็นช่วงพักของวันเที่ยว แทนการเดินทางต่อเนื่องตั้งแต่เช้าถึงเย็น คู่รักหรือกลุ่มเพื่อนที่ชอบถ่ายภาพก็มีหลายมุมให้เก็บบรรยากาศ",
    "ครอบครัวควรสอบถามจำนวนที่นั่งและความสะดวกของทางเข้า โดยเฉพาะเมื่อมีผู้สูงอายุหรือผู้ใช้รถเข็น หากเป็นคณะใหญ่ควรประสานร้านล่วงหน้าเรื่องที่นั่ง การสั่งอาหาร และพื้นที่จอดรถ เพราะยังยืนยันรายละเอียดเหล่านี้จากภาพไม่ได้",
  ] },
  { id: "trip-plan", title: "จัดบ้านน้ำคาเฟ่ไว้ช่วงไหนของแผนเที่ยวดี?", paragraphs: [
    "เผื่อเวลาแวะประมาณ 45–60 นาที เพื่อสั่งเครื่องดื่ม นั่งพัก และถ่ายภาพ เป็นเวลาแนะนำสำหรับจัดแผน ไม่ใช่ระยะเวลาที่ร้านกำหนด หากรับประทานอาหารด้วยควรเผื่อเวลาเพิ่มและตรวจเมนูก่อน",
    "เลือกช่วงแวะให้สัมพันธ์กับที่พักและสถานที่เที่ยวอื่น จะช่วยให้เดินทางสบายขึ้น หลังทำกิจกรรมกลางแจ้งอาจแวะพักก่อนเดินทางต่อ โดยเปลี่ยนเสื้อผ้าเปียกหรือทำความสะอาดรองเท้าให้เรียบร้อยก่อนเข้าร้าน",
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
    <PageHero eyebrow="HUGLAO แนะนำ · คาเฟ่วังเวียง" title={TITLE} description="แวะพักในบรรยากาศอบอุ่นกับเสน่ห์การตกแต่งสไตล์ลาว" breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ", href: "/articles/" }, { label: "บ้านน้ำคาเฟ่ วังเวียง" }]} />
    <article className="bg-[#f7f3e9] py-8 sm:py-14"><div className="hl-shell max-w-[1000px]">
      <figure><Image src={PHOTOS[0].src} alt={PHOTOS[0].alt} width={1280} height={960} priority sizes="(max-width: 1024px) 92vw, 960px" className="h-auto w-full rounded-2xl" /><figcaption className="mt-2 text-xs leading-6 text-[#59645d]">ป้าย BanNam cafe และเคาน์เตอร์ในบรรยากาศโทนเหลืองอบอุ่น</figcaption></figure>
      <div className="mt-6 space-y-4 text-sm leading-7 text-[#46534a] sm:text-base sm:leading-8"><p>วังเวียงมีเสน่ห์มากกว่าภูเขาและกิจกรรมกลางแจ้ง การหาเวลานั่งพักในคาเฟ่ก็เป็นอีกวิธีที่ช่วยให้ได้ใช้เวลากับเมืองนี้ โดยเฉพาะวันที่อยากเดินทางสบาย ๆ ดื่มกาแฟ พูดคุยกับเพื่อน และเก็บภาพบรรยากาศระหว่างทาง</p><p>BanNam Cafe &amp; Restaurant หรือบ้านน้ำ คาเฟ่ แอนด์ เรสเตอรองต์ เป็นอีกชื่อที่เก็บไว้ในรายการคาเฟ่วังเวียงได้ สำหรับคนชอบร้านโทนอบอุ่น มีรายละเอียดพื้นเมือง และมีมุมให้ค่อย ๆ มองมากกว่าการแวะซื้อเครื่องดื่มแล้วเดินทางต่อทันที</p></div>
      <nav aria-label="หัวข้อในบทความ" className="mt-6 grid grid-cols-2 gap-2">{[{ href: "#atmosphere", text: "บรรยากาศร้าน" }, { href: "#bannam-gallery", text: "ภาพร้านทั้ง 10 รูป" }, { href: "#trip-plan", text: "วางแผนแวะพัก" }, { href: "#bannam-map", text: "แผนที่และเวลาเปิด" }].map(item => <a key={item.href} href={item.href} className="flex min-h-12 items-center justify-between gap-2 rounded-xl border border-[#ddd4c1] bg-white px-3 text-sm font-semibold text-[#0a2d20]">{item.text}<span aria-hidden="true">↓</span></a>)}</nav>
      {SECTIONS.map((section, index) => <section key={section.id} id={section.id} className="mt-10 scroll-mt-24"><h2 className={heading}>{section.title}</h2><div className="mt-4 space-y-4 text-sm leading-7 text-[#46534a] sm:text-base sm:leading-8">{section.paragraphs.map(text => <p key={text}>{text}</p>)}</div>{(index === 1 || index === 3) && <figure className="mt-5"><Image src={PHOTOS[index === 1 ? 5 : 9].src} alt={PHOTOS[index === 1 ? 5 : 9].alt} width={index === 1 ? 1280 : 720} height={index === 1 ? 960 : 1280} sizes="(max-width: 640px) 92vw, 640px" className={`h-auto rounded-2xl ${index === 1 ? "w-full" : "mx-auto w-full max-w-sm"}`} /><figcaption className="mt-2 text-center text-xs leading-6 text-[#59645d]">{PHOTOS[index === 1 ? 5 : 9].caption}</figcaption></figure>}</section>)}
      <section id="bannam-gallery" className="mt-10 scroll-mt-24"><h2 className={heading}>มุมร้านและบรรยากาศริมน้ำ</h2><p className="mt-3 text-sm leading-6 text-[#59645d]">เลื่อนดูภาพ แตะเพื่อขยาย ทั้งภายในร้านและมุมนั่งพักกลางแจ้ง</p><VanAlbum label="อัลบั้มบ้านน้ำคาเฟ่ วังเวียง" imageFit="contain" groups={[{ title: "บ้านน้ำคาเฟ่ ผ่านภาพบรรยากาศ 10 มุม", items: PHOTOS }]} /></section>
      <section className="mt-10"><h2 className={heading}>มุมถ่ายภาพที่น่าเก็บ</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#46534a]">{["เคาน์เตอร์ที่เห็นป้าย BanNam Cafe", "โคมไฟสานกับโครงสร้างไม้ในภาพเดียว", "ลวดลายของตกแต่งและภาพบนผนัง", "เครื่องดื่มหรือขนมที่สั่งจริงในวันนั้น", "ภาพนั่งพักหรือพูดคุยที่เล่าบรรยากาศการเดินทาง"].map(text => <li key={text}>{text}</li>)}</ul><p className="mt-4 text-sm leading-7 text-[#46534a]">ถ่ายด้วยโทรศัพท์ให้ลองปรับความสว่างให้พอดีกับป้ายไฟและโคมไฟ เพื่อลดส่วนสว่างจ้าจนรายละเอียดหาย และระวังไม่ให้ติดใบหน้าลูกค้าท่านอื่นโดยไม่ได้รับอนุญาต</p></section>
      <section id="bannam-map" className="mt-10 scroll-mt-24 rounded-2xl border border-[#ddd4c1] bg-white p-5 sm:p-7"><h2 className={heading}>แผนที่และเวลาเปิดบริการ</h2><p className="mt-4 text-sm leading-7 text-[#46534a]">ค้นหาชื่อ BanNam Cafe &amp; Restaurant, Vang Vieng ใน Google Maps ลิงก์นี้เป็นการค้นหาชื่อร้าน ยังไม่ใช่หมุดที่ตรวจสอบพิกัดแน่นอนแล้ว ก่อนออกเดินทางควรตรวจตำแหน่งและเส้นทางอีกครั้ง</p><a href={MAP} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-4">ค้นหาบ้านน้ำคาเฟ่ในแผนที่ ↗</a><p className="mt-4 text-sm leading-7 text-[#59645d]">ข้อมูลภาพ Google Maps ที่ส่งประกอบบทความระบุเวลาเปิดครั้งถัดไป 07.00 น. แต่ยังไม่มีเวลาปิดและวันหยุดครบถ้วน ควรตรวจตารางเปิดบริการกับร้านก่อนวางแผนแวะ</p></section>
      <section className="mt-10 rounded-2xl bg-[#0a2d20] p-5 text-white sm:p-7"><h2 className="font-serif-th text-2xl font-bold">แวะคาเฟ่วังเวียงในแบบของคุณกับ HUGLAO</h2><p className="mt-4 text-sm leading-7 text-[#d5ddd7]">บางคนชอบเริ่มวันด้วยกาแฟ บางคนอยากแวะหลังเที่ยวธรรมชาติ หรือมีเวลานั่งพักโดยไม่ต้องเร่งไปทุกจุด HUGLAO ช่วยจัดหาและประสานรถส่วนตัวพร้อมคนขับ รวมถึงวางเส้นทางให้เหมาะกับที่พัก จุดเที่ยว และเวลาของคุณ</p><p className="mt-4 font-semibold text-[#efd276]">เที่ยวลาวในแบบคุณ<br />คุณเลือกที่เที่ยว เราช่วยดูแลการเดินทาง</p><div className="mt-5 flex flex-wrap gap-3"><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary">คุยแผนเที่ยวผ่าน LINE</a><a href={SITE.phoneHref} className="inline-flex min-h-11 items-center text-sm font-semibold underline">โทร {SITE.phoneDisplay}</a></div><Link href="/vang-vieng/" className="mt-4 inline-flex min-h-11 items-center text-sm text-[#efd276] underline">ดูรถพร้อมคนขับในวังเวียง →</Link></section>
      <aside className="mt-6 rounded-2xl border border-[#ddd4c1] bg-white p-4"><Link href="/articles/the-mini-cafe-vang-vieng/" className="flex min-h-12 items-center justify-between gap-4 text-sm font-semibold text-[#0a2d20]">คาเฟ่วังเวียงอีกแห่ง: The Mini Cafe &amp; Restaurant <span aria-hidden="true">→</span></Link></aside>
      <footer className="mt-7 text-xs leading-6 text-[#687169]">ภาพทั้ง 10 รูปและข้อมูลประกอบ: เจ้าของ HUGLAO ส่งสำหรับบทความนี้ ข้อมูลบรรยากาศอธิบายจากภาพ ไม่ยืนยันเมนู ราคา ตารางเปิดบริการ หรือสิ่งอำนวยความสะดวกปัจจุบันของร้าน</footer>
    </div></article>
  </main>;
}
