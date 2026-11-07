import JourneyCards from "@/components/JourneyCards";
import CityPriceTables from "@/components/CityPriceTables";
import ServicePriceOverview from "@/components/ServicePriceOverview";
import CityServiceLinks from "@/components/CityServiceLinks";
import type { Metadata } from "next";
import Link from "next/link";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import VanAlbum from "@/components/VanAlbum";
import { getMedia, type MediaId } from "@/data/media";
import {
  PRICES_UPDATED_AT,
  PRICE_INCLUDES_SHORT,
  PRICE_TERMS,
  THAI_SIDE_PICKUP_FEES,
  formatPrice,
  getAggregateOfferSchema,
  getCurrentPriceRows,
  getPriceRow,
  getStartingPrice,
} from "@/data/pricing";
import { BOOKING_STEPS, SITE, VEHICLE_GROUPS } from "@/data/site";

const PAGE_PATH = "/van-laos";
const VAN_SEATS = VEHICLE_GROUPS.find((vehicle) => vehicle.slug === "van")!.capacity;
const van = (rowId: string) => formatPrice(getPriceRow(rowId).prices.standardVan);
const [NONG_KHAI, UDON] = THAI_SIDE_PICKUP_FEES;
const THAI_PICKUP_TEXT = `รับจาก${NONG_KHAI.label} +${formatPrice(NONG_KHAI.price)} · ${UDON.label} +${formatPrice(UDON.price)}`;
const VAN_FROM = getStartingPrice("standardVan").toLocaleString("en-US");
const TITLE = `เหมารถตู้เที่ยวลาว พร้อมคนขับ ราคาเริ่ม ${VAN_FROM} บาท | วังเวียง เมืองเฟือง น้ำงึม`;
const DESCRIPTION = `เหมารถตู้เที่ยวลาวพร้อมคนขับ ${VAN_SEATS} รับ–ส่งเริ่ม ${VAN_FROM} บาท เที่ยวเวียงจันทน์ 1 วัน ${van("vientiane-city-1d")} ไปวังเวียง เมืองเฟือง น้ำงึม รับจากด่านหนองคายหรืออุดรธานีได้ ราคา${PRICE_INCLUDES_SHORT}`;

/** Plain-text price summary near the top, so the key numbers can be read (and quoted) without the full table. */

const term = (title: (typeof PRICE_TERMS)[number]["title"]) => PRICE_TERMS.find((priceTerm) => priceTerm.title === title)!.detail;
const SERVICE_HOURS = `เวลาบริการ${term("เวลาบริการ")} เกินเวลา ${term("เกินเวลาบริการ")}`;

const PRICE_FACTS = [`รถตู้ ${VAN_SEATS}`, SERVICE_HOURS, THAI_PICKUP_TEXT] as const;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${PAGE_PATH}/` },
  openGraph: {
    title: `${TITLE} | HUGLAO`,
    description: DESCRIPTION,
    url: `${PAGE_PATH}/`,
    type: "website",
    images: [{ url: getMedia("huglaoHiaceFrontQuarter").src, alt: getMedia("huglaoHiaceFrontQuarter").alt }],
  },
};



const VAN_ALBUM_GROUPS = [
  {
    title: "ภายนอก",
    items: [
      { mediaId: "huglaoHiaceFrontQuarter", caption: "Toyota Hiace หลังคาสูง" },
      { mediaId: "huglaoHiaceSideDoorOpen", caption: "ประตูสไลด์ ขึ้นลงสะดวก" },
      { mediaId: "huglaoHiaceRearQuarter", caption: "ฟิล์มกรองแสงเข้มรอบคัน" },
    ],
  },
  {
    title: "ห้องโดยสาร",
    items: [
      { mediaId: "huglaoHiaceSeatRows", caption: "เข็มขัดนิรภัยทุกที่นั่ง" },
      { mediaId: "huglaoHiaceAisle", caption: "ทางเดินกลาง และช่องแอร์บนเพดาน" },
      { mediaId: "huglaoHiaceBenchSeat", caption: "พอร์ต USB ที่ผนังข้างเบาะ" },
    ],
  },
  {
    title: "สัมภาระ",
    items: [
      { mediaId: "huglaoHiaceTailgateOpen", caption: "ฝาท้ายเปิดกว้าง" },
      { mediaId: "huglaoHiaceLuggageSpace", caption: "พับเบาะแถวหลังเพิ่มที่วางกระเป๋า" },
    ],
  },
  {
    title: "ทีมงานและคนขับ",
    items: [
      { mediaId: "vehicleVan", caption: "รถตู้ในทีม HUGLAO" },
      { mediaId: "huglaoVansBalloon", caption: "ทีมรถตู้ HUGLAO" },
      { mediaId: "huglaoDriverWhiteVan", caption: "คนขับและรถตู้ของทีม" },
    ],
  },
] as const satisfies readonly { title: string; items: readonly { mediaId: MediaId; caption: string }[] }[];


const VAN_FAQS = [
  {
    question: "เหมารถตู้เที่ยวลาววันละเท่าไหร่?",
    answer: `เหมารถตู้เที่ยวในนครหลวงเวียงจันทน์ ${van("vientiane-city-1d")}ต่อวัน ไป–กลับวังเวียงใน 1 วัน ${van("vientiane-vang-vieng-1d")} เมืองเฟือง ${van("vientiane-muang-feuang-1d")} และอ่างเก็บน้ำงึม ${van("vientiane-nam-ngum-1d")} เป็นราคาต่อคัน รวม${term("รวมในราคา")} ${SERVICE_HOURS}`,
  },
  {
    question: "รถตู้จากเวียงจันทน์ไปวังเวียงราคาเท่าไหร่?",
    answer: `เที่ยวเดียวจากจุดรับในเวียงจันทน์ไปวังเวียง ${van("vientiane-vang-vieng-transfer")} เหมาไป–กลับ 1 วัน ${van("vientiane-vang-vieng-1d")} 2 วัน 1 คืน ${van("vientiane-vang-vieng-2d1n")} และ 3 วัน 2 คืน ${van("vientiane-vang-vieng-3d2n")} ต่อคัน`,
  },
  {
    question: "รถตู้นั่งได้กี่คน?",
    answer: `รถตู้ของ HUGLAO มี ${VAN_SEATS} เหมาะกับครอบครัว กลุ่มเพื่อน หรือคณะที่เดินทางร่วมกัน แจ้งจำนวนผู้โดยสาร เด็ก และกระเป๋าตอนขอราคา ทีมงานจะเลือกรถขนาดที่พอดีกับกลุ่ม`,
  },
  {
    question: "รับจากฝั่งไทยได้ไหม?",
    answer: `ได้ รับจาก${NONG_KHAI.label} บวกเพิ่ม ${formatPrice(NONG_KHAI.price)} และรับจาก${UDON.label} บวกเพิ่ม ${formatPrice(UDON.price)} จากราคาทริปในตาราง เช่น เหมาเที่ยวเวียงจันทน์ 1 วันและรับจากด่านหนองคาย รวม ${formatPrice(getPriceRow("vientiane-city-1d").prices.standardVan + NONG_KHAI.price)}`,
  },
  {
    question: "ราคารถตู้เที่ยวลาวรวมอะไรบ้าง?",
    answer: `ราคาในตารางเป็นราคาต่อคันต่อทริป รวม${term("รวมในราคา")} ${SERVICE_HOURS} มัดจำ ${term("มัดจำ")} ทีมงานจะสรุปยอดรวมให้ตรวจสอบก่อนยืนยันการจอง`,
  },
  {
    question: "ต้องส่งข้อมูลอะไรเพื่อขอราคารถตู้?",
    answer: "ส่งวันเดินทาง จำนวนคน สัมภาระ จุดรับ ปลายทาง และระยะเวลาที่ต้องการใช้รถผ่าน LINE OA",
  },
] as const;

export default function VanLaosPage() {



  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              url: `${SITE.website}${PAGE_PATH}/`,
              name: TITLE,
              dateModified: PRICES_UPDATED_AT,
              isPartOf: { "@id": `${SITE.website}/#website` },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "รถตู้เที่ยวลาวพร้อมคนขับ",
              url: `${SITE.website}${PAGE_PATH}/`,
              description: DESCRIPTION,
              provider: { "@id": `${SITE.website}/#organization` },
              areaServed: "Laos",
              serviceType: "รถตู้พร้อมคนขับสำหรับทริปส่วนตัว",
              offers: getAggregateOfferSchema(getCurrentPriceRows(), ["standardVan"]),
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: VAN_FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]),
        }}
      />
      <PageHero
        eyebrow="Van travel in Laos"
        title="รถตู้เที่ยวลาวพร้อมคนขับ"
        description="รถตู้พร้อมคนขับ มีบริการเริ่มรับในเวียงจันทน์ วังเวียง และหลวงพระบาง ดูราคาแยกเมืองและขอบเขตบริการก่อนจอง"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "รถตู้เที่ยวลาว" }]}
      />

      <section className="bg-[#071d13] pb-10 text-white" aria-labelledby="van-price-summary-title">
        <div className="hl-shell">
          <div className="max-w-[820px]">
            <ServicePriceOverview vanOnly title="สรุปราคารถตู้เที่ยวลาว แยกเมือง" />
            <p className="mt-5 text-xs leading-6 text-[#afbeb5]">ข้อมูลต่อไปนี้สำหรับบริการเริ่มรับจากเวียงจันทน์ ส่วนอีกสองเมืองดูเงื่อนไขตามรายการข้างต้น</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {PRICE_FACTS.map((fact) => (
                <li key={fact} className="rounded-full bg-white/[.08] px-3 py-1.5 text-xs font-semibold leading-5 text-[#e4ebe6]">{fact}</li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="#pricing" className="inline-flex min-h-11 items-center rounded-full bg-[#d8af4a] px-5 text-sm font-bold text-[#071d13] hover:bg-[#efd276]">
                ดูราคาทุกเส้นทาง ↓
              </Link>
              <Link href="/vientiane/" className="inline-flex min-h-11 items-center rounded-full border border-[#d8af4a]/60 px-5 text-sm font-bold text-[#efd276] hover:bg-white/10">
                เช่ารถตู้เวียงจันทน์พร้อมคนขับ →
              </Link>
            </div>
          </div>
        </div>
      </section>

      

      <section className="bg-[#f7f3e9] py-[clamp(44px,8vw,104px)]" id="pricing" aria-labelledby="van-pricing-title">
        <div className="hl-shell">
          <span className="hl-kicker">ราคารถตู้เที่ยวลาว</span>
          <h2 id="van-pricing-title" className="mt-4 max-w-[880px] font-serif-th text-[clamp(2rem,5vw,3.8rem)] font-bold leading-tight text-[#071d13]">
            ราคาราคารถตู้เที่ยวลาว แยกเมืองและเส้นทาง
          </h2>
          <p className="mb-8 mt-4 max-w-[820px] leading-8 text-[#59645d]">ตารางนี้แสดงราคารถตู้เที่ยวลาวตามเส้นทางที่ยืนยันแล้ว รุ่นรถ ผังที่นั่ง และพื้นที่สัมภาระจริงจะตรวจตามรถที่ว่างในวันเดินทาง</p>
          <CityPriceTables vanOnly />
        </div>
      </section>

      <section className="bg-white py-[clamp(44px,7vw,92px)]" id="van-album" aria-labelledby="van-album-title">
        <div className="hl-shell">
          <span className="hl-kicker">อัลบั้มรถตู้</span>
          <h2 id="van-album-title" className="mt-4 font-serif-th text-[clamp(2rem,4vw,3.3rem)] font-bold text-[#071d13]">ภาพรถตู้จริงของทีม HUGLAO</h2>
          <p className="mt-4 max-w-[820px] leading-8 text-[#59645d]">ดูภายนอก ห้องโดยสาร และพื้นที่สัมภาระของรถจริง รุ่นรถและผังที่นั่งจริงทีมงานจะแจ้งตามรถที่ว่างในวันเดินทาง</p>
          <VanAlbum imageFit="contain" groups={VAN_ALBUM_GROUPS.map((group) => ({
              title: group.title,
              items: group.items.map(({ mediaId, caption }) => {
                const media = getMedia(mediaId);
                return { src: media.src, alt: media.alt, caption };
              }),
            }))}
          />
        </div>
      </section>

      <JourneyCards id="van-routes" title="เลือกเส้นทาง แล้วปรับจังหวะให้เป็นของคุณ" />

      <section className="bg-[#efe8d9] py-[clamp(44px,7vw,88px)]" aria-labelledby="van-booking-title">
        <div className="hl-shell">
          <span className="hl-kicker">ขั้นตอนจองรถตู้</span>
          <h2 id="van-booking-title" className="mt-4 font-serif-th text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#071d13]">จากรายละเอียดทริป สู่รถที่จุดนัดหมาย</h2>
          <ol className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {BOOKING_STEPS.map((step) => (
              <li key={step.number} className="grid grid-cols-[2rem_minmax(0,1fr)] content-start gap-x-3 rounded-[18px] border border-[#ddd4c1] bg-white p-4 lg:block lg:p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a2d20] text-xs font-bold text-[#efd276]">{step.number}</span>
                <h3 className="self-center text-base font-bold leading-6 text-[#0a2d20] lg:mt-4">{step.title}</h3>
                <p className="col-start-2 mt-1.5 text-[.82rem] leading-6 text-[#59645d] lg:col-auto lg:mt-2">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-[clamp(44px,7vw,92px)]" aria-labelledby="van-faq-title">
        <div className="hl-shell max-w-[900px]">
          <span className="hl-kicker">คำถามเรื่องรถตู้เที่ยวลาว</span>
          <h2 id="van-faq-title" className="mt-4 font-serif-th text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#071d13]">ข้อมูลสำคัญก่อนขอราคา</h2>
          <div className="mt-7 divide-y divide-[#ddd4c1] border-y border-[#ddd4c1]">
            {VAN_FAQS.map((faq) => (
              <details key={faq.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-[#0a2d20]">
                  {faq.question}<span className="text-2xl font-light text-[#86611a] transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[780px] pb-6 pr-8 leading-8 text-[#59645d]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LineCta
        title="กำลังมองหารถตู้เที่ยวลาวสำหรับทริปของคุณ?"
        description="ส่งวันเดินทาง จำนวนคน สัมภาระ จุดรับ และเส้นทางผ่าน LINE เพื่อให้ทีมตรวจรถตู้เที่ยวลาวที่เหมาะกับทริป"
      />
      <CityServiceLinks />
    </main>
  );
}
