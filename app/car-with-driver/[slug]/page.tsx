import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LineCta from "@/components/LineCta";
import PageHero from "@/components/PageHero";
import PublishedPriceTable from "@/components/PublishedPriceTable";
import { ROUTE_GROUPS, SITE, VEHICLE_GROUPS } from "@/data/site";
import { getMedia, type MediaId } from "@/data/media";
import { getCurrentPriceRows, getPriceVehicle } from "@/data/pricing";

export const dynamicParams = false;

const SEDAN_ALBUM_IDS = [
  "vehicleSedan",
  "huglaoSuvInteriorDashboard",
  "huglaoSuvFrontSeats",
  "huglaoSuvRearSeats",
] as const satisfies readonly MediaId[];

const LEFT_SUV_ALBUM_IDS = [
  "vehicleSuv",
  "huglaoSuvVinfastFront",
  "huglaoSuvVinfastFrontCabin",
  "huglaoSuvVinfastRearSeats",
] as const satisfies readonly MediaId[];

function VehicleAlbum({
  mediaIds,
  priority = false,
}: {
  mediaIds: readonly MediaId[];
  priority?: boolean;
}) {
  const mainMedia = getMedia(mediaIds[0]);
  const albumMedia = mediaIds.slice(1).map(getMedia);

  return (
    <figure className="hl-mobile-media-card hl-vehicle-card overflow-hidden rounded-[26px] border border-white/10 bg-[#0a2d20]">
      <div className="hl-mobile-media relative aspect-[16/9] sm:aspect-[16/10]">
        <Image
          src={mainMedia.src}
          alt={mainMedia.alt}
          fill
          priority={priority}
          sizes="(max-width: 639px) 100vw, 50vw"
          className="object-contain"
        />
      </div>
      {albumMedia.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 border-t border-white/10 bg-[#071d13] p-3">
          {albumMedia.map((media) => (
            <div key={media.src} className="relative aspect-square overflow-hidden rounded-xl bg-[#0a2d20]">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(max-width: 639px) 33vw, 16vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
      <figcaption className="hl-mobile-content px-5 py-4 text-xs leading-6 text-[#afbeb5]">
        {albumMedia.length > 0 ? `อัลบั้ม ${mainMedia.title} · ${mediaIds.length} ภาพ` : mainMedia.title} ·{" "}
        <Link href="/image-credits" className="font-semibold text-[#efd276]">ดูเครดิตภาพ</Link>
      </figcaption>
    </figure>
  );
}

export function generateStaticParams() {
  return VEHICLE_GROUPS.map((vehicle) => ({ slug: vehicle.slug }));
}

function getVehicle(slug: string) {
  return VEHICLE_GROUPS.find((vehicle) => vehicle.slug === slug);
}

function getVehicleSeoTitle(slug: string, name: string) {
  const titles: Record<string, string> = {
    "sedan-suv": "รถเก๋งและ SUV พร้อมคนขับเที่ยวลาว",
    mpv: "รถ MPV พร้อมคนขับเที่ยวลาว",
    van: "รถตู้เที่ยวลาวพร้อมคนขับ",
    "minibus-bus": "รถมินิบัสและรถบัสพร้อมคนขับเที่ยวลาว",
  };
  return titles[slug] ?? `${name} พร้อมคนขับ`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return {};
  const seoTitle = getVehicleSeoTitle(vehicle.slug, vehicle.name);
  const description = `${vehicle.description} เริ่มต้นจากเวียงจันทน์ ติดต่อ HUGLAO เพื่อขอราคาและตรวจรถตามรายละเอียดทริป`;
  return {
    title: seoTitle,
    description,
    alternates: { canonical: `/car-with-driver/${vehicle.slug}/` },
    openGraph: {
      title: `${seoTitle} | HUGLAO`,
      description,
      url: `/car-with-driver/${vehicle.slug}/`,
      images: [{ url: getMedia(vehicle.mediaIds[0]).src, alt: getMedia(vehicle.mediaIds[0]).alt }],
    },
  };
}

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();
  const seoTitle = getVehicleSeoTitle(vehicle.slug, vehicle.name);
  const prices = getCurrentPriceRows();
  const hasPublishedPrices = Boolean(getPriceVehicle(vehicle.slug));

  const faqs = [
    { question: `${vehicle.name} เหมาะกับใคร?`, answer: vehicle.suitableFor },
    { question: "รองรับผู้โดยสารและกระเป๋าได้เท่าไร?", answer: `${vehicle.capacity} และ${vehicle.luggage} กรุณาแจ้งจำนวนคนและสัมภาระจริงเพื่อให้ทีมตรวจรถ` },
    { question: "รถที่ได้รับจะเป็นรุ่นเดียวกับภาพหรือไม่?", answer: "รุ่นรถและปีรถขึ้นอยู่กับรถที่ว่างในวันเดินทาง โดย HUGLAO จะแจ้งรายละเอียดก่อนลูกค้ายืนยัน" },
    { question: "การส่งข้อมูลถือว่าจองแล้วหรือไม่?", answer: "ยังไม่ถือว่าเป็นการจอง ทีมงานต้องตรวจรถและส่งข้อเสนอให้ลูกค้ายืนยันก่อน" },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: seoTitle,
        provider: { "@id": `${SITE.website}/#organization` },
        areaServed: "Laos",
        description: vehicle.description,
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      }) }} />
      <PageHero
        eyebrow="Vehicle category"
        title={seoTitle}
        description={`${vehicle.description} เริ่มต้นบริการจากเวียงจันทน์ และเสนอราคาตามเส้นทาง ระยะเวลา และรถที่ว่างจริง`}
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "จองรถพร้อมคนขับ", href: "/car-with-driver" }, { label: vehicle.name }]}
      />

      <section className="bg-[#071d13] pb-[clamp(52px,8vw,88px)]">
        <div className={`hl-shell grid items-start gap-4 ${vehicle.mediaIds.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {vehicle.slug === "sedan-suv" ? (
            <>
              <VehicleAlbum mediaIds={LEFT_SUV_ALBUM_IDS} priority />
              <VehicleAlbum mediaIds={SEDAN_ALBUM_IDS} />
            </>
          ) : (
            vehicle.mediaIds.map((mediaId, index) => (
              <VehicleAlbum key={mediaId} mediaIds={[mediaId]} priority={index === 0} />
            ))
          )}
        </div>
      </section>

      <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="hl-kicker">ข้อมูลก่อนเลือกรถ</span>
            <h2 className="mt-5 font-serif-th text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight text-[#071d13]">เหมาะกับทริปแบบไหน</h2>
            <p className="mt-5 text-lg leading-9 text-[#59645d]">{vehicle.suitableFor}</p>
          </div>
          <dl className="overflow-hidden rounded-[28px] border border-[#ddd4c1] bg-white">
            {[
              ["จำนวนผู้โดยสาร", vehicle.capacity],
              ["พื้นที่สัมภาระ", vehicle.luggage],
              ["จุดเริ่มต้น", "เวียงจันทน์"],
              ["รุ่นรถ", "ยืนยันตามรถที่ว่างก่อนลูกค้าตัดสินใจ"],
              ["ราคา", "แสดงเฉพาะรายการที่ตรวจและอนุญาตให้เผยแพร่"],
            ].map(([term, value]) => (
              <div key={term} className="grid gap-2 border-b border-[#ece6d9] p-6 last:border-0 sm:grid-cols-[180px_1fr]">
                <dt className="font-semibold text-[#0a2d20]">{term}</dt><dd className="text-[#59645d]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell">
          <span className="hl-kicker">เส้นทางที่สนใจ</span>
          <h2 className="mt-5 max-w-[780px] font-serif-th text-[clamp(2.1rem,4vw,3.6rem)] font-bold text-[#071d13]">เลือกเส้นทาง แล้วให้ทีมตรวจรถและราคา</h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ROUTE_GROUPS.map((route) => (
              <Link key={route.slug} href={`/routes/${route.slug}`} className="rounded-[22px] border border-[#ddd4c1] p-6 transition hover:border-[#d8af4a]">
                <h3 className="font-semibold text-[#0a2d20]">{route.name}</h3><span className="mt-4 block text-sm font-bold text-[#9b711c]">ดูเส้นทาง →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {hasPublishedPrices ? (
        <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,110px)]">
          <div className="hl-shell">
            <span className="hl-kicker">ราคาที่เผยแพร่</span>
            <h2 className="mb-8 mt-5 font-serif-th text-[clamp(2.1rem,4vw,3.6rem)] font-bold text-[#071d13]">ราคา{vehicle.name}จากฐานราคากลาง</h2>
            <PublishedPriceTable rows={prices} vehicleSlug={vehicle.slug} />
          </div>
        </section>
      ) : (
        <section className="bg-[#f7f3e9] py-[clamp(72px,9vw,110px)]">
          <div className="hl-shell text-center">
            <span className="hl-kicker">ราคาที่เผยแพร่</span>
            <h2 className="mb-4 mt-5 font-serif-th text-[clamp(1.4rem,3vw,2rem)] font-bold text-[#071d13]">ราคาในขณะนี้ยังไม่พร้อมให้แสดง</h2>
            <p className="max-w-[720px] mx-auto mt-3 text-[#59645d]">เราไม่พบราคาที่เผยแพร่สำหรับประเภทนี้ในตอนนี้ หากต้องการขอราคาให้ทีมงานตรวจสอบ กรุณาส่งรายละเอียดทริปผ่าน LINE หรือส่งคำขอราคาผ่านปุ่มด้านล่าง</p>
              <div className="mt-6 flex justify-center gap-4">
              <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#d8af4a] px-6 py-3 font-bold text-[#092217]">ส่งรายละเอียดผ่าน LINE</a>
              <Link href="/travel-with-us" className="rounded-full border border-[#0a2d20]/20 px-6 py-3 font-semibold text-[#0a2d20]">เที่ยวลาวกับเรา</Link>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#efe8d9] py-[clamp(72px,9vw,110px)]">
        <div className="hl-shell max-w-[900px]">
          <span className="hl-kicker">คำถามเฉพาะประเภทรถ</span>
          <div className="mt-8 divide-y divide-[#d8d0be] border-y border-[#d8d0be]">
            {faqs.map((faq) => <details key={faq.question} className="py-1"><summary className="cursor-pointer py-5 font-semibold text-[#0a2d20]">{faq.question}</summary><p className="pb-6 leading-8 text-[#59645d]">{faq.answer}</p></details>)}
          </div>
        </div>
      </section>
      <section className="bg-white py-8">
        <div className="hl-shell text-center">
          <Link href="/vientiane/" className="inline-flex rounded-full border border-[#d8af4a] px-6 py-3 font-bold text-[#0a2d20] hover:bg-[#fffaf0]">
            เช่ารถเวียงจันทร์พร้อมคนขับ: ตรวจจุดรับและราคา →
          </Link>
        </div>
      </section>
      <LineCta title={`เที่ยวลาวกับเรา ${vehicle.name} สำหรับทริปของคุณ`} />
    </main>
  );
}
