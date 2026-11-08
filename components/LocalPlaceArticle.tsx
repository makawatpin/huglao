import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "./PageHero";
import VanAlbum from "./VanAlbum";
import { NEW_PLACE_ARTICLES, type NewPlaceKey } from "@/data/new-place-articles";
import { SITE } from "@/data/site";

export function localPlaceMetadata(slug: NewPlaceKey): Metadata {
  const p = NEW_PLACE_ARTICLES[slug];
  const url = `/articles/${slug}/`;
  return { title: p.title, description: p.description, alternates: { canonical: url }, openGraph: { title: p.title, description: p.description, type: "article", url, images: [{ url: p.photos[0].src, alt: p.photos[0].alt }] } };
}

export default function LocalPlaceArticle({ slug }: { slug: NewPlaceKey }) {
  const p = NEW_PLACE_ARTICLES[slug];
  const cover = p.photos[0];
  const heading = "font-serif-th text-2xl font-bold leading-snug text-[#0a2d20]";
  const card = "rounded-2xl border border-[#ddd4c1] bg-white p-5 sm:p-7";
  const url = `${SITE.website}/articles/${slug}/`;
  const schemas = [
    { "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.description, image: p.photos.map(photo => `${SITE.website}${photo.src}`), author: { "@type": "Organization", name: "HUGLAO" }, publisher: { "@id": `${SITE.website}/#organization` }, mainEntityOfPage: url },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "หน้าแรก", item: `${SITE.website}/` }, { "@type": "ListItem", position: 2, name: "บทความ", item: `${SITE.website}/articles/` }, { "@type": "ListItem", position: 3, name: p.name, item: url }] },
  ];
  return <main>
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}
    <PageHero showServiceFacts={false} eyebrow={`${p.category} · เวียงจันทน์`} title={p.name} description={p.description} breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "บทความ", href: "/articles/" }, { label: p.name }]} />
    <article className="bg-[#f7f3e9] py-7 sm:py-12"><div className="hl-shell max-w-[1000px]">
      <p className="mb-4 break-words text-sm font-semibold leading-7 text-[#59645d]">{p.localName}</p>
      <figure className="mx-auto max-w-[680px]"><Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} preload sizes="(max-width: 720px) 92vw, 680px" className="max-h-[640px] w-full rounded-2xl bg-[#ebe5d8] object-contain" /><figcaption className="mt-2 text-xs leading-6 text-[#687169]">{cover.caption} · ภาพ: HUGLAO</figcaption></figure>
      <p className="my-6 leading-8 text-[#364b3d]">{p.intro}</p>
      <nav aria-label="หัวข้อในบทความ" className="mb-6 flex flex-wrap gap-2 text-sm font-semibold text-[#0a2d20]">{[["ข้อมูลก่อนแวะ", "visit-info"], ["อัลบั้มภาพ", "gallery"], ["แผนที่และติดต่อ", "contact"]].map(([label,id]) => <a key={id} href={`#${id}`} className="rounded-full border border-[#d8c99e] bg-white px-4 py-3">{label} ↓</a>)}</nav>
      <div className="space-y-5">{p.sections.map(section => <section key={section.title} className={card}><h2 className={heading}>{section.title}</h2><p className="mt-3 leading-8 text-[#435348]">{section.text}</p></section>)}
        <section id="visit-info" className={`${card} scroll-mt-28`}><h2 className={heading}>{p.category === "ที่เที่ยว" ? "เวลาเปิด ค่าเข้า และข้อมูลก่อนแวะ" : "เมนู ราคา และเวลาเปิด"}</h2><dl className="mt-4 divide-y divide-[#e7e1d6]">{p.facts.map(([label,value]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[1fr_1fr]"><dt className="font-semibold text-[#0a2d20]">{label}</dt><dd className="leading-7 text-[#86611a] sm:text-right">{value}</dd></div>)}</dl><p className="mt-3 text-sm leading-7 text-[#59645d]">{p.note}</p></section>
        <section id="gallery" className="scroll-mt-28"><h2 className={heading}>อัลบั้มภาพ</h2><p className="mt-2 text-sm leading-7 text-[#59645d]">เลื่อนดูและแตะเพื่อขยายภาพ</p><VanAlbum label={`อัลบั้ม${p.name}`} compact imageFit="contain" groups={[{ title: p.name, items: p.photos }]} /></section>
        <section id="contact" className={`${card} scroll-mt-28`}><h2 className={heading}>แผนที่และช่องทางติดต่อ</h2><p className="mt-3 break-words leading-7 text-[#435348]">{p.localName}</p><p className="mt-2 text-sm leading-7 text-[#59645d]">{p.mapNote}</p><div className="mt-4 flex flex-wrap gap-3"><a href={p.map} target="_blank" rel="noopener noreferrer" className="hl-button-primary">{slug === "pho-soumuntha-vientiane" ? "ค้นหาชื่อร้านในแผนที่" : "เปิดแผนที่"} ↗</a>{p.facebook && <a href={p.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-[#cfc7b5] px-5 font-semibold text-[#0a2d20]">ดูเพจร้าน ↗</a>}{p.phone && <a href={p.phone.href} className="inline-flex min-h-11 items-center font-semibold text-[#86611a] underline">โทร {p.phone.display}</a>}{p.website && <a href={p.website} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#86611a] underline">{p.websiteLabel} ↗</a>}</div></section>
        <section className="rounded-2xl bg-[#0a2d20] p-5 text-white sm:p-7"><h2 className="font-serif-th text-2xl font-bold">เลือกจุดแวะในวันเที่ยวเวียงจันทน์</h2><p className="mt-3 text-sm leading-7 text-[#d5ddd7]">แจ้งสถานที่ที่อยากไป จำนวนคน และเวลาที่มี ให้ HUGLAO ช่วยจัดลำดับเส้นทางก่อนจองรถ ค่าอาหารและค่าเข้าชมแยกจากค่ารถ</p><a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary mt-4">คุยแผนเที่ยวผ่าน LINE ↗</a><Link href="/vientiane/" className="mt-3 flex min-h-11 items-center font-semibold text-[#efd276] underline">ดูรถและราคาเวียงจันทน์ →</Link></section>
        <aside className="grid gap-3 sm:grid-cols-2">{p.related.map(item => <Link key={item.href} href={item.href} className={`${card} flex min-h-16 items-center justify-between gap-3 font-semibold text-[#0a2d20]`}>{item.title}<span aria-hidden="true">→</span></Link>)}</aside>
      </div>
      <footer className="mt-6 space-y-2 text-xs leading-6 text-[#687169]"><p>ภาพ: HUGLAO · เรียบเรียง 8 พฤศจิกายน 2569</p>{p.sources.length > 0 && <p>แหล่งข้อมูล: {p.sources.map((source,index) => <span key={source.url}>{index > 0 && " · "}<a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">{source.title}</a></span>)}</p>}</footer>
    </div></article>
  </main>;
}
