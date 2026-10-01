import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import LineCta from "@/components/LineCta";
import PublishedPriceTable from "@/components/PublishedPriceTable";
import { getMedia } from "@/data/media";
import { getCurrentPriceRows } from "@/data/pricing";
import { SITE } from "@/data/site";

const ARTICLE_PATH = "/articles/border-pass-vs-passport-laos";
const TITLE = "ข้ามด่านหนองคายไปลาว ใช้บัตรผ่านแดนหรือพาสปอร์ต? เอกสาร เงื่อนไข และขั้นตอน";
const DESCRIPTION =
  "เทียบบัตรผ่านแดนชั่วคราวกับพาสปอร์ตสำหรับคนไทยที่ข้ามด่านหนองคายไปเวียงจันทน์ เที่ยวได้ที่ไหน อยู่ได้กี่วัน ใช้เอกสารอะไร เด็กต้องเตรียมอะไร และขั้นตอนข้ามด่านถึงจุดรับรถ";
const PUBLISHED = "2026-10-01";
const PUBLISHED_TH = "1 ตุลาคม 2569";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["บัตรผ่านแดน ลาว", "ทำบัตรผ่านแดนหนองคาย", "ข้ามด่านหนองคาย", "บัตรผ่านแดนชั่วคราว", "ไปลาวไม่มีพาสปอร์ต", "ด่านท่านาแล้ง"],
  alternates: { canonical: `${ARTICLE_PATH}/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${ARTICLE_PATH}/`,
    type: "article",
    images: [getMedia("pickupThanaleng").src],
  },
};

const COMPARISON = [
  { label: "เอกสารหลัก", pass: "บัตรประชาชนตัวจริงที่ยังไม่หมดอายุ", passport: "หนังสือเดินทางที่ยังไม่หมดอายุ" },
  { label: "พื้นที่ที่เที่ยวได้", pass: "เฉพาะแขวงของด่านที่เข้า เช่น ด่านหนองคาย → นครหลวงเวียงจันทน์", passport: "เดินทางต่อไปแขวงอื่นได้ เช่น วังเวียง น้ำงึม เมืองเฟือง" },
  { label: "ระยะเวลาพำนัก", pass: "ครั้งละไม่เกิน 3 วัน", passport: "ตามเงื่อนไขการเข้าเมืองของหนังสือเดินทาง" },
  { label: "เวลาทำเอกสาร", pass: "ทำได้ภายในวันเดินทาง รับที่ด่านได้เลย", passport: "ต้องมีเล่มก่อนวันเดินทาง" },
  { label: "เหมาะกับ", pass: "ทริปสั้นในเวียงจันทน์ ไหว้พระ ช้อปปิ้ง กินเที่ยวในเมือง", passport: "ทริปหลายวันหรือหลายจุดหมายนอกนครหลวง" },
] as const;

const CHILD_DOCS = [
  "รูปถ่ายขนาด 1 หรือ 2 นิ้วของเด็ก (ตามข้อกำหนดของแต่ละด่าน)",
  "สำเนาสูติบัตร (ใบเกิด) ของเด็ก 1 ฉบับ",
  "สำเนาบัตรประชาชนและสำเนาทะเบียนบ้านของพ่อหรือแม่ที่เดินทางไปด้วย",
] as const;

const CROSSING_STEPS = [
  { title: "เตรียมเอกสารให้ครบก่อนถึงด่าน", body: "ผู้ใหญ่ใช้บัตรประชาชนตัวจริง หากใช้บริการทำบัตรผ่านแดนกับ HUGLAO ให้ส่งสำเนาบัตรประชาชนและวันเดินทางทาง LINE ล่วงหน้า เพื่อให้ทีมงานตรวจความครบถ้วนก่อน" },
  { title: "ทำบัตรผ่านแดนที่ด่าน", body: "บัตรผ่านแดนชั่วคราวทำได้ภายในวันเดินทางและรับที่ด่านได้เลย หากมีเด็กที่ยังไม่มีบัตรประชาชน พ่อ แม่ หรือผู้ปกครองตามกฎหมายต้องพาเด็กไปติดต่อด้วยตนเอง" },
  { title: "ผ่านขั้นตอนตรวจคนเข้าเมือง", body: "ผู้เดินทางผ่านขั้นตอนตรวจคนเข้าเมืองฝั่งไทยและฝั่งลาวด้วยตนเอง ข้ามสะพานมิตรภาพไทย–ลาว แห่งที่ 1 ไปยังด่านท่านาแล้งฝั่งลาว" },
  { title: "พบรถที่จุดนัดหมายฝั่งลาว", body: "หากจองรถพร้อมคนขับไว้ คนขับจะรอที่จุดนัดหมายฝั่งลาวหลังผ่านขั้นตอนตรวจคนเข้าเมือง โดยยืนยันจุดนัดหมายอีกครั้งก่อนวันเดินทาง" },
] as const;

const FAQS = [
  {
    q: "ไปลาวไม่มีพาสปอร์ตได้ไหม?",
    a: "ได้ คนไทยใช้บัตรผ่านแดนชั่วคราวที่ทำจากบัตรประชาชนแทนได้ แต่เที่ยวได้เฉพาะแขวงของด่านที่เข้า เช่น ข้ามด่านหนองคายจะเที่ยวได้เฉพาะในนครหลวงเวียงจันทน์ และพำนักได้ครั้งละไม่เกิน 3 วัน",
  },
  {
    q: "ใช้บัตรผ่านแดนไปวังเวียงได้ไหม?",
    a: "ไม่ได้ วังเวียง น้ำงึม และเมืองเฟืองอยู่นอกนครหลวงเวียงจันทน์ หากข้ามที่ด่านหนองคายแล้วต้องการไปจุดหมายเหล่านี้ ต้องใช้หนังสือเดินทาง",
  },
  {
    q: "ทำบัตรผ่านแดนใช้เวลานานไหม?",
    a: "ทำได้ภายในวันเดินทางและรับบัตรที่ด่านได้เลย หากใช้บริการ HUGLAO ค่าบริการ 100 บาทต่อคน เหมารวมทุกอย่าง",
  },
  {
    q: "เด็กที่ยังไม่มีบัตรประชาชนใช้บัตรผ่านแดนได้ไหม?",
    a: "ได้ เด็กอายุต่ำกว่า 7 ปีหรือยังไม่มีบัตรประชาชนใช้สำเนาสูติบัตรคู่กับเอกสารของพ่อหรือแม่ที่เดินทางไปด้วย และจะถูกบันทึกชื่อเป็นผู้ติดตามในเอกสารของผู้ปกครอง โดยผู้ปกครองต้องพาเด็กไปติดต่อที่ด่านด้วยตนเอง",
  },
] as const;

export default function BorderPassVsPassportArticlePage() {
  const media = getMedia("pickupThanaleng");
  const prices = getCurrentPriceRows({ routeSlug: "transfer-thanaleng-city" });
  const url = `${SITE.website}${ARTICLE_PATH}/`;

  return (
    <article className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: TITLE,
              description: DESCRIPTION,
              image: `${SITE.website}${media.src}`,
              author: { "@type": "Organization", name: `ทีมงาน ${SITE.name}`, url: SITE.website },
              publisher: {
                "@type": "Organization",
                name: SITE.legalName,
                logo: { "@type": "ImageObject", url: `${SITE.website}/assets/huglao-emblem.png` },
              },
              datePublished: PUBLISHED,
              dateModified: PUBLISHED,
              inLanguage: "th",
              mainEntityOfPage: url,
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
            },
          ]),
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "หน้าแรก", href: "/" },
          { name: "บทความ", href: "/articles/" },
          { name: "บัตรผ่านแดนหรือพาสปอร์ต", href: `${ARTICLE_PATH}/` },
        ]}
      />

      <header className="bg-[#071d13] pb-[clamp(56px,7vw,88px)] pt-[clamp(116px,14vw,170px)] text-white">
        <div className="hl-shell grid items-end gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-xs text-[#aebcb3]">
              <Link href="/" className="hover:text-white">หน้าแรก</Link><span>/</span>
              <Link href="/articles" className="hover:text-white">บทความ</Link><span>/</span>
              <span className="text-[#efd276]">บัตรผ่านแดนหรือพาสปอร์ต</span>
            </nav>
            <span className="hl-kicker !text-[#efd276]">Crossing guide: Nong Khai → Vientiane</span>
            <h1 className="mt-5 font-serif-th text-[clamp(2.1rem,5vw,4.4rem)] font-bold leading-[1.1]">ข้ามด่านหนองคายไปลาว ใช้บัตรผ่านแดนหรือพาสปอร์ต?</h1>
            <p className="mt-6 max-w-[720px] text-lg leading-8 text-[#c8d3cc]">เลือกเอกสารให้ตรงกับแผนทริป รู้ว่าเที่ยวได้ที่ไหน อยู่ได้กี่วัน และเด็กต้องเตรียมอะไร ก่อนข้ามสะพานมิตรภาพไปเวียงจันทน์</p>
            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#aebcb3]"><span>ทีมงาน HUGLAO</span><span>•</span><time dateTime={PUBLISHED}>{PUBLISHED_TH}</time><span>•</span><span>อ่านประมาณ 5 นาที</span></div>
          </div>
          <figure className="hl-mobile-media-card hl-detail-media-card overflow-hidden rounded-[28px] border border-white/10 bg-[#0a2d20] shadow-[0_28px_80px_rgba(0,0,0,.28)]">
            <div className="hl-mobile-media relative aspect-[16/9] max-h-[440px]">
              <Image src={media.src} alt={media.alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" priority />
            </div>
            <figcaption className="hl-mobile-content px-5 py-4 text-xs leading-6 text-[#afbeb5]">{media.alt} · <Link href="/image-credits" className="font-semibold text-[#efd276]">ดูเครดิตภาพ</Link></figcaption>
          </figure>
        </div>
      </header>

      <div className="hl-shell grid gap-12 py-[clamp(64px,8vw,105px)] lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="max-w-[820px]">
          <p className="font-serif-th text-[clamp(1.4rem,3vw,2rem)] font-bold leading-relaxed text-[#0a2d20]">
            สรุปสั้น ๆ: ถ้าเที่ยวเฉพาะนครหลวงเวียงจันทน์ไม่เกิน 3 วัน ใช้บัตรผ่านแดนชั่วคราวได้ แต่ถ้าจะไปวังเวียง น้ำงึม เมืองเฟือง หรืออยู่นานกว่านั้น ต้องใช้พาสปอร์ต
          </p>

          <section className="mt-12">
            <span className="hl-kicker">เปรียบเทียบเอกสาร</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#071d13]">บัตรผ่านแดนชั่วคราว vs พาสปอร์ต</h2>
            <div className="mt-7 overflow-x-auto rounded-[24px] border border-[#ddd4c1]">
              <table className="w-full min-w-[560px] text-left text-sm leading-7">
                <thead className="bg-[#0a2d20] text-white">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">หัวข้อ</th>
                    <th scope="col" className="px-5 py-4 font-semibold">บัตรผ่านแดนชั่วคราว</th>
                    <th scope="col" className="px-5 py-4 font-semibold">พาสปอร์ต</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.label} className="border-t border-[#e5dece] even:bg-[#fcfaf5]">
                      <th scope="row" className="px-5 py-4 font-semibold text-[#0a2d20]">{row.label}</th>
                      <td className="px-5 py-4 text-[#59645d]">{row.pass}</td>
                      <td className="px-5 py-4 text-[#59645d]">{row.passport}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-14">
            <span className="hl-kicker">พื้นที่และระยะเวลา</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#071d13]">บัตรผ่านแดนเที่ยวได้ที่ไหน อยู่ได้กี่วัน</h2>
            <div className="mt-6 space-y-5 text-[1.04rem] leading-8 text-[#4f5d54]">
              <p>บัตรผ่านแดนชั่วคราว (Temporary Border Pass) ใช้ได้เฉพาะเขตนครหลวงเวียงจันทน์ หรือพื้นที่ตามข้อตกลงของแต่ละด่านชายแดน สำหรับผู้ที่ข้ามที่ด่านหนองคาย พื้นที่ที่เที่ยวได้คือนครหลวงเวียงจันทน์ และพำนักใน สปป. ลาว ได้ครั้งละไม่เกิน 3 วัน</p>
              <p>นครหลวงเวียงจันทน์มีจุดเที่ยวพอสำหรับทริปสั้น เช่น ประตูชัย พระธาตุหลวง วัดสีสะเกด วัดสีเมือง และย่านริมแม่น้ำโขง ส่วนวังเวียง น้ำงึม และเมืองเฟืองอยู่ในแขวงเวียงจันทน์ซึ่งอยู่นอกนครหลวง จึงต้องใช้พาสปอร์ต</p>
            </div>
          </section>

          <section className="mt-14 rounded-[28px] bg-[#0a2d20] p-[clamp(26px,5vw,46px)] text-white">
            <span className="hl-kicker !text-[#efd276]">เดินทางกับเด็ก</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.1rem)] font-bold">เด็กที่ยังไม่มีบัตรประชาชนต้องเตรียมอะไร</h2>
            <p className="mt-6 leading-8 text-[#c8d3cc]">เด็กอายุต่ำกว่า 7 ปี หรือยังไม่มีบัตรประชาชน ใช้สำเนาสูติบัตรของเด็กคู่กับสำเนาบัตรประชาชนของบิดา มารดา หรือผู้ปกครองที่พามา พ่อ แม่ หรือผู้ปกครองตามกฎหมายต้องพาเด็กไปติดต่อที่ด่านด้วยตนเอง และเด็กจะถูกบันทึกชื่อเป็นผู้ติดตามในเอกสารของผู้ปกครอง</p>
            <h3 className="mt-7 font-bold text-[#efd276]">เอกสารที่ต้องเตรียม</h3>
            <ul className="mt-4 space-y-3 leading-7 text-[#c8d3cc]">
              {CHILD_DOCS.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </section>

          <section className="mt-14">
            <span className="hl-kicker">ขั้นตอนวันเดินทาง</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#071d13]">จากด่านหนองคายถึงจุดรับรถฝั่งลาว</h2>
            <ol className="mt-7 divide-y divide-[#e5dece] overflow-hidden rounded-[24px] border border-[#ddd4c1]">
              {CROSSING_STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4 bg-white px-5 py-5 even:bg-[#fcfaf5]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a2d20] text-xs font-bold text-[#efd276]">{index + 1}</span>
                  <div>
                    <h3 className="font-semibold text-[#0a2d20]">{step.title}</h3>
                    <p className="mt-2 leading-7 text-[#59645d]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14">
            <span className="hl-kicker">คำถามที่พบบ่อย</span>
            <div className="mt-6 divide-y divide-[#ddd4c1] border-y border-[#ddd4c1]">
              {FAQS.map((faq) => (
                <details key={faq.q} className="py-1">
                  <summary className="cursor-pointer py-5 font-semibold text-[#0a2d20]">{faq.q}</summary>
                  <p className="pb-6 leading-8 text-[#59645d]">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-[24px] border border-[#ddd4c1] bg-[#f7f3e9] p-6 lg:sticky lg:top-28">
          <span className="text-xs font-bold uppercase tracking-[.16em] text-[#9b711c]">ให้ HUGLAO ช่วย</span>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#59645d]"><li>• ทำบัตรผ่านแดน 100 บาท/คน เหมารวมทุกอย่าง</li><li>• รถรับที่ด่านท่านาแล้งฝั่งลาว</li><li>• เหมารถเที่ยวในนครหลวงเวียงจันทน์</li></ul>
          <Link href="/services/temporary-border-pass" className="mt-6 block font-bold text-[#9b711c] hover:text-[#0a2d20]">บริการทำบัตรผ่านแดน →</Link>
          <Link href="/routes/vientiane-city" className="mt-4 block font-bold text-[#0a2d20] hover:text-[#9b711c]">เส้นทางเที่ยวในนครหลวงเวียงจันทน์ →</Link>
          <Link href="/vientiane/" className="mt-4 block font-bold text-[#0a2d20] hover:text-[#9b711c]">เช่ารถเวียงจันทน์พร้อมคนขับ →</Link>
        </aside>
      </div>

      <section className="bg-[#efe8d9] py-[clamp(64px,8vw,100px)]">
        <div className="hl-shell">
          <span className="hl-kicker">ราคารถรับที่ด่าน</span>
          <h2 className="mt-5 font-serif-th text-[clamp(2.1rem,4.5vw,3.6rem)] font-bold text-[#071d13]">ด่านท่านาแล้งฝั่งลาว → ตัวเมืองเวียงจันทน์</h2>
          <p className="mb-8 mt-5 max-w-[820px] leading-8 text-[#59645d]">ราคาต่อคันต่อเที่ยว รวมคนขับและน้ำมัน ทีมงานจะตรวจรถที่ว่างและยืนยันจุดนัดหมายก่อนวันเดินทาง</p>
          <PublishedPriceTable rows={prices} showCategoryHeadings={false} />
        </div>
      </section>

      <LineCta title="ทำบัตรผ่านแดนพร้อมจองรถรับที่ด่าน" description="ส่งสำเนาบัตรประชาชน วันเดินทางไปและกลับ จำนวนผู้เดินทาง และจุดหมายในเวียงจันทน์ เพื่อให้ทีม HUGLAO ตรวจเอกสารและยืนยันรถ" />
    </article>
  );
}
