import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";

const TITLE = "ที่จอดรถหน้าด่านหนองคาย ฝากรถไปลาวและค้างคืน | HUGLAO";
const DESCRIPTION = "ที่จอดรถหน้าด่านหนองคาย สำหรับฝากรถข้ามไปลาวหรือเที่ยวเวียงจันทน์ จอดวันเดียว 50 บาท ค้างคืน 100 บาท/คืน พร้อมรถรับส่งด่านไทย ให้ HUGLAO ประสาน XL parking";
const PHOTO_ROOT = "/assets/xl-parking";
const MAP_URL = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent("ที่จอดรถหน้าด่านหนองคาย XL Tour");

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/services/xl-parking/" },
  robots: { index: false, follow: false },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/services/xl-parking/", type: "article", images: [`${PHOTO_ROOT}/aerial.webp`] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${PHOTO_ROOT}/aerial.webp`] },
};

const steps = [
  { title: "แจ้งแผนกับ HUGLAO", body: "ส่งวันที่นำรถเข้าจอด วันที่รับรถคืน จำนวนรถ จำนวนผู้เดินทาง และแจ้งว่าต้องการรถส่งเฉพาะด่านไทยหรือประสานรถไปด่านลาวด้วย ทีมงานจะตรวจรายละเอียดและยืนยันการประสานงานให้ก่อนเดินทาง" },
  { title: "นำรถเข้าจอดที่ XL parking", body: "เดินทางมาที่ลานจอดในเวลาให้บริการ รับบัตรจอดรถที่ทางเข้า แล้วเก็บบัตรไว้ใช้ตอนรับรถคืน หากประสานไว้กับ HUGLAO ให้แจ้งรายละเอียดนัดหมายกับเจ้าหน้าที่" },
  { title: "เลือกรถรับส่งให้ตรงกับแผน", body: "หากไปด่านไทย ใช้รถรับส่งฟรีของลานจอด ส่วนผู้ที่ต้องการรถไปส่งด่านลาว ให้ยืนยันบริการ 450 บาท/รอบผ่าน HUGLAO ล่วงหน้า เพื่อให้ทีมงานแจ้งจุดนัดหมายและรายละเอียดของรอบรถ" },
  { title: "ขากลับ โทรนัดรับจากด่านไทย", body: "เมื่อกลับมาถึงฝั่งไทย ให้ติดต่อเบอร์ลานจอดที่ได้รับเพื่อเรียกรถมารับกลับ XL parking โดยไม่เสียค่ารถรับส่ง ยืนยันจุดรอและเวลารับกับเจ้าหน้าที่ก่อนออกจากบริเวณนัดหมาย" },
] as const;

const faqs = [
  { question: "หาที่จอดรถไปเวียงจันทน์ ต้องนำรถข้ามไปลาวไหม?", answer: "หากไม่ต้องการนำรถข้ามแดน สามารถฝากรถที่ XL parking ฝั่งหนองคาย แล้วใช้รถรับส่งไปด่านไทยเพื่อเดินทางต่อได้ HUGLAO ช่วยประสานลานจอดและบริการรถตามแผน โดยยืนยันจุดรับ–ส่งและค่าใช้จ่ายแต่ละส่วนก่อนเดินทาง" },
  { question: "จอดวันเดียวกับจอดค้างคืนคิดต่างกันอย่างไร?", answer: "ไป–กลับและรับรถคืนภายในวันเดียวกัน 50 บาท ส่วนค้างคืนคิด 100 บาท/คืน เช่น จอดวันศุกร์และรับรถวันอาทิตย์ รวม 2 คืน ค่าจอด 200 บาท โดยไม่มีค่าจอดเกินเวลาหรือค่าจอดเพิ่มเติมตามข้อมูลที่พาร์ตเนอร์ยืนยัน ทั้งนี้ควรนัดรับรถภายในเวลาให้บริการ" },
  { question: "รถรับส่งฟรีไปถึงด่านลาวด้วยไหม?", answer: "รถรับส่งฟรีเป็นบริการระหว่างลานจอดกับด่านไทยทั้งขาไปและขากลับ ส่วนรถจาก XL parking ไปส่งด่านลาวเป็นบริการแยก ราคา 450 บาท/รอบ ต้องประสานและยืนยันรายละเอียดก่อนใช้บริการ" },
  { question: "ประสานที่จอดล่วงหน้าได้หรือไม่?", answer: "ติดต่อ HUGLAO เพื่อประสานล่วงหน้าได้ในช่วงปกติ ยกเว้นช่วงเทศกาล กรุณารอทีมงานยืนยันรายละเอียดก่อนถือว่านัดหมายเรียบร้อย" },
  { question: "ขากลับจะเรียกรถมารับอย่างไร?", answer: "ผู้ใช้บริการจะได้รับเบอร์ติดต่อลานจอดไว้โทรเรียกรถ เมื่อกลับมาถึงด่านไทยให้โทรนัดจุดรับกับเจ้าหน้าที่ รถรับกลับลานจอดให้บริการฟรี" },
  { question: "ต้องแจ้งอะไรหากต้องการรถส่งด่านลาว?", answer: "แจ้งวันเดินทาง เวลาที่ต้องการ จำนวนผู้โดยสาร และสัมภาระกับ HUGLAO เพื่อยืนยันจำนวนคนที่รองรับ จุดส่ง และรายละเอียดราคา 450 บาท/รอบก่อนตกลงใช้บริการ" },
] as const;

function Photo({ name, alt, caption }: { name: string; alt: string; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-[#ddd4c1] bg-[#f7f3e9]">
      <div className="relative aspect-[4/3]"><Image src={`${PHOTO_ROOT}/${name}.webp`} alt={alt} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /></div>
      <figcaption className="px-5 py-4 text-sm leading-6 text-[#59645d]">{caption}</figcaption>
    </figure>
  );
}

export default function XlParkingArticle() {
  return (
    <main className="bg-white">
      <BreadcrumbStructuredData items={[{ name: "หน้าแรก", href: "/" }, { name: "บริการเดินทาง", href: "/services/" }, { name: "ที่จอดรถหน้าด่านหนองคาย", href: "/services/xl-parking/" }]} />
      <article>
        <header className="bg-[#071d13] pb-12 pt-28 text-white sm:pb-16 sm:pt-36">
          <div className="hl-shell">
            <nav aria-label="เส้นทางหน้าเว็บ" className="mb-6 flex flex-wrap gap-2 text-sm text-[#b9c7be]">
              <Link href="/">หน้าแรก</Link><span>/</span><Link href="/services/">บริการเดินทาง</Link><span>/</span><span>ที่จอดรถหน้าด่านหนองคาย</span>
            </nav>
            <p className="text-sm font-semibold tracking-wide text-[#efd276]">XL parking × HUGLAO</p>
            <h1 className="mt-4 max-w-[950px] font-serif-th text-[clamp(2rem,5vw,4.3rem)] font-bold leading-tight">ที่จอดรถหน้าด่านหนองคาย<br /><span className="text-[#efd276]">สำหรับเดินทางไปลาว</span></h1>
            <p className="mt-6 max-w-[800px] text-base leading-8 text-[#d5ddd6] sm:text-lg">กำลังหาที่ฝากรถหนองคายก่อนข้ามไปลาว? รู้จัก XL parking หนองคาย สำหรับจอดรถไปลาวทั้งวันเดียวและค้างคืน พร้อมรถรับส่งถึงด่านไทย โดย HUGLAO ช่วยประสานรายละเอียดกับพาร์ตเนอร์ก่อนเดินทาง</p>
            <p className="mt-5 text-sm text-[#b9c7be]">โดย HUGLAO · ข้อมูล ณ <time dateTime="2026-11-04">4 พฤศจิกายน 2569</time></p>
            <figure className="mt-8 overflow-hidden rounded-3xl border border-white/15">
              <div className="relative h-[260px] w-full sm:h-[420px] lg:h-[500px]"><Image src={`${PHOTO_ROOT}/aerial.webp`} alt="ภาพมุมสูงลานจอด XL parking บริเวณหน้าด่านหนองคาย" fill sizes="100vw" className="object-cover" priority /></div>
              <figcaption className="bg-[#0a2d20] px-5 py-3 text-xs leading-6 text-[#c8d3cc]">ภาพลานจอดจริงจาก XL parking ใช้โดยได้รับอนุญาต</figcaption>
            </figure>
          </div>
        </header>

        <div className="hl-shell grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_280px] sm:py-16">
          <div className="min-w-0 space-y-12 text-base leading-8 text-[#46534b]">
            <section>
              <h2 className="font-serif-th text-3xl font-bold leading-snug text-[#071d13]">เริ่มทริปจากที่จอดรถฝั่งไทย</h2>
              <p className="mt-5">หากขับรถมาหนองคายและต้องการฝากรถไว้ฝั่งไทยระหว่างเดินทางไปลาว XL parking เป็นลานจอดบริเวณหน้าด่านพรมแดนหนองคาย ใกล้สะพานมิตรภาพไทย–ลาว แห่งที่ 1 เหมาะกับผู้ที่หาที่จอดรถไปเวียงจันทน์หรือฝากรถข้ามไปลาว รองรับทั้งการเดินทางแบบไปเช้าเย็นกลับและการจอดค้างคืน</p>
              <p className="mt-4">HUGLAO ช่วยประสานบริการฝากจอดรถกับพาร์ตเนอร์ XL parking รวมถึงความต้องการเรื่องรถรับส่งตามแผนของคุณ ส่วนการให้บริการลานจอดและรถรับส่งของลานเป็นหน้าที่ของ XL parking</p>
            </section>

            <section id="parking-prices" className="scroll-mt-24">
              <h2 className="font-serif-th text-3xl font-bold leading-snug text-[#071d13]">ค่าจอดรถด่านหนองคาย แบบวันเดียวและค้างคืน</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#ddd4c1] bg-[#f7f3e9] p-6"><h3 className="font-bold text-[#0a2d20]">ไป–กลับวันเดียว</h3><p className="my-3 text-4xl font-bold text-[#0a2d20]">50 <span className="text-base font-normal">บาท</span></p><p>นำรถเข้าและรับรถคืนภายในวันเดียวกัน</p></div>
                <div className="rounded-2xl border border-[#ddd4c1] bg-[#f7f3e9] p-6"><h3 className="font-bold text-[#0a2d20]">ฝากรถค้างคืนหนองคาย</h3><p className="my-3 text-4xl font-bold text-[#0a2d20]">100 <span className="text-base font-normal">บาท/คืน</span></p><p>เช่น วันศุกร์ถึงวันอาทิตย์ 2 คืน รวม 200 บาท</p></div>
              </div>
              <p className="mt-5"><strong className="text-[#0a2d20]">เปิดทุกวัน 06:00–22:00 น.</strong> ช่วงเวลานี้เป็นเวลาให้บริการของลานจอด ควรวางแผนเวลานำรถเข้าและรับรถคืนให้สอดคล้องกัน</p>
              <p className="mt-3">ค่าจอดตามข้อมูลที่พาร์ตเนอร์ยืนยันไม่มีค่าจอดเกินเวลาหรือค่าจอดเพิ่มเติม ส่วนรถไปส่งด่านลาวเป็นบริการแยกจากค่าจอดรถ</p>
            </section>

            <section id="shuttle" className="scroll-mt-24">
              <h2 className="font-serif-th text-3xl font-bold leading-snug text-[#071d13]">ที่จอดรถพร้อมรถรับส่งด่าน: แยกบริการฝั่งไทยและฝั่งลาว</h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-[#edf4ee] p-6"><h3 className="text-xl font-bold text-[#0a2d20]">ลานจอด ↔ ด่านไทย: รับส่งฟรี</h3><p className="mt-3">หลังฝากรถ ใช้รถของลานจอดไปส่งที่ด่านตรวจคนเข้าเมืองหนองคายฝั่งไทยได้ฟรี ขากลับเมื่อถึงฝั่งไทยแล้ว โทรหาเบอร์ลานจอดที่ได้รับเพื่อนัดรถมารับกลับลานจอดได้ฟรีเช่นกัน</p></div>
                <div className="rounded-2xl border border-[#d8af4a] bg-[#fff9e9] p-6"><h3 className="text-xl font-bold text-[#0a2d20]">XL parking → ด่านลาว: 450 บาท/รอบ</h3><p className="mt-3">หากต้องการรถจาก XL parking ไปส่งที่ด่านลาว ติดต่อ HUGLAO เพื่อประสานได้ ราคา 450 บาทต่อรอบ แยกจากค่าจอดและบริการรับส่งฟรีฝั่งไทย</p><p className="mt-3">แจ้งจำนวนผู้โดยสาร สัมภาระ และวันเวลาที่ต้องการ เพื่อให้ทีมยืนยันรถ จำนวนคนที่รองรับ จุดส่ง และรายละเอียดของรอบบริการก่อนใช้บริการ</p></div>
              </div>
              <p className="mt-5">การมีรถรับส่งไม่ได้ยกเว้นขั้นตอนตรวจคนเข้าเมือง ผู้เดินทางยังต้องดำเนินการผ่านด่านตามขั้นตอนของทั้งสองฝั่ง โดยทีมงานจะประสานจุดนัดหมายให้ชัดเจน</p>
              <figure className="mt-6"><div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Image src={`${PHOTO_ROOT}/shuttle.webp`} alt="รถรับส่งของ XL parking สำหรับบริการระหว่างลานจอดและด่านไทย" fill sizes="(max-width: 1023px) 100vw, 70vw" className="object-cover" /></div><figcaption className="mt-2 text-sm text-[#687169]">รถรับส่งฝั่งไทยของ XL parking — ภาพนี้ไม่ใช่การระบุรถสำหรับรอบส่งด่านลาว</figcaption></figure>
            </section>

            <section id="steps" className="scroll-mt-24">
              <h2 className="font-serif-th text-3xl font-bold leading-snug text-[#071d13]">จากฝากรถถึงรับรถคืน ทำอย่างไรบ้าง?</h2>
              <ol className="mt-6 space-y-6">{steps.map((step, index) => <li key={step.title} className="flex gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a2d20] font-bold text-[#efd276]">{index + 1}</span><div><h3 className="text-xl font-bold text-[#0a2d20]">{step.title}</h3><p className="mt-2">{step.body}</p></div></li>)}</ol>
            </section>

            <section>
              <h2 className="font-serif-th text-3xl font-bold leading-snug text-[#071d13]">ประสานล่วงหน้าผ่าน HUGLAO ได้ในช่วงปกติ</h2>
              <p className="mt-5">หากทราบวันเดินทางแล้ว สามารถให้ HUGLAO ช่วยประสานที่จอดล่วงหน้าได้ <strong className="text-[#0a2d20]">ยกเว้นช่วงเทศกาล</strong> โดยรอทีมงานยืนยันรายละเอียดก่อนเดินทาง การส่งข้อมูลเข้ามายังไม่ถือเป็นการยืนยันที่จอดจนกว่าจะได้รับการตอบรับ</p>
              <p className="mt-4">ก่อนออกเดินทาง เตรียมวันเข้าจอดและวันรับรถคืน จำนวนรถ จำนวนคน และความต้องการเรื่องรถรับส่งไว้ให้ครบ เพื่อให้การประสานงานต่อเนื่องตั้งแต่ลานจอดจนถึงจุดนัดหมาย</p>
            </section>
          </div>

          <aside aria-label="ข้อมูลสรุปและสารบัญ" className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-[#f7f3e9] p-6 text-sm leading-7 text-[#46534b]">
              <h2 className="text-xl font-bold text-[#0a2d20]">วางแผนก่อนถึงด่าน</h2>
              <p className="mt-3">ลานจอดเปิด 06:00–22:00 น.<br />ไป–กลับวันเดียว 50 บาท<br />ค้างคืน 100 บาท/คืน</p>
              <nav aria-label="สารบัญบทความ" className="my-5 grid gap-2"><a href="#parking-prices" className="underline underline-offset-4">ค่าจอดรถ</a><a href="#shuttle" className="underline underline-offset-4">รถรับส่งด่านไทย–ลาว</a><a href="#steps" className="underline underline-offset-4">ขั้นตอนใช้บริการ</a><a href="#parking-faq" className="underline underline-offset-4">คำถามที่พบบ่อย</a></nav>
              <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary w-full text-center">ให้ HUGLAO ช่วยประสาน</a>
              <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="mt-4 block font-semibold text-[#86611a] underline underline-offset-4">เปิดแผนที่ลานจอด ↗</a>
            </div>
          </aside>
        </div>

        <section className="bg-[#f7f3e9] py-12 sm:py-16">
          <div className="hl-shell"><h2 className="font-serif-th text-3xl font-bold text-[#071d13]">ที่จอดรถใกล้สะพานมิตรภาพไทย–ลาว: พื้นที่จอดและทางเข้า</h2><p className="mt-4 max-w-[800px] leading-8 text-[#46534b]">ลานจอดมีพื้นที่ในร่ม ระบบบัตรเข้า–ออก ไม้กั้น กล้องวงจรปิด เจ้าหน้าที่ดูแล และห้องน้ำ ภาพด้านล่างเป็นภาพจากสถานที่จริงที่พาร์ตเนอร์อนุญาตให้ใช้</p><div className="mt-7 grid gap-6 md:grid-cols-2"><Photo name="covered" alt="พื้นที่จอดรถในร่มของ XL parking หนองคาย" caption="พื้นที่จอดในร่มของ XL parking" /><Photo name="entry" alt="จุดรับบัตรจอดรถบริเวณทางเข้าลาน XL parking" caption="จุดรับบัตรจอดรถก่อนนำรถเข้าลาน เก็บบัตรไว้ใช้เมื่อรับรถคืน" /></div><p className="mt-4 text-sm leading-7 text-[#687169]">ก่อนฝากรถ ควรตรวจเงื่อนไขการดูแลรถและความรับผิดชอบกับลานจอดโดยตรง พร้อมเก็บของมีค่าและตรวจล็อกรถให้เรียบร้อย</p></div>
        </section>

        <section id="parking-faq" className="scroll-mt-24 bg-white py-12 sm:py-16"><div className="hl-shell max-w-[960px]"><h2 className="font-serif-th text-3xl font-bold text-[#071d13]">คำถามที่พบบ่อยเรื่องฝากรถข้ามไปลาว</h2><div className="mt-6 divide-y divide-[#ddd4c1]">{faqs.map((faq) => <details key={faq.question} className="py-5"><summary className="cursor-pointer text-lg font-bold leading-8 text-[#0a2d20]">{faq.question}</summary><p className="mt-3 leading-8 text-[#46534b]">{faq.answer}</p></details>)}</div></div></section>

        <section className="bg-[#0a2d20] py-12 text-white sm:py-16"><div className="hl-shell max-w-[960px]"><h2 className="font-serif-th text-3xl font-bold leading-snug">ส่งแผนฝากรถให้ HUGLAO ช่วยประสาน</h2><p className="mt-5 max-w-[760px] leading-8 text-[#d5ddd6]">แจ้งวันเข้าจอด วันรับรถคืน จำนวนรถ จำนวนผู้เดินทาง และจุดหมายของรถรับส่ง ทีม HUGLAO จะช่วยประสานกับ XL parking และยืนยันรายละเอียดให้ก่อนเดินทาง</p><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-7">ติดต่อ HUGLAO ผ่าน LINE</a></div></section>

        <footer className="hl-shell py-8 text-sm leading-7 text-[#687169]"><p>ข้อมูลบริการและภาพจาก <a href="https://xl2go.com/parking-nong-khai-laos/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">เว็บไซต์พาร์ตเนอร์ XL parking</a> และรายละเอียดที่ HUGLAO ยืนยัน ณ 4 พฤศจิกายน 2569 ภาพใช้โดยได้รับอนุญาตจากพาร์ตเนอร์ โปรดให้ทีมงานยืนยันรายละเอียดบริการอีกครั้งก่อนเดินทาง</p></footer>
      </article>
    </main>
  );
}
