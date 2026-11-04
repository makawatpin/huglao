import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import PublishedPriceTable from "@/components/PublishedPriceTable";
import { PICKUP_POINTS, ROUTE_GROUPS, SITE, VEHICLE_GROUPS, getVehicleHref } from "@/data/site";
import { getMedia } from "@/data/media";
import { getAggregateOfferSchema, getCurrentPriceRows } from "@/data/pricing";

export const dynamicParams = false;

export function generateStaticParams() {
  return ROUTE_GROUPS.map((route) => ({ slug: route.slug }));
}

function getRoute(slug: string) {
  return ROUTE_GROUPS.find((route) => route.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) return {};
  const title = `รถพร้อมคนขับ ${route.name}`;
  const description = `${route.summary} เลือกประเภทรถและขอราคาจาก HUGLAO`;
  return {
    title,
    description,
    alternates: { canonical: `/routes/${route.slug}/` },
    openGraph: {
      title: `${title} | HUGLAO`,
      description,
      url: `/routes/${route.slug}/`,
      images: [{ url: getMedia(route.mediaId).src, alt: getMedia(route.mediaId).alt }],
    },
  };
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = getRoute(slug);
  if (!route) notFound();
  const prices = getCurrentPriceRows({ routeSlug: route.slug });
  const media = getMedia(route.mediaId);

  const faqs = [
    { question: `เส้นทาง${route.name}เริ่มรับที่ไหน?`, answer: "บริการเริ่มจากจุดรับฝั่งเวียงจันทน์ที่ตกลงไว้ในข้อเสนอ" },
    { question: "สามารถเปลี่ยนจุดแวะได้หรือไม่?", answer: "สามารถแจ้งจุดแวะและแผนที่ต้องการได้ ทีมงานจะตรวจเวลา ระยะทาง และค่าใช้จ่ายก่อนยืนยัน" },
    { question: "ราคาในหน้าเว็บเป็นราคายืนยันหรือไม่?", answer: "จะแสดงเฉพาะรายการที่ผ่านการตรวจและอนุญาตให้เผยแพร่ และยังต้องตรวจวันเดินทาง รถที่ว่าง และรายละเอียดจริงก่อนยืนยันจอง" },
    { question: "แผนตัวอย่างเป็นโปรแกรมบังคับหรือไม่?", answer: "ไม่ใช่ แผนตัวอย่างมีไว้ช่วยวางโครงทริป ลูกค้าเป็นผู้เลือกจังหวะและจุดแวะของตนเอง" },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: `รถพร้อมคนขับ ${route.name}`,
        url: `${SITE.website}/routes/${route.slug}/`,
        provider: { "@id": `${SITE.website}/#organization` },
        areaServed: "Laos",
        description: route.summary,
        offers: getAggregateOfferSchema(prices),
      }) }} />
      <PageHero
        eyebrow="Route from Vientiane"
        title={route.name}
        description={`${route.summary} ตัวอย่างแผนและระยะเวลาเป็นทางเลือก ไม่ใช่โปรแกรมทัวร์บังคับ`}
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "เที่ยวลาวกับเรา", href: "/travel-with-us#routes" }, { label: route.name }]}
      />

      <section className="bg-[#071d13] pb-[clamp(56px,8vw,92px)]">
        <div className="hl-shell">
          <figure className="hl-mobile-media-card hl-detail-media-card overflow-hidden rounded-[30px] border border-white/10 bg-[#0a2d20] shadow-[0_28px_80px_rgba(0,0,0,.24)]">
            <div className="hl-mobile-media relative aspect-[16/9] sm:aspect-[16/8]">
              <Image src={media.src} alt={media.alt} fill sizes="100vw" className="object-cover" priority />
            </div>
            <figcaption className="hl-mobile-content flex flex-col gap-2 px-5 py-4 text-xs text-[#afbeb5] sm:flex-row sm:items-center sm:justify-between">
              <span>{media.alt}</span>
              <Link href="/image-credits" className="-my-2 py-2 font-semibold text-[#efd276] hover:text-white">ดูที่มาและใบอนุญาตภาพ</Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-white py-[clamp(52px,9vw,110px)]">
        <div className="hl-shell grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-10">
          <div>
            <span className="hl-kicker">ออกแบบทริปในแบบของคุณ</span>
            <h2 className="mt-3 font-serif-th text-[clamp(1.75rem,4.5vw,3.8rem)] font-bold leading-tight text-[#071d13] sm:mt-5">สิ่งที่นำไปวางแผนต่อได้</h2>
            <p className="mt-3 text-[.95rem] leading-7 text-[#59645d] sm:mt-5 sm:text-base sm:leading-8">{route.planningNote}</p>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-[#ddd4c1] bg-[#f7f3e9]">
            <div className="p-5 sm:p-7">
              <p className="text-xs font-bold tracking-[.14em] text-[#86611a]">ไอเดียจุดแวะ · {route.highlights.length} แห่ง</p>
              <ol className="mt-5 grid gap-5 sm:grid-cols-3 sm:gap-4">
                {route.highlights.map((highlight, index) => (
                  <li
                    key={highlight}
                    className="relative flex items-center gap-4 before:absolute before:left-5 before:top-11 before:-bottom-4 before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-[#d8af4a]/45 before:content-[''] last:before:hidden sm:flex-col sm:items-start sm:gap-3 sm:before:left-12 sm:before:right-[-0.75rem] sm:before:top-5 sm:before:bottom-auto sm:before:h-0.5 sm:before:w-auto sm:before:translate-x-0"
                  >
                    <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-[#0a2d20] text-[#efd276] shadow-[0_8px_18px_rgba(10,45,32,.2)]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
                        <circle cx="12" cy="10" r="2.3" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <span className="block text-[.72rem] font-semibold text-[#9a8f73]">จุดแวะที่ {index + 1}</span>
                      <h3 className="font-serif-th text-lg font-bold leading-snug text-[#0a2d20] sm:text-xl">{highlight}</h3>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col gap-3 border-t border-[#e3dbc9] bg-white/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <p className="text-[.85rem] leading-6 text-[#59645d]">อยากเพิ่มหรือสลับจุดแวะ? ทีมงานช่วยจัดเวลาให้</p>
              <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#06c755] px-5 text-sm font-bold text-white transition hover:bg-[#05b34c]">ปรึกษาทาง LINE</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3e9] py-[clamp(48px,8vw,96px)]">
        <div className="hl-shell grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:gap-8">
          <div>
            <span className="hl-kicker">รายละเอียดที่ตรวจสอบแล้ว</span>
            <h2 className="mt-3 font-serif-th text-[clamp(1.75rem,4vw,3.4rem)] font-bold leading-tight text-[#071d13] sm:mt-5">ข้อมูลช่วยเลือกจุดแวะ</h2>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-[#ddd4c1] bg-white shadow-[0_16px_45px_rgba(7,29,19,.06)]">
            <ul className="divide-y divide-[#eee8da]">
              {route.verifiedDetails.map((detail) => (
                <li key={detail} className="flex items-start gap-3 px-5 py-4 sm:px-7 sm:py-5">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#e3f1e7] text-[#1d7a45]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m5 12.5 4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <p className="text-[.92rem] leading-6 text-[#2f3b33] sm:text-base sm:leading-7">{detail}</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-[#eee8da] bg-[#faf7ef] px-5 py-3.5 text-xs leading-5 text-[#687169] sm:px-7">
              <p>
                <span className="mr-1.5 inline-flex rounded-full bg-white px-2 py-0.5 font-semibold text-[#86611a] ring-1 ring-[#e6dcc3]">ที่มา</span>
                {route.sourceUrl ? <a href={route.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0a2d20] underline decoration-[#d8af4a] underline-offset-2 hover:text-[#86611a]">{route.sourceLabel}</a> : <span className="font-semibold text-[#0a2d20]">{route.sourceLabel}</span>}
              </p>
              <p className="mt-1.5">เวลาเปิด–ปิด ค่าบัตร กิจกรรม และสภาพเส้นทาง ควรตรวจอีกครั้งก่อนเดินทาง</p>
            </div>
          </div>
        </div>
      </section>

      {prices.length > 0 ? (
        <section className="bg-[#f7f3e9] py-[clamp(52px,9vw,110px)]">
          <div className="hl-shell">
            <span className="hl-kicker">ตารางราคาที่เผยแพร่</span>
            <h2 className="mb-8 mt-5 font-serif-th text-[clamp(2.1rem,4vw,3.6rem)] font-bold text-[#071d13]">ราคาเส้นทาง {route.name}</h2>
            <PublishedPriceTable rows={prices} showCategoryHeadings={false} />
          </div>
        </section>
      ) : (
        <section className="bg-[#f7f3e9] py-[clamp(48px,8vw,96px)]">
          <div className="hl-shell rounded-[26px] border border-[#ddd4c1] bg-white p-6 text-center sm:p-9">
            <span className="hl-kicker">ราคาที่เผยแพร่</span>
            <h2 className="mt-5 font-serif-th text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-[#071d13]">ยังไม่มีแถวราคาที่ผ่านการยืนยันสำหรับเส้นทางนี้</h2>
            <p className="mx-auto mt-4 max-w-[720px] leading-8 text-[#59645d]">ทีมงานจะไม่แสดงตัวเลขประมาณการแทนราคาจริง กรุณาส่งวันเดินทาง จำนวนคน สัมภาระ ระยะเวลา และประเภทรถผ่าน LINE เพื่อให้ตรวจข้อเสนอ</p>
            <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#d8af4a] px-6 font-bold text-[#092217]">ส่งรายละเอียดเพื่อขอราคา</a>
          </div>
        </section>
      )}

      <section className="bg-white py-[clamp(52px,9vw,110px)]">
        <div className="hl-shell">
          <span className="hl-kicker">ประเภทรถที่รองรับ</span>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {VEHICLE_GROUPS.map((vehicle) => (
              <Link key={vehicle.slug} href={getVehicleHref(vehicle.slug)} className="rounded-[22px] border border-[#ddd4c1] p-6 transition hover:border-[#d8af4a]">
                <h3 className="font-semibold text-[#0a2d20]">{vehicle.name}</h3><p className="mt-3 text-sm leading-7 text-[#59645d]">{vehicle.suitableFor}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe8d9] py-[clamp(52px,9vw,110px)]">
        <div className="hl-shell">
          <span className="hl-kicker">จุดรับฝั่งเวียงจันทน์</span>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PICKUP_POINTS.map((point) => <article key={point.slug} className="rounded-[22px] bg-white p-6"><h3 className="font-semibold text-[#0a2d20]">{point.name}</h3><p className="mt-2 text-sm text-[#59645d]">{point.detail}</p></article>)}
          </div>
          <Link href="/vientiane/" className="mt-7 inline-flex rounded-full border border-[#d8af4a] px-6 py-3 font-bold text-[#0a2d20] hover:bg-white">
            เช่ารถตู้เวียงจันทน์: ดูจุดรับและราคาทั้งหมด →
          </Link>
        </div>
      </section>

      <section className="bg-white py-[clamp(52px,9vw,110px)]">
        <div className="hl-shell max-w-[900px]">
          <span className="hl-kicker">คำถามเกี่ยวกับเส้นทาง</span>
          <div className="mt-8 divide-y divide-[#ddd4c1] border-y border-[#ddd4c1]">
            {faqs.map((faq) => <details key={faq.question} className="py-1"><summary className="cursor-pointer py-5 font-semibold text-[#0a2d20]">{faq.question}</summary><p className="pb-6 leading-8 text-[#59645d]">{faq.answer}</p></details>)}
          </div>
        </div>
      </section>
      <LineCta title={`ขอราคาทริป ${route.name}`} description="ส่งวันเดินทาง จำนวนคน สัมภาระ จุดรับ ระยะเวลา และประเภทรถ เพื่อให้ทีมตรวจข้อเสนอจริง" />
    </main>
  );
}
