import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";

const TITLE = "ทำบัตรผ่านแดนชั่วคราวหนองคาย: เอกสารและค่าบริการ";
const DESCRIPTION = "ทำบัตรผ่านแดนชั่วคราวหนองคาย เตรียมบัตรประชาชน เอกสารเด็ก และวันไป–กลับ ดูค่าบริการและขั้นตอนประสาน XL parking ผ่าน HUGLAO ก่อนเดินทางไปลาว";
const ARTICLE_PATH = "/services/temporary-border-pass/";
const SOURCE = "https://xl2go.com/tours/border-pass/";
const PHOTO = "/assets/xl-parking/border-pass.webp";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: ARTICLE_PATH },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, url: ARTICLE_PATH, type: "article", locale: "th_TH", publishedTime: "2026-11-04", modifiedTime: "2026-11-04", images: [{ url: PHOTO, width: 1200, height: 750, alt: "ภาพประกอบพาสปอร์ตและบัตรผ่านแดนสำหรับเตรียมเดินทางจากหนองคาย" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [PHOTO] },
};

const checklist = [
  { title: "บัตรประชาชนตัวจริง", body: "เตรียมบัตรประจำตัวประชาชนที่ยังไม่หมดอายุให้พร้อมสำหรับการตรวจเอกสารและยืนยันตัวตน" },
  { title: "เอกสารสำหรับเด็ก", body: "หากมีเด็กเดินทางด้วย แจ้งอายุและความสัมพันธ์กับผู้ปกครองให้ทีมทราบ พร้อมเตรียมสูติบัตรและเอกสารอื่นตามที่เจ้าหน้าที่กำหนด ให้ทีมตรวจรายการที่ต้องใช้สำหรับกรณีของคุณก่อนเดินทาง" },
  { title: "วันไป–กลับและจุดหมาย", body: "แจ้งวันเดินทาง วันกลับ จำนวนคน และสถานที่ที่ต้องการไป เพื่อให้ทีมช่วยตรวจว่าบัตรผ่านแดนเหมาะกับแผนหรือควรใช้หนังสือเดินทาง" },
  { title: "รายละเอียดค่าใช้จ่าย", body: "ให้ทีมแยกค่าบริการทำบัตร ค่าดำเนินเอกสาร และค่าใช้จ่ายอื่นที่เกี่ยวข้องตามบริการที่เลือก พร้อมยืนยันยอดก่อนตกลงใช้บริการ" },
] as const;

const steps = [
  { title: "แจ้งแผนกับ HUGLAO ล่วงหน้า", body: "บอกชื่อผู้ติดต่อ จำนวนผู้เดินทาง วันไป–กลับ และจุดหมายในลาว หากมีเด็กหรือผู้เดินทางต่างสัญชาติ ให้แจ้งตั้งแต่ต้น เพื่อให้ HUGLAO ประสาน XL parking ตรวจเงื่อนไขที่เกี่ยวข้อง" },
  { title: "ตรวจเอกสารและยืนยันบริการ", body: "ทีมงานช่วยตรวจความครบถ้วนเบื้องต้น แจ้งเงื่อนไขของด่าน จุดรับเอกสาร และรายการค่าใช้จ่ายที่ตรงกับแผนของคุณ ก่อนยืนยันการใช้บริการ" },
  { title: "นัดหมายที่ XL parking และเดินทางไปด่าน", body: "สำหรับผู้ที่นำรถมาฝากจอด ขั้นตอนที่ XL parking แนะนำคือขับเข้าลาน รับบัตรจอดรถ นำรถเข้าจอด แล้วแจ้งเจ้าหน้าที่เพื่อใช้รถรับส่งไปด่าน โดยประสานเวลานัดหมายกับทีมให้เรียบร้อย" },
  { title: "รับเอกสารและผ่านขั้นตอนตรวจคนเข้าเมือง", body: "รับเอกสารตามจุดและเวลาที่ทีมยืนยัน ตรวจชื่อและรายละเอียดให้ถูกต้อง จากนั้นดำเนินการตรวจคนเข้าเมืองตามขั้นตอนของทั้งสองฝั่ง การประสานงานกับพาร์ตเนอร์ไม่ได้แทนการอนุญาตของเจ้าหน้าที่" },
] as const;

const faqs = [
  { q: "ไม่มีพาสปอร์ต ใช้บัตรประชาชนข้ามไปเลยได้ไหม?", a: "บัตรประชาชนเป็นเอกสารสำหรับยื่นขอและยืนยันตัวตน ไม่ใช่เอกสารข้ามแดนโดยตัวมันเอง ผู้เดินทางต้องได้รับหนังสือผ่านแดนที่ใช้ได้ตามเงื่อนไข และผ่านขั้นตอนตรวจคนเข้าเมืองก่อนเดินทาง" },
  { q: "บัตรผ่านแดนชั่วคราวเหมาะกับการเที่ยวแบบไหน?", a: "เหมาะกับการเดินทางระยะสั้นบริเวณเวียงจันทน์หรือใกล้ชายแดน โดยต้องตรวจสิทธิ์ พื้นที่ และระยะเวลาที่อนุญาตให้ตรงกับทริปก่อน หากมีหลายเมืองหรือพักหลายวัน ให้แจ้งแผนทั้งหมดเพื่อพิจารณาการใช้พาสปอร์ต" },
  { q: "เด็กต้องเตรียมอะไรบ้าง?", a: "เตรียมสูติบัตรและเอกสารตามที่เจ้าหน้าที่กำหนด ควรแจ้งอายุเด็กและผู้ปกครองที่เดินทางด้วยล่วงหน้า เพื่อให้ทีมตรวจรายการเอกสารเฉพาะกรณี ไม่ควรอาศัยรายการสำหรับผู้ใหญ่เพียงอย่างเดียว" },
  { q: "ราคา 100 บาทกับ 350 บาทต่างกันอย่างไร?", a: "ค่าบัตรผ่านแดนชั่วคราว 100 บาท/คน และบริการดำเนินเอกสารผ่านแดนไทย–ลาว 350 บาท/คน เป็นสองรายการบริการ ให้ทีมชี้แจงรายการที่ตรงกับทริป สิ่งที่รวม และยอดชำระก่อนยืนยัน โดยยังไม่ควรนำสองราคามารวมเอง" },
  { q: "จองหรือประสานผ่าน HUGLAO ได้ไหม?", a: "ได้ ติดต่อ HUGLAO ทาง LINE พร้อมวันไป–กลับ จำนวนผู้เดินทาง และจุดหมาย ทีม HUGLAO จะประสาน XL parking ซึ่งเป็นพาร์ตเนอร์หลักด้านบริการนี้ แล้วแจ้งรายละเอียดให้ตรวจสอบก่อนยืนยัน" },
] as const;

const heading = "font-serif-th text-[clamp(1.65rem,3.5vw,2.7rem)] font-bold leading-snug text-[#071d13]";

function ArticlePhoto({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <figure className="overflow-hidden rounded-2xl border border-[#ddd4c1] bg-[#f7f3e9]"><div className="relative aspect-[4/3]"><Image src={src} alt={alt} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /></div><figcaption className="px-5 py-4 text-sm leading-7 text-[#59645d]">{caption}</figcaption></figure>;
}

export default function TemporaryBorderPassXlParkingArticle() {
  return (
    <main className="bg-white">
      <article>
        <BreadcrumbStructuredData items={[{ name: "หน้าแรก", href: "/" }, { name: "บริการเดินทาง", href: "/services/" }, { name: "ทำบัตรผ่านแดนชั่วคราวหนองคาย", href: ARTICLE_PATH }]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Article", headline: TITLE, description: DESCRIPTION,
          image: [`${SITE.website}${PHOTO}`], inLanguage: "th-TH", datePublished: "2026-11-04T00:00:00+07:00", dateModified: "2026-11-04T00:00:00+07:00",
          author: { "@type": "Organization", name: SITE.name, url: SITE.website },
          publisher: { "@type": "Organization", name: SITE.legalName, logo: { "@type": "ImageObject", url: `${SITE.website}/assets/huglao-emblem.png` } },
          mainEntityOfPage: `${SITE.website}${ARTICLE_PATH}`,
        }) }} />
        <header className="bg-[#071d13] pb-12 pt-28 text-white sm:pb-16 sm:pt-36">
          <div className="hl-shell">
            <nav aria-label="เส้นทางหน้าเว็บ" className="mb-6 flex flex-wrap gap-2 text-sm text-[#c8d3cc]"><Link href="/">หน้าแรก</Link><span>/</span><Link href="/services/">บริการเดินทาง</Link><span>/</span><span>บัตรผ่านแดนชั่วคราว</span></nav>
            <p className="text-sm font-semibold text-[#efd276]">HUGLAO × XL parking</p>
            <h1 className="mt-4 max-w-[950px] font-serif-th text-[clamp(2rem,5vw,4.3rem)] font-bold leading-tight">ทำบัตรผ่านแดนชั่วคราวหนองคาย<br /><span className="text-[#efd276]">เตรียมเอกสารและค่าบริการก่อนเดินทาง</span></h1>
            <p className="mt-6 max-w-[850px] text-base leading-8 text-[#d5ddd6] sm:text-lg">รู้ว่าต้องเตรียมอะไร ตรวจค่าใช้จ่ายอย่างไร และให้ HUGLAO ช่วยประสาน XL parking ก่อนวันเดินทาง เพื่อต่อแผนจากฝั่งหนองคายไปลาวได้สะดวกขึ้น</p>
            <p className="mt-5 text-sm text-[#b9c7be]">โดย HUGLAO · อัปเดตข้อมูล <time dateTime="2026-11-04">4 พฤศจิกายน 2569</time></p>
            <figure className="mt-8 overflow-hidden rounded-3xl border border-white/15"><div className="relative h-[260px] w-full sm:h-[420px] lg:h-[500px]"><Image src={PHOTO} alt="ภาพประกอบหนังสือเดินทางและบัตรผ่านแดนจากเว็บไซต์ XL parking" fill priority sizes="100vw" className="object-cover" /></div><figcaption className="bg-[#0a2d20] px-5 py-3 text-xs leading-6 text-[#c8d3cc]">ภาพประกอบจาก XL parking ใช้โดยได้รับอนุญาต ไม่ใช่ตัวอย่างเอกสารราชการสำหรับใช้ยื่นคำขอ</figcaption></figure>
          </div>
        </header>

        <div className="hl-shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0 space-y-12 text-base leading-8 text-[#46534b]">
            <section><h2 className={heading}>เริ่มจากแผนทริป แล้วค่อยเลือกเอกสาร</h2><p className="mt-5">ถ้าคุณกำลังวางแผนเดินทางจากหนองคายไปลาว แต่ยังไม่มีหนังสือเดินทาง บัตรผ่านแดนชั่วคราวอาจเป็นทางเลือกสำหรับทริปที่เข้าเงื่อนไข สิ่งที่ควรตรวจเป็นอันดับแรกคือผู้เดินทางมีสิทธิ์ใช้หรือไม่ จุดหมายอยู่ในพื้นที่ที่อนุญาตหรือเปล่า และวันไป–กลับตรงตามระยะเวลาที่กำหนดหรือไม่</p><p className="mt-4">XL parking ให้บริการแนะนำและเตรียมเอกสารก่อนถึงด่าน โดย HUGLAO ช่วยรับรายละเอียดทริปและประสานกับพาร์ตเนอร์หลักด้านนี้ ส่วนการออกเอกสารและอนุญาตผ่านแดนเป็นอำนาจของหน่วยงานที่เกี่ยวข้อง</p></section>

            <section id="conditions" className="scroll-mt-24"><h2 className={heading}>บัตรผ่านแดนชั่วคราวใช้แทนพาสปอร์ตได้ทุกทริปไหม?</h2><p className="mt-5">เอกสารสองชนิดมีเงื่อนไขต่างกัน จึงควรตรวจสิทธิ์ พื้นที่ที่ต้องการเดินทาง และสถานะเอกสารก่อนใช้บริการ โดยหากทริปมีหลายเมืองหรืออยู่นานขึ้น หนังสือเดินทางมักเหมาะกับการวางแผนมากกว่า</p><div className="mt-6 rounded-2xl border border-[#ddd4c1] bg-[#f7f3e9] p-6"><h3 className="text-xl font-bold text-[#0a2d20]">ระยะเวลาพำนักกับวันใช้งานเอกสารเป็นคนละเรื่อง</h3><p className="mt-3">ข้อมูลภาครัฐอธิบายกรอบพำนักสำหรับการใช้บัตรผ่านแดนไทย–ลาวไว้ไม่เกิน 3 วัน 2 คืน และจำกัดพื้นที่ตามที่กำหนด อย่างไรก็ตาม ให้ทีมตรวจเงื่อนไขของหนังสือผ่านแดนชั่วคราวสำหรับด่านและวันเดินทางจริง พร้อมยึดวันที่และพื้นที่ที่เจ้าหน้าที่อนุญาตในเอกสารของคุณ</p><a href="https://www.thailand.go.th/public/issue-focus-detail/001_01_220?hl=th" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-[#86611a] underline underline-offset-4">อ่านข้อมูลความตกลงไทย–ลาวจากเว็บไซต์รัฐบาลไทย ↗</a></div><p className="mt-4">อย่าตัดสินจากคำว่า “เที่ยวลาว” เพียงอย่างเดียว ควรแจ้งชื่อทุกจุดหมายให้ทีมตรวจ โดยเฉพาะแผนที่เดินทางต่อออกนอกบริเวณเวียงจันทน์หรือมีการพักค้างหลายคืน</p></section>

            <figure className="overflow-hidden rounded-2xl border border-[#ddd4c1]"><div className="relative aspect-[16/9]"><Image src="/assets/commons-pickup-thanaleng.webp" alt="อาคารตรวจคนเข้าเมืองด่านท่านาแล้งฝั่งลาว จุดผ่านแดนฝั่งเวียงจันทน์" fill sizes="(max-width: 1023px) 100vw, 70vw" className="object-cover" /></div><figcaption className="px-5 py-4 text-sm leading-7">อาคารด่านท่านาแล้งฝั่งลาว — ภาพ Christophe95 / <a href="https://commons.wikimedia.org/wiki/File:Thanaleng_Border_Crossing.jpg" target="_blank" rel="noopener noreferrer" className="underline">Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY-SA 4.0</a> · ครอป ย่อขนาด และแปลงเป็น WebP</figcaption></figure><section id="documents" className="scroll-mt-24"><h2 className={heading}>เช็กลิสต์ก่อนประสานทำบัตรผ่านแดน</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{checklist.map(item => <div key={item.title} className="rounded-2xl border border-[#ddd4c1] p-6"><h3 className="text-xl font-bold text-[#0a2d20]">{item.title}</h3><p className="mt-3">{item.body}</p></div>)}</div><p className="mt-5">รายการนี้อ้างอิงแนวทางเบื้องต้นของ XL parking ให้ทีมตรวจเอกสารตามกรณีของผู้เดินทางอีกครั้ง โดยเฉพาะเด็ก ผู้เดินทางต่างสัญชาติ หรือผู้ที่มีเงื่อนไขเฉพาะ</p></section>

            <section id="service-prices" className="scroll-mt-24"><h2 className={heading}>ค่าบริการทำบัตรผ่านแดนและประสานเอกสาร</h2><p className="mt-5">บริการทำบัตรผ่านแดนชั่วคราวเริ่มต้น 100 บาทต่อคน พร้อมบริการดำเนินเอกสารผ่านแดนตามรายการด้านล่าง</p><div className="mt-6 space-y-4"><div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#edf4ee] p-6"><h3 className="max-w-[430px] text-lg font-bold text-[#0a2d20]">บัตรผ่านแดนชั่วคราว</h3><p className="text-2xl font-bold text-[#0a2d20]">100 <span className="text-base font-normal">บาท/คน</span></p></div><div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#d8af4a] bg-[#fff9e9] p-6"><h3 className="max-w-[430px] text-lg font-bold text-[#0a2d20]">รายการค่าธรรมเนียมไทย–ลาว<br />สำหรับดำเนินเอกสารผ่านแดน</h3><p className="text-2xl font-bold text-[#0a2d20]">350 <span className="text-base font-normal">บาท/คน</span></p></div></div><p className="mt-5">ก่อนใช้บริการ ให้ HUGLAO ช่วยประสานรายละเอียดว่ารายการใดเหมาะกับทริป ครอบคลุมค่าใช้จ่ายส่วนใด และมีรายการใดต้องชำระเพิ่มเติม พร้อมยืนยันยอดกับทีมงานก่อนชำระเงิน อัตราข้างต้นเป็นค่าบริการของพาร์ตเนอร์ ส่วนค่าธรรมเนียมราชการให้ยึดตามหน่วยงานที่เกี่ยวข้อง</p></section>

            <section id="service-steps" className="scroll-mt-24"><h2 className={heading}>ประสานกับ HUGLAO อย่างไร?</h2><ol className="mt-6 space-y-6">{steps.map((step,index) => <li key={step.title} className="flex gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a2d20] font-bold text-[#efd276]">{index+1}</span><div><h3 className="text-xl font-bold text-[#0a2d20]">{step.title}</h3><p className="mt-2">{step.body}</p></div></li>)}</ol><p className="mt-5">เวลารับเอกสารและระยะเวลาดำเนินการให้ยึดตามที่ทีมงานยืนยันสำหรับวันเดินทาง ไม่รับรองว่าจะเสร็จทันทีหรือข้ามด่านได้โดยไม่ต้องรอคิว</p></section>

            <section><h2 className={heading}>ภาพจุดนัดหมายและการเดินทางจาก XL parking</h2><p className="mt-5">ดูทางเข้า พื้นที่จอด และรถรับส่งฝั่งไทย เพื่อเตรียมจุดนัดหมายให้ตรงกับทีมงาน ภาพชุดนี้เป็นสถานที่และรถของพาร์ตเนอร์ ใช้โดยได้รับอนุญาต</p><div className="mt-6 grid gap-5 sm:grid-cols-2"><ArticlePhoto src="/assets/xl-parking/entry.webp" alt="จุดรับบัตรจอดรถและทางเข้าลาน XL parking หน้าด่านหนองคาย" caption="ทางเข้าลานและจุดรับบัตรจอดรถ ไม่ใช่จุดออกหนังสือผ่านแดน" /><ArticlePhoto src="/assets/xl-parking/shuttle.webp" alt="รถรับส่งจากลาน XL parking ไปด่านตรวจคนเข้าเมืองฝั่งไทย" caption="รถรับส่งระหว่างลานจอดและด่านไทย ยืนยันเวลานัดหมายกับทีมก่อนเดินทาง" /><ArticlePhoto src="/assets/xl-parking/covered.webp" alt="พื้นที่จอดรถในร่มของ XL parking สำหรับผู้เดินทางข้ามไปลาว" caption="พื้นที่จอดรถสำหรับผู้ที่นำรถมาฝากไว้ฝั่งหนองคาย" /></div></section><section><h2 className={heading}>ถ้านำรถมาฝากจอดด้วย</h2><p className="mt-5">แจ้งความต้องการเรื่องลานจอดและรถรับส่งพร้อมการประสานเอกสารได้ เพื่อให้ทีมวางจุดนัดหมายต่อเนื่องกัน โดยให้ตรวจค่าใช้จ่ายด้านรถและที่จอดแยกจากบริการเอกสาร</p><p className="mt-4">หากต้องการเปรียบเทียบเอกสารก่อนเลือกบริการ อ่าน <Link href="/articles/border-pass-vs-passport-laos/" className="font-semibold text-[#86611a] underline underline-offset-4">คู่มือบัตรผ่านแดนกับพาสปอร์ต</Link> เพิ่มเติมได้</p><Link href="/services/xl-parking/" className="mt-4 inline-block font-semibold text-[#86611a] underline underline-offset-4">อ่านรายละเอียดฝากรถและรถรับส่ง XL parking →</Link></section>
          </div>
          <aside aria-label="สารบัญและช่องทางประสานงาน" className="lg:sticky lg:top-24 lg:self-start"><div className="rounded-2xl bg-[#f7f3e9] p-6 text-sm leading-7 text-[#46534b]"><h2 className="text-xl font-bold text-[#0a2d20]">เตรียมก่อนถึงด่าน</h2><p className="mt-3">วันไป–กลับ · จำนวนคน<br />จุดหมาย · เอกสารของผู้เดินทาง</p><nav aria-label="สารบัญบทความ" className="my-5 grid gap-2"><a href="#conditions" className="underline underline-offset-4">เงื่อนไขการใช้บัตร</a><a href="#documents" className="underline underline-offset-4">เอกสารที่ต้องเตรียม</a><a href="#service-prices" className="underline underline-offset-4">ข้อมูลค่าบริการ</a><a href="#service-steps" className="underline underline-offset-4">ขั้นตอนประสานงาน</a></nav><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary w-full text-center">ให้ HUGLAO ช่วยประสาน</a></div></aside>
        </div>

        <section className="bg-[#f7f3e9] py-12 sm:py-16"><div className="hl-shell max-w-[960px]"><h2 className={heading}>คำถามที่พบบ่อย</h2><div className="mt-6 divide-y divide-[#ddd4c1]">{faqs.map(faq => <details key={faq.q} className="py-5"><summary className="cursor-pointer text-lg font-bold leading-8 text-[#0a2d20]">{faq.q}</summary><p className="mt-3 leading-8 text-[#46534b]">{faq.a}</p></details>)}</div></div></section>
        <section className="bg-[#0a2d20] py-12 text-white sm:py-16"><div className="hl-shell max-w-[960px]"><h2 className="font-serif-th text-3xl font-bold leading-snug">บอกแผนทริป แล้วให้ HUGLAO ช่วยประสาน XL parking</h2><p className="mt-5 max-w-[760px] leading-8 text-[#d5ddd6]">ส่งวันเดินทาง วันกลับ จำนวนผู้ใหญ่และเด็ก พร้อมจุดหมายที่ต้องการไป ทีมจะช่วยประสานรายละเอียดเอกสารและรายการค่าใช้จ่ายให้ตรวจสอบก่อนยืนยัน</p><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-7">ติดต่อ HUGLAO ผ่าน LINE</a></div></section>
        <footer className="hl-shell space-y-3 py-8 text-sm leading-7 text-[#687169]"><p>ข้อมูลบริการหลักและภาพประกอบ: <a href={SOURCE} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">หน้าบัตรผ่านแดนของ XL parking</a> ตรวจเมื่อ 4 พฤศจิกายน 2569 ภาพใช้โดยได้รับอนุญาตจากพาร์ตเนอร์</p><p>ตรวจประกอบกับ <a href="https://www.thailand.go.th/public/issue-focus-detail/001_01_220?hl=th" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">ข้อมูลความตกลงไทย–ลาว</a> และ <a href="https://thailand.go.th/public/issue-focus-detail/001_01_208?hl=th" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">ข้อมูลหนังสือผ่านแดนอิเล็กทรอนิกส์ของรัฐบาลไทย</a> ซึ่งเป็นแนวทางทั่วไปที่เผยแพร่ก่อนวันตรวจนี้ โปรดตรวจเงื่อนไขล่าสุดกับผู้ให้บริการและหน่วยงานผู้ออกเอกสารก่อนเดินทาง</p></footer>
      </article>
    </main>
  );
}
