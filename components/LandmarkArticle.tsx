import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "./PageHero";
import VanAlbum from "./VanAlbum";
import { LANDMARKS, LANDMARK_SOURCE, type LandmarkKey } from "@/data/vientiane-landmarks";
import { SITE } from "@/data/site";

export function landmarkMetadata(key: LandmarkKey): Metadata {
  const place = LANDMARKS[key];
  return { title: place.title, description: place.description, alternates: { canonical: `/articles/${place.slug}/` }, openGraph: { title: place.title, description: place.description, type: "article", url: `/articles/${place.slug}/`, images: [{ url: place.photos[0].src, alt: place.photos[0].alt }] } };
}

export default function LandmarkArticle({ placeKey }: { placeKey: LandmarkKey }) {
  const place = LANDMARKS[placeKey];
  const other = LANDMARKS[place.other];
  const map = `https://www.google.com/maps?cid=${BigInt(place.cid).toString()}`;
  const extra = { src: place.extra.src, alt: place.extra.alt, caption: `${place.extra.alt} · ${place.extra.author} · ${place.extra.license}` };
  const path = `/articles/${place.slug}/`;
  const heading = "font-serif-th text-2xl font-bold leading-snug text-[#0a2d20] sm:text-3xl";
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: place.title, description: place.description, image: place.photos.map(p => `${SITE.website}${p.src}`), author: { "@type": "Organization", name: "HUGLAO" }, publisher: { "@id": `${SITE.website}/#organization` }, mainEntityOfPage: `${SITE.website}${path}`, about: { "@type": "Place", name: place.name, hasMap: map } };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <PageHero eyebrow="HUGLAO แนะนำ · ที่เที่ยวเวียงจันทน์" title={place.name} description={place.lead} breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ", href: "/articles/" }, { label: place.name }]} />
    <article className="bg-[#f7f3e9] py-7 sm:py-12"><div className="hl-shell max-w-[1000px]">
      <figure><Image src={place.photos[0].src} alt={place.photos[0].alt} width={1280} height={960} priority sizes="(max-width: 1024px) 92vw, 960px" className="max-h-[620px] w-full rounded-2xl object-contain bg-[#ebe5d8]" /><figcaption className="mt-2 text-xs leading-6 text-[#687169]">{place.photos[0].caption} · ภาพจากเจ้าของ HUGLAO</figcaption></figure>
      <p className="mt-6 text-lg leading-9 text-[#364b3d]">{place.intro}</p>
      <div className="mt-5 flex flex-wrap gap-3"><a href={map} target="_blank" rel="noopener noreferrer" className="hl-button-primary">เปิดแผนที่สถานที่ ↗</a><a href="#visit-info" className="inline-flex min-h-12 items-center rounded-full border border-[#bdb39c] px-5 font-semibold text-[#0a2d20]">เวลาเปิดและค่าเข้า</a></div>
      <div className="mt-7 space-y-6">{place.sections.map((section, i) => <section key={section.title} className="rounded-2xl border border-[#ddd4c1] bg-white p-5 sm:p-7"><h2 className={heading}>{section.title}</h2>{section.paragraphs.map(p => <p key={p} className="mt-3 leading-8 text-[#364b3d]">{p}</p>)}{i === 0 && <a href={LANDMARK_SOURCE} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs leading-6 text-[#86611a] underline">อ้างอิงประวัติ: ข้อมูลท่องเที่ยวลาว</a>}</section>)}</div>
      <section className="mt-7"><h2 className={heading}>ภาพ{place.name}</h2><p className="mt-2 text-sm leading-7 text-[#59645d]">เลื่อนดูบนมือถือ แตะเพื่อขยายภาพ</p><VanAlbum label={`อัลบั้ม${place.name}`} compact imageFit="contain" groups={[{ title: "ภาพจากเจ้าของ HUGLAO", items: place.photos }, { title: "อีกมุมของสถานที่", items: [extra] }]} /><p className="mt-3 text-xs leading-6 text-[#687169]">ภาพเพิ่มเติม: <a href={place.extra.source} target="_blank" rel="noopener noreferrer" className="underline">{place.extra.author} · ภาพต้นฉบับ</a> · <a href={place.extra.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline">{place.extra.license}</a> · {place.extra.changes} ภาพบันทึกคนละช่วงเวลา สภาพพื้นที่อาจเปลี่ยนไป</p></section>
      <section id="visit-info" className="mt-7 scroll-mt-28 overflow-hidden rounded-2xl border border-[#ddd4c1] bg-white"><div className="bg-[#0a2d20] p-5 text-white sm:px-7"><h2 className="font-serif-th text-2xl font-bold">ข้อมูลก่อนเข้าชม</h2><p className="mt-1 text-xs text-[#d5ddd7]">{place.english} · ตรวจข้อมูล 7 พฤศจิกายน 2569</p></div><dl className="divide-y divide-[#e7e1d6] px-5 sm:px-7">{[["เวลาเปิด", place.hours], ["ค่าเข้าที่แหล่งข้อมูลระบุ", place.fee], ["เวลาแวะที่แนะนำ", place.suggestedTime]].map(([label, value]) => <div key={label} className="grid gap-1 py-4 sm:grid-cols-[200px_1fr]"><dt className="font-semibold text-[#0a2d20]">{label}</dt><dd className="leading-7 text-[#86611a]">{value}</dd></div>)}</dl><div className="px-5 pb-5 text-sm leading-7 text-[#59645d] sm:px-7"><p>{place.hoursNote}</p><p className="mt-2">อ้างอิง <a href={LANDMARK_SOURCE} target="_blank" rel="noopener noreferrer" className="underline">เว็บไซต์ท่องเที่ยวลาว</a> เวลาและค่าธรรมเนียมอาจเปลี่ยนได้ ตรวจที่จุดเข้าชมอีกครั้ง ระยะเวลาแวะเป็นคำแนะนำสำหรับจัดแผน</p></div></section>
      <section className="mt-6 rounded-2xl border border-[#ddd4c1] bg-white p-5 sm:p-7"><h2 className={heading}>{placeKey === "that-luang" ? "แต่งกายและวางตัวให้เหมาะกับศาสนสถาน" : "เตรียมตัวก่อนเดินชม"}</h2><ul className="mt-3 list-disc space-y-2 pl-5 leading-8 text-[#364b3d]">{place.tips.map(tip => <li key={tip}>{tip}</li>)}</ul></section>
      <section className="mt-6"><h2 className={heading}>จัดไว้ช่วงไหนของวันเที่ยวดี?</h2><p className="mt-3 leading-8 text-[#364b3d]">{place.plan}</p><Link href={`/articles/${other.slug}/`} className="mt-4 flex items-center gap-4 overflow-hidden rounded-2xl border border-[#ddd4c1] bg-white p-3"><Image src={other.photos[0].src} alt={other.photos[0].alt} width={160} height={120} className="h-24 w-28 shrink-0 rounded-xl object-cover" /><div><h3 className="font-semibold text-[#0a2d20]">อ่านต่อ: {other.name}</h3><p className="mt-2 text-sm text-[#86611a]">ประวัติ ภาพ และข้อมูลก่อนแวะ →</p></div></Link><Link href="/articles/pho-zap-vientiane/" className="mt-4 inline-flex min-h-11 items-center font-semibold text-[#86611a] underline">หามื้อพักระหว่างวัน: เฝอแซ่บใกล้ประตูชัย →</Link></section>
      <section className="mt-7 rounded-2xl bg-[#0a2d20] p-5 text-white sm:p-7"><h2 className="font-serif-th text-2xl font-bold">เที่ยวเวียงจันทน์ตามจังหวะของคุณ</h2><p className="mt-3 leading-8 text-[#d5ddd7]">เลือกจุดที่อยากแวะและเวลาที่มี ให้ HUGLAO ช่วยเรียงเส้นทางและประสานรถพร้อมคนขับ ไม่ต้องเร่งเที่ยวให้ครบทุกจุด ค่าเข้าชมสถานที่ชำระแยกจากบริการรถตามรายการที่ตกลง</p><div className="mt-5 flex flex-wrap gap-3"><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary">คุยแผนผ่าน LINE</a><Link href="/routes/vientiane-city/" className="hl-button-secondary">ดูเส้นทางเที่ยวในเมือง</Link></div></section>
      <footer className="mt-6 text-xs leading-6 text-[#687169]"><p>ภาพหลักและภาพอัลบั้ม: เจ้าของ HUGLAO ส่งให้ใช้ในบทความ ย่อขนาดและแปลง WebP</p><p className="mt-2">ประวัติ เวลาเปิด และค่าเข้า: <a href={LANDMARK_SOURCE} className="underline" target="_blank" rel="noopener noreferrer">Tourism Laos — Vientiane Capital</a>{placeKey === "that-luang" && <> · <a href="https://kpl.gov.la/EN/detail.aspx?id=19180" target="_blank" rel="noopener noreferrer" className="underline">สำนักข่าวลาว: ประวัติและงานบุญธาตุหลวง</a></>}</p></footer>
    </div></article>
  </main>;
}
