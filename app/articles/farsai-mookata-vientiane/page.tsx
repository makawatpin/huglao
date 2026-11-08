import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import VanAlbum from "@/components/VanAlbum";
import { SITE } from "@/data/site";

const PATH = "/articles/farsai-mookata-vientiane/";
const TITLE = "ฟ้าใสหมูกระทะ เวียงจันทน์ ชิ้นดาดลาวสำหรับมื้อเย็น | Sindard Farsai";
const DESCRIPTION = "รู้จักฟ้าใสหมูกระทะ เวียงจันทน์ หรือชิ้นดาดฟ้าใส พร้อมภาพอาหารจริง เนื้อสไลซ์ ชุดรวมและผัก วิธีวางแผนมื้อเย็น แผนที่ เบอร์โทร และข้อมูลก่อนแวะ";
const MAP = "https://www.google.com/maps/search/?api=1&query=XJJ5%2B5CV%2C+Vientiane%2C+Laos";
const LISTING = "https://triple.guide/restaurants/ce12ca7a-6caa-4b74-b16e-d4ec37f05e32";
const GURU = "https://es.restaurantguru.com/Sindard-Farsai-Vientiane";
const REVIEW = "https://vte2019lao.hatenadiary.com/entry/2021/08/31/080000";
const FACEBOOK = "https://www.facebook.com/profile.php?id=100038006173526";
const photo = (file: string, alt: string) => ({ src: `/images/farsai-vientiane/${file}.webp`, alt, caption: alt });
const PHOTOS = [
  photo("table-and-grill", "เตาชิ้นดาดกลางโต๊ะ ล้อมด้วยเนื้อสไลซ์ ชุดรวม และน้ำจิ้มที่ร้านฟ้าใส"),
  photo("mixed-grill-set", "ชุดเนื้อรวมพร้อมกุ้ง ปลาหมึก และตะกร้าเห็ดสำหรับย่างและต้ม"),
  photo("sliced-meat-plates", "จานเนื้อสไลซ์และหมูสามชั้นเรียงรอบจานข้างเตา"),
  photo("grilling-meat", "เนื้อกำลังย่างบนกระทะ และเห็ดในน้ำซุปรอบเตา"),
  photo("fruit-drink", "เครื่องดื่มปั่นตกแต่งด้วยสับปะรดในที่ถือสาน"),
];
export const metadata: Metadata = { title: TITLE, description: DESCRIPTION, alternates: { canonical: PATH }, openGraph: { title: TITLE, description: DESCRIPTION, type: "article", url: PATH, images: [{ url: PHOTOS[0].src, alt: PHOTOS[0].alt }] } };

export default function FarsaiArticle() {
  const heading = "font-serif-th text-2xl font-bold leading-snug text-[#0a2d20] sm:text-3xl";
  const card = "rounded-2xl border border-[#ddd4c1] bg-white p-5 sm:p-7";
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: TITLE, description: DESCRIPTION, image: PHOTOS.map(p => `${SITE.website}${p.src}`), author: { "@type": "Organization", name: "HUGLAO" }, publisher: { "@id": `${SITE.website}/#organization` }, mainEntityOfPage: `${SITE.website}${PATH}`, about: { "@type": "Place", name: "Sindard Farsai", hasMap: MAP } };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <PageHero eyebrow="ร้านอาหารและคาเฟ่ · เวียงจันทน์" title="ฟ้าใสหมูกระทะ (Sindard Farsai) เวียงจันทน์" description="ชิ้นดาดลาวสำหรับมื้อเย็นกับครอบครัวและกลุ่มเพื่อน" breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ", href: "/articles/" }, { label: "ฟ้าใสหมูกระทะ" }]} />
    <article className="bg-[#f7f3e9] py-7 sm:py-12"><div className="hl-shell max-w-[1000px]">
      <figure><Image src={PHOTOS[0].src} alt={PHOTOS[0].alt} width={1280} height={960} priority sizes="(max-width: 1024px) 92vw, 960px" className="h-auto w-full rounded-2xl" /><figcaption className="mt-2 text-xs leading-6 text-[#687169]">มื้อชิ้นดาดที่ฟ้าใส · ภาพ: HUGLAO</figcaption></figure>
      <p className="mt-6 text-lg leading-9 text-[#364b3d]">ฟ้าใสหมูกระทะ หรือชิ้นดาดฟ้าใส เป็นตัวเลือกสำหรับมื้อเย็นในเวียงจันทน์ เหมาะกับวันที่อยากนั่งกินร่วมโต๊ะกับครอบครัวหรือเพื่อนหลังเที่ยวเมือง เผื่อเวลาสัก 1.5–2 ชั่วโมง จะได้ไม่ต้องรีบกลับไปทำกิจกรรมถัดไป</p>
      <p className="mt-3 leading-8 text-[#364b3d]">ร้านใช้ชื่อภาษาลาวว่า <span lang="lo">ຊີ້ນດາດຟ້າໃສ</span> ส่วนในรายการร้านออนไลน์จะพบชื่อ Sindard Farsai และชื่อสะกดใกล้เคียงกัน เวลาค้นหาแผนที่จึงควรเทียบที่ตั้งบ้านสะหว่างและเบอร์โทรด้วย เพื่อไม่สับสนกับร้านชื่อฟ้าใสในเมืองอื่น</p>
      <div className="mt-5 flex flex-wrap gap-3"><a href={MAP} target="_blank" rel="noopener noreferrer" className="hl-button-primary">เปิดแผนที่ร้าน ↗</a><a href="tel:+8562099777333" className="inline-flex min-h-12 items-center rounded-full border border-[#bdb39c] px-5 font-semibold text-[#0a2d20]">โทรสอบถามร้าน</a></div>
      <div className="mt-7 space-y-6 leading-8 text-[#364b3d]">
        <section className={card}><h2 className={heading}>ชิ้นดาดลาว มื้อที่ย่างและต้มอยู่ในเตาเดียวกัน</h2><p className="mt-3">ชิ้นดาดเป็นชื่อที่ใช้เรียกปิ้งย่างลักษณะนี้ในลาว คนไทยคุ้นเคยกับหน้าตาเตาแบบหมูกระทะอยู่แล้ว ตรงกลางเป็นผิวกระทะนูนสำหรับย่างเนื้อ ส่วนขอบรอบเตาใส่น้ำซุปไว้ต้มผักและเห็ด ความสนุกอยู่ที่การค่อย ๆ กินสลับกันระหว่างของย่างกับของในน้ำซุป</p><p className="mt-3">ก่อนสั่งให้ตกลงกันว่าแต่ละคนรับประทานอะไรได้บ้าง แล้วเลือกจานหลักกับผักให้พอดี หากมีคนแพ้อาหารทะเลหรือส่วนผสมในน้ำจิ้ม ให้แจ้งร้านก่อนเตรียมอาหาร</p></section>
        <section><h2 className={heading}>เลือกสั่งอะไรดี ถ้าไปกันหลายคน?</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{[
          ["จานเนื้อสไลซ์", "เลือกชนิดเนื้อที่คนในกลุ่มรับประทานได้ เริ่มจากปริมาณพอดีแล้วค่อยสั่งเพิ่ม"],
          ["ชุดรวมกับเห็ดและผัก", "สอบถามรายการในชุดรวมและขนาดจานก่อนสั่ง รวมถึงผัก เห็ด และอาหารทะเลที่ต้องสั่งแยก"],
          ["น้ำจิ้มและเครื่องปรุง", "ชิมก่อนปรุงเพิ่ม และแจ้งพนักงานหากมีอาหารที่แพ้ เพื่อให้ร้านช่วยตรวจส่วนผสมของน้ำจิ้มและอาหาร"],
          ["เครื่องดื่มระหว่างมื้อ", "ดูเครื่องดื่มจากเมนูวันนั้น และแจ้งระดับความหวานที่ต้องการก่อนสั่ง"],
        ].map(([title, text]) => <div key={title} className={card}><h3 className="font-semibold text-[#0a2d20]">{title}</h3><p className="mt-2 text-sm leading-7">{text}</p></div>)}</div></section>
        <section className={card}><h2 className={heading}>เริ่มทีละจาน แล้วค่อยเติมให้พอดีกับโต๊ะ</h2><p className="mt-3">ถ้าไปเป็นกลุ่ม ลองตกลงกันก่อนว่าใครกินหมู เนื้อ หรืออาหารทะเล แล้วเริ่มจากจานหลักกับผักจำนวนพอดี เมื่อเห็นปริมาณจริงจึงค่อยสั่งเพิ่ม วิธีนี้ช่วยให้ได้ลองหลายอย่างโดยไม่ต้องวางของสดเต็มโต๊ะตั้งแต่แรก</p><p className="mt-3">ให้เนื้อสุกทั่วถึงก่อนรับประทาน และแยกอุปกรณ์คีบของดิบกับอาหารสุก โดยเฉพาะโต๊ะที่มีเด็ก ควรวางแก้วน้ำและของใช้ให้ห่างขอบเตา ส่วนการเติมน้ำซุปหรือปรับเตาให้ขอพนักงานช่วยตามรูปแบบบริการของร้าน</p></section>
        <section><h2 className={heading}>ภาพอาหารและบรรยากาศบนโต๊ะ</h2><p className="mt-2 text-sm leading-7 text-[#59645d]">แตะเพื่อขยายภาพ และเลื่อนดูภาพถัดไปบนมือถือ</p><VanAlbum label="อัลบั้มฟ้าใสหมูกระทะ เวียงจันทน์" compact imageFit="contain" groups={[{ title: "มื้อชิ้นดาดที่ฟ้าใส", items: PHOTOS }]} /></section>
        <section className={card}><h2 className={heading}>บรรยากาศร้านและการไปเป็นกลุ่ม</h2><p className="mt-3">ข้อมูลรายการร้านระบุว่ามีที่นั่งกลางแจ้ง ส่วนรีวิวการเดินทางปี 2564 เล่าถึงพื้นที่ลักษณะเปิดโล่งมีหลังคาและที่จอดรถ ใกล้บริเวณโรงละครสัตว์ ภาพรวมจึงเหมาะกับการวางแผนมื้อเย็นที่นั่งร่วมโต๊ะกันได้ แต่พื้นที่และการจัดร้านอาจเปลี่ยนไปจากรีวิวเก่า</p><p className="mt-3">หากไปหลายคน ควรโทรแจ้งจำนวนผู้รับประทานและเวลาไปถึงก่อน โดยเฉพาะเมื่ออยากนั่งโต๊ะติดกัน หรือมีเด็กและผู้สูงอายุร่วมด้วย สำหรับรถตู้ มินิบัส หรือรถบัส ให้ถามพื้นที่จอดและจุดลงรถก่อนเข้าร้าน เพื่อให้ลงรถและนัดรับกลับได้สะดวก</p><a href={REVIEW} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-[#86611a] underline">ดูภาพร้านและทางเข้าจากรีวิวปี 2564 ↗</a></section>
        <section className={card}><h2 className={heading}>ราคาและรูปแบบการสั่ง ควรถามให้ชัดก่อนเริ่มมื้อ</h2><p className="mt-3">สอบถามรูปแบบบริการและราคาก่อนเริ่มสั่ง ทั้งราคาต่อจาน รายการในชุด และค่าใช้จ่ายเพิ่มเติม เพื่อเลือกอาหารได้พอดีกับจำนวนคนและงบของโต๊ะ</p><ul className="mt-3 list-disc space-y-2 pl-5"><li>ราคาของจานเนื้อ ชุดรวม ผัก และอาหารทะเลแต่ละขนาด</li><li>น้ำซุป เตา ถ่าน น้ำจิ้ม และเครื่องเคียงรวมในรายการใดแล้วบ้าง</li><li>ราคาเครื่องดื่ม น้ำแข็ง และรายการสั่งเพิ่ม</li><li>ช่องทางชำระเงินและสกุลเงินที่ร้านรับในวันนั้น</li></ul><p className="mt-3 text-sm leading-7 text-[#59645d]">ราคาและรายการอาหารให้ยึดตามเมนูหน้าร้านในวันที่ใช้บริการ</p></section>
        <section id="restaurant-info" className="overflow-hidden rounded-2xl border border-[#ddd4c1] bg-white"><div className="bg-[#0a2d20] p-5 text-white sm:px-7"><h2 className="font-serif-th text-2xl font-bold">พิกัดและข้อมูลติดต่อ</h2><p className="mt-1 text-xs text-[#d5ddd7]">Sindard Farsai · ตรวจข้อมูล 7 พฤศจิกายน 2569</p></div><dl className="divide-y divide-[#e7e1d6] px-5 sm:px-7">{[
          ["ชื่อร้าน", "ฟ้าใสหมูกระทะ / ชิ้นดาดฟ้าใส / Sindard Farsai"],
          ["ที่ตั้งตามรายการร้าน", "บ้านสะหว่าง เวียงจันทน์ · XJJ5+5CV"],
          ["เวลาเปิดที่รายการออนไลน์ระบุ", "ทุกวัน 17.30–23.00 น."],
          ["โทรศัพท์ร้าน", "+856 20 99 777 333"],
          ["เวลาที่แนะนำให้เผื่อ", "ประมาณ 1.5–2 ชั่วโมง สำหรับมื้อเย็น"],
        ].map(([label, value]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[220px_1fr]"><dt className="font-semibold text-[#0a2d20]">{label}</dt><dd className="leading-7">{value}</dd></div>)}</dl><div className="px-5 pb-5 sm:px-7"><p className="mt-2 text-sm leading-7 text-[#59645d]">ที่ตั้ง เบอร์โทรและเวลาเปิดอ้างอิงจาก Triple Guide และ Restaurant Guru ยังไม่ได้ยืนยันกับร้านโดยตรง ควรโทรก่อนเดินทาง ส่วนเวลาแวะเป็นคำแนะนำสำหรับจัดแผน</p><div className="mt-4 flex flex-wrap gap-3"><a href={MAP} target="_blank" rel="noopener noreferrer" className="hl-button-primary">เปิดแผนที่ ↗</a><a href="tel:+8562099777333" className="inline-flex min-h-12 items-center px-3 font-semibold text-[#86611a] underline">โทรหาร้าน</a><a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center px-3 text-sm text-[#86611a] underline">ดูเพจชิ้นดาดฟ้าใส ↗</a></div></div></section>
        <section className={card}><h2 className={heading}>วางมื้อเย็นต่อจากเที่ยวเมืองอย่างไรดี?</h2><p className="mt-3">ฟ้าใสเป็นตัวเลือกสำหรับวันที่อยากปิดท้ายด้วยอาหารนั่งกินร่วมกัน หลังแวะประตูชัย พระธาตุหลวง หรือสถานที่ในเมือง ควรเว้นช่วงให้กลับที่พัก พักหรือเปลี่ยนเสื้อผ้าก่อนออกมากิน หากไม่อยากให้วันเที่ยวแน่นเกินไป</p><p className="mt-3">ถ้าใช้รถพร้อมคนขับ ให้ตกลงบริการส่งร้านและรับกลับที่พักให้ครอบคลุมเวลามื้อเย็นก่อนจอง เพราะเวลาเปิดร้านอาจเลยช่วงบริการรถตามรายการเดิม ส่วนวันที่มีรถไฟหรือเที่ยวบินต่อ ควรเลือกมื้อที่เผื่อเวลารออาหารและเดินทางได้สบายกว่า</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><Link href="/articles/patuxai-vientiane/" className="rounded-xl border border-[#ddd4c1] bg-[#f7f3e9] p-4 font-semibold text-[#0a2d20]">อ่านเรื่องประตูชัย →</Link><Link href="/articles/pha-that-luang-vientiane/" className="rounded-xl border border-[#ddd4c1] bg-[#f7f3e9] p-4 font-semibold text-[#0a2d20]">รู้จักพระธาตุหลวง →</Link></div></section>
        <section className="rounded-2xl bg-[#0a2d20] p-5 text-white sm:p-7"><h2 className="font-serif-th text-2xl font-bold">เลือกที่เที่ยวและมื้อที่อยากแวะ</h2><p className="mt-3 leading-8 text-[#d5ddd7]">ส่งวันเดินทาง จำนวนคน จุดรับ และร้านที่สนใจ ให้ HUGLAO ช่วยเรียงเส้นทางเวียงจันทน์ให้เข้ากับเวลาของคุณ ค่าอาหารและเครื่องดื่มชำระแยกจากบริการรถตามรายการที่ตกลง</p><div className="mt-5 flex flex-wrap gap-3"><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary">คุยแผนผ่าน LINE</a><Link href="/routes/vientiane-city/" className="hl-button-secondary">ดูเส้นทางเที่ยวในเมือง</Link></div></section>
      </div>
      <footer className="mt-6 space-y-2 text-xs leading-6 text-[#687169]"><p>ภาพอาหาร: HUGLAO</p><p>แหล่งข้อมูลร้าน: <a href={LISTING} target="_blank" rel="noopener noreferrer" className="underline">Triple Guide</a> · <a href={GURU} target="_blank" rel="noopener noreferrer" className="underline">Restaurant Guru</a> · <a href={REVIEW} target="_blank" rel="noopener noreferrer" className="underline">รีวิว SabaayDii LAO ปี 2564</a></p></footer>
    </div></article>
  </main>;
}
