import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import LineCta from "@/components/LineCta";
import { SITE } from "@/data/site";

const ARTICLE_PATH = "/articles/review-one-day-trip-vientiane-2500";
const TITLE = "รีวิวเที่ยวเหมาเวียงจันทน์ 1 วัน 2,500 บาท กับรถตู้ HUGLAO: ลูกค้าเลือกเส้นทางเอง ปรับได้ตามใจ";
const META_TITLE = "รีวิวเที่ยวเหมาเวียงจันทน์ 1 วัน 2,500 บาท รถตู้ HUGLAO ปรับแผนได้เอง";
const DESCRIPTION =
  "รีวิวลูกค้าเที่ยวเหมาเวียงจันทน์ 1 วันกับรถตู้ HUGLAO โปรโมชั่น 2,500 บาท ตั้งแต่รับหน้าด่านท่านาแล้ง วัดสีเมือง วัดสีสะเกด ตลาดเช้า ธาตุดำ ประตูชัย พระธาตุหลวง ถึง Trick Art Museum พร้อมตารางเวลาจริงและวิธีปรับแผนตามใจ";
const PUBLISHED = "2026-10-11";
const PUBLISHED_TH = "11 ตุลาคม 2569";
const COVER = "/assets/review-oneday-cover.webp";

export const metadata: Metadata = {
  title: META_TITLE,
  description: DESCRIPTION,
  keywords: [
    "เที่ยวเหมาเวียงจันทน์ 1 วัน",
    "เหมารถตู้เวียงจันทน์",
    "เที่ยวเวียงจันทน์ 1 วัน",
    "one day trip เวียงจันทน์",
    "เที่ยวลาว 1 วัน 2500",
    "รีวิวเที่ยวเวียงจันทน์",
    "รถตู้เที่ยวลาว",
    "แพ็กเกจเที่ยวเวียงจันทน์",
    "เที่ยวลาวจากหนองคาย",
  ],
  alternates: { canonical: `${ARTICLE_PATH}/` },
  openGraph: {
    title: META_TITLE,
    description: DESCRIPTION,
    url: `${ARTICLE_PATH}/`,
    type: "article",
    images: [{ url: COVER, width: 1672, height: 941 }],
  },
};

type Stop = {
  time: string;
  title: string;
  body: string[];
  tip?: string;
  link?: { href: string; label: string };
  mapUrl?: string;
  photo?: { src: string; alt: string; caption: string; landscape?: boolean };
};

const STOPS: Stop[] = [
  {
    time: "08:00 น.",
    title: "รับหน้าด่านท่านาแล้ง หลังผ่านตรวจคนเข้าเมือง",
    body: [
      "ทริปเริ่มเมื่อทุกคนข้ามสะพานมิตรภาพไทย–ลาว แห่งที่ 1 และผ่านการตรวจคนเข้าเมืองเรียบร้อยแล้ว คนขับของ HUGLAO รอรับที่จุดนัดหมายหน้าด่านฝั่งลาว ช่วยจัดที่นั่งและกระเป๋า ไม่ต้องหารถเองหรือต่อราคากับใคร",
      "กลุ่มนี้มีหลายวัยตั้งแต่เด็กไปจนถึงผู้สูงอายุ รถตู้จึงเป็นตัวเลือกที่ลงตัว ทุกคนนั่งรถคันเดียวกัน ไม่แยกขบวน",
    ],
    tip: "ข้ามด่านด้วยบัตรผ่านแดนได้ถ้าเที่ยวเฉพาะนครหลวงเวียงจันทน์ ดูเงื่อนไขในบทความด้านล่าง",
    link: { href: "/articles/border-pass-vs-passport-laos", label: "บัตรผ่านแดนหรือพาสปอร์ต ใช้อะไรดี →" },
    photo: {
      src: "/assets/review-oneday-van-group.webp",
      alt: "ลูกค้ากลุ่มครอบครัวยืนถ่ายรูปหมู่หน้ารถตู้ HUGLAO พร้อมถุงของฝากและกรอบรูป",
      caption: "ภาพหมู่หน้ารถตู้ HUGLAO ลูกค้าตั้งแต่เด็กถึงคุณยาย เที่ยวด้วยกันได้ในคันเดียว",
      landscape: true,
    },
  },
  {
    time: "08:30–09:15 น.",
    title: "อาหารเช้าที่ร้านสุมุนทา สาลาคำ",
    body: [
      "จุดแรกคืออิ่มท้องก่อน ลูกค้าเลือกร้านอาหารเช้านี้เอง ทีมงานแค่พาไป จะนั่งนานหรือรีบกินก็ปรับได้ตามจังหวะของกลุ่ม",
    ],
    mapUrl: "https://maps.app.goo.gl/4urgAzH2Q39KQLuu7",
  },
  {
    time: "09:15–10:15 น.",
    title: "เข้าเมือง ไหว้พระวัดสีเมือง",
    body: [
      "วัดสีเมืองเป็นวัดหลักเมืองของเวียงจันทน์ คนท้องถิ่นและนักท่องเที่ยวนิยมมาไหว้ขอพรเรื่องการงาน กลุ่มนี้ใช้เวลาไหว้และเดินชมประมาณหนึ่งชั่วโมง",
    ],
    link: { href: "/articles/wat-si-muang-vientiane", label: "อ่านรีวิววัดสีเมืองฉบับเต็ม →" },
  },
  {
    time: "10:15–11:00 น.",
    title: "ชมวัดสีสะเกด",
    body: [
      "วัดสีสะเกดสร้างในปี ค.ศ. 1818 และเป็นหนึ่งในวัดเก่าแก่ที่ยังคงสภาพอยู่ในเวียงจันทน์ ภายในมีช่องผนังและพระพุทธรูปเล็กจำนวนมาก เหมาะกับการเดินช้า ๆ ชมสถาปัตยกรรม",
    ],
  },
  {
    time: "11:00–12:00 น.",
    title: "เดินตลาดเช้า เลือกซื้อของฝาก",
    body: [
      "ช่วงนี้ลูกค้าแยกย้ายเลือกซื้อของได้อิสระ ทั้งผ้า ของที่ระลึก และขนม ใครอยากอยู่นานขึ้นก็บอกคนขับได้เลย ตารางช่วงถัดไปเลื่อนตามให้",
    ],
    tip: "ตลาดส่วนใหญ่รับเงินบาทและเงินกีบ ควรเตรียมเงินสดย่อยและต่อราคาด้วยรอยยิ้ม",
  },
  {
    time: "12:00–13:00 น.",
    title: "อาหารกลางวันที่เฝ่อแซ่บ",
    body: [
      "มื้อกลางวันเลือกเป็นร้านเฝอ ก๋วยเตี๋ยวเวียดนามสไตล์ลาวที่กินง่ายสำหรับทุกวัย ถ้าลูกค้าอยากเปลี่ยนเป็นร้านอาหารไทย อาหารลาว หรือร้านที่เคยดูไว้ ก็เปลี่ยนได้ทันที",
    ],
  },
  {
    time: "13:00–14:00 น.",
    title: "พักดื่มกาแฟและถ่ายรูปที่ Hichillico Café ตรงธาตุดำ",
    body: [
      "หลังมื้อกลางวัน กลุ่มนี้แวะนั่งพักในคาเฟ่สวนร่มรื่นใกล้ธาตุดำ (That Dam) สถูปอิฐเก่าแก่กลางวงเวียน ตามความเชื่อท้องถิ่นเล่าว่ามีพญานาคเจ็ดเศียรปกป้องเมือง ถ่ายรูปมุมเล็ก ๆ ได้สวย รถจอดรอได้ ไม่ต้องรีบ",
    ],
    photo: {
      src: "/assets/review-oneday-cafe.webp",
      alt: "ลูกค้านั่งพักในคาเฟ่สวนร่มรื่น Hichillico Café ใกล้ธาตุดำ เวียงจันทน์ ใต้ไฟประดับ",
      caption: "นั่งพักกลางวันในคาเฟ่สวน ชาร์จแบตและเก็บโมเมนต์",
    },
  },
  {
    time: "14:00–15:00 น.",
    title: "เที่ยวประตูชัย เดินชมและถ่ายรูป",
    body: [
      "ประตูชัย (Patuxai) อนุสาวรีย์ที่สร้างเพื่อระลึกถึงผู้เสียสละในการต่อสู้เพื่อเอกราช หน้าตาคล้ายประตูชัยที่ปารีสแต่ประดับลายลาว ลานด้านหน้ากว้าง เหมาะกับถ่ายรูปหมู่ กลุ่มนี้สนุกกับการโพสท่าถ่ายรูปรวมกันหลายชุด",
    ],
    photo: {
      src: "/assets/review-oneday-patuxai-dance.webp",
      alt: "ลูกค้าสี่คนโพสท่าสนุก ๆ หน้าประตูชัย เวียงจันทน์ ภายใต้ท้องฟ้าสีฟ้า",
      caption: "เที่ยวด้วยกันสนุกกว่า โพสท่าหน้าประตูชัย",
    },
  },
  {
    time: "15:00–16:00 น.",
    title: "ไหว้พระและชมพระธาตุหลวง",
    body: [
      "พระธาตุหลวง (Pha That Luang) เป็นสถูปทองคำที่ถือเป็นสัญลักษณ์ของลาว ผู้เดินทางไหว้ขอพรกันที่ลานด้านหน้า แล้วเดินชมระเบียงคดรอบองค์พระธาตุ ใช้เวลาไม่ต้องเร่ง เพราะตารางตั้งใจเว้นเวลาไว้ให้ไหว้พระอย่างสบายใจ",
    ],
    tip: "แต่งกายสุภาพ ปิดไหล่และเข่า ถอดรองเท้าก่อนเข้าอาคารตามป้ายของวัด",
    photo: {
      src: "/assets/review-oneday-that-luang-pray.webp",
      alt: "ลูกค้ากลุ่มครอบครัวนั่งและยืนพนมมือไหว้หน้าพระธาตุหลวง เวียงจันทน์",
      caption: "พาคนที่รักมาไหว้พระธาตุหลวง ทั้งครอบครัวพนมมือพร้อมกัน",
    },
  },
  {
    time: "16:00–17:00 น.",
    title: "ITECC Mall และ Trick Art Museum ชั้น 6",
    body: [
      "ปิดวันด้วยกิจกรรมในร่ม พิพิธภัณฑ์ภาพลวงตา 3 มิติ (Trick Art Museum) ที่ชั้น 6 ของห้าง ITECC Mall เหมาะกับเด็กและวัยรุ่น ได้ภาพสนุก ๆ ติดมือกลับบ้าน อากาศเย็นสบายหลังเดินกลางแดดทั้งวัน",
    ],
  },
  {
    time: "17:00–18:00 น.",
    title: "เดินทางกลับด่าน ส่งหน้าด่านท่านาแล้งฝั่งลาว",
    body: [
      "รถออกจากตัวเมืองตอน 17:00 น. และถึงหน้าด่านท่านาแล้งฝั่งลาวประมาณ 17:45 น. ส่งลูกค้าเรียบร้อยก่อนเวลา 18:00 น. เดินเข้าด่านเพื่อตรวจคนเข้าเมืองกลับฝั่งไทยต่อได้ทันที",
    ],
  },
];

const WALK_PHOTO = {
  src: "/assets/review-oneday-that-luang-walk.webp",
  alt: "ลูกค้าสามคนเดินเล่นสบาย ๆ บนสนามหญ้าในบริเวณพระธาตุหลวง เวียงจันทน์",
  caption: "ไม่ต้องรีบ ค่อย ๆ เดินเที่ยวได้ตามจังหวะของตัวเอง",
};

const CUSTOM_IDEAS = [
  { t: "สลับลำดับสถานที่", d: "อยากไปประตูชัยตอนเช้าเพื่อเลี่ยงแดด หรือเก็บพระธาตุหลวงไว้ตอนเย็น ก็สลับได้" },
  { t: "เพิ่มหรือตัดจุดเที่ยว", d: "ชอบช้อปปิ้งก็ตัดวัดเพิ่มเวลาตลาด ชอบวัดก็เพิ่มหอพระแก้วหรือพุทธอุทยาน (ตรวจระยะเวลากับทีมงานก่อน)" },
  { t: "เลือกร้านอาหารเอง", d: "ร้านในตารางเป็นเพียงตัวอย่างจากทริปนี้ ลูกค้าจะเปลี่ยนเป็นร้านที่ชอบหรือที่เล็งไว้ก็ได้" },
  { t: "ปรับตามวัยของกลุ่ม", d: "มีผู้สูงอายุหรือเด็กเล็กก็พักยาวขึ้น ลดการเดินไกล หรือเพิ่มเวลานั่งในร้านแอร์" },
  { t: "ขยับเวลาเริ่มและเลิก", d: "แจ้งเวลาข้ามด่านล่วงหน้า ทีมงานจะวางตารางใหม่ให้พอดีกับเวลากลับ" },
] as const;

const FAQS = [
  {
    q: "โปรโมชั่นเหมาเวียงจันทน์ 1 วัน 2,500 บาท คิดอย่างไร?",
    a: "ราคา 2,500 บาท เป็นราคาโปรโมชั่นเหมารถตู้ HUGLAO เที่ยวนครหลวงเวียงจันทน์ 1 วัน (คิดเป็นราคาต่อคัน ไม่ใช่ต่อคน) รายละเอียดที่รวมและไม่รวม เช่น ค่าอาหาร ค่าเข้าชม และจำนวนผู้โดยสารสูงสุด ทีมงานจะยืนยันให้ชัดเจนทาง LINE ก่อนจอง",
  },
  {
    q: "ต้องเที่ยวตามโปรแกรมในบทความทั้งหมดไหม?",
    a: "ไม่ต้อง โปรแกรมในบทความเป็นตัวอย่างจากทริปจริงของลูกค้ากลุ่มหนึ่ง ลูกค้าเลือกจุดเที่ยว ร้านอาหาร ลำดับ และเวลาเองได้ทั้งหมด HUGLAO ปรับให้ตามใจ",
  },
  {
    q: "เริ่มทริปที่ไหน และจบที่ไหน?",
    a: "ทริปนี้เริ่มรับหน้าด่านท่านาแล้งฝั่งลาวหลังผ่านตรวจคนเข้าเมืองแล้ว (เริ่มประมาณ 08:00 น.) และส่งกลับที่หน้าด่านเดิมก่อน 18:00 น. เวลาและจุดนัดหมายแจ้งความต้องการกับทีมงานได้",
  },
  {
    q: "ข้ามด่านหนองคายต้องใช้อะไรบ้าง?",
    a: "ถ้าเที่ยวเฉพาะนครหลวงเวียงจันทน์ใช้บัตรผ่านแดนชั่วคราวที่ทำจากบัตรประชาชนได้ ครั้งละไม่เกิน 3 วัน หรือใช้พาสปอร์ตก็ได้ HUGLAO มีบริการทำบัตรผ่านแดนให้ด้วย",
  },
  {
    q: "จองอย่างไร และควรจองล่วงหน้านานแค่ไหน?",
    a: "ส่งวันเดินทาง จำนวนผู้เดินทาง เวลาข้ามด่าน และจุดที่อยากไปผ่าน LINE ของ HUGLAO ทีมงานจะตรวจรถว่างและยืนยันราคาให้ ควรจองล่วงหน้าโดยเฉพาะช่วงวันหยุดยาว",
  },
] as const;

function Fig({ photo }: { photo: NonNullable<Stop["photo"]> }) {
  return (
    <figure className="overflow-hidden rounded-[22px] border border-[#ddd4c1] bg-[#f7f3e9]">
      <div className={`relative ${photo.landscape ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
        <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 92vw, 340px" className="object-cover" />
      </div>
      <figcaption className="px-4 py-3 text-[.82rem] leading-6 text-[#687169]">{photo.caption}</figcaption>
    </figure>
  );
}

export default function ReviewOneDayTripPage() {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "เที่ยวเหมาเวียงจันทน์ 1 วัน กับรถตู้ HUGLAO",
      description: DESCRIPTION,
      touristType: "กลุ่มครอบครัวและเพื่อน",
      provider: { "@type": "Organization", name: SITE.legalName, url: SITE.website },
      offers: { "@type": "Offer", price: "2500", priceCurrency: "THB", url },
      itinerary: {
        "@type": "ItemList",
        itemListElement: STOPS.map((stop, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${stop.time} ${stop.title}`,
        })),
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
          { name: "รีวิวเที่ยวเหมาเวียงจันทน์ 1 วัน", href: `${ARTICLE_PATH}/` },
        ]}
      />
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      <header className="bg-[#071d13] pb-[clamp(36px,5vw,64px)] pt-[clamp(104px,13vw,160px)] text-white">
        <div className="hl-shell">
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap gap-2 text-xs text-[#aebcb3]">
            <Link href="/" className="hover:text-white">หน้าแรก</Link><span>/</span>
            <Link href="/articles" className="hover:text-white">บทความ</Link><span>/</span>
            <span className="text-[#efd276]">รีวิวเที่ยวเหมาเวียงจันทน์ 1 วัน</span>
          </nav>
          <span className="hl-kicker !text-[#efd276]">รีวิวลูกค้าจริง · One Day Trip เวียงจันทน์</span>
          <h1 className="mt-4 max-w-[980px] font-serif-th text-[clamp(1.9rem,4.6vw,3.7rem)] font-bold leading-[1.18]">
            รีวิวเที่ยวเหมาเวียงจันทน์ 1 วัน 2,500 บาท กับรถตู้ HUGLAO
            <span className="mt-3 block text-[.5em] font-semibold leading-snug text-[#efd276]">ลูกค้าเลือกเส้นทางเอง ปรับได้ตามใจ</span>
          </h1>
          <p className="mt-5 max-w-[760px] text-[1.02rem] leading-8 text-[#c8d3cc]">
            เล่าจากทริปจริงของลูกค้ากลุ่มครอบครัว ตั้งแต่รับหน้าด่านท่านาแล้ง ไหว้พระ ตลาดเช้า คาเฟ่ ประตูชัย พระธาตุหลวง จนถึงส่งกลับด่านตอนเย็น พร้อมวิธีปรับโปรแกรมให้เป็นทริปของคุณเอง
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#aebcb3]">
            <span>โดย ทีมงาน {SITE.name}</span><span>•</span>
            <time dateTime={PUBLISHED}>{PUBLISHED_TH}</time><span>•</span>
            <span>อ่านประมาณ 7 นาที</span>
          </div>
        </div>
      </header>

      <div className="bg-[#071d13] pb-[clamp(36px,5vw,64px)]">
        <div className="hl-shell">
          <div className="relative mx-auto aspect-[16/9] max-w-[1100px] overflow-hidden rounded-[22px] border border-white/10 bg-[#0a2d20] shadow-[0_28px_80px_rgba(0,0,0,.28)] sm:rounded-[28px]">
            <Image
              src={COVER}
              alt="รีวิวเที่ยวเหมาเวียงจันทน์ 1 วัน 2,500 บาท กับรถตู้ HUGLAO ภาพรวมประตูชัย พระธาตุหลวง และลูกค้ากลุ่มครอบครัวหน้ารถตู้"
              fill
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover"
              preload
            />
          </div>
        </div>
      </div>

      <div className="hl-shell grid gap-12 py-[clamp(48px,7vw,96px)] lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 max-w-[820px]">
          <p className="font-serif-th text-[clamp(1.3rem,2.8vw,1.9rem)] font-bold leading-relaxed text-[#0a2d20]">
            สรุปสั้น ๆ: เหมารถตู้เที่ยวเวียงจันทน์ 1 วันในราคา 2,500 บาท เที่ยวได้หลายจุดตั้งแต่เช้าจนเย็น และที่สำคัญคือ ลูกค้าเป็นคนกำหนดเองทั้งหมด
          </p>

          <section className="mt-8 overflow-hidden rounded-[22px] border border-[#ddd4c1] bg-[#f7f3e9]" aria-label="ข้อมูลทริปโดยสรุป">
            <dl className="grid divide-y divide-[#e5dece] text-sm sm:grid-cols-2 sm:divide-y-0">
              {[
                ["ราคาโปรโมชั่น", "2,500 บาท/คัน (เหมารถตู้ 1 วัน)"],
                ["เวลาทริป", "08:00–18:00 น."],
                ["จุดรับ–ส่ง", "หน้าด่านท่านาแล้งฝั่งลาว"],
                ["พื้นที่เที่ยว", "นครหลวงเวียงจันทน์"],
              ].map(([k, v]) => (
                <div key={k} className="px-5 py-4 sm:border-b sm:border-[#e5dece] sm:[&:nth-last-child(-n+2)]:border-b-0">
                  <dt className="text-xs font-bold uppercase tracking-[.12em] text-[#9b711c]">{k}</dt>
                  <dd className="mt-1 font-semibold text-[#0a2d20]">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-12">
            <span className="hl-kicker">ภาพรวม</span>
            <h2 className="mt-4 font-serif-th text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-tight text-[#071d13]">เที่ยวเวียงจันทน์ 1 วัน ต้องวางแผนอย่างไร</h2>
            <div className="mt-6 space-y-5 text-[1.04rem] leading-8 text-[#4f5d54]">
              <p>
                คนที่ข้ามด่านหนองคายมาเที่ยวเวียงจันทน์แบบไปเช้าเย็นกลับ มักมีเวลาไม่มาก และไม่อยากเสียเวลาหารถ ต่อราคา หรือเปิดแผนที่ตลอดทั้งวัน การเหมารถตู้พร้อมคนขับช่วยให้เที่ยวได้หลายจุดต่อเนื่องในคันเดียว โดยเฉพาะกลุ่มครอบครัวที่มีทั้งเด็กและผู้สูงอายุ
              </p>
              <p>
                บทความนี้เล่าทริปจริงของลูกค้ากลุ่มหนึ่งที่เลือกใช้โปรโมชั่นเหมาเวียงจันทน์ 1 วัน 2,500 บาทกับ HUGLAO โปรแกรมด้านล่างเป็น<strong>ตัวอย่างที่ลูกค้าเลือกเอง</strong> เราบันทึกไว้เป็นไอเดียให้ผู้อ่านนำไปปรับใช้ ไม่ใช่ตารางตายตัว
              </p>
            </div>
          </section>

          <section className="mt-14">
            <span className="hl-kicker">ตารางเวลาทริปจริง</span>
            <h2 className="mt-4 font-serif-th text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-tight text-[#071d13]">โปรแกรมเที่ยวเวียงจันทน์ 1 วัน ตั้งแต่ 08:00 ถึง 18:00 น.</h2>

            <ol className="mt-8 space-y-0">
              {STOPS.map((stop, index) => (
                <li key={stop.time} className="relative pb-10 pl-10 last:pb-0 sm:pl-14">
                  <span aria-hidden className="absolute left-[15px] top-8 bottom-0 w-px bg-[#d8cfba] last:hidden sm:left-[19px]" />
                  <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0a2d20] text-xs font-bold text-[#efd276] sm:h-10 sm:w-10 sm:text-sm">
                    {index + 1}
                  </span>
                  <div className={stop.photo ? "grid gap-5 md:grid-cols-[minmax(0,1fr)_280px] md:items-start" : ""}>
                    <div>
                      <span className="inline-block rounded-full bg-[#f4ecd5] px-3 py-1 text-xs font-bold text-[#8a6416]">{stop.time}</span>
                      <h3 className="mt-3 font-serif-th text-[1.3rem] font-bold leading-snug text-[#0a2d20] sm:text-[1.5rem]">{stop.title}</h3>
                      <div className="mt-3 space-y-3 leading-8 text-[#4f5d54]">
                        {stop.body.map((p) => <p key={p}>{p}</p>)}
                      </div>
                      {stop.tip && (
                        <p className="mt-4 rounded-2xl border border-[#e3d5ac] bg-[#fbf6e6] px-4 py-3 text-sm leading-7 text-[#6b5314]">
                          <strong>เคล็ดลับ:</strong> {stop.tip}
                        </p>
                      )}
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
                        {stop.mapUrl && (
                          <a href={stop.mapUrl} target="_blank" rel="noopener noreferrer" className="text-[#9b711c] hover:text-[#0a2d20]">เปิดแผนที่ร้าน →</a>
                        )}
                        {stop.link && (
                          <Link href={stop.link.href} className="text-[#0a2d20] hover:text-[#9b711c]">{stop.link.label}</Link>
                        )}
                      </div>
                    </div>
                    {stop.photo && <div className="mx-auto w-full min-w-0 max-w-[340px] md:max-w-none"><Fig photo={stop.photo} /></div>}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16 rounded-[28px] bg-[#0a2d20] p-[clamp(24px,5vw,44px)] text-white">
            <span className="hl-kicker !text-[#efd276]">จุดเด่นของ HUGLAO</span>
            <h2 className="mt-4 font-serif-th text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-tight">ลูกค้าเป็นคนกำหนด เราจัดให้ตามใจ</h2>
            <p className="mt-5 leading-8 text-[#c8d3cc]">
              โปรแกรมด้านบนไม่ใช่แพ็กเกจตายตัว ฮักลาวบริการจัดให้ตามใจลูกค้า ทุกจุดแวะ ทุกมื้อ และทุกช่วงเวลาปรับเปลี่ยนได้ ก่อนเดินทางหรือระหว่างวันก็ได้ ตัวอย่างที่ปรับได้
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {CUSTOM_IDEAS.map((item) => (
                <li key={item.t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h3 className="font-bold text-[#efd276]">{item.t}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#c8d3cc]">{item.d}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="mx-auto mt-12 max-w-[420px]">
            <Fig photo={WALK_PHOTO} />
          </div>

          <section className="mt-14">
            <span className="hl-kicker">ข้อควรรู้ก่อนจอง</span>
            <h2 className="mt-4 font-serif-th text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-tight text-[#071d13]">เตรียมตัวอย่างไรให้ทริป 1 วันราบรื่น</h2>
            <ul className="mt-6 space-y-4 leading-8 text-[#4f5d54]">
              <li><strong className="text-[#0a2d20]">เอกสารข้ามด่าน:</strong> ใช้บัตรผ่านแดนชั่วคราวหรือพาสปอร์ตก็ได้ ถ้าเที่ยวเฉพาะนครหลวงเวียงจันทน์ และเด็กต้องเตรียมสำเนาสูติบัตรตามข้อกำหนด</li>
              <li><strong className="text-[#0a2d20]">เวลาเปิด–ปิดสถานที่:</strong> วัดและสถานที่บางแห่งมีเวลาเปิดต่างกันหรือปิดพักกลางวัน ทีมงานจะช่วยตรวจและจัดลำดับให้เหมาะกับวันที่เดินทาง</li>
              <li><strong className="text-[#0a2d20]">ชุดไหว้พระ:</strong> ควรสวมเสื้อสุภาพ ปิดไหล่และเข่า เพราะทริปมีทั้งวัดและพระธาตุ</li>
              <li><strong className="text-[#0a2d20]">เงินสด:</strong> ตลาดและร้านอาหารบางแห่งรับเงินบาท บางแห่งรับกีบ ควรเตรียมเงินสดไว้ส่วนหนึ่ง</li>
              <li><strong className="text-[#0a2d20]">รายการที่รวมในราคา:</strong> ส่งจำนวนผู้เดินทางและแผนที่ต้องการให้ทีมงานทาง LINE เพื่อยืนยันสิ่งที่รวมและไม่รวมในราคา 2,500 บาท ก่อนชำระมัดจำ</li>
            </ul>
          </section>

          <section className="mt-14 rounded-[24px] border border-[#ddd4c1] bg-[#f7f3e9] p-6 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-[.16em] text-[#9b711c]">เกี่ยวกับผู้เขียน</span>
            <h2 className="mt-3 font-serif-th text-xl font-bold text-[#0a2d20]">ทีมงาน HUGLAO ผู้ให้บริการรถพร้อมคนขับในเวียงจันทน์</h2>
            <p className="mt-3 leading-8 text-[#4f5d54]">
              บทความนี้เขียนโดยทีมงาน {SITE.name} ผู้ให้บริการรถตู้ รถเก๋ง และ SUV พร้อมคนขับ รับ–ส่งหน้าด่านท่านาแล้ง และเหมาเที่ยวในนครหลวงเวียงจันทน์ ข้อมูลเส้นทางและเวลาในบทความมาจากทริปที่ทีมงานดูแลจริง ภาพประกอบทั้งหมดเป็นภาพจากทริปนี้
            </p>
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

          <section className="mt-14 rounded-[28px] border border-[#e3d5ac] bg-gradient-to-br from-[#fbf6e6] to-[#f4e9c4] p-[clamp(24px,5vw,44px)]">
            <span className="text-xs font-bold uppercase tracking-[.16em] text-[#9b711c]">โปรโมชั่น</span>
            <h2 className="mt-3 font-serif-th text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-tight text-[#071d13]">เหมาเที่ยวเวียงจันทน์ 1 วัน 2,500 บาท</h2>
            <p className="mt-4 leading-8 text-[#4f5d54]">
              อยากเที่ยวเวียงจันทน์แบบสบาย ๆ ไม่ต้องรีบ เหมารถตู้ HUGLAO วันเดียวคุ้มทั้งครอบครัวและกลุ่มเพื่อน เลือกจุดเที่ยว ร้านอาหาร และเวลาได้เอง ส่งวันเดินทางและจำนวนคนทาง LINE ทีมงานจะวางแผนและยืนยันรถให้
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary min-h-12 px-7">จองเหมา 2,500 บาท ผ่าน LINE</a>
              <Link href="/van-laos" className="inline-flex min-h-12 items-center rounded-full border border-[#c8941f] px-6 text-sm font-bold text-[#0a2d20] hover:bg-white/60">ดูรถตู้เที่ยวลาว</Link>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-[24px] border border-[#ddd4c1] bg-[#f7f3e9] p-6 lg:sticky lg:top-28">
          <span className="text-xs font-bold uppercase tracking-[.16em] text-[#9b711c]">โปรโมชั่น 1 วัน</span>
          <p className="mt-3 font-serif-th text-3xl font-bold text-[#0a2d20]">2,500 บาท</p>
          <p className="mt-1 text-sm text-[#59645d]">เหมารถตู้เที่ยวเวียงจันทน์ 1 วัน</p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#59645d]">
            <li>• เลือกจุดเที่ยวเอง ปรับได้ตามใจ</li>
            <li>• รับ–ส่งหน้าด่านท่านาแล้ง</li>
            <li>• เหมาะกับครอบครัวและกลุ่มเพื่อน</li>
          </ul>
          <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-6 min-h-12 w-full px-6">จองผ่าน LINE</a>
          <Link href="/routes/vientiane-city" className="mt-5 block text-sm font-bold text-[#0a2d20] hover:text-[#9b711c]">เส้นทางเที่ยวในนครหลวงเวียงจันทน์ →</Link>
          <Link href="/articles/border-pass-vs-passport-laos" className="mt-3 block text-sm font-bold text-[#0a2d20] hover:text-[#9b711c]">บัตรผ่านแดนหรือพาสปอร์ต →</Link>
          <Link href="/vientiane/" className="mt-3 block text-sm font-bold text-[#0a2d20] hover:text-[#9b711c]">เช่ารถตู้เวียงจันทน์พร้อมคนขับ →</Link>
        </aside>
      </div>

      <LineCta
        title="อยากได้ทริปเวียงจันทน์ 1 วันแบบนี้ ส่งแผนมาได้เลย"
        description="บอกวันเดินทาง จำนวนคน เวลาข้ามด่าน และจุดที่อยากไป ทีม HUGLAO จะตรวจรถและจัดโปรแกรมตามใจคุณ"
      />
    </article>
  );
}
