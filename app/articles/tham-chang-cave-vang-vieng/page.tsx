import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import VanAlbum from "@/components/VanAlbum";
import { SITE } from "@/data/site";

const PATH = "/articles/tham-chang-cave-vang-vieng/";
const TITLE = "ถ้ำจัง วังเวียง (Tham Chang Cave) เดินชมถ้ำและธรรมชาติ";
const DESCRIPTION = "รู้จักถ้ำจัง วังเวียง ทางขึ้นประมาณ 147 ขั้น หินงอกหินย้อย จุดชมวิว และธรรมชาติด้านล่าง พร้อมภาพจริง แผนที่ และข้อควรรู้ก่อนเดินทาง";
const MAP = "https://maps.app.goo.gl/v2qoUg4SSWiVBWCe9";
const PHOTOS = [
  ["cave-stairs", "บันไดขึ้นถ้ำจังท่ามกลางต้นไม้และป้าย Jang Cave"],
  ["orange-bridge-gate", "ซุ้มทางเดินสะพานสีส้มบริเวณถ้ำจัง"],
  ["orange-bridge", "ทางเดินและราวสะพานสีส้มข้ามแม่น้ำ"],
  ["nam-song-river", "แม่น้ำซองกับเรือที่จอดเรียงริมฝั่ง"],
  ["waterway", "ทางน้ำสีเขียวและพื้นที่พักริมหน้าผา"],
  ["blue-pool", "บริเวณน้ำใสด้านล่างหน้าผา มีผู้ใช้ห่วงยางและเรือ"],
  ["pool-panorama", "ภาพกว้างบริเวณน้ำใสกับลานริมน้ำและต้นไม้"],
  ["clear-water", "น้ำใสบริเวณด้านล่างถ้ำและทางเดินริมฝั่ง"],
  ["waterside-pavilion", "ศาลาและสะพานเล็กริมน้ำใสบริเวณถ้ำจัง"],
].map(([file, alt]) => ({ src: `/images/tham-chang-vang-vieng/${file}.webp`, alt, caption: alt }));
const SECTIONS = [
  { id: "location", title: "ถ้ำจังอยู่ที่ไหน?", paragraphs: [
    "ถ้ำจังตั้งอยู่ทางตอนใต้ของตัวเมืองวังเวียง ใกล้แม่น้ำซอง เป็นหนึ่งในถ้ำที่เว็บไซต์การท่องเที่ยวลาวแนะนำให้รู้จักเมื่อมาเยือนเมืองนี้",
    "พื้นที่เที่ยวมีทั้งบริเวณด้านล่าง ทางขึ้นบันได และเส้นทางภายในถ้ำ เมื่อถึงจุดจอดรถจึงยังต้องเดินต่อ ควรเตรียมตัวสำหรับการเดินและขึ้นบันไดด้วย ส่วนทางเข้าหรือสะพานข้ามแม่น้ำให้ตรวจสภาพในวันเดินทาง เพราะภาพรีวิวแต่ละปีอาจต่างกัน",
  ] },
  { id: "stairs", title: "ขึ้นบันได 147 ขั้น ค่อย ๆ เดินก็เที่ยวได้สนุกขึ้น", paragraphs: [
    "ก่อนเข้าสู่ถ้ำต้องเดินขึ้นบันไดประมาณ 147 ขั้น บางช่วงค่อนข้างชัน ควรเดินตามกำลังและหยุดพักเมื่อจำเป็น ไม่ต้องรีบขึ้นให้ถึงพร้อมกันทั้งคณะ",
    "หากมากับครอบครัวหรือเพื่อน ให้ตกลงจุดรอและจังหวะการเดิน เผื่อเวลาในวันที่อากาศร้อนหรือคนมาก ผู้สูงอายุ ผู้มีอาการเจ็บเข่า หรือขึ้นบันไดไม่สะดวกควรพิจารณาความพร้อมก่อนขึ้นถ้ำ ส่วนเด็กควรมีผู้ใหญ่ดูแลระหว่างขึ้นลงและบริเวณจุดชมวิว",
  ] },
  { id: "inside-cave", title: "ชมความสวยงามของหินงอกหินย้อยภายในถ้ำ", paragraphs: [
    "ภายในถ้ำจังมีหินงอกหินย้อยและพื้นผิวหินรูปทรงต่างกัน บางส่วนเป็นชั้น บางส่วนทอดลงมาจากด้านบน แต่ละช่วงจึงมีรายละเอียดให้สังเกตไม่เหมือนกัน",
    "มีไฟส่องสว่างตามจุดต่าง ๆ ช่วยให้เห็นลักษณะหินและเดินชมได้สะดวกขึ้น แต่ยังควรมองทางอย่างระมัดระวัง เพราะระดับแสงและสภาพพื้นต่างจากกลางแจ้ง ลองใช้จินตนาการมองรูปทรงหินร่วมกับเพื่อนหรือครอบครัว เป็นกิจกรรมเล็ก ๆ ระหว่างเดินชม",
    "ชมโดยไม่สัมผัสหินงอกหินย้อย ไม่ขีดเขียน และไม่เก็บชิ้นส่วนออกจากถ้ำ เพื่อรักษาพื้นที่ให้ผู้เดินทางคนอื่นได้ชื่นชมต่อไป",
  ] },
  { id: "viewpoint", title: "จุดชมวิวที่เผยให้เห็นวังเวียงอีกมุม", paragraphs: [
    "บริเวณชมวิวมองออกไปเห็นแม่น้ำซองและพื้นที่โดยรอบเมือง เป็นโอกาสให้หยุดพักหลังขึ้นบันได และมองภูมิประเทศจากระดับที่สูงขึ้น",
    "วิวเปลี่ยนตามฤดูกาล อากาศ และช่วงเวลา บางวันฟ้าเปิด บางวันมีเมฆหรือหมอก ส่วนพื้นที่เกษตรก็ไม่ได้เขียวตลอดปี เมื่อถ่ายภาพให้ยืนในพื้นที่ที่จัดไว้ ไม่ปีนข้ามแนวกั้น และแบ่งพื้นที่ให้ผู้อื่นใช้ร่วมกัน",
  ] },
  { id: "lower-area", title: "ธรรมชาติบริเวณด้านล่างถ้ำ", paragraphs: [
    "นอกจากเดินชมถ้ำ บริเวณน้ำใสและธรรมชาติด้านล่างยังเป็นมุมพักหรือถ่ายภาพก่อนเดินทางต่อ ภาพที่นำมาให้ชมในบทความนี้มีทั้งทางน้ำ พื้นที่ริมน้ำ บันได และสะพาน ไม่ใช่ภาพภายในถ้ำหรือจากจุดชมวิวบนถ้ำ",
    "หากจะลงน้ำ ให้ตรวจสอบกับผู้ดูแลก่อนทุกครั้ง ไม่ตัดสินจากภาพเก่าเพียงอย่างเดียว เพราะระดับน้ำ กระแสน้ำ และการเปิดพื้นที่เปลี่ยนได้ตามอากาศ แม้ไม่ลงน้ำก็นั่งพักหรือถ่ายภาพในบริเวณที่อนุญาตได้",
  ] },
  { id: "time-needed", title: "ควรเผื่อเวลาเที่ยวถ้ำจังเท่าไหร่?", paragraphs: [
    "แนะนำประมาณ 1–2 ชั่วโมง รวมเดินเข้าพื้นที่ ขึ้นลงบันได ชมถ้ำ และถ่ายภาพ เป็นเวลาแนะนำสำหรับจัดแผน ระยะเวลาจริงขึ้นอยู่กับจังหวะเดิน จำนวนผู้เข้าชม และเวลาที่ใช้แต่ละจุด",
    "หากมีผู้สูงอายุหรือเด็กควรเพิ่มเวลาพัก ไม่วางกิจกรรมต่อไปชิดเกินไป สำหรับคนที่มีรถไฟหรือเที่ยวบินต่อวันเดียวกัน ควรกำหนดเวลาออกจากสถานที่และเผื่อเวลาเดินกลับถึงรถให้ชัดเจน",
  ] },
] as const;

export const metadata: Metadata = {
  title: TITLE, description: DESCRIPTION, alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article", url: PATH, images: [{ url: PHOTOS[0].src, alt: PHOTOS[0].alt }] },
};

export default function ThamChangArticle() {
  const heading = "font-serif-th text-2xl font-bold leading-snug text-[#0a2d20] sm:text-3xl";
  const schemas = [
    { "@context": "https://schema.org", "@type": "Article", headline: TITLE, description: DESCRIPTION, image: PHOTOS.map(p => `${SITE.website}${p.src}`), author: { "@type": "Organization", name: "HUGLAO" }, publisher: { "@id": `${SITE.website}/#organization` }, mainEntityOfPage: `${SITE.website}${PATH}` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE.website}/` }, { "@type": "ListItem", position: 2, name: "บทความ", item: `${SITE.website}/articles/` }, { "@type": "ListItem", position: 3, name: "ถ้ำจัง วังเวียง", item: `${SITE.website}${PATH}` }] },
  ];
  return <main>
    {schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
    <PageHero eyebrow="HUGLAO แนะนำ · ธรรมชาติวังเวียง" title="ถ้ำจัง วังเวียง (Tham Chang Cave)" description="เดินชมถ้ำหินปูน ขึ้นบันไดชมวิว และพักใจกับธรรมชาติของลาว" breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ", href: "/articles/" }, { label: "ถ้ำจัง วังเวียง" }]} />
    <article className="bg-[#f7f3e9] py-8 sm:py-14"><div className="hl-shell max-w-[1000px]">
      <figure><Image src={PHOTOS[0].src} alt={PHOTOS[0].alt} width={1280} height={1707} priority sizes="(max-width: 768px) 92vw, 640px" className="mx-auto h-auto w-full max-w-[640px] rounded-2xl" /><figcaption className="mt-2 text-center text-xs leading-6 text-[#59645d]">บันไดทางขึ้นถ้ำจังและป้ายชื่อถ้ำท่ามกลางธรรมชาติ</figcaption></figure>
      <div className="mt-6 space-y-4 text-sm leading-7 text-[#46534a] sm:text-base sm:leading-8"><p>หากกำลังวางแผนเที่ยววังเวียง แล้วอยากเพิ่มจุดที่ได้ทั้งเดินชมธรรมชาติ สำรวจถ้ำ และมองเมืองจากมุมสูง “ถ้ำจัง” หรือ Tham Chang Cave เป็นอีกสถานที่ที่น่าสนใจสำหรับจัดไว้ในแผน</p><p>เสน่ห์อยู่ที่ประสบการณ์ระหว่างทาง ตั้งแต่เดินเข้าสู่ธรรมชาติ ค่อย ๆ ขึ้นบันไดตามหน้าผา ชมรูปทรงหินในถ้ำ และหยุดมองพื้นที่รอบเมืองจากจุดชมวิว เหมาะกับการเที่ยวไม่เร่งรีบ ให้เวลากับการเดิน พัก และสังเกตรอบตัว</p></div>
      <nav aria-label="หัวข้อในบทความ" className="mt-6 grid grid-cols-2 gap-2">{[{ href: "#stairs", text: "ทางขึ้นและการเดิน" }, { href: "#tham-chang-gallery", text: "ภาพและวิดีโอ" }, { href: "#visit-info", text: "เวลาและค่าเข้า" }, { href: "#tham-chang-map", text: "แผนที่ถ้ำจัง" }].map(item => <a key={item.href} href={item.href} className="flex min-h-12 items-center justify-between gap-2 rounded-xl border border-[#ddd4c1] bg-white px-3 text-sm font-semibold text-[#0a2d20]">{item.text}<span aria-hidden="true">↓</span></a>)}</nav>
      {SECTIONS.map(section => <section key={section.id} id={section.id} className="mt-10 scroll-mt-24"><h2 className={heading}>{section.title}</h2><div className="mt-4 space-y-4 text-sm leading-7 text-[#46534a] sm:text-base sm:leading-8">{section.paragraphs.map(text => <p key={text}>{text}</p>)}</div></section>)}
      <section id="tham-chang-gallery" className="mt-10 scroll-mt-24"><h2 className={heading}>ภาพบรรยากาศรอบถ้ำจัง</h2><p className="mt-3 text-sm leading-6 text-[#59645d]">ภาพจากชุดที่ส่งให้ HUGLAO เลื่อนดูและแตะเพื่อขยาย</p><VanAlbum label="อัลบั้มถ้ำจัง วังเวียง" imageFit="contain" groups={[{ title: "บันได สะพาน และธรรมชาติด้านล่าง", items: PHOTOS }]} /><h3 className="mt-7 text-lg font-semibold text-[#0a2d20]">วิดีโอบรรยากาศจากทริป</h3><video controls playsInline preload="none" poster={PHOTOS[5].src} aria-label="วิดีโอบรรยากาศถ้ำจังจากเจ้าของภาพ" className="mt-4 max-h-[600px] w-full rounded-2xl bg-[#071d13]"><source src="/videos/tham-chang-vang-vieng.mov" type="video/quicktime" />เบราว์เซอร์นี้ไม่รองรับวิดีโอต้นฉบับ</video><a href="/videos/tham-chang-vang-vieng.mov" className="mt-2 inline-flex min-h-11 items-center text-sm text-[#59645d] underline">เปิดไฟล์วิดีโอต้นฉบับ (.mov)</a><p className="text-xs leading-6 text-[#687169]">หากเล่นในหน้านี้ไม่ได้ ให้เปิดไฟล์ด้วยแอปที่รองรับ MOV</p></section>
      <section className="mt-10"><h2 className={heading}>เตรียมตัวก่อนเที่ยวถ้ำจัง</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#46534a]">{["สวมรองเท้าเดินสะดวกและพื้นเกาะดี", "เตรียมน้ำดื่มสำหรับช่วงขึ้นลงบันได", "พกสัมภาระเท่าที่จำเป็นให้เดินคล่องตัว", "เตรียมเงินสดสำหรับค่าเข้าและค่าใช้จ่ายหน้างาน", "ตรวจอากาศและการเปิดพื้นที่ก่อนเดินทาง", "เดินตามเส้นทางและคำแนะนำของผู้ดูแล", "รักษาความสะอาด ไม่สัมผัสหรือทำลายหินภายในถ้ำ"].map(text => <li key={text}>{text}</li>)}</ul></section>
      <section id="visit-info" className="mt-10 scroll-mt-24 rounded-2xl border border-[#ddd4c1] bg-white p-5 sm:p-7"><h2 className={heading}>เวลาเปิด–ปิดและค่าเข้าชม</h2><p className="mt-4 text-sm leading-7 text-[#46534a]">ข้อมูลท่องเที่ยวบางแหล่งเคยระบุเวลาเข้าชมประมาณ 08.00–16.00 น. และค่าเข้าถ้ำ 15,000 กีบ แต่ยังไม่ใช่ประกาศล่าสุดที่ยืนยันจากผู้ดูแล และข้อมูลออนไลน์มีทั้งเวลาหรือค่าใช้จ่ายที่ต่างกัน</p><p className="mt-3 text-sm leading-7 text-[#46534a]">ก่อนเดินทางให้ตรวจเวลาเปิด รวมถึงช่วงพักระหว่างวัน และสอบถามค่าใช้จ่ายรวมที่หน้างาน อาจมีค่าผ่านพื้นที่หรือค่าจอดรถแยก ควรทราบว่ารายการที่ชำระครอบคลุมอะไร โดยเฉพาะเมื่อมาเป็นคณะ</p></section>
      <section id="tham-chang-map" className="mt-10 scroll-mt-24"><h2 className={heading}>แผนที่ถ้ำจัง วังเวียง</h2><p className="mt-3 text-sm leading-7 text-[#59645d]">ชื่อสำหรับค้นหา: Tham Chang Cave, Vang Vieng, Laos</p><a href={MAP} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-4">เปิดแผนที่ถ้ำจัง ↗</a></section>
      <section className="mt-10 rounded-2xl bg-[#0a2d20] p-5 text-white sm:p-7"><h2 className="font-serif-th text-2xl font-bold">จัดแผนเที่ยววังเวียงกับ HUGLAO</h2><p className="mt-4 text-sm leading-7 text-[#d5ddd7]">อยากแวะถ้ำจังพร้อมจุดอื่น แจ้งสถานที่ที่สนใจ ที่พัก จำนวนคน และเวลาที่มี ทีม HUGLAO ช่วยจัดลำดับเส้นทางและประสานรถส่วนตัวพร้อมคนขับผ่านพาร์ตเนอร์ ให้เหมาะกับจังหวะเที่ยวของคณะ ค่าเข้าและกิจกรรมไม่รวมในค่ารถ</p><p className="mt-4 font-semibold text-[#efd276]">เที่ยวลาวในแบบคุณ<br />คุณเลือกที่เที่ยว เราช่วยดูแลการเดินทาง</p><div className="mt-5 flex flex-wrap gap-3"><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary">คุยแผนเที่ยวผ่าน LINE</a><a href={SITE.phoneHref} className="inline-flex min-h-11 items-center text-sm font-semibold underline">โทร {SITE.phoneDisplay}</a></div><Link href="/vang-vieng/" className="mt-4 inline-flex min-h-11 items-center text-sm text-[#efd276] underline">ดูรถพร้อมคนขับในวังเวียง →</Link></section>
      <section className="mt-8"><h2 className="text-lg font-semibold text-[#0a2d20]">แวะพักต่อที่คาเฟ่วังเวียง</h2><div className="mt-3 grid grid-cols-2 gap-3">{[{ href: "/articles/bannam-cafe-vang-vieng/", title: "บ้านน้ำคาเฟ่" }, { href: "/articles/the-mini-cafe-vang-vieng/", title: "The Mini Cafe" }].map(item => <Link key={item.href} href={item.href} className="flex min-h-16 items-center justify-between gap-2 rounded-xl border border-[#ddd4c1] bg-white p-4 text-sm font-semibold text-[#0a2d20]">{item.title}<span aria-hidden="true">→</span></Link>)}</div></section>
      <footer className="mt-8 space-y-2 text-xs leading-6 text-[#687169]"><p>ภาพทั้ง 9 รูปและวิดีโอ: เจ้าของ HUGLAO ส่งสำหรับบทความนี้</p><p>อ่านข้อมูลสถานที่: <a href="https://www.tourismlaos.org/central-provinces/vientiane-province/" target="_blank" rel="noopener noreferrer" className="underline">การท่องเที่ยวลาว — Tham Chang Cave</a> · ข้อมูลเวลาและค่าเข้าที่เคยเผยแพร่: <a href="https://www.laoslife.info/tham-chang-cave-vang-vieng/" target="_blank" rel="noopener noreferrer" className="underline">Laos Life</a> · <a href="https://travelersanddreamers.com/tham-chang-cave/" target="_blank" rel="noopener noreferrer" className="underline">บันทึกการเดินทางอีกช่วงเวลา</a> รายละเอียดหน้างานอาจเปลี่ยน โปรดตรวจสอบก่อนเดินทาง</p></footer>
    </div></article>
  </main>;
}
