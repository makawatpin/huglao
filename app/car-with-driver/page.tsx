import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import PublishedPriceTable from "@/components/PublishedPriceTable";
import { BOOKING_STEPS, SITE, VEHICLE_GROUPS, getVehicleHref } from "@/data/site";
import { getMedia } from "@/data/media";
import {
  PRICES_UPDATED_AT,
  PRICE_INCLUDES_SHORT,
  PRICE_TERMS,
  THAI_SIDE_PICKUP_NOTE,
  formatPrice,
  getAggregateOfferSchema,
  getCurrentPriceRows,
  getPriceRow,
  getPriceVehicle,
  getStartingPrice,
} from "@/data/pricing";

const PAGE_PATH = "/car-with-driver";
const SEDAN_FROM = getStartingPrice("sedanSuv").toLocaleString("en-US");
const VAN_FROM = getStartingPrice("standardVan").toLocaleString("en-US");
const TITLE = `เช่ารถเที่ยวลาวพร้อมคนขับ ราคาเริ่ม ${SEDAN_FROM} บาท | เก๋ง SUV รถตู้ มินิบัส`;
const DESCRIPTION = `จองรถเที่ยวลาวพร้อมคนขับจากเวียงจันทน์ รถเก๋ง/SUV เริ่ม ${SEDAN_FROM} บาท รถตู้เริ่ม ${VAN_FROM} บาท รับ–ส่งด่านท่านาแล้ง สนามบินวัตไต สถานีรถไฟ และเหมาเที่ยววังเวียง เมืองเฟือง น้ำงึม ราคา${PRICE_INCLUDES_SHORT}`;

const term = (title: (typeof PRICE_TERMS)[number]["title"]) => PRICE_TERMS.find((priceTerm) => priceTerm.title === title)!.detail;
const prices = (rowId: string) => getPriceRow(rowId).prices;
const VAN_SEATS = VEHICLE_GROUPS.find((vehicle) => vehicle.slug === "van")!.capacity;

const getStartingPriceLabel = (vehicleSlug: string) => {
  const priceVehicle = getPriceVehicle(vehicleSlug);
  return priceVehicle ? `เริ่ม ${formatPrice(getStartingPrice(priceVehicle.key))}` : "ขอราคาตามทริป";
};

const CAR_FAQS = [
  {
    question: "เช่ารถพร้อมคนขับในลาว ราคาเริ่มเท่าไหร่?",
    answer: `รับ–ส่งด่านท่านาแล้งหรือสนามบินวัตไตเข้าตัวเมืองเวียงจันทน์ รถเก๋ง/SUV ${formatPrice(prices("thanaleng-city").sedanSuv)} รถตู้ ${formatPrice(prices("thanaleng-city").standardVan)} เหมาเที่ยวในเวียงจันทน์ 1 วัน รถเก๋ง/SUV ${formatPrice(prices("vientiane-city-1d").sedanSuv)} รถตู้ ${formatPrice(prices("vientiane-city-1d").standardVan)} เป็นราคาต่อคัน รวม${term("รวมในราคา")}`,
  },
  {
    question: "ควรเลือกรถเก๋ง/SUV หรือรถตู้?",
    answer: `รถเก๋ง/SUV เหมาะกับผู้เดินทางคนเดียว คู่รัก หรือกลุ่มเล็ก ส่วนรถตู้ ${VAN_SEATS} เหมาะกับครอบครัวหรือกลุ่มที่มีกระเป๋าเยอะ เช่น เหมาไปวังเวียง 1 วัน รถเก๋ง/SUV ${formatPrice(prices("vientiane-vang-vieng-1d").sedanSuv)} รถตู้ ${formatPrice(prices("vientiane-vang-vieng-1d").standardVan)}`,
  },
  {
    question: "รับจากฝั่งไทยได้ไหม?",
    answer: `ได้ทั้งรถเก๋ง/SUV และรถตู้ คิดเพิ่มจากราคาทริป: ${THAI_SIDE_PICKUP_NOTE}`,
  },
  {
    question: "ราคารวมอะไรบ้าง และมีค่าใช้จ่ายเพิ่มไหม?",
    answer: `ราคาเป็นราคาต่อคันต่อทริป รวม${term("รวมในราคา")} เวลาบริการ${term("เวลาบริการ")} เกินเวลา ${term("เกินเวลาบริการ")} มัดจำ ${term("มัดจำ")} ทีมงานจะสรุปยอดรวมให้ตรวจสอบก่อนยืนยันการจอง`,
  },
  {
    question: "รถมินิบัสหรือรถบัสคิดราคาอย่างไร?",
    answer: "รถมินิบัสและรถบัสขอราคาแยกตามจำนวนผู้โดยสาร เส้นทาง และวันเดินทาง ส่งรายละเอียดทริปผ่าน LINE OA แล้วทีมงานจะตรวจรถที่ว่างและส่งราคาให้",
  },
  {
    question: "จองรถพร้อมคนขับอย่างไร?",
    answer: "ส่งวันเดินทาง จำนวนคน สัมภาระ จุดรับ และปลายทางผ่าน LINE OA ทีมงานตรวจรถที่ว่างและส่งราคา เมื่อยืนยันและชำระมัดจำแล้ว คนขับจะรอที่จุดนัดหมายตามเวลา",
  },
] as const;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${PAGE_PATH}/` },
  openGraph: {
    title: `${TITLE} | HUGLAO`,
    description: DESCRIPTION,
    url: `${PAGE_PATH}/`,
    type: "website",
  },
};

export default function CarWithDriverPage() {
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
              name: "รถเที่ยวลาวพร้อมคนขับ",
              url: `${SITE.website}${PAGE_PATH}/`,
              description: DESCRIPTION,
              provider: { "@id": `${SITE.website}/#organization` },
              areaServed: "Laos",
              serviceType: "รถเก๋ง SUV รถตู้ และมินิบัสพร้อมคนขับสำหรับทริปส่วนตัว",
              offers: getAggregateOfferSchema(getCurrentPriceRows()),
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: CAR_FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]),
        }}
      />
      <PageHero
        eyebrow="Private car with driver"
        title="จองรถพร้อมคนขับ เที่ยวลาวตามแผนของคุณ"
        description="เลือกได้ทั้งรถเก๋งและ SUV เที่ยวลาว รถตู้เที่ยวลาว รถมินิบัสและรถบัสเที่ยวลาว ตามจำนวนผู้โดยสาร สัมภาระ และรูปแบบทริป โดยทีม HUGLAO ช่วยจัดหาและประสานรถจากพาร์ตเนอร์"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "จองรถพร้อมคนขับ" }]}
      />

      <section className="bg-[#071d13] pb-8 text-white">
        <div className="hl-shell">
          <Link href="/vientiane/" className="inline-flex rounded-full border border-[#d8af4a]/60 px-5 py-3 text-sm font-bold text-[#efd276] hover:bg-white/10">
            เช่ารถเวียงจันทน์พร้อมคนขับ: ดูจุดรับและราคา →
          </Link>
        </div>
      </section>

      <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,120px)]">
        <div className="hl-shell">
          <div className="max-w-[800px]">
            <span className="hl-kicker">ประเภทรถที่ให้บริการ</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">เลือกรถให้เหมาะกับคน สัมภาระ และระยะทาง</h2>
          </div>
          <div className="mx-auto mt-9 grid max-w-[1100px] gap-3 sm:mt-10 sm:gap-4">
            {VEHICLE_GROUPS.map((vehicle, index) => {
              const media = getMedia(vehicle.mediaIds[0]);
              const priceVehicle = getPriceVehicle(vehicle.slug);
              return <article id={vehicle.slug} key={vehicle.slug} className="group grid scroll-mt-28 grid-cols-[116px_minmax(0,1fr)] overflow-hidden rounded-[20px] border border-[#d9d0bd] bg-white shadow-[0_10px_30px_rgba(27,49,37,.055)] transition duration-300 hover:border-[#d8af4a] hover:shadow-[0_16px_38px_rgba(27,49,37,.09)] sm:grid-cols-[190px_minmax(0,1fr)] sm:rounded-[24px] lg:grid-cols-[230px_minmax(0,1fr)]">
                <div className="relative min-h-[196px] border-r border-[#e3dbc9] bg-[linear-gradient(145deg,#faf8f2,#e9e3d7)] sm:min-h-[184px]">
                  <Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 116px, (max-width: 1023px) 190px, 230px" className="object-contain p-2.5 transition duration-300 group-hover:scale-[1.025] sm:p-4" />
                </div>
                <div className="min-w-0 p-3.5 sm:p-5 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-8 lg:px-7 lg:py-6">
                  <div className="min-w-0">
                    <span className="inline-flex rounded-full bg-[#f1ead9] px-2.5 py-1 text-xs font-bold tracking-[.14em] text-[#8b6518]">0{index + 1}</span>
                    <h3 className="mt-2 font-serif-th text-lg font-bold leading-snug text-[#0a2d20] sm:text-2xl">{vehicle.name}</h3>
                    <p className="mt-1.5 text-xs leading-5 text-[#59645d] sm:mt-2 sm:text-sm sm:leading-6">{vehicle.description}</p>
                    <p className="mt-2.5 inline-flex rounded-full bg-[#eef4ef] px-2.5 py-1 text-xs font-semibold leading-5 text-[#0a2d20]">{priceVehicle ? `ราคา${getStartingPriceLabel(vehicle.slug)}` : "ขอราคาแยกตามรายละเอียดทริป"}</p>
                  </div>
                  <Link href={getVehicleHref(vehicle.slug)} className="mt-3 inline-flex min-h-9 items-center rounded-full border border-[#d8af4a] px-3.5 text-xs font-bold text-[#80601b] transition hover:bg-[#d8af4a] hover:text-[#071d13] sm:text-sm lg:mt-0 lg:whitespace-nowrap">ดูรายละเอียด →</Link>
                </div>
              </article>;
            })}
          </div>
          <p className="mx-auto mt-5 max-w-[1100px] rounded-[14px] border border-[#ddd4c1] bg-white/65 px-4 py-3 text-xs leading-6 text-[#687169]">ภาพประกอบใช้เพื่ออธิบายหมวดรถเท่านั้น รุ่น ปีรถ สี ผังที่นั่ง และพื้นที่สัมภาระจริงจะยืนยันตามรถพาร์ตเนอร์ที่ว่าง</p>
        </div>
      </section>

      <section id="pricing" className="bg-[#efe8d9] py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell">
          <span className="hl-kicker">ตารางราคาปัจจุบัน</span>
          <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">ราคารถพร้อมคนขับที่ยืนยันแล้ว</h2>
          <p className="mb-8 mt-5 max-w-[820px] leading-8 text-[#59645d]">แสดงราคาครบทั้งเที่ยวเดียว รับ–ส่ง และเหมาทริปสำหรับรถเก๋ง/SUV เที่ยวลาว และรถตู้เที่ยวลาว ส่วนรถมินิบัสและรถบัสเที่ยวลาวต้องขอราคาแยกตามงาน</p>
          <PublishedPriceTable rows={getCurrentPriceRows()} />
        </div>
      </section>

      <section className="bg-white py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell">
          <span className="hl-kicker">เปรียบเทียบประเภทรถ</span>
          <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight text-[#071d13]">รถเก๋ง SUV รถตู้ หรือมินิบัส เลือกแบบไหนดี</h2>
          <div className="mt-8 grid gap-4 md:hidden">
            {VEHICLE_GROUPS.map((vehicle) => (
              <article key={vehicle.slug} className="rounded-[22px] border border-[#ddd4c1] p-5">
                <h3 className="font-bold text-[#0a2d20]">{vehicle.name}</h3>
                <dl className="mt-3 grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-3 gap-y-2 text-sm leading-6">
                  <dt className="text-[#687169]">จำนวนที่นั่ง</dt><dd className="text-[#0a2d20]">{vehicle.capacity}</dd>
                  <dt className="text-[#687169]">เหมาะกับ</dt><dd className="text-[#0a2d20]">{vehicle.suitableFor}</dd>
                  <dt className="text-[#687169]">ราคา</dt><dd className="font-bold text-[#86611a]">{getStartingPriceLabel(vehicle.slug)}</dd>
                </dl>
              </article>
            ))}
          </div>
          <div className="mt-8 hidden overflow-x-auto rounded-[24px] border border-[#ddd4c1] md:block">
            <table className="min-w-[760px] w-full border-collapse text-left">
              <thead className="bg-[#0a2d20] text-white">
                <tr><th className="p-5">กลุ่มรถ</th><th className="p-5">จำนวนที่นั่ง</th><th className="p-5">เหมาะกับ</th><th className="p-5 text-right">ราคา</th></tr>
              </thead>
              <tbody>
                {VEHICLE_GROUPS.map((vehicle) => (
                  <tr key={vehicle.slug} className="border-b border-[#ece6d9] last:border-0">
                    <th className="p-5 text-[#0a2d20]">{vehicle.name}</th>
                    <td className="p-5 text-[#59645d]">{vehicle.capacity}</td>
                    <td className="p-5 text-[#59645d]">{vehicle.suitableFor}</td>
                    <td className="whitespace-nowrap p-5 text-right font-bold text-[#86611a]">{getStartingPriceLabel(vehicle.slug)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#687169]">ราคาต่อคัน รวม{term("รวมในราคา")}แล้ว · รับจากฝั่งไทยได้ ({THAI_SIDE_PICKUP_NOTE}) · มินิบัสและรถบัสขอราคาแยกตามงาน</p>
        </div>
      </section>

      <section className="bg-[#efe8d9] py-[clamp(56px,7vw,88px)]">
        <div className="hl-shell">
          <span className="hl-kicker">ขั้นตอนการจอง</span>
          <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight text-[#071d13]">จองรถพร้อมคนขับใน 5 ขั้นตอน</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {BOOKING_STEPS.map((step) => (
              <article key={step.number} className="grid grid-cols-[2rem_minmax(0,1fr)] content-start gap-x-3 rounded-[18px] border border-[#ddd4c1] bg-white p-4 sm:rounded-[20px] sm:p-5 lg:block">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a2d20] text-xs font-bold text-[#efd276]">{step.number}</span>
                <h3 className="self-center text-base font-bold leading-6 text-[#0a2d20] lg:mt-4">{step.title}</h3>
                <p className="col-start-2 mt-1.5 text-[.82rem] leading-6 text-[#59645d] lg:col-auto lg:mt-2">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell max-w-[900px]">
          <span className="hl-kicker">คำถามเรื่องรถและการจอง</span>
          <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight text-[#071d13]">คำถามก่อนจองรถเที่ยวลาว</h2>
          <div className="mt-8 divide-y divide-[#ddd4c1] border-y border-[#ddd4c1]">
            {CAR_FAQS.map((faq) => (
              <details key={faq.question} className="py-1">
                <summary className="cursor-pointer py-5 font-semibold text-[#0a2d20]">{faq.question}</summary>
                <p className="pb-6 leading-8 text-[#59645d]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <LineCta />
    </main>
  );
}
