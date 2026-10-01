import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import LineCta from "@/components/LineCta";
import PublishedPriceTable from "@/components/PublishedPriceTable";
import { getCurrentPriceRows } from "@/data/pricing";
import { SITE } from "@/data/site";

const SLUG = "wat-si-muang-vientiane";
const ARTICLE_PATH = `/articles/${SLUG}`;
const TITLE = "วัดสีเมือง (ວັດສີເມືອງ) เวียงจันทน์ รีวิว ไหว้ขอพรเรื่องงาน หลักเมือง และวิธีเดินทาง";
const DESCRIPTION =
  "รีวิวไหว้วัดสีเมือง เวียงจันทน์ จากประสบการณ์ทีม HUGLAO ประวัติหลักเมือง ความเชื่อเรื่องขอพรให้การงานราบรื่น ขั้นตอนไหว้ เซียมซี มารยาท และวิธีเดินทางพร้อมรถคนขับ";
const COVER = "/assets/wat-si-muang-front.webp";
const PUBLISHED = "2026-10-01";
const PUBLISHED_TH = "1 ตุลาคม 2569";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["วัดสีเมือง", "วัดศรีเมือง เวียงจันทน์", "ວັດສີເມືອງ", "หลักเมืองเวียงจันทน์", "ขอพรเรื่องงาน ลาว", "เที่ยวเวียงจันทน์", "Wat Si Muang"],
  alternates: { canonical: `${ARTICLE_PATH}/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${ARTICLE_PATH}/`,
    type: "article",
    images: [COVER],
  },
};

const TOC = [
  { id: "summary", label: "สรุปก่อนไป" },
  { id: "history", label: "ประวัติวัดสีเมือง" },
  { id: "belief", label: "ความเชื่อ: ขอพรเรื่องงาน" },
  { id: "walkthrough", label: "เดินชมวัดตามภาพ" },
  { id: "how-to-pray", label: "ขั้นตอนไหว้และเซียมซี" },
  { id: "etiquette", label: "มารยาทที่ควรรู้" },
  { id: "getting-there", label: "ที่ตั้งและการเดินทาง" },
  { id: "faq", label: "คำถามที่พบบ่อย" },
] as const;

const QUICK_FACTS = [
  { label: "ที่ตั้ง", value: "ย่านใจกลางเมือง เขตจันทะบุรี นครหลวงเวียงจันทน์" },
  { label: "ไฮไลต์", value: "หลักเมือง (ສີເມືອງ) และสิมสถาปัตยกรรมลาว" },
  { label: "เหมาะกับ", value: "ผู้ที่อยากไหว้ขอพรเรื่องงาน การเงิน และความราบรื่น" },
  { label: "เวลาที่ใช้", value: "ประมาณ 45–90 นาที รวมเวลาไหว้และชมวัด" },
  { label: "การแต่งกาย", value: "สุภาพ ปิดไหล่และเข่า ถอดรองเท้าก่อนเข้าอาคาร" },
] as const;

const BELIEF_POINTS = [
  { title: "ขอพรให้การงานก้าวหน้า", body: "คนทำงาน เจ้าของธุรกิจ และผู้เตรียมสมัครงานหรือสอบ มักแวะมาไหว้หลักเมืองเพื่อขอให้งานราบรื่น ได้รับโอกาสดี และมีผู้สนับสนุน" },
  { title: "ขอพรก่อนเริ่มต้นสิ่งใหม่", body: "ก่อนเปิดกิจการ เดินทางไกล หรือเริ่มโครงการสำคัญ คนท้องถิ่นนิยมมาไหว้เพื่อความเป็นสิริมงคลและให้ทุกอย่างเริ่มต้นได้ด้วยดี" },
  { title: "แก้บนและขอบคุณ", body: "เมื่อสมหวังแล้ว หลายคนกลับมาถวายดอกไม้ ธูปเทียน และทำบุญตอบแทน เป็นส่วนหนึ่งของวัฒนธรรมการขอพรที่ต่อเนื่องของชาวเวียงจันทน์" },
] as const;

const STEPS = [
  { title: "เตรียมชุดบูชา", body: "ชุดที่เราใช้ประกอบด้วยพานดอกดาวเรืองที่พับใบตองเป็นกรวย ดอกไม้สด และเทียนขี้ผึ้งสีเหลือง ซึ่งเตรียมได้จากบริเวณวัดหรือร้านใกล้เคียง" },
  { title: "แต่งกายสุภาพและถอดรองเท้า", body: "ปิดไหล่และเข่า ถอดรองเท้าไว้ด้านนอกก่อนขึ้นอาคาร และทำเสียงเบา ๆ ในพื้นที่ที่มีผู้กำลังสวดมนต์" },
  { title: "จุดเทียนและตั้งจิตอธิษฐาน", body: "วางพานหรือจุดเทียนในจุดที่วัดจัดไว้ นั่งพับเพียบ แล้วตั้งจิตแจ้งชื่อ ที่อยู่ และสิ่งที่ปรารถนา เช่น ให้การงานราบรื่นหรือเดินทางปลอดภัย" },
  { title: "ขอเซียมซี (ถ้าสนใจ)", body: "เขย่ากระบอกไม้เซียมซีจนมีไม้หล่นออกมาหนึ่งอัน อ่านหมายเลขบนไม้ แล้วนำไปหยิบใบทำนายที่ตรงกัน เซียมซีที่วัดนี้เป็นภาษาลาว หากอ่านไม่ออกให้ถามผู้ดูแลหรือคนท้องถิ่น" },
  { title: "ทำบุญและกล่าวขอบคุณ", body: "ก่อนกลับ ทำบุญตามกำลังศรัทธาและกราบลาอย่างสุภาพ" },
] as const;

const ETIQUETTE = [
  "แต่งกายสุภาพ ไม่ใส่กางเกงขาสั้นหรือเสื้อเปิดไหล่",
  "ถอดรองเท้าก่อนเข้าอาคาร และไม่เหยียบธรณีประตู",
  "ขออนุญาตก่อนถ่ายภาพบุคคล และไม่ใช้แฟลชหรือถ่ายในขณะที่มีผู้กำลังประกอบพิธี",
  "ไม่ชี้เท้าไปทางพระพุทธรูปหรือหลักเมือง และไม่สัมผัสวัตถุบูชาโดยไม่จำเป็น",
  "เตรียมเงินสดย่อย ๆ สำหรับซื้อดอกไม้ ธูปเทียน และทำบุญ",
] as const;

const ROUTE_TIMES = [
  { from: "สนามบินวัตไต", time: "ประมาณ 15–25 นาที", note: "เหมาะแวะวัดเป็นจุดแรกก่อนเช็กอินโรงแรม" },
  { from: "ตัวเมือง/ริมโขง", time: "ประมาณ 5–15 นาที", note: "บางโรงแรมในย่านเมืองเก่าเดินถึงได้" },
  { from: "สถานีรถไฟคำสะหวาด", time: "ประมาณ 25–40 นาที", note: "ขึ้นกับการจราจรช่วงเช้าและเย็น" },
  { from: "ด่านสะพานมิตรภาพ (ท่านาแล้ง)", time: "ประมาณ 30–50 นาที", note: "รวมเวลาผ่านด่านให้เผื่อเพิ่ม" },
] as const;

const FAQS = [
  {
    q: "วัดสีเมืองอยู่ที่ไหน และเดินทางจากสนามบินวัตไตได้อย่างไร",
    a: "วัดสีเมืองอยู่ในย่านใจกลางเมืองเวียงจันทน์ เขตจันทะบุรี จากสนามบินวัตไตใช้เวลาโดยประมาณ 15–25 นาทีด้วยรถยนต์ ขึ้นกับการจราจร สามารถเลือกใช้บริการรถรับส่งหรือเหมารถพร้อมคนขับจาก HUGLAO ได้",
  },
  {
    q: "ไหว้ขอพรเรื่องงานที่วัดสีเมือง ต้องเตรียมอะไรบ้าง",
    a: "โดยทั่วไปเตรียมดอกไม้ ธูป และเทียน อาจเป็นชุดพานดอกดาวเรืองและเทียนขี้ผึ้งที่ซื้อได้ในบริเวณวัด พร้อมแต่งกายสุภาพ ส่วนรายละเอียดขั้นตอนอาจแตกต่างตามวันและผู้ดูแลวัด ควรสังเกตหรือสอบถามเจ้าหน้าที่ก่อน",
  },
  {
    q: "วัดสีเมืองเปิดกี่โมง มีค่าเข้าชมหรือไม่",
    a: "เวลาเปิด–ปิดและเงื่อนไขอาจเปลี่ยนแปลงตามวันสำคัญทางศาสนา จึงควรตรวจสอบก่อนเดินทาง และเตรียมเงินสดย่อยสำหรับทำบุญและซื้อชุดบูชา",
  },
  {
    q: "การขอพรที่วัดสีเมืองการันตีผลสำเร็จหรือไม่",
    a: "ไม่การันตี การขอพรเป็นความเชื่อและกำลังใจส่วนบุคคล ผลลัพธ์ด้านการงานยังขึ้นกับความตั้งใจและการลงมือทำของแต่ละคน บทความนี้เล่าประสบการณ์และความเชื่อท้องถิ่นเท่านั้น",
  },
  {
    q: "ควรเหมารถหรือเช่ารถตู้ไปวัดสีเมือง HUGLAO ดีไหม",
    a: "หากไปเป็นกลุ่มหรือครอบครัว การเช่ารถตู้พร้อมคนขับช่วยให้แวะหลายจุดในวันเดียวได้สะดวก เช่น วัดสีเมือง วัดสีสะเกด ประตูชัย และพระธาตุหลวง ส่วนผู้เดินทางไม่เกิน 3–4 คนสามารถเลือกรถเก๋ง/SUV ได้ ส่งรายละเอียดผ่าน LINE เพื่อให้ทีมงานยืนยันรถและราคา",
  },
] as const;

function Fig({ src, alt, caption, className = "" }: { src: string; alt: string; caption: string; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-[22px] border border-[#ddd4c1] bg-[#f7f3e9] ${className}`}>
      <div className="relative aspect-[3/4]">
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 380px" className="object-cover" />
      </div>
      <figcaption className="px-4 py-3 text-[.82rem] leading-6 text-[#687169]">{caption}</figcaption>
    </figure>
  );
}

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <>
      <span className="hl-kicker">{kicker}</span>
      <h2 className="mt-4 font-serif-th text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-tight text-[#071d13]">{title}</h2>
    </>
  );
}

export default function WatSiMuangArticlePage() {
  const prices = [
    ...getCurrentPriceRows({ routeSlug: "vientiane-city" }),
    ...getCurrentPriceRows({ routeSlug: "transfer-wattay-city-hotel" }),
  ];
  const url = `${SITE.website}${ARTICLE_PATH}/`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: TITLE,
      description: DESCRIPTION,
      image: [`${SITE.website}${COVER}`],
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
      about: {
        "@type": "BuddhistTemple",
        name: "วัดสีเมือง (Wat Si Muang)",
        alternateName: ["ວັດສີເມືອງ", "วัดศรีเมือง", "Wat Simuang"],
        address: { "@type": "PostalAddress", addressLocality: "Vientiane", addressCountry: "LA" },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <article className="bg-white">
      <BreadcrumbStructuredData
        items={[
          { name: "หน้าแรก", href: "/" },
          { name: "บทความ", href: "/articles/" },
          { name: "วัดสีเมือง", href: `${ARTICLE_PATH}/` },
        ]}
      />
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      <header className="bg-[#071d13] pb-[clamp(40px,6vw,80px)] pt-[clamp(104px,13vw,160px)] text-white">
        <div className="hl-shell grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
          <div>
            <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap gap-2 text-xs text-[#aebcb3]">
              <Link href="/" className="hover:text-white">หน้าแรก</Link><span>/</span>
              <Link href="/articles" className="hover:text-white">บทความ</Link><span>/</span>
              <span className="text-[#efd276]">วัดสีเมือง</span>
            </nav>
            <span className="hl-kicker !text-[#efd276]">รีวิวจากหน้างาน · เวียงจันทน์</span>
            <h1 className="mt-4 font-serif-th text-[clamp(2rem,5vw,3.9rem)] font-bold leading-[1.15]">
              วัดสีเมือง ວັດສີເມືອງ
              <span className="mt-2 block text-[.5em] font-semibold leading-snug text-[#efd276]">ไหว้ขอพรเรื่องงาน หลักเมืองศักดิ์สิทธิ์แห่งเวียงจันทน์</span>
            </h1>
            <p className="mt-5 max-w-[640px] text-[1.02rem] leading-8 text-[#c8d3cc]">
              เล่าจากการไปไหว้จริงของทีมงาน HUGLAO ตั้งแต่ประวัติหลักเมือง ความเชื่อเรื่องการงาน ขั้นตอนไหว้และเซียมซี ไปจนถึงวิธีเดินทางจากเวียงจันทน์
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#aebcb3]">
              <span>โดย ทีมงาน {SITE.name}</span><span>•</span>
              <time dateTime={PUBLISHED}>{PUBLISHED_TH}</time><span>•</span>
              <span>อ่านประมาณ 8 นาที</span>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[26px] border border-white/10 bg-[#0a2d20] shadow-[0_28px_80px_rgba(0,0,0,.3)] lg:max-w-none">
            <div className="relative aspect-[4/5] lg:aspect-[3/4]">
              <Image src={COVER} alt="ซุ้มประตูสิมวัดสีเมืองสีแดงทอง พร้อมพระพุทธรูปยืนและป้ายชื่อวัด" fill sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover" priority />
            </div>
            <figcaption className="px-5 py-3 text-xs leading-6 text-[#afbeb5]">ด้านหน้าสิมวัดสีเมือง ภาพถ่ายโดยทีม HUGLAO</figcaption>
          </figure>
        </div>
      </header>

      <div className="hl-shell grid gap-10 py-[clamp(40px,6vw,88px)] lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
        <div className="min-w-0 max-w-[820px]">
          <details className="mb-10 rounded-[20px] border border-[#ddd4c1] bg-[#f7f3e9] p-5 lg:hidden">
            <summary className="cursor-pointer font-bold text-[#0a2d20]">สารบัญบทความ</summary>
            <ol className="mt-4 space-y-2 text-[.95rem]">
              {TOC.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className="text-[#9b711c] hover:underline">{t.label}</a></li>
              ))}
            </ol>
          </details>

          <section id="summary" className="scroll-mt-28">
            <p className="font-serif-th text-[clamp(1.2rem,2.6vw,1.7rem)] font-bold leading-relaxed text-[#0a2d20]">
              ถ้ามีเวลาในเวียงจันทน์เพียงครึ่งวัน วัดสีเมืองคือจุดที่คนทำงานและนักท่องเที่ยวสายมูเตลูมักไม่พลาด เพราะเป็นที่ประดิษฐานหลักเมืองที่คนลาวเคารพ และเชื่อกันว่าการมาขอพรเรื่องงานจะได้รับพลังใจและโอกาสดี ๆ
            </p>
            <dl className="mt-8 grid gap-3 rounded-[24px] border border-[#ddd4c1] bg-[#f7f3e9] p-5 sm:grid-cols-2 sm:p-6">
              {QUICK_FACTS.map((f) => (
                <div key={f.label} className="rounded-2xl bg-white/70 px-4 py-3">
                  <dt className="text-xs font-bold uppercase tracking-[.14em] text-[#9b711c]">{f.label}</dt>
                  <dd className="mt-1 text-[.95rem] leading-7 text-[#3a3d33]">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 leading-8 text-[#4f5d54]">
              เราแวะวัดนี้ระหว่างพาลูกค้าเที่ยวในเมืองเวียงจันทน์ สิ่งแรกที่สะดุดตาคือสิมหลังคากระเบื้องสีแดงอิฐซ้อนชั้น ผนังสีส้มทองตกแต่งลวดลายปิดทอง และลานอิฐกว้างที่เดินสบาย ด้านในมีบรรยากาศสงบ มีผู้คนทยอยมาจุดเทียนและกราบไหว้ตลอด เนื้อหาในบทความนี้แยกเป็นสิ่งที่เราเห็นด้วยตัวเอง ข้อมูลประวัติที่เล่าต่อกันทั่วไป และความเชื่อของผู้มาไหว้ เพื่อให้คุณแยกแยะได้ชัดเจน
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Fig src="/assets/wat-si-muang-vihan-side.webp" alt="สิมวัดสีเมืองผนังสีส้มทองและหลังคากระเบื้องสีแดงอิฐ" caption="สิมหลังคาซ้อนชั้น ผนังสีส้มทอง ประดับลายปิดทองและสิงห์ทองหน้าบันได" />
              <Fig src="/assets/wat-si-muang-courtyard.webp" alt="ลานอิฐหน้าวัดสีเมืองและธงราวพระพุทธศาสนากับธงชาติลาว" caption="ลานหน้าวัดกว้าง มีธงราวธงชาติลาวและธงพุทธศาสนา" />
            </div>
          </section>

          <section id="history" className="mt-14 scroll-mt-28">
            <SectionHead kicker="ประวัติและที่มา" title="ประวัติวัดสีเมือง: วัดคู่เมืองหลวงที่ผ่านการสร้างใหม่" />
            <div className="mt-6 space-y-5 text-[1.04rem] leading-8 text-[#4f5d54]">
              <p>
                ข้อมูลที่เผยแพร่ทั่วไประบุว่า วัดสีเมืองสัมพันธ์กับช่วงที่พระเจ้าไชยเชษฐาธิราชย้ายศูนย์กลางการปกครองมายังเวียงจันทน์ในกลางพุทธศตวรรษที่ 21 หลักเมืองจึงถูกตั้งไว้เพื่อเป็นศูนย์รวมจิตใจของเมืองหลวงแห่งใหม่ ชื่อ “สีเมือง” จึงสื่อถึงสิริมงคลและความเป็นศูนย์กลางของเมือง
              </p>
              <p>
                เรื่องเล่าที่คนเวียงจันทน์ถ่ายทอดกันต่อมาคือตำนานของหญิงสาวผู้เสียสละตนเอง เพื่อให้หลักเมืองตั้งมั่นคง ผู้คนจึงเคารพเป็นดวงวิญญาณผู้ปกปักรักษาเมือง เรื่องราวนี้เป็นตำนานท้องถิ่น รายละเอียดอาจต่างกันไปตามผู้เล่า ภาพเหรียญที่ระลึกที่เราพบในวัดมีชื่อ “ย่าแม่สีเมือง” และรูปหญิงยืนยกมือขวาในท่าประทานพร ซึ่งสอดคล้องกับความเคารพที่ชาวบ้านมีต่อผู้ปกปักรักษาเมือง
              </p>
              <p>
                วัดผ่านการบูรณะและสร้างใหม่หลายครั้งตามยุคสมัย สิมที่เห็นปัจจุบันจึงเป็นงานสถาปัตยกรรมที่ผสมความเก่าแก่ของความเชื่อกับฝีมือช่างปัจจุบัน หากต้องการอ้างอิงปีและรายละเอียดทางประวัติศาสตร์ ควรตรวจกับป้ายข้อมูลในวัดหรือแหล่งข้อมูลทางการของลาวอีกครั้ง
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_1fr]">
              <Fig src="/assets/wat-si-muang-naga-stairs.webp" alt="บันไดพญานาคสีเขียวทองหน้าสิมวัดสีเมือง" caption="บันไดพญานาคเขียวทองหน้าสิมหลังเล็ก เสาแดงลายทองเป็นงานช่างลาวที่ละเอียดมาก" />
              <Fig src="/assets/wat-si-muang-banyan-shrine.webp" alt="ศาลใต้ต้นไม้ใหญ่ในวัดสีเมืองมีรูปฤๅษีและพระพุทธรูปยืน" caption="ศาลใต้ต้นไม้ใหญ่กลางลานวัด ประดิษฐานรูปฤๅษีและพระพุทธรูปหลายองค์" />
            </div>
          </section>

          <section id="belief" className="mt-14 scroll-mt-28">
            <SectionHead kicker="ชื่อเสียงของวัด" title="ทำไมคนถึงมาขอพรเรื่องงานที่วัดสีเมือง" />
            <p className="mt-6 leading-8 text-[#4f5d54]">
              ในหมู่คนทำงานชาวลาวและนักท่องเที่ยว วัดสีเมืองมีชื่อเสียงว่าเป็นที่พึ่งทางใจของผู้ต้องการความก้าวหน้า หลักเมืองคือสัญลักษณ์ของความมั่นคงและการเริ่มต้นที่ดี ผู้มาไหว้จึงเชื่อว่าการตั้งจิตอธิษฐานต่อหลักเมืองจะช่วยให้งานที่ทำสำเร็จตามความตั้งใจ ทั้งนี้เป็นความเชื่อและกำลังใจส่วนบุคคล ไม่ใช่การรับประกันผล
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {BELIEF_POINTS.map((b, i) => (
                <article key={b.title} className="rounded-[22px] border border-[#ddd4c1] bg-[#f7f3e9] p-5">
                  <span className="text-xs font-bold text-[#9b711c]">0{i + 1}</span>
                  <h3 className="mt-3 font-serif-th text-lg font-bold text-[#0a2d20]">{b.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#59645d]">{b.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="walkthrough" className="mt-14 scroll-mt-28">
            <SectionHead kicker="เดินชมวัดตามภาพ" title="ภายในวัด: แท่นบูชา หลักเมือง และซุ้มประดับกระจกสี" />
            <p className="mt-6 leading-8 text-[#4f5d54]">
              ภายในอาคารเพดานทาสีแดงสดและลายทองเต็มผืน เสาใหญ่สีทองรับน้ำหนักหลังคา ผนังด้านหลังเป็นจิตรกรรมพุทธประวัติสีสด หน้าแท่นมีพระพุทธรูปหลายปางเรียงลดหลั่น ขนาบด้วยเทียนขี้ผึ้งแท่งใหญ่ และงาช้างประดับพวงมาลัยซึ่งสะท้อนความเคารพแบบลาวดั้งเดิม
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Fig src="/assets/wat-si-muang-altar.webp" alt="แท่นบูชาภายในวัดสีเมืองมีหลักเมืองห่อผ้าสีส้มขาวและพระพุทธรูปหลายองค์" caption="หลักเมืองห่อผ้าสีส้มและขาวอยู่กลางภาพ รายล้อมด้วยพระพุทธรูปและเครื่องบูชา" />
              <Fig src="/assets/wat-si-muang-sanctum.webp" alt="ซุ้มยอดปราสาทประดับกระจกสีประดิษฐานรูปเคารพ" caption="ซุ้มยอดปราสาทประดับกระจกสีและพัดยศสีขาวลายทองสองข้าง" />
            </div>
            <div className="mt-4 grid items-center gap-4 sm:grid-cols-[1fr_1fr]">
              <p className="leading-8 text-[#4f5d54]">
                ในซุ้มยอดปราสาทมีรูปเคารพทรงเครื่องสวมสร้อยลูกปัด และมีลูกแก้วใสวางอยู่ด้านหน้า ฉากหลังเป็นจิตรกรรมสีสด เราประทับใจที่งานกระจกสีและลายทองทั้งหมดเป็นงานฝีมือประณีตมาก เมื่อมองใกล้จะเห็นรายละเอียดแต่ละชิ้น
              </p>
              <Fig src="/assets/wat-si-muang-deity-shrine.webp" alt="รูปเคารพทรงเครื่องในซุ้มกระจกสีพร้อมลูกแก้วใส" caption="รูปเคารพในซุ้มกระจกสี มีลูกแก้วใสวางด้านหน้า" />
            </div>
          </section>

          <section id="how-to-pray" className="mt-14 scroll-mt-28">
            <SectionHead kicker="ขั้นตอนไหว้และเซียมซี" title="ไหว้ขอพรเรื่องงานที่วัดสีเมืองทำอย่างไร" />
            <p className="mt-6 leading-8 text-[#4f5d54]">ลำดับด้านล่างสรุปจากสิ่งที่เราทำและเห็นผู้อื่นทำในวัน ผู้ดูแลวัดอาจแนะนำต่างออกไป ให้ยึดคำแนะนำหน้างานเป็นหลัก</p>
            <ol className="mt-7 divide-y divide-[#e5dece] overflow-hidden rounded-[24px] border border-[#ddd4c1]">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4 bg-white px-4 py-5 even:bg-[#fcfaf5] sm:px-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a2d20] text-xs font-bold text-[#efd276]">{i + 1}</span>
                  <div><h3 className="font-bold text-[#0a2d20]">{s.title}</h3><p className="mt-1 text-[.95rem] leading-7 text-[#59645d]">{s.body}</p></div>
                </li>
              ))}
            </ol>
            <div className="mt-7 grid grid-cols-2 gap-4">
              <Fig src="/assets/wat-si-muang-offerings.webp" alt="พานดอกดาวเรืองพับใบตอง ดอกไม้ และเทียนขี้ผึ้งสีเหลือง" caption="ชุดบูชา: ดอกดาวเรืองในกรวยใบตอง ดอกไม้สด และเทียนเหลือง" />
              <Fig src="/assets/wat-si-muang-candle.webp" alt="เทียนขี้ผึ้งสีเหลืองยาวถือในมือ" caption="เทียนขี้ผึ้งสีเหลืองตามแบบฉบับลาว ลายนูนตลอดแท่ง" />
            </div>

            <h3 className="mt-10 font-serif-th text-xl font-bold text-[#0a2d20]">เซียมซีใบทำนายภาษาลาว</h3>
            <p className="mt-3 leading-8 text-[#4f5d54]">
              หลังไหว้เสร็จ เราลองขอเซียมซี ได้ไม้หมายเลข 17 และหยิบใบทำนายใบที่ 17 มาอ่าน ตัวอักษรเป็นภาษาลาวพิมพ์สีน้ำเงินบนกระดาษแผ่นเล็ก จัดเก็บในช่องไม้เรียงตามลำดับ ถ้าไม่ถนัดภาษาลาว คนท้องถิ่นหรือผู้ดูแลมักช่วยแปลให้ ควรมองเป็นข้อคิดและกำลังใจ ไม่ใช่คำตัดสินชีวิต
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <Fig src="/assets/wat-si-muang-fortune-stick.webp" alt="ไม้เซียมซีหมายเลข 17 และกล่องใบทำนาย" caption="ไม้เซียมซีหมายเลข 17 พร้อมกล่องใบทำนายด้านหลัง" />
              <Fig src="/assets/wat-si-muang-fortune-slip.webp" alt="ใบทำนายเซียมซีใบที่ 17 ภาษาลาว" caption="ใบทำนายใบที่ 17 พิมพ์ด้วยภาษาลาว" />
            </div>

            <h3 className="mt-10 font-serif-th text-xl font-bold text-[#0a2d20]">เหรียญและพระเครื่องที่ระลึก</h3>
            <p className="mt-3 leading-8 text-[#4f5d54]">
              ของที่ระลึกยอดนิยมคือเหรียญพระเครื่องใส่กรอบพลาสติก ผูกสายสีส้มแบบพระ เราได้เหรียญหนึ่งด้านหน้าเป็นรูปหญิงยืนยกมือขวา ใต้รูปมีข้อความ “ย่าแม่สีเมือง” ด้านหลังเป็นรูปหลักเมืองบนฐานบัวคว่ำ และมีตัวเลข 2566 ปรากฏ นอกจากนี้ยังมีพระเครื่ององค์เล็กปางนาคปรกตามภาพ ราคาและรูปแบบมีหลายแบบ ควรสอบถามที่วัดโดยตรง
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">
              <Fig src="/assets/wat-si-muang-amulet-front.webp" alt="เหรียญย่าแม่สีเมือง ด้านหน้า" caption="เหรียญย่าแม่สีเมือง ด้านหน้า" />
              <Fig src="/assets/wat-si-muang-amulet-back.webp" alt="เหรียญที่ระลึกวัดสีเมือง ด้านหลังเป็นรูปหลักเมือง" caption="ด้านหลังเป็นรูปหลักเมือง" />
              <Fig src="/assets/wat-si-muang-amulet-naga.webp" alt="พระเครื่ององค์เล็กปางนาคปรกในกรอบพลาสติกใส" caption="พระเครื่ององค์เล็กในกรอบใส" />
            </div>
          </section>

          <section id="etiquette" className="mt-14 scroll-mt-28">
            <div className="rounded-[28px] bg-[#0a2d20] p-[clamp(24px,5vw,44px)] text-white">
              <span className="hl-kicker !text-[#efd276]">มารยาทที่ควรรู้</span>
              <h2 className="mt-4 font-serif-th text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold">ไหว้อย่างให้เกียรติสถานที่</h2>
              <ul className="mt-6 space-y-3">
                {ETIQUETTE.map((e) => (
                  <li key={e} className="flex gap-3 leading-7 text-[#c8d3cc]"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#efd276]" aria-hidden />{e}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="getting-there" className="mt-14 scroll-mt-28">
            <SectionHead kicker="ที่ตั้งและการเดินทาง" title="เดินทางไปวัดสีเมืองจากเวียงจันทน์" />
            <p className="mt-6 leading-8 text-[#4f5d54]">
              วัดสีเมืองอยู่ในย่านใจกลางเมืองเวียงจันทน์ เขตจันทะบุรี เดินทางสะดวกจากโรงแรมในตัวเมือง ให้ค้นหา “Wat Si Muang” หรือ “ວັດສີເມືອງ” ใน Google Maps เวลาด้านล่างเป็นค่าประมาณด้วยรถยนต์ ซึ่งเปลี่ยนตามการจราจรและช่วงเวลา
            </p>
            <div className="mt-6 overflow-x-auto rounded-[22px] border border-[#ddd4c1]">
              <table className="w-full min-w-[520px] border-collapse text-[.93rem]">
                <thead className="bg-[#0a2d20] text-left text-white">
                  <tr><th className="px-4 py-3 font-semibold">ออกจาก</th><th className="px-4 py-3 font-semibold">เวลาโดยประมาณ</th><th className="px-4 py-3 font-semibold">หมายเหตุ</th></tr>
                </thead>
                <tbody>
                  {ROUTE_TIMES.map((r) => (
                    <tr key={r.from} className="border-t border-[#e5dece] even:bg-[#fcfaf5]">
                      <td className="px-4 py-3 font-semibold text-[#0a2d20]">{r.from}</td>
                      <td className="px-4 py-3 text-[#3a3d33]">{r.time}</td>
                      <td className="px-4 py-3 text-[#59645d]">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mt-10 font-serif-th text-xl font-bold text-[#0a2d20]">เลือกเดินทางแบบไหนดี</h3>
            <ul className="mt-4 space-y-3 leading-8 text-[#4f5d54]">
              <li><strong className="text-[#0a2d20]">เช่ารถพร้อมคนขับ:</strong> สะดวกที่สุดหากต้องการแวะหลายจุดในวัน เช่น วัดสีสะเกด หอพระแก้ว ประตูชัย และพระธาตุหลวง คนขับรอที่รถ ไม่ต้องหาที่จอดหรือเรียกรถหลายรอบ</li>
              <li><strong className="text-[#0a2d20]">เช่ารถตู้:</strong> เหมาะกับครอบครัวหรือกลุ่มเพื่อน นั่งสบายและมีที่เก็บสัมภาระ ดูรายละเอียดที่ <Link href="/van-laos" className="font-semibold text-[#9b711c] underline">รถตู้เที่ยวลาวพร้อมคนขับ</Link></li>
              <li><strong className="text-[#0a2d20]">แท็กซี่/ตุ๊กตุ๊ก:</strong> ใช้ได้ในระยะสั้น ควรตกลงราคาก่อนขึ้น และตรวจเวลารับกลับให้ชัดเจน</li>
            </ul>
            <div className="mt-6 rounded-[22px] border border-[#e3bd63]/60 bg-[#fbf6e8] p-5 sm:p-6">
              <p className="font-bold text-[#0a2d20]">ใช้บริการ HUGLAO ฮักลาว</p>
              <p className="mt-2 text-[.95rem] leading-7 text-[#59645d]">
                ทีม HUGLAO ให้บริการ<Link href="/car-with-driver" className="font-semibold text-[#9b711c] underline">เช่ารถพร้อมคนขับ</Link>และ<Link href="/van-laos" className="font-semibold text-[#9b711c] underline">เช่ารถตู้</Link>ในเวียงจันทน์ รับที่สนามบิน สถานีรถไฟ ด่านชายแดน หรือโรงแรม แล้วพาไหว้วัดสีเมืองต่อด้วยจุดเที่ยวอื่นในเมืองตามเวลาที่คุณกำหนด ส่งวันเดินทาง จำนวนคน และจุดรับผ่าน LINE ทีมงานจะยืนยันรถและราคาให้
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary min-h-12 px-6">ทักไลน์สอบถามราคา</a>
                <Link href="/routes/vientiane-city" className="inline-flex min-h-12 items-center rounded-full border border-[#0a2d20]/20 px-6 text-sm font-bold text-[#0a2d20] hover:border-[#9b711c]">ดูแผนเที่ยวในเมือง →</Link>
              </div>
            </div>
          </section>
        </div>

        <aside className="hidden h-fit lg:sticky lg:top-28 lg:block">
          <nav aria-label="สารบัญ" className="rounded-[22px] border border-[#ddd4c1] bg-[#f7f3e9] p-5">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#9b711c]">สารบัญ</p>
            <ol className="mt-4 space-y-2.5 text-[.9rem] leading-6">
              {TOC.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className="text-[#3a3d33] hover:text-[#9b711c]">{t.label}</a></li>
              ))}
            </ol>
            <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-5 min-h-11 w-full text-sm">ทักไลน์ HUGLAO</a>
          </nav>
        </aside>
      </div>

      <section className="bg-[#efe8d9] py-[clamp(48px,7vw,96px)]">
        <div className="hl-shell">
          <span className="hl-kicker">ราคารถที่เผยแพร่</span>
          <h2 className="mt-4 font-serif-th text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#071d13]">รถพร้อมคนขับในเวียงจันทน์</h2>
          <p className="mb-8 mt-4 max-w-[820px] leading-8 text-[#59645d]">ราคาต่อคันต่อเที่ยว รวมคนขับและน้ำมัน ไม่รวมค่าทำบุญ ดอกไม้ธูปเทียน อาหาร หรือค่าใช้จ่ายส่วนตัว เว้นแต่ระบุไว้ในข้อเสนอ</p>
          <PublishedPriceTable rows={prices} showCategoryHeadings={false} />
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 bg-white py-[clamp(48px,7vw,96px)]">
        <div className="hl-shell max-w-[900px]">
          <span className="hl-kicker">คำถามที่พบบ่อย</span>
          <h2 className="mt-4 font-serif-th text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#071d13]">ถาม–ตอบเรื่องวัดสีเมือง</h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-[20px] border border-[#ddd4c1] bg-[#f7f3e9] px-5 py-4 open:bg-white">
                <summary className="cursor-pointer list-none font-bold leading-7 text-[#0a2d20] marker:hidden">{f.q}</summary>
                <p className="mt-3 leading-8 text-[#4f5d54]">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 rounded-[22px] border border-[#ddd4c1] p-5 text-sm leading-7 text-[#687169]">
            <p><strong className="text-[#0a2d20]">เกี่ยวกับผู้เขียน:</strong> ทีมงาน {SITE.name} ให้บริการรถพร้อมคนขับในเวียงจันทน์และเส้นทางท่องเที่ยวในลาว เนื้อหาในบทความนี้มาจากการไปเยือนวัดจริง ภาพถ่ายทั้งหมดถ่ายโดยทีม HUGLAO</p>
            <p className="mt-3"><strong className="text-[#0a2d20]">ข้อควรทราบ:</strong> ข้อมูลประวัติเป็นเรื่องเล่าและข้อมูลเผยแพร่ทั่วไป ส่วนความเชื่อเรื่องการขอพรเป็นเรื่องศรัทธาส่วนบุคคล เวลาเปิด–ปิด และขั้นตอนอาจเปลี่ยนแปลงได้ ปรับปรุงล่าสุด {PUBLISHED_TH}</p>
          </div>
          <div className="mt-8">
            <p className="font-bold text-[#0a2d20]">อ่านต่อ</p>
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/vientiane/" className="font-semibold text-[#9b711c] hover:text-[#0a2d20]">→ เช่ารถเวียงจันทน์พร้อมคนขับ</Link>
              <Link href="/routes/vientiane-city" className="font-semibold text-[#9b711c] hover:text-[#0a2d20]">→ เที่ยวในนครหลวงเวียงจันทน์</Link>
              <Link href="/articles/nam-pien-yorla-pa" className="font-semibold text-[#9b711c] hover:text-[#0a2d20]">→ น้ำเปี่ยนยอละปา ทริปป่าฝนจากเวียงจันทน์</Link>
            </div>
          </div>
        </div>
      </section>

      <LineCta title="วางแผนไหว้วัดสีเมืองและเที่ยวเวียงจันทน์" description="ส่งวันเดินทาง จำนวนคน จุดรับ และจุดที่อยากแวะ เพื่อให้ทีมตรวจรถและยืนยันราคา" />
    </article>
  );
}
