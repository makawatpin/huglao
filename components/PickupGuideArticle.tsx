import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "./PageHero";
import VanAlbum from "./VanAlbum";
import { CITY_NAMES, getPickupPhotos, PICKUP_GUIDES, type PickupGuide } from "@/data/pickup-guides";
import { SITE } from "@/data/site";

export function pickupMetadata(guide: PickupGuide): Metadata {
  return {
    title: `${guide.name}: แผนที่ ประวัติ และข้อมูลนัดรับรถ`, description: guide.description,
    alternates: { canonical: `/articles/${guide.slug}/` },
    openGraph: { title: guide.name, description: guide.description, url: `/articles/${guide.slug}/`, type: "article", images: [{ url: getPickupPhotos(guide)[0].src, alt: getPickupPhotos(guide)[0].alt }] },
  };
}

export function PickupGuideCards({ city }: { city: PickupGuide["city"] }) {
  return <div className="mt-6 grid gap-4 sm:grid-cols-2">{PICKUP_GUIDES.filter(p => p.city === city).map(p => {
    const photo = getPickupPhotos(p)[0];
    return <Link key={p.slug} href={`/articles/${p.slug}/`} className="flex overflow-hidden rounded-2xl border border-[#ddd4c1] bg-white text-[#0a2d20] hover:border-[#86611a] focus-visible:outline-2 focus-visible:outline-offset-4">
      <Image src={photo.src} alt={photo.alt} width={240} height={180} sizes="(max-width: 640px) 32vw, 160px" className="w-28 shrink-0 object-cover sm:w-36" />
      <div className="p-4"><h3 className="font-semibold leading-6">{p.name}</h3><p className="mt-2 text-sm text-[#59645d]">แผนที่ · ประวัติ · การนัดรับ</p><span className="mt-3 block text-sm font-semibold text-[#86611a]">อ่านข้อมูลจุดรับ →</span></div>
    </Link>;
  })}</div>;
}

export default function PickupGuideArticle({ guide }: { guide: PickupGuide }) {
  const images = getPickupPhotos(guide);
  const mapQuery = guide.coordinates.join(",");
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const rail = guide.kind === "rail";
  const steps = [
    { title: "ส่งรายละเอียดก่อนเดินทาง", text: `${guide.kind === "airport" ? "หมายเลขเที่ยวบิน สายการบิน และเวลาถึง" : rail ? "ชื่อสถานี หมายเลขขบวน และเวลาถึง" : "เวลาประมาณถึงด่านฝั่งลาวและวิธีเดินทางข้ามสะพาน"} พร้อมจำนวนคน จำนวนและขนาดกระเป๋า จุดส่ง และจุดแวะที่ต้องการ` },
    { title: "ยืนยันจุดนัดพบกับทีม", text: "ทีมจะยืนยันตำแหน่งขึ้นรถและช่องทางติดต่อคนขับก่อนเดินทาง หมุดในบทความใช้ค้นหาสถานที่ ไม่ใช่จุดจอดรับรถที่ยืนยันแล้ว" },
    { title: "ติดต่อเมื่อพร้อมขึ้นรถ", text: "รวบรวมผู้เดินทางและสัมภาระให้ครบ หากเดินทางล่าช้าหรือเปลี่ยนขบวน/เที่ยวบิน ให้แจ้งทีมทันทีเพื่อประสานเวลารับใหม่" },
  ];
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: guide.name, description: guide.description, image: images.map(p => `${SITE.website}${p.src}`), author: { "@type": "Organization", name: "HUGLAO" }, publisher: { "@type": "Organization", name: "HUGLAO" }, mainEntityOfPage: `${SITE.website}/articles/${guide.slug}/`, about: { "@type": "Place", name: guide.name, hasMap: mapUrl, geo: { "@type": "GeoCoordinates", latitude: guide.coordinates[0], longitude: guide.coordinates[1] } } };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <PageHero eyebrow={`จุดรับและการเดินทาง · ${CITY_NAMES[guide.city]}`} title={guide.name} description={guide.description} breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ", href: "/articles/" }, { label: guide.name }]} />
    <article className="bg-[#f7f3e9] py-7 sm:py-12"><div className="hl-shell max-w-[1000px]">
      <p className="mb-4 text-sm text-[#59645d]">ชื่อสำหรับค้นหา: {guide.english}</p>
      <figure><Image src={images[0].src} alt={images[0].alt} width={1280} height={800} priority sizes="(max-width: 1000px) 94vw, 960px" className="max-h-[480px] w-full rounded-2xl object-cover" /><figcaption className="mt-2 text-xs leading-6 text-[#59645d]">{images[0].caption} · <a href={images[0].source} className="underline">ต้นฉบับและเครดิต</a></figcaption></figure>
      <nav aria-label="หัวข้อในบทความ" className="my-6 flex flex-wrap gap-2">{[["location", "แผนที่"], ["history", "ประวัติ"], ["pickup", "วิธีนัดรับ"], ["conditions", "ข้อควรรู้"]].map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-full border border-[#ddd4c1] bg-white px-4 py-3 text-sm font-semibold text-[#0a2d20]">{label}</a>)}</nav>
      <div className="space-y-5 text-[#0a2d20]">
        <section id="location" className="scroll-mt-28 rounded-2xl border border-[#ddd4c1] bg-white p-5 sm:p-7"><h2 className="font-serif-th text-2xl font-bold">ที่ตั้งและแผนที่</h2><p className="mt-3 leading-8">{guide.location}</p><iframe title={`แผนที่${guide.name}`} src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-4 h-64 w-full rounded-xl border-0 sm:h-80" /><a href={mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center font-semibold text-[#86611a] underline">เปิดแผนที่ใน Google Maps →</a><p className="text-xs leading-6 text-[#59645d]">พิกัดสถานที่โดยประมาณ ไม่ใช่ตำแหน่งนัดพบรถ ตรวจเส้นทางเข้าพื้นที่และจุดรับกับทีมอีกครั้ง</p></section>
        <section id="history" className="scroll-mt-28 rounded-2xl border border-[#ddd4c1] bg-white p-5 sm:p-7"><h2 className="font-serif-th text-2xl font-bold">ความเป็นมาและบทบาทในการเดินทาง</h2><p className="mt-3 leading-8">{guide.history}</p><a href={guide.sources[0].url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-[#86611a] underline">อ้างอิง: {guide.sources[0].title}</a><h3 className="mt-5 font-semibold">เช็กชื่อสถานที่ให้ตรงกัน</h3><p className="mt-2 leading-8">{guide.distinction}</p></section>
        <section id="pickup" className="scroll-mt-28"><h2 className="font-serif-th text-2xl font-bold">เดินทางต่อและนัดรับอย่างไร</h2><p className="mt-3 leading-8">{guide.travel}</p><ol className="mt-4 overflow-hidden rounded-2xl border border-[#ddd4c1] bg-white">{steps.map((step, i) => <li key={step.title} className="flex gap-3 border-b border-[#e7e1d6] p-5 last:border-0"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a2d20] text-sm font-bold text-[#efd276]">{i+1}</span><div><h3 className="font-semibold">{step.title}</h3><p className="mt-1 text-sm leading-7 text-[#59645d]">{step.text}</p></div></li>)}</ol></section>
        <section><h2 className="font-serif-th text-2xl font-bold">ภาพประกอบสถานที่</h2><p className="mt-2 text-sm leading-7 text-[#59645d]">ภาพบันทึกต่างช่วงเวลา สภาพอาคารและการจัดพื้นที่อาจเปลี่ยนไป ไม่ใช้ภาพเพื่อยืนยันจุดนัดพบหรือบริการปัจจุบัน{!guide.photoKey && " ภาพในหน้านี้เป็นภูมิทัศน์เมืองวังเวียง ไม่ใช่ภาพอาคารสถานี"}</p><VanAlbum label={`ภาพประกอบ${guide.name}`} compact groups={[{ title: guide.name, items: images }]} />
          <details className="mt-4 rounded-xl border border-[#ddd4c1] bg-white p-4"><summary className="cursor-pointer font-semibold">ที่มา ผู้ถ่าย และใบอนุญาตภาพ</summary><ul className="mt-3 space-y-3 text-xs leading-6 text-[#59645d]">{images.map(p => <li key={p.src}><a href={p.source} target="_blank" rel="noopener noreferrer" className="underline">{p.alt}</a> — {p.author} · <a href={p.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">{p.license}</a>{p.date && ` · วันที่ต้นฉบับ: ${p.date}`} · ย่อขนาดและแปลง WebP</li>)}</ul></details>
        </section>
        <section id="conditions" className="scroll-mt-28 rounded-2xl border border-[#ddd4c1] bg-white p-5 sm:p-7"><h2 className="font-serif-th text-2xl font-bold">ข้อกำหนดสถานที่และการเตรียมตัว</h2><ul className="mt-3 list-disc space-y-2 pl-5 leading-8"><li>{guide.kind === "border" ? "ตรวจเอกสารเข้าเมืองและสิทธิ์ใช้ด่านตามสัญชาติของผู้เดินทางจากหน่วยงานทางการก่อนเดินทาง การจองรถไม่ใช่การยืนยันสิทธิ์เข้าเมือง" : guide.kind === "airport" ? "ตรวจเวลาเช็กอิน เอกสาร น้ำหนักสัมภาระ และข้อจำกัดสิ่งของกับสายการบินที่จองโดยตรง แต่ละสายการบินอาจใช้ข้อกำหนดต่างกัน" : "ตรวจชื่อในตั๋ว เอกสารที่ใช้เดินทาง ข้อจำกัดสัมภาระ และเวลาที่ต้องถึงสถานีตามผู้ให้บริการรถไฟ ไม่ใช้เวลาออกขบวนเป็นเวลานัดถึงสถานี"}</li><li>ปฏิบัติตามการตรวจความปลอดภัย ป้ายห้ามถ่ายภาพ และคำแนะนำเจ้าหน้าที่ ใช้พื้นที่รอและจุดขึ้นรถที่อนุญาต</li><li>แจ้งล่วงหน้าหากมีผู้สูงอายุ เด็ก ผู้ใช้รถเข็น หรือสัมภาระชิ้นใหญ่ เพื่อประสานความช่วยเหลือและตรวจรถที่เหมาะสม</li><li>เวลาเปิดพื้นที่ ขั้นตอน และตำแหน่งจอดรถอาจเปลี่ยนได้ ยืนยันอีกครั้งก่อนวันเดินทาง</li></ul></section>
        <section className="rounded-2xl bg-[#0a2d20] p-5 text-white sm:p-7"><h2 className="font-serif-th text-2xl font-bold">รถรับส่งและเที่ยวต่อกับ HUGLAO</h2><p className="mt-3 leading-8 text-[#d5ddd7]">เลือกบริการรับส่งหรือเที่ยวส่วนตัวตามเวลาที่มี แจ้งจุดรับ จุดส่ง ผู้เดินทางและสัมภาระ เพื่อยืนยันรถ เส้นทาง ราคา และรายละเอียดก่อนจอง</p><p className="mt-3 text-sm leading-7 text-[#d5ddd7]">เงื่อนไขรถ HUGLAO แยกจากข้อกำหนดสนามบิน ด่าน และรถไฟ ดูรายการที่รวม เวลา ค่าล่วงเวลา และมัดจำในหน้าบริการของเมืองก่อนยืนยัน</p><div className="mt-5 flex flex-wrap gap-3"><Link href={`/${guide.city}/#pricing`} className="hl-button-primary">ดูราคาเริ่มรับใน{CITY_NAMES[guide.city]}</Link><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-secondary">คุยแผนผ่าน LINE</a><a href={SITE.phoneHref} className="inline-flex min-h-12 items-center px-2 underline">โทร {SITE.phoneDisplay}</a></div></section>
        <section><h2 className="font-serif-th text-2xl font-bold">ข้อมูลอ้างอิง</h2><ul className="mt-3 space-y-2 text-sm leading-7">{guide.sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#86611a] underline">{s.title} ↗</a></li>)}</ul><p className="mt-3 text-xs leading-6 text-[#59645d]">ข้อมูลเพื่อเตรียมเดินทาง ไม่ใช่ประกาศของผู้ดูแลสถานที่ ตรวจตารางเดินทางและข้อกำหนดล่าสุดกับหน่วยงานที่เกี่ยวข้อง</p></section>
        <section><h2 className="font-serif-th text-2xl font-bold">จุดรับใน{CITY_NAMES[guide.city]}</h2><PickupGuideCards city={guide.city} /></section>
      </div>
    </div></article>
  </main>;
}
