import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import VanAlbum from "@/components/VanAlbum";
import { SITE } from "@/data/site";

const PATH = "/articles/pho-zap-vientiane/";
const TITLE = "เฝอแซ่บ เวียงจันทน์ ร้านแนะนำใกล้ประตูชัย | Pho Zap";
const DESCRIPTION = "HUGLAO แนะนำเฝอแซ่บ Pho Zap สาขาใกล้ประตูชัย จากการไปกินจริง พร้อมภาพเฝอ ปอเปี๊ยะทอด เมนูและราคาในวันที่ถ่าย รวมข้อควรรู้เรื่องหลายสาขาก่อนแวะ";
const LISTING = "https://www.wongnai.com/restaurants/219148CW-เฝอแซ่บ-เวียงจันทน์";
const BRANCH = "https://www.wongnai.com/restaurants/3568746Zt-เฝอแซ่บ-สาขา-view-mall-เวียงจันทน์-view-mall-เวียงจันทน์";
const MAP = "https://www.google.com/maps/search/?api=1&query=Pho+Zap+Vientiane+Patuxai";
const photo = (file: string, alt: string) => ({ src: `/images/pho-zap-vientiane/${file}.webp`, alt, caption: alt });
const FOOD = [
  photo("pho-meal", "เฝอ ปอเปี๊ยะทอด เนื้อสไลซ์ ผัก และน้ำจิ้มบนโต๊ะที่ร้านเฝอแซ่บ"),
  photo("pho-and-herbs", "เฝอน้ำใสใส่เนื้อและลูกชิ้น พร้อมถั่วงอกและผักแยกจาน"),
  photo("sliced-meat-side", "เนื้อสไลซ์โรยต้นหอมพร้อมน้ำจิ้มแยกถ้วย"),
  photo("fried-spring-rolls", "ปอเปี๊ยะทอดหั่นชิ้นเสิร์ฟคู่กับน้ำจิ้ม"),
];
const MENUS = [photo("food-menu", "เมนูอาหาร PHO ZAP พร้อมขนาดและราคาเป็นเงินกีบในวันที่ถ่าย"), photo("drink-menu", "เมนูเครื่องดื่ม PHO ZAP พร้อมราคาเป็นเงินกีบในวันที่ถ่าย")];
export const metadata: Metadata = {
  title: TITLE, description: DESCRIPTION, alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article", url: PATH, images: [{ url: FOOD[0].src, alt: FOOD[0].alt }] },
};

export default function PhoZapArticle() {
  const heading = "font-serif-th text-2xl font-bold leading-snug text-[#0a2d20] sm:text-3xl";
  const card = "rounded-2xl border border-[#ddd4c1] bg-white p-5 sm:p-7";
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: TITLE, description: DESCRIPTION, image: [...FOOD, ...MENUS].map(p => `${SITE.website}${p.src}`), author: { "@type": "Organization", name: "HUGLAO" }, publisher: { "@id": `${SITE.website}/#organization` }, mainEntityOfPage: `${SITE.website}${PATH}` };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <PageHero eyebrow="ร้านอาหารและคาเฟ่ · HUGLAO แนะนำ" title="เฝอแซ่บ เวียงจันทน์ (Pho Zap)" description="ร้านแนะนำใกล้ประตูชัย แวะอิ่มกับเฝอและของกินเล่นระหว่างเที่ยวเมือง" breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ", href: "/articles/" }, { label: "เฝอแซ่บ เวียงจันทน์" }]} />
    <article className="bg-[#f7f3e9] py-7 sm:py-12"><div className="hl-shell max-w-[1000px]">
      <figure><Image src={FOOD[0].src} alt={FOOD[0].alt} width={1280} height={960} priority sizes="(max-width: 1024px) 92vw, 960px" className="h-auto w-full rounded-2xl" /><figcaption className="mt-2 text-xs leading-6 text-[#59645d]">ภาพจากมื้อที่ไปกินจริง ณ ร้านเฝอแซ่บ สาขาใกล้ประตูชัย</figcaption></figure>
      <div className="mt-6 rounded-2xl border-l-4 border-[#d8af4a] bg-[#0a2d20] p-5 text-white sm:p-7"><p className="text-sm font-semibold text-[#efd276]">ไปกินมาแล้ว จึงอยากบอกต่อ</p><p className="mt-2 leading-8">มื้อนี้เราได้แวะร้านเฝอแซ่บในเวียงจันทน์ กินแล้วรู้สึกว่าอร่อยดี เลยอยากเก็บไว้เป็นอีกร้านแนะนำของ HUGLAO สำหรับคนที่กำลังหาที่แวะกินระหว่างเที่ยวเมือง ภาพอาหารและเมนูในบทความเป็นภาพจากการไปกินครั้งนั้น</p></div>
      <div className="mt-6 space-y-5 leading-8 text-[#364b3d]">
        <section className={card}><h2 className={heading}>เฝอแซ่บ ใกล้ประตูชัย แวะไว้ในแผนเที่ยวเมือง</h2><p className="mt-3">ถ้าวันเที่ยวเวียงจันทน์ของคุณมีประตูชัยหรือพระธาตุหลวงอยู่ในแผน ลองเพิ่มช่วงพักกินอาหารแทนการเดินทางต่อเนื่องทั้งวัน เฝอแซ่บ หรือ PHO ZAP เป็นหนึ่งในร้านที่เราอยากชวนให้รู้จัก โดยบทความนี้เน้นร้านสาขาใกล้ประตูชัยที่เราแวะไปกิน</p><p className="mt-3">จุดที่เห็นจากมื้อนี้คือเฝอเสิร์ฟมาพร้อมผักและน้ำจิ้มแยก มีของกินเล่นให้สั่งแบ่งกันบนโต๊ะ เลือกกินเป็นมื้อหลัก หรือสั่งเฝอแล้วเพิ่มปอเปี๊ยะทอดมาแบ่งกับเพื่อนก็ได้ โดยถามขนาดอาหารก่อนสั่งให้พอดีกับความหิวของแต่ละคน</p></section>
        <section><h2 className={heading}>มื้อนี้มีอะไรบนโต๊ะบ้าง?</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{[
          ["เฝอพร้อมผักและเครื่องเคียง", "ในภาพมีเฝอน้ำใส เนื้อสไลซ์และลูกชิ้น พร้อมถั่วงอกและผักแยกจาน ใครชอบปรุงรสเองค่อย ๆ เติมเครื่องปรุงและชิมตามความชอบได้"],
          ["ปอเปี๊ยะทอด", "เสิร์ฟหั่นเป็นชิ้นพร้อมน้ำจิ้มแยกถ้วย เป็นอีกจานที่สั่งมาแบ่งกินคู่กับเฝอได้ รูปในบทความเป็นจานที่สั่งจริงในมื้อนี้"],
          ["เนื้อสไลซ์แยกจาน", "ภาพอีกจานเป็นเนื้อสไลซ์โรยต้นหอมพร้อมน้ำจิ้ม หากอยากสั่งแบบเดียวกัน แสดงภาพให้พนักงานช่วยยืนยันชื่อเมนูและขนาดก่อนสั่ง"],
          ["เครื่องดื่มให้เลือกเพิ่ม", "เมนูที่ถ่ายมามีเครื่องดื่มผลไม้ กาแฟ ชา และโยเกิร์ต รายการที่มีจริงในแต่ละวันอาจเปลี่ยนได้ ควรดูเมนูหน้าร้านอีกครั้ง"],
        ].map(([title, text]) => <div key={title} className={card}><h3 className="font-semibold text-[#0a2d20]">{title}</h3><p className="mt-2 text-sm leading-7">{text}</p></div>)}</div><VanAlbum label="ภาพอาหารจากร้านเฝอแซ่บ" compact imageFit="contain" groups={[{ title: "อาหารจากมื้อที่ไปกินจริง", items: FOOD }]} /></section>
        <section className={card}><h2 className={heading}>เมนูและราคาในภาพที่ถ่ายมา</h2><p className="mt-3">ราคาต่อไปนี้อ่านจากเมนูในภาพที่เจ้าของ HUGLAO ถ่ายไว้ ยังไม่มีวันที่ถ่ายที่ยืนยัน จึงใช้ประกอบการวางแผนเท่านั้น ไม่ใช่ราคาปัจจุบันที่ร้านยืนยัน และอาจต่างกันตามสาขา</p><div className="mt-4 divide-y divide-[#e7e1d6]">{[
          ["เฝอ", "S 70,000 · L 80,000 · J 90,000 · Gold 140,000 กีบ"],
          ["ปอเปี๊ยะทอด", "S 50,000 · L 60,000 · J 70,000 กีบ"],
          ["เครื่องดื่มผลไม้หลายรายการ", "40,000 กีบ ตามรายการในภาพ"],
          ["กาแฟ", "ร้อน 30,000 · เย็น 40,000 กีบ"],
        ].map(([name, price]) => <div key={name} className="py-3"><h3 className="font-semibold text-[#0a2d20]">{name}</h3><p className="mt-1 text-sm font-semibold leading-7 text-[#86611a]">{price}</p></div>)}</div><p className="mt-3 text-sm leading-7">ขนาด S / L / J / Gold ใช้ตามที่พิมพ์บนเมนู ถามพนักงานเรื่องปริมาณและส่วนประกอบก่อนสั่ง โดยเฉพาะหากไม่กินเนื้อสัตว์บางชนิดหรือมีอาหารที่แพ้</p><VanAlbum label="ภาพเมนูอาหารและเครื่องดื่มเฝอแซ่บ" compact imageFit="contain" groups={[{ title: "แตะภาพเมนูเพื่อขยายอ่าน", items: MENUS }]} /></section>
        <section className={card}><h2 className={heading}>รู้จักชื่อ PHO ZAP และเรื่องราวของร้าน</h2><p className="mt-3">บนเมนูที่ถ่ายมามีชื่อ PHO ZAP และข้อความ “Original Taste Since 1958” เป็นจุดสังเกตชื่อร้านและเรื่องราวที่แบรนด์ใช้สื่อสาร ส่วนรายละเอียดประวัติผู้ก่อตั้งและลำดับการเปิดสาขายังไม่มีข้อมูลจากร้านที่ยืนยัน จึงไม่ขยายความเกินจากข้อความที่เห็นในเมนู</p></section>
        <section className={card}><h2 className={heading}>เฝอแซ่บมีหลายสาขา ตรวจชื่อก่อนเดินทาง</h2><p className="mt-3">เฝอแซ่บมีหลายสาขาในเวียงจันทน์ นอกจากร้านใกล้ประตูชัยที่เล่าในบทความ ยังพบรายการสาขา View Mall และร้านที่ระบุว่าอยู่ใกล้สนามบินวัตไต ข้อมูลเหล่านี้เป็นรายการร้านจากเว็บไซต์รีวิว ไม่ใช่รายชื่อสาขาทั้งหมดที่ยืนยันจากผู้ประกอบการ</p><p className="mt-3">เวลาเปิด เมนู ราคา และพื้นที่จอดรถของแต่ละสาขาอาจต่างกัน อย่านำข้อมูลสาขาอื่นมาใช้แทนโดยอัตโนมัติ โดยเฉพาะหากเดินทางเป็นกลุ่มหรือใช้รถมินิบัสและรถบัส ควรให้ทีมตรวจสาขาและพื้นที่จอดก่อนแวะ</p><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm"><a href={BRANCH} target="_blank" rel="noopener noreferrer" className="text-[#86611a] underline">ข้อมูลสาขา View Mall ↗</a><a href="https://www.wongnai.com/restaurants/2832228Xq-เฝอแซ่บ-ใกล้สนามบินเวียงจันทน์" target="_blank" rel="noopener noreferrer" className="text-[#86611a] underline">รายการร้านใกล้สนามบิน ↗</a></div></section>
        <section className={card}><h2 className={heading}>แผนที่และข้อควรรู้ก่อนแวะ</h2><ul className="mt-3 list-disc space-y-2 pl-5"><li>บทความนี้แนะนำสาขาใกล้ประตูชัย ส่งชื่อสาขาหรือภาพหน้าร้านให้คนขับตรวจให้ตรงกันก่อนออกเดินทาง</li><li>ยังไม่มีเวลาเปิด–ปิดและเบอร์ติดต่อสาขานี้ที่ยืนยันจากร้านโดยตรง ควรตรวจสอบก่อนจัดเวลาแวะ</li><li>เผื่อเวลาประมาณ 45–60 นาทีสำหรับมื้ออาหาร เป็นเวลาแนะนำสำหรับวางแผน ไม่ใช่เวลาที่ร้านรับประกัน</li><li>หากมีรถไฟหรือเที่ยวบินต่อ เผื่อเวลารออาหารและเดินทางไปสถานีหรือสนามบินด้วย</li></ul><a href={MAP} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-5">ค้นหาร้านใน Google Maps ↗</a><p className="mt-2 text-xs leading-6 text-[#59645d]">ลิงก์ค้นหาชื่อร้าน ยังไม่ใช่หมุดสาขาที่ตรวจยืนยันแล้ว ตรวจผลการค้นหาและสาขาก่อนนำทาง</p><a href={LISTING} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-[#86611a] underline">ดูรายการร้านและภาพหน้าร้านจากผู้รีวิว ↗</a></section>
        <section className="rounded-2xl bg-[#0a2d20] p-5 text-white sm:p-7"><h2 className="font-serif-th text-2xl font-bold sm:text-3xl">คุณเลือกร้านที่อยากแวะ เราช่วยดูแผนเดินทาง</h2><p className="mt-3 leading-8 text-[#d5ddd7]">อยากเที่ยวประตูชัย พระธาตุหลวง แล้วพักกินเฝอระหว่างวัน บอกสถานที่ที่สนใจ จุดรับ และเวลาที่มี ให้ HUGLAO ช่วยเรียงเส้นทางส่วนตัวตามจังหวะของคุณ ค่าอาหารชำระแยกจากบริการรถ เว้นแต่มีข้อตกลงระบุไว้</p><div className="mt-5 flex flex-wrap gap-3"><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary">คุยแผนผ่าน LINE</a><Link href="/routes/vientiane-city/" className="hl-button-secondary">ดูเส้นทางเที่ยวเวียงจันทน์</Link></div></section>
      </div>
      <footer className="mt-6 space-y-2 text-xs leading-6 text-[#687169]"><p>ภาพอาหารและเมนูทั้ง 6 ภาพ: เจ้าของ HUGLAO ส่งจากการไปกินจริง อนุญาตให้ใช้ประกอบบทความ ย่อขนาดและแปลงเป็น WebP</p><p>ความเห็นว่าอร่อยเป็นประสบการณ์ส่วนบุคคลจากผู้ไปกิน ข้อมูลสาขาประกอบจาก <a href={LISTING} className="underline" target="_blank" rel="noopener noreferrer">Wongnai</a> ตรวจทาน 7 พฤศจิกายน 2569 โดยไม่ใช้คะแนนหรือรีวิวผู้อื่นเป็นคะแนนของ HUGLAO</p></footer>
    </div></article>
  </main>;
}
