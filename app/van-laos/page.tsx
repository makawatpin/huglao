import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import PublishedPriceTable from "@/components/PublishedPriceTable";
import { getMedia } from "@/data/media";
import { getCurrentPriceRows } from "@/data/pricing";
import { BOOKING_STEPS, ROUTE_GROUPS, SITE } from "@/data/site";

const PAGE_PATH = "/van-laos";
const TITLE = "รถตู้เที่ยวลาวพร้อมคนขับ | ราคาและเส้นทางจากเวียงจันทน์";
const DESCRIPTION =
  "รถตู้เที่ยวลาวพร้อมคนขับสำหรับครอบครัว กลุ่มเพื่อน และคณะเดินทาง ดูราคารถตู้ เส้นทางจากเวียงจันทน์ รายละเอียดรถ และขั้นตอนขอราคา";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${PAGE_PATH}/` },
  openGraph: {
    title: `${TITLE} | HUGLAO`,
    description: DESCRIPTION,
    url: `${PAGE_PATH}/`,
    type: "website",
    images: [{ url: getMedia("huglaoVansBalloon").src, alt: getMedia("huglaoVansBalloon").alt }],
  },
};

const FEATURED_ROUTE_SLUGS = [
  "vientiane-city",
  "vientiane-nam-ngum",
  "vientiane-vang-vieng",
  "vientiane-muang-feuang",
] as const;

const VAN_GALLERY_IDS = [
  "huglaoVansBalloon",
  "huglaoDriverSilverVan",
  "huglaoDriverWhiteVan",
] as const;

const VAN_FAQS = [
  {
    question: "รถตู้เที่ยวลาวเหมาะกับใคร?",
    answer: "เหมาะกับครอบครัว กลุ่มเพื่อน หรือคณะที่ต้องการเดินทางร่วมกัน โดยต้องแจ้งจำนวนผู้โดยสารและสัมภาระจริงเพื่อให้ทีมตรวจผังที่นั่งและพื้นที่เก็บกระเป๋า",
  },
  {
    question: "รถตู้ที่ให้บริการเป็นรุ่นใด?",
    answer: "รุ่น ปีรถ สี ผังที่นั่ง และพื้นที่สัมภาระขึ้นอยู่กับรถพาร์ตเนอร์ที่ว่าง ทีมงานจะแจ้งรายละเอียดรถให้ตรวจสอบก่อนยืนยันการจอง",
  },
  {
    question: "ราคารถตู้เที่ยวลาวรวมอะไรบ้าง?",
    answer: "ราคาและสิ่งที่รวมจะแสดงตามตารางและข้อเสนอของแต่ละทริป โดยทีมจะสรุปเส้นทาง ระยะเวลา ค่าใช้จ่าย และเงื่อนไขให้ตรวจสอบก่อนยืนยัน",
  },
  {
    question: "ต้องส่งข้อมูลอะไรเพื่อขอราคารถตู้?",
    answer: "ส่งวันเดินทาง จำนวนคน สัมภาระ จุดรับ ปลายทาง และระยะเวลาที่ต้องการใช้รถผ่าน LINE OA",
  },
] as const;

export default function VanLaosPage() {
  const routes = ROUTE_GROUPS.filter((route) =>
    FEATURED_ROUTE_SLUGS.includes(route.slug as (typeof FEATURED_ROUTE_SLUGS)[number]),
  );
  const vanMedia = getMedia("vehicleVan");

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "รถตู้เที่ยวลาวพร้อมคนขับ",
              url: `${SITE.website}${PAGE_PATH}/`,
              description: DESCRIPTION,
              provider: { "@id": `${SITE.website}/#organization` },
              areaServed: "Laos",
              serviceType: "รถตู้พร้อมคนขับสำหรับทริปส่วนตัว",
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
        description="หน้ารวมข้อมูลรถตู้เที่ยวลาว เริ่มต้นจากฝั่งเวียงจันทน์ พร้อมตรวจเส้นทาง ราคา จำนวนผู้โดยสาร สัมภาระ และรถที่ว่างก่อนยืนยัน"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "รถตู้เที่ยวลาว" }]}
      />

      <section className="bg-[#071d13] pb-8 text-white">
        <div className="hl-shell">
          <Link href="/vientiane/" className="inline-flex rounded-full border border-[#d8af4a]/60 px-5 py-3 text-sm font-bold text-[#efd276] hover:bg-white/10">
            ดูบริการรถตู้เวียงจันทร์พร้อมคนขับ →
          </Link>
        </div>
      </section>

      <section className="bg-[#071d13] pb-[clamp(56px,8vw,92px)] text-white" aria-labelledby="van-options-title">
        <div className="hl-shell">
          <article className="grid overflow-hidden rounded-[24px] border border-white/10 bg-white/[.055] sm:rounded-[28px] md:grid-cols-[minmax(280px,.85fr)_minmax(0,1fr)]">
            <div className="bg-[#071d13] p-3 sm:p-4" aria-label="อัลบั้มรถตู้ คนขับ และทีมงาน HUGLAO">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#eee9de] sm:rounded-[22px]">
                <Image src={vanMedia.src} alt={vanMedia.alt} fill sizes="(max-width: 767px) 100vw, 45vw" className="object-contain p-3 sm:p-5" />
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 sm:mt-3 sm:gap-3">
                {VAN_GALLERY_IDS.slice(0, 3).map((mediaId) => {
                  const media = getMedia(mediaId);
                  return (
                    <figure key={mediaId} className="overflow-hidden rounded-[12px] border border-white/10 bg-[#eee9de] sm:rounded-[16px]">
                      <div className="relative aspect-square">
                        <Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 33vw, 15vw" className="object-cover" />
                      </div>
                    </figure>
                  );
                })}
              </div>
              <p className="mt-3 px-1 text-xs leading-5 text-[#afbeb5]">อัลบั้มรถตู้ คนขับ และทีมงาน HUGLAO รวม 4 ภาพ · <Link href="/image-credits" className="font-semibold text-[#efd276]">ดูเครดิตภาพ</Link></p>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-9">
              <h2 id="van-options-title" className="font-serif-th text-3xl font-bold">รถตู้เที่ยวลาว</h2>
              <p className="mt-4 leading-8 text-[#c8d3cc]">เหมาะสำหรับครอบครัว กลุ่มเพื่อน หรือคณะที่ต้องการเดินทางร่วมกัน ทีมงานจะตรวจจำนวนผู้โดยสาร สัมภาระ ผังที่นั่ง และรถที่ว่างก่อนเสนอราคา</p>
              <Link href="#pricing" className="mt-6 inline-flex w-fit rounded-full border border-[#d8af4a] px-5 py-2.5 text-sm font-bold text-[#efd276] transition hover:bg-[#d8af4a] hover:text-[#071d13]">
                ดูราคารถตู้เที่ยวลาว →
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#f7f3e9] py-[clamp(56px,8vw,104px)]" id="pricing" aria-labelledby="van-pricing-title">
        <div className="hl-shell">
          <span className="hl-kicker">ราคารถตู้เที่ยวลาว</span>
          <h2 id="van-pricing-title" className="mt-4 max-w-[880px] font-serif-th text-[clamp(2rem,5vw,3.8rem)] font-bold leading-tight text-[#071d13]">
            ราคารถตู้เที่ยวลาว แสดงแยกตามเส้นทาง
          </h2>
          <p className="mb-8 mt-4 max-w-[820px] leading-8 text-[#59645d]">ตารางนี้แสดงราคารถตู้เที่ยวลาวตามเส้นทางที่ยืนยันแล้ว รุ่นรถ ผังที่นั่ง และพื้นที่สัมภาระจริงจะตรวจตามรถที่ว่างในวันเดินทาง</p>
          <PublishedPriceTable rows={getCurrentPriceRows()} vehicleSlug="van" />
        </div>
      </section>

      <section className="bg-white py-[clamp(56px,7vw,92px)]" aria-labelledby="van-routes-title">
        <div className="hl-shell">
          <span className="hl-kicker">เส้นทางยอดนิยม</span>
          <h2 id="van-routes-title" className="mt-4 font-serif-th text-[clamp(2rem,4vw,3.3rem)] font-bold text-[#071d13]">เลือกรถตู้ แล้ววางเส้นทางตามแผนของคุณ</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map((route) => {
              const media = getMedia(route.mediaId);
              return (
                <Link key={route.slug} href={`/routes/${route.slug}`} className="group overflow-hidden rounded-[20px] border border-[#ddd4c1] bg-[#f9f6ef] transition hover:-translate-y-1 hover:border-[#d8af4a]">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={media.src} alt={media.alt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold leading-6 text-[#0a2d20]">{route.name}</h3>
                    <span className="mt-3 block text-sm font-bold text-[#9b711c]">ดูเส้นทาง →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#efe8d9] py-[clamp(56px,7vw,88px)]" aria-labelledby="van-booking-title">
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

      <section className="bg-white py-[clamp(56px,7vw,92px)]" aria-labelledby="van-faq-title">
        <div className="hl-shell max-w-[900px]">
          <span className="hl-kicker">คำถามเรื่องรถตู้เที่ยวลาว</span>
          <h2 id="van-faq-title" className="mt-4 font-serif-th text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#071d13]">ข้อมูลสำคัญก่อนขอราคา</h2>
          <div className="mt-7 divide-y divide-[#ddd4c1] border-y border-[#ddd4c1]">
            {VAN_FAQS.map((faq) => (
              <details key={faq.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-[#0a2d20]">
                  {faq.question}<span className="text-2xl font-light text-[#9b711c] transition group-open:rotate-45">+</span>
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
    </main>
  );
}
