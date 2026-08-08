import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import PublishedPriceTable from "@/components/PublishedPriceTable";
import { PICKUP_POINTS, ROUTE_GROUPS, SITE, VEHICLE_GROUPS } from "@/data/site";
import { getMedia } from "@/data/media";
import { getCurrentPriceRows } from "@/data/pricing";

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
  return {
    title: `รถพร้อมคนขับ ${route.name}`,
    description: `${route.summary} เลือกประเภทรถและขอราคาจาก HUGLAO`,
    alternates: { canonical: `/routes/${route.slug}` },
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
        provider: { "@id": `${SITE.website}/#organization` },
        areaServed: "Laos",
        description: route.summary,
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
              <Link href="/image-credits" className="font-semibold text-[#efd276] hover:text-white">ดูที่มาและใบอนุญาตภาพ</Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-white py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="hl-kicker">ออกแบบทริปในแบบของคุณ</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.1rem,4.5vw,3.8rem)] font-bold leading-tight text-[#071d13]">สิ่งที่นำไปวางแผนต่อได้</h2>
            <p className="mt-5 leading-8 text-[#59645d]">{route.planningNote}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {route.highlights.map((highlight, index) => (
              <article key={highlight} className="rounded-[24px] border border-[#ddd4c1] bg-[#f7f3e9] p-6">
                <span className="text-xs font-bold text-[#9b711c]">0{index + 1}</span>
                <h3 className="mt-4 font-serif-th text-xl font-bold text-[#0a2d20]">{highlight}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3e9] py-[clamp(64px,8vw,96px)]">
        <div className="hl-shell grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <span className="hl-kicker">รายละเอียดที่ตรวจสอบแล้ว</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2rem,4vw,3.4rem)] font-bold leading-tight text-[#071d13]">ข้อมูลช่วยเลือกจุดแวะ</h2>
          </div>
          <div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {route.verifiedDetails.map((detail) => <li key={detail} className="rounded-[22px] border border-[#ddd4c1] bg-white p-5 text-sm leading-7 text-[#59645d]">{detail}</li>)}
            </ul>
            <p className="mt-5 text-xs leading-6 text-[#687169]">
              ที่มา: {route.sourceUrl ? <a href={route.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#9b711c] hover:underline">{route.sourceLabel}</a> : route.sourceLabel} · เวลาเปิด–ปิด ค่าบัตร กิจกรรม และสภาพเส้นทางต้องตรวจอีกครั้งก่อนเดินทาง
            </p>
          </div>
        </div>
      </section>

      {prices.length > 0 ? (
        <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,110px)]">
          <div className="hl-shell">
            <span className="hl-kicker">ตารางราคาที่เผยแพร่</span>
            <h2 className="mb-8 mt-5 font-serif-th text-[clamp(2.1rem,4vw,3.6rem)] font-bold text-[#071d13]">ราคาเส้นทาง {route.name}</h2>
            <PublishedPriceTable rows={prices} showCategoryHeadings={false} />
          </div>
        </section>
      ) : (
        <section className="bg-[#f7f3e9] py-[clamp(64px,8vw,96px)]">
          <div className="hl-shell rounded-[26px] border border-[#ddd4c1] bg-white p-6 text-center sm:p-9">
            <span className="hl-kicker">ราคาที่เผยแพร่</span>
            <h2 className="mt-5 font-serif-th text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-[#071d13]">ยังไม่มีแถวราคาที่ผ่านการยืนยันสำหรับเส้นทางนี้</h2>
            <p className="mx-auto mt-4 max-w-[720px] leading-8 text-[#59645d]">ทีมงานจะไม่แสดงตัวเลขประมาณการแทนราคาจริง กรุณาส่งวันเดินทาง จำนวนคน สัมภาระ ระยะเวลา และประเภทรถผ่าน LINE เพื่อให้ตรวจข้อเสนอ</p>
            <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#d8af4a] px-6 font-bold text-[#092217]">ส่งรายละเอียดเพื่อขอราคา</a>
          </div>
        </section>
      )}

      <section className="bg-white py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell">
          <span className="hl-kicker">ประเภทรถที่รองรับ</span>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {VEHICLE_GROUPS.map((vehicle) => (
              <Link key={vehicle.slug} href={`/car-with-driver/${vehicle.slug}`} className="rounded-[22px] border border-[#ddd4c1] p-6 transition hover:border-[#d8af4a]">
                <h3 className="font-semibold text-[#0a2d20]">{vehicle.name}</h3><p className="mt-3 text-sm leading-7 text-[#59645d]">{vehicle.suitableFor}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe8d9] py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell">
          <span className="hl-kicker">จุดรับฝั่งเวียงจันทน์</span>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {PICKUP_POINTS.map((point) => <article key={point.slug} className="rounded-[22px] bg-white p-6"><h3 className="font-semibold text-[#0a2d20]">{point.name}</h3><p className="mt-2 text-sm text-[#59645d]">{point.detail}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-[clamp(72px,9vw,110px)]">
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
