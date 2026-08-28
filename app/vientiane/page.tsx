import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PublishedPriceTable from "@/components/PublishedPriceTable";
import { getMedia } from "@/data/media";
import { CURRENT_PRICE_ROWS } from "@/data/pricing";
import { PICKUP_POINTS, ROUTE_GROUPS, SITE, VEHICLE_GROUPS } from "@/data/site";

const PAGE_URL = `${SITE.website}/vientiane/`;
const TITLE = "เช่ารถตู้เวียงจันทร์ พร้อมคนขับ | รถตู้เวียงจันทร์ HUGLAO";
const DESCRIPTION =
  "เช่ารถเวียงจันทร์พร้อมคนขับ มีรถเก๋ง SUV MPV และรถตู้ รับที่ด่านท่านาแล้งฝั่งลาว สนามบินวัตไตและสถานีรถไฟ ดูราคาและตรวจรถว่างกับ HUGLAO";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "เช่ารถตู้เวียงจันทร์ พร้อมคนขับ | HUGLAO",
    description:
      "บริการจัดหาและประสานรถพร้อมคนขับในเวียงจันทร์ เลือกได้ทั้งรถเก๋ง SUV MPV และรถตู้ พร้อมตรวจรถและราคาก่อนยืนยันการจอง",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: getMedia("vehicleVan").src,
        alt: getMedia("vehicleVan").alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "เช่ารถตู้เวียงจันทร์ พร้อมคนขับ | HUGLAO",
    description:
      "ตรวจประเภทรถ ราคา จุดรับ และรถพร้อมคนขับในเวียงจันทร์ก่อนยืนยันการจอง",
    images: [getMedia("vehicleVan").src],
  },
};

const PICKUP_LOCATIONS = [
  ...PICKUP_POINTS,
  {
    slug: "vientiane-hotel",
    name: "โรงแรมหรือจุดนัดหมายในนครหลวงเวียงจันทน์",
    detail: "ระบุชื่อที่พักและตำแหน่งให้ทีมงานตรวจสอบและยืนยันจุดพบรถก่อนเดินทาง",
    mediaId: null,
  },
] as const;

const FEATURED_ROUTE_SLUGS = [
  "vientiane-city",
  "vientiane-nam-ngum",
  "vientiane-vang-vieng",
  "vientiane-muang-feuang",
  "vientiane-nam-pien-yorla-pa",
] as const;

const BOOKING_STEPS = [
  "ส่งวันเดินทาง จำนวนผู้โดยสาร สัมภาระ จุดรับ และปลายทาง",
  "HUGLAO ตรวจรถพาร์ตเนอร์ที่เหมาะสม",
  "ส่งรายละเอียดรถ ราคา สิ่งที่รวม และเงื่อนไขให้ตรวจสอบ",
  "ลูกค้ายืนยันรายละเอียดและชำระมัดจำตามใบเสนอราคา",
  "พบรถที่จุดนัดหมายฝั่งลาวและเดินทางตามแผนที่ตกลง",
] as const;

const FAQS = [
  {
    question: "HUGLAO มีรถเช่าขับเองหรือไม่?",
    answer:
      "ไม่มี หน้านี้เป็นบริการจัดหาและประสานรถพร้อมคนขับจากเครือข่ายพาร์ตเนอร์ โดยลูกค้าเป็นผู้กำหนดปลายทาง เวลา และจุดแวะของทริป",
  },
  {
    question: "รถตู้เวียงจันทร์รับผู้โดยสารได้กี่คน?",
    answer:
      "จำนวนที่นั่งและพื้นที่สัมภาระต่างกันตามรถที่ว่าง กรุณาส่งจำนวนผู้โดยสาร เด็ก ผู้สูงอายุ และกระเป๋า เพื่อให้ทีมงานตรวจรถที่เหมาะสมก่อนเสนอราคา",
  },
  {
    question: "จุดรับรถอยู่ที่ไหน?",
    answer:
      "จุดรับหลักอยู่ฝั่งลาว ได้แก่ จุดนัดหมายด่านท่านาแล้งหลังผ่านขั้นตอนตรวจคนเข้าเมือง สนามบินวัตไต สถานีรถไฟคำสะหวาด สถานีรถไฟเวียงจันทร์ และโรงแรมหรือจุดนัดหมายในนครหลวงเวียงจันทน์ที่ตกลงกัน",
  },
  {
    question: "ราคาเช่ารถรวมอะไรบ้าง?",
    answer:
      "ตารางราคากลางระบุค่าคนขับและน้ำมัน ส่วนค่าใช้จ่ายและเงื่อนไขอื่นจะสรุปในข้อเสนอให้ตรวจสอบตามเส้นทาง ระยะเวลา และรายละเอียดทริปจริง",
  },
  {
    question: "ต้องส่งข้อมูลอะไรเพื่อขอราคา?",
    answer:
      "ส่งวันและเวลารับ ระยะเวลาบริการ จำนวนผู้โดยสาร จำนวนและขนาดสัมภาระ จุดรับ ปลายทาง จุดแวะ และประเภทรถที่สนใจผ่าน LINE OA",
  },
  {
    question: "สามารถเปลี่ยนเส้นทางหรือจุดแวะได้หรือไม่?",
    answer:
      "ได้ ลูกค้าเป็นผู้กำหนดแผนทริป กรุณาแจ้งการเปลี่ยนแปลงเพื่อให้ทีมงานตรวจเวลา ระยะทาง รถที่ว่าง และค่าใช้จ่ายก่อนยืนยันรายละเอียดใหม่",
  },
  {
    question: "รถในภาพเป็นรถคันที่จะได้รับหรือไม่?",
    answer:
      "ภาพใช้แสดงประเภทและตัวอย่างรถ รุ่น ปีรถ สี ผังที่นั่ง และรถคันจริงขึ้นอยู่กับรถพาร์ตเนอร์ที่ว่าง ทีมงานจะแจ้งรายละเอียดให้ตรวจสอบก่อนยืนยันการจอง",
  },
  {
    question: "ต้องจองล่วงหน้านานเท่าไร?",
    answer:
      "ระยะเวลาที่ควรจองขึ้นอยู่กับวันเดินทาง เส้นทาง และรถที่ว่าง ส่งรายละเอียดให้ทีมงานตรวจสอบได้ทันที โดยยังไม่ถือว่าเป็นการยืนยันจนกว่าจะได้รับข้อเสนอและชำระมัดจำตามรายการ",
  },
] as const;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "เช่ารถตู้เวียงจันทร์พร้อมคนขับ",
  url: PAGE_URL,
  description: DESCRIPTION,
  serviceType: "บริการจัดหาและประสานรถพร้อมคนขับในเวียงจันทร์",
  provider: { "@id": `${SITE.website}/#organization` },
  areaServed: [
    { "@type": "City", name: "นครหลวงเวียงจันทน์" },
    { "@type": "Country", name: "ลาว" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE.website}/` },
    { "@type": "ListItem", position: 2, name: "เช่ารถเวียงจันทร์", item: PAGE_URL },
  ],
};

export default function VientianeCarRentalPage() {
  const heroMedia = getMedia("vehicleVan");
  const featuredRoutes = ROUTE_GROUPS.filter((route) =>
    FEATURED_ROUTE_SLUGS.includes(route.slug as (typeof FEATURED_ROUTE_SLUGS)[number]),
  );

  return (
    <main>
      {[serviceSchema, faqSchema, breadcrumbSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="relative overflow-hidden bg-[#071d13] pb-[clamp(64px,8vw,100px)] pt-32 text-white sm:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(216,175,74,.16),transparent_45%)]" />
        <div className="hl-shell relative">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#b9c7be]">
            <Link href="/" className="hover:text-[#efd276]">หน้าแรก</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page">เช่ารถเวียงจันทร์</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#efd276]">รถพร้อมคนขับในเวียงจันทน์</p>
              <h1 className="mt-5 font-serif-th text-[clamp(2.6rem,6vw,5.4rem)] font-bold leading-[1.08] tracking-[-.03em] text-[#fffaf0]">
                เช่ารถตู้เวียงจันทร์ พร้อมคนขับสำหรับทริปส่วนตัว
              </h1>
              <p className="mt-6 max-w-[760px] text-lg leading-9 text-[#d5ddd7]">
                HUGLAO ช่วยจัดหาและประสานรถพร้อมคนขับสำหรับผู้ที่กำลังมองหาเช่ารถเวียงจันทร์ เลือกได้ทั้งรถเก๋ง SUV MPV และรถตู้เวียงจันทร์สำหรับครอบครัว กลุ่มเพื่อน และคณะเดินทาง โดยตรวจสอบรายละเอียดรถ ราคา และจุดนัดหมายก่อนยืนยันการจอง
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#d8af4a] px-7 font-bold text-[#092217] transition hover:bg-[#efd276]">
                  ขอราคาผ่าน LINE
                </a>
                <a href="#pricing" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 font-semibold text-white transition hover:bg-white/10">
                  ดูราคาและประเภทรถ
                </a>
              </div>
            </div>
            <figure className="overflow-hidden rounded-[28px] border border-white/10 bg-[#f0eadf] p-3 shadow-[0_28px_80px_rgba(0,0,0,.3)] sm:p-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                <Image src={heroMedia.src} alt={heroMedia.alt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-contain" />
              </div>
              <figcaption className="px-3 pb-2 pt-4 text-xs leading-6 text-[#59645d]">
                ภาพทีมรถตู้ HUGLAO ใช้ประกอบการเลือกประเภทรถ รถคันจริงขึ้นอยู่กับรถพาร์ตเนอร์ที่ว่าง
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white py-[clamp(64px,8vw,104px)]" aria-labelledby="pickup-title">
        <div className="hl-shell">
          <span className="hl-kicker">จุดรับฝั่งลาว</span>
          <h2 id="pickup-title" className="mt-5 max-w-[820px] font-serif-th text-[clamp(2.1rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">จุดรับรถในเวียงจันทร์ที่ตรวจสอบก่อนนัดหมาย</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PICKUP_LOCATIONS.map((point, index) => (
              <article key={point.slug} className="rounded-[22px] border border-[#ddd4c1] bg-[#f7f3e9] p-6">
                <span className="text-xs font-bold text-[#9b711c]">0{index + 1}</span>
                <h3 className="mt-4 font-serif-th text-xl font-bold text-[#0a2d20]">{point.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[#59645d]">{point.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3e9] py-[clamp(64px,8vw,104px)]" aria-labelledby="vehicles-title">
        <div className="hl-shell">
          <span className="hl-kicker">ประเภทรถ</span>
          <h2 id="vehicles-title" className="mt-5 font-serif-th text-[clamp(2.1rem,5vw,4rem)] font-bold text-[#071d13]">เลือกรถพร้อมคนขับให้เหมาะกับคนและสัมภาระ</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {VEHICLE_GROUPS.map((vehicle) => {
              const media = getMedia(vehicle.mediaIds[0]);
              const href = vehicle.slug === "van" ? "/van-laos/" : `/car-with-driver/${vehicle.slug}/`;
              return (
                <Link key={vehicle.slug} href={href} className="group overflow-hidden rounded-[24px] border border-[#ddd4c1] bg-white transition hover:-translate-y-1 hover:border-[#d8af4a]">
                  <div className="relative aspect-[16/10] bg-[#eee9de]">
                    <Image src={media.src} alt={media.alt} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-contain p-2" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif-th text-xl font-bold text-[#0a2d20]">{vehicle.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#59645d]">{vehicle.suitableFor}</p>
                    <span className="mt-5 block text-sm font-bold text-[#9b711c]">ดูรายละเอียดรถ →</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="mt-5 text-xs leading-6 text-[#687169]">ภาพใช้ประกอบการเลือกประเภทรถ รุ่น ปีรถ สี ผังที่นั่ง และพื้นที่สัมภาระต้องตรวจตามรถที่ว่างก่อนยืนยันการจอง</p>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 bg-white py-[clamp(64px,8vw,110px)]" aria-labelledby="pricing-title">
        <div className="hl-shell">
          <span className="hl-kicker">ราคารถในเวียงจันทร์</span>
          <h2 id="pricing-title" className="mt-5 max-w-[900px] font-serif-th text-[clamp(2.1rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">ราคารับ–ส่ง เหมารถเที่ยว และเส้นทางที่เริ่มจากเวียงจันทน์</h2>
          <p className="mb-8 mt-5 max-w-[900px] leading-8 text-[#59645d]">ตารางนี้อ่านจากแหล่งราคากลางเดียวกับหน้ารถและหน้าเส้นทาง แยกเก๋ง/SUV, MPV และรถตู้ในแต่ละรายการ</p>
          <PublishedPriceTable rows={CURRENT_PRICE_ROWS} />
          <p className="mt-6 rounded-[18px] border border-[#d8af4a]/45 bg-[#fffaf0] p-5 text-sm leading-7 text-[#59645d]">
            ราคาต้องตรวจสอบวันเดินทาง รถที่ว่าง จุดรับ ระยะเวลา จำนวนผู้โดยสาร สัมภาระ และรายละเอียดทริปก่อนยืนยันการจอง
          </p>
        </div>
      </section>

      <section className="bg-[#0a2d20] py-[clamp(64px,8vw,108px)] text-white" aria-labelledby="routes-title">
        <div className="hl-shell">
          <span className="hl-kicker !text-[#efd276]">เส้นทางยอดนิยม</span>
          <h2 id="routes-title" className="mt-5 font-serif-th text-[clamp(2.1rem,5vw,4rem)] font-bold">เริ่มจากเวียงจันทน์ แล้วเลือกปลายทางตามแผนของคุณ</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredRoutes.map((route) => (
              <Link key={route.slug} href={`/routes/${route.slug}/`} className="rounded-[22px] border border-white/10 bg-white/[.06] p-6 transition hover:border-[#d8af4a] hover:bg-white/[.09]">
                <h3 className="font-serif-th text-xl font-bold">{route.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[#c8d3cc]">{route.summary}</p>
                <span className="mt-5 block text-sm font-bold text-[#efd276]">ดูเส้นทางและราคา →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3e9] py-[clamp(64px,8vw,104px)]" aria-labelledby="booking-title">
        <div className="hl-shell">
          <span className="hl-kicker">ขั้นตอนการจอง</span>
          <h2 id="booking-title" className="mt-5 font-serif-th text-[clamp(2.1rem,5vw,4rem)] font-bold text-[#071d13]">ตรวจรายละเอียดก่อนยืนยันทุกครั้ง</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {BOOKING_STEPS.map((step, index) => (
              <li key={step} className="rounded-[22px] border border-[#ddd4c1] bg-white p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a2d20] text-xs font-bold text-[#efd276]">{index + 1}</span>
                <p className="mt-4 text-sm font-semibold leading-7 text-[#0a2d20]">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-[clamp(64px,8vw,104px)]" aria-labelledby="trust-title">
        <div className="hl-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="hl-kicker">ข้อมูลผู้ให้บริการ</span>
            <h2 id="trust-title" className="mt-5 font-serif-th text-[clamp(2.1rem,5vw,3.8rem)] font-bold leading-tight text-[#071d13]">ตรวจสอบช่องทางติดต่อ HUGLAO ได้ก่อนส่งข้อมูลทริป</h2>
            <p className="mt-5 leading-8 text-[#59645d]">HUGLAO ทำหน้าที่จัดหาและประสานรถพร้อมคนขับจากเครือข่ายพาร์ตเนอร์ ไม่ได้เป็นเจ้าของรถทั้งหมด และไม่ใช่กรุ๊ปทัวร์</p>
          </div>
          <dl className="overflow-hidden rounded-[24px] border border-[#ddd4c1] bg-[#f7f3e9] divide-y divide-[#ddd4c1]">
            {[
              ["บริษัท", SITE.legalName],
              ["เลขนิติบุคคล", SITE.registrationNumber],
              ["โทรศัพท์", SITE.phoneDisplay],
              ["อีเมล", SITE.email],
              ["LINE OA", SITE.lineUrl],
            ].map(([term, value]) => (
              <div key={term} className="grid gap-1 px-6 py-4 sm:grid-cols-[150px_1fr] sm:gap-6">
                <dt className="text-sm font-bold text-[#0a2d20]">{term}</dt>
                <dd className="break-words text-sm text-[#59645d]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[#f7f3e9] py-[clamp(64px,8vw,104px)]" aria-labelledby="faq-title">
        <div className="hl-shell max-w-[980px]">
          <span className="hl-kicker">คำถามที่พบบ่อย</span>
          <h2 id="faq-title" className="mt-5 font-serif-th text-[clamp(2.1rem,5vw,4rem)] font-bold text-[#071d13]">ก่อนขอราคาเช่ารถเวียงจันทร์</h2>
          <div className="mt-9 divide-y divide-[#ddd4c1] border-y border-[#ddd4c1]">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-semibold text-[#0a2d20]">
                  {faq.question}
                  <span aria-hidden="true" className="text-2xl font-light text-[#9b711c] transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[880px] pb-6 pr-8 leading-8 text-[#59645d]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a2d20] py-[clamp(76px,9vw,120px)] text-center text-white">
        <div className="hl-shell">
          <h2 className="mx-auto max-w-[920px] font-serif-th text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-tight">ส่งวันเดินทาง จำนวนคน จุดรับ และปลายทางให้ HUGLAO ช่วยตรวจรถ</h2>
          <p className="mx-auto mt-5 max-w-[720px] leading-8 text-[#c8d3cc]">ทีมงานจะตรวจรถพาร์ตเนอร์ที่เหมาะสม แล้วส่งรายละเอียดรถ ราคา สิ่งที่รวม และเงื่อนไขให้ตรวจสอบก่อนยืนยัน</p>
          <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-[#d8af4a] px-8 font-bold text-[#092217] transition hover:bg-[#efd276]">
            ขอราคาผ่าน LINE OA
          </a>
        </div>
      </section>
    </main>
  );
}
